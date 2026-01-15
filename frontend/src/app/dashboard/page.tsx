import TodoList from "@/components/todo-list";

export default function DashboardPage() {
    return (
        <div className="min-h-[calc(100vh-6rem)] bg-gradient-to-br from-blue-50 to-white p-4 sm:p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <header>
                    <h1 className="text-3xl font-bold mb-2 text-gray-900">My Tasks</h1>
                    <p className="text-gray-600">Manage your daily goals with focus.</p>
                </header>
                <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-6 border border-white/60 shadow-sm">
                    <TodoList />
                </div>
            </div>
        </div>
    );
}
