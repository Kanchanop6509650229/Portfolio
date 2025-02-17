"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { FiArrowLeft, FiEdit2 } from 'react-icons/fi';

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
  const router = useRouter();
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">
            View Career Entry
          </h2>
        </div>
        <button
          onClick={() => router.push(`/admin/career/edit/${params.id}`)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          <FiEdit2 className="w-4 h-4" />
          Edit Career
        </button>
      </div>

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
            <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line break-words">
              {career.description}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}