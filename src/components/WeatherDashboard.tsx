
import { FC, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Compass,
  Clock,
  AlertCircle
} from 'lucide-react';
import { WeatherIcon } from './WeatherIcon';
import { WeatherData, ForecastDay, getFakeWeatherData, mapWeatherCodeToCondition } from '@/services/weatherService';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { WeatherAlert } from './WeatherAlert';
import { cn } from '@/lib/utils';

interface WeatherDashboardProps {
  locationName?: string;
}

const WeatherDashboard: FC<WeatherDashboardProps> = ({ 
  locationName = 'New Delhi'
}) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('today');

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const data = await getFakeWeatherData(locationName);
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [locationName]);

  const formatDateForDisplay = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const formatHourForDisplay = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const prepareForecastChartData = (forecast: ForecastDay[]) => {
    return forecast.map(day => ({
      date: formatDateForDisplay(day.date),
      max: day.day.maxtemp_c,
      min: day.day.mintemp_c,
      avg: day.day.avgtemp_c,
      rain: day.day.daily_chance_of_rain
    }));
  };

  const prepareHourlyChartData = (day: ForecastDay) => {
    return day.hour.map(hour => ({
      time: formatHourForDisplay(hour.time),
      temp: hour.temp_c,
      rain: hour.chance_of_rain
    }));
  };

  if (loading || !weatherData) {
    return (
      <div className="w-full h-full flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-48 bg-muted rounded-lg mb-4"></div>
          <div className="h-24 w-24 bg-muted rounded-full mb-4"></div>
          <div className="h-8 w-32 bg-muted rounded-lg"></div>
        </div>
      </div>
    );
  }

  const { current, location, forecast, alerts } = weatherData;
  const weatherCondition = mapWeatherCodeToCondition(current.condition.code);

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Current Weather Card */}
      <Card className="overflow-hidden">
        <div className={cn(
          "relative h-48 flex items-center justify-center",
          weatherCondition === 'clear-day' && "weather-gradient-blue",
          weatherCondition === 'clear-night' && "weather-gradient-night",
          weatherCondition === 'rain' || weatherCondition === 'thunderstorm' && "weather-gradient-storm",
          weatherCondition === 'partly-cloudy-day' && "bg-gradient-to-r from-blue-400 to-blue-300",
          weatherCondition === 'cloudy' && "bg-gradient-to-r from-gray-300 to-blue-200"
        )}>
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"></div>
          <div className="relative z-10 flex flex-col items-center text-white">
            <h2 className="text-3xl font-bold mb-2">{location.name}</h2>
            <p className="text-lg opacity-80 mb-4">{formatDateForDisplay(location.localtime)}</p>
            <div className="flex items-center">
              <WeatherIcon condition={weatherCondition} size={64} className="mr-4" />
              <div className="text-center">
                <span className="text-6xl font-bold">{Math.round(current.temp_c)}°</span>
                <p className="text-lg opacity-80 mt-1">{current.condition.text}</p>
              </div>
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center">
              <Thermometer className="h-5 w-5 mr-2 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Feels Like</p>
                <p className="font-medium">{current.feelslike_c}°C</p>
              </div>
            </div>
            <div className="flex items-center">
              <Droplets className="h-5 w-5 mr-2 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Humidity</p>
                <p className="font-medium">{current.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center">
              <Wind className="h-5 w-5 mr-2 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Wind</p>
                <p className="font-medium">{current.wind_kph} km/h</p>
              </div>
            </div>
            <div className="flex items-center">
              <Compass className="h-5 w-5 mr-2 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Direction</p>
                <p className="font-medium">{current.wind_dir}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weather Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <WeatherAlert key={index} alert={alert} />
          ))}
        </div>
      )}

      {/* Forecast Tabs */}
      <Tabs defaultValue="today" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="hourly">Hourly</TabsTrigger>
          <TabsTrigger value="5day">5-Day Forecast</TabsTrigger>
        </TabsList>
        
        <TabsContent value="today" className="animate-in fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Today's Forecast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {forecast[0].hour
                  .filter((_, i) => i % 6 === 0) // Show every 6 hours
                  .map((hour, index) => (
                    <div key={index} className="flex flex-col items-center p-2 rounded-lg hover:bg-muted transition-colors">
                      <p className="text-sm text-muted-foreground">{formatHourForDisplay(hour.time)}</p>
                      <WeatherIcon 
                        condition={mapWeatherCodeToCondition(hour.condition.code)} 
                        size={36} 
                        className="my-2" 
                      />
                      <p className="font-medium">{Math.round(hour.temp_c)}°C</p>
                      <div className="flex items-center mt-1">
                        <Droplets className="h-3 w-3 mr-1 text-weather-blue" />
                        <span className="text-xs">{hour.chance_of_rain}%</span>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="hourly" className="animate-in fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Hourly Forecast
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={prepareHourlyChartData(forecast[0])}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3498db" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3498db" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorRain" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="left" domain={['dataMin - 5', 'dataMax + 5']} />
                    <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Area 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="temp" 
                      name="Temperature (°C)"
                      stroke="#3498db" 
                      fillOpacity={1} 
                      fill="url(#colorTemp)" 
                    />
                    <Area 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="rain" 
                      name="Chance of Rain (%)"
                      stroke="#82ca9d" 
                      fillOpacity={1} 
                      fill="url(#colorRain)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="5day" className="animate-in fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                5-Day Forecast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                {forecast.map((day, index) => (
                  <div key={index} className="flex flex-col items-center p-3 rounded-lg hover:bg-muted transition-colors">
                    <p className="text-sm font-medium mb-1">{formatDateForDisplay(day.date)}</p>
                    <WeatherIcon 
                      condition={mapWeatherCodeToCondition(day.day.condition.code)} 
                      size={40}
                      className="my-2" 
                    />
                    <div className="flex items-center justify-between w-full mt-1">
                      <span className="font-medium text-sm">{Math.round(day.day.mintemp_c)}°</span>
                      <div className="w-16 h-1 mx-2 bg-muted rounded-full">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ 
                            width: `${((day.day.avgtemp_c - day.day.mintemp_c) / (day.day.maxtemp_c - day.day.mintemp_c)) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <span className="font-medium text-sm">{Math.round(day.day.maxtemp_c)}°</span>
                    </div>
                    <div className="flex items-center mt-2">
                      <Droplets className="h-3 w-3 mr-1 text-weather-blue" />
                      <span className="text-xs">{day.day.daily_chance_of_rain}%</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={prepareForecastChartData(forecast)}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="max" name="Max Temp (°C)" fill="#e74c3c" />
                    <Bar dataKey="min" name="Min Temp (°C)" fill="#3498db" />
                    <Bar dataKey="rain" name="Chance of Rain (%)" fill="#2ecc71" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Add this component since it was referenced but not defined
const Calendar: FC<{ className?: string }> = ({ className }) => {
  return <Clock className={className} />;
};

export default WeatherDashboard;
