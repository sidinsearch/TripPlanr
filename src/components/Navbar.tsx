import { Plane } from 'lucide-react';
import { Button } from './ui/button';

const Navbar = () => {
  return (
    <header className="py-4 px-4 bg-black/20 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Plane className="h-6 w-6 text-blue-400" />
          <span className="text-xl font-bold text-white">TripPlanr</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-white/80 hover:text-white transition-colors">Home</a>
          <a href="#" className="text-white/80 hover:text-white transition-colors">Features</a>
          <a href="#" className="text-white/80 hover:text-white transition-colors">About</a>
          <a href="#" className="text-white/80 hover:text-white transition-colors">Contact</a>
        </nav>
        
        <div>
          <Button className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300">
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;