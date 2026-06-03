import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { MapPin } from 'lucide-react';
import HikingGlobe from './HikingGlobe';

export default function FeaturedVideoSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="bg-black pt-6 md:pt-10 pb-20 md:pb-32 px-6 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.9 }}
                    className="relative overflow-hidden aspect-video w-[calc(100%+48px)] -mx-6 md:w-[calc(100%+80px)] md:-mx-10"
                    style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 1%, black 99%, transparent)', maskImage: 'linear-gradient(to bottom, transparent, black 1%, black 99%, transparent)' }}
                >
                    <video
                        className="w-full h-full object-cover"
                        muted
                        autoPlay
                        loop
                        playsInline
                        preload="auto"
                        src="/landing-bg.mp4"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 pb-16 md:pb-24 flex flex-col md:flex-row items-end justify-between gap-6 px-12 md:px-20">
                        {/* Left: a liquid-glass rounded-2xl p-6 md:p-8 max-w-md card. */}
                        <div className="liquid-glass rounded-2xl p-6 md:p-8 max-w-[340px] w-full self-start md:self-auto ml-auto mr-auto md:ml-0 md:mr-0 z-10 relative">
                            <p className="text-white/50 text-xs tracking-widest uppercase mb-3">My Values</p>
                            <p className="text-white text-sm md:text-base leading-relaxed">
                                I believe in curiosity, resilience and kindness. No matter the season outside, may there always be an invincible summer within. 
                            </p>
                        </div>

                        {/* Right side component removed */}
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-12 flex justify-center w-full"
                >
                    <HikingGlobe />
                </motion.div>
            </div>
        </section>
    );
}
