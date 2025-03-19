
import { FC, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Smartphone, MessageSquare, Send, Check, AlertCircle } from 'lucide-react';
import { 
  Farmer, 
  MessageTemplate, 
  getFarmers, 
  getMessageTemplates, 
  sendBulkAlerts 
} from '@/services/messagingService';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Define form schema
const formSchema = z.object({
  messageType: z.enum(['sms', 'whatsapp', 'both']),
  template: z.string(),
  customMessage: z.string().optional(),
  location: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const MessageCenter: FC = () => {
  const { toast } = useToast();
  const [farmers, setFarmers] = useState<Farmer[]>(getFarmers());
  const [templates, setTemplates] = useState<MessageTemplate[]>(getMessageTemplates());
  const [selectedTemplate, setSelectedTemplate] = useState<MessageTemplate | null>(null);
  const [sending, setSending] = useState(false);
  const [results, setResults] = useState<{success: number; failed: number} | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      messageType: 'both',
      template: '',
      customMessage: '',
    },
  });
  
  const watchMessageType = form.watch('messageType');
  const watchTemplate = form.watch('template');
  
  const onSubmit = async (values: FormValues) => {
    setSending(true);
    setResults(null);
    
    try {
      console.log('Sending message with values:', values);
      
      // Filter farmers based on message type
      let recipientFarmers = [...farmers];
      if (values.messageType === 'sms') {
        recipientFarmers = recipientFarmers.filter(f => !f.hasSmartphone);
      } else if (values.messageType === 'whatsapp') {
        recipientFarmers = recipientFarmers.filter(f => f.hasSmartphone);
      }
      
      // Filter by location if specified
      if (values.location) {
        recipientFarmers = recipientFarmers.filter(f => f.location === values.location);
      }
      
      // Get selected template or create a custom one
      const message = selectedTemplate || {
        id: 'custom',
        title: 'Custom Message',
        content: values.customMessage || '',
        type: 'forecast'
      };
      
      // Send the messages
      const sendResults = await sendBulkAlerts(recipientFarmers, message, {
        location: values.location || 'all regions',
        forecast: 'Clear skies with temperatures around 28°C',
        temperature: '38'
      });
      
      // Calculate results
      const successCount = Object.values(sendResults).filter(r => r.success).length;
      const failedCount = Object.values(sendResults).filter(r => !r.success).length;
      
      setResults({
        success: successCount,
        failed: failedCount
      });
      
      toast({
        title: "Messages sent",
        description: `Successfully sent ${successCount} messages. ${failedCount} failed.`,
        duration: 5000,
      });
    } catch (error) {
      console.error('Error sending messages:', error);
      toast({
        title: "Error",
        description: "There was a problem sending the messages.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setSending(false);
    }
  };
  
  const handleTemplateChange = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    setSelectedTemplate(template || null);
    form.setValue('template', templateId);
  };
  
  const getRecipientCount = () => {
    let count = farmers.length;
    const messageType = form.getValues('messageType');
    const location = form.getValues('location');
    
    if (messageType === 'sms') {
      count = farmers.filter(f => !f.hasSmartphone).length;
    } else if (messageType === 'whatsapp') {
      count = farmers.filter(f => f.hasSmartphone).length;
    }
    
    if (location) {
      count = farmers.filter(f => f.location === location && 
        (messageType === 'both' || 
        (messageType === 'sms' && !f.hasSmartphone) || 
        (messageType === 'whatsapp' && f.hasSmartphone))).length;
    }
    
    return count;
  };
  
  const uniqueLocations = Array.from(new Set(farmers.map(f => f.location)));
  
  return (
    <div className="space-y-6 animate-in fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Message Center</CardTitle>
          <CardDescription>
            Send weather updates, alerts, and farming tips to farmers via SMS or WhatsApp
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="message">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="message">New Message</TabsTrigger>
              <TabsTrigger value="sent">Results</TabsTrigger>
            </TabsList>
            
            <TabsContent value="message">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="messageType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message Type</FormLabel>
                        <RadioGroup 
                          className="flex space-x-4" 
                          {...field}
                          onValueChange={field.onChange}
                        >
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="both" />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">Both</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="whatsapp" />
                            </FormControl>
                            <FormLabel className="font-normal flex items-center cursor-pointer">
                              <Smartphone className="h-4 w-4 mr-1" />
                              WhatsApp
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="sms" />
                            </FormControl>
                            <FormLabel className="font-normal flex items-center cursor-pointer">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              SMS
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location (Optional)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="All locations" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="">All locations</SelectItem>
                            {uniqueLocations.map(location => (
                              <SelectItem key={location} value={location}>
                                {location}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="template"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message Template</FormLabel>
                        <Select onValueChange={handleTemplateChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a template or create custom message" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="">Custom message</SelectItem>
                            {templates.map(template => (
                              <SelectItem key={template.id} value={template.id}>
                                {template.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="customMessage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {selectedTemplate ? 'Template Preview' : 'Custom Message'}
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter your message here..."
                            className="min-h-[120px]"
                            {...field}
                            value={selectedTemplate ? selectedTemplate.content : field.value}
                            readOnly={!!selectedTemplate}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-sm">
                      Recipients: <span className="font-medium">{getRecipientCount()}</span>
                    </div>
                    <Button type="submit" disabled={sending}>
                      {sending ? (
                        <>Sending<span className="loading ml-2">...</span></>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </TabsContent>
            
            <TabsContent value="sent">
              {results ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          Successfully Sent
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-green-500">
                          {results.success}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium flex items-center">
                          <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                          Failed to Send
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-red-500">
                          {results.failed}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Button variant="outline" onClick={() => setResults(null)}>
                    Clear Results
                  </Button>
                </div>
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  <p>No recent message results to display.</p>
                  <p className="text-sm mt-2">Send a message to see delivery statistics.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessageCenter;
