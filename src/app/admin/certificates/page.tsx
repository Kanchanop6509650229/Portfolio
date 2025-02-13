"use client";

import { useState, useEffect } from 'react';
import CertificateForm from '@/components/admin/CertificateForm';

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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Certificates Management</h2>
      <CertificateForm 
        certificate={editingCertificate}
        onSuccess={() => {
          loadCertificates();
          setEditingCertificate(null);
        }}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certificates.map((cert) => (
          <div key={cert.id} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{cert.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{cert.issuer}</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Issued: {new Date(cert.issueDate).toLocaleDateString()}
                  {cert.expiryDate && ` - Expires: ${new Date(cert.expiryDate).toLocaleDateString()}`}
                </p>
                {cert.credentialUrl && (
                  <a 
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 text-sm mt-2 inline-block"
                  >
                    View Credential
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
  );
}