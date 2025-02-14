'use client';

import type { HTMLAttributes } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';

interface Career {
  id: number;
  degree: string;
  university: string;
  startDate: string;
  endDate: string | null;
  description: string;
  current: boolean;
}

interface CareerListProps extends HTMLAttributes<HTMLDivElement> {
  careers: Career[];
  onEdit: (career: Career) => void;
}

export default function CareerList({ careers, onEdit, className, ...props }: CareerListProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<number | null>(null);

  async function handleDelete(id: number) {
    if (!confirm('Are you sure you want to delete this career entry?')) return;
    
    setLoading(id);
    try {
      const res = await fetch(`/api/career/${id}`, {
        method: 'DELETE'
      });
      
      if (!res.ok) throw new Error('Failed to delete career entry');
      router.refresh();
    } catch (err) {
      console.error('Failed to delete career entry:', err);
      alert('Failed to delete career entry');
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className={`divide-y divide-gray-200 dark:divide-gray-700 ${className || ''}`} {...props}>
      {careers.map((career) => (
        <div 
          key={career.id}
          className="py-4 first:pt-0 last:pb-0 transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                {career.degree}
              </h3>
              <p className="mt-1 text-sm text-cyan-600 dark:text-cyan-400">
                {career.university}
              </p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {new Date(career.startDate).toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                })} - {
                  career.current ? 'Present' : career.endDate ? new Date(career.endDate).toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  }) : 'Present'
                }
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {career.description}
              </p>
            </div>
            <div className="ml-4 flex items-center gap-2">
              <button
                onClick={() => router.push(`/admin/career/${career.id}`)}
                title="View"
                className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <FiEye className="w-5 h-5" />
              </button>
              <button
                onClick={() => onEdit(career)}
                title="Edit"
                className="p-2 text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <FiEdit2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDelete(career.id)}
                disabled={loading === career.id}
                title="Delete"
                className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <FiTrash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {careers.length === 0 && (
        <div className="py-6 text-center text-gray-500 dark:text-gray-400">
          No career entries found. Create your first career entry!
        </div>
      )}
    </div>
  );
}