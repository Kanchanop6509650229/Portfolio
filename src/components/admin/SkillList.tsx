'use client';

import type { HTMLAttributes } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiEdit2, FiTrash2, FiEye, FiSearch } from 'react-icons/fi';
import { Skill } from '@prisma/client';

interface SkillListProps extends HTMLAttributes<HTMLDivElement> {
  skills: Skill[];
  onDelete?: (id: number) => void;
}

export default function SkillList({ skills, onDelete, className, ...props }: SkillListProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSkills = skills.filter(skill => 
    skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    skill.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  async function handleDelete(id: number) {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    
    setLoading(id);
    try {
      const res = await fetch(`/api/skills/${id}`, {
        method: 'DELETE'
      });
      
      if (!res.ok) throw new Error('Failed to delete skill');
      router.refresh();
      onDelete?.(id);
    } catch (err) {
      console.error('Failed to delete skill:', err);
      alert('Failed to delete skill');
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
            placeholder="Search skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>
      </div>

      <div className={`divide-y divide-gray-200 dark:divide-gray-700 ${className || ''}`}>
        {filteredSkills.map((skill) => (
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
              <div className="ml-4 flex items-center gap-2">
                <button
                  onClick={() => router.push(`/admin/skills/${skill.id}`)}
                  title="View"
                  className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <FiEye className="w-5 h-5" />
                </button>
                <button
                  onClick={() => router.push(`/admin/skills/edit/${skill.id}`)}
                  title="Edit"
                  className="p-2 text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <FiEdit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(skill.id)}
                  disabled={loading === skill.id}
                  title="Delete"
                  className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiTrash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredSkills.length === 0 && (
          <div className="py-6 text-center text-gray-500 dark:text-gray-400">
            {searchQuery ? 'No skills found matching your search.' : 'No skills found. Create your first skill!'}
          </div>
        )}
      </div>
    </div>
  );
}