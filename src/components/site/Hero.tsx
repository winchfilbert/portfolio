import { ArrowDown, Github, Linkedin } from 'lucide-react'
import { Fragment, useEffect, useState } from 'react'
import { data } from '../../lib/data'
import { Img } from './Img'

/** `*text*` marks the amber highlight. */
function Emphasis({ text }: { text: string }) {
  return (
    <>
      {text.split('*').map((part, i) =>
        i % 2 ? <span key={i} className="hl">{part}</span> : <Fragment key={i}>{part}</Fragment>,
      )}
    </>
  )
}

const langOf = (t: string) =>
  /[\u3040-\u30ff]/.test(t) ? 'ja' : /[\uac00-\ud7af]/.test(t) ? 'ko' : /[\u4e00-\u9fff]/.test(t) ? 'zh' : 'en'

const HOLD_MS = 2800
const ERASE_MS = 45
const PAUSE_MS = 250
const TYPE_MS = 95

/**
 * Typewriter greeting: types left to right, holds, erases, then types the next one (~5s per greeting).
 * Starts on the first greeting fully typed so there's no empty flash. Decorative: screen readers
 * just get "I'm <name>".
 */
function Greeting({ items }: { items: string[] }) {
  const [text, setText] = useState(items[0] ?? '')
  const [lang, setLang] = useState(langOf(items[0] ?? ''))
  const animated = items.length > 1

  useEffect(() => {
    if (!animated || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let cancelled = false
    const timers: number[] = []
    const wait = (ms: number) => new Promise<void>((r) => timers.push(window.setTimeout(r, ms)))

    ;(async () => {
      let i = 0
      while (!cancelled) {
        await wait(HOLD_MS)
        const cur = Array.from(items[i])
        for (let n = cur.length - 1; n >= 0 && !cancelled; n--) {
          setText(cur.slice(0, n).join(''))
          await wait(ERASE_MS)
        }
        i = (i + 1) % items.length
        const next = Array.from(items[i])
        setLang(langOf(items[i]))
        await wait(PAUSE_MS)
        for (let n = 1; n <= next.length && !cancelled; n++) {
          setText(next.slice(0, n).join(''))
          await wait(TYPE_MS)
        }
      }
    })()

    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [items, animated])

  return (
    <span className="hero__hi" aria-hidden="true" lang={lang}>
      {text}
      {animated && <span className="hero__caret" />}
    </span>
  )
}

export function Hero() {
  const { profile } = data
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero__grid">
          <div>
            <div className="eyebrow">{profile.title} · {profile.location}</div>
            <h1 className="hero__h1">
              {profile.greetings.length > 0 && <Greeting items={profile.greetings} />}
              I'm {profile.name}.
            </h1>
            <p className="hero__lead"><Emphasis text={profile.tagline} /></p>
            <p className="hero__sub">{profile.headline}</p>
            <div className="hero__cta">
              <a className="btn btn--ink" href="#work"><ArrowDown size={16} aria-hidden /> View work</a>
              <a className="btn" href={`https://${profile.linkedin}`} target="_blank" rel="noopener noreferrer">
                <Linkedin size={16} aria-hidden /> LinkedIn
              </a>
              <a className="btn" href={`https://${profile.github}`} target="_blank" rel="noopener noreferrer">
                <Github size={16} aria-hidden /> GitHub
              </a>
            </div>
          </div>
          <div className="hero__photo">
            <Img img={profile.photo} alt={profile.name} ratio="4 / 5" sizes="(max-width: 900px) 360px, 420px" priority />
            <span className="hero__photo-tag">{profile.location}</span>
          </div>
        </div>

        <div className="stats">
          {profile.stats.map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat__v">{s.value}</div>
              <div className="stat__l">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function StackBand() {
  return (
    <div className="band" aria-label="Core stack">
      <div className="band__in">
        {data.profile.coreStack.map((s) => (
          <span className="band__item" key={s}>{s}</span>
        ))}
      </div>
    </div>
  )
}
