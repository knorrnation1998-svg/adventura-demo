'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// --- Global Mock Data ---
const EXCHANGE_RATES: Record<string, { symbol: string; rate: number }> = {
  USD: { symbol: '$', rate: 1 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 },
  NGN: { symbol: '₦', rate: 1500 },
};

const INSURANCES = [
  { id: 'none', title: 'No Protection', desc: 'Proceed without coverage plans', cost: 0 },
  { id: 'basic', title: 'Basic Plan', desc: 'Trip cancellation, medical emergency protection', cost: 25 },
  { id: 'standard', title: 'Standard Plan', desc: 'All Basic features + baggage delay protections', cost: 45 },
  { id: 'premium', title: 'Premium Plan', desc: 'All Standard + adventure sports & evacuation', cost: 75 },
];

export default function AdventuraCompleteDemo() {
  // --- Global State ---
  const [currency, setCurrency] = useState('USD');
  const [showToast, setShowToast] = useState<string | null>(null);

  // --- Interactive Booking State (07, 09, 10) ---
  const [travelers, setTravelers] = useState(2);
  const [insurance, setInsurance] = useState('none');
  const [seatsLeft, setSeatsLeft] = useState(5);

  // --- Calculations ---
  const basePricePerPerson = 1299;
  const currentRate = EXCHANGE_RATES[currency].rate;
  const currentSymbol = EXCHANGE_RATES[currency].symbol;
  const totalPriceUSD = (basePricePerPerson + INSURANCES.find(i => i.id === insurance)!.cost) * travelers;

  const formatPrice = (usdAmount: number) => {
    return `${currentSymbol}${Math.round(usdAmount * currentRate).toLocaleString()}`;
  };

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans">
      
      {/* Toast Notification Simulation */}
      {showToast && (
        <div className="fixed bottom-5 right-5 bg-teal-800 text-white px-6 py-3 rounded-xl shadow-lg z-50 flex items-center gap-2">
          <span>✨</span><p className="text-sm font-medium">{showToast}</p>
        </div>
      )}

      {/* FIXED DEMO CONTROL BAR */}
      <div className="bg-slate-900 text-white py-3 px-6 sticky top-0 z-50 flex flex-col sm:flex-row justify-between items-center gap-3 border-b border-teal-500">
        <div className="text-center sm:text-left">
          <span className="bg-teal-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase mr-2">Demo Mode</span>
          <span className="text-xs text-slate-300">Reviewing all 13 sections for approval.</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-bold uppercase">Toggle Demo Currency:</span>
          <div className="flex gap-1 bg-slate-800 p-1 rounded-lg">
            {Object.keys(EXCHANGE_RATES).map(curr => (
              <button key={curr} onClick={() => setCurrency(curr)} className={`px-2.5 py-1 text-xs font-black rounded-md transition-all ${currency === curr ? 'bg-teal-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}>
                {curr}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* HEADER / NAVIGATION */}
      <header className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-slate-900 tracking-tight">adventura</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-600">
            {['Home', 'Destinations', 'Tours & Trips', 'Services', 'About Us', 'Contact'].map(i => (
              <a key={i} href="#" className="hover:text-teal-700">{i}</a>
            ))}
          </nav>
          <button className="bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-lg">Plan My Trip</button>
        </div>
      </header>

      {/* SECTION 01: HERO HOME */}
      <section className="relative bg-slate-900 text-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <Image src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800" alt="Hero background" layout="fill" objectFit="cover" priority />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <span className="text-teal-400 text-xs font-bold uppercase tracking-widest block">Explore. Dream. Discover.</span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none">Your Adventure Awaits</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">Discover amazing places at exclusive deals and experience once in a life time adventure.</p>
          <button className="bg-teal-500 text-slate-950 font-bold px-8 py-3.5 rounded-xl text-sm shadow-md hover:bg-teal-400 transition-all">Explore Tours</button>
        </div>
      </section>

      {/* COMPACT MULTI-SECTION WRAPPER */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        
        {/* GRID FOR SECTIONS 02 & 03 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* SECTION 02: INTERACTIVE DESTINATION MAP */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
            <span className="absolute top-4 right-4 bg-slate-100 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded">02</span>
            <h4 className="font-bold text-lg mb-2">Interactive Destination Map</h4>
            <p className="text-xs text-slate-500 mb-4">Explore the world at a glance with cluster views of active tours.</p>
            <div className="aspect-video bg-sky-50 border border-sky-100 rounded-xl relative flex items-center justify-center overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe" alt="Abstract Map view placeholder" layout="fill" objectFit="cover" className="opacity-10" />
              <div className="absolute p-3 bg-white rounded-xl shadow-lg border border-slate-200 text-xs flex items-center gap-3 top-1/3 left-1/3 animate-bounce">
                <span className="text-base">🇨🇭</span>
                <div><p className="font-bold">Switzerland</p><p className="text-[10px] text-teal-600 font-medium">18 Tours Active</p></div>
              </div>
              <span className="text-xs text-slate-400 font-medium z-10">[Map API Integration Interface Placeholder]</span>
            </div>
          </div>

          {/* SECTION 03: SMART SEARCH & FILTERS */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative flex flex-col justify-between">
            <span className="absolute top-4 right-4 bg-slate-100 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded">03</span>
            <div>
              <h4 className="font-bold text-lg mb-1">Smart Search & Filters</h4>
              <p className="text-xs text-slate-500 mb-4">Find the perfect trip with adaptive, quick filters.</p>
              <div className="space-y-3">
                <input type="text" placeholder="Where to? (e.g. Switzerland)" className="w-full p-3 bg-slate-50 border rounded-xl text-xs font-medium" />
                <input type="text" placeholder="Dates (e.g. May 20 - May 27)" className="w-full p-3 bg-slate-50 border rounded-xl text-xs font-medium" />
                <select className="w-full p-3 bg-slate-50 border rounded-xl text-xs font-medium text-slate-600 bg-white"><option>Any Budget</option></select>
              </div>
            </div>
            <button onClick={() => triggerToast("🔍 Query filter executed on dummy catalog data.")} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 text-xs uppercase tracking-wider rounded-xl mt-4">Search Availability</button>
          </div>
        </div>

        {/* GRID FOR SECTIONS 04, 05 & 06 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* SECTION 04: TOURS & TRIPS BOOKING LIST */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative space-y-4">
            <span className="absolute top-4 right-4 bg-slate-100 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded">04</span>
            <h4 className="font-bold text-lg">Featured Group Tours</h4>
            <div className="space-y-3">
              {[
                { name: 'Swiss Alps Adventure', date: 'May 20 - May 27', price: 1299, seats: '5 left' },
                { name: 'Bali Group Escape', date: 'Jun 10 - Jun 17', price: 999, seats: '3 left' }
              ].map(t => (
                <div key={t.name} className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50/50">
                  <div>
                    <p className="font-bold text-xs text-slate-900">{t.name}</p>
                    <p className="text-[10px] text-slate-400">{t.date} · <span className="text-rose-600 font-semibold">{t.seats}</span></p>
                  </div>
                  <span className="font-extrabold text-sm text-teal-800">{formatPrice(t.price)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 05: ALL PLANNED & UPCOMING TRIPS */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative space-y-4">
            <span className="absolute top-4 right-4 bg-slate-100 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded">05</span>
            <h4 className="font-bold text-lg">My Trips Dashboard</h4>
            <div className="flex gap-2 border-b text-[10px] font-bold uppercase tracking-wider pb-2 text-slate-400">
              <span className="text-teal-700 border-b-2 border-teal-700 pb-2">Upcoming</span>
              <span>Completed</span>
            </div>
            <div className="p-3 bg-teal-50/40 border border-teal-100/50 rounded-xl flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-slate-900">Swiss Alps Adventure</p>
                <p className="text-[10px] text-slate-500">Starts in 15 days</p>
              </div>
              <span className="bg-teal-100 text-teal-800 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase">Confirmed</span>
            </div>
          </div>

          {/* SECTION 06: TRAVEL SERVICES PORTAL */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative space-y-3">
            <span className="absolute top-4 right-4 bg-slate-100 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded">06</span>
            <h4 className="font-bold text-lg">Ancillary Services</h4>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { icon: '✈️', label: 'Flight Booking' },
                { icon: '🏨', label: 'Hotel Res' },
                { icon: '🛂', label: 'Visa Assist' },
                { icon: '🚗', label: 'Airport Taxi' }
              ].map(s => (
                <div key={s.label} className="p-3 bg-slate-50 border rounded-xl flex items-center gap-2 hover:border-slate-300 cursor-pointer">
                  <span className="text-base">{s.icon}</span>
                  <span className="text-[11px] font-bold text-slate-700">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CORE INTERACTIVE MATRIX: SECTIONS 07, 08, 09, 10 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6">
          <div className="lg:col-span-2 space-y-8">
            {/* SECTION 09 & 08: RUNTIME SEAT COMPONENT */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs relative">
              <span className="absolute top-4 right-4 bg-slate-100 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded">09 & 08</span>
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                  <h3 className="text-xl font-bold">Real-Time Seat Reservation</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Flexible checkout payment solutions simulated below.</p>
                </div>
                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg border">
                  <button onClick={() => setTravelers(prev => Math.max(1, prev - 1))} className="w-8 h-8 rounded bg-white shadow-xs font-bold text-sm text-slate-600">-</button>
                  <span className="w-8 text-center font-bold text-sm">{travelers}</span>
                  <button onClick={() => setTravelers(prev => Math.min(seatsLeft, prev + 1))} className="w-8 h-8 rounded bg-white shadow-xs font-bold text-sm text-slate-600">+</button>
                </div>
              </div>
              <div className="mt-6 p-4 bg-rose-50 border border-rose-100 rounded-xl flex justify-between items-center text-xs">
                <span className="text-rose-600 font-bold animate-pulse">🛑 Only {seatsLeft} Seats Left!</span>
                <span className="text-slate-500 font-medium">Inventory State: Live Sync Active</span>
              </div>
            </div>

            {/* SECTION 10: INSURANCE PACKAGE SELECTOR */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs relative space-y-4">
              <span className="absolute top-4 right-4 bg-slate-100 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded">10</span>
              <h3 className="text-xl font-bold">Add Premium Insurance Packages</h3>
              <div className="space-y-2">
                {INSURANCES.map(plan => (
                  <label key={plan.id} className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${insurance === plan.id ? 'border-teal-600 bg-teal-50/40 ring-1 ring-teal-500' : 'border-slate-200 hover:border-slate-300'}`}>
                    <div className="flex gap-3 items-center">
                      <input type="radio" checked={insurance === plan.id} onChange={() => setInsurance(plan.id)} className="accent-teal-700 h-4 w-4" />
                      <div>
                        <p className="font-bold text-xs text-slate-900">{plan.title}</p>
                        <p className="text-[11px] text-slate-500">{plan.desc}</p>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-slate-700">{plan.cost === 0 ? 'Free' : `${formatPrice(plan.cost)}/person`}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 07: MULTI-CURRENCY PRICE DISPLAY COMPONENT */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg relative h-fit space-y-6">
            <span className="absolute top-4 right-4 bg-slate-100 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded">07</span>
            <h3 className="text-lg font-black tracking-tight text-slate-900">Dynamic Pricing Summary</h3>
            <div className="space-y-3 border-b pb-4 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Base Pack × {travelers}</span>
                <span className="font-bold text-slate-800">{formatPrice(basePricePerPerson * travelers)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Insurance Coverage</span>
                <span className="font-bold text-slate-800">{formatPrice(INSURANCES.find(i => i.id === insurance)!.cost * travelers)}</span>
              </div>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-bold text-slate-900 uppercase">Grand Total:</span>
              <span className="text-3xl font-black text-teal-800 tracking-tight">{formatPrice(totalPriceUSD)}</span>
            </div>
            <button onClick={() => triggerToast("🎉 Secure Booking Completed successfully!")} disabled={seatsLeft === 0} className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all">
              Proceed to Secure Booking
            </button>
          </div>
        </div>

        {/* SECTION 11: REVIEWS & SUCCESS STORIES */}
        <section className="bg-white p-8 rounded-2xl border border-slate-200 relative space-y-6">
          <span className="absolute top-4 right-4 bg-slate-100 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded">11</span>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Reviews & Success Stories</h3>
            <p className="text-xs text-slate-500">Real stories from our absolute global community travelers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-amber-400 text-sm mb-2">★★★★★</div>
              <p className="text-xs italic text-slate-600">"Adventura travels made our honeymoon absolutely magical. Everything from logistics to pricing options was modular and flawless."</p>
              <p className="text-[10px] font-bold text-slate-900 mt-3">— Jessica & Tom</p>
            </div>
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">Google Reviews Rating</p>
                <p className="text-2xl font-black text-slate-900 mt-1">4.8 / 5.0</p>
              </div>
              <span className="text-[10px] text-slate-400">Based on 2,340 genuine verified submissions.</span>
            </div>
          </div>
        </section>

        {/* SECTION 13: CUSTOM TRIP REQUEST COMPONENT */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 relative">
          <span className="absolute top-4 right-4 bg-slate-100 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded">13</span>
          
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h3 className="text-2xl font-black text-slate-900">Custom Trip Request Layout</h3>
              <p className="text-base font-bold text-teal-700">You Dream It, We Plan It.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Where would you like to go?" className="w-full p-3.5 border text-xs font-medium rounded-xl bg-slate-50" />
              <input type="text" placeholder="Duration (e.g., 7 Days)" className="w-full p-3.5 border text-xs font-medium rounded-xl bg-slate-50" />
              <textarea placeholder="Describe your trip details, requirements and preferences..." className="w-full sm:col-span-2 p-3.5 border text-xs font-medium rounded-xl bg-slate-50" rows={3}></textarea>
            </div>
            <button type="button" onClick={() => triggerToast("📨 Custom request template sent directly to agents dashboard.")} className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs uppercase tracking-wider px-8 py-3 rounded-xl">
              Submit Custom Request
            </button>
          </div>

          <div className="lg:col-span-1 bg-slate-900 text-white p-6 rounded-xl relative overflow-hidden flex flex-col justify-end min-h-[220px]">
            <div className="absolute inset-0 opacity-40">
              <Image src="https://images.unsplash.com/photo-1519681393784-d120267933ba" alt="Mountains visual accent card" layout="fill" objectFit="cover" />
            </div>
            <div className="relative z-10">
              <p className="text-xl font-black leading-tight">Your Journey,<br />Your Way.</p>
              <span className="text-[9px] text-teal-400 font-bold uppercase tracking-wider mt-1 block">100% Tailored Package</span>
            </div>
          </div>
        </div>

      </div>

      {/* SECTION 12: STAY CONNECTED / FOOTER FEATURE */}
      <footer className="bg-white border-t border-slate-200 relative">
        <span className="absolute top-4 right-4 bg-slate-100 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded">12</span>
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 sm:grid-cols-5 gap-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
          {['Best Price Guarantee', '24/7 Support', 'Trusted by Thousands', 'Secure Booking', 'ATOL Protected'].map(f => (
            <span key={f} className="p-2 bg-slate-50 rounded-lg border border-slate-100">{f}</span>
          ))}
        </div>
      </footer>

    </div>
  );
}