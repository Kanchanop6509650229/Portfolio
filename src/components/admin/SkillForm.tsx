"use client";

import { useState, useEffect } from 'react';

interface SkillFormProps {
  skill: {
    id: number;
    name: string;
    category: string;
    proficiency: number;
  } | null;
  onSuccess: () => void;
}

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

// Get all available skill names from icon mapping
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
];

export default function SkillForm({ skill = null, onSuccess = () => {} }: SkillFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    proficiency: 3
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (skill) {
      setFormData({
        name: skill.name,
        category: skill.category,
        proficiency: skill.proficiency
      });
    }
  }, [skill]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, name: value });
    
    // Filter suggestions based on input
    if (value.length > 0) {
      const filtered = AVAILABLE_SKILLS.filter(skill => 
        skill.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5); // Limit to 5 suggestions
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setFormData({ ...formData, name: suggestion });
    setShowSuggestions(false);
  };

  // Hide suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowSuggestions(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = skill ? `/api/skills/${skill.id}` : '/api/skills';
      const method = skill ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save skill');
      
      onSuccess();
      if (!skill) {
        setFormData({ name: '', category: '', proficiency: 3 });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="relative">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Skill Name
        </label>
        <input
          type="text"
          id="name"
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
          value={formData.name}
          onChange={handleNameChange}
          autoComplete="off"
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
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
          min="1"
          max="5"
          className="w-full"
          value={formData.proficiency}
          onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value) })}
        />
        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
          <span>Beginner</span>
          <span>Expert</span>
        </div>
      </div>

      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 dark:from-blue-500 dark:to-cyan-500 dark:hover:from-blue-600 dark:hover:to-cyan-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Saving...' : (skill ? 'Update Skill' : 'Add Skill')}
      </button>
    </form>
  );
}