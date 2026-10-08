import { DATA_DIR, IMAGE_DIR, REPO } from './site'
import type { DataFiles, Img } from './types'

const API = 'https://api.github.com'
const TOKEN_KEY = 'portfolio-admin-token'

export const tokenStore = {
  get: () => {
    try { return sessionStorage.getItem(TOKEN_KEY) ?? localStorage.getItem(TOKEN_KEY) } catch { return null }
  },
  set: (token: string, remember: boolean) => {
    try { (remember ? localStorage : sessionStorage).setItem(TOKEN_KEY, token) } catch { /* storage blocked */ }
  },
  clear: () => {
    try { sessionStorage.removeItem(TOKEN_KEY); localStorage.removeItem(TOKEN_KEY) } catch { /* storage blocked */ }
  },
}

async function gh<T>(token: string, path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...init?.headers,
    },
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(`${res.status} ${body.message ?? res.statusText}`)
  }
  return res.json()
}

const repoPath = `/repos/${REPO.owner}/${REPO.name}`

/** Confirms the token works and can push to the repo. Returns the GitHub login. */
export async function verifyToken(token: string): Promise<string> {
  const [user, repo] = await Promise.all([
    gh<{ login: string }>(token, '/user'),
    gh<{ permissions?: { push?: boolean } }>(token, repoPath),
  ])
  if (!repo.permissions?.push) throw new Error('This token cannot push to the repository (needs Contents: read & write).')
  return user.login
}

const b64decode = (b64: string) => new TextDecoder().decode(Uint8Array.from(atob(b64.replace(/\n/g, '')), (c) => c.charCodeAt(0)))
const b64encodeText = (text: string) => {
  const bytes = new TextEncoder().encode(text)
  let bin = ''
  bytes.forEach((b) => (bin += String.fromCharCode(b)))
  return btoa(bin)
}

type Loaded<K extends keyof DataFiles> = { value: DataFiles[K]; sha: string }

export async function loadData<K extends keyof DataFiles>(token: string, key: K): Promise<Loaded<K>> {
  const file = await gh<{ content: string; sha: string }>(
    token,
    `${repoPath}/contents/${DATA_DIR}/${key}.json?ref=${REPO.branch}&_=${Date.now()}`,
  )
  return { value: JSON.parse(b64decode(file.content)), sha: file.sha }
}

export async function saveData<K extends keyof DataFiles>(
  token: string,
  key: K,
  value: DataFiles[K],
  sha: string,
): Promise<{ sha: string; commitUrl: string }> {
  const res = await gh<{ content: { sha: string }; commit: { html_url: string } }>(
    token,
    `${repoPath}/contents/${DATA_DIR}/${key}.json`,
    {
      method: 'PUT',
      body: JSON.stringify({
        message: `content: update ${key} via admin`,
        content: b64encodeText(JSON.stringify(value, null, 2) + '\n'),
        sha,
        branch: REPO.branch,
      }),
    },
  )
  return { sha: res.content.sha, commitUrl: res.commit.html_url }
}

// ---------- images ----------

async function canvasBlob(canvas: HTMLCanvasElement, quality: number): Promise<{ blob: Blob; ext: string }> {
  const toBlob = (type: string) => new Promise<Blob | null>((r) => canvas.toBlob(r, type, quality))
  const webp = await toBlob('image/webp')
  if (webp && webp.type === 'image/webp') return { blob: webp, ext: 'webp' }
  const jpg = await toBlob('image/jpeg')
  if (!jpg) throw new Error('Could not encode image')
  return { blob: jpg, ext: 'jpg' }
}

async function resize(bitmap: ImageBitmap, width: number): Promise<HTMLCanvasElement> {
  const w = Math.min(width, bitmap.width)
  const h = Math.round((bitmap.height * w) / bitmap.width)
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(bitmap, 0, 0, w, h)
  return canvas
}

const blobToBase64 = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const r = new FileReader()
    r.onload = () => resolve((r.result as string).split(',')[1])
    r.onerror = reject
    r.readAsDataURL(blob)
  })

const blobToDataUrl = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const r = new FileReader()
    r.onload = () => resolve(r.result as string)
    r.onerror = reject
    r.readAsDataURL(blob)
  })

async function putBinary(token: string, repoFile: string, blob: Blob, message: string) {
  await gh(token, `${repoPath}/contents/${repoFile}`, {
    method: 'PUT',
    body: JSON.stringify({ message, content: await blobToBase64(blob), branch: REPO.branch }),
  })
}

/**
 * Compresses a picked image in the browser (1600px + 640px variants, tiny blur placeholder),
 * commits both files to the repo and returns the metadata the site needs.
 */
export async function uploadImage(token: string, file: File): Promise<Img> {
  const bitmap = await createImageBitmap(file)
  const slug = file.name.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'image'
  const id = `${slug}-${Date.now().toString(36)}`

  const fullCanvas = await resize(bitmap, 1600)
  const full = await canvasBlob(fullCanvas, 0.8)
  const thumb = await canvasBlob(await resize(bitmap, 640), 0.74)
  const blur = await canvasBlob(await resize(bitmap, 24), 0.4)
  bitmap.close()

  const fullPath = `${IMAGE_DIR}/${id}.${full.ext}`
  const thumbPath = `${IMAGE_DIR}/${id}-thumb.${thumb.ext}`
  await putBinary(token, fullPath, full.blob, `content: add image ${id}`)
  await putBinary(token, thumbPath, thumb.blob, `content: add image ${id} (thumb)`)

  return {
    src: fullPath.replace('public/', ''),
    thumb: thumbPath.replace('public/', ''),
    w: fullCanvas.width,
    h: fullCanvas.height,
    blur: await blobToDataUrl(blur.blob),
  }
}

export const actionsUrl = `https://github.com/${REPO.owner}/${REPO.name}/actions`
export const tokenHelpUrl = 'https://github.com/settings/personal-access-tokens/new'
