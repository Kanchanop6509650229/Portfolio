"use client";

import { useState, useEffect } from 'react';
import CareerForm from '@/components/admin/CareerForm';
import CareerList from '@/components/admin/CareerList';
import { Card } from '@/components/ui/Card';

interface Career {
  id: number;
  degree: string;
  university: string;
  startDate: string;
  endDate: string | null;
  description: string;
  current: boolean;
}

export default function CareerPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [editingCareer, setEditingCareer] = useState<Career | null>(null);

  const loadCareers = async () => {
    const response = await fetch('/api/career');
    if (response.ok) {
      const data = await response.json();
      setCareers(data);
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
              <CareerList 
                careers={careers} 
                onEdit={setEditingCareer} 
              />
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