
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'english' | 'hindi' | 'kannada' | 'tamil' | 'telugu' | 'punjabi' | 'gujarati' | 'bengali';

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const defaultLanguage: Language = 'english';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations: Record<string, Record<Language, string>> = {
  // Common
  'weather.dashboard': {
    english: 'Weather Dashboard',
    hindi: 'मौसम डैशबोर्ड',
    kannada: 'ಹವಾಮಾನ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    tamil: 'வானிலை டாஷ்போர்டு',
    telugu: 'వాతావరణ డాష్‌బోర్డ్',
    punjabi: 'ਮੌਸਮ ਡੈਸ਼ਬੋਰਡ',
    gujarati: 'હવામાન ડેશબોર્ડ',
    bengali: 'আবহাওয়া ড্যাশবোর্ড'
  },
  'weather.monitoring': {
    english: 'Monitor weather conditions and send alerts to farmers',
    hindi: 'मौसम की स्थिति की निगरानी करें और किसानों को अलर्ट भेजें',
    kannada: 'ಹವಾಮಾನ ಪರಿಸ್ಥಿತಿಗಳನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ ಮತ್ತು ರೈತರಿಗೆ ಎಚ್ಚರಿಕೆಗಳನ್ನು ಕಳುಹಿಸಿ',
    tamil: 'வானிலை நிலைமைகளைக் கண்காணித்து விவசாயிகளுக்கு எச்சரிக்கைகளை அனுப்புங்கள்',
    telugu: 'వాతావరణ పరిస్థితులను పర్యవేక్షించండి మరియు రైతులకు హెచ్చరికలను పంపండి',
    punjabi: 'ਮੌਸਮ ਦੀ ਸਥਿਤੀ ਦੀ ਨਿਗਰਾਨੀ ਕਰੋ ਅਤੇ ਕਿਸਾਨਾਂ ਨੂੰ ਚੇਤਾਵਨੀਆਂ ਭੇਜੋ',
    gujarati: 'હવામાન સ્થિતિની દેખરેખ રાખો અને ખેડૂતોને એલર્ટ મોકલો',
    bengali: 'আবহাওয়ার অবস্থা পর্যবেক্ষণ করুন এবং কৃষকদের সতর্কতা পাঠান'
  },
  'admin.dashboard': {
    english: 'Admin Dashboard',
    hindi: 'एडमिन डैशबोर्ड',
    kannada: 'ಅಡ್ಮಿನ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    tamil: 'நிர்வாக டாஷ்போர்டு',
    telugu: 'అడ్మిన్ డాష్‌బోర్డ్',
    punjabi: 'ਐਡਮਿਨ ਡੈਸ਼ਬੋਰਡ',
    gujarati: 'એડમિન ડેશબોર્ડ',
    bengali: 'অ্যাডমিন ড্যাশবোর্ড'
  },
  'admin.manage': {
    english: 'Manage farmers and send weather alerts',
    hindi: 'किसानों का प्रबंधन करें और मौसम संबंधी अलर्ट भेजें',
    kannada: 'ರೈತರನ್ನು ನಿರ್ವಹಿಸಿ ಮತ್ತು ಹವಾಮಾನ ಎಚ್ಚರಿಕೆಗಳನ್ನು ಕಳುಹಿಸಿ',
    tamil: 'விவசாயிகளை நிர்வகித்து வானிலை எச்சரிக்கைகளை அனுப்புங்கள்',
    telugu: 'రైతులను నిర్వహించండి మరియు వాతావరణ హెచ్చరికలను పంపండి',
    punjabi: 'ਕਿਸਾਨਾਂ ਦਾ ਪ੍ਰਬੰਧਨ ਕਰੋ ਅਤੇ ਮੌਸਮ ਸੰਬੰਧੀ ਚੇਤਾਵਨੀਆਂ ਭੇਜੋ',
    gujarati: 'ખેડૂતોનું સંચાલન કરો અને હવામાન એલર્ટ મોકલો',
    bengali: 'কৃষকদের পরিচালনা করুন এবং আবহাওয়া সতর্কতা পাঠান'
  },
  // Navigation
  'nav.home': {
    english: 'Home',
    hindi: 'होम',
    kannada: 'ಮುಖಪುಟ',
    tamil: 'முகப்பு',
    telugu: 'హోమ్',
    punjabi: 'ਹੋਮ',
    gujarati: 'હોમ',
    bengali: 'হোম'
  },
  'nav.dashboard': {
    english: 'Dashboard',
    hindi: 'डैशबोर्ड',
    kannada: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    tamil: 'டாஷ்போர்டு',
    telugu: 'డాష్‌బోర్డ్',
    punjabi: 'ਡੈਸ਼ਬੋਰਡ',
    gujarati: 'ડેશબોર્ડ',
    bengali: 'ড্যাশবোর্ড'
  },
  'nav.messaging': {
    english: 'Messaging',
    hindi: 'मैसेजिंग',
    kannada: 'ಸಂದೇಶ ಕಳುಹಿಸುವಿಕೆ',
    tamil: 'செய்தி அனுப்புதல்',
    telugu: 'మెసేజింగ్',
    punjabi: 'ਮੈਸੇਜਿੰਗ',
    gujarati: 'મેસેજિંગ',
    bengali: 'বার্তা পাঠানো'
  },
  'nav.farmers': {
    english: 'Farmers',
    hindi: 'किसान',
    kannada: 'ರೈತರು',
    tamil: 'விவசாயிகள்',
    telugu: 'రైతులు',
    punjabi: 'ਕਿਸਾਨ',
    gujarati: 'ખેડૂતો',
    bengali: 'কৃষকরা'
  },
  'nav.alerts': {
    english: 'Alerts',
    hindi: 'अलर्ट',
    kannada: 'ಎಚ್ಚರಿಕೆಗಳು',
    tamil: 'எச்சரிக்கைகள்',
    telugu: 'హెచ్చరికలు',
    punjabi: 'ਚੇਤਾਵਨੀਆਂ',
    gujarati: 'એલર્ટ્સ',
    bengali: 'সতর্কতা'
  },
  'nav.settings': {
    english: 'Settings',
    hindi: 'सेटिंग्स',
    kannada: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    tamil: 'அமைப்புகள்',
    telugu: 'సెట్టింగులు',
    punjabi: 'ਸੈਟਿੰਗਜ਼',
    gujarati: 'સેટિંગ્સ',
    bengali: 'সেটিংস'
  },
  // Features
  'feature.forecasting': {
    english: 'Weather Forecasting',
    hindi: 'मौसम पूर्वानुमान',
    kannada: 'ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ',
    tamil: 'வானிலை முன்னறிவிப்பு',
    telugu: 'వాతావరణ సూచన',
    punjabi: 'ਮੌਸਮ ਦੀ ਭਵਿੱਖਬਾਣੀ',
    gujarati: 'હવામાન આગાહી',
    bengali: 'আবহাওয়া পূর্বাভাস'
  },
  'feature.forecasting.desc': {
    english: 'Accurate, real-time weather data for agricultural planning',
    hindi: 'कृषि योजना के लिए सटीक, रीयल-टाइम मौसम डेटा',
    kannada: 'ಕೃಷಿ ಯೋಜನೆಗಾಗಿ ನಿಖರವಾದ, ರಿಯಲ್-ಟೈಮ್ ಹವಾಮಾನ ಡೇಟಾ',
    tamil: 'வேளாண்மை திட்டமிடலுக்கான துல்லியமான, நிகழ்நேர வானிலை தரவு',
    telugu: 'వ్యవసాయ ప్రణాళిక కోసం ఖచ్చితమైన, రియల్-టైమ్ వాతావరణ డేటా',
    punjabi: 'ਖੇਤੀਬਾੜੀ ਯੋਜਨਾਬੰਦੀ ਲਈ ਸਹੀ, ਰੀਅਲ-ਟਾਈਮ ਮੌਸਮ ਡਾਟਾ',
    gujarati: 'કૃષિ આયોજન માટે ચોક્કસ, રીયલ-ટાઇમ હવામાન ડેટા',
    bengali: 'কৃষি পরিকল্পনার জন্য সঠিক, রিয়েল-টাইম আবহাওয়া ডেটা'
  },
  'feature.messaging': {
    english: 'Messaging System',
    hindi: 'मैसेजिंग सिस्टम',
    kannada: 'ಸಂದೇಶ ವ್ಯವಸ್ಥೆ',
    tamil: 'செய்தி அனுப்பும் அமைப்பு',
    telugu: 'మెసేజింగ్ సిస్టమ్',
    punjabi: 'ਮੈਸੇਜਿੰਗ ਸਿਸਟਮ',
    gujarati: 'મેસેજિંગ સિસ્ટમ',
    bengali: 'বার্তা পাঠানোর ব্যবস্থা'
  },
  'feature.messaging.desc': {
    english: 'Send critical weather alerts via SMS and WhatsApp',
    hindi: 'एसएमएस और व्हाट्सएप के माध्यम से महत्वपूर्ण मौसम अलर्ट भेजें',
    kannada: 'ಎಸ್‌ಎಂಎಸ್ ಮತ್ತು ವಾಟ್ಸಾಪ್ ಮೂಲಕ ಮಹತ್ವದ ಹವಾಮಾನ ಎಚ್ಚರಿಕೆಗಳನ್ನು ಕಳುಹಿಸಿ',
    tamil: 'SMS மற்றும் WhatsApp மூலம் முக்கியமான வானிலை எச்சரிக்கைகளை அனுப்பவும்',
    telugu: 'SMS మరియు WhatsApp ద్వారా క్లిష్టమైన వాతావరణ హెచ్చరికలను పంపండి',
    punjabi: 'SMS ਅਤੇ WhatsApp ਰਾਹੀਂ ਮਹੱਤਵਪੂਰਨ ਮੌਸਮ ਚੇਤਾਵਨੀਆਂ ਭੇਜੋ',
    gujarati: 'SMS અને WhatsApp દ્વારા મહત્વપૂર્ણ હવામાન એલર્ટ મોકલો',
    bengali: 'SMS এবং WhatsApp এর মাধ্যমে গুরুত্বপূর্ণ আবহাওয়া সতর্কতা পাঠান'
  },
  'feature.alerts': {
    english: 'Weather Alerts',
    hindi: 'मौसम अलर्ट',
    kannada: 'ಹವಾಮಾನ ಎಚ್ಚರಿಕೆಗಳು',
    tamil: 'வானிலை எச்சரிக்கைகள்',
    telugu: 'వాతావరణ హెచ్చరికలు',
    punjabi: 'ਮੌਸਮ ਚੇਤਾਵਨੀਆਂ',
    gujarati: 'હવામાન એલર્ટ',
    bengali: 'আবহাওয়া সতর্কতা'
  },
  'feature.alerts.desc': {
    english: 'Early warnings for extreme weather conditions',
    hindi: 'चरम मौसम की स्थिति के लिए प्रारंभिक चेतावनी',
    kannada: 'ತೀವ್ರ ಹವಾಮಾನ ಪರಿಸ್ಥಿತಿಗಳಿಗೆ ಮುಂಚಿತವಾಗಿ ಎಚ್ಚರಿಕೆಗಳು',
    tamil: 'தீவிர வானிலை நிலைமைகளுக்கான முன்கூட்டிய எச்சரிக்கைகள்',
    telugu: 'తీవ్ర వాతావరణ పరిస్థితుల కోసం ముందస్తు హెచ్చరికలు',
    punjabi: 'ਅਤਿ ਮੌਸਮੀ ਸਥਿਤੀਆਂ ਲਈ ਪਹਿਲਾਂ ਚੇਤਾਵਨੀਆਂ',
    gujarati: 'અત્યંત હવામાન પરિસ્થિતિઓ માટે વહેલી ચેતવણીઓ',
    bengali: 'চরম আবহাওয়া অবস্থার জন্য আগাম সতর্কতা'
  },
  // Buttons
  'button.viewForecast': {
    english: 'View Forecast',
    hindi: 'पूर्वानुमान देखें',
    kannada: 'ಮುನ್ಸೂಚನೆ ವೀಕ್ಷಿಸಿ',
    tamil: 'முன்னறிவிப்பைக் காண்க',
    telugu: 'ఫోర్‌కాస్ట్ చూడండి',
    punjabi: 'ਭਵਿੱਖਬਾਣੀ ਵੇਖੋ',
    gujarati: 'આગાહી જુઓ',
    bengali: 'পূর্বাভাস দেখুন'
  },
  'button.sendMessages': {
    english: 'Send Messages',
    hindi: 'संदेश भेजें',
    kannada: 'ಸಂದೇಶಗಳನ್ನು ಕಳುಹಿಸಿ',
    tamil: 'செய்திகளை அனுப்பு',
    telugu: 'సందేశాలను పంపండి',
    punjabi: 'ਸੁਨੇਹੇ ਭੇਜੋ',
    gujarati: 'સંદેશાઓ મોકલો',
    bengali: 'বার্তা পাঠান'
  },
  'button.viewAlerts': {
    english: 'View Alerts',
    hindi: 'अलर्ट देखें',
    kannada: 'ಎಚ್ಚರಿಕೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    tamil: 'எச்சரிக்கைகளைக் காண்க',
    telugu: 'హెచ్చరికలను చూడండి',
    punjabi: 'ਚੇਤਾਵਨੀਆਂ ਵੇਖੋ',
    gujarati: 'એલર્ટ્સ જુઓ',
    bengali: 'সতর্কতা দেখুন'
  },
  'button.goToDashboard': {
    english: 'Go to Admin Dashboard',
    hindi: 'एडमिन डैशबोर्ड पर जाएं',
    kannada: 'ಅಡ್ಮಿನ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹೋಗಿ',
    tamil: 'நிர்வாக டாஷ்போர்டுக்குச் செல்லுங்கள்',
    telugu: 'అడ్మిన్ డాష్‌బోర్డ్‌కి వెళ్లండి',
    punjabi: 'ਐਡਮਿਨ ਡੈਸ਼ਬੋਰਡ 'ਤੇ ਜਾਓ',
    gujarati: 'એડમિન ડેશબોર્ડ પર જાઓ',
    bengali: 'অ্যাডমিন ড্যাশবোর্ডে যান'
  },
  'button.sendAlert': {
    english: 'Send Alert',
    hindi: 'अलर्ट भेजें',
    kannada: 'ಎಚ್ಚರಿಕೆ ಕಳುಹಿಸಿ',
    tamil: 'எச்சரிக்கையை அனுப்பு',
    telugu: 'హెచ్చరికను పంపండి',
    punjabi: 'ਚੇਤਾਵਨੀ ਭੇਜੋ',
    gujarati: 'એલર્ટ મોકલો',
    bengali: 'সতর্কতা পাঠান'
  },
  // Tabs
  'tabs.farmers': {
    english: 'Farmer Management',
    hindi: 'किसान प्रबंधन',
    kannada: 'ರೈತ ನಿರ್ವಹಣೆ',
    tamil: 'விவசாயி மேலாண்மை',
    telugu: 'రైతు నిర్వహణ',
    punjabi: 'ਕਿਸਾਨ ਪ੍ਰਬੰਧਨ',
    gujarati: 'ખેડૂત વ્યવસ્થાપન',
    bengali: 'কৃষক পরিচালনা'
  },
  'tabs.messaging': {
    english: 'Message Center',
    hindi: 'संदेश केंद्र',
    kannada: 'ಸಂದೇಶ ಕೇಂದ್ರ',
    tamil: 'செய்தி மையம்',
    telugu: 'సందేశం కేంద్రం',
    punjabi: 'ਸੁਨੇਹਾ ਕੇਂਦਰ',
    gujarati: 'સંદેશ કેન્દ્ર',
    bengali: 'বার্তা কেন্দ্র'
  },
  // User management
  'user.totalFarmers': {
    english: 'Total Farmers',
    hindi: 'कुल किसान',
    kannada: 'ಒಟ್ಟು ರೈತರು',
    tamil: 'மொத்த விவசாயிகள்',
    telugu: 'మొత్తం రైతులు',
    punjabi: 'ਕੁੱਲ ਕਿਸਾਨ',
    gujarati: 'કુલ ખેડૂતો',
    bengali: 'মোট কৃষক'
  },
  'user.smartphoneUsers': {
    english: 'Smartphone Users',
    hindi: 'स्मार्टफोन उपयोगकर्ता',
    kannada: 'ಸ್ಮಾರ್ಟ್‌ಫೋನ್ ಬಳಕೆದಾರರು',
    tamil: 'ஸ்மார்ட்போன் பயனர்கள்',
    telugu: 'స్మార్ట్‌ఫోన్ వినియోగదారులు',
    punjabi: 'ਸਮਾਰਟਫੋਨ ਉਪਭੋਗਤਾ',
    gujarati: 'સ્માર્ટફોન વપરાશકર્તાઓ',
    bengali: 'স্মার্টফোন ব্যবহারকারী'
  },
  'user.basicPhoneUsers': {
    english: 'Basic Phone Users',
    hindi: 'बेसिक फोन उपयोगकर्ता',
    kannada: 'ಮೂಲ ಫೋನ್ ಬಳಕೆದಾರರು',
    tamil: 'அடிப்படை போன் பயனர்கள்',
    telugu: 'బేసిక్ ఫోన్ వినియోగదారులు',
    punjabi: 'ਬੇਸਿਕ ਫੋਨ ਉਪਭੋਗਤਾ',
    gujarati: 'બેઝિક ફોન વપરાશકર્તાઓ',
    bengali: 'বেসিক ফোন ব্যবহারকারী'
  },
  'user.ofTotal': {
    english: 'of total',
    hindi: 'कुल का',
    kannada: 'ಒಟ್ಟು',
    tamil: 'மொத்தத்தில்',
    telugu: 'మొత్తంలో',
    punjabi: 'ਕੁੱਲ ਦਾ',
    gujarati: 'કુલનું',
    bengali: 'মোটের'
  },
  'user.searchPlaceholder': {
    english: 'Search farmers by name, phone, or location...',
    hindi: 'नाम, फोन या स्थान से किसानों को खोजें...',
    kannada: 'ಹೆಸರು, ಫೋನ್ ಅಥವಾ ಸ್ಥಳದ ಮೂಲಕ ರೈತರನ್ನು ಹುಡುಕಿ...',
    tamil: 'பெயர், தொலைபேசி அல்லது இருப்பிடத்தால் விவசாயிகளைத் தேடுங்கள்...',
    telugu: 'పేరు, ఫోన్ లేదా స్థానం ద్వారా రైతులను శోధించండి...',
    punjabi: 'ਨਾਮ, ਫੋਨ ਜਾਂ ਸਥਾਨ ਦੁਆਰਾ ਕਿਸਾਨਾਂ ਦੀ ਖੋਜ ਕਰੋ...',
    gujarati: 'નામ, ફોન અથવા સ્થાન દ્વારા ખેડૂતોની શોધ કરો...',
    bengali: 'নাম, ফোন বা অবস্থান দ্বারা কৃষকদের অনুসন্ধান করুন...'
  },
  'user.allUsers': {
    english: 'All Users',
    hindi: 'सभी उपयोगकर्ता',
    kannada: 'ಎಲ್ಲಾ ಬಳಕೆದಾರರು',
    tamil: 'அனைத்து பயனர்களும்',
    telugu: 'అన్ని వినియోగదారులు',
    punjabi: 'ਸਾਰੇ ਉਪਭੋਗਤਾ',
    gujarati: 'બધા વપરાશકર્તાઓ',
    bengali: 'সমস্ত ব্যবহারকারী'
  },
  'user.noFarmersFound': {
    english: 'No farmers found matching your search.',
    hindi: 'आपकी खोज से मेल खाने वाले कोई किसान नहीं मिले।',
    kannada: 'ನಿಮ್ಮ ಹುಡುಕಾಟಕ್ಕೆ ಹೊಂದಿಕೆಯಾಗುವ ಯಾವುದೇ ರೈತರು ಕಂಡುಬಂದಿಲ್ಲ.',
    tamil: 'உங்கள் தேடலுடன் பொருந்தும் விவசாயிகள் எதுவும் இல்லை.',
    telugu: 'మీ శోధనకు సరిపోలే రైతులు ఎవరూ కనిపించలేదు.',
    punjabi: 'ਤੁਹਾਡੀ ਖੋਜ ਨਾਲ ਮੇਲ ਖਾਂਦੇ ਕੋਈ ਕਿਸਾਨ ਨਹੀਂ ਮਿਲੇ।',
    gujarati: 'તમારી શોધને અનુરૂપ કોઈ ખેડૂતો મળ્યા નથી.',
    bengali: 'আপনার অনুসন্ধানের সাথে মিলে এমন কোন কৃষক পাওয়া যায়নি।'
  },
  // Table columns
  'table.name': {
    english: 'Name',
    hindi: 'नाम',
    kannada: 'ಹೆಸರು',
    tamil: 'பெயர்',
    telugu: 'పేరు',
    punjabi: 'ਨਾਮ',
    gujarati: 'નામ',
    bengali: 'নাম'
  },
  'table.phone': {
    english: 'Phone',
    hindi: 'फोन',
    kannada: 'ಫೋನ್',
    tamil: 'தொலைபேசி',
    telugu: 'ఫోన్',
    punjabi: 'ਫੋਨ',
    gujarati: 'ફોન',
    bengali: 'ফোন'
  },
  'table.messageType': {
    english: 'Message Type',
    hindi: 'संदेश प्रकार',
    kannada: 'ಸಂದೇಶದ ಪ್ರಕಾರ',
    tamil: 'செய்தி வகை',
    telugu: 'సందేశం రకం',
    punjabi: 'ਸੁਨੇਹਾ ਕਿਸਮ',
    gujarati: 'સંદેશ પ્રકાર',
    bengali: 'বার্তার ধরন'
  },
  'table.location': {
    english: 'Location',
    hindi: 'स्थान',
    kannada: 'ಸ್ಥಳ',
    tamil: 'இருப்பிடம்',
    telugu: 'స్థానం',
    punjabi: 'ਸਥਾਨ',
    gujarati: 'સ્થળ',
    bengali: 'অবস্থান'
  },
  'table.crops': {
    english: 'Crops',
    hindi: 'फसलें',
    kannada: 'ಬೆಳೆಗಳು',
    tamil: 'பயிர்கள்',
    telugu: 'పంటలు',
    punjabi: 'ਫਸਲਾਂ',
    gujarati: 'પાકો',
    bengali: 'ফসল'
  },
  'table.lastContacted': {
    english: 'Last Contacted',
    hindi: 'अंतिम संपर्क',
    kannada: 'ಕೊನೆಯ ಸಂಪರ್ಕ',
    tamil: 'கடைசியாக தொடர்பு கொண்டது',
    telugu: 'చివరిగా సంప్రదించారు',
    punjabi: 'ਆਖਰੀ ਸੰਪਰਕ',
    gujarati: 'છેલ્લે સંપર્ક',
    bengali: 'শেষ যোগাযোগ'
  },
  // Time expressions
  'time.never': {
    english: 'Never',
    hindi: 'कभी नहीं',
    kannada: 'ಎಂದಿಗೂ ಇಲ್ಲ',
    tamil: 'ஒருபோதும் இல்லை',
    telugu: 'ఎప్పుడూ లేదు',
    punjabi: 'ਕਦੇ ਨਹੀਂ',
    gujarati: 'ક્યારેય નહીં',
    bengali: 'কখনই নয়'
  },
  'time.today': {
    english: 'Today',
    hindi: 'आज',
    kannada: 'ಇಂದು',
    tamil: 'இன்று',
    telugu: 'నేడు',
    punjabi: 'ਅੱਜ',
    gujarati: 'આજે',
    bengali: 'আজ'
  },
  'time.yesterday': {
    english: 'Yesterday',
    hindi: 'कल',
    kannada: 'ನಿನ್ನೆ',
    tamil: 'நேற்று',
    telugu: 'నిన్న',
    punjabi: 'ਕੱਲ',
    gujarati: 'ગઈકાલે',
    bengali: 'গতকাল'
  },
  'time.daysAgo': {
    english: 'days ago',
    hindi: 'दिन पहले',
    kannada: 'ದಿನಗಳ ಹಿಂದೆ',
    tamil: 'நாட்களுக்கு முன்பு',
    telugu: 'రోజుల క్రితం',
    punjabi: 'ਦਿਨ ਪਹਿਲਾਂ',
    gujarati: 'દિવસ પહેલા',
    bengali: 'দিন আগে'
  },
  // Language names for selector
  'language.english': {
    english: 'English',
    hindi: 'अंग्रेज़ी',
    kannada: 'ಇಂಗ್ಲಿಷ್',
    tamil: 'ஆங்கிலம்',
    telugu: 'ఇంగ్లీష్',
    punjabi: 'ਅੰਗਰੇਜ਼ੀ',
    gujarati: 'અંગ્રેજી',
    bengali: 'ইংরেজি'
  },
  'language.hindi': {
    english: 'Hindi',
    hindi: 'हिन्दी',
    kannada: 'ಹಿಂದಿ',
    tamil: 'இந்தி',
    telugu: 'హిందీ',
    punjabi: 'ਹਿੰਦੀ',
    gujarati: 'હિન્દી',
    bengali: 'হিন্দি'
  },
  'language.kannada': {
    english: 'Kannada',
    hindi: 'कन्नड़',
    kannada: 'ಕನ್ನಡ',
    tamil: 'கன்னடம்',
    telugu: 'కన్నడ',
    punjabi: 'ਕੰਨੜ',
    gujarati: 'કન્નડ',
    bengali: 'কন্নড়'
  },
  'language.tamil': {
    english: 'Tamil',
    hindi: 'तमिल',
    kannada: 'ತಮಿಳು',
    tamil: 'தமிழ்',
    telugu: 'తమిళం',
    punjabi: 'ਤਮਿਲ',
    gujarati: 'તમિલ',
    bengali: 'তামিল'
  },
  'language.telugu': {
    english: 'Telugu',
    hindi: 'तेलुगू',
    kannada: 'ತೆಲುಗು',
    tamil: 'தெலுங்கு',
    telugu: 'తెలుగు',
    punjabi: 'ਤੇਲਗੂ',
    gujarati: 'તેલુગુ',
    bengali: 'তেলুগু'
  },
  'language.punjabi': {
    english: 'Punjabi',
    hindi: 'पंजाबी',
    kannada: 'ಪಂಜಾಬಿ',
    tamil: 'பஞ்சாபி',
    telugu: 'పంజాబీ',
    punjabi: 'ਪੰਜਾਬੀ',
    gujarati: 'પંજાબી',
    bengali: 'পাঞ্জাবি'
  },
  'language.gujarati': {
    english: 'Gujarati',
    hindi: 'गुजराती',
    kannada: 'ಗುಜರಾತಿ',
    tamil: 'குஜராத்தி',
    telugu: 'గుజరాతీ',
    punjabi: 'ਗੁਜਰਾਤੀ',
    gujarati: 'ગુજરાતી',
    bengali: 'গুজরাটি'
  },
  'language.bengali': {
    english: 'Bengali',
    hindi: 'बंगाली',
    kannada: 'ಬಂಗಾಳಿ',
    tamil: 'பெங்காலி',
    telugu: 'బెంగాలీ',
    punjabi: 'ਬੰਗਾਲੀ',
    gujarati: 'બંગાળી',
    bengali: 'বাংলা'
  },
  'language.selectLanguage': {
    english: 'Select Language',
    hindi: 'भाषा चुनें',
    kannada: 'ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    tamil: 'மொழியைத் தேர்ந்தெடுக்கவும்',
    telugu: 'భాషను ఎంచుకోండి',
    punjabi: 'ਭਾਸ਼ਾ ਚੁਣੋ',
    gujarati: 'ભાષા પસંદ કરો',
    bengali: 'ভাষা নির্বাচন করুন'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    
    // Return English version as fallback
    if (translations[key] && translations[key].english) {
      return translations[key].english;
    }
    
    // If translation not found, return the key
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
