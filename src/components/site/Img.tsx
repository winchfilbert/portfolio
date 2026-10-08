import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import type { Img as ImgData } from '../../lib/types'
import { asset } from '../../lib/site'

const THUMB_W = 640

type Props = {
  img: ImgData
  alt: string
  /** Use the full-size file instead of the 640px thumb */
  full?: boolean
  /** Force a box ratio (crops with object-fit: cover) instead of the image's own ratio */
  ratio?: string
  /** Above-the-fold image: load eagerly with high priority */
  priority?: boolean
  sizes?: string
  contain?: boolean
}

/** Image with a blurred placeholder box that holds its space (no layout shift) and fades the real image in. */
export function Img({ img, alt, full, ratio, priority, sizes, contain }: Props) {
  const [loaded, setLoaded] = useState(false)
  const ref = useRef<HTMLImageElement>(null)

  useEffect(() => {
    setLoaded(false)
    if (ref.current?.complete && ref.current.naturalWidth) setLoaded(true)
  }, [img.src, full])

  const thumbW = Math.min(THUMB_W, img.w)
  const style = {
    aspectRatio: ratio ?? `${img.w} / ${img.h}`,
    backgroundImage: `url(${img.blur})`,
    ...(contain ? { '--fit': 'contain' } : {}),
  } as CSSProperties

  return (
    <div className="img-box" style={style}>
      <img
        ref={ref}
        src={asset(full ? img.src : img.thumb)}
        srcSet={full ? undefined : `${asset(img.thumb)} ${thumbW}w, ${asset(img.src)} ${img.w}w`}
        sizes={sizes}
        alt={alt}
        width={img.w}
        height={img.h}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        {...(priority ? { fetchPriority: 'high' as const } : {})}
        className={loaded ? 'is-loaded' : undefined}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}
