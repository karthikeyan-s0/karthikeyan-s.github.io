import type { Certification, JourneyMilestone } from '../types';

export const personalIdentity = {
  name: 'Karthikeyan S',
  firstName: 'KARTHIKEYAN',
  lastName: 'S',
  location: 'Chennai, India',
  primaryRole: 'Python Developer',
  secondaryRoles: ['Web Developer', 'AI Enthusiast'],
  education: {
    degree: 'Bachelor of Computer Applications (BCA)',
    college: 'Patrician College of Arts and Science',
    currentYear: '3rd Year'
  },
  email: 'kishoresk201@gmail.com',
  github: 'https://github.com/karthikeyan-s0',
  linkedin: 'https://www.linkedin.com/in/karthikeyan-s-6a075b438/',
  liveWork: [
    {
      title: 'Stylerz Make',
      url: 'https://stylerz-make.vercel.app/',
      description: 'Production salon & styling studio web platform'
    },
    {
      title: 'VEYRA Studio',
      url: 'https://veyra-studio-tau.vercel.app/',
      description: 'Contemporary creative brand & design showcase'
    }
  ],
  about: {
    statement: 'I build practical software, AI-powered applications and modern digital experiences.',
    copy: 'Karthikeyan S is a 3rd-year BCA student from Chennai focused on Python development, web development, AI/ML and data analytics. He enjoys turning ideas into working applications and exploring modern technologies through personal projects and freelance development.'
  }
};

export const technologiesSequence = [
  { name: 'PYTHON', desc: 'Core Backend, Scripting & AI Pipelines' },
  { name: 'FASTAPI', desc: 'High-Performance Asynchronous Microservices' },
  { name: 'SQL', desc: 'Relational Data Modeling & Query Optimization' },
  { name: 'AI / ML', desc: 'TensorFlow Lite, Computer Vision & LLM Prompts' },
  { name: 'POWER BI', desc: 'Interactive Dashboards & Business Analytics' },
  { name: 'EXCEL', desc: 'Financial Modeling, Pivot Tables & Data Analysis' },
  { name: 'GIT', desc: 'Distributed Version Control & Workflow Management' },
  { name: 'GITHUB', desc: 'Collaborative Engineering, CI/CD & Deployments' },
];

export const certificationsData: Certification[] = [
  {
    id: 'cert-coursera-ai',
    title: 'AI Prompter Course Certificate',
    issuer: 'Coursera',
    type: 'Professional Specialization',
    year: '2024',
    description: 'Mastery in generative AI prompt engineering, contextual framing, zero/few-shot chain-of-thought methodologies, and LLM orchestration.'
  },
  {
    id: 'cert-hackathon-patrician',
    title: 'College Internal Hackathon Certificates',
    issuer: 'Patrician College of Arts and Science',
    type: 'Innovation & Coding Competition',
    year: '2024 - 2025',
    description: 'Honored for rapid software prototyping, technical problem solving, and architecting collaborative full-stack student solutions under timed hackathon constraints.'
  }
];

export const journeyMilestones: JourneyMilestone[] = [
  {
    period: '2022 — Present',
    title: 'Bachelor of Computer Applications (BCA) — 3rd Year',
    organization: 'Patrician College of Arts and Science, Chennai',
    description: 'Deep theoretical foundation in computer systems, relational database architecture, algorithms, data structures, and object-oriented software engineering.',
    tags: ['Core CS', 'Software Architecture', 'Data Structures', 'Database Systems']
  },
  {
    period: '2023 — Present',
    title: 'AI & Machine Learning Software Development',
    organization: 'Personal Research & Project Engineering',
    description: 'Engineered real-time edge AI applications including HandDance (ISL recognition with TFLite and Jetpack Compose), PlanoVision AI (planogram compliance with YOLO and FastAPI), and VoiceForge AI (speech synthesis & streaming).',
    tags: ['Python', 'TensorFlow Lite', 'FastAPI', 'Computer Vision', 'Audio Pipelines']
  },
  {
    period: '2024 — Present',
    title: 'Freelance Web Developer',
    organization: 'Independent Client Solutions',
    description: 'Designed and deployed bespoke client web applications including Stylerz Make and VEYRA Studio with emphasis on visual polish, performance optimization, and reliable delivery.',
    tags: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Vercel']
  }
];
