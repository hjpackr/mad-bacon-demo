import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Guarantee } from './components/Guarantee'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { RecentWork } from './components/RecentWork'
import { Services } from './components/Services'
import { Testimonials } from './components/Testimonials'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Guarantee />
        <RecentWork />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
