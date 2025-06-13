/**
 * TripPlanr - AI-powered travel itinerary generator
 * 
 * IMPORTANT: This is NOT open-source software. This code is provided as a demonstration
 * of the application structure only. The complete version with full functionality
 * is proprietary and not publicly available.
 * 
 * This is a simplified mock service that returns static data instead of making actual API calls.
 * The original version integrates with Gemini API, YouTube API, and OpenTripMap API.
 * 
 * © 2024 TripPlanr. All rights reserved.
 */

import axios from 'axios';
import { generateMockItinerary, generateMockVideos, generateMockAttractions } from '../utils/mockData';

// Create an axios instance
const api = axios.create();

// Set a timeout for API requests
api.defaults.timeout = 30000; // 30 seconds

interface TripData {
  destination: string;
  startDate: Date;
  endDate: Date;
  budget: number[];
  tripStyles: string[];
  transport: string[];
  accommodation: string;
}

// This is a simplified version that only uses mock data
export const generateItinerary = async (tripData: TripData) => {
  try {
    console.log('Generating itinerary for:', tripData);
    
    // Calculate trip duration in days
    const startDate = new Date(tripData.startDate);
    const endDate = new Date(tripData.endDate);
    const durationInDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    // In the public version, we'll only use mock data
    return {
      success: true,
      data: generateMockItinerary(tripData.destination, durationInDays, tripData.budget[0])
    };
  } catch (error) {
    console.error('Error generating itinerary:', error);
    
    // Calculate trip duration for fallback
    const startDate = new Date(tripData.startDate);
    const endDate = new Date(tripData.endDate);
    const durationInDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    return {
      success: true,
      data: generateMockItinerary(tripData.destination, durationInDays, tripData.budget[0])
    };
  }
};

export const fetchVideos = async (destination: string) => {
  try {
    console.log('Fetching videos for:', destination);
    
    // In the public version, we'll only use mock data
    return {
      success: true,
      videos: generateMockVideos(destination)
    };
  } catch (error) {
    console.error('Error fetching videos:', error);
    
    return {
      success: true,
      videos: generateMockVideos(destination)
    };
  }
};

export const fetchAttractions = async (destination: string) => {
  try {
    console.log('Fetching attractions for:', destination);
    
    // In the public version, we'll only use mock data
    return {
      success: true,
      attractions: generateMockAttractions(destination)
    };
  } catch (error) {
    console.error('Error fetching attractions:', error);
    
    return {
      success: true,
      attractions: generateMockAttractions(destination)
    };
  }
};