"use client";

import { useState, useEffect } from 'react';
import CareerForm from '@/components/admin/CareerForm';
import CareerList from '@/components/admin/CareerList';
import { Card } from '@/components/ui/Card';
import { Career } from '@prisma/client';

export default function CareerPage() {
  const [careers, setCareers] = useState<Career[]>([]);

  const loadCareers = async () => {
    const response = await fetch('/api/career');
    if (response.ok) {
      const data = await response.json();
      setCareers(data);
    }
  };

  const handleDelete = async (id: number) => {
    const updatedCareers = careers.filter(career => career.id !== id);
    setCareers(updatedCareers);
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
              <CareerList careers={careers} onDelete={handleDelete} />
            </div>
          </Card>
        </div>

        <div>
          <Card className="p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Add New Career Entry
            </h3>
            <CareerForm
              experience={null}
              onSuccess={() => {
                loadCareers();
              }}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}