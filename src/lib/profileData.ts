import { data } from './data'
import { asset } from './site'

const { profile, experience, projects, credentials, skills } = data

/** Flattened shape consumed by the terminal commands. */
export const profileData = {
  name: profile.name,
  title: profile.title,
  headline: profile.headline,
  location: profile.location,
  email: profile.email,
  phone: profile.phone,
  linkedin: profile.linkedin,
  github: profile.github,
  summary: profile.summary,
  languages: profile.languages,
  photo: asset(profile.photo.thumb),
  photoFull: asset(profile.photo.src),

  experience: experience.map((e) => ({
    role: e.role,
    company: e.company,
    date: `${e.start} – ${e.end}`,
    bullets: e.bullets,
  })),

  education: credentials.education.map((e) => ({
    degree: e.degree,
    school: e.school,
    note: e.note,
    graduated: e.end,
  })),

  skills: Object.fromEntries(skills.groups.map((g) => [g.name, g.items])) as Record<string, string[]>,
  certifications: credentials.certifications,
  awards: credentials.awards,
  volunteering: credentials.volunteering,

  projects: projects.map((p) => ({
    name: p.name,
    tech: p.tech.join(', '),
    description: p.description,
    longDescription: p.longDescription,
    keyFeatures: p.keyFeatures,
    images: p.images.map((i) => asset(i.src)),
    thumbs: p.images.map((i) => asset(i.thumb)),
  })),
}
