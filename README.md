🍔 Vingo — Food Delivery Platform

A full-stack food delivery application where users can browse restaurants, explore menus, manage their cart, and place orders — all with a seamless and responsive experience.

Live Demo: vingo-frontend-ten.vercel.app

Features :-----
🏪 Restaurant Browsing — Explore available restaurants and their menus
🛒 Cart Management — Add, remove, and update food items in real time
🔐 User Authentication — Secure login and signup with JWT-based sessions
📦 Order Placement — Place orders with live status tracking
☁️ Image Uploads — Restaurant and food images managed via Cloudinary
📱 Responsive Design — Fully optimized for mobile and desktop


Tech Stack :-----
React.js (Vite)
Redux & Redux Toolkit — centralized state management
React Router DOM — client-side routing
Axios — API communication
Tailwind CSS — styling


Project Structure :-----
Vingo-frontend/
├── public/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page-level components
│   ├── redux/            # Store, slices, actions
│   ├── services/         # API calls (Axios)
│   ├── utils/            # Helper functions
│   └── App.jsx
├── .env
├── vite.config.js
└── package.json
