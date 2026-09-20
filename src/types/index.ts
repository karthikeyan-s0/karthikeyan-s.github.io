export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  tags: string[];
  features?: string[];
  liveUrl?: string;
  githubUrl?: string;
  visualType: 'handdance' | 'retail' | 'saas' | 'audio' | 'auth' | 'clients';
  accentColor: string;
  metrics?: { label: string; value: string }[];
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: { name: string; level?: string; icon?: string }[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  type: string;
  year: string;
  description: string;
}

export interface JourneyMilestone {
  period: string;
  title: string;
  organization: string;
  description: string;
  tags: string[];
}
