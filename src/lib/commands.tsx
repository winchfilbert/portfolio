import type { ReactNode } from 'react'
import { Mail, Phone, Linkedin, MapPin, Briefcase } from 'lucide-react'
import { profileData } from './profileData'
import profilePhoto from '../assets/profile_photo.png'
function highlightTech(text: string): ReactNode {
  const targets = [
    'Distributed Systems', 'Python', 'TensorFlow', 'Pytorch', 'Go', 'React.js',
    'Svelte', 'TanStack Start', 'Tanstack', 'Express.js', 'Nest.js', 'Rust', 'Java', 'Spring Boot',
    'Software Architecture', 'NestJS', 'Prisma', 'PostgreSQL', 'Docker Compose',
    'Docker', 'Tauri', 'Kotlin', 'Unity', 'C#', 'Fast Fourier Transform', 'FFT',
    'Machine Learning', 'Data Structures', 'Database Technology', 'CI/CD', 'REST APIs',
    'RabbitMQ', 'Redis', 'Nginx',
    '2yrs+', '5,000+', '1,000+', '6+', '3+', '50+'
  ]
  const regex = /(?<=^|\s|[.,;()\/])(Software Architecture|Distributed Systems|Database Technology|TanStack Start|Machine Learning|Docker Compose|Spring Boot|PostgreSQL|TensorFlow|Express\.js|REST APIs|RabbitMQ|React\.js|Tanstack|Pytorch|Nest\.js|Kotlin|Svelte|Python|Prisma|NestJS|Docker|Redis|Nginx|5,000\+|1,000\+|Tauri|Unity|Java|Rust|FFT|50\+|Go|C#|6\+|3\+|2yrs\+)(?=$|\s|[.,;()\/])/gi
  const parts = text.split(regex)
  return (
    <>
      {parts.map((part, idx) => {
        const isMatch = targets.some(t => t.toLowerCase() === part.toLowerCase())
        if (isMatch) {
          return <span key={idx} className="text-cyan text-bold">{part}</span>
        }
        return part
      })}
    </>
  )
}

export type CommandResult = {
  output: ReactNode
  clear?: boolean
}

const NEOFETCH_ART = `
    ⠀⠀⠀⠀⠀⠀⣀⣤⣶⣿⣿⣶⣤⣀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⣀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⣀⠀⠀⠀
    ⠀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⠀
    ⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧
    ⣿⣿⣿⣿⣿⣿⡟⠁⠀⠀⠀⠀⠈⢻⣿⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⠏⠀⠀⣾⣿⣷⠀⠀⠀⠹⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⡟⠀⠀⠀⢿⣿⡿⠀⠀⠀⠀⢻⣿⣿⣿⣿
    ⣿⣿⣿⣿⡇⠀⠀⠀⠈⠉⠁⠀⠀⠀⠀⢸⣿⣿⣿⣿
    ⠸⣿⣿⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⣿⣿⠇
    ⠀⠙⣿⣿⣿⣿⣦⣀⠀⠀⠀⠀⣀⣴⣿⣿⣿⣿⠋⠀
    ⠀⠀⠈⠻⣿⣿⣿⣿⣿⣶⣿⣿⣿⣿⣿⣿⠟⠁⠀⠀
    ⠀⠀⠀⠀⠈⠛⠿⣿⣿⣿⣿⣿⣿⠿⠛⠁⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀`.trimStart()

export const AVAILABLE_COMMANDS = [
  'help',
  'about',
  'experience',
  'education',
  'skills',
  'certifications',
  'awards',
  'projects',
  'contact',
  'whoami',
  'neofetch',
  'volunteering',
  'clear',
  'history',
  'sudo hire-me',
  'banner',
] as const

export function getWelcomeBanner(): ReactNode {
  const quickLinks = ['about', 'experience', 'skills', 'projects', 'contact']
  
  return (
    <div className="output-block welcome-block">
      <div className="welcome-layout">
        <div className="welcome-main">
          <h1 className="welcome-name">FILBERT CHRISTIAN WINCH</h1>
          <div className="output-section text-gray" style={{ fontSize: '12px', marginTop: '4px' }}>
            {profileData.title}
          </div>
          <div className="text-gray" style={{ marginBottom: '12px', fontSize: '13px' }}>
            Welcome to my interactive terminal portfolio v1.0.0
          </div>
        </div>
        <img 
          src={profilePhoto} 
          alt="Profile" 
          className="welcome-photo cursor-pointer transition-transform hover:scale-105" 
          onClick={() => window.dispatchEvent(new CustomEvent('open-lightbox', { detail: profilePhoto }))}
        />
      </div>
      
      <div className="text-white" style={{ marginBottom: '12px' }}>
        💡 Quick shortcuts (click to run):
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
          {quickLinks.map(cmd => (
            <button
              key={cmd}
              className="quick-shortcut-btn"
              onClick={() => window.dispatchEvent(new CustomEvent('run-command', { detail: cmd }))}
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
      
      <div className="text-gray">
        Or type <span className="text-yellow">'help'</span> to see all commands.
      </div>
    </div>
  )
}

export function processCommand(input: string, history: string[]): CommandResult {
  const trimmed = input.trim().toLowerCase()

  if (trimmed === 'clear') {
    return { output: null, clear: true }
  }

  if (trimmed === '') {
    return { output: null }
  }

  const commandMap: Record<string, () => ReactNode> = {
    help: renderHelp,
    about: renderAbout,
    experience: renderExperience,
    education: renderEducation,
    skills: renderSkills,
    certifications: renderCertifications,
    awards: renderAwards,
    projects: renderProjects,
    contact: renderContact,
    whoami: renderWhoami,
    neofetch: renderNeofetch,
    volunteering: renderVolunteering,
    banner: renderBanner,
    'sudo hire-me': renderHireMe,
  }

  if (trimmed === 'history') {
    return {
      output: (
        <div className="output-block">
          {history.map((cmd, i) => (
            <div key={i} className="text-white">
              <span className="text-gray"> {i + 1}  </span>
              {cmd}
            </div>
          ))}
        </div>
      ),
    }
  }

  const handler = commandMap[trimmed]
  if (handler) {
    return { output: handler() }
  }

  return {
    output: (
      <div className="output-block">
        <span className="text-red">
          Command not found: {input.trim()}
        </span>
        <div className="text-gray">
          Type <span className="text-yellow">'help'</span> to see available commands.
        </div>
      </div>
    ),
  }
}

function renderHelp(): ReactNode {
  const commands = [
    { cmd: 'about', desc: 'Display professional summary' },
    { cmd: 'experience', desc: 'Show work experience timeline' },
    { cmd: 'education', desc: 'Show education details' },
    { cmd: 'skills', desc: 'List technical & soft skills' },
    { cmd: 'projects', desc: 'Browse key projects' },
    { cmd: 'certifications', desc: 'List certifications' },
    { cmd: 'awards', desc: 'Show awards & achievements' },
    { cmd: 'volunteering', desc: 'Show volunteering activities' },
    { cmd: 'contact', desc: 'Display contact information' },
    { cmd: 'whoami', desc: 'Quick identity check' },
    { cmd: 'neofetch', desc: 'System-style info display' },
    { cmd: 'banner', desc: 'Show the welcome banner' },
    { cmd: 'history', desc: 'Show command history' },
    { cmd: 'clear', desc: 'Clear the terminal screen' },
    { cmd: 'sudo hire-me', desc: '???' },
  ]

  return (
    <div className="output-block">
      <div className="output-header">📖 Available Commands</div>
      <div className="help-table">
        {commands.map(({ cmd, desc }) => (
          <span key={cmd} style={{ display: 'contents' }}>
            <span className="help-command">{cmd}</span>
            <span className="help-description">{desc}</span>
          </span>
        ))}
      </div>
      <br />
      <div className="text-gray">
        Tip: Use <span className="text-cyan">↑↓</span> arrows for command history, <span className="text-cyan">Tab</span> for autocomplete.
      </div>
    </div>
  )
}

function renderAbout(): ReactNode {
  return (
    <div className="output-block">
      <div className="output-header">👨‍💻 About Me</div>
      <div className="about-grid">
        <img 
          src={profilePhoto} 
          alt="Profile" 
          className="about-photo cursor-pointer transition-transform hover:scale-105" 
          onClick={() => window.dispatchEvent(new CustomEvent('open-lightbox', { detail: profilePhoto }))}
        />
        <div className="about-text">
          {profileData.summary.split('\n\n').map((paragraph, i) => (
            <div key={i} className="text-white" style={{ marginBottom: '8px' }}>
              {highlightTech(paragraph)}
            </div>
          ))}
          <br />
          <div className="text-gray">
            <span className="text-dim">Location:</span> {profileData.location}
          </div>
          <div className="text-gray">
            <span className="text-dim">Languages:</span> {profileData.languages.join(', ')}
          </div>
        </div>
      </div>
    </div>
  )
}

function renderExperience(): ReactNode {
  return (
    <div className="output-block">
      <div className="output-header">💼 Work Experience</div>
      {profileData.experience.map((exp, i) => (
        <div key={i} className="exp-entry">
          <div className="exp-role">{exp.role}</div>
          <div>
            <span className="exp-company">{exp.company}</span>
            <span className="text-gray"> | </span>
            <span className="exp-date">{exp.date}</span>
          </div>
          {exp.bullets.map((bullet, j) => (
            <div key={j} className="exp-bullet">{highlightTech(bullet)}</div>
          ))}
        </div>
      ))}
    </div>
  )
}

function renderEducation(): ReactNode {
  return (
    <div className="output-block">
      <div className="output-header">🎓 Education</div>
      <div className="exp-entry">
        <div className="exp-role">{profileData.education.degree}</div>
        <div>
          <span className="exp-company">{profileData.education.school}</span>
          <span className="text-gray"> | Graduated: </span>
          <span className="exp-date">{profileData.education.graduated}</span>
        </div>
        <div className="text-white" style={{ marginTop: '4px' }}>
          <span className="text-dim">GPA:</span>{' '}
          <span className="text-green text-bold">{profileData.education.gpa}</span>
        </div>
      </div>
    </div>
  )
}

function renderSkills(): ReactNode {
  return (
    <div className="output-block">
      <div className="output-header">⚡ Skills & Technologies</div>
      {Object.entries(profileData.skills).map(([category, skills]) => (
        <div key={category} className="skill-category">
          <div className="output-subheader">{category}</div>
          <div className="skill-tags">
            {skills.map((skill) => (
              <span key={skill} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function renderCertifications(): ReactNode {
  return (
    <div className="output-block">
      <div className="output-header">📜 Certifications</div>
      {profileData.certifications.map((cert, i) => (
        <div key={i} className="output-item">{cert}</div>
      ))}
    </div>
  )
}

function renderAwards(): ReactNode {
  return (
    <div className="output-block">
      <div className="output-header">🏆 Awards & Achievements</div>
      {profileData.awards.map((award, i) => (
        <div key={i} className="output-item">
          <span className="text-yellow">★</span> {award}
        </div>
      ))}
    </div>
  )
}

function renderProjects(): ReactNode {
  return (
    <div className="output-block">
      <div className="output-header">🚀 Key Projects</div>
      <div className="project-grid">
        {profileData.projects.map((project, i) => (
          <div 
            key={i} 
            className="project-card cursor-pointer"
            onClick={() => window.dispatchEvent(new CustomEvent('open-project', { detail: project }))}
          >
            <div 
              className="project-image"
              style={{ backgroundImage: `url(${project.images[0]})` }}
            />
            <div className="project-content">
              <div className="project-title">{project.name}</div>
              <div className="text-magenta" style={{ fontSize: '12px' }}>
                [{project.tech}]
              </div>
              <div className="project-desc">{highlightTech(project.description)}</div>
              <div className="text-cyan text-bold" style={{ fontSize: '12px', marginTop: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                View details & media →
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function renderContact(): ReactNode {
  return (
    <div className="output-block">
      <div className="output-header">📬 Contact Information</div>
      <div className="contact-item">
        <div className="contact-icon"><Mail size={18} /></div>
        <div className="text-white">
          <span className="text-cyan">Email: </span>
          <a href={`mailto:${profileData.email}`} className="output-link">
            {profileData.email}
          </a>
        </div>
      </div>
      <div className="contact-item">
        <div className="contact-icon"><Phone size={18} /></div>
        <div className="text-white">
          <span className="text-cyan">Phone: </span>
          <span>{profileData.phone}</span>
        </div>
      </div>
      <div className="contact-item">
        <div className="contact-icon"><Linkedin size={18} /></div>
        <div className="text-white">
          <span className="text-cyan">LinkedIn: </span>
          <a
            href={`https://${profileData.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="output-link"
          >
            {profileData.linkedin}
          </a>
        </div>
      </div>
      <div className="contact-item">
        <div className="contact-icon"><MapPin size={18} /></div>
        <div className="text-white">
          <span className="text-cyan">Location: </span>
          <span>{profileData.location}</span>
        </div>
      </div>
    </div>
  )
}

function renderWhoami(): ReactNode {
  return (
    <div className="output-block">
      <span className="text-green text-bold">{profileData.name}</span>
      <div className="text-white">{profileData.title}</div>
      <div className="text-gray">{profileData.location}</div>
    </div>
  )
}

function renderNeofetch(): ReactNode {
  const info = [
    { label: 'OS', value: 'Developer v2.0 (Stable)' },
    { label: 'Host', value: profileData.name },
    { label: 'Kernel', value: 'Software Engineering' },
    { label: 'Uptime', value: '2+ years in the industry' },
    { label: 'Packages', value: `${Object.values(profileData.skills).flat().length} skills installed` },
    { label: 'Shell', value: 'bash 5.2 (TanStack/React)' },
    { label: 'Resolution', value: 'High-performance @ scale' },
    { label: 'DE', value: 'Full-Stack Engineering' },
    { label: 'WM', value: 'Docker + Linux' },
    { label: 'Terminal', value: 'portfolio.terminal v1.0' },
    { label: 'CPU', value: 'Brain @ 3.70 GPA' },
    { label: 'Memory', value: `${profileData.certifications.length} certs / ${profileData.awards.length} awards` },
  ]

  return (
    <div className="output-block">
      <div className="neofetch-container">
        <div className="neofetch-art">{NEOFETCH_ART}</div>
        <div className="neofetch-info">
          <div>
            <span className="text-green text-bold">{profileData.name.toLowerCase().replace(/ /g, '@')}</span>
          </div>
          <div className="text-cyan">{'─'.repeat(36)}</div>
          {info.map(({ label, value }) => (
            <div key={label}>
              <span className="neofetch-label">{label}</span>
              <span className="text-white">: {value}</span>
            </div>
          ))}
          <div className="neofetch-colors">
            {['#ff5f57', '#febc2e', '#28c840', '#00e5ff', '#ff79c6', '#ffd700', '#00ff41', '#c0ccd8'].map(
              (color) => (
                <div
                  key={color}
                  className="neofetch-color-block"
                  style={{ background: color }}
                />
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


function renderVolunteering(): ReactNode {
  return (
    <div className="output-block">
      <div className="output-header">🤝 Volunteering</div>
      {profileData.volunteering.map((item, i) => (
        <div key={i} className="output-item">{item}</div>
      ))}
      <br />
      <div className="output-header">🏛️ Organizations</div>
      {profileData.organizations.map((item, i) => (
        <div key={i} className="output-item">{item}</div>
      ))}
    </div>
  )
}

function renderBanner(): ReactNode {
  return getWelcomeBanner()
}

function renderHireMe(): ReactNode {
  return (
    <div className="output-block" style={{ textAlign: 'center', padding: '32px' }}>
      <div className="text-yellow" style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
        <Briefcase size={48} />
      </div>
      <div className="text-green text-bold" style={{ fontSize: '20px', marginBottom: '16px' }}>
        ✨ sudo permission granted. ✨
      </div>
      <div className="text-white" style={{ marginBottom: '24px' }}>
        Let's build something amazing together.
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
        <a href={`mailto:${profileData.email}`} className="output-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Mail size={16} /> {profileData.email}
        </a>
        <a href={`https://${profileData.linkedin}`} target="_blank" rel="noopener noreferrer" className="output-link" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Linkedin size={16} /> {profileData.linkedin}
        </a>
      </div>
    </div>
  )
}
