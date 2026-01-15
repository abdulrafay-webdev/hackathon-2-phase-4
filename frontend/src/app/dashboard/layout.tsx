export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
}
