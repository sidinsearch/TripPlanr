# TripPlanr API Integrations

This document provides an overview of the API integrations used in the private repository version of TripPlanr. The public repository uses mock data instead of these actual API integrations.

## Google Gemini API

The private repository integrates with Google's Gemini API to generate personalized travel itineraries.

### Implementation Details

```typescript
// From the private repository
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateItinerary(params: ItineraryParams): Promise<ItineraryResponse> {
  try {
    // Get the Gemini Pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Build a detailed prompt based on user preferences
    const prompt = buildPrompt(params);
    
    // Generate content using the Gemini API
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Process and format the response
    const formattedItinerary = formatItineraryResponse(text);
    
    return {
      success: true,
      data: formattedItinerary,
    };
  } catch (error) {
    console.error("Error generating itinerary:", error);
    return {
      success: false,
      error: "Failed to generate itinerary. Please try again."
    };
  }
}

// Helper function to build a detailed prompt for the Gemini API
function buildPrompt(params: ItineraryParams): string {
  const { destination, startDate, endDate, budget, tripStyles, transport, accommodation } = params;
  
  // Calculate trip duration
  const start = new Date(startDate);
  const end = new Date(endDate);
  const durationInDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  // Format dates for the prompt
  const formattedStartDate = start.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const formattedEndDate = end.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  // Build the prompt with detailed instructions
  return `
    Create a detailed ${durationInDays}-day travel itinerary for ${destination}.
    
    Trip Details:
    - Destination: ${destination}
    - Dates: ${formattedStartDate} to ${formattedEndDate} (${durationInDays} days)
    - Budget: ₹${budget.toLocaleString()}
    - Travel Style: ${tripStyles.join(', ')}
    - Transportation: ${transport.join(', ')}
    - Accommodation: ${accommodation}
    
    Please include:
    1. A brief introduction to ${destination}
    2. Day-by-day itinerary with:
       - Morning activities (8 AM - 12 PM)
       - Afternoon activities (12 PM - 5 PM)
       - Evening activities (5 PM - 10 PM)
       - For each activity, include:
         * Description
         * Location
         * Approximate cost in Indian Rupees (₹)
         * Duration
    3. Travel tips specific to ${destination}
    4. Estimated daily budget breakdown
    5. Must-visit attractions
    
    Format the response in Markdown.
  `;
}
```

## YouTube API

The private repository integrates with the YouTube API to fetch relevant travel videos for the selected destination.

### Implementation Details

```typescript
// From the private repository
import { google, youtube_v3 } from 'googleapis';

// Initialize the YouTube API client
const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY
});

export async function fetchTravelVideos(destination: string): Promise<VideoResponse> {
  try {
    // Search for travel videos related to the destination
    const response = await youtube.search.list({
      part: ['snippet'],
      q: `travel guide ${destination} tourism`,
      type: ['video'],
      maxResults: 6,
      videoEmbeddable: 'true',
      relevanceLanguage: 'en',
      videoDuration: 'medium'
    });
    
    if (!response.data.items || response.data.items.length === 0) {
      return {
        success: false,
        error: "No videos found for this destination."
      };
    }
    
    // Get video IDs for additional details
    const videoIds = response.data.items.map(item => item.id?.videoId).filter(Boolean) as string[];
    
    // Get additional video details
    const videoDetails = await youtube.videos.list({
      part: ['snippet', 'statistics', 'contentDetails'],
      id: videoIds
    });
    
    // Format the response
    const videos = videoDetails.data.items?.map(video => ({
      id: video.id as string,
      title: video.snippet?.title as string,
      description: video.snippet?.description as string,
      thumbnail: video.snippet?.thumbnails?.high?.url as string,
      url: `https://www.youtube.com/watch?v=${video.id}`,
      viewCount: parseInt(video.statistics?.viewCount as string),
      duration: formatDuration(video.contentDetails?.duration as string),
      channel: video.snippet?.channelTitle as string
    })) || [];
    
    return {
      success: true,
      videos
    };
  } catch (error) {
    console.error("Error fetching travel videos:", error);
    return {
      success: false,
      error: "Failed to fetch travel videos. Please try again."
    };
  }
}

// Helper function to format ISO 8601 duration to human-readable format
function formatDuration(isoDuration: string): string {
  const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  
  const hours = match?.[1] ? parseInt(match[1]) : 0;
  const minutes = match?.[2] ? parseInt(match[2]) : 0;
  const seconds = match?.[3] ? parseInt(match[3]) : 0;
  
  let result = '';
  if (hours > 0) result += `${hours}:`;
  result += `${minutes.toString().padStart(2, '0')}:`;
  result += seconds.toString().padStart(2, '0');
  
  return result;
}
```

## OpenTripMap API

The private repository integrates with the OpenTripMap API to fetch attractions and points of interest for the selected destination.

### Implementation Details

```typescript
// From the private repository
import axios from 'axios';

// Initialize the OpenTripMap API client
const openTripMapApi = axios.create({
  baseURL: 'https://api.opentripmap.com/0.1/en/places',
  params: {
    apikey: process.env.OPENTRIPMAP_API_KEY
  }
});

export async function fetchAttractions(destination: string): Promise<AttractionResponse> {
  try {
    // First, get the location coordinates
    const geoResponse = await openTripMapApi.get('/geoname', {
      params: {
        name: destination
      }
    });
    
    if (!geoResponse.data || !geoResponse.data.lat || !geoResponse.data.lon) {
      return {
        success: false,
        error: "Location not found."
      };
    }
    
    const { lat, lon } = geoResponse.data;
    
    // Then, get attractions around that location
    const attractionsResponse = await openTripMapApi.get('/radius', {
      params: {
        radius: 20000, // 20km radius
        lat,
        lon,
        rate: 3, // Minimum rating
        limit: 20,
        format: 'json'
      }
    });
    
    if (!attractionsResponse.data || attractionsResponse.data.length === 0) {
      return {
        success: false,
        error: "No attractions found for this destination."
      };
    }
    
    // Get detailed information for each attraction
    const attractionsWithDetails = await Promise.all(
      attractionsResponse.data.slice(0, 10).map(async (attraction: any) => {
        const detailsResponse = await openTripMapApi.get(`/xid/${attraction.xid}`);
        
        if (!detailsResponse.data) {
          return null;
        }
        
        const { name, kinds, address, preview, wikipedia_extracts, point } = detailsResponse.data;
        
        return {
          id: attraction.xid,
          name: name || attraction.name,
          description: wikipedia_extracts?.text || 'No description available.',
          address: formatAddress(address),
          categories: kinds.split(','),
          image: preview?.source,
          coordinates: {
            lat: point.lat,
            lon: point.lon
          },
          wikipediaUrl: detailsResponse.data.wikipedia,
          rating: attraction.rate
        };
      })
    );
    
    // Filter out null values and sort by rating
    const attractions = attractionsWithDetails
      .filter(Boolean)
      .sort((a, b) => b.rating - a.rating);
    
    return {
      success: true,
      attractions
    };
  } catch (error) {
    console.error("Error fetching attractions:", error);
    return {
      success: false,
      error: "Failed to fetch attractions. Please try again."
    };
  }
}

// Helper function to format address
function formatAddress(address: any): string {
  if (!address) return 'Address not available';
  
  const parts = [];
  if (address.road) parts.push(address.road);
  if (address.suburb) parts.push(address.suburb);
  if (address.city) parts.push(address.city);
  if (address.state) parts.push(address.state);
  if (address.country) parts.push(address.country);
  
  return parts.join(', ');
}
```

## Authentication (Firebase)

The private repository uses Firebase Authentication for user management.

### Implementation Details

```typescript
// From the private repository
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// User registration
export async function registerUser(email: string, password: string, displayName: string): Promise<AuthResponse> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update user profile
    await updateProfile(user, {
      displayName
    });
    
    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email,
      displayName,
      createdAt: new Date().toISOString(),
      preferences: {},
      savedItineraries: []
    });
    
    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      }
    };
  } catch (error: any) {
    console.error("Error registering user:", error);
    return {
      success: false,
      error: error.message
    };
  }
}

// User login
export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      }
    };
  } catch (error: any) {
    console.error("Error logging in:", error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Save itinerary
export async function saveItinerary(userId: string, itinerary: Itinerary): Promise<SaveResponse> {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      return {
        success: false,
        error: "User not found."
      };
    }
    
    const userData = userDoc.data();
    const savedItineraries = userData.savedItineraries || [];
    
    // Add new itinerary with unique ID
    const newItinerary = {
      ...itinerary,
      id: `itinerary-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    
    // Update user document
    await updateDoc(userRef, {
      savedItineraries: [...savedItineraries, newItinerary]
    });
    
    return {
      success: true,
      itineraryId: newItinerary.id
    };
  } catch (error: any) {
    console.error("Error saving itinerary:", error);
    return {
      success: false,
      error: error.message
    };
  }
}
```

## Note

These code snippets are simplified versions of the actual implementations in the private repository. The real implementations include additional features such as:

- Caching mechanisms for API responses
- Rate limiting and error handling
- Retry logic for failed API calls
- Detailed logging and monitoring
- Performance optimizations

For more information about the private repository, please contact the repository owner.

© 2024 TripPlanr. All rights reserved.