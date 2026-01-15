from fastapi import HTTPException, status
from jose import jwt, jwk
from jose.utils import base64url_decode
import httpx
from app.core.config import settings
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Cache for JWKS to avoid fetching on every request
jwks_client = httpx.Client()
jwks_cache = {}

def get_jwks():
    jwks_url = f"{settings.CLERK_ISSUER_URL}/.well-known/jwks.json"
    if "keys" not in jwks_cache:
        logger.info(f"Fetching JWKS from {jwks_url}")
        response = jwks_client.get(jwks_url)
        if response.status_code != 200:
            logger.error(f"Failed to fetch JWKS: {response.text}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Could not fetch JWKS"
            )
        jwks_cache["keys"] = response.json()["keys"]
    return jwks_cache["keys"]

def verify_token(token: str) -> dict:
    try:
        # Get the header to find the Key ID (kid)
        header = jwt.get_unverified_header(token)
        kid = header.get("kid")
        
        if not kid:
             raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token header missing kid",
                headers={"WWW-Authenticate": "Bearer"},
            )

        keys = get_jwks()
        key_data = next((k for k in keys if k["kid"] == kid), None)

        if not key_data:
            # Force refresh if key not found (rotation)
            logger.info("Key not found in cache, refreshing JWKS")
            # Clear cache to force fetch
            jwks_cache.pop("keys", None) 
            keys = get_jwks()
            key_data = next((k for k in keys if k["kid"] == kid), None)
            
            if not key_data:
                logger.error(f"Signing key not found for kid: {kid}")
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Signing key not found",
                    headers={"WWW-Authenticate": "Bearer"},
                )

        # Construct public key from JWK
        public_key = jwk.construct(key_data)

        # Decode and verify
        payload = jwt.decode(
            token,
            public_key,
            algorithms=["RS256"],
            audience=None, # Clerk handles audience claim usually as specific to session or None
            issuer=settings.CLERK_ISSUER_URL,
            options={"verify_aud": False} # Disable audience check if not strictly configured on Clerk side, enable if needed
        )
        
        logger.info(f"Verified token for user: {payload.get('sub')}")
        return payload

    except jwt.ExpiredSignatureError:
        logger.warning("Token expired")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except jwt.JWTError as e:
        logger.warning(f"Invalid token: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid token: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except Exception as e:
        logger.error(f"Unexpected authentication error: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal Authentication Error",
            headers={"WWW-Authenticate": "Bearer"},
        )