import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Github, Linkedin, Mail } from 'lucide-react'
import { data } from '../../lib/data'

const SHOWN = 4

export function Experience() {
  const [all, setAll] = useState(false)
  const items = data.experience
  const visible = all ? items : items.slice(0, SHOWN)

  return (
    <section className="sec sec--line" id="experience">
      <div className="wrap">
        <div className="sec__head">
          <div>
            <div className="eyebrow">Experience</div>
            <h2 className="sec__title">Experience.</h2>
          </div>
        </div>
        <div className="xp">
          {visible.map((e) => (
            <article className="xp__row" key={e.id}>
              <div className="xp__when">
                <b>{e.start} –</b>
                {e.end}
              </div>
              <div>
                <h3 className="xp__role">{e.role}</h3>
                <div className="xp__co">
                  <span>{e.company}</span>
                  {e.location ? ` · ${e.location}` : ''}
                </div>
                {e.bullets.length > 0 && (
                  <ul>{e.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                )}
              </div>
            </article>
          ))}
        </div>
        {items.length > SHOWN && (
          <button type="button" className="btn xp__toggle" onClick={() => setAll((v) => !v)}>
            {all ? 'Show fewer' : `Show ${items.length - SHOWN} earlier roles & activities`}
          </button>
        )}
      </div>
    </section>
  )
}

export function Skills() {
  return (
    <section className="sec sec--line" id="skills">
      <div className="wrap">
        <div className="sec__head">
          <div>
            <div className="eyebrow">Skills</div>
            <h2 className="sec__title">Skills.</h2>
          </div>
        </div>
        <div className="grid-skills">
          {data.skills.groups.map((g) => (
            <div className="skill" key={g.name}>
              <h3>{g.name}</h3>
              <div className="chips">
                {g.items.map((s) => <span className="chip" key={s}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Credentials() {
  const { credentials, profile } = data
  return (
    <section className="sec sec--line" id="credentials">
      <div className="wrap">
        <div className="sec__head">
          <div>
            <div className="eyebrow">Credentials</div>
            <h2 className="sec__title">Credentials.</h2>
          </div>
        </div>
        <div className="grid-cred">
          <div className="panel">
            <h3>Education</h3>
            {credentials.education.map((e) => (
              <div key={e.id}>
                <div className="edu__d">{e.degree}</div>
                <div className="edu__m">{e.school} · {e.start} – {e.end}{e.note ? ` · ${e.note}` : ''}</div>
              </div>
            ))}
            <h3 style={{ marginTop: 28 }}>Languages</h3>
            <ul>{profile.languages.map((l) => <li key={l}>{l}</li>)}</ul>
          </div>
          <div className="panel">
            <h3>Certifications</h3>
            <ul>{credentials.certifications.map((c) => <li key={c}>{c}</li>)}</ul>
          </div>
          <div className="panel">
            <h3>Awards</h3>
            <ul>{credentials.awards.map((a) => <li key={a}>{a}</li>)}</ul>
          </div>
          <div className="panel">
            <h3>Teaching & volunteering</h3>
            <ul>{credentials.volunteering.map((v) => <li key={v}>{v}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  )
}

const Terminal = lazy(() => import('../Terminal').then((m) => ({ default: m.Terminal })))

/** The terminal chunk (and its CSS) only loads once the section nears the viewport. */
export function TerminalSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || show) return
    const io = new IntersectionObserver(
      ([entry]) => entry?.isIntersecting && (setShow(true), io.disconnect()),
      { rootMargin: '300px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [show])

  return (
    <section className="sec sec--line" id="terminal">
      <div className="wrap">
        <div className="sec__head">
          <div>
            <div className="eyebrow">Interactive</div>
            <h2 className="sec__title">Terminal.</h2>
          </div>
        </div>
        <p className="term-lead">
          Everything on this page is queryable. Try <code>help</code>, <code>projects</code> or <code>neofetch</code>.
        </p>
        <div className="term-box" ref={ref}>
          {show ? (
            <Suspense fallback={<div className="term-skel">booting…</div>}>
              <Terminal />
            </Suspense>
          ) : (
            <div className="term-skel">booting…</div>
          )}
        </div>
      </div>
    </section>
  )
}

export function Contact() {
  const { profile } = data
  return (
    <>
      <section className="sec sec--ink" id="contact">
        <div className="wrap">
          <div className="eyebrow">Contact</div>
          <h2 className="contact__h">Let's work together.</h2>
          <div className="contact__row">
            <a className="btn btn--ink" href={`mailto:${profile.email}`}><Mail size={16} aria-hidden /> {profile.email}</a>
            <a className="btn" href={`https://${profile.linkedin}`} target="_blank" rel="noopener noreferrer">
              <Linkedin size={16} aria-hidden /> LinkedIn
            </a>
            <a className="btn" href={`https://${profile.github}`} target="_blank" rel="noopener noreferrer">
              <Github size={16} aria-hidden /> GitHub
            </a>
          </div>
        </div>
      </section>
      <footer className="foot">
        <div className="wrap foot__in">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>{profile.location}</span>
        </div>
      </footer>
    </>
  )
}
