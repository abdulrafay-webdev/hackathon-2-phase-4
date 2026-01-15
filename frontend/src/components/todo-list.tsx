"use client"
import { useEffect, useState } from "react";
import { useApi } from "@/lib/api";
import TodoItem from "./todo-item";
import TodoForm from "./todo-form";
import { GlassCard } from "./ui/glass-card";
import { useAuth } from "@clerk/nextjs";

interface Todo {
  id: number;
  title: string;
  description?: string;
  due_date?: string;
  status: "pending" | "completed";
  is_completed: boolean;
  user_id: string;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const { isLoaded, userId, getToken } = useAuth();
  const api = useApi();

  const fetchTodos = async () => {
    if (!isLoaded || !userId) return;
    
    try {
      setLoading(true);
      // Ensure token is fresh
      await getToken(); 
      const { data } = await api.get("/todos");
      setTodos(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && userId) {
      console.log("Current Clerk User ID:", userId); // Debugging
      fetchTodos();
    }
  }, [isLoaded, userId]);

  const handleTodoAdded = (newTodo: Todo) => {
     setTodos(prev => [...prev, newTodo]);
  };

  const handleUpdate = (updatedTodo: Todo) => {
     setTodos(prev => prev.map(t => t.id === updatedTodo.id ? updatedTodo : t));
  };

  const handleDelete = (id: number) => {
     setTodos(prev => prev.filter(t => t.id !== id));
  };

  if (!isLoaded) return <div className="text-gray-600 text-center py-10">Loading user data...</div>;
  if (!userId) return <div className="text-gray-600 text-center py-10">Please log in to see your todos.</div>;
  if (loading) return <div className="text-gray-600 text-center py-10">Loading todos...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white/60 p-6 rounded-xl border border-gray-100 shadow-sm">
        <TodoForm onTodoAdded={handleTodoAdded} />
      </div>
      
      <div className="space-y-3">
        {todos.map(todo => (
           <TodoItem 
             key={todo.id} 
             todo={todo} 
             onUpdate={handleUpdate} 
             onDelete={handleDelete} 
           />
        ))}
        {todos.length === 0 && <div className="text-gray-500 text-center py-12 bg-white/40 rounded-xl border border-dashed border-gray-200">No todos yet. Add one above!</div>}
      </div>
    </div>
  );
}