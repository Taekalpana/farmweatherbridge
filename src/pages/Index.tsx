
import { FC } from 'react';
import Navigation from '@/components/Navigation';
import WeatherDashboard from '@/components/WeatherDashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import WeatherMap from '@/components/WeatherMap';
import WeatherIcon from '@/components/WeatherIcon';
import { Cloud, CloudSun, MessageSquare, ChevronRight } from 'lucide-react';

const Index: FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className={cn(
        "pt-8 pb-16",
        isMobile ? "px-4 pt-20" : "lg:pl-72 px-8"
      )}>
        <header className="mb-8 max-w-4xl animate-in fade-in slide-in-from-left">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Weather Dashboard</h1>
              <p className="mt-1 text-lg text-muted-foreground">
                Monitor weather conditions and send alerts to farmers
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <Link to="/dashboard">
                <Button variant="outline" className="flex items-center">
                  Go to Admin Dashboard
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </header>
        
        <div className="grid grid-cols-1 gap-8 mb-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-left">
            <Card className="bg-gradient-to-br from-primary to-primary-foreground/5 text-primary-foreground">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center font-medium">
                  <CloudSun className="mr-2 h-5 w-5" />
                  Weather Forecasting
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Accurate, real-time weather data for agricultural planning</p>
                <Link to="/">
                  <Button variant="secondary" size="sm" className="mt-2">
                    View Forecast
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-weather-blue-dark to-blue-700/5 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center font-medium">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Messaging System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Send critical weather alerts via SMS and WhatsApp</p>
                <Link to="/messaging">
                  <Button variant="secondary" size="sm" className="mt-2">
                    Send Messages
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-weather-earth-dark to-amber-700/5 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center font-medium">
                  <Cloud className="mr-2 h-5 w-5" />
                  Weather Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Early warnings for extreme weather conditions</p>
                <Link to="/alerts">
                  <Button variant="secondary" size="sm" className="mt-2">
                    View Alerts
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
          
          <section className="space-y-8 animate-in fade-in">
            <WeatherDashboard />
            
            <WeatherMap />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
