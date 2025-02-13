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
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Certificates Management
        </h2>
      </div>

      <CertificateForm 
        certificate={editingCertificate}
        onSuccess={() => {
          loadCertificates();
          setEditingCertificate(null);
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <Card key={cert.id} className="glass-effect tech-border p-6 group">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500 group-hover:bg-clip-text transition-all duration-300">
                  {cert.name}
                </h3>
                <p className="text-cyan-400">{cert.issuer}</p>
                <p className="text-sm text-gray-400">
                  Issued: {new Date(cert.issueDate).toLocaleDateString('en-US', { 
                    month: 'long',
                    year: 'numeric'
                  })}
                  {cert.expiryDate && (
                    <span> - Expires: {new Date(cert.expiryDate).toLocaleDateString('en-US', { 
                      month: 'long',
                      year: 'numeric'
                    })}</span>
                  )}
                </p>
                {cert.credentialUrl && (
                  <a 
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 text-sm inline-flex items-center gap-1 transition-colors duration-300"
                  >
                    View Credential
                    <svg
                      className="w-4 h-4"
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
                  className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(cert.id)}
                  className="text-red-400 hover:text-red-300 transition-colors duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}