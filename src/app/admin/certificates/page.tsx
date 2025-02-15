"use client";

import { useState, useEffect } from 'react';
import CertificateForm from '@/components/admin/CertificateForm';
import CertificateList from '@/components/admin/CertificateList';
import { Card } from '@/components/ui/Card';
import { Certificate } from '@prisma/client';

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  const loadCertificates = async () => {
    const response = await fetch('/api/certificates');
    if (response.ok) {
      const data = await response.json();
      setCertificates(data);
    }
  };

  const handleDelete = async (id: number) => {
    const updatedCertificates = certificates.filter(certificate => certificate.id !== id);
    setCertificates(updatedCertificates);
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
              <CertificateList certificates={certificates} onDelete={handleDelete} />
            </div>
          </Card>
        </div>

        <div>
          <Card className="p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Add New Certificate
            </h3>
            <CertificateForm
              certificate={null}
              onSuccess={() => {
                loadCertificates();
              }}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}