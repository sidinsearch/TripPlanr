import { Button } from './ui/button';
import { MapPin, Calendar, CreditCard, Plane, Hotel, ArrowRight } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LandingPageProps {
  onStartPlanning: () => void;
}

const LandingPage = ({ onStartPlanning }: LandingPageProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center relative overflow-hidden py-20">
        {/* Background image with overlay */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=2000&q=80')`
          }}
        />
        
        {/* Animated particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="particle absolute rounded-full bg-white/20"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 15 + 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
            Plan Your Perfect Trip with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">TripPlanr</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-3xl mx-auto">
            Create personalized travel itineraries for your dream destinations in seconds
          </p>
          
          <Button 
            onClick={onStartPlanning}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-6 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Start Planning Your Trip
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <MapPin className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Discover Destinations</h3>
              <p className="text-white/70">
                Explore popular and hidden gem destinations around the world
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Calendar className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Personalized Itineraries</h3>
              <p className="text-white/70">
                Get day-by-day plans tailored to your preferences and travel style
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
              <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <CreditCard className="h-6 w-6 text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Budget Planning</h3>
              <p className="text-white/70">
                Plan your trip within your budget with cost estimates for activities
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Choose Destination</h3>
              <p className="text-white/70">
                Select where you want to go and when
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                <CreditCard className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Set Your Budget</h3>
              <p className="text-white/70">
                Tell us how much you want to spend
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                <Plane className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Choose Preferences</h3>
              <p className="text-white/70">
                Select your travel style and preferences
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                <Hotel className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Get Your Itinerary</h3>
              <p className="text-white/70">
                Receive a personalized travel plan
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              onClick={onStartPlanning}
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300"
            >
              Create Your Itinerary Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default LandingPage;