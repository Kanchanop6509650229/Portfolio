"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';

export default function SkillForm({ skill = null, onSuccess = () => {} }) {
  const [formData, setFormData] = useState({
    name: skill?.name || '',
    category: skill?.category || '',
    proficiency: skill?.proficiency || 3
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/skills', {
        method: skill ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skill ? { ...formData, id: skill.id } : formData),
      });

      if (!response.ok) throw new Error('Failed to save skill');
      
      onSuccess();
      if (!skill) {
        setFormData({ name: '', category: '', proficiency: 3 });
      }
    } catch (error) {
      console.error('Error saving skill:', error);
      alert('Failed to save skill');
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Skill Name
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Category
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Proficiency (1-5)
            <input
              type="range"
              min="1"
              max="5"
              className="mt-1 block w-full"
              value={formData.proficiency}
              onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value) })}
            />
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
              <span>Beginner</span>
              <span>Expert</span>
            </div>
          </label>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          {skill ? 'Update Skill' : 'Add Skill'}
        </button>
      </form>
    </Card>
  );
}