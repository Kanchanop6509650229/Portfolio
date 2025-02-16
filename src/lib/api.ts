export async function getSkills() {
  const response = await fetch('/api/skills');
  if (!response.ok) throw new Error('Failed to fetch skills');
  return response.json();
}

export async function getCareers() {
  const response = await fetch('/api/career');
  if (!response.ok) throw new Error('Failed to fetch career data');
  return response.json();
}

export async function getCertificates() {
  const response = await fetch('/api/certificates');
  if (!response.ok) throw new Error('Failed to fetch certificates');
  return response.json();
}