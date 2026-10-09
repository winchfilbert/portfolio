import { asset } from '../../lib/site'
import { techLogo } from '../../lib/tech'

/** Brand logo for a technology name; renders nothing when we don't have one. */
export function TechIcon({ name, size = 22, eager }: { name: string; size?: number; eager?: boolean }) {
  const file = techLogo(name)
  if (!file) return null
  return (
    <img className="tech-ico" src={asset(`tech/${file}`)} alt="" width={size} height={size} loading={eager ? 'eager' : 'lazy'} decoding="async" />
  )
}
