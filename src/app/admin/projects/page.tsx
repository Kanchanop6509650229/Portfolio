import { Card } from '@/components/ui/Card';
import ProjectForm from '@/components/admin/ProjectForm';
import ProjectList from '@/components/admin/ProjectList';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getProjects() {
  return await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">
          Projects Management
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="p-6 overflow-hidden">
            <div className="overflow-x-auto">
              <ProjectList projects={projects} />
            </div>
          </Card>
        </div>

        <div>
          <Card className="p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Add New Project
            </h3>
            <ProjectForm />
          </Card>
        </div>
      </div>
    </div>
  );
}