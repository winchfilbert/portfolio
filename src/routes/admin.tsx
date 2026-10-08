import { useCallback, useEffect, useRef, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { ExternalLink, LogOut, Save } from 'lucide-react'
import { REPO } from '../lib/site'
import { actionsUrl, loadData, saveData, tokenHelpUrl, tokenStore, verifyToken } from '../lib/github'
import type { DataFiles } from '../lib/types'
import { CredentialsEditor, ExperienceEditor, ProfileEditor, ProjectsEditor, SkillsEditor } from '../components/admin/editors'

export const Route = createFileRoute('/admin')({
  head: () => ({ meta: [{ title: 'Admin' }, { name: 'robots', content: 'noindex, nofollow' }] }),
  component: AdminPage,
})

function AdminPage() {
  const [token, setToken] = useState<string | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setToken(tokenStore.get())
    setReady(true)
  }, [])

  if (!ready) return null
  if (!token) return <Login onToken={setToken} />
  return <Dashboard token={token} onLogout={() => { tokenStore.clear(); setToken(null) }} />
}

function Login({ onToken }: { onToken: (t: string) => void }) {
  const [value, setValue] = useState('')
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      await verifyToken(value.trim())
      tokenStore.set(value.trim(), remember)
      onToken(value.trim())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not verify token')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form className="login" onSubmit={submit}>
      <div className="eyebrow">Admin</div>
      <h1 style={{ marginTop: 12 }}>Sign in with GitHub.</h1>
      <p>Edits are committed to <b>{REPO.owner}/{REPO.name}</b> and the site redeploys automatically. Your token never leaves this browser except to talk to GitHub.</p>
      <ol>
        <li><a href={tokenHelpUrl} target="_blank" rel="noopener noreferrer">Create a fine-grained token</a></li>
        <li>Repository access: only <b>{REPO.name}</b></li>
        <li>Permissions: <b>Contents → Read and write</b></li>
      </ol>
      <label className="fld">
        <span>Personal access token</span>
        <input className="inp" type="password" autoComplete="off" value={value} onChange={(e) => setValue(e.target.value)} placeholder="github_pat_…" />
      </label>
      <label style={{ display: 'flex', gap: 8, margin: '14px 0 22px', fontSize: 14 }}>
        <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
        Remember on this device (otherwise cleared when the tab closes)
      </label>
      <button className="btn btn--ink" disabled={busy || !value.trim()}>{busy ? 'Checking…' : 'Sign in'}</button>
      {error && <p className="adm__msg adm__msg--err" style={{ marginTop: 16 }}>{error}</p>}
    </form>
  )
}

type Status = { kind: 'idle' | 'saving' | 'ok' | 'err'; msg?: string; url?: string }

/** Loads one data file, tracks edits against the last saved copy, and commits it on save. */
function useDoc<K extends keyof DataFiles>(token: string, key: K) {
  const [draft, setDraft] = useState<DataFiles[K] | null>(null)
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const sha = useRef('')
  const saved = useRef('')

  useEffect(() => {
    let live = true
    loadData(token, key)
      .then(({ value, sha: s }) => {
        if (!live) return
        sha.current = s
        saved.current = JSON.stringify(value)
        setDraft(value)
      })
      .catch((e) => live && setStatus({ kind: 'err', msg: `Could not load ${key}: ${e.message}` }))
    return () => { live = false }
  }, [token, key])

  const dirty = draft !== null && JSON.stringify(draft) !== saved.current

  const save = useCallback(async () => {
    if (!draft) return
    setStatus({ kind: 'saving' })
    try {
      const res = await saveData(token, key, draft, sha.current)
      sha.current = res.sha
      saved.current = JSON.stringify(draft)
      setStatus({ kind: 'ok', url: res.commitUrl })
    } catch (e) {
      setStatus({ kind: 'err', msg: e instanceof Error ? e.message : 'Save failed' })
    }
  }, [draft, key, token])

  return { draft, setDraft, dirty, save, status }
}

const TABS = ['profile', 'projects', 'experience', 'credentials', 'skills'] as const
type Tab = (typeof TABS)[number]

function Dashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>('profile')
  const docs = {
    profile: useDoc(token, 'profile'),
    projects: useDoc(token, 'projects'),
    experience: useDoc(token, 'experience'),
    credentials: useDoc(token, 'credentials'),
    skills: useDoc(token, 'skills'),
  }
  const cur = docs[tab]

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (Object.values(docs).some((d) => d.dirty)) e.preventDefault()
    }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  })

  return (
    <div className="adm">
      <div className="adm__top">
        <div className="wrap adm__top-in">
          <div className="adm__brand">Portfolio admin <em>{REPO.owner}/{REPO.name}</em></div>
          <div style={{ display: 'flex', gap: 8 }}>
            <a className="mini" href={import.meta.env.BASE_URL} target="_blank" rel="noopener noreferrer"><ExternalLink size={14} />&nbsp;View site</a>
            <button className="mini" onClick={onLogout}><LogOut size={14} />&nbsp;Sign out</button>
          </div>
        </div>
      </div>

      <div className="adm__tabs" role="tablist">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={t === tab} className="adm__tab" onClick={() => setTab(t)}>
            {t}{docs[t].dirty ? ' •' : ''}
          </button>
        ))}
      </div>

      <main className="wrap adm__main">
        {cur.draft === null ? (
          <p className="adm__msg">{cur.status.kind === 'err' ? <span className="adm__msg--err">{cur.status.msg}</span> : 'Loading from GitHub…'}</p>
        ) : tab === 'profile' ? (
          <ProfileEditor token={token} value={docs.profile.draft!} onChange={docs.profile.setDraft} />
        ) : tab === 'projects' ? (
          <ProjectsEditor token={token} value={docs.projects.draft!} onChange={docs.projects.setDraft} />
        ) : tab === 'experience' ? (
          <ExperienceEditor token={token} value={docs.experience.draft!} onChange={docs.experience.setDraft} />
        ) : tab === 'credentials' ? (
          <CredentialsEditor token={token} value={docs.credentials.draft!} onChange={docs.credentials.setDraft} />
        ) : (
          <SkillsEditor token={token} value={docs.skills.draft!} onChange={docs.skills.setDraft} />
        )}
      </main>

      <div className="adm__savebar">
        <div className="wrap adm__savebar-in">
          <div className="adm__msg">
            {cur.status.kind === 'saving' && 'Committing to GitHub…'}
            {cur.status.kind === 'err' && <span className="adm__msg--err">{cur.status.msg}</span>}
            {cur.status.kind === 'ok' && !cur.dirty && (
              <>Saved. The site redeploys in about a minute · <a href={cur.status.url} target="_blank" rel="noopener noreferrer">commit</a> · <a href={actionsUrl} target="_blank" rel="noopener noreferrer">deploy status</a></>
            )}
            {cur.status.kind !== 'saving' && cur.status.kind !== 'err' && (cur.dirty ? 'Unsaved changes in this tab.' : cur.status.kind === 'idle' && 'No changes.')}
          </div>
          <button className="btn btn--ink" disabled={!cur.dirty || cur.status.kind === 'saving'} onClick={cur.save}>
            <Save size={16} /> Save {tab}
          </button>
        </div>
      </div>
    </div>
  )
}
