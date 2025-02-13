'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Project } from '@prisma/client';

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
    } catch (error) {
      alert('Failed to delete project');
    } finally {
      setLoading(null);
    }
  }

  async function toggleFeatured(id: number, featured: boolean) {
    setLoading(id);
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !featured }),
      });
      
      if (!res.ok) throw new Error('Failed to update project');
      router.refresh();
    } catch (error) {
      alert('Failed to update project');
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {projects.map((project) => (
            <tr key={project.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{project.title}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  project.featured ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {project.featured ? 'Featured' : 'Standard'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(project.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <button
                  onClick={() => toggleFeatured(project.id, project.featured)}
                  disabled={loading === project.id}
                  className="text-blue-600 hover:text-blue-900"
                >
                  {loading === project.id ? 'Updating...' : (project.featured ? 'Unfeature' : 'Feature')}
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  disabled={loading === project.id}
                  className="text-red-600 hover:text-red-900"
                >
                  {loading === project.id ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}