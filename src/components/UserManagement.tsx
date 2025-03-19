
import { FC, useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Farmer, getFarmers } from '@/services/messagingService';
import { Smartphone, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const UserManagement: FC = () => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<'all' | 'smartphone' | 'basic'>('all');
  
  useEffect(() => {
    // Fetch farmer data
    setFarmers(getFarmers());
  }, []);
  
  const filteredFarmers = farmers.filter(farmer => {
    const matchesSearch = 
      farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.phone.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesView = 
      view === 'all' || 
      (view === 'smartphone' && farmer.hasSmartphone) || 
      (view === 'basic' && !farmer.hasSmartphone);
      
    return matchesSearch && matchesView;
  });
  
  const smartphoneUsers = farmers.filter(f => f.hasSmartphone).length;
  const basicPhoneUsers = farmers.filter(f => !f.hasSmartphone).length;
  
  const formatLastContacted = (dateString: string | null) => {
    if (!dateString) return 'Never';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else {
      return `${diffDays} days ago`;
    }
  };
  
  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Total Farmers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{farmers.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all regions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <Smartphone className="h-4 w-4 mr-2" />
              Smartphone Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{smartphoneUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round((smartphoneUsers / farmers.length) * 100)}% of total
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Basic Phone Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{basicPhoneUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round((basicPhoneUsers / farmers.length) * 100)}% of total
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <Input
          placeholder="Search farmers by name, phone, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        
        <Tabs defaultValue="all" value={view} onValueChange={(v) => setView(v as any)}>
          <TabsList>
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="smartphone">WhatsApp</TabsTrigger>
            <TabsTrigger value="basic">SMS</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Message Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Crops</TableHead>
              <TableHead>Last Contacted</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFarmers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No farmers found matching your search.
                </TableCell>
              </TableRow>
            ) : (
              filteredFarmers.map((farmer) => (
                <TableRow key={farmer.id} className="transition-colors hover:bg-muted/50">
                  <TableCell className="font-medium">{farmer.name}</TableCell>
                  <TableCell>{farmer.phone}</TableCell>
                  <TableCell>
                    {farmer.hasSmartphone ? (
                      <Badge variant="default" className="bg-green-600">WhatsApp</Badge>
                    ) : (
                      <Badge variant="outline">SMS</Badge>
                    )}
                  </TableCell>
                  <TableCell>{farmer.location}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {farmer.crops.map((crop, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {crop}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{formatLastContacted(farmer.lastContactedAt)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserManagement;
