"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
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

export default function CareerView() {
  const params = useParams();
  const [career, setCareer] = useState<Career | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCareer = async () => {
      try {
        const response = await fetch(`/api/career/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setCareer(data);
        }
      } catch (error) {
        console.error('Failed to load career:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCareer();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!career) {
    return <div>Career entry not found</div>;
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">
        View Career Entry
      </h2>

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {career.degree}
            </h3>
            <p className="text-sm text-cyan-600 dark:text-cyan-400">
              {career.university}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Duration
            </label>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {new Date(career.startDate).toLocaleDateString('en-US', { 
                month: 'long', 
                year: 'numeric' 
              })} - {
                career.current ? 'Present' : career.endDate ? new Date(career.endDate).toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                }) : 'Present'
              }
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line">
              {career.description}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}