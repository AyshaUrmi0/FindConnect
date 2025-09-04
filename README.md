# FindConnect 🔍

A modern, community-driven platform designed to help people find and recover lost items. Whether it's a misplaced phone, a stolen wallet, or a cherished family heirloom, FindConnect allows users to report lost items and connect with the community to recover them.

## 🌟 Live Demo

**Live URL**: [FindConnect](https://findconnect-45273.web.app/)

## 🎯 Purpose

FindConnect creates a community-driven platform where users can report lost items and help others recover their lost belongings. By sharing details and photos of lost and found items, the community can work together to reunite lost treasures with their rightful owners.

## ✨ Key Features

### 🔐 Authentication & User Management
- **Firebase Authentication**: Secure user registration and login
- **User Profiles**: Personalized user experience with profile management
- **Theme Support**: Light and dark theme with automatic preference detection

### 📱 Item Management
- **Report Lost Items**: Comprehensive form with image upload, location tracking, and detailed descriptions
- **Post Found Items**: Help others by posting found items with full details
- **Advanced Search**: Real-time search across titles, descriptions, locations, and categories
- **Smart Filtering**: Filter by category, status, and date
- **Sorting Options**: Sort by date, title, or location (ascending/descending)

### 🎨 Interactive Features
- **Like & Share**: Like items and share them with the community
- **View Tracking**: Track which items you've viewed
- **Status Badges**: Color-coded status indicators (Lost, Found, Returned)
- **Real-time Updates**: Live updates for item status changes

### 📊 Dashboard & Analytics
- **My Items**: Manage your posted items with edit and delete capabilities
- **Recovered Items**: Track successfully recovered items
- **Item Statistics**: View recovery rates and community statistics

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Interactive Cards**: Hover effects and micro-interactions
- **Loading States**: Beautiful loading animations and skeleton screens

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **DaisyUI**: Component library built on top of Tailwind CSS
- **Framer Motion**: Production-ready motion library for React
- **Lucide React**: Beautiful & consistent icon toolkit

### Authentication & Hosting
- **Firebase Authentication**: Secure user authentication
- **Firebase Hosting**: Fast and secure web hosting
- **Firebase CLI**: Command-line tools for deployment

### Additional Libraries
- **React Router DOM**: Client-side routing
- **React DatePicker**: Date selection component
- **SweetAlert2**: Beautiful alert dialogs
- **React Icons**: Icon library
- **Axios**: HTTP client for API calls

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/FindConnect.git
   cd FindConnect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project
   - Enable Authentication and Hosting
   - Update Firebase configuration in `src/firebase/firebase.init.js`

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Deploy to Firebase**
   ```bash
   firebase deploy
   ```

## 📁 Project Structure

```
FindConnect/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx      # Navigation component
│   │   └── Footer.jsx      # Footer component
│   ├── context/            # React context providers
│   │   └── Authcontext/    # Authentication context
│   ├── firebase/           # Firebase configuration
│   ├── hooks/              # Custom React hooks
│   ├── layouts/            # Layout components
│   ├── pages/              # Page components
│   │   ├── Auth/           # Authentication pages
│   │   ├── Home/           # Home page components
│   │   └── Items/          # Item management pages
│   └── router/             # Routing configuration
├── public/                 # Static assets
├── dist/                   # Production build
├── firebase.json           # Firebase configuration
├── .firebaserc            # Firebase project settings
└── package.json            # Dependencies and scripts
```

## 🎨 Features in Detail

### 🔍 Advanced Search & Filtering
- **Real-time Search**: Instant search results as you type
- **Multi-field Search**: Search across titles, descriptions, locations, and categories
- **Smart Filtering**: Filter by item status, category, and date range
- **Sorting Options**: Sort by date, title, or location with ascending/descending order

### 📱 Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Perfect layout on tablets
- **Desktop Experience**: Enhanced features on larger screens
- **Touch-Friendly**: Optimized touch targets for mobile

### 🌙 Theme System
- **Light Theme**: Clean, professional light mode
- **Dark Theme**: Easy on the eyes dark mode
- **Auto-Detection**: Automatically detects user's system preference
- **Persistent**: Remembers user's theme choice

### 🎭 Interactive Components
- **Animated Cards**: Smooth hover animations and transitions
- **Loading States**: Beautiful loading animations
- **Empty States**: Helpful messages when no data is available
- **Success Feedback**: Clear feedback for user actions

## 🔧 Backend Integration

FindConnect's backend is built using **Node.js, Express.js, and MongoDB**. It handles authentication, item management, and user interactions securely.

### Backend Features
- **JWT Authentication**: Secure user sessions with cookie-based tokens
- **RESTful APIs**: Clean API design for all operations
- **MongoDB Integration**: Efficient data storage and retrieval using MongoDB Atlas
- **CORS Support**: Cross-origin resource sharing enabled for multiple origins
- **Cookie Parser**: Secure cookie-based authentication
- **Error Handling**: Comprehensive error handling and validation
- **Environment Variables**: Secure configuration management

**Backend Repository**: [FindConnect-Server](https://github.com/AyshaUrmi0/FindConnect-Server)

### Backend Technology Stack
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB Atlas**: Cloud-based NoSQL database
- **JWT**: JSON Web Tokens for authentication
- **CORS**: Cross-Origin Resource Sharing middleware
- **Cookie Parser**: Cookie parsing middleware
- **Body Parser**: Request body parsing
- **Vercel**: Serverless deployment platform

## 📊 API Endpoints

### Authentication
- `POST /jwt` - Generate JWT token for user authentication
- `POST /logout` - Clear authentication token

### Items Management
- `GET /items` - Get latest 6 items (sorted by date)
- `GET /allItems` - Get all items
- `GET /items/:id` - Get specific item by ID
- `POST /addedItems` - Add new item (inserts into both collections)
- `PUT /addedItems/:id` - Update item
- `DELETE /addedItems/:id` - Delete item
- `GET /addedItems` - Get user's added items (requires authentication)
- `GET /addedItems/:id` - Get specific added item by ID

### Recovery Management
- `POST /recoveredItems` - Mark item as recovered
- `GET /recoveredItems` - Get recovered items by user email
- `PUT /recoveredItems/:id` - Update item status to recovered
- `PATCH /status/:id` - Update item status to recovered

### Database Collections
- **Items**: Main collection for all lost/found items
- **addedItems**: Collection for user-added items
- **allRecoveredItems**: Collection for recovered items

### Security Features
- **JWT Token Verification**: Middleware for protected routes
- **Cookie-based Authentication**: Secure token storage
- **CORS Configuration**: Multiple allowed origins
- **Environment Variables**: Secure credential management

## 🚀 Deployment

### Frontend Deployment (Firebase Hosting)
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login to Firebase: `firebase login`
3. Build the project: `npm run build`
4. Deploy: `firebase deploy`

### Backend Deployment (Vercel)
The backend is deployed on Vercel for serverless hosting:
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables

#### Frontend (.env)
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

#### Backend (Vercel Environment Variables)
```env
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
JWT_SECRET=your_jwt_secret_key
NODE_ENV=production
PORT=3000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request


## 👥 Done By

- **Aysha Ismail** - Full Stack Developer
- **GitHub**: [AyshaUrmi0](https://github.com/AyshaUrmi0)

## 🙏 Acknowledgments

- Firebase for authentication and hosting
- Tailwind CSS for the amazing utility-first framework
- DaisyUI for beautiful components
- Framer Motion for smooth animations
- Lucide for consistent icons




