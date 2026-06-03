import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown } from 'lucide-react';

type JourneyItemData = {
    title: string;
    subtitle?: string;
    description: React.ReactNode;
    videoSrc: string;
};

const JOURNEY_ITEMS: JourneyItemData[] = [
    {
        title: "The Beginning",
        subtitle: "Finding the spark",
        description: "Ningbo → Shanghai → Hightstown, NJ → University of Pennsylvania, finished dual Bachelor's degrees in Computer Science and Business. I have always loved solving hard problems, multi-disciplinary work and understanding decisions.",
        videoSrc: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4",
    },
    {
        title: "Execution",
        subtitle: "I started my career specializing in building:",
        description: (
            <ul className="list-disc pl-4 space-y-2 mt-2">
                <li>Engineering intern at startups & IQVIA(2021-2022 summers)</li>
                <li>Product Manager at Microsoft Security (2024 - present)</li>
                <li>World Economic Forum Global Shaper, curator of the Seattle hub, growing a community of passionate changemakers (2024 - present) <a href="https://www.globalshapers.org/home" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white underline decoration-white/30 hover:decoration-white/80 transition-colors ml-1">Learn more</a></li>
            </ul>
        ),
        videoSrc: "/record.mp4",
    },
    {
        title: "Exploration",
        subtitle: "",
        description: "I deeply believe in human agency and want to build a better future for mankind. For that, I am still exploring what I can help with and how I can help.",
        videoSrc: "/reed.mp4",
    }
];

function JourneyItem({ item }: { item: JourneyItemData; key?: string | number }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"]
    });
    
    const sparkleScale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);

    return (
        <div ref={ref} className="relative grid grid-cols-[40px_1fr] md:grid-cols-[60px_1fr] gap-0 items-center mb-16 last:mb-0 w-full">
            <div className="flex justify-center items-center h-full relative z-10 w-full col-start-1">
                <motion.div 
                    style={{ scale: sparkleScale }}
                    className="bg-black p-1 rounded-full flex items-center justify-center w-8 h-8"
                >
                    <motion.div 
                        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                    />
                </motion.div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr] gap-6 md:gap-10 items-center col-start-2"
            >
                <div className="rounded-2xl overflow-hidden aspect-[4/3] w-full bg-white/5 opacity-80">
                    <video
                        className="w-full h-full object-cover"
                        muted
                        autoPlay
                        loop
                        playsInline
                        preload="auto"
                        src={item.videoSrc}
                    />
                </div>

                <div className="flex flex-col text-left">
                    {item.subtitle && <p className="text-white/40 text-[10px] md:text-xs tracking-widest uppercase mb-2">{item.subtitle}</p>}
                    <h3 className="text-2xl md:text-3xl text-white tracking-tight mb-2 font-serif">{item.title}</h3>
                    <div className="text-white/60 text-sm leading-relaxed max-w-lg">
                        {item.description}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function PhilosophySection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });
    
    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section className="bg-black pt-10 pb-32 px-6 overflow-hidden">
            <div className="max-w-4xl mx-auto" ref={containerRef}>
                <div className="relative">
                    <div className="absolute left-[19.5px] md:left-[29.5px] top-6 bottom-6 w-px bg-white/10" />
                    
                    <motion.div 
                        className="absolute left-[19.5px] md:left-[29.5px] top-6 w-px bg-white origin-top shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                        style={{ height: lineHeight }}
                    />
                    
                    <div className="flex flex-col">
                        {JOURNEY_ITEMS.map((item, index) => (
                            <JourneyItem key={index} item={item} />
                        ))}
                    </div>
                </div>

                <div className="flex justify-center mt-24">
                    <motion.div
                        animate={{ y: [0, 15, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50"
                    >
                        <ArrowDown className="w-6 h-6" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
