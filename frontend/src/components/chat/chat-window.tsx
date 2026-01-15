'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ChatWindowProps {
  userId: string;
  onSendMessage: (message: string) => Promise<{ reply: string; conversationId: string }>;
  initialMessages?: Message[];
}

export function ChatWindow({ userId, onSendMessage, initialMessages = [] }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await onSendMessage(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.reply,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      // Handle error UI if needed
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full glass-morphism rounded-2xl overflow-hidden shadow-2xl border border-white/20">
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
      >
        <AnimatePresence initial={false}>
          {messages.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-gray-500 py-20"
            >
              <Bot className="w-12 h-12 mx-auto mb-4 text-blue-500 opacity-50" />
              <p className="text-lg font-medium">How can I help you today?</p>
              <p className="text-sm">"Add a task to buy groceries" or "What's on my list?"</p>
            </motion.div>
          )}
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className={twMerge(
                "flex w-full items-start gap-3",
                msg.role === 'user' ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div className={twMerge(
                "p-2 rounded-full",
                msg.role === 'user' ? "bg-blue-600 text-white" : "bg-white/80 text-blue-600 shadow-sm border border-blue-100"
              )}>
                {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div className={twMerge(
                "max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap",
                msg.role === 'user' 
                  ? "bg-blue-600 text-white rounded-tr-none" 
                  : "bg-white/90 text-gray-800 border border-gray-100 rounded-tl-none"
              )}>
                {msg.content.split('\n').map((line, i) => (
                  <p key={i} className={clsx(line.startsWith('-') && "pl-4 -indent-4")}>
                    {line}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3"
            >
              <div className="p-2 rounded-full bg-white/80 text-blue-600 shadow-sm border border-blue-100">
                <Bot size={20} />
              </div>
              <div className="bg-white/90 px-4 py-3 rounded-2xl rounded-tl-none border border-gray-100">
                <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-4 bg-white/50 backdrop-blur-md border-t border-white/20">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Talk to your assistant..."
            disabled={isLoading}
            className="flex-1 bg-white/80 border-none rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 shadow-inner"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 disabled:hover:bg-blue-600 shadow-lg hover:shadow-blue-500/30"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
