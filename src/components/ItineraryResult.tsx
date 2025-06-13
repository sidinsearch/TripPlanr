import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { MapPin, Clock, Copy, Download, ArrowLeft } from 'lucide-react';
import { generateItinerary, fetchVideos, fetchAttractions } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

// This is a simplified version of the ItineraryResult component
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="relative mb-10">
        <div className="w-36 h-36 border-4 border-white/20 rounded-full animate-spin-slow">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2 shadow-lg"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl animate-float">✈️</span>
        </div>
      </div>
      
      <h2 className="text-3xl font-bold mb-4 text-white">Crafting Your Perfect Itinerary</h2>
      <p className="text-white/70 text-lg">Our AI is planning your amazing journey...</p>
    </div>
  </div>
);

const ItineraryResult = ({ formData, onBack }: { formData: any; onBack: () => void }) => {
  const [loading, setLoading] = useState(true);
  const [itineraryText, setItineraryText] = useState<string>('');
  const [videos, setVideos] = useState<any[]>([]);
  const [attractions, setAttractions] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Generate itinerary
        const itineraryResult = await generateItinerary(formData);
        if (itineraryResult.success && itineraryResult.data) {
          setItineraryText(itineraryResult.data);
        }

        // Fetch videos and attractions in parallel
        const [videosResult, attractionsResult] = await Promise.allSettled([
          fetchVideos(formData.destination),
          fetchAttractions(formData.destination)
        ]);

        // Handle videos result
        if (videosResult.status === 'fulfilled' && videosResult.value.success) {
          setVideos(videosResult.value.videos);
        }

        // Handle attractions result
        if (attractionsResult.status === 'fulfilled' && attractionsResult.value.success) {
          setAttractions(attractionsResult.value.attractions);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [formData]);

  const copyItinerary = () => {
    navigator.clipboard.writeText(itineraryText);
    alert('Itinerary copied to clipboard');
  };

  const downloadPDF = () => {
    alert('PDF download feature will be available soon!');
  };

  if (loading) {
    return <LoadingScreen />;
  }

  // Calculate trip duration
  const startDate = new Date(formData.startDate);
  const endDate = new Date(formData.endDate);
  const durationInDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4 relative z-10">
        {/* Plan Another Trip Button */}
        <Button 
          variant="outline" 
          onClick={onBack} 
          className="mb-8 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300"
        >
          <ArrowLeft size={16} className="mr-2" />
          Plan Another Trip
        </Button>
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/90 to-emerald-600/90 backdrop-blur-sm rounded-full px-6 py-2.5 shadow-lg mb-6">
            <span className="text-white">✓</span>
            <span className="font-medium text-white">Itinerary Generated Successfully!</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">{formData.destination}</span> Adventure
          </h1>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="secondary" className="px-4 py-2.5 bg-white/15 backdrop-blur-sm border-none text-white hover:bg-white/25">
              <MapPin size={16} className="mr-2 text-blue-300" />
              {formData.destination}
            </Badge>
            <Badge variant="secondary" className="px-4 py-2.5 bg-white/15 backdrop-blur-sm border-none text-white hover:bg-white/25">
              <Clock size={16} className="mr-2 text-purple-300" />
              {durationInDays} Days, {durationInDays - 1} Nights
            </Badge>
            <Badge variant="secondary" className="px-4 py-2.5 bg-white/15 backdrop-blur-sm border-none text-white hover:bg-white/25">
              <span className="mr-2 text-pink-300">₹</span>
              {formData.budget[0].toLocaleString()}
            </Badge>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={copyItinerary} 
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300 py-6 px-6"
            >
              <Copy size={16} className="mr-2" />
              Copy Itinerary
            </Button>
            <Button 
              onClick={downloadPDF} 
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300 py-6 px-6"
            >
              <Download size={16} className="mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-10">
          {/* Itinerary Content */}
          <Card className="border-none shadow-xl bg-white/10 backdrop-blur-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardTitle className="text-2xl">Your Detailed Itinerary</CardTitle>
            </CardHeader>
            <CardContent className="p-8 prose prose-invert max-w-none">
              <ReactMarkdown>{itineraryText}</ReactMarkdown>
            </CardContent>
          </Card>

          {/* Attractions */}
          {attractions.length > 0 && (
            <Card className="border-none shadow-xl bg-white/10 backdrop-blur-md overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <CardTitle className="text-2xl">🏛️ Top Attractions</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {attractions.map((attraction, index) => (
                    <div key={index} className="flex space-x-4 p-4 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/20 transition-all duration-300">
                      {attraction.image && (
                        <div className="w-24 h-24 flex-shrink-0">
                          <img 
                            src={attraction.image} 
                            alt={attraction.name} 
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1 text-white">{attraction.name}</h4>
                        <p className="text-sm text-white/70 line-clamp-2 mb-2">
                          {attraction.description}
                        </p>
                        <div className="flex items-center text-xs text-white/60">
                          <MapPin size={12} className="mr-1 text-purple-300" />
                          {attraction.address}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* YouTube Videos */}
          {videos.length > 0 && (
            <Card className="border-none shadow-xl bg-white/10 backdrop-blur-md overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-pink-600 to-red-600 text-white">
                <CardTitle className="text-2xl">🎥 Helpful Travel Videos</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {videos.map((video, index) => (
                    <a 
                      key={index} 
                      href={video.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/20 transition-all duration-300"
                    >
                      <div className="relative aspect-video">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-red-600/90 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium text-white line-clamp-2">{video.title}</h4>
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItineraryResult;