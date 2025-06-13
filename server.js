/**
 * TripPlanr - AI-powered travel itinerary generator
 * 
 * IMPORTANT: This is NOT open-source software. This code is provided as a demonstration
 * of the application structure only. The complete version with full functionality
 * is proprietary and not publicly available.
 * 
 * This is a simplified version of the server that uses mock data instead of actual API calls.
 * The original version integrates with Gemini API, YouTube API, and OpenTripMap API.
 * 
 * © 2024 TripPlanr. All rights reserved.
 */

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

const PORT = process.env.PORT || 3000;

// Simple mock API endpoint for itinerary
app.post('/api/itinerary', async (req, res) => {
  const { destination, startDate, endDate, budget } = req.body;
  
  // Calculate trip duration in days
  const start = new Date(startDate);
  const end = new Date(endDate);
  const durationInDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  
  // This is a simplified version that returns a mock response
  // In the full version, this would call the Gemini API
  const mockItinerary = generateMockItinerary(destination, durationInDays, budget);
  
  res.json({ message: mockItinerary });
});

// Mock data generator function
function generateMockItinerary(destination, days, budget) {
  return `# ${destination} Travel Itinerary

## Introduction
Welcome to ${destination}, a beautiful destination known for its rich culture, stunning landscapes, and vibrant atmosphere. This ${days}-day itinerary is designed to give you the perfect balance of popular attractions, local experiences, and relaxation within your budget of ₹${budget.toLocaleString()}.

${Array.from({ length: days }, (_, i) => `
## Day ${i + 1}

### Morning (8 AM - 12 PM)
- **8:00 AM - Breakfast**: Start your day with a delicious local breakfast at a popular café.
  - *Location*: City Center
  - *Cost*: ₹300

- **9:30 AM - Sightseeing**: Visit the main attractions in the morning when it's less crowded.
  - *Location*: Tourist District
  - *Cost*: ₹500 (entrance fees)

### Afternoon (12 PM - 5 PM)
- **12:30 PM - Lunch**: Enjoy authentic local cuisine at a recommended restaurant.
  - *Location*: Old Town
  - *Cost*: ₹600

- **2:00 PM - Cultural Experience**: Participate in a local workshop or visit museums.
  - *Location*: Cultural Quarter
  - *Cost*: ₹400

### Evening (5 PM - 10 PM)
- **5:30 PM - Sunset Views**: Find a scenic spot to watch the sunset.
  - *Location*: Viewpoint
  - *Cost*: Free

- **7:00 PM - Dinner**: Experience the local nightlife and cuisine.
  - *Location*: Entertainment District
  - *Cost*: ₹800
`).join('')}

## Travel Tips for ${destination}
1. **Local Transportation**: Use public transport to save money and experience local life.
2. **Weather**: Check the seasonal weather patterns before packing.
3. **Local Customs**: Respect local traditions and customs.
4. **Safety**: Keep your belongings secure and be aware of your surroundings.
5. **Language**: Learn a few basic phrases in the local language.

Enjoy your trip to ${destination}!`;
}

// Serve the React app for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});