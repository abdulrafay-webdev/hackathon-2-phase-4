#!/bin/bash
set -e

echo "Verifying Resilience..."

POD_NAME=$(kubectl get pod -l app=todo-backend -o jsonpath="{.items[0].metadata.name}")
echo "Deleting Backend Pod: $POD_NAME"
kubectl delete pod $POD_NAME

echo "Waiting for new pod..."
kubectl wait --for=condition=ready pod -l app=todo-backend --timeout=60s

NEW_POD_NAME=$(kubectl get pod -l app=todo-backend -o jsonpath="{.items[0].metadata.name}")
if [ "$POD_NAME" != "$NEW_POD_NAME" ]; then
    echo "Success: New pod $NEW_POD_NAME started."
else
    echo "Fail: Pod name didn't change (or logic error)."
    exit 1
fi
