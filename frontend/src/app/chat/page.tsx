'use client';

import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChatWindow } from '@/components/chat/chat-window';
import { useChatApi } from '@/lib/api';

export default function ChatPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [conversationId, setConversationId] = useState<string | undefined>(undefined);
  const [initialMessages, setInitialMessages] = useState<any[]>([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);
  const chatApi = useChatApi();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      redirect('/sign-in');
    }
  }, [isLoaded, isSignedIn]);

  useEffect(() => {
    async function loadHistory() {
      if (isSignedIn && user?.id) {
        try {
          const conversations = await chatApi.getHistory(user.id);
          if (conversations && conversations.length > 0) {
            const latest = conversations[0];
            setConversationId(latest.id);
            const messages = await chatApi.getMessages(user.id, latest.id);
            // Filter out tool messages for the UI, or keep them if UI handles them
            setInitialMessages(messages.filter(m => m.role === 'user' || m.role === 'assistant').map(m => ({
              id: m.id,
              role: m.role as 'user' | 'assistant',
              content: m.content
            })));
          }
        } catch (error) {
          console.error("Failed to load chat history:", error);
        } finally {
          setIsHistoryLoading(false);
        }
      }
    }
    if (isLoaded && isSignedIn) {
      loadHistory();
    }
  }, [isLoaded, isSignedIn, user?.id]);

  if (!isLoaded || !isSignedIn || isHistoryLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const handleSendMessage = async (message: string) => {
    const response = await chatApi.sendMessage(user.id, message, conversationId);
    if (response.conversation_id && !conversationId) {
      setConversationId(response.conversation_id);
    }
    return response;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] bg-gradient-to-br from-blue-50 to-white">
      <main className="flex-1 overflow-hidden p-4 sm:p-6 lg:p-8">
        <ChatWindow 
          userId={user.id} 
          onSendMessage={handleSendMessage}
          initialMessages={initialMessages}
        />
      </main>
    </div>
  );
}
