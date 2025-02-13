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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Projects Management</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <ProjectList projects={projects} />
          </Card>
        </div>
        
        <div>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Add New Project</h3>
            <ProjectForm />
          </Card>
        </div>
      </div>
    </div>
  );
}