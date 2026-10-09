import { useEffect, useRef, useState } from 'react'
import { Mail, Menu, X } from 'lucide-react'
import { data } from '../../lib/data'

const links = [
  ['work', 'Work'],
  ['experience', 'Experience'],
  ['skills', 'Skills'],
  ['credentials', 'Credentials'],
  ['terminal', 'Terminal'],
  ['contact', 'Contact'],
] as const

/**
 * Floating glass pill on desktop. On phones the same pill collapses into a hamburger
 * anchored top-left that shows the current section and opens the links in a dropdown.
 */
export function Nav() {
  const [active, setActive] = useState<string>('')
  const [open, setOpen] = useState(false)
  const mobileRef = useRef<HTMLDivElement>(null)

  // Highlight the section in view
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    links.forEach(([id]) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    const onTop = () => window.scrollY < 200 && setActive('')
    window.addEventListener('scroll', onTop, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onTop)
    }
  }, [])

  // Close the mobile menu on outside tap or Escape
  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!mobileRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const current = links.find(([id]) => id === active)?.[1]

  return (
    <header className="nav">
      <nav className="nav__pill glass" aria-label="Sections">
        {links.map(([id, label]) => (
          <a key={id} href={`#${id}`} className="nav__link" aria-current={active === id ? 'true' : undefined}>
            {label}
          </a>
        ))}
      </nav>

      <div className="nav__m" ref={mobileRef}>
        <button
          type="button"
          className="nav__bar glass"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="nav-panel"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav__bar-ico">{open ? <X size={20} /> : <Menu size={20} />}</span>
          <span>{current ?? 'Menu'}</span>
        </button>
        {open && (
          <nav id="nav-panel" className="nav__panel glass" aria-label="Sections">
            {links.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className="nav__link"
                aria-current={active === id ? 'true' : undefined}
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
            <a className="btn btn--ink nav__cta" href={`mailto:${data.profile.email}`} onClick={() => setOpen(false)}>
              <Mail size={16} aria-hidden /> Get in touch
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}
