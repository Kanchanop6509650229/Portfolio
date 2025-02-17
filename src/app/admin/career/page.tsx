"use client";

import { useState, useEffect } from "react";
import CareerForm from "@/components/admin/CareerForm";
import CareerList from "@/components/admin/CareerList";
import { Card } from "@/components/ui/Card";
import { Career } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

export default function CareerPage() {
  const router = useRouter();
  const [careers, setCareers] = useState<Career[]>([]);

  const loadCareers = async () => {
    const response = await fetch("/api/career");
    if (response.ok) {
      const data = await response.json();
      setCareers(data);
    }
  };

  const handleDelete = async (id: number) => {
    const updatedCareers = careers.filter((career) => career.id !== id);
    setCareers(updatedCareers);
  };

  useEffect(() => {
    loadCareers();
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
            Career Management
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 order-2 lg:order-1">
          <Card className="p-6 overflow-hidden">
            <div className="overflow-x-auto">
              <CareerList careers={careers} onDelete={handleDelete} />
            </div>
          </Card>
        </div>

        <div className="order-1 lg:order-2">
          <Card className="p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Add New Career Entry
            </h3>
            <div className="mb-6 text-sm text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p>
                🎓 Add your career/education entry below. All fields except End
                Date are required.
              </p>
              <ul className="mt-2 ml-4 list-disc">
                <li>
                  Degree should include the full degree name and specialization
                </li>
                <li>University should be the official institution name</li>
                <li>Start Date must be a valid date</li>
                <li>Leave End Date blank if this is your current education</li>
                <li>
                  Description should highlight key achievements and
                  responsibilities
                </li>
              </ul>
            </div>
            <CareerForm
              experience={null}
              onSuccess={() => {
                loadCareers();
              }}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
