'use client';

import { Card } from '@/components/ui/Card';
import { PrismaClient } from '@prisma/client';
import { Bar, Pie } from 'react-chartjs-2';
import { format } from 'date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const prisma = new PrismaClient();

async function getAnalyticsData() {
  // Mock data - replace with actual DB queries
  return {
    summary: {
      totalVisits: 1250,
      uniqueVisitors: 850,
      avgTimeOnSite: '2m 30s'
    },
    pageViews: {
      '/': 450,
      '/projects': 380,
      '/about': 220,
      '/contact': 200
    },
    devices: {
      Desktop: 60,
      Mobile: 35,
      Tablet: 5
    },
    recentVisits: [
      { page: '/', device: 'Mobile', timestamp: new Date() },
      { page: '/projects', device: 'Desktop', timestamp: new Date() },
      { page: '/contact', device: 'Desktop', timestamp: new Date() }
    ]
  };
}

export default async function AnalyticsPage() {
  const data = await getAnalyticsData();

  const pageViewsData = {
    labels: Object.keys(data.pageViews),
    datasets: [
      {
        label: 'Page Views',
        data: Object.values(data.pageViews),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1
      }
    ]
  };

  const deviceData = {
    labels: Object.keys(data.devices),
    datasets: [
      {
        data: Object.values(data.devices),
        backgroundColor: [
          'rgba(59, 130, 246, 0.5)',
          'rgba(16, 185, 129, 0.5)',
          'rgba(249, 115, 22, 0.5)'
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(249, 115, 22)'
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">
          Analytics Dashboard
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 hover:shadow-lg transition-all duration-300">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Visits</h3>
          <p className="mt-2 text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
            {data.summary.totalVisits}
          </p>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Unique Visitors</h3>
          <p className="mt-2 text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
            {data.summary.uniqueVisitors}
          </p>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-300">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Time on Site</h3>
          <p className="mt-2 text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
            {data.summary.avgTimeOnSite}
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Page Views</h3>
          <div className="h-64">
            <Bar
              data={pageViewsData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: 'rgba(156, 163, 175, 0.1)'
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                }
              }}
            />
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Device Breakdown</h3>
          <div className="h-64">
            <Pie
              data={deviceData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      padding: 20
                    }
                  }
                }
              }}
            />
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Page</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Device</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {data.recentVisits.map((visit, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{visit.page}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{visit.device}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {format(visit.timestamp, 'PPp')}
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