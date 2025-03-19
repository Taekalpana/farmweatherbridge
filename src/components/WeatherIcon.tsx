
import { FC } from 'react';
import { 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  CloudDrizzle, 
  Sunset, 
  Sunrise, 
  Sun, 
  Moon, 
  Wind, 
  CloudFog,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type WeatherCondition = 
  | 'clear-day' 
  | 'clear-night' 
  | 'partly-cloudy-day' 
  | 'partly-cloudy-night' 
  | 'cloudy' 
  | 'rain' 
  | 'thunderstorm' 
  | 'snow' 
  | 'fog' 
  | 'drizzle' 
  | 'wind' 
  | 'sunrise' 
  | 'sunset';

interface WeatherIconProps {
  condition: WeatherCondition;
  size?: number;
  className?: string;
  animated?: boolean;
}

export const WeatherIcon: FC<WeatherIconProps> = ({ 
  condition, 
  size = 24, 
  className,
  animated = true 
}) => {
  const baseClass = cn(
    'transition-all duration-300',
    animated && 'animate-float',
    className
  );

  switch (condition) {
    case 'clear-day':
      return <Sun size={size} className={cn(baseClass, 'text-yellow-500')} />;
    case 'clear-night':
      return <Moon size={size} className={cn(baseClass, 'text-blue-900')} />;
    case 'partly-cloudy-day':
      return (
        <div className="relative inline-block">
          <Sun size={size} className={cn(baseClass, 'text-yellow-500 absolute -top-1 -left-1')} />
          <Cloud size={size} className={cn(baseClass, 'text-gray-300 relative top-1 left-1')} />
        </div>
      );
    case 'partly-cloudy-night':
      return (
        <div className="relative inline-block">
          <Moon size={size} className={cn(baseClass, 'text-blue-900 absolute -top-1 -left-1')} />
          <Cloud size={size} className={cn(baseClass, 'text-gray-300 relative top-1 left-1')} />
        </div>
      );
    case 'cloudy':
      return <Cloud size={size} className={cn(baseClass, 'text-gray-400')} />;
    case 'rain':
      return <CloudRain size={size} className={cn(baseClass, 'text-blue-500')} />;
    case 'thunderstorm':
      return <CloudLightning size={size} className={cn(baseClass, 'text-purple-600')} />;
    case 'snow':
      return <CloudSnow size={size} className={cn(baseClass, 'text-blue-200')} />;
    case 'fog':
      return <CloudFog size={size} className={cn(baseClass, 'text-gray-400')} />;
    case 'drizzle':
      return <CloudDrizzle size={size} className={cn(baseClass, 'text-blue-400')} />;
    case 'wind':
      return <Wind size={size} className={cn(baseClass, 'text-gray-500')} />;
    case 'sunrise':
      return <Sunrise size={size} className={cn(baseClass, 'text-orange-400')} />;
    case 'sunset':
      return <Sunset size={size} className={cn(baseClass, 'text-orange-600')} />;
    default:
      return <Cloud size={size} className={baseClass} />;
  }
};

export default WeatherIcon;
