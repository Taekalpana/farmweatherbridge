
import { WeatherCondition } from '@/components/WeatherIcon';

export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      code: number;
    };
    wind_kph: number;
    wind_dir: string;
    humidity: number;
    feelslike_c: number;
    feelslike_f: number;
    uv: number;
    pressure_mb: number;
    vis_km: number;
  };
  forecast: ForecastDay[];
  alerts: WeatherAlert[];
}

export interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    condition: {
      text: string;
      code: number;
    };
    daily_chance_of_rain: number;
    daily_chance_of_snow: number;
    totalsnow_cm: number;
    uv: number;
  };
  hour: HourForecast[];
}

export interface HourForecast {
  time: string;
  temp_c: number;
  condition: {
    text: string;
    code: number;
  };
  wind_kph: number;
  wind_dir: string;
  chance_of_rain: number;
  chance_of_snow: number;
  humidity: number;
  uv: number;
}

export interface WeatherAlert {
  headline: string;
  severity: 'minor' | 'moderate' | 'severe' | 'extreme';
  urgency: 'immediate' | 'expected' | 'future';
  areas: string;
  category: string;
  event: string;
  note: string;
  effective: string;
  expires: string;
  desc: string;
}

export interface FarmerLocation {
  name: string;
  lat: number;
  lon: number;
  farmers: number;
}

// This would be replaced with actual API calls to weather services
export const getFakeWeatherData = async (
  location: string = 'New Delhi'
): Promise<WeatherData> => {
  console.log(`Fetching weather data for ${location}`);
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return dummy data
  const currentDate = new Date();
  
  // Create a 5-day forecast
  const forecast: ForecastDay[] = Array.from({ length: 5 }).map((_, index) => {
    const forecastDate = new Date();
    forecastDate.setDate(currentDate.getDate() + index);
    
    // Generate random temperature values
    const maxTemp = Math.round(25 + Math.random() * 10);
    const minTemp = Math.round(maxTemp - 5 - Math.random() * 5);
    const avgTemp = Math.round((maxTemp + minTemp) / 2);
    
    // Generate random condition based on temperature
    const conditions = ['clear-day', 'partly-cloudy-day', 'cloudy', 'rain', 'thunderstorm'];
    const conditionIndex = Math.floor(Math.random() * conditions.length);
    const conditionText = conditions[conditionIndex].replace('-', ' ');
    
    return {
      date: forecastDate.toISOString().split('T')[0],
      day: {
        maxtemp_c: maxTemp,
        mintemp_c: minTemp,
        avgtemp_c: avgTemp,
        condition: {
          text: conditionText,
          code: conditionIndex * 100
        },
        daily_chance_of_rain: Math.round(Math.random() * 100),
        daily_chance_of_snow: Math.round(Math.random() * 10),
        totalsnow_cm: Math.random() * 1,
        uv: Math.round(Math.random() * 11)
      },
      hour: Array.from({ length: 24 }).map((_, hourIndex) => {
        const hourTemp = avgTemp + Math.sin((hourIndex - 12) / 24 * Math.PI) * 5;
        return {
          time: `${forecastDate.toISOString().split('T')[0]} ${hourIndex.toString().padStart(2, '0')}:00`,
          temp_c: Math.round(hourTemp * 10) / 10,
          condition: {
            text: conditionText,
            code: conditionIndex * 100
          },
          wind_kph: Math.round(5 + Math.random() * 15),
          wind_dir: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(Math.random() * 8)],
          chance_of_rain: Math.round(Math.random() * 100),
          chance_of_snow: Math.round(Math.random() * 10),
          humidity: Math.round(50 + Math.random() * 50),
          uv: Math.round(Math.random() * 11)
        };
      })
    };
  });
  
  // Generate a random weather alert for demonstration
  const alertTypes = [
    { headline: 'Heavy Rainfall Warning', severity: 'moderate', event: 'Flood', category: 'Met' },
    { headline: 'High Wind Advisory', severity: 'minor', event: 'Wind', category: 'Met' },
    { headline: 'Thunderstorm Warning', severity: 'severe', event: 'Thunderstorm', category: 'Met' },
    { headline: 'Extreme Heat Alert', severity: 'extreme', event: 'Heat', category: 'Met' }
  ];
  
  const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
  const alertStartDate = new Date();
  const alertEndDate = new Date();
  alertEndDate.setHours(alertEndDate.getHours() + 24);
  
  return {
    location: {
      name: location,
      region: 'Delhi',
      country: 'India',
      lat: 28.6139,
      lon: 77.2090,
      localtime: currentDate.toISOString()
    },
    current: {
      temp_c: 30,
      temp_f: 86,
      condition: {
        text: 'Sunny',
        code: 1000
      },
      wind_kph: 15,
      wind_dir: 'N',
      humidity: 65,
      feelslike_c: 32,
      feelslike_f: 89.6,
      uv: 6,
      pressure_mb: 1010,
      vis_km: 10
    },
    forecast,
    alerts: [{
      headline: randomAlert.headline,
      severity: randomAlert.severity as any,
      urgency: 'expected',
      areas: 'Delhi NCR',
      category: randomAlert.category,
      event: randomAlert.event,
      note: 'Take necessary precautions',
      effective: alertStartDate.toISOString(),
      expires: alertEndDate.toISOString(),
      desc: `${randomAlert.headline} for Delhi NCR area. ${randomAlert.event} expected to affect farming activities. Take necessary precautions to protect crops and livestock.`
    }]
  };
};

export const getFarmingLocations = (): FarmerLocation[] => {
  return [
    { name: 'North Delhi Farms', lat: 28.7, lon: 77.2, farmers: 1250 },
    { name: 'Western Agricultural Zone', lat: 28.6, lon: 77.0, farmers: 980 },
    { name: 'South Delhi Agricultural Belt', lat: 28.5, lon: 77.2, farmers: 1520 },
    { name: 'Eastern Farming Community', lat: 28.6, lon: 77.3, farmers: 870 },
    { name: 'Central Farming Cooperative', lat: 28.63, lon: 77.22, farmers: 1100 }
  ];
};

export const mapWeatherCodeToCondition = (code: number): WeatherCondition => {
  // This is a simplified mapping - in reality, would need more detailed mapping
  if (code === 1000) return 'clear-day';
  if (code === 1003) return 'partly-cloudy-day';
  if (code >= 1006 && code <= 1030) return 'cloudy';
  if (code >= 1063 && code <= 1072) return 'drizzle';
  if (code >= 1150 && code <= 1201) return 'rain';
  if (code >= 1204 && code <= 1237) return 'snow';
  if (code >= 1240 && code <= 1246) return 'rain';
  if (code >= 1273 && code <= 1282) return 'thunderstorm';
  return 'cloudy'; // default
};
