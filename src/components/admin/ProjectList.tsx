'use client';

import type { HTMLAttributes } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Project } from '@prisma/client';
import { FiEdit2, FiTrash2, FiEye, FiSearch } from 'react-icons/fi';

interface ProjectListProps extends HTMLAttributes<HTMLDivElement> {
  projects: Project[];
  onDelete?: (id: number) => void;
}

export default function ProjectList({ projects, onDelete, className, ...props }: ProjectListProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.technologies.toLowerCase().includes(searchQuery.toLowerCase())
  );

  async function handleDelete(id: number) {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    setLoading(id);
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) throw new Error('Failed to delete project');
      router.refresh();
      onDelete?.(id);
    } catch (err) {
      console.error('Failed to delete project:', err);
      alert('Failed to delete project');
    } finally {
      setLoading(null);
    }
  }

  return (
    <div {...props}>
      <div className="mb-4">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
      </div>

      <div className={`divide-y divide-gray-200 dark:divide-gray-700 ${className || ''}`}>
        {filteredProjects.map((project) => (
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
        
        {filteredProjects.length === 0 && (
          <div className="py-6 text-center text-gray-500 dark:text-gray-400">
            {searchQuery ? 'No projects found matching your search.' : 'No projects found. Create your first project!'}
          </div>
        )}
      </div>
    </div>
  );
}