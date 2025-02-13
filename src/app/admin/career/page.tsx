"use client";

import { useState, useEffect } from 'react';
import CareerForm from '@/components/admin/CareerForm';
import { Card } from '@/components/ui/Card';

export default function CareerPage() {
  const [careers, setCareers] = useState([]);
  const [editingCareer, setEditingCareer] = useState(null);

  const loadCareers = async () => {
    const response = await fetch('/api/career');
    if (response.ok) {
      const data = await response.json();
      setCareers(data);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this career entry?')) return;
    
    const response = await fetch(`/api/career?id=${id}`, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      loadCareers();
    } else {
      alert('Failed to delete career entry');
    }
  };

  useEffect(() => {
    loadCareers();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">
          Career Management
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="p-6 overflow-hidden">
            <div className="overflow-x-auto">
              <div className="grid grid-cols-1 gap-4">
                {careers.map((career) => (
                  <div key={career.id} className="glass-effect tech-border p-4 rounded-lg group">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-500 group-hover:bg-clip-text transition-all duration-300">
                          {career.university}
                        </h3>
                        <p className="text-cyan-400">{career.degree}</p>
                        <p className="text-sm text-gray-400">
                          {new Date(career.startDate).toLocaleDateString('en-US', { 
                            month: 'long', 
                            year: 'numeric' 
                          })} - {
                            career.endDate ? new Date(career.endDate).toLocaleDateString('en-US', { 
                              month: 'long', 
                              year: 'numeric' 
                            }) : 'Present'
                          }
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">{career.description}</p>
                      </div>
                      <div className="space-x-2">
                        <button
                          onClick={() => setEditingCareer(career)}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(career.id)}
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
          </Card>
        </div>

        <div>
          <Card className="p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              {editingCareer ? 'Edit Career Entry' : 'Add New Career Entry'}
            </h3>
            <CareerForm
              experience={editingCareer}
              onSuccess={() => {
                loadCareers();
                setEditingCareer(null);
              }}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}