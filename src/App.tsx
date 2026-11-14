import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { motion, MotionConfig, useScroll, useSpring } from 'motion/react'
import './App.css'
import { aiSkills, certifications, education, experience, languages, profile, skills } from './data'
import { Counter, Magnetic, Reveal, Rotator, SpotlightCard } from './components'

const YEAR = new Date().getFullYear()
const ROLES = ['React & Next.js', 'TypeScript & Node.js', 'GraphQL & NestJS', 'AWS Serverless', 'Mentoring & Architecture']

const STATS = [
  { to: 9, suffix: '+', label: 'years building for the web' },
  { to: 1000, suffix: '+', label: 'concurrent users supported' },
  { to: 40, suffix: '%', label: 'faster data retrieval' },
  { to: 4, suffix: '', label: 'languages spoken' },
]

function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() =>
    document.documentElement.dataset.theme === 'light' ? 'light' : 'dark',
  )
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* storage unavailable */
    }
  }, [theme])
  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))] as const
}

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--px', `${((e.clientX - r.left) / r.width - 0.5) * 2}`)
    e.currentTarget.style.setProperty('--py', `${((e.clientY - r.top) / r.height - 0.5) * 2}`)
  }
  const letters = profile.name.split('')
  return (
    <section className="hero" ref={ref} onMouseMove={onMove}>
      <div className="mesh" aria-hidden="true">
        <i className="blob b1" />
        <i className="blob b2" />
        <i className="blob b3" />
        <div className="grain" />
      </div>
      <div className="hero-inner">
        <p className="eyebrow">Senior Full-Stack Developer · {profile.location}</p>
        <h1 aria-label={profile.name}>
          {letters.map((ch, i) => (
            <span key={i} className="ch" style={{ animationDelay: `${0.15 + i * 0.045}s` }} aria-hidden="true">
              {ch === ' ' ? ' ' : ch}
            </span>
          ))}
        </h1>
        <p className="roleline">
          I build with <Rotator items={ROLES} />
        </p>
        <div className="cta">
          <Magnetic href="#experience" variant="solid">View my work</Magnetic>
          <Magnetic href={profile.linkedin} icon="linkedin">LinkedIn</Magnetic>
          {profile.github && <Magnetic href={profile.github} icon="github">GitHub</Magnetic>}
          <Magnetic href={`mailto:${profile.email}`} icon="mail">Say hello</Magnetic>
        </div>
      </div>
      <a className="scrollcue" href="#about" aria-label="Scroll to content">
        <span />
      </a>
    </section>
  )
}

function Timeline() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 })
  return (
    <div className="timeline" ref={ref}>
      <div className="rail" aria-hidden="true">
        <motion.div className="rail-fill" style={{ scaleY }} />
      </div>
      {experience.map((e) => (
        <Reveal key={e.company + e.role} className="tl-item">
          <span className="dot" aria-hidden="true" />
          <SpotlightCard>
            <p className="meta">
              {e.period}
              {e.location && ` · ${e.location}`}
            </p>
            <h3>
              {e.role} <span className="at">@ {e.company}</span>
            </h3>
            <ul>
              {e.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </SpotlightCard>
        </Reveal>
      ))}
    </div>
  )
}

export default function App() {
  const [theme, toggle] = useTheme()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 })

  return (
    <MotionConfig reducedMotion="user">
      <motion.div className="progress" style={{ scaleX: progress }} aria-hidden="true" />
      <nav className="nav">
        <a href="#top" className="logo">JY<span>.</span></a>
        <div className="navlinks">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#more">More</a>
          <button
            className="toggle"
            onClick={toggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
        </div>
      </nav>

      <div id="top" />
      <Hero />

      <main>
        <section id="about" className="sec">
          <Reveal>
            <h2><span className="num">01</span> About</h2>
            <p className="lead">{profile.summary}</p>
          </Reveal>
          <div className="stats">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="stat">
                  <b><Counter to={s.to} suffix={s.suffix} /></b>
                  <span>{s.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="experience" className="sec">
          <Reveal><h2><span className="num">02</span> Experience</h2></Reveal>
          <Timeline />
        </section>

        <section id="skills" className="sec">
          <Reveal><h2><span className="num">03</span> Skills</h2></Reveal>
          <Reveal>
            <SpotlightCard className="aicard">
              <span className="badge">AI</span>
              <h3>{aiSkills.heading}</h3>
              <p>{aiSkills.blurb}</p>
              <div>
                {aiSkills.tags.map((t) => (
                  <em key={t} className="chip">{t}</em>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>
          <div className="skillgrid">
            {Object.entries(skills).map(([group, items], i) => (
              <Reveal key={group} delay={i * 0.06}>
                <SpotlightCard className="skillcard">
                  <h3>{group}</h3>
                  <div>
                    {items.map((s) => (
                      <em key={s} className="chip">{s}</em>
                    ))}
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="more" className="sec">
          <Reveal><h2><span className="num">04</span> Education &amp; More</h2></Reveal>
          <div className="skillgrid">
            <Reveal>
              <SpotlightCard>
                <h3>Education</h3>
                {education.map((e) => (
                  <p key={e.school}>{e.school} <span className="meta">· {e.period}</span></p>
                ))}
              </SpotlightCard>
            </Reveal>
            <Reveal delay={0.06}>
              <SpotlightCard>
                <h3>Certifications</h3>
                {certifications.map((c) => (
                  <p key={c.name}>{c.name} <span className="meta">· {c.issuer}, {c.date}</span></p>
                ))}
              </SpotlightCard>
            </Reveal>
            <Reveal delay={0.12}>
              <SpotlightCard>
                <h3>Languages</h3>
                <div>
                  {languages.map((l) => (
                    <em key={l} className="chip">{l}</em>
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>
          </div>
        </section>

        <section className="sec contact">
          <Reveal>
            <h2>Let’s build something.</h2>
            <div className="cta center">
              <Magnetic href={`mailto:${profile.email}`} variant="solid" icon="mail">{profile.email}</Magnetic>
            </div>
          </Reveal>
        </section>
      </main>

      <footer>© {YEAR} {profile.name} · Built with React, Vite &amp; Motion</footer>
    </MotionConfig>
  )
}
