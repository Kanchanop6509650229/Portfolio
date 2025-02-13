import { Card } from '@/components/ui/Card';
import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import { HiOutlineDocument, HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineLightningBolt } from 'react-icons/hi';

const prisma = new PrismaClient();

async function getStats() {
  const [projectCount, skillCount, careerCount, certificateCount] = await Promise.all([
    prisma.project.count(),
    prisma.skill.count(),
    prisma.career.count(),
    prisma.certificate.count(),
  ]);
  return { projectCount, skillCount, careerCount, certificateCount };
}

export default async function AdminDashboard() {
  const stats = await getStats();
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/admin/projects" className="transform hover:scale-105 transition-transform duration-300">
          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
                <HiOutlineDocument className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Projects</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.projectCount}</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/admin/skills" className="transform hover:scale-105 transition-transform duration-300">
          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-xl">
                <HiOutlineLightningBolt className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Skills</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.skillCount}</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/admin/career" className="transform hover:scale-105 transition-transform duration-300">
          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl">
                <HiOutlineBriefcase className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Career</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.careerCount}</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/admin/certificates" className="transform hover:scale-105 transition-transform duration-300">
          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-xl">
                <HiOutlineAcademicCap className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Certificates</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.certificateCount}</p>
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
              href="/admin/projects/edit/new" 
              className="block p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              Add New Project
            </Link>
            <Link 
              href="/admin/skills" 
              className="block p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              Manage Skills
            </Link>
            <Link 
              href="/admin/career" 
              className="block p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              Update Career
            </Link>
            <Link 
              href="/admin/certificates" 
              className="block p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              Add Certificate
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