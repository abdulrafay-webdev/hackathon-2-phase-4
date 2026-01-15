"use client";
import { useState } from "react";
import { useApi } from "@/lib/api";
import { GlassButton } from "./ui/glass-button";

export default function TodoForm({ onTodoAdded }: { onTodoAdded?: (todo: any) => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const api = useApi();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    setLoading(true);
    try {
      const { data } = await api.post("/todos", { 
        title,
        description: description || null,
        due_date: dueDate ? new Date(dueDate).toISOString() : null,
      });
      setTitle("");
      setDescription("");
      setDueDate("");
      if (onTodoAdded) onTodoAdded(data);
    } catch (e) {
      console.error(e);
      alert("Failed to create todo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Task Title..." 
          required
          disabled={loading}
        />
        <input 
          type="datetime-local"
          className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50" 
          value={dueDate} 
          onChange={(e) => setDueDate(e.target.value)} 
          disabled={loading}
        />
      </div>
      <textarea 
        className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 h-20" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Optional description..." 
        disabled={loading}
      />
      <GlassButton type="submit" disabled={loading} variant="primary" className="w-full md:w-auto self-end bg-blue-600 hover:bg-blue-700 text-white border-none px-10">
        Add Task
      </GlassButton>
    </form>
  );
}
