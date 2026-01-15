import axios from "axios";
import { useAuth } from "@clerk/nextjs";

export interface Todo {
  id: number;
  title: string;
  description?: string;
  due_date?: string;
  status: "pending" | "completed";
  is_completed: boolean;
  user_id: string;
}

// Helper to get authenticated Axios instance
export const useApi = () => {
  const { getToken } = useAuth();

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
  });

  api.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return api;
};

// Types for Chat
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'tool';
  content: string;
  created_at: string;
}

export interface Conversation {
  id: string;
  title: string;
  updated_at: string;
}

export const useChatApi = () => {
  const api = useApi();

  return {
    sendMessage: async (userId: string, message: string, conversationId?: string) => {
      const response = await api.post(`/chat/${userId}/chat`, {
        message,
        conversation_id: conversationId,
      });
      return response.data;
    },
    getHistory: async (userId: string) => {
      const response = await api.get(`/chat/${userId}/chat/history`);
      return response.data as Conversation[];
    },
    getMessages: async (userId: string, conversationId: string) => {
      const response = await api.get(`/chat/${userId}/chat/history/${conversationId}`);
      return response.data as ChatMessage[];
    }
  };
};
