import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] p-4 bg-gradient-to-br from-blue-50 to-white text-gray-900">
      <GlassCard className="max-w-2xl w-full text-center space-y-8 p-12 bg-white/40 border-white/60">
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          Evolution of Todo
        </h1>
        <p className="text-lg text-gray-600">
          Phase 3: Secure, Scalable, and Beautiful.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link href="/chat">
            <GlassButton variant="primary" className="w-full sm:w-auto px-8 bg-blue-600 hover:bg-blue-700 border-none shadow-blue-500/20">AI Chat</GlassButton>
          </Link>
          <Link href="/dashboard">
            <GlassButton variant="secondary" className="w-full sm:w-auto px-8 border-gray-300 text-gray-900 font-semibold bg-white/50 hover:bg-white/80 hover:text-gray-900 transition-colors">Dashboard</GlassButton>
          </Link>
        </div>
      </GlassCard>
    </main>
  );
}
