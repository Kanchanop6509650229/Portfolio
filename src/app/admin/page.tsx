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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/admin/projects">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <HiOutlineDocument className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.projectCount}</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/admin/messages">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <HiOutlineMail className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Unread Messages</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.messageCount}</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/admin/analytics">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <HiOutlineChartBar className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Unique Visitors</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.visitorCount}</p>
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}