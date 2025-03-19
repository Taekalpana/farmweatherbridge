
export interface Farmer {
  id: string;
  name: string;
  phone: string;
  hasSmartphone: boolean;
  preferredLanguage: 'english' | 'hindi' | 'punjabi' | 'gujarati' | 'tamil' | 'telugu' | 'bengali';
  location: string;
  crops: string[];
  lastContactedAt: string | null;
}

export interface MessageTemplate {
  id: string;
  title: string;
  content: string;
  type: 'weather-alert' | 'forecast' | 'farming-tips';
  translations?: Record<string, string>;
}

export interface MessageResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

// Mock data for farmers
export const getFarmers = (): Farmer[] => {
  return [
    {
      id: '1',
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      hasSmartphone: true,
      preferredLanguage: 'hindi',
      location: 'North Delhi Farms',
      crops: ['wheat', 'rice'],
      lastContactedAt: '2023-08-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'Anita Singh',
      phone: '+91 87654 32109',
      hasSmartphone: false,
      preferredLanguage: 'hindi',
      location: 'Western Agricultural Zone',
      crops: ['cotton', 'sugarcane'],
      lastContactedAt: '2023-08-14T09:15:00Z'
    },
    {
      id: '3',
      name: 'Vijay Patel',
      phone: '+91 76543 21098',
      hasSmartphone: true,
      preferredLanguage: 'gujarati',
      location: 'South Delhi Agricultural Belt',
      crops: ['rice', 'vegetables'],
      lastContactedAt: '2023-08-13T16:45:00Z'
    },
    {
      id: '4',
      name: 'Meena Devi',
      phone: '+91 65432 10987',
      hasSmartphone: false,
      preferredLanguage: 'hindi',
      location: 'Eastern Farming Community',
      crops: ['wheat', 'barley'],
      lastContactedAt: null
    },
    {
      id: '5',
      name: 'Arjun Reddy',
      phone: '+91 54321 09876',
      hasSmartphone: true,
      preferredLanguage: 'telugu',
      location: 'Central Farming Cooperative',
      crops: ['vegetables', 'fruits'],
      lastContactedAt: '2023-08-12T11:20:00Z'
    },
    {
      id: '6',
      name: 'Lakshmi Prasad',
      phone: '+91 43210 98765',
      hasSmartphone: true,
      preferredLanguage: 'tamil',
      location: 'South Delhi Agricultural Belt',
      crops: ['rice', 'pulses'],
      lastContactedAt: '2023-08-11T14:10:00Z'
    },
    {
      id: '7',
      name: 'Mohan Das',
      phone: '+91 32109 87654',
      hasSmartphone: false,
      preferredLanguage: 'bengali',
      location: 'Eastern Farming Community',
      crops: ['jute', 'rice'],
      lastContactedAt: '2023-08-10T08:30:00Z'
    },
    {
      id: '8',
      name: 'Sanjay Mishra',
      phone: '+91 21098 76543',
      hasSmartphone: true,
      preferredLanguage: 'hindi',
      location: 'North Delhi Farms',
      crops: ['wheat', 'mustard'],
      lastContactedAt: '2023-08-09T17:05:00Z'
    }
  ];
};

// Mock data for message templates
export const getMessageTemplates = (): MessageTemplate[] => {
  return [
    {
      id: '1',
      title: 'Heavy Rain Alert',
      content: 'Heavy rainfall expected in {location} over the next 24 hours. Please secure your crops and ensure proper drainage.',
      type: 'weather-alert',
      translations: {
        hindi: 'अगले 24 घंटों में {location} में भारी वर्षा की उम्मीद है। कृपया अपनी फसलों को सुरक्षित करें और उचित जल निकासी सुनिश्चित करें।',
        punjabi: 'ਅਗਲੇ 24 ਘੰਟਿਆਂ ਵਿੱਚ {location} ਵਿੱਚ ਭਾਰੀ ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੀਆਂ ਫਸਲਾਂ ਨੂੰ ਸੁਰੱਖਿਅਤ ਕਰੋ ਅਤੇ ਉਚਿਤ ਜਲ ਨਿਕਾਸੀ ਯਕੀਨੀ ਬਣਾਓ।'
      }
    },
    {
      id: '2',
      title: 'Weekly Weather Forecast',
      content: 'Weather forecast for {location}: {forecast}. Plan your farming activities accordingly.',
      type: 'forecast',
      translations: {
        hindi: '{location} के लिए मौसम का पूर्वानुमान: {forecast}। अपनी कृषि गतिविधियों की योजना तदनुसार बनाएं।',
        tamil: '{location} க்கான வானிலை முன்னறிவிப்பு: {forecast}. உங்கள் விவசாய செயல்பாடுகளை அதற்கேற்ப திட்டமிடுங்கள்.'
      }
    },
    {
      id: '3',
      title: 'Heat Wave Warning',
      content: 'Heat wave conditions expected in {location} with temperatures reaching up to {temperature}°C. Ensure adequate water for crops and livestock.',
      type: 'weather-alert',
      translations: {
        hindi: '{location} में तापमान {temperature}°C तक पहुंचने के साथ गर्मी की लहर की स्थिति की उम्मीद है। फसलों और पशुधन के लिए पर्याप्त पानी सुनिश्चित करें।',
        gujarati: '{location} માં તાપમાન {temperature}°C સુધી પહોંચવાની અપેક્ષા સાથે ગરમીની લહેર સ્થિતિની અપેક્ષા છે. પાકો અને પશુધન માટે પૂરતું પાણી સુનિશ્ચિત કરો.'
      }
    },
    {
      id: '4',
      title: 'Seasonal Farming Tips',
      content: 'Farming tips for the {season} season: {tips}',
      type: 'farming-tips',
      translations: {
        hindi: '{season} मौसम के लिए खेती के टिप्स: {tips}',
        bengali: '{season} মৌসুমের জন্য কৃষি টিপস: {tips}'
      }
    }
  ];
};

// Mock function to send WhatsApp messages
export const sendWhatsAppMessage = async (
  farmer: Farmer,
  message: string
): Promise<MessageResponse> => {
  console.log(`Sending WhatsApp message to ${farmer.name} (${farmer.phone}): ${message}`);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate success with 95% probability
  const success = Math.random() > 0.05;
  
  if (success) {
    return {
      success: true,
      messageId: `wa_${Date.now()}_${farmer.id}`
    };
  } else {
    return {
      success: false,
      error: 'Failed to send WhatsApp message. The number may not be registered or there might be a network issue.'
    };
  }
};

// Mock function to send SMS messages
export const sendSMSMessage = async (
  farmer: Farmer,
  message: string
): Promise<MessageResponse> => {
  console.log(`Sending SMS to ${farmer.name} (${farmer.phone}): ${message}`);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate success with 90% probability
  const success = Math.random() > 0.1;
  
  if (success) {
    return {
      success: true,
      messageId: `sms_${Date.now()}_${farmer.id}`
    };
  } else {
    return {
      success: false,
      error: 'Failed to send SMS. The carrier might be experiencing issues or the number is invalid.'
    };
  }
};

// Translate message based on farmer's preferred language
export const translateMessage = (
  message: string,
  language: Farmer['preferredLanguage'],
  template?: MessageTemplate
): string => {
  if (template?.translations && template.translations[language]) {
    return template.translations[language];
  }
  
  // In a real application, we would integrate with a translation API
  // For this demo, we'll just return the original message
  return message;
};

// Send weather alert to multiple farmers
export const sendBulkAlerts = async (
  farmers: Farmer[],
  template: MessageTemplate,
  replacements: Record<string, string>
): Promise<Record<string, MessageResponse>> => {
  const results: Record<string, MessageResponse> = {};
  
  // Process message content with replacements
  let messageContent = template.content;
  Object.entries(replacements).forEach(([key, value]) => {
    messageContent = messageContent.replace(`{${key}}`, value);
  });
  
  // Send messages to each farmer based on their device type
  for (const farmer of farmers) {
    const translatedMessage = translateMessage(messageContent, farmer.preferredLanguage, template);
    
    if (farmer.hasSmartphone) {
      results[farmer.id] = await sendWhatsAppMessage(farmer, translatedMessage);
    } else {
      results[farmer.id] = await sendSMSMessage(farmer, translatedMessage);
    }
  }
  
  return results;
};
