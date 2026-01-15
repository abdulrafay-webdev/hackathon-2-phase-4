'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton, useUser } from '@clerk/nextjs';
import { LayoutDashboard, MessageSquare, Home as HomeIcon } from 'lucide-react';
import { clsx } from 'clsx';
import { GlassButton } from './glass-button';

export function Navbar() {
  const pathname = usePathname();
  const { isSignedIn, isLoaded } = useUser();

  const navLinks = [
    { href: '/', label: 'Home', icon: HomeIcon },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/chat', label: 'AI Chat', icon: MessageSquare },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto bg-white/60 backdrop-blur-xl border border-white/40 shadow-sm rounded-2xl px-6 py-3 transition-all duration-300 hover:bg-white/70 hover:shadow-md">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:shadow-lg transition-all duration-300">
            E
          </div>
          <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 hidden sm:block">
            Todo AI
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-gray-100/50 p-1 rounded-xl border border-gray-200/50">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-white text-blue-600 shadow-sm" 
                    : "text-gray-400 hover:text-gray-900 hover:bg-white/50"
                )}
              >
                <Icon size={16} />
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          {isLoaded && isSignedIn ? (
             <div className="flex items-center gap-4">
                <div className="hidden sm:block text-sm text-gray-500 font-medium">
                  Hi, {useUser().user?.firstName}
                </div>
                <div className="ring-2 ring-white rounded-full shadow-sm">
                  <UserButton afterSignOutUrl="/" />
                </div>
             </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/sign-in">
                <button className="text-gray-600 hover:text-gray-900 font-medium text-sm px-3 py-2 transition-colors">
                  Sign In
                </button>
              </Link>
              <Link href="/sign-up">
                <GlassButton variant="primary" className="py-2 px-4 text-sm">
                  Get Started
                </GlassButton>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
