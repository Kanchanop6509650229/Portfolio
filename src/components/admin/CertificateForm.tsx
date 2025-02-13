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
    <Card className="glass-effect tech-border p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-cyan-400">
              Certificate Name
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-lg border-0 bg-gray-800/50 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-cyan-500 tech-border"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-cyan-400">
              Issuing Organization
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-lg border-0 bg-gray-800/50 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-cyan-500 tech-border"
                value={formData.issuer}
                onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-cyan-400">
                Issue Date
                <input
                  type="date"
                  required
                  className="mt-1 block w-full rounded-lg border-0 bg-gray-800/50 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-cyan-500 tech-border"
                  value={formData.issueDate}
                  onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                />
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-cyan-400">
                Expiry Date (Optional)
                <input
                  type="date"
                  className="mt-1 block w-full rounded-lg border-0 bg-gray-800/50 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-cyan-500 tech-border"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-cyan-400">
              Credential URL (Optional)
              <input
                type="url"
                className="mt-1 block w-full rounded-lg border-0 bg-gray-800/50 text-white shadow-sm ring-1 ring-inset ring-gray-700 focus:ring-2 focus:ring-cyan-500 tech-border"
                value={formData.credentialUrl}
                onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                placeholder="https://"
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500 rounded-lg transition-all duration-300 tech-border"
        >
          {certificate ? 'Update Certificate' : 'Add Certificate'}
        </button>
      </form>
    </Card>
  );
}