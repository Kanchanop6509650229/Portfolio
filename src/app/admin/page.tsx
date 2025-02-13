import { Card } from '@/components/ui/Card';
import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import { HiOutlineDocument, HiOutlineMail, HiOutlineChartBar } from 'react-icons/hi';

const prisma = new PrismaClient();

async function getStats() {
  const [projectCount, messageCount, visitorCount] = await Promise.all([
    prisma.project.count(),
    prisma.contact.count(),
    prisma.analytics.groupBy({
      by: ['visitorIp'],
      _count: true,
    }).then(result => result.length),
  ]);
  return { projectCount, messageCount, visitorCount };
}

export default async function AdminDashboard() {
  const stats = await getStats();
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/admin/projects" className="transform hover:scale-105 transition-transform duration-300">
          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
                <HiOutlineDocument className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Projects</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.projectCount}</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/admin/messages" className="transform hover:scale-105 transition-transform duration-300">
          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-xl">
                <HiOutlineMail className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Unread Messages</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.messageCount}</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/admin/analytics" className="transform hover:scale-105 transition-transform duration-300">
          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl">
                <HiOutlineChartBar className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Visitors</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.visitorCount}</p>
              </div>
            </div>
          </Card>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="space-y-4">
            <Link 
              href="/admin/projects/new" 
              className="block p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              Create New Project
            </Link>
            <Link 
              href="/admin/messages" 
              className="block p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              View Messages
            </Link>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">System Status</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Database</span>
              <span className="px-2 py-1 text-sm rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">Connected</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">API Status</span>
              <span className="px-2 py-1 text-sm rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">Operational</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}