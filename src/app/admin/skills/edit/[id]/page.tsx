'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Skill } from '@prisma/client';
import { FiArrowLeft } from 'react-icons/fi';

const SKILL_CATEGORIES = [
  'Programming Language',
  'Front-end',
  'Back-end',
  'Database',
  'DevOps & Deployment',
  'AI-Tools',
  'Operating System',
  'Tools'
] as const;

// Add available skills constant
const AVAILABLE_SKILLS = [
  'JavaScript',
  'TypeScript',
  'Python',
  'React',
  'HTML',
  'CSS',
  'Tailwind CSS',
  'Node.js',
  'Express',
  'MySQL',
  'PostgreSQL',
  'MongoDB',
  'Git',
  'GitHub',
  'GitLab',
  'Docker',
  'Kubernetes',
  'AWS',
  'Google Cloud',
  'Azure',
  'Firebase',
  'Redux',
  'Next.js',
  'Vue',
  'Angular',
  'Svelte',
  'GraphQL',
  'PHP',
  'Laravel',
  'Java',
  'Spring',
  'C#',
  '.NET',
  'C++',
  'Ruby',
  'Ruby on Rails',
  'Rust',
  'Go',
  'Kotlin',
  'Swift',
  'Flutter',
  'Dart',
  'React Native',
  'Electron',
  'Redis',
  'Sass',
  'Less',
  'Bootstrap',
  'Material UI',
  'Webpack',
  'Vite',
  'Jest',
  'Testing Library',
  'Cypress',
  'Jenkins',
  'CircleCI',
  'GitHub Actions',
  'Nginx',
  'Apache',
  'Linux',
  'Ubuntu',
  'Debian',
  'Windows',
  'MacOS',
  'Android',
  'iOS',
  'WordPress',
  'Shopify',
  'Drupal',
  'Joomla',
  'VS Code',
  'IntelliJ',
  'PyCharm',
  'WebStorm',
  'Postman',
  'Figma',
  'Adobe XD',
  'Photoshop',
  'Illustrator',
  'Slack',
  'Discord',
  'Jira',
  'Trello',
  'Visual Studio',
  'Sublime',
  'Atom',
  'Vim',
  'Emacs',
  'Digital Ocean',
  'Heroku',
  'Netlify',
  'Vercel',
  'SQLite',
  'Oracle',
  'Cassandra',
  'Django',
  'Flask',
  'ASP.NET',
  'Nuxt',
  'Gatsby',
  'npm',
  'yarn',
  'pnpm',
  'ESLint',
  'Prettier',
  'Babel',
  'Mocha',
  'Jasmine',
  'Selenium',
  'Travis',
  'Bitbucket',
  'Docker Compose',
  'Podman',
  'CentOS',
  'Red Hat',
  'Alpine',
] as const;

export default function EditSkillPage() {
  const router = useRouter();
  const params = useParams();
  const [skill, setSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [skillName, setSkillName] = useState('');

  useEffect(() => {
    async function fetchSkill() {
      if (!params?.id) return;
      try {
        const res = await fetch(`/api/skills/${params.id}`);
        if (!res.ok) throw new Error('Failed to fetch skill');
        const data = await res.json();
        setSkill(data);
      } catch (err) {
        console.error('Failed to fetch skill:', err);
        setError('Failed to fetch skill');
      }
    }
    fetchSkill();
  }, [params?.id]);

  // Add handlers for suggestions
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSkillName(value);
    
    if (value.length > 0) {
      const filtered = AVAILABLE_SKILLS.filter(skill => 
        skill.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSkillName(suggestion);
    setShowSuggestions(false);
  };

  // Add effect for clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowSuggestions(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Set initial skill name when skill data is loaded
  useEffect(() => {
    if (skill) {
      setSkillName(skill.name);
    }
  }, [skill]);

  // Update handleSubmit to use skillName state
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: skillName,
      category: formData.get('category'),
      proficiency: parseInt(formData.get('proficiency') as string)
    };

    try {
      const res = await fetch(`/api/skills/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to update skill');

      router.push('/admin/skills');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-500 dark:text-red-400">{error}</div>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">
          Edit Skill
        </h2>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/50 rounded-lg">
              {error}
            </div>
          )}

          <div className="relative">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={skillName}
              onChange={handleNameChange}
              required
              autoComplete="off"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
            />
            
            {/* Suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 max-h-60 overflow-auto">
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              defaultValue={skill.category}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
            >
              <option value="">Select a category</option>
              {SKILL_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="proficiency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Proficiency (1-5)
            </label>
            <input
              type="range"
              id="proficiency"
              name="proficiency"
              min="1"
              max="5"
              defaultValue={skill.proficiency}
              required
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
              <span>Beginner</span>
              <span>Expert</span>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 dark:from-blue-500 dark:to-cyan-500 dark:hover:from-blue-600 dark:hover:to-cyan-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}