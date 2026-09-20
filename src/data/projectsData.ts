import type { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'handdance',
    number: '01',
    title: 'HandDance',
    subtitle: 'REAL-TIME ISL RECOGNITION',
    category: 'Mobile / Edge AI / Computer Vision',
    description: 'An on-device Indian Sign Language recognition application concept designed to recognize signs through a camera and convert recognized gestures into understandable output in real time without cloud dependencies.',
    tags: ['Android', 'Kotlin 2.0', 'CameraX', 'TensorFlow Lite', 'Jetpack Compose', 'AI / ML'],
    features: [
      '30 FPS zero-latency on-device neural sequence pipeline',
      'Verified against authentic Indian Sign Language Research & Training Centre (ISLRTC) vocabulary',
      'Spatial 3D landmark normalization with hysteresis filtering & confidence smoothing',
      'Native Text-to-Speech audio readout with 100% offline privacy'
    ],
    liveUrl: undefined,
    githubUrl: 'https://github.com/karthikeyan-s0',
    visualType: 'handdance',
    accentColor: '#38bdf8'
  },
  {
    id: 'planovision',
    number: '02',
    title: 'PlanoVision AI',
    subtitle: 'AI PLANOGRAM ANALYSIS',
    category: 'Computer Vision / Retail Intelligence',
    description: 'A spatial retail intelligence platform built to scan supermarket shelves, track product facings, verify planogram compliance, identify misplaced inventory, and highlight shelf gaps using computer vision.',
    tags: ['Python', 'FastAPI', 'YOLO', 'React', 'Flutter', 'Computer Vision', 'SQLite'],
    features: [
      'Automated product facing count & shelf occupancy estimation',
      'Planogram compliance score calculation and mismatched SKU identification',
      'Interactive bounding-box visualizer with shelf heatmaps',
      'Offline-first mobile audit synchronizer with encrypted local caching'
    ],
    liveUrl: undefined,
    githubUrl: 'https://github.com/karthikeyan-s0',
    visualType: 'retail',
    accentColor: '#a855f7'
  },
  {
    id: 'gstify',
    number: '03',
    title: 'GSTify',
    subtitle: 'INVOICE SAAS',
    category: 'Full-Stack SaaS / Financial Tech',
    description: 'A dedicated invoicing and tax compliance SaaS application engineered to streamline billing, calculate GST breakdowns across items, track receivables, and generate clean PDF documentation.',
    tags: ['Python', 'FastAPI', 'SQL', 'React', 'Tailwind CSS', 'Data Visualization'],
    features: [
      'Automated multi-tier GST & HSN code calculations',
      'Dynamic client invoice generation and export to structured formats',
      'Real-time financial receivables tracking with interactive charts',
      'Secure ledger management with audit-ready records'
    ],
    liveUrl: undefined,
    githubUrl: 'https://github.com/karthikeyan-s0',
    visualType: 'saas',
    accentColor: '#38bdf8'
  },
  {
    id: 'voiceforge',
    number: '04',
    title: 'VoiceForge AI',
    subtitle: 'AI VOICE EXPERIENCE',
    category: 'Audio Intelligence / Speech Synthesis',
    description: 'A scalable AI voice cloning and speech synthesis platform featuring audio signal processing pipelines, multi-lingual neural synthesis, speech-to-speech conversion, and real-time audio streaming.',
    tags: ['Python 3.12', 'FastAPI', 'WebSockets', 'Celery', 'Redis', 'React 19', 'AI / ML'],
    features: [
      'Low-latency WebSocket micro-chunk streaming for real-time synthesis',
      'Distributed task execution using Celery workers backed by Redis',
      'Multi-tenant API key management with SHA-256 token verification',
      'Interactive audio waveform analyzer and sound parameter controls'
    ],
    liveUrl: undefined,
    githubUrl: 'https://github.com/karthikeyan-s0',
    visualType: 'audio',
    accentColor: '#6366f1'
  },
  {
    id: 'auth-system',
    number: '05',
    title: 'Authentication System',
    subtitle: 'MODERN AUTH EXPERIENCE',
    category: 'Security / Backend Architecture',
    description: 'A modern, resilient authentication and session security architecture implementing OAuth2 workflows, JWT token rotation, cryptographic password hashing, and granular Role-Based Access Control.',
    tags: ['Python', 'FastAPI', 'OAuth2', 'JWT', 'RBAC', 'PostgreSQL', 'Security'],
    features: [
      'Secure refresh/access token rotation with anti-replay detection',
      'Granular Role-Based Access Control (RBAC) permissions matrix',
      'Multi-factor authentication (MFA / TOTP) verification logic',
      'Comprehensive security event auditing and anomaly logging'
    ],
    liveUrl: undefined,
    githubUrl: 'https://github.com/karthikeyan-s0',
    visualType: 'auth',
    accentColor: '#38bdf8'
  },
  {
    id: 'client-websites',
    number: '06',
    title: 'Client Websites',
    subtitle: 'FREELANCE WEB DEVELOPMENT',
    category: 'Web Engineering / Production Deployments',
    description: 'Bespoke web applications and digital presences built for clients and brand studios, featuring fluid responsive layouts, high performance rendering, and contemporary interactive aesthetics.',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Freelance', 'Vercel'],
    features: [
      'Stylerz Make: Production modern beauty & styling studio website',
      'VEYRA Studio: Minimalist editorial digital brand experience',
      'High Lighthouse performance scores with instant client-side transitions',
      'Fully responsive cross-platform layout optimization'
    ],
    liveUrl: 'https://stylerz-make.vercel.app/',
    githubUrl: 'https://github.com/karthikeyan-s0',
    visualType: 'clients',
    accentColor: '#a855f7'
  }
];
