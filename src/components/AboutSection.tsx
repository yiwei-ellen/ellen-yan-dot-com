import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

export default function AboutSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="bg-black pt-2 md:pt-4 pb-10 md:pb-14 px-6 overflow-hidden relative">
            {/* Subtle radial gradient overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-white/40 text-sm tracking-widest uppercase mb-6"
                >
                    About Me
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight max-w-4xl"
                >
                    An <span className="font-serif italic text-white">adventurer</span> and humanist, 
                    <br className="hidden md:block" />
                    who <span className="font-serif italic font-normal text-white/60">create, build, and inspire.</span>
                </motion.h2>
            </div>
        </section>
    )
}
