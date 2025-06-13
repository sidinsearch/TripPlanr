/**
 * TripPlanr - AI-powered travel itinerary generator
 * 
 * IMPORTANT: This is NOT open-source software. This code is provided as a demonstration
 * of the application structure only. The complete version with full functionality
 * is proprietary and not publicly available.
 * 
 * This file contains mock data generators that simulate the responses from the actual APIs.
 * In the original version, this data comes from Gemini API, YouTube API, and OpenTripMap API.
 * 
 * © 2024 TripPlanr. All rights reserved.
 */

// Mock data for the public version

export const generateMockItinerary = (destination: string, days: number, budget: number) => {
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
};

export const generateMockVideos = (destination: string) => {
  return [
    {
      id: 'video1',
      title: `Top 10 Places to Visit in ${destination}`,
      thumbnail: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=400&q=80',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
      id: 'video2',
      title: `${destination} Travel Guide 2024`,
      thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400&q=80',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
      id: 'video3',
      title: `Hidden Gems of ${destination}`,
      thumbnail: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=400&q=80',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    }
  ];
};

export const generateMockAttractions = (destination: string) => {
  return [
    {
      name: `${destination} Historical Museum`,
      description: `The ${destination} Historical Museum showcases the rich cultural heritage and history of the region through artifacts, photographs, and interactive exhibits.`,
      image: 'https://images.unsplash.com/photo-1582034986517-30d382307847?auto=format&fit=crop&w=400&q=80',
      address: `123 Museum Street, ${destination}`,
      categories: ['museums', 'cultural']
    },
    {
      name: `${destination} Central Park`,
      description: `A beautiful green space in the heart of ${destination}, perfect for relaxation, picnics, and outdoor activities.`,
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&q=80',
      address: `Central District, ${destination}`,
      categories: ['parks', 'nature']
    },
    {
      name: `${destination} Market`,
      description: `Experience local life at this vibrant market where you can find fresh produce, handicrafts, and street food.`,
      image: 'https://images.unsplash.com/photo-1513125370-3460ebe3401b?auto=format&fit=crop&w=400&q=80',
      address: `Market Street, ${destination}`,
      categories: ['markets', 'food']
    },
    {
      name: `${destination} Temple`,
      description: `An ancient temple with stunning architecture and spiritual significance.`,
      image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=400&q=80',
      address: `Temple Road, ${destination}`,
      categories: ['religion', 'architecture']
    },
    {
      name: `${destination} Beach`,
      description: `A pristine beach with crystal clear waters and golden sands, perfect for swimming and sunbathing.`,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
      address: `Coastal Area, ${destination}`,
      categories: ['beaches', 'nature']
    }
  ];
};