import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { MapPin, Plane, Train, Bus, Car, Hotel, Home, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '../utils/cn';

// This is a simplified version of the form component
interface TripPlanFormProps {
  onSubmit: (data: any) => void;
  onBack?: () => void;
}

const TripPlanForm = ({ onSubmit, onBack }: TripPlanFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: '',
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    budget: [25000],
    tripStyles: [],
    transport: [],
    accommodation: '',
  });
  
  const tripStyleOptions = [
    { id: 'adventure', label: 'Adventure', emoji: '🏔️' },
    { id: 'luxury', label: 'Luxury', emoji: '✨' },
    { id: 'romantic', label: 'Romantic', emoji: '💕' },
    { id: 'family', label: 'Family', emoji: '👨‍👩‍👧‍👦' },
    { id: 'solo', label: 'Solo', emoji: '🎒' },
    { id: 'cultural', label: 'Cultural', emoji: '🏛️' },
    { id: 'beach', label: 'Beach', emoji: '🏖️' },
    { id: 'city', label: 'City', emoji: '🏙️' },
  ];

  const transportOptions = [
    { id: 'flight', label: 'Flight', icon: Plane },
    { id: 'train', label: 'Train', icon: Train },
    { id: 'bus', label: 'Bus', icon: Bus },
    { id: 'car', label: 'Car Rental', icon: Car },
  ];

  const accommodationOptions = [
    { id: 'hotel', label: 'Hotel', icon: Hotel, description: 'Full service with amenities' },
    { id: 'hostel', label: 'Hostel', icon: Home, description: 'Budget-friendly shared spaces' },
    { id: 'airbnb', label: 'Airbnb', icon: Home, description: 'Local homes and apartments' },
    { id: 'resort', label: 'Resort', icon: Hotel, description: 'All-inclusive luxury' },
  ];

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const toggleTripStyle = (styleId: string) => {
    setFormData(prev => ({
      ...prev,
      tripStyles: prev.tripStyles.includes(styleId)
        ? prev.tripStyles.filter(id => id !== styleId)
        : [...prev.tripStyles, styleId]
    }));
  };

  const toggleTransport = (transportId: string) => {
    setFormData(prev => ({
      ...prev,
      transport: prev.transport.includes(transportId)
        ? prev.transport.filter(id => id !== transportId)
        : [...prev.transport, transportId]
    }));
  };

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1: return <MapPin className="h-5 w-5" />;
      case 2: return <span className="text-lg">₹</span>;
      case 3: return <span className="text-lg">🏔️</span>;
      case 4: return <Plane className="h-5 w-5" />;
      case 5: return <Hotel className="h-5 w-5" />;
      default: return <span>{step}</span>;
    }
  };

  return (
    <section className="py-20 min-h-screen">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-blue-300 mr-2" />
            <span className="text-white text-sm font-medium">AI-Powered Itinerary Generator</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Plan Your Journey</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Tell us about your dream trip and we'll create the perfect itinerary for you
          </p>
        </div>

        <div className="max-w-2xl mx-auto" id="form-top">
          {/* Progress Indicator */}
          <div className="flex justify-between mb-10 relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 -translate-y-1/2 z-0"></div>
            
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className="z-10"
              >
                <div 
                  className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 shadow-lg",
                    step < currentStep
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                      : step === currentStep
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white ring-4 ring-white/20"
                        : "bg-white/10 backdrop-blur-sm text-white/60"
                  )}
                >
                  {step < currentStep ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    getStepIcon(step)
                  )}
                </div>
                <div className="text-sm text-center mt-3 font-medium text-white">
                  {step === 1 && "Destination"}
                  {step === 2 && "Budget"}
                  {step === 3 && "Style"}
                  {step === 4 && "Transport"}
                  {step === 5 && "Stay"}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-xl">
            {/* Step 1: Location & Dates */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">Where & When?</h3>
                
                <div>
                  <Label htmlFor="destination" className="flex items-center gap-2 mb-3 text-base text-white font-medium">
                    <MapPin size={18} className="text-blue-300" />
                    Destination
                  </Label>
                  <Input
                    id="destination"
                    placeholder="e.g., Goa, Kerala, Rajasthan..."
                    value={formData.destination}
                    onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="flex items-center gap-2 mb-3 text-base text-white font-medium">
                      Start Date
                    </Label>
                    <Input
                      type="date"
                      value={formData.startDate.toISOString().split('T')[0]}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        startDate: new Date(e.target.value) 
                      }))}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  
                  <div>
                    <Label className="flex items-center gap-2 mb-3 text-base text-white font-medium">
                      End Date
                    </Label>
                    <Input
                      type="date"
                      value={formData.endDate.toISOString().split('T')[0]}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        endDate: new Date(e.target.value) 
                      }))}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 2: Budget */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">What's Your Budget?</h3>
                
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <Label className="text-base text-white font-medium">Budget (₹)</Label>
                    <span className="text-white font-medium">₹{formData.budget[0].toLocaleString()}</span>
                  </div>
                  
                  <Slider
                    value={formData.budget}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}
                    min={5000}
                    max={200000}
                    step={1000}
                    className="my-6"
                  />
                  
                  <div className="flex justify-between text-sm text-white/60">
                    <span>Budget (₹5,000)</span>
                    <span>Luxury (₹200,000)</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 3: Trip Style */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">Choose Your Style</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {tripStyleOptions.map((style) => (
                    <div
                      key={style.id}
                      onClick={() => toggleTripStyle(style.id)}
                      className={cn(
                        "p-4 rounded-xl cursor-pointer transition-all duration-300 text-center",
                        formData.tripStyles.includes(style.id)
                          ? "bg-gradient-to-br from-blue-500/80 to-purple-600/80 shadow-lg"
                          : "bg-white/5 hover:bg-white/10"
                      )}
                    >
                      <div className="text-3xl mb-2">{style.emoji}</div>
                      <div className="font-medium text-white">{style.label}</div>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {formData.tripStyles.map((styleId) => {
                    const style = tripStyleOptions.find(s => s.id === styleId);
                    return (
                      <Badge key={styleId} className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 px-3 py-1">
                        {style?.emoji} {style?.label}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Step 4: Transport */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">How Will You Travel?</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {transportOptions.map((option) => (
                    <div
                      key={option.id}
                      onClick={() => toggleTransport(option.id)}
                      className={cn(
                        "p-4 rounded-xl cursor-pointer transition-all duration-300 flex items-center",
                        formData.transport.includes(option.id)
                          ? "bg-gradient-to-br from-blue-500/80 to-purple-600/80 shadow-lg"
                          : "bg-white/5 hover:bg-white/10"
                      )}
                    >
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-3">
                        <option.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="font-medium text-white">{option.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Step 5: Accommodation */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">Where Will You Stay?</h3>
                
                <div className="space-y-4">
                  {accommodationOptions.map((option) => (
                    <div
                      key={option.id}
                      onClick={() => setFormData(prev => ({ ...prev, accommodation: option.id }))}
                      className={cn(
                        "p-4 rounded-xl cursor-pointer transition-all duration-300 flex items-center",
                        formData.accommodation === option.id
                          ? "bg-gradient-to-br from-blue-500/80 to-purple-600/80 shadow-lg"
                          : "bg-white/5 hover:bg-white/10"
                      )}
                    >
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-3">
                        <option.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-white">{option.label}</div>
                        <div className="text-sm text-white/70">{option.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 ? (
                <Button 
                  onClick={prevStep}
                  variant="outline" 
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              ) : (
                <Button 
                  onClick={onBack}
                  variant="outline" 
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              )}
              
              {currentStep < 5 ? (
                <Button 
                  onClick={nextStep}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Generate Itinerary
                  <Sparkles className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TripPlanForm;