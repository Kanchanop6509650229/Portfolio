'use client';

import type { HTMLAttributes } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiEdit2, FiTrash2, FiExternalLink, FiEye } from 'react-icons/fi';

interface Certificate {
  id: number;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate: string | null;
  credentialUrl: string | null;
}

interface CertificateListProps extends HTMLAttributes<HTMLDivElement> {
  certificates: Certificate[];
  onEdit: (certificate: Certificate) => void;
}

export default function CertificateList({ certificates, onEdit, className, ...props }: CertificateListProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<number | null>(null);

  async function handleDelete(id: number) {
    if (!confirm('Are you sure you want to delete this certificate?')) return;
    
    setLoading(id);
    try {
      const res = await fetch(`/api/certificates/${id}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) throw new Error('Failed to delete certificate');
      router.refresh();
    } catch (err) {
      console.error('Failed to delete certificate:', err);
      alert('Failed to delete certificate');
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className={`divide-y divide-gray-200 dark:divide-gray-700 ${className || ''}`} {...props}>
      {certificates.map((cert) => (
        <div 
          key={cert.id}
          className="py-4 first:pt-0 last:pb-0 transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                {cert.name}
              </h3>
              <p className="mt-1 text-sm text-cyan-600 dark:text-cyan-400">
                {cert.issuer}
              </p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Issued: {new Date(cert.issueDate).toLocaleDateString()}
                {cert.expiryDate && ` · Expires: ${new Date(cert.expiryDate).toLocaleDateString()}`}
              </p>
            </div>
            <div className="ml-4 flex items-center gap-2">
              <button
                onClick={() => router.push(`/admin/certificates/${cert.id}`)}
                title="View"
                className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <FiEye className="w-5 h-5" />
              </button>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View Certificate"
                  className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <FiExternalLink className="w-5 h-5" />
                </a>
              )}
              <button
                onClick={() => onEdit(cert)}
                title="Edit"
                className="p-2 text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <FiEdit2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDelete(cert.id)}
                disabled={loading === cert.id}
                title="Delete"
                className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <FiTrash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {certificates.length === 0 && (
        <div className="py-6 text-center text-gray-500 dark:text-gray-400">
          No certificates found. Create your first certificate!
        </div>
      )}
    </div>
  );
}