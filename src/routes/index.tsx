import { createFileRoute } from '@tanstack/react-router'
import { Nav } from '../components/site/Nav'
import { Hero, StackBand } from '../components/site/Hero'
import { Projects } from '../components/site/Projects'
import { Contact, Credentials, Experience, Skills, TerminalSection } from '../components/site/Sections'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StackBand />
        <Projects />
        <Experience />
        <Skills />
        <Credentials />
        <TerminalSection />
        <Contact />
      </main>
    </>
  )
}
