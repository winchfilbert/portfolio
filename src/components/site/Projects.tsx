import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { data } from '../../lib/data'
import type { Project } from '../../lib/types'
import { Img } from './Img'

export function Projects() {
  const [active, setActive] = useState<Project | null>(null)
  const projects = data.projects

  return (
    <section className="sec" id="work">
      <div className="wrap">
        <div className="sec__head">
          <div>
            <div className="eyebrow">Work</div>
            <h2 className="sec__title">Selected work.</h2>
          </div>
        </div>

        <div className="grid-work">
          {projects.map((p, i) => (
            <button
              type="button"
              key={p.id}
              className={`card${i === 0 ? ' card--lead' : ''}`}
              onClick={() => setActive(p)}
              aria-label={`Open case study: ${p.name}`}
            >
              <span className="card__media">
                {p.images[0] ? (
                  <Img
                    img={p.images[0]}
                    alt={`${p.name} screenshot`}
                    ratio={i === 0 ? '21 / 9' : '16 / 10'}
                    sizes={i === 0 ? '(max-width: 900px) 100vw, 700px' : '(max-width: 900px) 100vw, 560px'}
                  />
                ) : (
                  <span className="img-box img-box--empty" style={{ aspectRatio: '16 / 10' }}>
                    <span>{p.name.slice(0, 2)}</span>
                  </span>
                )}
              </span>
              <span className="card__body">
                <span className="card__t">{p.name}</span>
                <span className="card__d">{p.description}</span>
                <span className="chips">
                  {p.tech.map((t) => <span className="chip" key={t}>{t}</span>)}
                </span>
                <span className="card__more">View case study →</span>
              </span>
            </button>
          ))}
        </div>
      </div>
      <ProjectDialog project={active} onClose={() => setActive(null)} />
    </section>
  )
}

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  const [i, setI] = useState(0)

  useEffect(() => {
    const dlg = ref.current
    if (!dlg) return
    if (project && !dlg.open) {
      setI(0)
      dlg.showModal()
    } else if (!project && dlg.open) {
      dlg.close()
    }
  }, [project])

  const imgs = project?.images ?? []
  const go = (d: number) => setI((n) => (n + d + imgs.length) % imgs.length)

  return (
    <dialog
      ref={ref}
      className="dlg"
      aria-label={project?.name}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
    >
      {project && (
        <>
          <div className="dlg__bar">
            <h3>{project.name}</h3>
            <button type="button" className="dlg__x" onClick={onClose} aria-label="Close">
              <X size={20} />
            </button>
          </div>

          {imgs.length > 0 && (
            <>
              <div className="dlg__gallery">
                <Img key={imgs[i].src} img={imgs[i]} alt={`${project.name} screenshot ${i + 1}`} full contain sizes="1000px" />
                {imgs.length > 1 && (
                  <>
                    <button type="button" className="dlg__nav dlg__nav--l" onClick={() => go(-1)} aria-label="Previous image">
                      <ChevronLeft size={22} />
                    </button>
                    <button type="button" className="dlg__nav dlg__nav--r" onClick={() => go(1)} aria-label="Next image">
                      <ChevronRight size={22} />
                    </button>
                  </>
                )}
              </div>
              {imgs.length > 1 && (
                <div className="dlg__thumbs">
                  {imgs.map((im, n) => (
                    <button
                      type="button"
                      key={im.src}
                      className="dlg__thumb"
                      aria-current={n === i}
                      aria-label={`Show image ${n + 1}`}
                      onClick={() => setI(n)}
                    >
                      <Img img={im} alt="" ratio="16 / 10" />
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          <div className="dlg__body">
            <div className="chips">
              {project.tech.map((t) => <span className="chip chip--solid" key={t}>{t}</span>)}
            </div>
            <p>{project.longDescription}</p>
            <div>
              <div className="eyebrow" style={{ marginBottom: 14 }}>Key features and impact</div>
              <ul className="feat">
                {project.keyFeatures.map((f) => <li key={f}>{f}</li>)}
              </ul>
            </div>
            {project.link && (
              <a className="btn btn--amber" style={{ justifySelf: 'start' }} href={project.link} target="_blank" rel="noopener noreferrer">
                Visit project ↗
              </a>
            )}
          </div>
        </>
      )}
    </dialog>
  )
}
