/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import FeaturedVideoSection from './components/FeaturedVideoSection';
import PhilosophySection from './components/PhilosophySection';

export default function App() {
  return (
    <div className="bg-black min-h-screen text-white font-sans antialiased selection:bg-white/30 selection:text-white">
        <HeroSection />
        <AboutSection />
        <PhilosophySection />
        <FeaturedVideoSection />
    </div>
  );
}
