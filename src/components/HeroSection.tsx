import { useEffect, useRef } from 'react';
import { Linkedin, Github } from 'lucide-react';

const ENABLE_HERO_CONTENT = false;

export default function HeroSection() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const hasInitialized = useRef(false);

    const fadeOpacity = (el: HTMLElement, start: number, end: number, duration: number, onComplete?: () => void) => {
        let startTime: number | null = null;
        const animate = (time: number) => {
            if (startTime === null) startTime = time;
            const progress = Math.min((time - startTime) / duration, 1);
            el.style.opacity = String(start + (end - start) * progress);
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                if (onComplete) onComplete();
            }
        };
        requestAnimationFrame(animate);
    };

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleCanPlay = () => {
            if (!hasInitialized.current) {
                hasInitialized.current = true;
                video.playbackRate = 0.5;
                video.play().catch(() => {});
                fadeOpacity(video, 0, 1, 500);
            }
        };

        video.addEventListener('canplay', handleCanPlay);

        return () => {
            video.removeEventListener('canplay', handleCanPlay);
        };
    }, []);

    return (
        <section className="min-h-[25vh] md:min-h-[35vh] max-h-[400px] relative flex flex-col overflow-hidden bg-black w-full">
            {/* Background Image */}
            <div className="absolute inset-0" style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent)', maskImage: 'linear-gradient(to bottom, black 80%, transparent)' }}>
                <img
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: 'center 35%' }}
                    src="/trees.jpg"
                    alt="Trees"
                />
            </div>

            {/* Navbar / Bottom Right Buttons */}
            <div className="absolute bottom-6 right-16 md:right-24 z-20 flex gap-3 items-center mb-[-0.5rem] md:mb-[-1rem]">
                 <div className="liquid-glass rounded-full w-[40px] h-[40px] md:w-[56px] md:h-[56px] flex-shrink-0 flex items-center justify-center overflow-hidden bg-black/40">
                     <img 
                         src="/Weixin Image_20260602222449_61_11.jpg" 
                         alt="Ellen" 
                         className="w-full h-full object-cover scale-x-[-1] opacity-90 mix-blend-screen"
                     />
                 </div>
                 <a href="https://www.linkedin.com/in/ellenyanyw/" target="_blank" rel="noopener noreferrer" className="liquid-glass rounded-full p-2 md:p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all group w-[40px] h-[40px] md:w-[56px] md:h-[56px] flex items-center justify-center">
                     <Linkedin className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
                 </a>
                 <a href="https://github.com/yiwei-ellen" target="_blank" rel="noopener noreferrer" className="liquid-glass rounded-full p-2 md:p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all group w-[40px] h-[40px] md:w-[56px] md:h-[56px] flex items-center justify-center">
                     <Github className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
                 </a>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-16 md:pt-20 pb-0 text-center">
                {ENABLE_HERO_CONTENT && (
                    <h1 className="font-serif text-7xl md:text-8xl lg:text-9xl text-white tracking-tight whitespace-nowrap mb-8 md:mb-10 drop-shadow-sm">
                        Know it <em className="italic font-normal">all</em>.
                    </h1>
                )}
                
                {ENABLE_HERO_CONTENT && (
                    <>
                        <p className="text-white text-sm leading-relaxed px-4 max-w-lg mx-auto mb-8 text-shadow-sm mt-8">
                            Stay updated with the latest news and insights. Subscribe to our newsletter today and never miss out on exciting updates.
                        </p>

                        <button className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors">
                            Read Manifesto
                        </button>
                    </>
                )}
            </div>
        </section>
    )
}
