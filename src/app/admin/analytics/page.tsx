'use client';

import { Card } from '@/components/ui/Card';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { useEffect, useState } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface AnalyticsData {
  analytics: any[];
  summary: {
    totalVisits: number;
    uniqueVisitors: number;
    topPages: Array<{ pageUrl: string; _count: number }>;
    deviceBreakdown: Array<{ deviceType: string; _count: number }>;
  };
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics')
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading analytics...</div>;
  if (!data) return <div>Failed to load analytics</div>;

  const pageViewsData = {
    labels: data.summary.topPages.map(p => p.pageUrl),
    datasets: [
      {
        label: 'Page Views',
        data: data.summary.topPages.map(p => p._count),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
    ],
  };

  const deviceData = {
    labels: data.summary.deviceBreakdown.map(d => d.deviceType),
    datasets: [
      {
        data: data.summary.deviceBreakdown.map(d => d._count),
        backgroundColor: [
          'rgba(59, 130, 246, 0.5)',
          'rgba(16, 185, 129, 0.5)',
          'rgba(245, 158, 11, 0.5)',
        ],
      },
    ],
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900">Total Visits</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">{data.summary.totalVisits}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900">Unique Visitors</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">{data.summary.uniqueVisitors}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Pages</h3>
          <div className="h-64">
            <Bar
              data={pageViewsData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Device Breakdown</h3>
          <div className="h-64">
            <Pie
              data={deviceData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Visits</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Page</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Device</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.analytics.slice(0, 10).map((visit: any) => (
                <tr key={visit.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{visit.pageUrl}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visit.deviceType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{visit.countryCode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(visit.visitDate).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}