import { Mail } from 'lucide-react'
import { data } from '../../lib/data'

const links = [
  ['work', 'Work'],
  ['experience', 'Experience'],
  ['skills', 'Skills'],
  ['credentials', 'Credentials'],
  ['terminal', 'Terminal'],
] as const

export function Nav() {
  const { profile } = data
  return (
    <header className="nav">
      <div className="wrap nav__in">
        <a href="#top" className="nav__brand">
          <span className="nav__mark">FW</span>
          <span>{profile.name}</span>
        </a>
        <nav className="nav__links" aria-label="Sections">
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`}>{label}</a>
          ))}
        </nav>
        <a className="btn btn--ink" href={`mailto:${profile.email}`}>
          <Mail size={15} aria-hidden /> Get in touch
        </a>
      </div>
    </header>
  )
}
