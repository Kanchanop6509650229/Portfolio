"use client";

import { useState, useEffect } from 'react';
import SkillForm from '@/components/admin/SkillForm';
import { Card } from '@/components/ui/Card';

interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const loadSkills = async () => {
    const response = await fetch('/api/skills');
    if (response.ok) {
      const data = await response.json();
      setSkills(data);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    
    const response = await fetch(`/api/skills?id=${id}`, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      loadSkills();
    } else {
      alert('Failed to delete skill');
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">
          Skills Management
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="p-6 overflow-hidden">
            <div className="overflow-x-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {skills.map((skill) => (
                  <div key={skill.id} className="glass-effect tech-border p-4 rounded-lg group">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-500 group-hover:bg-clip-text transition-all duration-300">
                          {skill.name}
                        </h3>
                        <p className="text-sm text-cyan-400">{skill.category}</p>
                      </div>
                      <div className="space-x-2">
                        <button
                          onClick={() => setEditingSkill(skill)}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(skill.id)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full"
                          style={{ width: `${(skill.proficiency / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Card className="p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              {editingSkill ? 'Edit Skill' : 'Add New Skill'}
            </h3>
            <SkillForm
              skill={editingSkill}
              onSuccess={() => {
                loadSkills();
                setEditingSkill(null);
              }}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}