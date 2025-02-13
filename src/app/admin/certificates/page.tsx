"use client";

import { useState, useEffect } from 'react';
import CertificateForm from '@/components/admin/CertificateForm';
import { Card } from '@/components/ui/Card';

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState([]);
  const [editingCertificate, setEditingCertificate] = useState(null);

  const loadCertificates = async () => {
    const response = await fetch('/api/certificates');
    if (response.ok) {
      const data = await response.json();
      setCertificates(data);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this certificate?')) return;
    
    const response = await fetch(`/api/certificates?id=${id}`, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      loadCertificates();
    } else {
      alert('Failed to delete certificate');
    }
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">
          Certificates Management
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="p-6 overflow-hidden">
            <div className="overflow-x-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certificates.map((cert) => (
                  <div key={cert.id} className="glass-effect tech-border p-4 rounded-lg group">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-500 group-hover:bg-clip-text transition-all duration-300">
                          {cert.name}
                        </h3>
                        <p className="text-cyan-400">{cert.issuer}</p>
                        <div className="text-sm text-gray-400 space-y-1">
                          <p>Issued: {new Date(cert.issueDate).toLocaleDateString('en-US', { 
                            month: 'long', 
                            year: 'numeric' 
                          })}</p>
                          {cert.expiryDate && (
                            <p>Expires: {new Date(cert.expiryDate).toLocaleDateString('en-US', { 
                              month: 'long', 
                              year: 'numeric' 
                            })}</p>
                          )}
                        </div>
                        {cert.credentialUrl && (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                          >
                            View Credential
                            <svg
                              className="w-4 h-4 ml-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </a>
                        )}
                      </div>
                      <div className="space-x-2">
                        <button
                          onClick={() => setEditingCertificate(cert)}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(cert.id)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Card className="p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              {editingCertificate ? 'Edit Certificate' : 'Add New Certificate'}
            </h3>
            <CertificateForm
              certificate={editingCertificate}
              onSuccess={() => {
                loadCertificates();
                setEditingCertificate(null);
              }}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}