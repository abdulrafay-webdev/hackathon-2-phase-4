"use client";
import { useState } from "react";
import { useApi, Todo } from "@/lib/api";
import { GlassCard } from "./ui/glass-card";
import { StatusBadge } from "./ui/status-badge";
import { Trash2, CheckCircle, Undo2, Calendar, FileText, Pencil, X, Save } from "lucide-react";
import { format } from "date-fns";

export default function TodoItem({ todo, onDelete, onUpdate }: { todo: Todo, onDelete: (id: number) => void, onUpdate: (todo: Todo) => void }) {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Edit form state
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || "");
  const [editDueDate, setEditDueDate] = useState(
    todo.due_date ? new Date(todo.due_date).toISOString().slice(0, 16) : ""
  );

  const api = useApi();

  const toggleStatus = async () => {
    setLoading(true);
    const newStatus = todo.status === "completed" ? "pending" : "completed";
    try {
      const { data } = await api.patch(`/todos/${todo.id}/status`, { status: newStatus });
      onUpdate(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure?")) return;
    setLoading(true);
    try {
      await api.delete(`/todos/${todo.id}`);
      onDelete(todo.id);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!editTitle.trim()) return;
    setLoading(true);
    try {
      const { data } = await api.patch(`/todos/${todo.id}`, {
        title: editTitle,
        description: editDescription || null,
        due_date: editDueDate ? new Date(editDueDate).toISOString() : null,
      });
      onUpdate(data);
      setIsEditing(false);
    } catch (e) {
      console.error(e);
      alert("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
    setEditDueDate(todo.due_date ? new Date(todo.due_date).toISOString().slice(0, 16) : "");
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white/80 border border-gray-100 shadow-sm rounded-xl p-5 flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <input
            className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-full"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Task Title"
            disabled={loading}
          />
          <textarea
            className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-full min-h-[80px]"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Description (optional)"
            disabled={loading}
          />
          <input
            type="datetime-local"
            className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-full"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="flex justify-end gap-2">
           <button
            onClick={cancelEdit}
            disabled={loading}
            className="p-2 rounded-full text-gray-400 hover:bg-gray-100 transition-all"
            title="Cancel"
          >
            <X size={20} />
          </button>
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="p-2 rounded-full text-green-600 hover:bg-green-50 transition-all"
            title="Save Changes"
          >
            <Save size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/70 backdrop-blur-md border border-white/60 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-white/90 transition-all gap-4 shadow-sm group">
       <div className="flex-1 space-y-2">
          <div className="flex items-center gap-3">
            <h3 className={`text-xl font-semibold ${todo.status === "completed" ? "line-through text-gray-400" : "text-gray-800"}`}>
               {todo.title}
            </h3>
            <StatusBadge status={todo.status} />
          </div>
          
          {todo.description && (
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <FileText size={14} />
              <p>{todo.description}</p>
            </div>
          )}

          {todo.due_date && (
            <div className="flex items-center gap-2 text-blue-600 font-medium text-xs">
              <Calendar size={14} />
              <span>Due: {format(new Date(todo.due_date), "PP p")}</span>
            </div>
          )}
       </div>

       <div className="flex items-center gap-1 w-full md:w-auto justify-end">
         <button 
           onClick={() => setIsEditing(true)}
           disabled={loading || todo.status === "completed"}
           className={`p-2 rounded-full transition-all ${todo.status === "completed" ? "text-gray-300 cursor-not-allowed" : "text-blue-500 hover:bg-blue-50"}`}
           title="Edit Task"
         >
           <Pencil size={20} />
         </button>

         <button 
           onClick={toggleStatus} 
           disabled={loading} 
           className={`p-2 rounded-full transition-all ${todo.status === "completed" ? "text-orange-500 hover:bg-orange-50" : "text-green-600 hover:bg-green-50"}`}
           title={todo.status === "completed" ? "Mark Pending" : "Mark Complete"}
         >
           {todo.status === "completed" ? <Undo2 size={20} /> : <CheckCircle size={20} />}
         </button>
         
         <button 
           onClick={handleDelete} 
           disabled={loading} 
           className="text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-all"
           title="Delete Task"
         >
           <Trash2 size={20} />
         </button>
       </div>
    </div>
  );
}
