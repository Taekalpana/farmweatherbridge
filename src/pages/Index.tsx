
import { FC } from 'react';
import Navigation from '@/components/Navigation';
import WeatherDashboard from '@/components/WeatherDashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import WeatherMap from '@/components/WeatherMap';
import { Cloud, CloudSun, MessageSquare, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';

const Index: FC = () => {
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  
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
              <h1 className="text-4xl font-bold tracking-tight">{t('weather.dashboard')}</h1>
              <p className="mt-1 text-lg text-muted-foreground">
                {t('weather.monitoring')}
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <LanguageSelector />
              <Link to="/dashboard">
                <Button variant="outline" className="flex items-center">
                  {t('button.goToDashboard')}
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
                  {t('feature.forecasting')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{t('feature.forecasting.desc')}</p>
                <Link to="/">
                  <Button variant="secondary" size="sm" className="mt-2">
                    {t('button.viewForecast')}
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-weather-blue-dark to-blue-700/5 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center font-medium">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  {t('feature.messaging')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{t('feature.messaging.desc')}</p>
                <Link to="/messaging">
                  <Button variant="secondary" size="sm" className="mt-2">
                    {t('button.sendMessages')}
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-weather-earth-dark to-amber-700/5 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center font-medium">
                  <Cloud className="mr-2 h-5 w-5" />
                  {t('feature.alerts')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{t('feature.alerts.desc')}</p>
                <Link to="/alerts">
                  <Button variant="secondary" size="sm" className="mt-2">
                    {t('button.viewAlerts')}
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
