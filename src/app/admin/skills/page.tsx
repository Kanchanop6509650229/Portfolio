"use client";

import { useState, useEffect } from 'react';
import SkillForm from '@/components/admin/SkillForm';
import SkillList from '@/components/admin/SkillList';
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
              <SkillList 
                skills={skills} 
                onEdit={setEditingSkill} 
              />
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