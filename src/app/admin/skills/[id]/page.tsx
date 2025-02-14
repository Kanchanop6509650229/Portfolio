"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/Card';

interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
}

export default function SkillView() {
  const params = useParams();
  const [skill, setSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSkill = async () => {
      try {
        const response = await fetch(`/api/skills/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setSkill(data);
        }
      } catch (error) {
        console.error('Failed to load skill:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSkill();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!skill) {
    return <div>Skill not found</div>;
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">
        View Skill
      </h2>

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {skill.name}
            </h3>
            <p className="text-sm text-cyan-600 dark:text-cyan-400">
              {skill.category}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Proficiency
            </label>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${(skill.proficiency / 5) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1">
              <span>Beginner</span>
              <span>Expert</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}