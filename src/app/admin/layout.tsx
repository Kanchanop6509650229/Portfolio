import { getServerSession } from 'next-auth';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">
              Admin Dashboard
            </h1>
          </div>
        </header>
        <main className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 dark:from-blue-900/30 dark:to-cyan-900/30 blur-3xl -z-10" />
          {children}
        </main>
      </div>
    </div>
  )
}