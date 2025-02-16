'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import ProjectForm from '@/components/admin/ProjectForm';
import ProjectList from '@/components/admin/ProjectList';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  const loadProjects = async () => {
    const response = await fetch('/api/projects');
    if (response.ok) {
      const data = await response.json();
      setProjects(data);
    }
  };

  const handleDelete = (id: number) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  useEffect(() => {
    loadProjects();
  }, []);

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
              <ProjectList projects={projects} onDelete={handleDelete} />
            </div>
          </Card>
        </div>
        <div>
          <Card className="p-6">
            <ProjectForm onSuccess={loadProjects} />
          </Card>
        </div>
      </div>
    </div>
  );
}