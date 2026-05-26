# Karthikeyan VR - 3D Project

A cinematic, interactive 3D environment project built with **React**, **Three.js**, and **Vite**. This project showcases an immersive room environment with dynamic lighting, smooth camera animations, and a polished user interface.

## 🚀 Live Demo
[live at](https://my-3-d-project.vercel.app/)

## ✨ Features

- **Interactive 3D Environment**: A detailed room model with multiple points of interest.
- **Cinematic Camera**: Smooth transitions between the room overview and specific interactive areas (like the computer monitor) powered by **GSAP**.
- **Dynamic Lighting**: 
  - Realistic moonlight streaming through windows.
  - Interactive screen glow and fairy light effects.
  - Ambient and cinematic spot lighting for a professional mood.
- **Responsive Loading Screen**: A custom-designed loading experience with a real-time progress bar and a warm welcome message.
- **Modern UI**: Clean, minimal 2D overlays and 3D interactive buttons using **Framer Motion** and **Tailwind CSS**.
- **Mobile Friendly**: Responsive design that adapts the 3D canvas and UI elements for various screen sizes.
- **Performance Optimized**: Efficient asset loading and Vercel-ready configuration for fast delivery.

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://reactjs.org/)
- **3D Engine**: [Three.js](https://threejs.org/)
- **React 3D Bridge**: [React Three Fiber](https://r3.docs.pmnd.rs/)
- **3D Helpers**: [React Three Drei](https://github.com/pmndrs/drei)
- **Animations**: [GSAP](https://greensock.com/gsap/) & [Framer Motion](https://www.framer.com/motion/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## 📂 Project Structure

```text
src/
├── components/
│   ├── scene/          # 3D Scene components (Room, Lighting, Camera, etc.)
│   └── ui/             # 2D UI components (Loading Screen, Overlays)
├── styles/             # Global CSS and Tailwind configuration
├── utils/              # Helper functions and constants
├── App.tsx             # Main application entry point
└── main.tsx            # React mounting
public/
└── assets/
    └── models/         # 3D Models and textures
```

## 🏁 Getting Started

### Prerequisites
- Node.js (Latest LTS version recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Karthikn-VR/MyPortfolio.git
   ```
2. Navigate to the project folder:
   ```bash
   cd MyPortfolio
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Development
Start the local development server:
```bash
npm run dev
```

### Build
Create a production build:
```bash
npm run build
```

## 🌐 Deployment

This project is optimized for **Vercel**. 

1. Push your code to GitHub.
2. Connect your repository to Vercel.
3. Vercel will automatically detect the Vite framework and deploy your project using the provided `vercel.json` configuration.

## 📧 Contact

- **GitHub**: [@Karthikn-VR](https://github.com/Karthikn-VR)
- **LinkedIn**: [Karthikeyan V R](https://www.linkedin.com/in/karthikeyan-v-r-434268274/)
- **Email**: karthikeyanvr17@gmail.com

---
Built with ❤️ by Karthikeyan V R
