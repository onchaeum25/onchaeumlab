import React from 'react';
import Header from '../components/landing/Header';
import Hero from '../components/landing/Hero';
import About from '../components/landing/About';
import WhyUs from '../components/landing/WhyUs';
import Process from '../components/landing/Process';
import Portfolio from '../components/landing/Portfolio';
import Reviews from '../components/landing/Reviews';
import FAQ from '../components/landing/FAQ';

import Footer from '../components/landing/Footer';
import FloatingButtons from '../components/common/FloatingButtons';

const LandingPage: React.FC = () => {
  return (
    <>
      <div className="landing-layout">
        <Header />
        <main>
          <Hero />
          <About />
          <WhyUs />
          <Process />
          <Portfolio />
          <Reviews />
          <FAQ />
        </main>
        <Footer />
      </div>
      <FloatingButtons />
    </>
  );
};

export default LandingPage;
