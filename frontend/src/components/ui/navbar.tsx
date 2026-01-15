'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton, useUser } from '@clerk/nextjs';
import { LayoutDashboard, MessageSquare, Home as HomeIcon, Menu, X } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassButton } from './glass-button';

export function Navbar() {
  const pathname = usePathname();
  const { isSignedIn, isLoaded } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home', icon: HomeIcon },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/chat', label: 'AI Chat', icon: MessageSquare },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto pointer-events-auto bg-white/60 backdrop-blur-xl border border-white/40 shadow-sm rounded-2xl px-6 py-3 transition-all duration-300 hover:bg-white/70 hover:shadow-md relative">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:shadow-lg transition-all duration-300">
              E
            </div>
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 hidden sm:block">
              Todo AI
            </span>
          </Link>

          {/* Desktop Navigation Links */}
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
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                  )}
                >
                  <Icon size={16} />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
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

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="md:hidden overflow-hidden border-t border-gray-200 pt-2"
            >
              <div className="flex flex-col gap-2 pb-4">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={clsx(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                        isActive 
                          ? "bg-blue-50 text-blue-600" 
                          : "text-gray-600 hover:bg-gray-50"
                      )}
                    >
                      <Icon size={18} />
                      {link.label}
                    </Link>
                  );
                })}
                
                <div className="h-px bg-gray-100 my-2" />
                
                {isLoaded && isSignedIn ? (
                   <div className="flex items-center gap-3 px-4 py-2">
                      <UserButton afterSignOutUrl="/" />
                      <span className="text-sm text-gray-600 font-medium">
                        {useUser().user?.firstName}
                      </span>
                   </div>
                ) : (
                  <div className="flex flex-col gap-2 px-2">
                    <Link href="/sign-in" onClick={() => setIsMobileMenuOpen(false)}>
                      <button className="w-full text-left px-4 py-2 text-gray-600 hover:text-gray-900 font-medium text-sm rounded-lg hover:bg-gray-50">
                        Sign In
                      </button>
                    </Link>
                    <Link href="/sign-up" onClick={() => setIsMobileMenuOpen(false)}>
                      <GlassButton variant="primary" className="w-full justify-center py-2 px-4 text-sm">
                        Get Started
                      </GlassButton>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
