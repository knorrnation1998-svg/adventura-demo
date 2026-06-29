'use client';
import React, { useState, useMemo, useEffect } from 'react';

// --- TYPE DEFINITIONS ---
interface Tour {
  id: number;
  title: string;
  location: string;
  duration: string;
  price: number;
  img: string;
  tag: string;
  slots: number;
  highlights: string[];
  perkPreview: string; 
}
interface MediaAsset {
  id: number;
  type: 'image' | 'video';
  title: string;
  location: string;
  src: string;
  thumbnail: string;
}
interface CustomerReview {
  id: number;
  name: string;
  role: string;
  comment: string;
  rating: number;
}
interface PassengerDetails {
  fullName: string;
  passportNumber: string;
  nationality: string;
  dob: string;
  mealPreference: string;
  specialAssistance: string;
}
interface FlightRecord {
  id: string;
  carrier: string;
  route: string;
  baseCost: number;
  markupPercent: number;
}
interface HotelRecord {
  id: string;
  property: string;
  baseCost: number;
  markupPercent: number;
}
interface AdminEmail {
  id: number;
  sender: string;
  subject: string;
  message: string;
  date: string;
  status: 'unread' | 'replied';
}

export default function AdventuraCoastalDemo() {
  // Global View Configurations
  const [currentTier, setCurrentTier] = useState<'tier2' | 'tier1'>('tier2');
  const [currency, setCurrency] = useState<'NGN' | 'USD' | 'GHS' | 'XOF'>('USD');
  const [viewMode, setViewMode] = useState<'visitor' | 'admin'>('visitor');

  // Enhancement States
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [compareList, setCompareList] = useState<Tour[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<number[]>([]);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<string | null>(null);

  // Layout 3: Flight Terminal States
  const [tripType, setTripType] = useState<'round-trip' | 'one-way'>('round-trip');
  const [flightSearch, setFlightSearch] = useState({
    from: 'Lagos (LOS)',
    to: 'Malé (MLE)',
    depart: '2026-07-15',
    return: '2026-07-22'
  });
  const [customDays, setCustomDays] = useState<number>(7);
  const [passengers, setPassengers] = useState<number>(1);

  // Dynamic Multi-Passenger Manifest State
  const [passengerManifest, setPassengerManifest] = useState<PassengerDetails[]>([]);

  // Synchronize Manifest Array Size with Passenger Count Input
  useEffect(() => {
    if (passengers > 1) {
      setPassengerManifest(prev => {
        const requiredCount = passengers - 1;
        if (prev.length === requiredCount) return prev;
        if (prev.length > requiredCount) return prev.slice(0, requiredCount);

        const additions = Array.from({ length: requiredCount - prev.length }, () => ({
          fullName: '',
          passportNumber: '',
          nationality: '',
          dob: '',
          mealPreference: 'Standard Luxury Lounge Platter',
          specialAssistance: 'None'
        }));
        return [...prev, ...additions];
      });
    } else {
      setPassengerManifest([]);
    }
  }, [passengers]);

  // Layout 5: Hotel Reservation States (Visitor Search Section)
  const [hotelSearch, setHotelSearch] = useState({
    destination: 'Maldives Luxury Pavilion',
    checkIn: '2026-07-15',
    checkOut: '2026-07-22',
    rooms: 1,
    tier: 'ultra-premium'
  });

  // Layout 10: Bespoke Trip Curator Core States
  const [curatedTrip, setCuratedTrip] = useState({
    destination: 'Maldives Private Atolls',
    transportMode: 'first-class',
    accommodationTier: 'overwater-villa',
    headcount: 2,
    timeframeDays: 10,
    targetBudgetUsd: 12000,
    departureDate: '2026-08-12'
  });

  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  
  // Exchange Clearing Rates
  const rates = { NGN: 1480, USD: 1, GHS: 14.5, XOF: 610 };

  // --- ADMIN & CMS STATE REGISTRIES ---
  const [flights, setFlights] = useState<FlightRecord[]>([
    { id: 'FL-902', carrier: 'Qatar Airways', route: 'LOS → MLE', baseCost: 1100, markupPercent: 15 },
    { id: 'FL-411', carrier: 'Emirates Air', route: 'ABV → DXB', baseCost: 950, markupPercent: 20 },
    { id: 'FL-703', carrier: 'British Airways', route: 'LOS → LHR', baseCost: 1400, markupPercent: 12 },
  ]);

  const [hotels, setHotels] = useState<HotelRecord[]>([
    { id: 'HT-101', property: 'Soneva Jani Overwater Private Pavilions', baseCost: 1800, markupPercent: 15 },
    { id: 'HT-204', property: 'The Ritz-Carlton Spa Maldives Atoll Resort', baseCost: 1500, markupPercent: 18 },
  ]);

  const [emails, setEmails] = useState<AdminEmail[]>([
    { id: 1, sender: 'luxurytraveler@gmail.com', subject: 'Private Jet Charter Manifest Request', message: 'Looking to schedule a bespoke package to the Maldives for 6 delegates. Please provide pricing tiers.', date: '2026-06-29', status: 'unread' },
    { id: 2, sender: 'corporate_perks@enterprise.ng', subject: 'Corporate Retreat Partnership Allocation', message: 'Can we get automated Drop-down list frameworks integrated for booking multi-passenger seats?', date: '2026-06-28', status: 'replied' }
  ]);

  const [newFlight, setNewFlight] = useState({ carrier: '', route: '', baseCost: 1000, markupPercent: 10 });
  const [newHotel, setNewHotel] = useState({ property: '', baseCost: 800, markupPercent: 10 });
  const [newTourItem, setNewTourItem] = useState({ title: '', location: '', duration: '', price: 1500, tag: 'Exclusive', slots: 4, highlights: '', perkPreview: '' });
  const [newMediaItem, setNewMediaItem] = useState({ type: 'image' as 'image' | 'video', title: '', location: '', src: '', thumbnail: '' });
  const [replyMessage, setReplyMessage] = useState<string>('');
  const [selectedEmailId, setSelectedEmailId] = useState<number | null>(null);

  // --- FULL 8 EXPEDITION SIGNATURE INVENTORY ---
  const [sampleTours, setSampleTours] = useState<Tour[]>([
    {
      id: 1,
      title: "East Africa Wild Safari & Conservation Tour",
      location: "Serengeti, Tanzania",
      duration: "6 Days",
      price: 1250,
      img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80",
      tag: "Trending",
      slots: 4,
      highlights: ["Luxury Tented Pavilions", "Private Game Drives"],
      perkPreview: "Includes complimentary 4x4 private game tracker & conservation donation match."
    },
    {
      id: 2,
      title: "Maldives Premium Water Villa Experience",
      location: "Maafushi, Maldives",
      duration: "5 Days",
      price: 2100,
      img: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=600&q=80",
      tag: "Luxury",
      slots: 1,
      highlights: ["Overwater Lagoon Villa", "Private Coral Snorkeling"],
      perkPreview: "Includes 24/7 dedicated overwater butler service and midnight lagoon access."
    },
    {
      id: 3,
      title: "Santorini Sunset & Private Yacht Cruise",
      location: "Oia, Greece",
      duration: "7 Days",
      price: 3400,
      img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80",
      tag: "Elite Choice",
      slots: 3,
      highlights: ["Caldera Sunset Sailing", "Clifftop Infinity Pools"],
      perkPreview: "Includes private catamaran dinner charter with select vintage wine tastings."
    },
    {
      id: 4,
      title: "Zanzibar Spice Island Wellness Resort Escape",
      location: "Zanzibar, Tanzania",
      duration: "5 Days",
      price: 1150,
      img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
      tag: "Wellness",
      slots: 8,
      highlights: ["Holistic Ayurvedic Care", "Private Beachfront Cabanas"],
      perkPreview: "Includes comprehensive premium daily yoga and wellness massage therapy rooms."
    },
    {
      id: 5,
      title: "Swiss Alps Luxury First Class Rail & Ski Escape",
      location: "Zermatt, Switzerland",
      duration: "8 Days",
      price: 4200,
      img: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=600&q=80",
      tag: "Winter Premium",
      slots: 2,
      highlights: ["Glacier Express Passes", "Five-Star Ski-In Chalets"],
      perkPreview: "Includes premium heated ski equipment gear and VIP terminal ski lodge passes."
    },
    {
      id: 6,
      title: "Ultra-Lux Private Atoll Hideaway Experience",
      location: "Baa Atoll, Maldives",
      duration: "10 Days",
      price: 6800,
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
      tag: "Sovereign Tier",
      slots: 2,
      highlights: ["Dedicated Private Butler", "Seaplane Transfers Included"],
      perkPreview: "Includes round-trip luxury private seaplane transfers directly to your villa stairs."
    },
    {
      id: 7,
      title: "Kyoto Heritage Villa & Tea Estate Excursion",
      location: "Kyoto, Japan",
      duration: "6 Days",
      price: 2950,
      img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80",
      tag: "Cultural Luxury",
      slots: 5,
      highlights: ["Authentic Kaiseki Dining", "Exclusive Shrine Access"],
      perkPreview: "Includes access to traditional tea ceremonies hosted by generational masters."
    },
    {
      id: 8,
      title: "Moroccan Desert Imperial Pavilion Oasis",
      location: "Marrakech, Morocco",
      duration: "7 Days",
      price: 1850,
      img: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=600&q=80",
      tag: "High Demand",
      slots: 6,
      highlights: ["Atlas Mountain Excursions", "Palatial Desert Glamping"],
      perkPreview: "Includes private astronomer guide for deep midnight Sahara desert observations."
    }
  ]);

  // --- PLATFORM GALLERY ASSETS ---
  const [mediaGallery, setMediaGallery] = useState<MediaAsset[]>([
    {
      id: 1,
      type: 'video',
      title: 'Our Zanzibar Island Excursion',
      location: 'Zanzibar, Tanzania',
      src: 'https://www.w3schools.com/html/mov_bbb.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 2,
      type: 'video',
      title: 'Private Jet In-Flight Cabin Experience',
      location: 'Malé Route, Maldives',
      src: 'https://www.w3schools.com/html/movie.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 3,
      type: 'video',
      title: 'Serengeti Dusk Game Drive Highlights',
      location: 'Serengeti National Park',
      src: 'https://www.w3schools.com/html/mov_bbb.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 4,
      type: 'image',
      title: 'Overwater Lagoon Deck Gathering',
      location: 'Baa Atoll, Maldives',
      src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=80',
      thumbnail: ''
    }
  ]);

  // --- CLIENT TESTIMONIALS ---
  const [customerReviews, setCustomerReviews] = useState<CustomerReview[]>([
    {
      id: 1,
      name: "Dr. Amara Anya",
      role: "Corporate Retreat Coordinator",
      comment: "The absolute pinnacle of effortless logistics. The customized duration option allowed our board of directors to prolong their retreat session seamlessly.",
      rating: 5
    },
    {
      id: 2,
      name: "Kofi Mensah",
      role: "Bespoke Enterprise Client",
      comment: "Settling invoices natively in local regional denominations instead of jumping through foreign exchange loops completely redefines booking ease.",
      rating: 5
    },
    {
      id: 3,
      name: "Abdoulaye Diop",
      role: "Private Delegate Traveler",
      comment: "Flew private directly via their custom planning module. Real-time cost updates vs my target budget ceilings made approval instantaneous.",
      rating: 5
    }
  ]);

  const formatPrice = (baseUsd: number) => {
    if (currency === 'NGN') return '₦' + (baseUsd * rates.NGN).toLocaleString(undefined, { maximumFractionDigits: 0 });
    if (currency === 'GHS') return '₵' + (baseUsd * rates.GHS).toLocaleString(undefined, { maximumFractionDigits: 0 });
    if (currency === 'XOF') return 'CFA ' + (baseUsd * rates.XOF).toLocaleString(undefined, { maximumFractionDigits: 0 });
    return '$' + baseUsd.toLocaleString();
  };

  // Bespoke Calculation Engine Logic
  const calculatedCuratedEstimate = useMemo(() => {
    let baseTransitCost = curatedTrip.transportMode === 'private-jet' ? 4500 : curatedTrip.transportMode === 'first-class' ? 1500 : 400;
    let baseLodgingCostPerNight = curatedTrip.accommodationTier === 'presidential-suite' ? 1200 : curatedTrip.accommodationTier === 'overwater-villa' ? 850 : 350;
    return (baseTransitCost * curatedTrip.headcount) + (baseLodgingCostPerNight * curatedTrip.timeframeDays);
  }, [curatedTrip.transportMode, curatedTrip.accommodationTier, curatedTrip.headcount, curatedTrip.timeframeDays]);

  // Automated Budget Overflow Sentinel Trigger
  useEffect(() => {
    if (calculatedCuratedEstimate > curatedTrip.targetBudgetUsd) {
      setIsChatOpen(true);
    }
  }, [calculatedCuratedEstimate, curatedTrip.targetBudgetUsd]);

  // Bespoke Curator Progress Indicator Evaluation
  const curatorProgressScore = useMemo(() => {
    let points = 0;
    if (curatedTrip.destination.trim().length > 3) points += 20;
    if (curatedTrip.transportMode) points += 20;
    if (curatedTrip.accommodationTier) points += 20;
    if (curatedTrip.timeframeDays > 0) points += 20;
    if (curatedTrip.targetBudgetUsd > 0) points += 20;
    return points;
  }, [curatedTrip]);

  // Load Tracker for local storage items
  useEffect(() => {
    const savedFavorites = localStorage.getItem('adventura_wishlist');
    const savedViews = localStorage.getItem('adventura_recent_logs');
    if (savedFavorites) setWishlist(JSON.parse(savedFavorites));
    if (savedViews) setRecentlyViewed(JSON.parse(savedViews));
  }, []);

  const triggerToast = (msg: string) => {
    setShowNotification(msg);
    setTimeout(() => setShowNotification(null), 4000);
  };

  // Preset Configurations for the Quick-Start Engine
  const applyPreset = (presetType: 'honeymoon' | 'executive' | 'safari') => {
    if (presetType === 'honeymoon') {
      setCuratedTrip({
        destination: 'Baa Atoll Lagoon Pavilion',
        transportMode: 'first-class',
        accommodationTier: 'overwater-villa',
        headcount: 2,
        timeframeDays: 7,
        targetBudgetUsd: 9500,
        departureDate: '2026-09-20'
      });
      triggerToast("Applied Romance & Luxury Honeymoon Template");
    } else if (presetType === 'executive') {
      setCuratedTrip({
        destination: 'Zurich Financial Summit Retreat',
        transportMode: 'private-jet',
        accommodationTier: 'presidential-suite',
        headcount: 1,
        timeframeDays: 4,
        targetBudgetUsd: 15000,
        departureDate: '2026-11-02'
      });
      triggerToast("Applied Sovereign Executive Private Charter Template");
    } else if (presetType === 'safari') {
      setCuratedTrip({
        destination: 'Serengeti Wildlife Sanctuary Preserve',
        transportMode: 'first-class',
        accommodationTier: 'overwater-villa',
        headcount: 4,
        timeframeDays: 10,
        targetBudgetUsd: 14000,
        departureDate: '2026-08-15'
      });
      triggerToast("Applied High-End Family Conservation Safari Template");
    }
  };

  const handleTrackAndSelectView = (tour: Tour) => {
    setSelectedTour(tour);
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== tour.id);
      const updated = [tour.id, ...filtered].slice(0, 4);
      localStorage.setItem('adventura_recent_logs', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleWishlist = (id: number) => {
    setWishlist(prev => {
      const updated = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem('adventura_wishlist', JSON.stringify(updated));
      return updated;
    });
    triggerToast(wishlist.includes(id) ? "Removed asset from structural tracking catalog." : "Asset secured in private luxury vault tracking.");
  };

  const handleAddToCompare = (tour: Tour) => {
    if (compareList.find(t => t.id === tour.id)) {
      setCompareList(prev => prev.filter(t => t.id !== tour.id));
      return;
    }
    if (compareList.length >= 3) {
      triggerToast("Structural comparison bounds capped at 3 matrix rows.");
      return;
    }
    setCompareList(prev => [...prev, tour]);
  };

  // --- ADMIN ACTIONS CODE LOGIC ---
  const handleAddFlight = () => {
    if (!newFlight.carrier || !newFlight.route) return;
    setFlights([...flights, { id: `FL-${Math.floor(100 + Math.random() * 900)}`, ...newFlight }]);
    setNewFlight({ carrier: '', route: '', baseCost: 1000, markupPercent: 10 });
    triggerToast("Injected custom API ticket asset configuration into system layers.");
  };

  const handleAddHotel = () => {
    if (!newHotel.property) return;
    setHotels([...hotels, { id: `HT-${Math.floor(100 + Math.random() * 900)}`, ...newHotel }]);
    setNewHotel({ property: '', baseCost: 800, markupPercent: 10 });
    triggerToast("Synchronized alternative resort block into inventory pool.");
  };

  const handleAddTour = () => {
    if (!newTourItem.title || !newTourItem.location) return;
    const itemPrice = Number(newTourItem.price);
    const addedTour: Tour = {
      id: sampleTours.length + 1,
      title: newTourItem.title,
      location: newTourItem.location,
      duration: newTourItem.duration || '5 Days',
      price: itemPrice,
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
      tag: newTourItem.tag,
      slots: Number(newTourItem.slots) || 4,
      highlights: newTourItem.highlights ? newTourItem.highlights.split(',') : ['Premium Stays', 'Guided Paths'],
      perkPreview: newTourItem.perkPreview || 'Complimentary luxury lounge allocation parameters.'
    };
    setSampleTours([...sampleTours, addedTour]);
    setNewTourItem({ title: '', location: '', duration: '', price: 1500, tag: 'Exclusive', slots: 4, highlights: '', perkPreview: '' });
    triggerToast("Injected custom expedition matrix into public inventory listings.");
  };

  const handleDeleteTour = (id: number) => {
    setSampleTours(sampleTours.filter(t => t.id !== id));
    triggerToast("Purged expedition package record from global listing catalogs.");
  };

  const handleAddMedia = () => {
    if (!newMediaItem.title || !newMediaItem.src) return;
    setMediaGallery([...mediaGallery, { id: mediaGallery.length + 1, ...newMediaItem }]);
    setNewMediaItem({ type: 'image', title: '', location: '', src: '', thumbnail: '' });
    triggerToast("Successful execution file loaded to CMS presentation array.");
  };

  const handleSendReply = (id: number) => {
    if (!replyMessage.trim()) return;
    setEmails(emails.map(email => email.id === id ? { ...email, status: 'replied' } : email));
    setReplyMessage('');
    setSelectedEmailId(null);
    triggerToast("Dispatched system email update payload across target network relays.");
  };

  const CurrencyTooltip = ({ usdAmount }: { usdAmount: number }) => {
    const currentRate = rates[currency];
    return (
      <div className="mt-1 block text-[10px] text-slate-400 group-hover:text-slate-500 transition-colors">
        <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 border border-slate-200/60 shadow-2xs">
          1 USD = {currency === 'USD' ? '$1.00' : `${currency === 'NGN' ? '₦' : currency === 'GHS' ? '₵' : 'CFA '}${currentRate.toLocaleString()}`}
        </span>
        <span className="mx-1">•</span>
        <span>Gateway Fee: 0-2% cleared</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#2D3748] font-sans antialiased relative selection:bg-[#26A69A]/20 selection:text-[#1E88E5]">
      
      {/* --- LIVE NOTIFICATION TOAST OVERLAY --- */}
      {showNotification && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-3 text-xs border border-slate-700 animate-slideIn">
          <span className="w-2.5 h-2.5 rounded-full bg-[#26A69A] animate-ping"></span>
          <span>{showNotification}</span>
        </div>
      )}

      {/* --- TWO WAY DYNAMIC CONTROLLER HUB --- */}
      <div className="bg-[#1E88E5] text-white px-6 py-3.5 flex flex-col md:flex-row justify-between items-center gap-3 sticky top-0 z-50 shadow-md">
        <div className="flex items-center space-x-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#26A69A] animate-pulse"></span>
          <span className="text-xs tracking-wider font-semibold text-blue-50">
            System State Matrix: <strong className="text-white font-bold">{viewMode === 'visitor' ? 'Visitor Presentation Mode' : 'Operational Admin Command Center'}</strong>
          </span>
        </div>
        
        <div className="flex items-center space-x-2 bg-black/20 p-1 rounded-xl border border-white/10">
          <button 
            onClick={() => setViewMode('visitor')} 
            className={`px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all ${viewMode === 'visitor' ? 'bg-white text-[#1E88E5] shadow-sm' : 'text-blue-100 hover:text-white'}`}
          >
            ✨ Visitor View Page
          </button>
          <button 
            onClick={() => setViewMode('admin')} 
            className={`px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all ${viewMode === 'admin' ? 'bg-white text-[#1E88E5] shadow-sm' : 'text-blue-100 hover:text-white'}`}
          >
            ⚙️ System Corporate Admin
          </button>
        </div>

        <div className="flex items-center space-x-2 bg-black/10 p-1 rounded-xl">
          <button onClick={() => setCurrentTier('tier1')} className={`px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all ${currentTier === 'tier1' ? 'bg-white text-[#1E88E5] shadow-sm' : 'text-blue-100'}`}> 📊 Blueprint Mode</button>
          <button onClick={() => setCurrentTier('tier2')} className={`px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all ${currentTier === 'tier2' ? 'bg-white text-[#1E88E5] shadow-sm' : 'text-blue-100'}`}> ✨ Live Automation</button>
        </div>
      </div>

      {viewMode === 'admin' ? (
        /* ========================================================================= */
        /* ==================== ADMINISTRATIVE CONTROL INTERFACE ==================== */
        /* ========================================================================= */
        <div className="max-w-7xl mx-auto p-6 space-y-10 animate-fadeIn">
          
          <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-xl border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 text-9xl font-mono select-none">CMD</div>
            <span className="bg-[#26A69A] text-white text-[10px] font-mono font-bold px-3 py-1 rounded uppercase tracking-widest">Secure Console Layer</span>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mt-2">Enterprise Resource Management Framework</h2>
            <p className="text-slate-400 text-xs max-w-2xl mt-1">Configure pricing markups, deploy target marketing banners, audit flight distribution parameters, and triage client communications natively.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* LAYOUT 1: AIRLINE TICKET API GDS CONNECTIVITY TIER */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">Flight Ticketing & Scheduling GDS API Synchronization</h3>
                  <p className="text-[11px] text-slate-500">Live API Channel Endpoint: Amadeus / Sabre Live Cloud Distribution Network</p>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>

              <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                {flights.map((flight) => {
                  const calculatedMarkupValue = (flight.baseCost * flight.markupPercent) / 100;
                  const finalClientRetailPrice = flight.baseCost + calculatedMarkupValue;
                  return (
                    <div key={flight.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 flex justify-between items-center text-xs">
                      <div>
                        <div className="font-bold text-slate-700">{flight.carrier} <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-mono font-medium ml-1">{flight.id}</span></div>
                        <div className="text-[11px] text-slate-500 font-medium mt-0.5">Route Vector: {flight.route}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-slate-400 text-[10px]">Base: {formatPrice(flight.baseCost)} • Markup: {flight.markupPercent}%</div>
                        <div className="font-mono font-bold text-[#1E88E5] text-sm">{formatPrice(finalClientRetailPrice)}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <span className="text-[10px] font-bold text-slate-600 uppercase block">Inject Flight Routing Pricing Layer</span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <input type="text" placeholder="Airline (e.g. Air France)" value={newFlight.carrier} onChange={e => setNewFlight({...newFlight, carrier: e.target.value})} className="bg-white border border-slate-200 p-2 rounded" />
                  <input type="text" placeholder="Route (e.g. LOS → CDG)" value={newFlight.route} onChange={e => setNewFlight({...newFlight, route: e.target.value})} className="bg-white border border-slate-200 p-2 rounded" />
                  <input type="number" placeholder="Base GDS Cost ($)" value={newFlight.baseCost} onChange={e => setNewFlight({...newFlight, baseCost: Number(e.target.value)})} className="bg-white border border-slate-200 p-2 rounded" />
                  <input type="number" placeholder="Markup Percentage (%)" value={newFlight.markupPercent} onChange={e => setNewFlight({...newFlight, markupPercent: Number(e.target.value)})} className="bg-white border border-slate-200 p-2 rounded" />
                </div>
                <button onClick={handleAddFlight} className="w-full bg-[#1E88E5] text-white text-[11px] font-bold uppercase tracking-wider py-2 rounded-lg hover:bg-[#1E88E5]/90 transition-all">Synchronize Dynamic API Pricing Routing</button>
              </div>
            </div>

            {/* LAYOUT 2: REAL-TIME ACCOMMODATION / HOTEL MARKUP CHANNEL ENGINE */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">Bespoke Hospitality Aggregator Pricing Hub</h3>
                  <p className="text-[11px] text-slate-500">Live API Channel Endpoint: Luxury Block Allocation Interface Channel</p>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>

              <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                {hotels.map((hotel) => {
                  const totalHotelCostWithMarkupValue = hotel.baseCost + ((hotel.baseCost * hotel.markupPercent) / 100);
                  return (
                    <div key={hotel.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 flex justify-between items-center text-xs">
                      <div className="max-w-[70%]">
                        <div className="font-bold text-slate-700 truncate">{hotel.property}</div>
                        <div className="text-[10px] text-slate-400 font-mono font-medium mt-0.5">Inventory Reference ID: {hotel.id}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-slate-400 text-[10px]">Base: {formatPrice(hotel.baseCost)} • +{hotel.markupPercent}%</div>
                        <div className="font-mono font-bold text-[#26A69A] text-sm">{formatPrice(totalHotelCostWithMarkupValue)}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <span className="text-[10px] font-bold text-slate-600 uppercase block">Inject Accommodation Inventory Element</span>
                <div className="grid grid-cols-1 gap-2 text-xs">
                  <input type="text" placeholder="Resort Pavilion Name" value={newHotel.property} onChange={e => setNewHotel({...newHotel, property: e.target.value})} className="bg-white border border-slate-200 p-2 rounded" />
                  <div className="grid grid-cols-2 gap-2">
                    <input type="number" placeholder="Base Room Rate ($)" value={newHotel.baseCost} onChange={e => setNewHotel({...newHotel, baseCost: Number(e.target.value)})} className="bg-white border border-slate-200 p-2 rounded" />
                    <input type="number" placeholder="Markup Percentage (%)" value={newHotel.markupPercent} onChange={e => setNewHotel({...newHotel, markupPercent: Number(e.target.value)})} className="bg-white border border-slate-200 p-2 rounded" />
                  </div>
                </div>
                <button onClick={handleAddHotel} className="w-full bg-[#26A69A] text-white text-[11px] font-bold uppercase tracking-wider py-2 rounded-lg hover:bg-[#26A69A]/90 transition-all">Append Dynamic Resort Price Vector</button>
              </div>
            </div>

          </div>

          {/* LAYOUT 3: EXPEDITION CONTENT MANAGEMENT SYSTEM (CMS) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">Dynamic Tour Package Matrix CMS Studio</h3>
              <p className="text-[11px] text-slate-500">Inject, adjust, scale down, or permanently purge dynamic packages presented across the main storefront template catalog grids.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <input type="text" placeholder="Expedition Title" value={newTourItem.title} onChange={e => setNewTourItem({...newTourItem, title: e.target.value})} className="bg-slate-50 border border-slate-200 p-2 rounded-xl" />
              <input type="text" placeholder="Location Vector" value={newTourItem.location} onChange={e => setNewTourItem({...newTourItem, location: e.target.value})} className="bg-slate-50 border border-slate-200 p-2 rounded-xl" />
              <input type="text" placeholder="Duration Frame (e.g. 7 Days)" value={newTourItem.duration} onChange={e => setNewTourItem({...newTourItem, duration: e.target.value})} className="bg-slate-50 border border-slate-200 p-2 rounded-xl" />
              <input type="number" placeholder="Retail Pricing Index ($)" value={newTourItem.price} onChange={e => setNewTourItem({...newTourItem, price: Number(e.target.value)})} className="bg-slate-50 border border-slate-200 p-2 rounded-xl" />
              <input type="text" placeholder="Banner Ribbon Tag (e.g. Trending)" value={newTourItem.tag} onChange={e => setNewTourItem({...newTourItem, tag: e.target.value})} className="bg-slate-50 border border-slate-200 p-2 rounded-xl" />
              <input type="number" placeholder="Available Spaces (Scarcity Lock)" value={newTourItem.slots} onChange={e => setNewTourItem({...newTourItem, slots: Number(e.target.value)})} className="bg-slate-50 border border-slate-200 p-2 rounded-xl" />
              <input type="text" placeholder="Highlights (Separated by commas)" value={newTourItem.highlights} onChange={e => setNewTourItem({...newTourItem, highlights: e.target.value})} className="bg-slate-50 border border-slate-200 p-2 rounded-xl md:col-span-2" />
              <input type="text" placeholder="Micro-Interaction Hover text preview" value={newTourItem.perkPreview} onChange={e => setNewTourItem({...newTourItem, perkPreview: e.target.value})} className="bg-slate-50 border border-slate-200 p-2 rounded-xl md:col-span-4" />
            </div>
            
            <button onClick={handleAddTour} className="bg-slate-900 text-white font-bold text-xs uppercase tracking-widest py-3 px-6 rounded-xl shadow-md hover:bg-slate-800 transition-all">Deploy Package Configuration Parameters</button>

            <div className="pt-4 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-500 uppercase block mb-2">Active Presentation Inventory Rows</span>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {sampleTours.map((t) => (
                  <div key={t.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex justify-between items-center text-xs">
                    <div className="truncate max-w-[75%]">
                      <span className="font-bold text-slate-700 block truncate">{t.title}</span>
                      <span className="text-[10px] text-slate-400 font-medium">{t.location} • {formatPrice(t.price)}</span>
                    </div>
                    <button onClick={() => handleDeleteTour(t.id)} className="text-xs font-bold text-rose-500 hover:bg-rose-50 p-2 rounded-lg transition-all">✕ Delete</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* LAYOUT 4 & 5: MEDIA CMS & CENTRAL EMAIL HUB */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4 lg:col-span-1">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">Media Assets Content CMS</h3>
                <p className="text-[11px] text-slate-500">Inject cinematic tour video files and proof of successful trip imagery directly.</p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block mb-1">Asset Class</label>
                  <select value={newMediaItem.type} onChange={e => setNewMediaItem({...newMediaItem, type: e.target.value as 'image' | 'video'})} className="w-full bg-slate-50 border border-slate-200 p-2 rounded-lg">
                    <option value="image">Still Frame Image Asset</option>
                    <option value="video">Cinematic MP4 Video Stream</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block mb-1">Expedition Production Title</label>
                  <input type="text" placeholder="e.g. Serengeti Safari Vlog" value={newMediaItem.title} onChange={e => setNewMediaItem({...newMediaItem, title: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2 rounded-lg" />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block mb-1">Target Destination Vector</label>
                  <input type="text" placeholder="e.g. East Africa Reef" value={newMediaItem.location} onChange={e => setNewMediaItem({...newMediaItem, location: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2 rounded-lg" />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block mb-1">Streaming URL / Source Pointer</label>
                  <input type="text" placeholder="https://source.stream/file.mp4" value={newMediaItem.src} onChange={e => setNewMediaItem({...newMediaItem, src: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2 rounded-lg" />
                </div>
                <button onClick={handleAddMedia} className="w-full bg-slate-900 text-white font-bold py-2.5 rounded-lg uppercase tracking-wider text-[11px]">Deploy Asset Node to Gallery</button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4 lg:col-span-2">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">Central Communication Matrix & Mail Relay Center</h3>
                <p className="text-[11px] text-slate-500">Review custom client configuration requests, dispatch confirmation responses, and return automated transactional status feeds.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {emails.map((mail) => (
                    <div 
                      key={mail.id} 
                      onClick={() => setSelectedEmailId(mail.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer text-xs space-y-1 ${selectedEmailId === mail.id ? 'bg-blue-50/70 border-[#1E88E5]' : 'bg-slate-50 border-slate-200/70 hover:bg-slate-100/70'}`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-700 truncate max-w-[70%]">{mail.sender}</span>
                        <span className={`text-[9px] font-bold font-mono uppercase px-1.5 py-0.5 rounded ${mail.status === 'unread' ? 'bg-amber-100 text-amber-700 animate-pulse' : 'bg-emerald-100 text-emerald-700'}`}>{mail.status}</span>
                      </div>
                      <div className="font-medium text-slate-600 truncate">{mail.subject}</div>
                      <div className="text-[10px] text-slate-400 font-mono text-right">{mail.date}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
                  {selectedEmailId ? (
                    (() => {
                      const currentActiveSelectedEmailObj = emails.find(e => e.id === selectedEmailId);
                      return (
                        <div className="space-y-3 flex-1 flex flex-col justify-between text-xs">
                          <div>
                            <span className="text-[9px] font-bold font-mono uppercase tracking-wider text-slate-400 block">Active Inspection Payload</span>
                            <div className="text-slate-700 font-bold mt-1">{currentActiveSelectedEmailObj?.subject}</div>
                            <p className="text-slate-500 text-[11px] mt-1 bg-white p-2 rounded border border-slate-200/60 max-h-24 overflow-y-auto leading-relaxed">{currentActiveSelectedEmailObj?.message}</p>
                          </div>
                          <div className="space-y-2">
                            <textarea placeholder="Formulate encrypted secure return feedback parameters..." value={replyMessage} onChange={e => setReplyMessage(e.target.value)} className="w-full bg-white border border-slate-200 p-2 rounded-lg text-xs focus:outline-none min-h-[60px] resize-none" />
                            <button onClick={() => handleSendReply(selectedEmailId)} className="w-full bg-[#1E88E5] text-white font-bold py-2 rounded-lg uppercase tracking-wider text-[10px]">Dispatch Feedback Framework Payload</button>
                          </div>
                        </div>
                      );
                    })()
                  ) : (
                    <div className="text-center py-12 text-slate-400 text-xs font-medium">Select a communicative ledger entry from the index queue tray to initialize full dispatch operations.</div>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* LAYOUT 6: METRIC ANALYTICS TRACKING INDEX */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-6">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">Structural Traffic Distribution Analytics & Demographics Matrix</h3>
              <p className="text-[11px] text-slate-500">Auditing active unique visitor connection nodes, geo-spatial metadata routing indices, and interaction analytics.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Gross Platform Impressions</span>
                <strong className="text-2xl font-bold font-mono text-slate-800 mt-1 block">42,891</strong>
                <span className="text-[9px] text-emerald-600 font-semibold mt-1 block">▲ +14.2% Month-over-Month</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Unique Node Handshakes</span>
                <strong className="text-2xl font-bold font-mono text-slate-800 mt-1 block">18,405</strong>
                <span className="text-[9px] text-emerald-600 font-semibold mt-1 block">● Real-time Active: 142 Nodes</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Top Geographic Footprint</span>
                <strong className="text-xl font-bold text-slate-800 mt-1 block truncate">Nigeria (LOS / ABV)</strong>
                <span className="text-[9px] text-slate-400 font-medium mt-1 block">Accounting for 48% Gross Traffic</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Platform Conversion Index</span>
                <strong className="text-2xl font-bold font-mono text-[#1E88E5] mt-1 block">3.84%</strong>
                <span className="text-[9px] text-[#26A69A] font-semibold mt-1 block">🔒 Synchronized GDS Checkouts</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium text-slate-600">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Regional Hub Demographics Breakdowns</span>
                <div className="flex justify-between items-center py-1 border-b border-slate-200/40">
                  <span>West Africa Regional Nodes (NG/GH)</span>
                  <span className="font-mono font-bold text-slate-800">62.4%</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200/40">
                  <span>European Continent Access Nodes (UK/FR/DE)</span>
                  <span className="font-mono font-bold text-slate-800">22.1%</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span>Americas / Outlying Regions</span>
                  <span className="font-mono font-bold text-slate-800">15.5%</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Device Architecture Demographics</span>
                <div className="flex justify-between items-center py-1 border-b border-slate-200/40">
                  <span>Mobile Handsets (iOS / Android Engine Layouts)</span>
                  <span className="font-mono font-bold text-slate-800">71.8%</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200/40">
                  <span>Desktop Screen Interfaces (Safari / Chrome Platform Specs)</span>
                  <span className="font-mono font-bold text-slate-800">24.5%</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span>Alternative Matrix / API Access Nodes</span>
                  <span className="font-mono font-bold text-slate-800">3.7%</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      ) : (
        /* ========================================================================= */
        /* ====================== VISITOR SELECTION PRESENTATION ==================== */
        /* ========================================================================= */
        <>
          <div className="bg-[#E8DCCB]/40 text-[#2D3748] text-xs py-3 px-6 text-center tracking-wide font-medium border-b border-[#E8DCCB]/60">
            🌴 Indulge in tailored luxury escapes. Craft custom stays and access direct carrier channels instantly.
          </div>

          <div className="bg-slate-900 text-slate-400 text-[11px] font-medium py-2.5 px-6 border-b border-slate-800">
            <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3">
              <div className="flex flex-wrap items-center gap-6">
                <span className="flex items-center space-x-1.5 text-slate-300">
                  <span className="text-emerald-400"> 🛡️ </span> <span>IATA Accredited Agency #54-2092</span>
                </span>
                <span className="hidden sm:inline text-slate-600">|</span>
                <span className="flex items-center space-x-1.5">
                  <span className="text-[#1E88E5]"> 🔒 </span> <span>PCI-DSS Level 1 Cleared Gateways</span>
                </span>
                <span className="hidden sm:inline text-slate-600">|</span>
                <span className="flex items-center space-x-1.5">
                  <span className="text-[#26A69A]"> 💎 </span> <span>100% Fully Bonded Escrow Coverage</span>
                </span>
              </div>
              <div className="text-[#26A69A] font-bold font-mono tracking-wider hidden lg:block">
                SECURITY PROTOCOL: ONLINE
              </div>
            </div>
          </div>

          <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-[46px] z-40">
            <div className="max-w-7xl mx-auto px-6 h-24 flex justify-between items-center">
              <div className="text-2xl font-semibold tracking-tight text-[#1E88E5]">ADVENTURA<span className="text-[#26A69A] font-light">LUXE</span></div>
              <nav className="hidden lg:flex space-x-10 text-xs uppercase tracking-widest font-bold text-[#718096]">
                <span className="text-[#1E88E5] cursor-pointer">Flight Portals</span>
                <span className="hover:text-[#1E88E5] cursor-pointer transition-colors">Resort Blocks</span>
                <span className="hover:text-[#1E88E5] cursor-pointer transition-colors">Bespoke Studio</span>
              </nav>

              <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
                {(['NGN', 'USD', 'GHS', 'XOF'] as const).map((cur) => (
                  <button
                    key={cur}
                    onClick={() => setCurrency(cur)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${currency === cur ? 'bg-white text-[#2D3748] shadow-sm' : 'text-[#718096] hover:text-[#2D3748]'}`}
                  >
                    {cur}
                  </button>
                ))}
              </div>
            </div>
          </header>

          {/* DUAL ARRAYS: SEARCH TERMINAL ZONE (FLIGHTS & HOTELS COMBINED) */}
          <section className="relative py-16 px-6 overflow-hidden border-b border-slate-100 bg-gradient-to-br from-[#F8FAFC] to-[#EAF6FF]">
            <div className="relative max-w-6xl mx-auto z-10 space-y-12">
              
              {/* INTERFACE PANEL A: DYNAMIC AIRLINE FLIGHT PORTAL */}
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100 space-y-6">
                <div className="flex flex-wrap justify-between items-center gap-4 border-b border-slate-100 pb-4">
                  <div className="space-y-1">
                    <span className="bg-[#1E88E5]/10 text-[#1E88E5] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">GDS Gated Channel</span>
                    <h3 className="text-lg font-semibold tracking-tight text-slate-800">Aviation Manifest Terminal</h3>
                  </div>
                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex space-x-2 bg-slate-50 p-1 rounded-xl">
                      <button onClick={() => setTripType('round-trip')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${tripType === 'round-trip' ? 'bg-white text-[#1E88E5] shadow-sm' : 'text-[#718096]'}`}>🔄 Round Trip</button>
                      <button onClick={() => setTripType('one-way')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${tripType === 'one-way' ? 'bg-white text-[#1E88E5] shadow-sm' : 'text-[#718096]'}`}>➔ One Way</button>
                    </div>
                    <div className="flex items-center space-x-3 bg-slate-50 px-4 py-2 rounded-xl">
                      <label className="text-xs text-[#718096]">Timeline Layout:</label>
                      <input type="number" min={1} value={customDays} onChange={(e) => setCustomDays(Math.max(1, Number(e.target.value)))} className="w-16 bg-white border border-slate-200 rounded px-2 py-1 text-center text-xs font-bold text-[#2D3748]" />
                      <span className="text-xs text-[#718096]">Days Locked</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#718096] block mb-1">Departure Station</span>
                    <input type="text" value={flightSearch.from} onChange={(e) => setFlightSearch({...flightSearch, from: e.target.value})} className="w-full bg-transparent text-[#2D3748] font-medium text-sm focus:outline-none" />
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#718096] block mb-1">Arrival Destination</span>
                    <input type="text" value={flightSearch.to} onChange={(e) => setFlightSearch({...flightSearch, to: e.target.value})} className="w-full bg-transparent text-[#2D3748] font-medium text-sm focus:outline-none" />
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#718096] block mb-1">Departure Date</span>
                    <input type="date" value={flightSearch.depart} onChange={(e) => setFlightSearch({...flightSearch, depart: e.target.value})} className="w-full bg-transparent text-[#2D3748] text-xs focus:outline-none" />
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#718096] block mb-1">Return Date</span>
                    <input type="date" disabled={tripType === 'one-way'} value={flightSearch.return} onChange={(e) => setFlightSearch({...flightSearch, return: e.target.value})} className="w-full bg-transparent text-[#2D3748] text-xs focus:outline-none disabled:opacity-30" />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <div className="flex items-center space-x-3 text-xs text-[#718096]">
                      <span>Seat Configuration:</span>
                      <select value={passengers} onChange={(e) => setPassengers(Number(e.target.value))} className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-medium text-[#2D3748]">
                        {[1,2,3,4,6,8].map(n => <option key={n} value={n}>{n} Passenger{n > 1 ? 's' : ''}</option>)}
                      </select>
                      {passengers > 1 && (
                        <span className="text-[11px] bg-[#1E88E5]/10 text-[#1E88E5] font-semibold px-2.5 py-1 rounded-md">⚠️ Multi-seat manifest layout locked.</span>
                      )}
                    </div>
                    <button onClick={() => triggerToast("Querying connected aviation routing channels...")} className="bg-[#1E88E5] hover:bg-[#1E88E5]/90 text-white px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest shadow-md transition-all">Query Flight Inventory</button>
                  </div>

                  {passengerManifest.length > 0 && (
                    <div className="mt-6 bg-slate-50/80 rounded-xl p-5 border border-slate-200/60 space-y-4 animate-fadeIn">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <h4 className="text-xs uppercase font-bold tracking-wider text-slate-700">Supplementary Passenger Air Manifest Documents</h4>
                        <span className="text-[10px] text-[#1E88E5] font-semibold">GDS Pipeline Lock Active</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {passengerManifest.map((pass, index) => (
                          <div key={index} className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs space-y-3">
                            <span className="text-[10px] font-bold text-[#26A69A] block uppercase">Passenger #{index + 2} Details</span>
                            <div className="grid grid-cols-2 gap-2">
                              <input type="text" placeholder="Full Name (As Passport)" value={pass.fullName} onChange={(e) => { const updated = [...passengerManifest]; updated[index].fullName = e.target.value; setPassengerManifest(updated); }} className="bg-slate-50 border border-slate-200 rounded p-2 text-xs focus:outline-none" />
                              <input type="text" placeholder="Passport Number" value={pass.passportNumber} onChange={(e) => { const updated = [...passengerManifest]; updated[index].passportNumber = e.target.value; setPassengerManifest(updated); }} className="bg-slate-50 border border-slate-200 rounded p-2 text-xs focus:outline-none" />
                              <input type="text" placeholder="Nationality" value={pass.nationality} onChange={(e) => { const updated = [...passengerManifest]; updated[index].nationality = e.target.value; setPassengerManifest(updated); }} className="bg-slate-50 border border-slate-200 rounded p-2 text-xs focus:outline-none" />
                              <input type="date" value={pass.dob} onChange={(e) => { const updated = [...passengerManifest]; updated[index].dob = e.target.value; setPassengerManifest(updated); }} className="bg-slate-50 border border-slate-200 rounded p-2 text-xs text-slate-600 focus:outline-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <select value={pass.mealPreference} onChange={(e) => { const updated = [...passengerManifest]; updated[index].mealPreference = e.target.value; setPassengerManifest(updated); }} className="bg-slate-50 border border-slate-200 rounded p-2 text-[11px] text-slate-700" >
                                <option>Standard Luxury Lounge Platter</option>
                                <option>Caviar & Seafood Exclusionary</option>
                                <option>Premium Organic Plant Vegan</option>
                              </select>
                              <input type="text" placeholder="Special Assistance Needs" value={pass.specialAssistance} onChange={(e) => { const updated = [...passengerManifest]; updated[index].specialAssistance = e.target.value; setPassengerManifest(updated); }} className="bg-slate-50 border border-slate-200 rounded p-2 text-xs focus:outline-none" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* INTERFACE PANEL B: RESTORED REAL-TIME RESORT LODGING BLOCK MODULE */}
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100 space-y-6">
                <div className="flex flex-wrap justify-between items-center gap-4 border-b border-slate-100 pb-4">
                  <div className="space-y-1">
                    <span className="bg-[#26A69A]/10 text-[#26A69A] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Hospitality Aggregator Pipeline</span>
                    <h3 className="text-lg font-semibold tracking-tight text-slate-800">Luxury Resort Accommodation Terminal</h3>
                  </div>
                  <div className="flex space-x-3 items-center text-xs">
                    <span className="text-slate-500 font-medium">Distribution Category:</span>
                    <select 
                      value={hotelSearch.tier} 
                      onChange={e => setHotelSearch({...hotelSearch, tier: e.target.value})} 
                      className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-bold text-[#1E88E5]"
                    >
                      <option value="ultra-premium">Presidential Private Overwater Tier</option>
                      <option value="premium-villa">Signature Beachfront Sanctuary Villa</option>
                      <option value="boutique-executive">Boutique Executive Suite Block</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 md:col-span-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#718096] block mb-1">Target Resort Property / Atoll Hub</span>
                    <input type="text" value={hotelSearch.destination} onChange={(e) => setHotelSearch({...hotelSearch, destination: e.target.value})} className="w-full bg-transparent text-[#2D3748] font-medium text-sm focus:outline-none" />
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#718096] block mb-1">Check-In Voucher Window</span>
                    <input type="date" value={hotelSearch.checkIn} onChange={(e) => setHotelSearch({...hotelSearch, checkIn: e.target.value})} className="w-full bg-transparent text-[#2D3748] text-xs focus:outline-none" />
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#718096] block mb-1">Check-Out Date</span>
                    <input type="date" value={hotelSearch.checkOut} onChange={(e) => setHotelSearch({...hotelSearch, checkOut: e.target.value})} className="w-full bg-transparent text-[#2D3748] text-xs focus:outline-none" />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex items-center space-x-3 text-xs text-[#718096]">
                    <span>Allocated Suite Room Matrix:</span>
                    <select value={hotelSearch.rooms} onChange={(e) => setHotelSearch({...hotelSearch, rooms: Number(e.target.value)})} className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-medium text-[#2D3748]">
                      {[1,2,3,4,5].map(r => <option key={r} value={r}>{r} Separate Pavilion Block{r > 1 ? 's' : ''}</option>)}
                    </select>
                  </div>
                  <button onClick={() => triggerToast("Parsing real-time hospitality aggregator pricing filters...")} className="bg-[#26A69A] hover:bg-[#26A69A]/90 text-white px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest shadow-md transition-all">Search Room Allocations</button>
                </div>
              </div>

            </div>
          </section>

          {/* SECTION 4: SIGNATURE JOURNEYS EXPEDITION MATRIX */}
          <section className="max-w-7xl mx-auto px-6 py-20">
            <div className="mb-16 text-center">
              <span className="bg-[#26A69A]/10 text-[#26A69A] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest"> Bespoke Operational Inventory Matrix </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-[#2D3748] tracking-tight mt-4"> Signature Global Expeditions </h2>
              <p className="text-[#718096] text-sm max-w-xl mx-auto mt-2"> Browse our verified luxury packages. Act quickly to lock in your booking—remaining terminal spaces are synchronized live. </p>
              <div className="h-1 w-20 bg-[#26A69A] mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sampleTours.map((tour) => (
                <div key={tour.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 flex flex-col justify-between group shadow-sm hover:shadow-md transition-all duration-300 relative">
                  <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                    <img src={tour.img} alt={tour.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#1E88E5] text-[9px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide"> {tour.tag} </span>
                    
                    <button onClick={() => toggleWishlist(tour.id)} className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-xs text-slate-500 hover:text-rose-500 transition-colors" >
                      <svg className={`w-4 h-4 ${wishlist.includes(tour.id) ? 'fill-rose-500 text-rose-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                      </svg>
                    </button>

                    <span className={`absolute bottom-3 right-3 backdrop-blur-sm font-bold text-[10px] px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm border ${ tour.slots <= 2 ? 'bg-amber-50 border-amber-300 text-amber-700 font-extrabold tracking-widest shadow-amber-200/50 animate-pulse' : 'bg-emerald-50 border-emerald-200 text-emerald-600' }`}>
                      {tour.slots <= 2 ? ` 👑 Elite Availability: ${tour.slots} Left` : ` ✓ Rooms Clear: ${tour.slots} Open`}
                    </span>

                    <div className="absolute inset-x-0 bottom-0 bg-slate-950/90 text-white p-3 text-[11px] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out backdrop-blur-xs flex items-start space-x-2">
                      <span className="text-amber-400 font-bold"> ⭐ Exclusive Perk:</span>
                      <p className="text-slate-300 leading-normal font-medium">{tour.perkPreview}</p>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex justify-between items-center text-[10px] text-[#718096] font-bold tracking-wide uppercase">
                        <span> 📍 {tour.location}</span>
                        <span> ⏱️ {tour.duration}</span>
                      </div>
                      <h3 className="font-semibold text-[#2D3748] text-sm mt-2 group-hover:text-[#1E88E5] transition-colors line-clamp-2 min-h-[40px]"> {tour.title} </h3>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {tour.highlights.map((h, index) => (
                          <span key={index} className="bg-slate-50 text-[#718096] text-[9px] px-2 py-0.5 rounded border border-slate-100"> ✓ {h} </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-50 space-y-3">
                      <div className="flex justify-between items-end">
                        <div>
                          <span className="text-[9px] text-[#718096] uppercase block tracking-wider">Gross Cost</span>
                          <span className="text-base font-bold text-[#2D3748] block leading-tight">{formatPrice(tour.price)}</span>
                          <CurrencyTooltip usdAmount={tour.price} />
                        </div>
                        <button onClick={() => handleAddToCompare(tour)} className={`text-[10px] uppercase font-bold px-2 py-1 rounded border transition-all ${compareList.find(t=>t.id===tour.id) ? 'bg-slate-800 text-white' : 'bg-slate-50 text-slate-600'}`} >
                          {compareList.find(t=>t.id===tour.id) ? ' ✓ Compared' : ' ➕ Compare'}
                        </button>
                      </div>
                      <button onClick={() => handleTrackAndSelectView(tour)} className="w-full bg-[#1E88E5] text-white py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider hover:bg-[#1E88E5]/90 transition-all shadow-sm"> Book Slot </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* --- INTEGRATED EXPEDITION DRAWER --- */}
          {compareList.length > 0 && (
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 text-white border-t border-slate-700 shadow-2xl animate-slideUp">
              <div className="max-w-6xl mx-auto p-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-left">
                  <h4 className="text-xs uppercase tracking-widest text-[#26A69A] font-bold">Dynamic Expedition Comparison Suite</h4>
                  <p className="text-[11px] text-slate-400">Comparing {compareList.length}/3 selected asset layers side by side</p>
                </div>
                <div className="grid grid-cols-3 gap-3 max-w-xl w-full">
                  {compareList.map(tour => (
                    <div key={tour.id} className="bg-slate-800 p-2.5 rounded-lg border border-slate-700 flex flex-col justify-between relative text-[11px]">
                      <button onClick={()=>setCompareList(prev=>prev.filter(t=>t.id!==tour.id))} className="absolute -top-1.5 -right-1.5 bg-rose-500 rounded-full w-4 h-4 text-[9px] flex items-center justify-center font-bold">×</button>
                      <span className="font-semibold block truncate text-slate-200">{tour.title}</span>
                      <strong className="text-[#26A69A] block mt-1">{formatPrice(tour.price)}</strong>
                    </div>
                  ))}
                </div>
                <button onClick={() => { setCompareList([]); triggerToast("Comparison parameters flushed."); }} className="text-xs uppercase bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg font-bold"> Clear All </button>
              </div>
            </div>
          )}

          {/* SECTION 5: ACCREDITED PREMIUM HOTEL BLOCKS */}
          <section className="bg-white border-y border-slate-100 py-24 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="mb-10 text-center">
                <h2 className="text-3xl font-semibold text-[#2D3748] tracking-tight">Accredited Premium Accommodations</h2>
                <p className="text-[#718096] text-sm mt-1">Directly synchronized room blocks with instant voucher allocation pipelines.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/60 shadow-2xs space-y-4">
                  <h3 className="font-bold text-sm uppercase tracking-wide text-slate-700">Active Search Profile</h3>
                  <div className="space-y-1">
                    <span className="text-xs text-slate-500 block">Target Property Matrix:</span>
                    <strong className="text-slate-800 text-sm font-semibold block">{hotelSearch.destination}</strong>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block font-bold tracking-wider">Arrival Target</span>
                      <span className="font-semibold text-slate-700">{hotelSearch.checkIn}</span>
                    </div>
                    <span className="bg-[#26A69A]/10 text-[#26A69A] font-bold text-[10px] px-2.5 py-1 rounded uppercase tracking-wider">All-Inclusive</span>
                  </div>
                </div>

                <div className="md:col-span-2 bg-[#F1F5F9]/50 rounded-2xl p-6 border border-slate-200/60 flex flex-col justify-between">
                  <div className="text-xs text-slate-600 leading-relaxed space-y-2">
                    <span className="font-bold text-slate-700 block uppercase tracking-wider text-[10px]">GDS Hospitality Clearing Specifications</span>
                    <p>Room blocks are mapped directly to clearing channels without external agency intervention loops. Client selection registers instant vouchers with fully-bonded escrow execution rules intact.</p>
                  </div>
                  <div className="pt-4 flex flex-wrap gap-3">
                    <button onClick={() => triggerToast("Syncing with structural hotel block files...")} className="bg-slate-900 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xl shadow-xs">Audit Free Block Capacity</button>
                    <button onClick={() => alert('Framework documentation generated successfully.')} className="border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xl transition-all">Download Contract Framework</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 10: BESPOKE TRIP CURATOR MODULE */}
          <section className="bg-gradient-to-br from-slate-900 to-slate-950 text-white py-24 px-6 relative">
            <div className="absolute top-0 right-0 p-12 text-9xl font-mono text-white/5 font-extrabold select-none hidden lg:block">STUDIO</div>
            <div className="max-w-5xl mx-auto">
              <div className="mb-12 text-center md:text-left">
                <span className="bg-[#26A69A] text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-widest">Interactive Synthesis Module</span>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-3">Bespoke Architectural Trip Curator Studio</h2>
                <p className="text-slate-400 text-xs max-w-xl mt-1">Configure parameters live to trigger target carrier allocation metrics instantly.</p>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-md border border-white/10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4 text-xs font-medium text-slate-300">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1">Target Geographic Destination</label>
                      <input type="text" value={curatedTrip.destination} onChange={(e) => setCuratedTrip({...curatedTrip, destination: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#1E88E5]" />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1">Transit Class Vectors</label>
                      <select value={curatedTrip.transportMode} onChange={(e) => setCuratedTrip({...curatedTrip, transportMode: e.target.value})} className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-white focus:outline-none" >
                        <option value="private-jet">Private Jet Executive Charter Route</option>
                        <option value="first-class">First Class Commercial Suite Block</option>
                        <option value="business-class">Business Class Consolidated Seating</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1">Lodging Accommodations Tiers</label>
                      <select value={curatedTrip.accommodationTier} onChange={(e) => setCuratedTrip({...curatedTrip, accommodationTier: e.target.value})} className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-white focus:outline-none" >
                        <option value="presidential-suite">Presidential Private Villa Pavilions</option>
                        <option value="overwater-villa">Overwater Premium Lagoon Villas</option>
                        <option value="beachfront-sanctuary">Beachfront Premium Resort Sanctuary</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1">Manifest Headcount Metrics</label>
                      <input type="number" min={1} value={curatedTrip.headcount} onChange={(e) => setCuratedTrip({...curatedTrip, headcount: Math.max(1, Number(e.target.value))})} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none" />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1">Duration Parameters (Days)</label>
                      <input type="number" min={1} value={curatedTrip.timeframeDays} onChange={(e) => setCuratedTrip({...curatedTrip, timeframeDays: Math.max(1, Number(e.target.value))})} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1">Target Ceiling Budget Floor (USD)</label>
                      <input type="number" step={500} value={curatedTrip.targetBudgetUsd} onChange={(e) => setCuratedTrip({...curatedTrip, targetBudgetUsd: Number(e.target.value)})} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none font-mono" />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1">Departure Deployment Date</label>
                      <input type="date" value={curatedTrip.departureDate} onChange={(e) => setCuratedTrip({...curatedTrip, departureDate: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none text-slate-400" />
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] text-slate-400 uppercase block tracking-wider mb-2">Initialize From Preset Vectors</span>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => applyPreset('honeymoon')} className="bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg text-[10px] uppercase font-bold transition-all">Romance Honeymoon</button>
                      <button onClick={() => applyPreset('executive')} className="bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg text-[10px] uppercase font-bold transition-all">Sovereign Executive</button>
                      <button onClick={() => applyPreset('safari')} className="bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg text-[10px] uppercase font-bold transition-all">Conservation Safari</button>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-5 border border-white/10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="border-b border-white/10 pb-2">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-bold">Progress Framework Synthesis</span>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-[#1E88E5] to-[#26A69A] h-full transition-all duration-500" style={{ width: `${curatorProgressScore}%` }}></div>
                      </div>
                      <div className="text-right font-mono text-[10px] mt-1 text-slate-400">{curatorProgressScore}% Configured</div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Computed Clearance Estimate</span>
                      <strong className="text-2xl font-mono font-extrabold text-white block leading-tight">{formatPrice(calculatedCuratedEstimate)}</strong>
                      <span className="text-[10px] text-slate-400 block">Aggregated across structural carrier base fees</span>
                    </div>

                    {calculatedCuratedEstimate > curatedTrip.targetBudgetUsd && (
                      <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-3 text-[11px] text-rose-300 leading-normal font-medium animate-pulse">
                        ⚠️ Budget Overflow Sentinel Triggered. Calculated parameters exceed set target budget ceiling matrix limits.
                      </div>
                    )}
                  </div>

                  <button onClick={() => triggerToast("Dispatched bespoke structural blueprint matrix metadata parameters to executive desks.")} className="w-full bg-[#26A69A] hover:bg-[#26A69A]/90 text-white font-bold uppercase tracking-widest text-xs py-4 rounded-xl transition-all shadow-md"> Deploy Architecture </button>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 9: AUDIO-VISUAL GALLERY & REVIEWS */}
          <section className="max-w-7xl mx-auto px-6 py-24">
            <div className="mb-16 text-center">
              <span className="bg-[#1E88E5]/10 text-[#1E88E5] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">Documented Expedition Proof Ledgers</span>
              <h2 className="text-3xl font-semibold text-[#2D3748] tracking-tight mt-4">Cinematic Client Journeys & Reviews</h2>
              <p className="text-slate-500 text-sm mt-2">Unedited media stream arrays collected from verified returning enterprise tier delegates.</p>
              <div className="h-1 w-12 bg-[#1E88E5] mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mediaGallery.map((media) => (
                  <div key={media.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200/60 shadow-xs group flex flex-col justify-between">
                    <div className="relative aspect-video bg-slate-950 flex items-center justify-center">
                      {media.type === 'video' ? (
                        <video controls poster={media.thumbnail} className="w-full h-full object-cover">
                          <source src={media.src} type="video/mp4" />
                          Embedded system video stream context missing.
                        </video>
                      ) : (
                        <img src={media.src} alt={media.title} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="p-4 bg-white">
                      <span className="text-[10px] uppercase font-bold text-[#26A69A] tracking-wider block">📍 {media.location}</span>
                      <h4 className="font-semibold text-slate-800 text-xs mt-1 truncate group-hover:text-[#1E88E5] transition-colors">{media.title}</h4>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 lg:col-span-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-2">Corporate Client Review Index</span>
                {customerReviews.map((review) => (
                  <div key={review.id} className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-2xs space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <strong className="text-xs font-bold text-slate-800 block">{review.name}</strong>
                        <span className="text-[10px] text-[#1E88E5] font-medium">{review.role}</span>
                      </div>
                      <div className="flex space-x-0.5 text-amber-400 font-bold text-xs">
                        {Array.from({ length: review.rating }).map((_, i) => <span key={i}>★</span>)}
                      </div>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed italic">"{review.comment}"</p>
                  </div>
                ))}
              </div>

            </div>
          </section>

          <footer className="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800 text-xs">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="space-y-1 text-center md:text-left">
                <div className="text-white font-bold tracking-wider uppercase font-mono text-[11px]">ADVENTURAluxe Security Ecosystem</div>
                <p className="text-[11px] text-slate-500">Continuous carrier network validation architecture active under clearance credentials.</p>
              </div>
              <div className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">System Build Protocol: 2026.06.29 v4.2</div>
            </div>
          </footer>
        </>
      )}

      {/* --- REUSABLE FLOATING SUPPORT TERMINAL --- */}
      <div className={`fixed bottom-6 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transition-all duration-300 ${isChatOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'}`}>
        <div className="bg-[#1E88E5] text-white p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-xs font-bold uppercase tracking-wider">Corporate Logistics Deck</span>
          </div>
          <button onClick={() => setIsChatOpen(false)} className="text-white hover:text-blue-200 font-bold text-xs">✕</button>
        </div>
        <div className="p-4 h-48 overflow-y-auto bg-slate-50 space-y-3 text-[11px] leading-normal font-medium text-slate-600">
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">Welcome to the priority support routing queue dashboard terminal.</div>
          <div className="bg-blue-50/70 border border-blue-100 text-slate-700 p-2.5 rounded-xl">Our active reservation desks stand ready to process structural allocation blueprints immediately.</div>
        </div>
        <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
          <input type="text" placeholder="Formulate message payload..." className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:outline-none" />
          <button onClick={() => triggerToast("Support request payload channeled into operational triage streams.")} className="bg-[#1E88E5] text-white px-3 py-1 rounded-lg text-xs font-bold uppercase">Send</button>
        </div>
      </div>

      {/* DETAILED CHECKOUT MODAL SCREEN */}
      {selectedTour && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-slate-800 text-sm">GDS Booking Ledger Initialization</h3>
                <span className="text-[10px] text-slate-400 block mt-0.5">Asset Ref ID: #{selectedTour.id} / Platform Escrow Lock</span>
              </div>
              <span className="bg-blue-50 text-[#1E88E5] font-bold text-[9px] px-2 py-0.5 rounded uppercase tracking-wider">{selectedTour.tag}</span>
            </div>

            <div className="text-xs space-y-2 text-slate-600 font-medium">
              <div className="flex justify-between"><span className="text-slate-400">Target Expedition:</span> <span className="font-bold text-slate-800 text-right max-w-[65%] truncate">{selectedTour.title}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Geographic Hub:</span> <span className="font-bold text-slate-700">{selectedTour.location}</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Duration Allocation:</span> <span className="font-bold text-slate-700">{selectedTour.duration}</span></div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 space-y-1.5">
              <span className="text-[9px] uppercase tracking-wider text-[#718096] block font-bold">Locking Requirements</span>
              <div className="flex justify-between items-center text-xs text-[#2D3748]">
                <span>Immediate Multi-Currency Pricing:</span>
                <div>
                  <strong className="font-bold text-right block">{formatPrice(selectedTour.price)}</strong>
                  <CurrencyTooltip usdAmount={selectedTour.price} />
                </div>
              </div>
              <div className="flex justify-between items-center text-xs text-[#2D3748] pt-1 border-t border-slate-200/60">
                <span>Escrow Processing Fee:</span>
                <strong className="text-emerald-600 font-bold">Capped (0% Client Risk)</strong>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => setSelectedTour(null)} className="w-1/2 border border-slate-200 text-[#718096] hover:bg-slate-50 font-bold uppercase tracking-widest text-xs py-3.5 rounded-xl transition-all"> Cancel Checkout </button>
              <button onClick={() => alert('Voucher transmission initialized across global distribution networks.')} className="w-1/2 bg-[#1E88E5] hover:bg-[#1E88E5]/90 text-white font-bold uppercase tracking-widest text-xs py-3.5 rounded-xl transition-all shadow-md"> Authorize Settlement </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}