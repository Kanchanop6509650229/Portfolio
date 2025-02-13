"use client";

import { useState, useEffect } from 'react';
import CareerForm from '@/components/admin/CareerForm';

export default function CareerPage() {
  const [experiences, setExperiences] = useState([]);
  const [editingExperience, setEditingExperience] = useState(null);

  const loadExperiences = async () => {
    const response = await fetch('/api/career');
    if (response.ok) {
      const data = await response.json();
      setExperiences(data);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;
    
    const response = await fetch(`/api/career?id=${id}`, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      loadExperiences();
    } else {
      alert('Failed to delete experience');
    }
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Career Management</h2>
      <CareerForm 
        experience={editingExperience}
        onSuccess={() => {
          loadExperiences();
          setEditingExperience(null);
        }}
      />
      <div className="space-y-4">
        {experiences.map((experience) => (
          <div key={experience.id} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{experience.position}</h3>
                <p className="text-gray-600 dark:text-gray-400">{experience.company}</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  {new Date(experience.startDate).toLocaleDateString()} - 
                  {experience.current ? 'Present' : new Date(experience.endDate).toLocaleDateString()}
                </p>
                <p className="mt-2">{experience.description}</p>
              </div>
              <div className="space-x-2">
                <button 
                  onClick={() => setEditingExperience(experience)}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(experience.id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}