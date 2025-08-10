# 🌱 CommunityCanvas - Social Development Events Platform

## 🔗 Live Demo
- [CommunityCanvas App](https://community-canvas1.web.app/)

---

## 📌 Project Overview

**CommunityCanvas** is a modern, community-driven event management platform empowering users to organize, discover, and participate in local service events—such as road cleanups, tree plantations, and donation drives. The platform fosters social engagement, transparency, and collaboration, making it easy for everyone to contribute to a better society.

---

## 🚀 Core Features

### 🔐 Authentication & Security
- Email/password registration & login
- Google OAuth integration
- JWT-based protected routes
- Password strength validation (uppercase, lowercase, min 6 chars)
- SweetAlert2 for user-friendly notifications

### 🏡 Home & User Experience
- Thematic banner and static event gallery
- Styled newsletter section (UI only)
- Responsive design for mobile, tablet, and desktop
- Accessible color contrast and spacing
- Animated transitions (Framer Motion)
- Light/Dark theme toggle (system-aware)
- User profile dropdown with quick navigation

### 🗓️ Event Management
- **Create Event:** Only future dates, user-specific ownership
- **Upcoming Events:** Grid view, filterable by type
- **Event Details:** Private route, join functionality
- **Join Events:** Persisted to MongoDB, visible in user dashboard
- **Joined Events:** Sorted by date, easy tracking
- **Manage Events:** Update or delete own events

### 🔍 Search & Filtering
- Filter by event type (Cleanup, Plantation, Donation, etc.)
- Server-side search by event name (MongoDB query)

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Firebase Authentication
- TailwindCSS
- Framer Motion
- SweetAlert2
- React Datepicker
- Axios
- Environment variables for sensitive keys

### Backend
- Express.js
- MongoDB (native driver)
- JWT authentication
- CORS configuration
- dotenv for environment management

---

## 📁 Project Structure

```
CommunityCanvas/
├── 📁 .firebase/
│   └── 🗑️ hosting.ZGlzdA.cache 🚫 (auto-hidden)
├── 📁 .git/ 🚫 (auto-hidden)
├── 📁 dist/ 🚫 (auto-hidden)
├── 📁 node_modules/ 🚫 (auto-hidden)
├── 📁 public/
│   ├── 📄 test.json
│   └── 🖼️ vite.svg
├── 📁 src/
│   ├── 📁 assets/
│   │   ├── 🖼️ background1.png
│   │   ├── 🖼️ cleaning.png
│   │   ├── 🖼️ communityArt.png
│   │   ├── 🖼️ createEvents.png
│   │   ├── 🖼️ happyVolunteers.png
│   │   ├── 🖼️ joinedEvent.png
│   │   ├── 🖼️ logo.png
│   │   ├── 🖼️ manageEvents.png
│   │   ├── 🖼️ planting.png
│   │   ├── 🖼️ react.svg
│   │   ├── 🖼️ searchEvents.png
│   │   ├── 🖼️ success.png
│   │   ├── 🖼️ teamwork.png
│   │   ├── 🖼️ upcomingEvents.png
│   │   ├── 🖼️ userIcon.png
│   │   └── 🖼️ volunteers Working.png
│   ├── 📁 components/
│   │   ├── 📁 CreateEvent/
│   │   │   ├── 📄 EventForm.jsx
│   │   │   └── 📄 FormElements.jsx
│   │   ├── 📁 Event/
│   │   │   ├── 📄 EventRow.jsx
│   │   │   ├── 📄 GridCard.jsx
│   │   │   └── 📄 SearchFilter.jsx
│   │   ├── 📁 Home/
│   │   │   ├── 📄 Banner.jsx
│   │   │   ├── 📄 CreateEventCTA.jsx
│   │   │   ├── 📄 Features.jsx
│   │   │   ├── 📄 Gallery.jsx
│   │   │   ├── 📄 HowItWorks.jsx
│   │   │   └── 📄 Newsletter.jsx
│   │   ├── 📄 Footer.jsx
│   │   ├── 📄 LayoutToggleButton.jsx
│   │   ├── 📄 Navbar.jsx
│   │   ├── 📄 Pagination.jsx
│   │   ├── 📄 Spinner.jsx
│   │   └── 📄 ToggleTheme.jsx
│   ├── 📁 contexts/
│   │   ├── 📄 AuthContext.jsx
│   │   └── 📄 AuthProvider.jsx
│   ├── 📁 firebase/
│   │   └── 📄 firebase.config.js
│   ├── 📁 hooks/
│   │   ├── 📄 useAuth.jsx
│   │   └── 📄 useAxiosSecure.jsx
│   ├── 📁 layouts/
│   │   └── 📄 MainLayout.jsx
│   ├── 📁 pages/
│   │   ├── 📄 About.jsx
│   │   ├── 📄 ContactUs.jsx
│   │   ├── 📄 CreateEvent.jsx
│   │   ├── 📄 Home.jsx
│   │   ├── 📄 JoinedEvents.jsx
│   │   ├── 📄 ManageEvents.jsx
│   │   ├── 📄 Register.jsx
│   │   ├── 📄 SignIn.jsx
│   │   ├── 📄 UpcomingEvents.jsx
│   │   └── 📄 ViewEvent.jsx
│   ├── 📁 routes/
│   │   ├── 📄 PrivateRoutes.jsx
│   │   └── 📄 router.jsx
│   ├── 📁 utils/
│   ├── 🎨 App.css
│   ├── 📄 App.jsx
│   ├── 🎨 index.css
│   └── 📄 main.jsx
├── 🔒 .env 🚫 (auto-hidden)
├── 📄 .firebaserc
├── 🚫 .gitignore 🚫 (auto-hidden)
├── 📖 README.md
├── 📄 eslint.config.js
├── 📄 firebase.json
├── 🌐 index.html
├── 📄 package-lock.json 🚫 (auto-hidden)
├── 📄 package.json
├── 📋 pglite-debug.log 🚫 (auto-hidden)
└── 📄 vite.config.js
```

---

## 🔒 Environment Variables

### Client (`.env`)
```
VITE_API_URL=
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
```

### Server (`.env`)
```
MONGODB_URI=
JWT_SECRET=
CLIENT_ORIGIN=
```

---

## 🧪 Extra Features

- Loading spinner for async actions
- Animated route transitions and cards
- System-aware theme toggle (light/dark)
- MongoDB-powered filtering and search
- Robust JWT-protected routes

---

## 📦 NPM Packages

### Client
- `firebase`
- `axios`
- `react-router-dom`
- `sweetalert2`
- `framer-motion`
- `react-datepicker`
- `jwt-decode`
- `tailwindcss`

### Server
- `express`
- `cors`
- `dotenv`
- `jsonwebtoken`
- `mongodb`

---

## 💡 Contribution & Commit Flow

- 15+ meaningful client commits
- 8+ meaningful server commits
- Descriptive commit messages
- Deployment tested for reloads, private routes, and CORS

---

## 🚀 Deployment

- Client: Firebase Hosting (with custom domain)
- Server: Vercel Hosting
- Seamless reloads and navigation (no 404/504 errors)
- JWT securely stored in localStorage and sent with API requests

---

## 👤 Author

**Md. Hedaet Shahriar Himon** – Student & Developer  
Driven by a passion for community, clean code, and accessible web experiences ✨

---
