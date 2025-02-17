"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import ProjectForm from "@/components/admin/ProjectForm";
import ProjectList from "@/components/admin/ProjectList";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);

  const loadProjects = async () => {
    const response = await fetch("/api/projects");
    if (response.ok) {
      const data = await response.json();
      setProjects(data);
    }
  };

  const handleDelete = (id: number) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  useEffect(() => {
    loadProjects();
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
            Projects Management
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 order-2 lg:order-1">
          <Card className="p-6 overflow-hidden">
            <div className="overflow-x-auto">
              <ProjectList projects={projects} onDelete={handleDelete} />
            </div>
          </Card>
        </div>
        <div className="order-1 lg:order-2">
          <Card className="p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Add New Project
            </h3>
            <div className="mb-6 text-sm text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p>
                ✨ Add your project details below. All fields except GitHub URL
                are required.
              </p>
              <ul className="mt-2 ml-4 list-disc">
                <li>Title should be concise and clear (max 20 characters)</li>
                <li>
                  Description should explain the project's purpose and key
                  features (max 200 characters)
                </li>
                <li>
                  Technologies should be comma-separated (e.g., React,
                  TypeScript, Node.js)
                </li>
                <li>Featured projects will be highlighted on your portfolio</li>
              </ul>
            </div>
            <ProjectForm onSuccess={loadProjects} />
          </Card>
        </div>
      </div>
    </div>
  );
}
