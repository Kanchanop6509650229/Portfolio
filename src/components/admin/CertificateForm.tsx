"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/Card';

export default function CertificateForm({ certificate = null, onSuccess = () => {} }) {
  const [formData, setFormData] = useState({
    name: certificate?.name || '',
    issuer: certificate?.issuer || '',
    issueDate: certificate?.issueDate ? new Date(certificate.issueDate).toISOString().split('T')[0] : '',
    expiryDate: certificate?.expiryDate ? new Date(certificate.expiryDate).toISOString().split('T')[0] : '',
    credentialUrl: certificate?.credentialUrl || ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/certificates', {
        method: certificate ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(certificate ? { ...formData, id: certificate.id } : formData),
      });

      if (!response.ok) throw new Error('Failed to save certificate');
      
      onSuccess();
      if (!certificate) {
        setFormData({
          name: '',
          issuer: '',
          issueDate: '',
          expiryDate: '',
          credentialUrl: ''
        });
      }
    } catch (error) {
      console.error('Error saving certificate:', error);
      alert('Failed to save certificate');
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Certificate Name
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Issuing Organization
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              value={formData.issuer}
              onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Issue Date
              <input
                type="date"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                value={formData.issueDate}
                onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Expiry Date (Optional)
              <input
                type="date"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              />
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Credential URL (Optional)
            <input
              type="url"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              value={formData.credentialUrl}
              onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
              placeholder="https://..."
            />
          </label>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          {certificate ? 'Update Certificate' : 'Add Certificate'}
        </button>
      </form>
    </Card>
  );
}