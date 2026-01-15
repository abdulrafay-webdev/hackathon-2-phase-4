'use client';

import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full py-8 px-6 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="glass-morphism rounded-2xl px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 border border-white/60 bg-white/30 backdrop-blur-md shadow-sm">
          <div className="flex items-center gap-2 text-gray-600 font-medium">
            <span>Built with</span>
            <Heart size={16} className="text-red-500 fill-red-500 animate-pulse" />
            <span>by <span className="text-blue-600 font-bold italic">Abdul Rafay</span></span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <span className="hover:text-blue-600 transition-colors cursor-default">© 2026 Evolution of Todo</span>
            <span className="hidden sm:block text-gray-300">|</span>
            <span className="hover:text-blue-600 transition-colors cursor-default">Phase 3: AI Chatbot</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
