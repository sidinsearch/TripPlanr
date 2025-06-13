import { useState } from 'react';
import LandingPage from '../components/LandingPage';
import TripPlanForm from '../components/TripPlanForm';
import ItineraryResult from '../components/ItineraryResult';

const HomePage = () => {
  const [formData, setFormData] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  
  const handleStartPlanning = () => {
    setShowForm(true);
  };
  
  const handleFormSubmit = (data: any) => {
    setFormData(data);
  };
  
  const handleBackToForm = () => {
    setFormData(null);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      {!showForm && !formData && (
        <LandingPage onStartPlanning={handleStartPlanning} />
      )}
      
      {showForm && !formData && (
        <TripPlanForm 
          onSubmit={handleFormSubmit} 
          onBack={() => setShowForm(false)} 
        />
      )}
      
      {formData && (
        <ItineraryResult 
          formData={formData} 
          onBack={handleBackToForm} 
        />
      )}
    </div>
  );
};

export default HomePage;