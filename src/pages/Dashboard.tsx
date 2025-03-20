
import { FC } from 'react';
import Navigation from '@/components/Navigation';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import UserManagement from '@/components/UserManagement';
import MessageCenter from '@/components/MessageCenter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';

const Dashboard: FC = () => {
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className={cn(
        "pt-8 pb-16",
        isMobile ? "px-4 pt-20" : "lg:pl-72 px-8"
      )}>
        <header className="mb-8 max-w-4xl animate-in fade-in slide-in-from-top">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">{t('admin.dashboard')}</h1>
              <p className="mt-1 text-lg text-muted-foreground">
                {t('admin.manage')}
              </p>
            </div>
            <div className="mt-2">
              <LanguageSelector />
            </div>
          </div>
        </header>
        
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="farmers" className="animate-in fade-in slide-in-from-bottom">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="farmers">{t('tabs.farmers')}</TabsTrigger>
              <TabsTrigger value="messaging">{t('tabs.messaging')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="farmers" className="animate-in fade-in">
              <UserManagement />
            </TabsContent>
            
            <TabsContent value="messaging" className="animate-in fade-in">
              <MessageCenter />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
