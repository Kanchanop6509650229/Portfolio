"use client";

import { useState, useEffect } from "react";
import SkillForm from "@/components/admin/SkillForm";
import SkillList from "@/components/admin/SkillList";
import { Card } from "@/components/ui/Card";
import { Skill } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

export default function SkillsPage() {
  const router = useRouter();
  const [skills, setSkills] = useState<Skill[]>([]);

  const loadSkills = async () => {
    const response = await fetch("/api/skills");
    if (response.ok) {
      const data = await response.json();
      setSkills(data);
    }
  };

  const handleDelete = async (id: number) => {
    const updatedSkills = skills.filter((skill) => skill.id !== id);
    setSkills(updatedSkills);
  };

  useEffect(() => {
    loadSkills();
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
            Skills Management
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 order-2 lg:order-1">
          <Card className="p-6 overflow-hidden">
            <div className="overflow-x-auto">
              <SkillList skills={skills} onDelete={handleDelete} />
            </div>
          </Card>
        </div>

        <div className="order-1 lg:order-2">
          <Card className="p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Add New Skill
            </h3>
            <div className="mb-6 text-sm text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p>⚡ Add your skill details below. All fields are required.</p>
              <ul className="mt-2 ml-4 list-disc">
                <li>
                  Start typing a skill name to see suggestions from our
                  predefined list
                </li>
                <li>Choose a category that best fits the skill</li>
                <li>
                  Set your proficiency level from 1 (Beginner) to 5 (Expert)
                </li>
                <li>
                  Be honest with your proficiency level - it helps build trust
                </li>
              </ul>
            </div>
            <SkillForm
              skill={null}
              onSuccess={() => {
                loadSkills();
              }}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
