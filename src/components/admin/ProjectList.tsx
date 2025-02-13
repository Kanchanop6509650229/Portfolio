'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Project } from '@prisma/client';
import { FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<number | null>(null);

  async function handleDelete(id: number) {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    setLoading(id);
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) throw new Error('Failed to delete project');
      router.refresh();
    } catch (err) {
      console.error('Failed to delete project:', err);
      alert('Failed to delete project');
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {projects.map((project) => (
        <div 
          key={project.id}
          className="py-4 first:pt-0 last:pb-0 transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                {project.title}
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {project.description}
              </p>
              <div className="mt-2 flex items-center gap-2">
                {project.technologies.split(',').map((tech: string) => (
                  <span 
                    key={tech}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
            </div>
            <div className="ml-4 flex items-center gap-2">
              <button 
                className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="View"
                onClick={() => router.push(`/admin/projects/${project.id}`)}
              >
                <FiEye className="w-5 h-5" />
              </button>
              <button 
                className="p-2 text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Edit"
                onClick={() => router.push(`/admin/projects/edit/${project.id}`)}
              >
                <FiEdit2 className="w-5 h-5" />
              </button>
              <button 
                className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Delete"
                onClick={() => handleDelete(project.id)}
                disabled={loading === project.id}
              >
                <FiTrash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
      
      {projects.length === 0 && (
        <div className="py-6 text-center text-gray-500 dark:text-gray-400">
          No projects found. Create your first project!
        </div>
      )}
    </div>
  );
}