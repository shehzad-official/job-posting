export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Internship';
  salary?: string;
  description: string;
  requirements: string[];
  benefits: string[];
  datePosted: string;
  status: 'Open' | 'Closed' | 'Draft';
  applicants: Applicant[];
  views: number;
}

export interface Applicant {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  appliedDate: string;
  status: 'Applied' | 'In Review' | 'Interview' | 'Hired' | 'Rejected';
  matchLevel: number;
  skills: string[];
  experience: string;
  location: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'recruiter' | 'user';
  company?: string;
  title?: string;
  skills?: string[];
  experience?: string;
  location?: string;
}

export interface DashboardStats {
  applications: number;
  views: number;
  hired: number;
  rejected: number;
}