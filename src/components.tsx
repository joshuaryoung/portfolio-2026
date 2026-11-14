import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from 'react'
import { animate, motion, useInView } from 'motion/react'

/** Fade + slide in when scrolled into view. */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** Counts up to `to` when visible. */
export function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!inView) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return setValue(to)
    const controls = animate(0, to, { duration: 1.8, ease: 'easeOut', onUpdate: (v) => setValue(Math.round(v)) })
    return () => controls.stop()
  }, [inView, to])
  return (
    <span ref={ref}>
      {value.toLocaleString()}
      {suffix}
    </span>
  )
}

/** Card with a cursor-following spotlight glow. */
export function SpotlightCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <div className={`spot ${className}`} onMouseMove={onMove}>
      {children}
    </div>
  )
}

const ICON_PATHS = {
  linkedin:
    'M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z',
  github:
    'M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.26.8-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22v3.29c0 .32.19.69.8.58A12 12 0 0 0 12 .3z',
} as const

export type IconName = keyof typeof ICON_PATHS | 'mail'

export function Icon({ name }: { name: IconName }) {
  if (name === 'mail') {
    return (
      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
        <path d="m3 7 9 6.5L21 7" />
      </svg>
    )
  }
  return (
    <svg className="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={ICON_PATHS[name]} />
    </svg>
  )
}

/** Link/button that gently pulls toward the cursor. */
export function Magnetic({ children, href, variant = 'ghost', icon }: { children: ReactNode; href: string; variant?: 'solid' | 'ghost'; icon?: IconName }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const move = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - (r.left + r.width / 2)) * 0.25
    const y = (e.clientY - (r.top + r.height / 2)) * 0.35
    el.style.transform = `translate(${x}px, ${y}px)`
  }
  const leave = () => {
    if (ref.current) ref.current.style.transform = ''
  }
  const external = href.startsWith('http')
  return (
    <a
      ref={ref}
      className={`btn ${variant}`}
      href={href}
      onMouseMove={move}
      onMouseLeave={leave}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {icon && <Icon name={icon} />}
      {children}
    </a>
  )
}

/** Rotating role line. */
export function Rotator({ items }: { items: string[] }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % items.length), 2400)
    return () => clearInterval(t)
  }, [items.length])
  return (
    <span key={i} className="rotator">
      {items[i]}
    </span>
  )
}
