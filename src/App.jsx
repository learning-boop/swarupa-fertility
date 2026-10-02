import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Treatments from './components/Treatments';
import WhyChoose from './components/WhyChoose';
import Specialist from './components/Specialist';
import Journey from './components/Journey';
import Stats from './components/Stats';
import Faq from './components/Faq';
import PregnancyTimeline from './components/PregnancyTimeline';
import VideoSection from './components/VideoSection';
import Testimonials from './components/Testimonials';
import Appointment from './components/Appointment';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Legal from './components/Legal';
import QuickActions from './components/QuickActions';
import { useHashRoute } from './hooks/useHashRoute';
import { useReveal, useParallax } from './hooks/useReveal';
import { site } from './config/site';

export default function App() {
  const route = useHashRoute();
  useReveal([route.page]);
  useParallax([route.page]);

  useEffect(() => {
    if (route.page !== 'home') {
      window.scrollTo(0, 0);
      document.title = `${site.name}, Vijayawada`;
    } else {
      document.title = `${site.name}, Vijayawada | IVF, IUI & ICSI`;
      // Only plain section ids (#about); old or unknown routes such as #/blog/... just show the top of the page.
      if (route.anchor && /^#[\w-]+$/.test(route.anchor)) {
        requestAnimationFrame(() => document.getElementById(route.anchor.slice(1))?.scrollIntoView());
      }
    }
  }, [route]);

  return (
    <>
      <a href="#main" className="sr-only z-50 rounded-lg bg-white px-4 py-2 font-semibold text-royal focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <Header overlay={route.page === 'home'} />
      {(route.page === 'privacy' || route.page === 'terms') && <Legal page={route.page} />}
      {route.page === 'home' && (
        <main id="main">
          <Hero />
          <About />
          <Treatments />
          <WhyChoose />
          <Stats />
          <Journey />
          <VideoSection />
          <PregnancyTimeline />
          <Specialist />
          <Testimonials />
          <Faq />
          <Appointment />
          <Contact />
        </main>
      )}
      <Footer />
      <QuickActions />
    </>
  );
}
