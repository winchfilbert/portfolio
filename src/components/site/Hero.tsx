import { ArrowDown, Github, Linkedin } from 'lucide-react'
import { Fragment } from 'react'
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

export function Hero() {
  const { profile } = data
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero__grid">
          <div>
            <div className="eyebrow">{profile.title} · {profile.location}</div>
            <h1 className="hero__h1">
              {profile.greeting && <span className="hero__hi">{profile.greeting}</span>}
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
