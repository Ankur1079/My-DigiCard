export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  period: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  link: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  email: string;
  phone: string;
  portfolio: string;
  resumeUrl: string;
  customLabel: string;
  customUrl: string;
}

export interface ProfileData {
  name: string;
  pronouns: string;
  title: string;
  company: string;
  location: string;
  avatarUrl: string;
  summary: string;
  skills: string[];
  socials: SocialLinks;
  useInteractiveResume: boolean;
  experiences: WorkExperience[];
  educations: Education[];
  projects: Project[];
  certifications?: string[];
}
