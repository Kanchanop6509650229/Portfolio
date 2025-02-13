"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';

export default function CareerForm({ experience = null, onSuccess = () => {} }) {
  const [formData, setFormData] = useState({
    company: experience?.company || '',
    position: experience?.position || '',
    startDate: experience?.startDate ? new Date(experience.startDate).toISOString().split('T')[0] : '',
    endDate: experience?.endDate ? new Date(experience.endDate).toISOString().split('T')[0] : '',
    description: experience?.description || '',
    current: experience?.current || false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/career', {
        method: experience ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(experience ? { ...formData, id: experience.id } : formData),
      });

      if (!response.ok) throw new Error('Failed to save career experience');
      
      onSuccess();
      if (!experience) {
        setFormData({
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          description: '',
          current: false
        });
      }
    } catch (error) {
      console.error('Error saving career experience:', error);
      alert('Failed to save career experience');
    }
  };

  return (
    <Card className="glass-effect tech-border p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-cyan-400">
              Company
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-lg border-0 bg-gray-800/50 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-cyan-500 tech-border"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-cyan-400">
              Position
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-lg border-0 bg-gray-800/50 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-cyan-500 tech-border"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-cyan-400">
                Start Date
                <input
                  type="date"
                  required
                  className="mt-1 block w-full rounded-lg border-0 bg-gray-800/50 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-cyan-500 tech-border"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-cyan-400">
                End Date
                <input
                  type="date"
                  className="mt-1 block w-full rounded-lg border-0 bg-gray-800/50 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-cyan-500 tech-border disabled:opacity-50 disabled:cursor-not-allowed"
                  value={formData.endDate}
                  disabled={formData.current}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </label>
            </div>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-cyan-400 cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-gray-700 bg-gray-800/50 text-cyan-500 shadow-sm focus:ring-cyan-500 focus:ring-offset-gray-900"
                checked={formData.current}
                onChange={(e) => setFormData({ ...formData, current: e.target.checked })}
              />
              <span className="ml-2">Current Position</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-cyan-400">
              Description
              <textarea
                required
                rows={4}
                className="mt-1 block w-full rounded-lg border-0 bg-gray-800/50 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-cyan-500 tech-border"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 rounded-lg transition-all duration-300 tech-border"
        >
          {experience ? 'Update Experience' : 'Add Experience'}
        </button>
      </form>
    </Card>
  );
}