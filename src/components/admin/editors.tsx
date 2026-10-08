import type { Credentials, Experience, Profile, Project, Skills } from '../../lib/types'
import { Images, Items, Strings, Text } from './fields'

const uid = () => Math.random().toString(36).slice(2, 10)
type Props<T> = { value: T; onChange: (v: T) => void; token: string }

export function ProfileEditor({ value: p, onChange, token }: Props<Profile>) {
  const set = (patch: Partial<Profile>) => onChange({ ...p, ...patch })
  return (
    <>
      <div className="box">
        <div className="box__h">Identity</div>
        <div className="box__b">
          <div className="row2">
            <Text label="Name" value={p.name} onChange={(name) => set({ name })} />
            <Text label="Greeting (before I'm …)" hint="e.g. Hi!  or  こんにちは!" value={p.greeting} onChange={(greeting) => set({ greeting })} />
          </div>
          <Text label="Title (small line above the name)" value={p.title} onChange={(title) => set({ title })} />
          <Text label="Tagline (under the name)" hint="Wrap words in *asterisks* to highlight them in amber." value={p.tagline} onChange={(tagline) => set({ tagline })} />
          <Text label="Headline (sentence under the tagline)" value={p.headline} onChange={(headline) => set({ headline })} />
          <Text label="About / summary" hint="Blank line between paragraphs. Also used by the terminal." area rows={9} value={p.summary} onChange={(summary) => set({ summary })} />
          <Images label="Profile photo" token={token} images={[p.photo]} max={1} onChange={([photo]) => set({ photo })} />
        </div>
      </div>
      <div className="box">
        <div className="box__h">Contact</div>
        <div className="box__b">
          <div className="row2">
            <Text label="Email" value={p.email} onChange={(email) => set({ email })} />
            <Text label="Phone (terminal only)" value={p.phone} onChange={(phone) => set({ phone })} />
            <Text label="LinkedIn (no https://)" value={p.linkedin} onChange={(linkedin) => set({ linkedin })} />
            <Text label="GitHub (no https://)" value={p.github} onChange={(github) => set({ github })} />
          </div>
          <Text label="Location" value={p.location} onChange={(location) => set({ location })} />
        </div>
      </div>
      <div className="box">
        <div className="box__h">Proof: hero numbers & stack band</div>
        <div className="box__b">
          <Items items={p.stats} onChange={(stats) => set({ stats })} title={(s) => `${s.value} ${s.label}`} make={() => ({ value: '', label: '' })} addLabel="Add stat">
            {(s, up) => (
              <div className="row2">
                <Text label="Number" value={s.value} onChange={(value) => up({ value })} />
                <Text label="Label" value={s.label} onChange={(label) => up({ label })} />
              </div>
            )}
          </Items>
          <Strings label="Core stack (amber band)" items={p.coreStack} onChange={(coreStack) => set({ coreStack })} />
          <Strings label="Spoken languages" items={p.languages} onChange={(languages) => set({ languages })} />
        </div>
      </div>
    </>
  )
}

export function ProjectsEditor({ value, onChange, token }: Props<Project[]>) {
  return (
    <Items
      items={value}
      onChange={onChange}
      title={(p) => p.name}
      addLabel="Add project"
      make={() => ({ id: uid(), name: '', tech: [], description: '', longDescription: '', keyFeatures: [], images: [], link: '' })}
    >
      {(p, up) => (
        <>
          <div className="row2">
            <Text label="Name" value={p.name} onChange={(name) => up({ name })} />
            <Text label="Link (optional)" value={p.link ?? ''} onChange={(link) => up({ link })} />
          </div>
          <Text label="Card description (one or two lines)" area rows={2} value={p.description} onChange={(description) => up({ description })} />
          <Text label="Case study text" area rows={5} value={p.longDescription} onChange={(longDescription) => up({ longDescription })} />
          <Strings label="Tech stack" items={p.tech} onChange={(tech) => up({ tech })} />
          <Strings label="Key features & impact" items={p.keyFeatures} onChange={(keyFeatures) => up({ keyFeatures })} area />
          <Images label="Screenshots (first one is the card cover)" token={token} images={p.images} onChange={(images) => up({ images })} />
        </>
      )}
    </Items>
  )
}

export function ExperienceEditor({ value, onChange }: Props<Experience[]>) {
  return (
    <Items
      items={value}
      onChange={onChange}
      title={(e) => `${e.role}${e.company ? ` @ ${e.company}` : ''}`}
      addLabel="Add role"
      make={() => ({ id: uid(), role: '', company: '', location: '', start: '', end: 'Present', bullets: [] })}
    >
      {(e, up) => (
        <>
          <div className="row2">
            <Text label="Role" value={e.role} onChange={(role) => up({ role })} />
            <Text label="Company" value={e.company} onChange={(company) => up({ company })} />
            <Text label="Start (e.g. Sep 2025)" value={e.start} onChange={(start) => up({ start })} />
            <Text label="End (or Present)" value={e.end} onChange={(end) => up({ end })} />
          </div>
          <Text label="Location (optional)" value={e.location} onChange={(location) => up({ location })} />
          <Strings label="Highlights" items={e.bullets} onChange={(bullets) => up({ bullets })} area />
        </>
      )}
    </Items>
  )
}

export function CredentialsEditor({ value: c, onChange }: Props<Credentials>) {
  const set = (patch: Partial<Credentials>) => onChange({ ...c, ...patch })
  return (
    <>
      <Items items={c.education} onChange={(education) => set({ education })} title={(e) => e.degree} addLabel="Add education" make={() => ({ id: uid(), degree: '', school: '', start: '', end: '', note: '' })}>
        {(e, up) => (
          <>
            <div className="row2">
              <Text label="Degree" value={e.degree} onChange={(degree) => up({ degree })} />
              <Text label="School" value={e.school} onChange={(school) => up({ school })} />
              <Text label="Start" value={e.start} onChange={(start) => up({ start })} />
              <Text label="End" value={e.end} onChange={(end) => up({ end })} />
            </div>
            <Text label="Note (e.g. GPA)" value={e.note} onChange={(note) => up({ note })} />
          </>
        )}
      </Items>
      <div className="box"><div className="box__h">Certifications</div><div className="box__b"><Strings label="" items={c.certifications} onChange={(certifications) => set({ certifications })} /></div></div>
      <div className="box"><div className="box__h">Awards</div><div className="box__b"><Strings label="" items={c.awards} onChange={(awards) => set({ awards })} /></div></div>
      <div className="box"><div className="box__h">Teaching & volunteering</div><div className="box__b"><Strings label="" items={c.volunteering} onChange={(volunteering) => set({ volunteering })} /></div></div>
    </>
  )
}

export function SkillsEditor({ value, onChange }: Props<Skills>) {
  return (
    <Items items={value.groups} onChange={(groups) => onChange({ groups })} title={(g) => g.name} addLabel="Add skill group" make={() => ({ name: '', items: [] })}>
      {(g, up) => (
        <>
          <Text label="Group name" value={g.name} onChange={(name) => up({ name })} />
          <Strings label="Skills" items={g.items} onChange={(items) => up({ items })} />
        </>
      )}
    </Items>
  )
}
