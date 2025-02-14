'use client';

import type { HTMLAttributes } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
}

interface SkillListProps extends HTMLAttributes<HTMLDivElement> {
  skills: Skill[];
  onEdit: (skill: Skill) => void;
}

export default function SkillList({ skills, onEdit, className, ...props }: SkillListProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<number | null>(null);

  async function handleDelete(id: number) {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    
    setLoading(id);
    try {
      const res = await fetch(`/api/skills/${id}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) throw new Error('Failed to delete skill');
      router.refresh();
    } catch (err) {
      console.error('Failed to delete skill:', err);
      alert('Failed to delete skill');
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className={`divide-y divide-gray-200 dark:divide-gray-700 ${className || ''}`} {...props}>
      {skills.map((skill) => (
        <div 
          key={skill.id}
          className="py-4 first:pt-0 last:pb-0 transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                {skill.name}
              </h3>
              <p className="mt-1 text-sm text-cyan-600 dark:text-cyan-400">
                {skill.category}
              </p>
              <div className="mt-2 w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${(skill.proficiency / 5) * 100}%` }}
                />
              </div>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={() => onEdit(skill)}
                className="p-2 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              >
                <FiEdit2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDelete(skill.id)}
                disabled={loading === skill.id}
                className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors disabled:opacity-50"
              >
                <FiTrash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}