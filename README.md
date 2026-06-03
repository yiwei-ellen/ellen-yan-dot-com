# Ellen's Personal Portfolio

A modern, interactive personal portfolio and landing page built with React, Vite, and Tailwind CSS. 

## Features

- **Hero Landing**: A sleek landing view with a masked background image and social links.
- **Interactive Hiking Globe**: A 3D interactive globe showcasing favorite hiking trails around the world using `three-globe` and React.
- **Featured Video Section**: A styled video section designed to express core values and highlights.
- **Responsive Design**: Mobile-first, fluid layout using Tailwind CSS utility classes.

## Tech Stack

- [React](https://reactjs.org/) (v18+)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Three.js](https://threejs.org/) & [Three Globe](https://github.com/vasturiano/three-globe)
- [Lucide React](https://lucide.dev/) for icons
- [Framer Motion](https://www.framer.com/motion/) for animations

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Structure

- `src/components/HeroSection.tsx`: The top landing section with an image mask.
- `src/components/HikingGlobe.tsx`: The interactive 3D globe component mapped with hiking coordinates.
- `src/components/FeaturedVideoSection.tsx`: Highlight video and values section.
- `src/components/AboutSection.tsx`: Additional info about Ellen.

## License

MIT License.
