export type Img = {
  /** Path relative to the site base, e.g. `img/foo.webp` (<=1600px) */
  src: string
  /** 640px variant used for cards and thumbnails */
  thumb: string
  w: number
  h: number
  /** Tiny base64 WebP shown while the real image loads */
  blur: string
}

export type Stat = { value: string; label: string }

export type Profile = {
  name: string
  /** Hero greetings; the hero cycles through them every 5 seconds */
  greetings: string[]
  title: string
  headline: string
  tagline: string
  location: string
  email: string
  phone: string
  linkedin: string
  github: string
  summary: string
  languages: string[]
  coreStack: string[]
  stats: Stat[]
  photo: Img
}

export type Experience = {
  id: string
  role: string
  company: string
  location: string
  start: string
  end: string
  bullets: string[]
}

export type Project = {
  id: string
  name: string
  tech: string[]
  description: string
  longDescription: string
  keyFeatures: string[]
  images: Img[]
  link?: string
}

export type Education = {
  id: string
  degree: string
  school: string
  start: string
  end: string
  note: string
}

export type Credentials = {
  education: Education[]
  certifications: string[]
  awards: string[]
  volunteering: string[]
}

export type Skills = { groups: { name: string; items: string[] }[] }

/** Every editable data file: repo path -> shape */
export type DataFiles = {
  profile: Profile
  experience: Experience[]
  projects: Project[]
  credentials: Credentials
  skills: Skills
}
