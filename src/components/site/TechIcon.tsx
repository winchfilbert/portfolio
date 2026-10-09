import { asset } from '../../lib/site'
import { techLogo } from '../../lib/tech'

/** Brand logo for a technology name; renders nothing when we don't have one. */
export function TechIcon({ name, size = 22 }: { name: string; size?: number }) {
  const file = techLogo(name)
  if (!file) return null
  return (
    <img className="tech-ico" src={asset(`tech/${file}.svg`)} alt="" width={size} height={size} loading="lazy" decoding="async" />
  )
}
