import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { MapPin } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8 relative">
          <div className="text-9xl font-bold text-white/10">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <MapPin className="h-16 w-16 text-blue-400" />
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Destination Not Found</h1>
        <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
          Looks like you've wandered off the map! The page you're looking for doesn't exist.
        </p>
        
        <Link to="/">
          <Button className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300">
            Return to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;