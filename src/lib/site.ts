/** Where this site lives. The admin dashboard commits changes here. */
export const REPO = { owner: 'winchfilbert', name: 'portfolio', branch: 'main' } as const

export const DATA_DIR = 'src/data'
export const IMAGE_DIR = 'public/img'

/** Resolve a repo-relative asset path (e.g. `img/a.webp`) against the deploy base path. */
export const asset = (path: string) =>
  path.startsWith('data:') || path.startsWith('http') ? path : `${import.meta.env.BASE_URL}${path}`
