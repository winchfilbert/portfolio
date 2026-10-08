import { useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { ArrowDown, ArrowUp, ImagePlus, Plus, Trash2 } from 'lucide-react'
import { asset } from '../../lib/site'
import { uploadImage } from '../../lib/github'
import type { Img } from '../../lib/types'

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="fld">
      <span>{label}</span>
      {children}
      {hint && <small>{hint}</small>}
    </label>
  )
}

type TextProps = { label: string; value: string; onChange: (v: string) => void; hint?: string; area?: boolean; rows?: number }

export function Text({ label, value, onChange, hint, area, rows }: TextProps) {
  return (
    <Field label={label} hint={hint}>
      {area ? (
        <textarea className="inp" rows={rows ?? 4} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input className="inp" value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </Field>
  )
}

function move<T>(list: T[], from: number, to: number): T[] {
  if (to < 0 || to >= list.length) return list
  const next = [...list]
  next.splice(to, 0, next.splice(from, 1)[0])
  return next
}

function Tools({ i, len, onMove, onDelete }: { i: number; len: number; onMove: (to: number) => void; onDelete: () => void }) {
  return (
    <div className="tools">
      <button type="button" className="mini" disabled={i === 0} onClick={() => onMove(i - 1)} aria-label="Move up"><ArrowUp size={14} /></button>
      <button type="button" className="mini" disabled={i === len - 1} onClick={() => onMove(i + 1)} aria-label="Move down"><ArrowDown size={14} /></button>
      <button type="button" className="mini mini--danger" onClick={onDelete} aria-label="Delete"><Trash2 size={14} /></button>
    </div>
  )
}

/** Editable list of plain strings. */
export function Strings({ label, items, onChange, area, hint }: { label: string; items: string[]; onChange: (v: string[]) => void; area?: boolean; hint?: string }) {
  return (
    <div className="fld">
      <span>{label}</span>
      <div className="strs">
        {items.map((s, i) => (
          <div className="strs__row" key={i}>
            {area ? (
              <textarea className="inp" rows={2} value={s} onChange={(e) => onChange(items.map((x, n) => (n === i ? e.target.value : x)))} />
            ) : (
              <input className="inp" value={s} onChange={(e) => onChange(items.map((x, n) => (n === i ? e.target.value : x)))} />
            )}
            <Tools i={i} len={items.length} onMove={(to) => onChange(move(items, i, to))} onDelete={() => onChange(items.filter((_, n) => n !== i))} />
          </div>
        ))}
        <div><button type="button" className="mini" onClick={() => onChange([...items, ''])}><Plus size={14} /> Add</button></div>
      </div>
      {hint && <small>{hint}</small>}
    </div>
  )
}

/** Reorderable list of objects, each rendered as a titled box. */
export function Items<T>({ items, onChange, title, make, addLabel, children }: {
  items: T[]
  onChange: (v: T[]) => void
  title: (item: T, i: number) => string
  make: () => T
  addLabel: string
  children: (item: T, update: (patch: Partial<T>) => void, i: number) => ReactNode
}) {
  return (
    <>
      {items.map((item, i) => (
        <div className="box" key={i}>
          <div className="box__h">
            <span>{title(item, i) || `Item ${i + 1}`}</span>
            <Tools
              i={i}
              len={items.length}
              onMove={(to) => onChange(move(items, i, to))}
              onDelete={() => window.confirm('Delete this item?') && onChange(items.filter((_, n) => n !== i))}
            />
          </div>
          <div className="box__b">
            {children(item, (patch) => onChange(items.map((x, n) => (n === i ? { ...x, ...patch } : x))), i)}
          </div>
        </div>
      ))}
      <div><button type="button" className="btn btn--amber" onClick={() => onChange([...items, make()])}><Plus size={16} /> {addLabel}</button></div>
    </>
  )
}

/** Image picker: compresses in the browser, commits to the repo, stores the returned metadata. */
export function Images({ label, token, images, onChange, max }: { label: string; token: string; images: Img[]; onChange: (v: Img[]) => void; max?: number }) {
  const input = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const pick = async (files: FileList | null) => {
    if (!files?.length) return
    setBusy(true)
    setError('')
    try {
      const uploaded: Img[] = []
      for (const f of Array.from(files)) uploaded.push(await uploadImage(token, f))
      onChange(max === 1 ? [uploaded[uploaded.length - 1]] : [...images, ...uploaded])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed')
    } finally {
      setBusy(false)
      if (input.current) input.current.value = ''
    }
  }

  return (
    <div className="fld">
      <span>{label}</span>
      <div className="upl">
        {images.map((im, i) => (
          <div className="upl__item" key={im.src}>
            <img src={asset(im.thumb)} alt="" style={{ width: '100%', aspectRatio: '16 / 10', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
            <div className="tools">
              {max === 1 ? <span /> : (
                <span className="tools">
                  <button type="button" className="mini" disabled={i === 0} onClick={() => onChange(move(images, i, i - 1))} aria-label="Move left"><ArrowUp size={14} /></button>
                  <button type="button" className="mini" disabled={i === images.length - 1} onClick={() => onChange(move(images, i, i + 1))} aria-label="Move right"><ArrowDown size={14} /></button>
                </span>
              )}
              {max !== 1 && <button type="button" className="mini mini--danger" onClick={() => onChange(images.filter((_, n) => n !== i))} aria-label="Remove"><Trash2 size={14} /></button>}
            </div>
          </div>
        ))}
      </div>
      <div>
        <input ref={input} type="file" accept="image/*" multiple={max !== 1} hidden onChange={(e) => pick(e.target.files)} />
        <button type="button" className="mini" disabled={busy} onClick={() => input.current?.click()}>
          <ImagePlus size={14} /> {busy ? 'Compressing & uploading…' : max === 1 ? 'Replace image' : 'Add images'}
        </button>
      </div>
      <small>Images are resized to WebP in your browser (1600px + 640px thumbnail + blur placeholder) and committed immediately.</small>
      {error && <small className="adm__msg--err">{error}</small>}
    </div>
  )
}
