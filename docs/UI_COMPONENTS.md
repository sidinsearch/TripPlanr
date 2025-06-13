# TripPlanr UI Components

This document provides an overview of the UI components used in the private repository version of TripPlanr. The public repository contains simplified versions of these components.

## Component Architecture

The private repository follows a component-based architecture with a focus on reusability, accessibility, and performance. Components are organized into the following categories:

- **Core UI Components**: Basic building blocks like buttons, inputs, cards
- **Composite Components**: Combinations of core components for specific features
- **Page Components**: Full page layouts and containers
- **Layout Components**: Structural components like headers, footers, sidebars
- **Feature Components**: Components specific to certain features like itinerary generation

## Core UI Components

### Button Component

The Button component in the private repository includes multiple variants, sizes, and states:

```tsx
// From the private repository
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-md hover:shadow-lg",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-md px-10 text-base",
        icon: "h-10 w-10",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, isLoading, loadingText, leftIcon, rightIcon, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
        )}
        {!isLoading && leftIcon && (
          <span className="mr-2">{leftIcon}</span>
        )}
        {isLoading && loadingText ? loadingText : children}
        {!isLoading && rightIcon && (
          <span className="ml-2">{rightIcon}</span>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

### Card Component

The Card component in the private repository includes animations and interactive states:

```tsx
// From the private repository
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "border-border",
        outline: "border-2",
        ghost: "border-transparent bg-transparent shadow-none",
        glass: "border-white/20 bg-white/10 backdrop-blur-md",
        gradient: "border-none bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm",
      },
      hover: {
        default: "",
        lift: "transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
        glow: "transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]",
        border: "transition-all duration-300 hover:border-primary",
      },
    },
    defaultVariants: {
      variant: "default",
      hover: "default",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  animate?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, hover, animate, ...props }, ref) => {
    const Comp = animate ? motion.div : "div";
    
    return (
      <Comp
        ref={ref}
        className={cn(cardVariants({ variant, hover, className }))}
        {...(animate && {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3 }
        })}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & { as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" }
>(({ className, as: Comp = "h3", ...props }, ref) => (
  <Comp
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
```

## Feature Components

### ItineraryViewer Component

The ItineraryViewer component in the private repository includes interactive features like collapsible sections, sharing options, and printing functionality:

```tsx
// From the private repository
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Clock, 
  Copy, 
  Download, 
  Share2, 
  Printer, 
  ChevronDown, 
  ChevronUp,
  MapPin,
  DollarSign
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useReactToPrint } from 'react-to-print';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { formatCurrency } from '@/lib/utils';

interface ItineraryViewerProps {
  itinerary: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  budget: number;
  onShare?: () => void;
}

export function ItineraryViewer({
  itinerary,
  destination,
  startDate,
  endDate,
  budget,
  onShare
}: ItineraryViewerProps) {
  const [expandedDays, setExpandedDays] = useState<number[]>([1]);
  const [activeTab, setActiveTab] = useState('itinerary');
  const { toast } = useToast();
  const printRef = useRef<HTMLDivElement>(null);
  
  // Calculate trip duration
  const durationInDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  // Format dates
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Toggle day expansion
  const toggleDay = (dayNumber: number) => {
    setExpandedDays(prev => 
      prev.includes(dayNumber)
        ? prev.filter(d => d !== dayNumber)
        : [...prev, dayNumber]
    );
  };
  
  // Copy itinerary to clipboard
  const copyItinerary = () => {
    navigator.clipboard.writeText(itinerary);
    toast({
      title: "Copied to clipboard",
      description: "Your itinerary has been copied to the clipboard.",
      variant: "success"
    });
  };
  
  // Print itinerary
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `${destination} Itinerary`,
    onAfterPrint: () => {
      toast({
        title: "Print successful",
        description: "Your itinerary has been sent to the printer.",
        variant: "success"
      });
    }
  });
  
  // Download as PDF
  const downloadPDF = async () => {
    if (!printRef.current) return;
    
    toast({
      title: "Preparing PDF",
      description: "Your PDF is being generated...",
      variant: "default"
    });
    
    try {
      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        logging: false,
        useCORS: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 210;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`${destination}_Itinerary.pdf`);
      
      toast({
        title: "PDF downloaded",
        description: "Your itinerary has been downloaded as a PDF.",
        variant: "success"
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  // Extract day sections from markdown
  const extractDays = () => {
    const dayRegex = /## Day (\d+)/g;
    const days = [];
    let match;
    
    while ((match = dayRegex.exec(itinerary)) !== null) {
      days.push(parseInt(match[1]));
    }
    
    return days;
  };
  
  const days = extractDays();
  
  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={copyItinerary}
          leftIcon={<Copy className="h-4 w-4" />}
        >
          Copy
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handlePrint}
          leftIcon={<Printer className="h-4 w-4" />}
        >
          Print
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={downloadPDF}
          leftIcon={<Download className="h-4 w-4" />}
        >
          Download PDF
        </Button>
        {onShare && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onShare}
            leftIcon={<Share2 className="h-4 w-4" />}
          >
            Share
          </Button>
        )}
      </div>
      
      {/* Tabs */}
      <Tabs defaultValue="itinerary" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>
        
        {/* Itinerary Tab */}
        <TabsContent value="itinerary">
          <div ref={printRef} className="space-y-6 p-4">
            {/* Header for printing */}
            <div className="print-only mb-6">
              <h1 className="text-3xl font-bold">{destination} Travel Itinerary</h1>
              <div className="flex flex-wrap gap-4 mt-2 text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(startDate)} - {formatDate(endDate)}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {durationInDays} days
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  Budget: {formatCurrency(budget)}
                </div>
              </div>
            </div>
            
            {/* Introduction Section */}
            <Card>
              <CardHeader>
                <CardTitle>Introduction to {destination}</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                <ReactMarkdown>
                  {itinerary.split('## Day 1')[0]}
                </ReactMarkdown>
              </CardContent>
            </Card>
            
            {/* Day by Day Sections */}
            {days.map(day => {
              const isExpanded = expandedDays.includes(day);
              const dayContent = itinerary.split(`## Day ${day}`)[1]?.split(/## Day \d+|## Travel Tips/)[0];
              
              return (
                <Card key={day}>
                  <CardHeader 
                    className="cursor-pointer flex flex-row items-center justify-between"
                    onClick={() => toggleDay(day)}
                  >
                    <CardTitle>Day {day}</CardTitle>
                    <Button variant="ghost" size="icon">
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </Button>
                  </CardHeader>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                          <ReactMarkdown>{dayContent}</ReactMarkdown>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              );
            })}
            
            {/* Travel Tips Section */}
            <Card>
              <CardHeader>
                <CardTitle>Travel Tips for {destination}</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                <ReactMarkdown>
                  {itinerary.split('## Travel Tips')[1]}
                </ReactMarkdown>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Summary Tab */}
        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>Trip Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Destination</p>
                    <p className="text-lg">{destination}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Dates</p>
                    <p className="text-lg">{formatDate(startDate)} - {formatDate(endDate)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Duration</p>
                    <p className="text-lg">{durationInDays} days</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Budget</p>
                    <p className="text-lg">{formatCurrency(budget)}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Daily Overview</h3>
                <div className="space-y-2">
                  {days.map(day => (
                    <Button 
                      key={day}
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => {
                        setActiveTab('itinerary');
                        setExpandedDays(prev => 
                          prev.includes(day) ? prev : [...prev, day]
                        );
                        setTimeout(() => {
                          document.getElementById(`day-${day}`)?.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                          });
                        }, 100);
                      }}
                    >
                      <span className="mr-2">Day {day}</span>
                      <ChevronRight className="h-4 w-4 ml-auto" />
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
```

### AttractionMap Component

The AttractionMap component in the private repository uses Mapbox for interactive maps:

```tsx
// From the private repository
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, List, Map as MapIcon } from 'lucide-react';

// Set Mapbox access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN as string;

interface Attraction {
  id: string;
  name: string;
  description: string;
  address: string;
  coordinates: {
    lat: number;
    lon: number;
  };
  image?: string;
  categories: string[];
}

interface AttractionMapProps {
  attractions: Attraction[];
  destination: string;
  initialCoordinates?: [number, number];
}

export function AttractionMap({
  attractions,
  destination,
  initialCoordinates
}: AttractionMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [activeView, setActiveView] = useState<'map' | 'list'>('map');
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  
  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) return;
    
    // If we have attractions but no initial coordinates, use the first attraction
    let center: [number, number] = initialCoordinates || [0, 0];
    if (!initialCoordinates && attractions.length > 0) {
      const firstAttraction = attractions[0];
      center = [firstAttraction.coordinates.lon, firstAttraction.coordinates.lat];
    }
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center,
      zoom: 12
    });
    
    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    // Add markers for each attraction
    attractions.forEach(attraction => {
      const { lat, lon } = attraction.coordinates;
      
      // Create custom marker element
      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.innerHTML = `<div class="marker-pin"></div>`;
      el.style.cursor = 'pointer';
      
      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="popup-content">
          <h3 class="popup-title">${attraction.name}</h3>
          <p class="popup-address">${attraction.address}</p>
          ${attraction.image ? `<img src="${attraction.image}" alt="${attraction.name}" class="popup-image" />` : ''}
        </div>
      `);
      
      // Add marker to map
      new mapboxgl.Marker(el)
        .setLngLat([lon, lat])
        .setPopup(popup)
        .addTo(map.current!);
      
      // Add click event
      el.addEventListener('click', () => {
        setSelectedAttraction(attraction);
      });
    });
    
    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [attractions, initialCoordinates]);
  
  // Fly to attraction
  const flyToAttraction = (attraction: Attraction) => {
    if (!map.current) return;
    
    const { lat, lon } = attraction.coordinates;
    
    map.current.flyTo({
      center: [lon, lat],
      zoom: 15,
      essential: true,
      duration: 1000
    });
    
    setSelectedAttraction(attraction);
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <CardTitle>Attractions in {destination}</CardTitle>
          <div className="flex space-x-2">
            <Button
              variant={activeView === 'map' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveView('map')}
            >
              <MapIcon className="h-4 w-4 mr-1" />
              Map
            </Button>
            <Button
              variant={activeView === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveView('list')}
            >
              <List className="h-4 w-4 mr-1" />
              List
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 h-[500px]">
          {/* List View (always visible on desktop, toggleable on mobile) */}
          {(activeView === 'list' || window.innerWidth >= 768) && (
            <div className={`overflow-auto h-full ${window.innerWidth >= 768 ? 'border-r' : ''}`}>
              <div className="p-4 space-y-2">
                {attractions.map(attraction => (
                  <div
                    key={attraction.id}
                    className={`p-3 rounded-md cursor-pointer transition-colors ${
                      selectedAttraction?.id === attraction.id
                        ? 'bg-primary/10 border border-primary/30'
                        : 'hover:bg-accent'
                    }`}
                    onClick={() => {
                      flyToAttraction(attraction);
                      if (window.innerWidth < 768) {
                        setActiveView('map');
                      }
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium">{attraction.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {attraction.address}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {attraction.categories.slice(0, 2).map(category => (
                            <span
                              key={category}
                              className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Map View */}
          {(activeView === 'map' || window.innerWidth >= 768) && (
            <div className={`h-full ${window.innerWidth >= 768 ? 'col-span-2' : ''}`}>
              <div ref={mapContainer} className="h-full" />
            </div>
          )}
        </div>
        
        {/* Selected Attraction Details */}
        {selectedAttraction && (
          <div className="p-4 border-t">
            <div className="flex items-start space-x-4">
              {selectedAttraction.image && (
                <img
                  src={selectedAttraction.image}
                  alt={selectedAttraction.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
              )}
              <div className="flex-1">
                <h3 className="text-lg font-medium">{selectedAttraction.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{selectedAttraction.address}</p>
                <p className="text-sm line-clamp-3">{selectedAttraction.description}</p>
                <div className="mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      window.open(
                        `https://www.google.com/maps/dir/?api=1&destination=${selectedAttraction.coordinates.lat},${selectedAttraction.coordinates.lon}`,
                        '_blank'
                      );
                    }}
                  >
                    <Navigation className="h-4 w-4 mr-1" />
                    Directions
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
```

## Animation System

The private repository includes a comprehensive animation system using Framer Motion:

```tsx
// From the private repository
import { motion, AnimatePresence } from 'framer-motion';

// Fade In Animation
export const FadeIn = ({ children, delay = 0, duration = 0.5 }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration, delay }}
  >
    {children}
  </motion.div>
);

// Slide In Animation
export const SlideIn = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.5,
  distance = 20
}) => {
  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance }
  };
  
  const initial = directionMap[direction];
  
  return (
    <motion.div
      initial={{ ...initial, opacity: 0 }}
      animate={{ x: 0, y: 0, opacity: 1 }}
      exit={{ ...initial, opacity: 0 }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
};

// Staggered Children Animation
export const StaggerContainer = ({ 
  children, 
  delay = 0, 
  staggerDelay = 0.1,
  duration = 0.5
}) => (
  <motion.div
    initial="hidden"
    animate="visible"
    exit="hidden"
    variants={{
      visible: {
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: delay
        }
      }
    }}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ 
  children, 
  duration = 0.5,
  y = 20
}) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y },
      visible: { opacity: 1, y: 0, transition: { duration } }
    }}
  >
    {children}
  </motion.div>
);

// Page Transition
export const PageTransition = ({ children }) => (
  <AnimatePresence mode="wait">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);
```

## Theme System

The private repository includes a comprehensive theme system with dark mode support:

```tsx
// From the private repository
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'tripplanr-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;
    
    root.classList.remove('light', 'dark');
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';
      
      root.classList.add(systemTheme);
      return;
    }
    
    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  
  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');
  
  return context;
};
```

## Note

These code snippets are simplified versions of the actual implementations in the private repository. The real implementations include additional features such as:

- Comprehensive accessibility features
- Internationalization support
- Advanced state management
- Performance optimizations
- Comprehensive testing

For more information about the private repository, please contact the repository owner.

© 2024 TripPlanr. All rights reserved.