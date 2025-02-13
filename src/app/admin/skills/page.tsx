"use client";

import { useState, useEffect } from 'react';
import SkillForm from '@/components/admin/SkillForm';

export default function SkillsPage() {
  const [skills, setSkills] = useState([]);
  const [editingSkill, setEditingSkill] = useState(null);

  const loadSkills = async () => {
    const response = await fetch('/api/skills');
    if (response.ok) {
      const data = await response.json();
      setSkills(data);
    }
  };

  const handleDelete = async (id) => {
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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Skills Management</h2>
      <SkillForm 
        skill={editingSkill} 
        onSuccess={() => {
          loadSkills();
          setEditingSkill(null);
        }} 
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div key={skill.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{skill.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{skill.category}</p>
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
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full" 
                  style={{ width: `${(skill.proficiency / 5) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}