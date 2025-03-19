
import { FC, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  CloudSun,
  MessageSquare,
  Users,
  AlertCircle,
  Settings,
  Menu,
  X,
  User,
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const Navigation: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  const navItems: NavItem[] = [
    { 
      label: 'Dashboard', 
      path: '/dashboard', 
      icon: <LayoutDashboard className="mr-2 h-5 w-5" /> 
    },
    { 
      label: 'Weather', 
      path: '/', 
      icon: <CloudSun className="mr-2 h-5 w-5" /> 
    },
    { 
      label: 'Messaging', 
      path: '/messaging', 
      icon: <MessageSquare className="mr-2 h-5 w-5" /> 
    },
    { 
      label: 'Farmers', 
      path: '/farmers', 
      icon: <Users className="mr-2 h-5 w-5" /> 
    },
    { 
      label: 'Alerts', 
      path: '/alerts', 
      icon: <AlertCircle className="mr-2 h-5 w-5" /> 
    },
    { 
      label: 'Settings', 
      path: '/settings', 
      icon: <Settings className="mr-2 h-5 w-5" /> 
    },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  const renderMobileNav = () => (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-background p-6 shadow-lg animate-in slide-in-from-left">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <CloudSun className="h-8 w-8 text-primary mr-2" />
            <h2 className="text-xl font-display font-bold">WeatherBridge</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleMenu} className="rounded-full">
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={toggleMenu}
              className={({ isActive }) =>
                cn(
                  "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                )
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
        
        <div className="mt-auto pt-6">
          <div className="flex items-center px-3 py-2 rounded-lg bg-muted">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground mr-2">
              <User className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@weatherbridge.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDesktopNav = () => (
    <div className="fixed inset-y-0 left-0 w-64 bg-background border-r shadow-sm hidden lg:block">
      <div className="flex items-center h-16 px-6 border-b">
        <CloudSun className="h-6 w-6 text-primary mr-2" />
        <h2 className="text-xl font-display font-bold">WeatherBridge</h2>
      </div>
      
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>
      
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-center px-3 py-2 rounded-lg bg-muted">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground mr-2">
            <User className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-muted-foreground">admin@weatherbridge.com</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isMobile ? (
        <div className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b h-16 px-4 flex items-center justify-between">
          <div className="flex items-center">
            <CloudSun className="h-6 w-6 text-primary mr-2" />
            <h2 className="text-lg font-display font-bold">WeatherBridge</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleMenu} className="rounded-full">
            <Menu className="h-5 w-5" />
          </Button>
          {isOpen && renderMobileNav()}
        </div>
      ) : (
        renderDesktopNav()
      )}
    </>
  );
};

export default Navigation;
