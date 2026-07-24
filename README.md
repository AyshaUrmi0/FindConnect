# FindConnect AI 🤖🔍

**FindConnect AI** is a next-generation, **AI-powered Lost & Found Intelligence Platform** designed to revolutionize how lost belongings are reported, cross-matched, and reunited with their rightful owners. Driven by Google Gemini 1.5 Flash multimodal vision and intelligent pattern matching, FindConnect AI eliminates manual form friction and predicts item matches with high precision.

---

## 🌟 Live Demo

- **Live Platform**: [FindConnect AI](https://findconnect-45273.web.app/)
- **Backend API**: [FindConnect Server](https://find-connect-server.vercel.app/)

---

## 💡 Project Overview & Purpose

Traditional lost and found systems rely on manual listing, vague descriptions, and passive browsing. **FindConnect AI** transforms this process into an **intelligent, automated recovery network**:
- **Instant AI Vision Recognition**: Upload an item image or link, and Gemini AI automatically extracts visual features, title, detailed description, and precise category classification in seconds.
- **AI Smart Match Engine**: Cross-analyzes lost item reports against community found submissions, scoring match compatibility and highlighting potential recoveries.
- **Interactive Geo-Spatial Map**: Visualizes lost (Red 🔍) and found (Emerald 🎁) items across cities on an interactive Leaflet map interface.
- **Community-Driven Trust**: Secure claim verification, community interaction, and real-time status tracking.

---

## 🤖 Core AI Capabilities

### 🧠 1. Multimodal AI Auto-Fill (Google Gemini 1.5 Flash)
- **Zero-Friction Item Posting**: Users upload a photo or image URL, and Gemini AI analyzes color, brand, object type, and condition.
- **Automated Metadata Extraction**: Generates concise titles, rich descriptive text, and auto-selects categories (Electronics, Documents, Jewelry, Accessories, Pets, etc.).

### 🔍 2. AI Smart Match Finder
- **Automated Similarity Scoring**: Evaluates items based on multimodal feature vectors, location proximity, category overlap, and date timestamps.
- **Match Confidence Rating**: Presents potential item matches with visual compatibility percentages (e.g., 95% Match Confidence) directly on item detail pages.

---

## ✨ Key Platform Features

### 📍 Interactive Geo-Spatial Map View
- **Leaflet & OpenStreetMap Integration**: Seamless toggle between Grid View and interactive Map View on `/allItems`.
- **Custom Visual Markers**: Distinct lost vs. found pin badges with location jittering for privacy and clarity.
- **Rich Preview Cards**: Interactive map popups with item thumbnails, metadata, and quick navigation.

### 🔐 Secure Authentication & User Control
- **Firebase Auth**: Secure email/password and social authentication.
- **My Items Dashboard**: Comprehensive management of user-reported items (Edit, Delete, Recover).
- **All Recovered Items Tracker**: Community showcase celebrating successful item reunions.

### 🎨 Modern Glassmorphic UI/UX System
- **Balanced Light & Dark Mode**: Dynamic theme switcher powered by `ThemeContext` and Tailwind CSS `class` strategy.
- **Framer Motion Micro-Animations**: Smooth card entrances, page transitions, and interactive hover states.
- **Fully Responsive**: Mobile-first fluid layout across desktop, tablet, and smartphone screens.

---

## 🛠️ Technology Stack

### 🚀 Frontend Architecture
- **React 18**: Modular functional components & custom hooks
- **Vite**: Ultra-fast build pipeline & dev server
- **Tailwind CSS & DaisyUI**: Custom design system tokens, glassmorphic utilities, and dark mode controls
- **Framer Motion**: Production-ready micro-animations & layout transitions
- **Leaflet & OpenStreetMap**: Interactive geo-spatial mapping
- **Lucide React**: Modern iconography

### 🧠 AI & Cloud Infrastructure
- **Google Gemini 1.5 Flash API**: Multimodal vision analysis & match scoring
- **Firebase Authentication**: Secure identity management
- **Firebase Hosting**: Global CDN deployment

### ⚙️ Backend API Services
- **Node.js & Express.js**: RESTful server architecture
- **MongoDB Atlas**: Cloud NoSQL database with indexing
- **JSON Web Tokens (JWT)**: Secure HttpOnly cookie session management
- **Vercel Serverless**: Cloud backend deployment

---

## 📁 Project Structure

```
FindConnect/
├── src/
│   ├── components/          # AI Smart Matches, Leaflet Map View, Header, Footer
│   │   ├── AiSmartMatches.jsx
│   │   └── ItemsMapView.jsx
│   ├── context/            # ThemeContext & AuthContext
│   ├── firebase/           # Firebase SDK initialization
│   ├── layouts/            # Main Layout shell
│   ├── pages/              # Pages: Home, AllItems, ItemDetails, AddItem, Dashboard
│   └── router/             # React Router configuration with fallback loaders
├── public/                 # Static assets & icons
├── DESIGN_SYSTEM.md        # UI/UX design tokens & guidelines
├── package.json            # Dependencies & build scripts
└── vite.config.js          # Vite build options
```

---

## 🔑 Environment Variables Setup

Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_GEMINI_API_KEY=your_google_gemini_api_key
```

---

## 💻 Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/AyshaUrmi0/FindConnect.git
   cd FindConnect
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run the local development server**
   ```bash
   pnpm dev
   ```

4. **Build for production**
   ```bash
   pnpm run build
   ```

---

## 👥 Author

- **Aysha Ismail** - Full Stack & AI Developer
- **GitHub**: [@AyshaUrmi0](https://github.com/AyshaUrmi0)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
