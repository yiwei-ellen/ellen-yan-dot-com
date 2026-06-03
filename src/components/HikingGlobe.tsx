import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';

export type Trail = {
    lat: number;
    lng: number;
    name: string;
    description?: string;
};

const TRAIL_DATA: Trail[] = [
    { lat: 47.4116, lng: -121.5202, name: "Talapus & Goat Lake, WA" },
    { lat: 48.4046, lng: -122.6468, name: "Goose Rock, WA" },
    { lat: 34.9351, lng: -111.8596, name: "Subway Cave, AZ" },
    { lat: 34.8251, lng: -111.7948, name: "Cathedral Rock, AZ" },
    { lat: 46.7860, lng: -121.7354, name: "Skyline Loop, WA" },
    { lat: 46.9794, lng: 8.2541, name: "Pilatus Kulm, Switzerland" },
    { lat: 46.0154, lng: 7.7842, name: "5-Lakes Trail, Switzerland" },
    { lat: -51.0504, lng: -73.0039, name: "W Trail, Chile" },
    { lat: 48.0583, lng: -123.7744, name: "Mount Storm King, WA" },
    { lat: 30.1333, lng: 118.1667, name: "Yellow Mountain, Anhui" },
    { lat: 34.4820, lng: 110.0823, name: "Mount Hua, Shaanxi" },
    { lat: 29.3142, lng: 110.5312, name: "Zhangjiajie, Hunan" },
    { lat: 67.9711, lng: 13.0645, name: "Horseidstranda, Norway" },
    { lat: 37.7523, lng: -122.4475, name: "Twin Peaks, CA" },
    { lat: 48.5113, lng: -120.7599, name: "Maple Pass, WA" },
    { lat: 47.6152, lng: -120.5284, name: "Olalla Canyon, WA" },
    { lat: 19.6925, lng: -98.8439, name: "Teotihuacan, Mexico" },
    { lat: 38.5706, lng: -78.3149, name: "Old Rag Mountain, VA" },
];

export default function HikingGlobe() {
    const mainContainerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
    const globeRef = useRef<any>(null);

    useEffect(() => {
        const updateDimensions = () => {
            if (mainContainerRef.current) {
                setDimensions({
                    width: mainContainerRef.current.clientWidth,
                    height: Math.min(600, window.innerHeight * 0.7)
                });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    useEffect(() => {
        // Stop auto rotation and allow max zoom in
        if (globeRef.current) {
            globeRef.current.controls().autoRotate = false;
            globeRef.current.controls().minDistance = 60; // Allow much closer zoom
            
            // Start at a more zoomed-in level facing the highlighted US trails
            globeRef.current.pointOfView({ lat: 42.0, lng: -115.0, altitude: 1.2 }, 0);
            
            const controls = globeRef.current.controls();
            const updateZoomScale = () => {
                if (mainContainerRef.current) {
                    const distance = controls.getDistance();
                    // distance defaults around 250. Let's say scale is 1 at distance=200, and 3 at distance=60
                    const scale = Math.max(1, 200 / distance);
                    mainContainerRef.current.style.setProperty('--zoom-scale', scale.toString());
                }
            };
            controls.addEventListener('change', updateZoomScale);
            updateZoomScale();
            
            // cleanup not strictly necessary as it's the same ref, but good practice
            return () => {
                controls.removeEventListener('change', updateZoomScale);
            };
        }
    }, [dimensions]);
    
    return (
        <div ref={mainContainerRef} className="w-full flex items-center justify-center bg-black/50 rounded-3xl overflow-hidden border border-white/5 relative mt-16 md:mt-24">
             <div className="absolute top-6 left-6 z-10 pointer-events-none">
                 <h3 className="text-white font-serif text-xl md:text-2xl tracking-tight mb-2">My Recommended Hiking Trails</h3>
                 <p className="text-white/50 text-xs md:text-sm max-w-xs">A collection of trails around the world that left a lasting impression on me.</p>
             </div>
             
             <div className="w-full touch-none overscroll-none" style={{ height: dimensions.height }}>
                {typeof window !== 'undefined' && (
                    <Globe
                        ref={globeRef}
                        width={dimensions.width}
                        height={dimensions.height}
                        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                        backgroundColor="rgba(0,0,0,0)"
                        pointsData={TRAIL_DATA}
                        pointAltitude={0}
                        pointRadius={0.4}
                        pointColor={() => '#ffa500'}
                        pointResolution={16}
                        htmlElementsData={TRAIL_DATA}
                        htmlAltitude={0.01}
                        htmlElement={(d: any) => {
                            const el = document.createElement('div');
                            el.className = 'flex items-center gap-1 cursor-pointer pointer-events-auto hover:z-50';
                            el.innerHTML = `
                                <span class="text-white/90 font-medium whitespace-nowrap font-sans drop-shadow-[0_2px_4px_rgba(0,0,0,1)] bg-black/40 px-1.5 py-0.5 rounded transition-all duration-100 pointer-events-none mt-1 ml-1" 
                                      style="
                                        font-size: clamp(12px, calc(5px * var(--zoom-scale, 1)), 18px); 
                                        line-height: normal;
                                        transform-origin: left center;
                                        opacity: clamp(0, calc((var(--zoom-scale, 1) - 1.1) * 3), 1);
                                      ">
                                    ${d.name}
                                </span>
                            `;
                            return el;
                        }}
                    />
                )}
             </div>
        </div>
    );
}
