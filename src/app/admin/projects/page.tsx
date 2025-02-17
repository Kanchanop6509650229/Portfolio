'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import ProjectForm from '@/components/admin/ProjectForm';
import ProjectList from '@/components/admin/ProjectList';
import { useRouter } from 'next/navigation';
import { FiArrowLeft } from 'react-icons/fi';

export default function ProjectsPage() {
  const router = useRouter();
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
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/admin')}
            className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">
            Projects Management
          </h2>
        </div>
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