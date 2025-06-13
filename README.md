# TripPlanr 🌍✈️

<div align="center">
  <img src="https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1200&q=80" alt="TripPlanr Banner" width="800" />
  <br><br>
  
  <p>
    <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 18" />
    <img src="https://img.shields.io/badge/TypeScript-4.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Google_Gemini-AI-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Google Gemini" />
  </p>
  
  <h2>TripPlanr - AI-Powered Travel Itinerary Generator</h2>
  <p>Create personalized travel plans for your dream destinations in seconds</p>
  
  <p>
    <a href="#demo">View Demo</a> •
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#private-repository">Private Repository</a>
  </p>
</div>

## ⚠️ Important Notice

**This repository is NOT open-source software.** It is provided solely as a demonstration of the code structure and architecture of the TripPlanr application. The complete, functional version of this application is proprietary and not publicly available.

This repository contains simplified code snippets and mock implementations to illustrate the overall structure of the application. It does not include the full functionality, API integrations, or proprietary algorithms used in the actual TripPlanr application.

## 🎬 Demo

<div align="center">
  <video width="800" controls>
    <source src="./demo.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <p><i>Demo of the TripPlanr application showing the itinerary generation process</i></p>
</div>

### 🔗 Live Demo

Experience TripPlanr in action: [https://triplanr-hosted.onrender.com/](https://triplanr-hosted.onrender.com/)

## ✨ Features

TripPlanr leverages cutting-edge AI technology to create personalized travel itineraries based on your preferences:

<div align="center">
  <table>
    <tr>
      <td align="center">
        <h2>🤖</h2><br />
        <b>AI-Powered Itineraries</b>
      </td>
      <td align="center">
        <h2>💰</h2><br />
        <b>Budget Optimization</b>
      </td>
      <td align="center">
        <h2>🎯</h2><br />
        <b>Personalized Recommendations</b>
      </td>
    </tr>
  </table>
</div>

### 🎯 Key Features

- **AI-Powered Itineraries** 🤖: Generate detailed day-by-day travel plans using Google's Gemini AI
- **Destination Explorer** 🔍: Discover popular and hidden gem locations worldwide
- **Budget Optimization** 💰: Plan trips that fit your financial constraints
- **Travel Style Matching** 🧳: Customize itineraries based on your preferred travel style
- **Attraction Recommendations** 🏛️: Get personalized suggestions for must-visit places
- **Video Recommendations** 📹: Watch curated travel videos about your destination
- **Responsive Design** 📱: Seamless experience across desktop, tablet, and mobile devices
- **Interactive Maps** 🗺️: Visualize your journey with integrated maps

<div align="center">
  <h3>🧳 → 🗺️ → 📝 → ✈️</h3>
  <p><i>The multi-step form process for creating personalized itineraries</i></p>
</div>

## 🛠️ Tech Stack

TripPlanr is built with modern technologies for optimal performance and user experience:

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Vite** for fast development and building
- **React Router** for navigation
- **Custom UI Components** inspired by shadcn/ui
- **Framer Motion** for animations

### Backend
- **Node.js** with Express
- **API Integrations**:
  - Google Gemini API (AI)
  - YouTube API (Travel Videos)
  - OpenTripMap API (Attractions)

### Infrastructure
- **Vercel** for frontend hosting
- **Railway** for backend services
- **MongoDB Atlas** for database (private repo only)

<div align="center">
  <h3>📱 Frontend ↔️ 🖥️ Backend ↔️ 🤖 AI Services</h3>
  <p><i>High-level architecture of TripPlanr</i></p>
</div>

## 🚀 Getting Started

This repository contains a simplified version of TripPlanr for demonstration purposes. To run it locally:

```bash
# Clone the repository
git clone https://github.com/yourusername/TripPlanr.git
cd TripPlanr

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 📁 Project Structure

The project follows a modular architecture for maintainability and scalability:

```
tripplanr/
├── public/               # Static assets
├── src/
│   ├── components/       # React components
│   │   ├── ui/           # Reusable UI components
│   │   └── ...           # Feature-specific components
│   ├── pages/            # Page components
│   ├── services/         # API service layer (mocked)
│   ├── styles/           # Global styles
│   ├── utils/            # Utility functions
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Application entry point
├── server.js             # Simplified backend server
└── package.json          # Project dependencies
```

<div align="center">
  <h3>📂 → 📄 → 🧩 → 🚀</h3>
  <p><i>From code organization to production deployment</i></p>
</div>

## 🔒 Private Repository

The complete, fully-functional version of TripPlanr is maintained in a private repository. The private repository includes:

- **Full API Integrations**: Real connections to Gemini, YouTube, and OpenTripMap APIs
- **Authentication System**: Complete user registration and login functionality
- **Database Integration**: MongoDB for storing user data and itineraries
- **Advanced State Management**: Redux implementation with middleware
- **Comprehensive Testing**: Unit, integration, and end-to-end tests
- **CI/CD Pipeline**: Automated testing and deployment workflows
- **Production Optimizations**: Performance enhancements for production use

<div align="center">
  <h3>🔐 Authentication • 💾 Database • 🔄 State Management</h3>
  <p><i>Core components of the full application</i></p>
</div>

### Key Code Elements from Private Repository

```typescript
// Example of the Gemini API integration from the private repository
export async function generateItinerary(params: ItineraryParams): Promise<ItineraryResponse> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = buildPrompt(params);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return {
      success: true,
      data: text,
    };
  } catch (error) {
    console.error("Error generating itinerary:", error);
    return {
      success: false,
      error: "Failed to generate itinerary. Please try again."
    };
  }
}
```

For inquiries about access to the private repository or collaboration opportunities, please contact the repository owner.

## 🗺️ Roadmap

Future plans for TripPlanr include:

- **Mobile App**: Native mobile applications for iOS and Android
- **AI Enhancements**: More personalized recommendations based on user history
- **Social Features**: Community sharing and rating of itineraries
- **Booking Integration**: Direct booking of accommodations and activities
- **AR Features**: Augmented reality guides for destinations

<div align="center">
  <h3>📱 Mobile → 🤖 AI+ → 👥 Social → 🏨 Bookings → 🔍 AR</h3>
  <p><i>Future development roadmap</i></p>
</div>

## 📊 Analytics & Performance

The application includes comprehensive analytics and performance monitoring:

<div align="center">
  <h3>📈 Usage Stats • ⚡ Performance Metrics • 🔍 User Behavior</h3>
  <p><i>Key metrics tracked for continuous improvement</i></p>
</div>

## ⚖️ Legal Notice

All code and assets in this repository are provided for demonstration purposes only. Unauthorized use, reproduction, or distribution of this code for commercial purposes is strictly prohibited. All rights reserved.

<div align="center">
  <br><br>
  <p>
    <h2>✈️ 🌍 🧳</h2>
  </p>
  <h3>Made with ❤️ by Siddharth Shinde</h3>
  <p>© 2024 TripPlanr. All rights reserved.</p>
</div>