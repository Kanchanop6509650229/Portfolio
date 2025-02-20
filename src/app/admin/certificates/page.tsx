"use client";

import { useState, useEffect } from "react";
import CertificateForm from "@/components/admin/CertificateForm";
import CertificateList from "@/components/admin/CertificateList";
import { Card } from "@/components/ui/Card";
import { Certificate } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

export default function CertificatesPage() {
  const router = useRouter();
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  const loadCertificates = async () => {
    const response = await fetch("/api/certificates");
    if (response.ok) {
      const data = await response.json();
      setCertificates(data);
    }
  };

  const handleDelete = async (id: number) => {
    const updatedCertificates = certificates.filter(
      (certificate) => certificate.id !== id
    );
    setCertificates(updatedCertificates);
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/admin")}
            className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">
            Certificates Management
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 order-2 lg:order-1">
          <Card className="p-6 overflow-hidden">
            <div className="overflow-x-auto">
              <CertificateList
                certificates={certificates}
                onDelete={handleDelete}
              />
            </div>
          </Card>
        </div>

        <div className="order-1 lg:order-2">
          <Card className="p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Add New Certificate
            </h3>
            <div className="mb-6 text-sm text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p>
                📜 Add your certificate details below. All fields except Expiry
                Date and Credential URL are required.
              </p>
              <ul className="mt-2 ml-4 list-disc">
                <li>Name should be the full title of the certification</li>
                <li>Issuer is the organization that granted the certificate</li>
                <li>Issue Date must be a valid date</li>
                <li>
                  Expiry Date is optional - leave blank for non-expiring
                  certificates
                </li>
                <li>
                  Credential URL should link to the verification page (if
                  available)
                </li>
              </ul>
            </div>
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
