import { useEffect, useState } from 'react'

const links = [
  ['work', 'Work'],
  ['experience', 'Experience'],
  ['skills', 'Skills'],
  ['credentials', 'Credentials'],
  ['terminal', 'Terminal'],
  ['contact', 'Contact'],
] as const

/** Floating pill nav; highlights the section currently in view. */
export function Nav() {
  const [active, setActive] = useState<string>('')

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

  return (
    <header className="nav">
      <nav className="nav__pill" aria-label="Sections">
        {links.map(([id, label]) => (
          <a key={id} href={`#${id}`} className="nav__link" aria-current={active === id ? 'true' : undefined}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  )
}
