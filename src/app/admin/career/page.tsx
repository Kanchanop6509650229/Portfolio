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
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Career Management
        </h2>
      </div>

      <CareerForm 
        experience={editingCareer}
        onSuccess={() => {
          loadCareers();
          setEditingCareer(null);
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {careers.map((career) => (
          <Card key={career.id} className="glass-effect tech-border p-6 group">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500 group-hover:bg-clip-text transition-all duration-300">
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
                    }) : ''
                  }
                </p>
                <p className="text-gray-300 mt-2 line-clamp-3">{career.description}</p>
              </div>
              <div className="space-x-2">
                <button 
                  onClick={() => setEditingCareer(career)}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(career.id)}
                  className="text-red-400 hover:text-red-300 transition-colors duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}