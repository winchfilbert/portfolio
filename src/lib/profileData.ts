import bekenspotLanding from '../assets/bekenspot_landing.png'
import bekenspotDashboard from '../assets/bekenspot_dashboard.png'
import bekenspotReservation from '../assets/bekenspot_reservation.png'

import minatLanding from '../assets/minat_apps_landing_page.png'
import minat2ndPage from '../assets/minat_apps_2nd_page.png'
import minatQuestionnaire from '../assets/minat_apps_questionaire.png'
import minatResult from '../assets/minat_apps_result.png'

import iccsciCert from '../assets/ICCSCI_Certificate.png'

import midhubLanding from '../assets/midhub.png'

export const profileData = {
  name: 'Filbert Christian Winch',
  title: 'Full-Stack Engineer | ML Researcher | Product Engineer | DevOps Engineer',
  headline: 'Shipped 3+ Commercial Projects | Experienced Full-Stack Engineer | Laboratory Center Assistant at BINUS @Bekasi',
  location: 'Jakarta, Indonesia',
  email: 'fchristianwinch@gmail.com',
  phone: '+62 813 8717 9100',
  linkedin: 'linkedin.com/in/filbert-christian-winch',

  summary: `A Software Engineer with 2yrs+ of experience specializing in high-performance Distributed Systems and working with business case/plan. Expert in building scalable, maintainable solutions using Python (TensorFlow/Pytorch), Go, JavaScript (React.js / Svelte / Tanstack / Express.js / Nest.js), Rust, and Java (Spring Boot), with a deep focus on Software Architecture and performance optimization.

Highly adaptable to new things and always eager to explore new or creative approaches. For me, the ultimate goal is always clarity, performance, and long-term maintainability.

Beyond programming, I bring a natural affinity for public speaking and communication. I value the ability to express complex ideas in simple, yet impactful ways.`,

  experience: [
    {
      role: 'Junior Lab Assistant',
      company: 'Bina Nusantara University',
      date: 'September 2024 – Present',
      bullets: [
        'Taught various classes such as Data Structures, Algorithm and Programming, Database Technology, Framework Layer Architecture, Computational Biology, Computational Physics, Machine Learning.',
        'Performing extra class for aiding student during exam periods (practicum\'s mid exam and final exam).',
        'Passed 6+ Test Progressive Assistant Training (3D Game Programming using Unity & C#, Desktop using Tauri (React + Rust), Web Programming (Svelte + Go + Docker), Network using Linux server, docker, nginx, ansible, HAProxy, Prometheus, Grafana, Mobile Apps Development using Kotlin)',
      ],
    },
    {
      role: 'Software Engineer',
      company: 'Uniteda Arkato - Midhub',
      date: 'September 2025 – April 2026',
      bullets: [
        'Engineered core backend REST APIs for Location, Membership, Admin, and Campaign services using NestJS, Prisma, and PostgreSQL.',
        'Lead a cross-functional development team of five engineers to align product roadmaps with corporate digital marketing strategies, accelerating feature delivery cycles.',
        'Architected a unified local containerized development environment utilizing Docker Compose, reducing engineer onboarding and setup times.',
        'Developed and automated critical background cron jobs handling time-sensitive operations, securing system reliability for membership lifecycle transitions and equipment expirations.',
        'Controlled end-to-end continuous delivery pipelines to staging environments, providing automated testing environments for quality assurance teams.',
        'Maintained system availability as primary point of contact for infrastructure reliability, implementing real-time monitoring and resolving production downtime incidents.',
      ],
    },
    {
      role: 'Application Developer',
      company: 'Bina Nusantara University',
      date: 'February 2025 – February 2026',
      bullets: [
        'Conducted advanced emotion-detection analysis using Fast Fourier Transform (FFT) algorithms, leading to a peer-reviewed publication in the ICCSCI 2026 proceedings.',
        'Designed and deployed "Minat Apps" using React and Go, collaborating directly with departmental heads to serve ten regional schools and capture over 1,000 distinct career assessment profiles.',
        'Designed and Developed "Bekenspot," a centralized workspace reservation engine utilizing a high-performance Go backend, capturing over 5,000 active reservations within three months of deployment for 100 staff and student users.',
      ],
    },
    {
      role: 'Education Counselor',
      company: 'Bina Nusantara University',
      date: 'January 2023 – January 2024',
      bullets: [
        'Introducing BINUS University to more than 30+ schools around JABODETABEK area, Edu Fair or Bazaar to gain freshmen candidates.',
        'Maintained Customer Relationship Management with more than 50+ Freshmen\'s Candidate.',
        'Negotiating and also giving contributions in addition of 50+ New Freshman in BINUS University.',
      ],
    },
  ],

  education: {
    degree: 'Computer Science – Software Engineering',
    school: 'Bina Nusantara University',
    gpa: '3.70 / 4.00',
    graduated: '2026',
  },

  skills: {
    'Languages': ['JavaScript/TypeScript', 'Go', 'Python', 'Rust', 'Java', 'C#', 'Kotlin'],
    'Frontend': ['React.js', 'Svelte', 'TanStack', 'Tauri'],
    'Backend': ['Nest.js', 'Express.js', 'Spring Boot', 'REST API', 'gRPC'],
    'DevOps': ['Docker', 'Docker Compose', 'Linux Server', 'Nginx', 'HAProxy', 'Ansible', 'CI/CD'],
    'Cloud': ['AWS', 'Google Cloud', 'Azure'],
    'Databases': ['PostgreSQL', 'Prisma'],
    'ML/AI': ['TensorFlow', 'PyTorch', 'Machine Learning', 'FFT Analysis'],
    'Monitoring': ['Prometheus', 'Grafana'],
    'Soft Skills': ['Public Speaking', 'Master of Ceremonies', 'Project Management', 'CRM'],
  },

  certifications: [
    'Introduction to Machine Learning',
    'Google Cloud Fundamentals',
    'Learning Back-End with Python for Beginners',
    'Cloud AWS Practitioner Fundamental',
    'Software Engineering Principle by BFI Finance',
    'Microsoft Fundamental Azure AI-900T',
  ],

  awards: [
    'Top 10 Finalist of Proto-a-thon 2026',
    '4th Winner of Hology 8.0 in ICT Business Plan Track',
    'Top 10 Finalist of Microsoft x Elevaite Hackathon',
    'Finalist of Basic UI/UX 2023 By School of Information System',
    '1st Winner Competitive Programming Ideafuse by Universitas Mikroskil 2023',
  ],

  projects: [
    {
      name: 'Bekenspot',
      tech: 'Go, TanStack Start, RabbitMQ, Redis, Nginx, Docker, PostgreSQL',
      description: 'A centralized workspace reservation engine with a high-performance Go backend, capturing over 5,000 active reservations within three months for 100 staff and student users.',
      images: [
        bekenspotLanding,
        bekenspotDashboard,
        bekenspotReservation,
      ],
      longDescription: 'Bekenspot is a modern, high-performance workspace booking platform designed for academic and corporate environments. Built with a robust Go backend and a highly interactive Svelte frontend, the platform streamlines the reservation process for student study rooms, computer labs, and office workspaces.',
      keyFeatures: [
        'High-performance REST API capturing 5,000+ reservations in 3 months',
        'Interactive floor plans and real-time room occupancy maps',
        'Automated slot checking with concurrency conflict prevention',
        'User check-in and automated release of abandoned reservations'
      ]
    },
    {
      name: 'Minat Apps',
      tech: 'React, Go',
      description: 'Career assessment platform serving ten regional schools, capturing over 1,000 distinct career assessment profiles.',
      images: [
        minatLanding,
        minat2ndPage,
        minatQuestionnaire,
        minatResult,
      ],
      longDescription: 'Minat Apps is an educational utility designed to guide middle and high school students in Jakarta through psychometric evaluation. It maps their interests, academic achievements, and personality types into concrete university major and career path recommendations.',
      keyFeatures: [
        'Evaluated over 1,000 student career profiles across 10 partner schools',
        'Built with a lightning-fast Go API server and structured Svelte analytics dashboard',
        'Interactive personality assessments with instant graphical report generation',
        'Teacher-facing analytics dashboard to track and filter class metrics'
      ]
    },
    {
      name: 'Emotion Detection Research',
      tech: 'Python, FFT, ML',
      description: 'Advanced emotion-detection analysis using Fast Fourier Transform (FFT) algorithms. Published in ICCSCI 2026 proceedings.',
      images: [
        iccsciCert,
      ],
      longDescription: 'This research project explores automated human emotion classification through biosensors. By utilizing Fast Fourier Transform (FFT) signal processing algorithms, we extract key frequency-domain features from physiological signals to feed into a custom Machine Learning classifier.',
      keyFeatures: [
        'Peer-reviewed publication in the official ICCSCI 2026 research conference proceedings',
        'Custom FFT processing pipelines built in Python to isolate emotional trigger frequencies',
        'Acheived 87% accuracy across standard classification models (SVM, Random Forest)',
        'Optimized feature extraction speeds to enable potential real-time detection systems'
      ]
    },
    {
      name: 'Midhub Platform',
      tech: 'NestJS, Prisma, PostgreSQL, Docker',
      description: 'Full-stack membership & campaign management platform with REST APIs, automated cron jobs, and CI/CD pipelines.',
      images: [
        midhubLanding,
      ],
      longDescription: 'Midhub is a comprehensive enterprise membership and promotional campaign management system. Developed for Uniteda Arkato, the application processes heavy customer data flows, coordinates complex subscription lifecycles, and automates marketing campaigns.',
      keyFeatures: [
        'Designed backend REST services handling thousands of membership accounts using NestJS and Prisma',
        'Containerized localized engineering setup, cutting onboarding times by 40%',
        'Automated database cron routines preventing late membership fee processing errors',
        'Continuous integration pipelines for instantaneous deployment to QA staging servers'
      ]
    },
  ],

  volunteering: [
    'Lecturing Fundamentals Of Programming Workshop',
    'National Science Olympiad in Computer Science Mentoring',
    'Lecturing Generative AI for Productivity for SMAK 7 Penabur',
  ],

  organizations: [
    'Event Staff & Closing Master of Ceremonies Burncup 2023',
    'Ureeka Back-End Development & UI-UX Member',
  ],

  languages: ['English (Native)', 'Indonesia (Native)'],
} as const
