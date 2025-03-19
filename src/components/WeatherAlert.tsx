
import { FC } from 'react';
import { WeatherAlert as WeatherAlertType } from '@/services/weatherService';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface WeatherAlertProps {
  alert: WeatherAlertType;
  onSend?: () => void;
}

export const WeatherAlert: FC<WeatherAlertProps> = ({ alert, onSend }) => {
  const { severity, headline, desc, event, effective, expires } = alert;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case 'extreme':
      case 'severe':
        return <AlertTriangle className="h-5 w-5" />;
      case 'moderate':
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };
  
  const getAlertVariant = (severity: string) => {
    switch (severity) {
      case 'extreme':
      case 'severe':
        return 'destructive';
      case 'moderate':
        return 'default';
      default:
        return 'default';
    }
  };
  
  const getAlertClass = (severity: string) => {
    switch (severity) {
      case 'extreme':
      case 'severe':
        return 'border-l-4 border-l-destructive animate-pulse-slow';
      case 'moderate':
        return 'border-l-4 border-l-weather-alert-warning';
      default:
        return '';
    }
  };
  
  return (
    <Alert 
      variant={getAlertVariant(severity) as any}
      className={cn(
        "transition-all duration-300 animate-in fade-in", 
        getAlertClass(severity)
      )}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <AlertTitle className="flex items-center text-lg font-semibold mb-2">
            {getAlertIcon(severity)}
            <span className="ml-2">{headline || event}</span>
          </AlertTitle>
          <AlertDescription className="mt-1">
            <p className="text-sm mb-2">{desc}</p>
            <div className="flex flex-wrap text-xs text-muted-foreground gap-x-4 mt-2">
              <span>Effective: {formatDate(effective)}</span>
              <span>Expires: {formatDate(expires)}</span>
            </div>
          </AlertDescription>
        </div>
        
        {onSend && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onSend}
            className="shrink-0 mt-2 md:mt-0"
          >
            Send Alert
          </Button>
        )}
      </div>
    </Alert>
  );
};

export default WeatherAlert;
