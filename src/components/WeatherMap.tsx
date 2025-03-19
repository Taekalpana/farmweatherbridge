
import { FC, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FarmerLocation, getFarmingLocations } from '@/services/weatherService';
import { MapPin, Users } from 'lucide-react';

const WeatherMap: FC = () => {
  const [locations, setLocations] = useState<FarmerLocation[]>([]);
  const [hoveredLocation, setHoveredLocation] = useState<FarmerLocation | null>(null);
  
  useEffect(() => {
    // Fetch farming locations
    setLocations(getFarmingLocations());
  }, []);
  
  // Function to position dots on the "map"
  const positionDot = (lat: number, lon: number) => {
    // This is a simplified positioning logic
    // In a real app, you would use proper map coordinates
    const baseX = 28.6;  // Base latitude for Delhi
    const baseY = 77.2;  // Base longitude for Delhi
    
    const x = ((lat - baseX) * 1000) + 50; // Adjust scaling factor as needed
    const y = ((lon - baseY) * 1000) + 50; // Adjust scaling factor as needed
    
    return { x, y };
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="mr-2 h-5 w-5" />
          Farmer Distribution Map
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-[400px] bg-muted/30 rounded-md border overflow-hidden">
          {/* Simplified map background with a gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-weather-cloud-light to-weather-blue-light opacity-30"></div>
          
          {/* Add some decorative map features */}
          <div className="absolute top-1/2 left-1/4 w-1/2 h-[2px] bg-weather-blue-light opacity-40"></div>
          <div className="absolute top-1/4 left-1/2 w-[2px] h-1/2 bg-weather-blue-light opacity-40"></div>
          
          {/* Add location dots */}
          {locations.map((location, index) => {
            const { x, y } = positionDot(location.lat, location.lon);
            const isHovered = hoveredLocation?.name === location.name;
            
            return (
              <div
                key={index}
                className={`absolute rounded-full transition-all duration-300 flex items-center justify-center ${
                  isHovered ? 'bg-primary shadow-lg scale-110 z-10' : 'bg-primary/70'
                }`}
                style={{
                  left: `${y}%`,
                  top: `${x}%`,
                  width: `${Math.max(20, Math.min(40, location.farmers / 100))}px`,
                  height: `${Math.max(20, Math.min(40, location.farmers / 100))}px`,
                }}
                onMouseEnter={() => setHoveredLocation(location)}
                onMouseLeave={() => setHoveredLocation(null)}
              >
                {isHovered && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg p-2 text-xs animate-in fade-in scale-in">
                    <p className="font-bold">{location.name}</p>
                    <div className="flex items-center mt-1">
                      <Users className="h-3 w-3 mr-1" />
                      <span>{location.farmers} farmers</span>
                    </div>
                    <p className="mt-1 text-muted-foreground">
                      Click to see detailed forecast
                    </p>
                  </div>
                )}
              </div>
            );
          })}
          
          {/* Map legend */}
          <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 rounded-md shadow-md p-3 text-xs">
            <h4 className="font-semibold mb-2">Farmer Distribution</h4>
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 bg-primary/70 rounded-full"></div>
              <span>Farming community</span>
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <div className="h-4 w-4 bg-primary rounded-full"></div>
              <span>Large farming area</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          {locations.map((location, index) => (
            <Card key={index} className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm font-medium">{location.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{location.farmers} farmers</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherMap;
