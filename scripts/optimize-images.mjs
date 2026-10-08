// Usage: node scripts/optimize-images.mjs <inputDir> [outDir=public/img]
// Writes <name>.webp (<=1600w), <name>-thumb.webp (640w) and prints metadata JSON
// (dimensions + tiny blur placeholder) that the site's image components use.
import sharp from 'sharp'
import { readdir, mkdir } from 'node:fs/promises'
import path from 'node:path'

const [inDir, outDir = 'public/img'] = process.argv.slice(2)
if (!inDir) throw new Error('input dir required')
await mkdir(outDir, { recursive: true })

const meta = {}
for (const file of await readdir(inDir)) {
  if (!/\.(png|jpe?g|webp)$/i.test(file)) continue
  const name = path.parse(file).name.toLowerCase().replace(/[^a-z0-9]+/g, '_')
  const input = sharp(path.join(inDir, file)).rotate()
  const full = await input.clone().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 78 }).toBuffer({ resolveWithObject: true })
  await sharp(full.data).toFile(path.join(outDir, `${name}.webp`))
  await sharp(full.data).resize({ width: 640, withoutEnlargement: true }).webp({ quality: 72 }).toFile(path.join(outDir, `${name}-thumb.webp`))
  const blur = await sharp(full.data).resize({ width: 24 }).webp({ quality: 40 }).toBuffer()
  meta[name] = {
    src: `img/${name}.webp`,
    thumb: `img/${name}-thumb.webp`,
    w: full.info.width,
    h: full.info.height,
    blur: `data:image/webp;base64,${blur.toString('base64')}`,
  }
}
console.log(JSON.stringify(meta))
