import React, { useState } from 'react';
import {
  Car,
  Bike,
  MapPin,
  Clock,
  Users,
  ShieldCheck,
  Phone,
  PlusCircle,
  Search,
  AlertTriangle,
  CheckCircle2,
  Navigation,
  Sparkles,
  UserCheck,
  X
} from 'lucide-react';

const INITIAL_RIDES = [
  {
    id: 1,
    driver: 'Karthik Varma',
    role: '3rd Year CSE • VITB',
    verified: true,
    vehicle: 'Bike',
    vehicleModel: 'Honda Shine (AP 37 DX 4821)',
    from: 'Bhimavaram Town Railway Station',
    to: 'VITB Main Gate (Vishnupur)',
    time: '08:30 AM',
    seats: 1,
    fare: 20,
    genderPref: 'Any',
    phone: '+91 98480 11223',
    notes: 'Stopping briefly near Prakasam Chowk. Extra helmet available.'
  },
  {
    id: 2,
    driver: 'Dr. S. Madhavi',
    role: 'Faculty • Dept. of Physics',
    verified: true,
    vehicle: 'Car',
    vehicleModel: 'Maruti Swift (AP 37 CP 9012)',
    from: 'Juvvalapalem Road / DNR Junction',
    to: 'VITB C-Block Parking',
    time: '08:40 AM',
    seats: 3,
    fare: 30,
    genderPref: 'Female Only',
    phone: '+91 94401 55678',
    notes: 'Daily morning commute. AC car, punctual departure.'
  },
  {
    id: 3,
    driver: 'Sai Teja',
    role: '2nd Year ECE • VITB',
    verified: true,
    vehicle: 'Bike',
    vehicleModel: 'Suzuki Access 125 (AP 37 ER 3310)',
    from: 'Undi Road / RTC Bus Complex',
    to: 'VITB Main Gate (Vishnupur)',
    time: '09:00 AM',
    seats: 1,
    fare: 15,
    genderPref: 'Any',
    phone: '+91 91210 44990',
    notes: 'Quick ride for 9:15 AM lab session.'
  },
  {
    id: 4,
    driver: 'Rohan & Team',
    role: '4th Year IT • VITB',
    verified: true,
    vehicle: 'Auto Share',
    vehicleModel: 'Piaggio Ape (Shared Auto)',
    from: 'VITB Main Gate',
    to: 'Bhimavaram Town / Somavaram',
    time: '04:30 PM',
    seats: 2,
    fare: 25,
    genderPref: 'Any',
    phone: '+91 99892 77341',
    notes: 'Splitting auto fare directly after last lecture.'
  }
];

const POPULAR_STOPS = [
  'VITB Main Gate (Vishnupur)',
  'Bhimavaram Town Railway Station',
  'RTC Bus Complex',
  'Prakasam Chowk',
  'Juvvalapalem Road',
  'Undi Road',
  'Tanuku Road Junction',
  'Somavaram'
];

export default function App() {
  const [activeTab, setActiveTab] = useState('find');
  const [rides, setRides] = useState(INITIAL_RIDES);
  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState('');
  const [vehicleFilter, setVehicleFilter] = useState('All');
  const [bookedIds, setBookedIds] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);
  const [sosOpen, setSosOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const [form, setForm] = useState({
    driver: '',
    role: '1st Year Student • VITB',
    vehicle: 'Bike',
    vehicleModel: '',
    from: 'Bhimavaram Town Railway Station',
    to: 'VITB Main Gate (Vishnupur)',
    time: '08:30 AM',
    seats: 1,
    fare: 20,
    genderPref: 'Any',
    phone: '',
    notes: ''
  });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const filteredRides = rides.filter((ride) => {
    const matchFrom =
      !searchFrom.trim() ||
      ride.from.toLowerCase().includes(searchFrom.toLowerCase());
    const matchTo =
      !searchTo.trim() ||
      ride.to.toLowerCase().includes(searchTo.toLowerCase());
    const matchVehicle =
      vehicleFilter === 'All' || ride.vehicle === vehicleFilter;
    return matchFrom && matchTo && matchVehicle;
  });

  const handleBookSeat = (ride) => {
    if (bookedIds.includes(ride.id)) {
      showToast('You already requested a seat on this ride.', 'info');
      return;
    }
    if (ride.seats <= 0) {
      showToast('No seats left on this ride.', 'error');
      return;
    }
    setRides((prev) =>
      prev.map((r) => (r.id === ride.id ? { ...r, seats: r.seats - 1 } : r))
    );
    setBookedIds((prev) => [...prev, ride.id]);
    setSelectedRide(ride);
    showToast('Seat reserved with ' + ride.driver + '!');
  };

  const handleOfferSubmit = (e) => {
    e.preventDefault();
    if (!form.driver.trim() || !form.phone.trim() || !form.vehicleModel.trim()) {
      showToast('Please enter your name, vehicle details, and phone number.', 'error');
      return;
    }
    const newRide = {
      id: Date.now(),
      driver: form.driver.trim(),
      role: form.role.trim() || 'Student • VITB',
      verified: true,
      vehicle: form.vehicle,
      vehicleModel: form.vehicleModel.trim(),
      from: form.from,
      to: form.to,
      time: form.time,
      seats: Number(form.seats),
      fare: Number(form.fare),
      genderPref: form.genderPref,
      phone: form.phone.trim(),
      notes: form.notes.trim() || 'VITB campus commute.'
    };
    setRides([newRide, ...rides]);
    setActiveTab('find');
    showToast('Your ride is now live for VITB commuters!');
    setForm({
      ...form,
      driver: '',
      vehicleModel: '',
      phone: '',
      notes: ''
    });
  };

  const getToastStyle = (type) => {
    if (type === 'error') {
      return 'bg-rose-600 text-white border-rose-500';
    }
    if (type === 'info') {
      return 'bg-slate-800 text-white border-slate-700';
    }
    return 'bg-emerald-600 text-white border-emerald-500';
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md">
          <div
            className={
              'px-4 py-3 rounded-2xl shadow-lg border flex items-center gap-3 text-sm font-medium ' +
              getToastStyle(toast.type)
            }
          >
            {toast.type === 'error' ? (
              <AlertTriangle className="w-5 h-5 shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 shrink-0" />
            )}
            <span className="flex-1">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-bold text-lg tracking-tight text-slate-900">
                  LiftBuddy
                </h1>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Bhimavaram
                </span>
              </div>
              <p className="text-xs text-slate-500">
                VITB Campus &amp; Town Ride-Sharing
              </p>
            </div>
          </div>

          <button
            onClick={() => setSosOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold hover:bg-rose-100 transition"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>SOS</span>
          </button>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 text-xs font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified VITB Students &amp; Staff Network</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
            Share Daily Rides Between Bhimavaram &amp; VITB
          </h2>
          <p className="text-indigo-100 text-sm mt-1.5 max-w-xl">
            Split fuel costs, skip crowded autos, and commute safely with verified college peers from Vishnupur, Railway Station, Undi Road, and Town.
          </p>

          {/* Navigation Switcher */}
          <div className="mt-5 grid grid-cols-2 gap-2 bg-indigo-900/40 p-1.5 rounded-2xl max-w-md">
            <button
              onClick={() => setActiveTab('find')}
              className={
                'py-2.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition ' +
                (activeTab === 'find'
                  ? 'bg-white text-indigo-700 shadow'
                  : 'text-indigo-100 hover:text-white')
              }
            >
              <Search className="w-4 h-4" />
              <span>Find a Lift</span>
            </button>
            <button
              onClick={() => setActiveTab('offer')}
              className={
                'py-2.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition ' +
                (activeTab === 'offer'
                  ? 'bg-white text-indigo-700 shadow'
                  : 'text-indigo-100 hover:text-white')
              }
            >
              <PlusCircle className="w-4 h-4" />
              <span>Offer a Lift</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 mt-6">
        {activeTab === 'find' ? (
          <div>
            {/* Search & Filters Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Pickup Point
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-indigo-600 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={searchFrom}
                      onChange={(e) => setSearchFrom(e.target.value)}
                      placeholder="e.g., Railway Station, Undi Road..."
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Drop Point
                  </label>
                  <div className="relative">
                    <Navigation className="w-4 h-4 text-emerald-600 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={searchTo}
                      onChange={(e) => setSearchTo(e.target.value)}
                      placeholder="e.g., VITB Main Gate, Town..."
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* Vehicle Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-100">
                <span className="text-xs font-semibold text-slate-500 mr-1">
                  Vehicle:
                </span>
                {['All', 'Bike', 'Car', 'Auto Share'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setVehicleFilter(type)}
                    className={
                      'px-3 py-1 rounded-full text-xs font-semibold transition ' +
                      (vehicleFilter === type
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200')
                    }
                  >
                    {type}
                  </button>
                ))}
                {(searchFrom || searchTo || vehicleFilter !== 'All') && (
                  <button
                    onClick={() => {
                      setSearchFrom('');
                      setSearchTo('');
                      setVehicleFilter('All');
                    }}
                    className="ml-auto text-xs font-semibold text-indigo-600 hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Available Rides List */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-800 text-base">
                Available Rides ({filteredRides.length})
              </h3>
              <span className="text-xs text-slate-500">
                Bhimavaram • Vishnupur
              </span>
            </div>

            {filteredRides.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
                <p className="font-semibold text-slate-700">
                  No matching rides found right now.
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Try clearing your filters or post your own ride under Offer a Lift.
                </p>
              </div>
            ) : (
              <div className="space-y-3.5">
                {filteredRides.map((ride) => {
                  const isBooked = bookedIds.includes(ride.id);
                  return (
                    <div
                      key={ride.id}
                      className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:border-indigo-300 transition"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-base shrink-0">
                            {ride.driver.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-bold text-slate-900">
                                {ride.driver}
                              </span>
                              {ride.verified && (
                                <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                  <ShieldCheck className="w-3 h-3" />
                                  VITB Verified
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500">{ride.role}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-lg font-extrabold text-indigo-700">
                            ₹{ride.fare}
                          </span>
                          <p className="text-[11px] text-slate-400">per seat</p>
                        </div>
                      </div>

                      {/* Route Details */}
                      <div className="mt-3.5 bg-slate-50 rounded-xl p-3 space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 shrink-0" />
                          <span className="font-medium text-slate-800">
                            {ride.from}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0" />
                          <span className="font-medium text-slate-800">
                            {ride.to}
                          </span>
                        </div>
                      </div>

                      {/* Tags & Meta */}
                      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                        <span className="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg font-medium">
                          <Clock className="w-3.5 h-3.5 text-indigo-600" />
                          {ride.time}
                        </span>
                        <span className="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg font-medium">
                          {ride.vehicle === 'Bike' ? (
                            <Bike className="w-3.5 h-3.5 text-indigo-600" />
                          ) : (
                            <Car className="w-3.5 h-3.5 text-indigo-600" />
                          )}
                          {ride.vehicleModel}
                        </span>
                        <span className="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg font-medium">
                          <Users className="w-3.5 h-3.5 text-indigo-600" />
                          {ride.seats} {ride.seats === 1 ? 'seat' : 'seats'} left
                        </span>
                        {ride.genderPref !== 'Any' && (
                          <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 border border-purple-200 px-2.5 py-1 rounded-lg font-semibold">
                            <UserCheck className="w-3.5 h-3.5" />
                            {ride.genderPref}
                          </span>
                        )}
                      </div>

                      {ride.notes && (
                        <p className="text-xs text-slate-500 mt-2.5 italic">
                          &ldquo;{ride.notes}&rdquo;
                        </p>
                      )}

                      {/* Action Footer */}
                      <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <a
                          href={'tel:' + ride.phone.replace(/\s+/g, '')}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 px-3 py-2 rounded-xl border border-slate-200"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Call Rider</span>
                        </a>

                        <button
                          onClick={() => handleBookSeat(ride)}
                          disabled={ride.seats === 0 && !isBooked}
                          className={
                            'px-4 py-2 rounded-xl text-xs font-bold transition ' +
                            (isBooked
                              ? 'bg-emerald-600 text-white'
                              : ride.seats === 0
                              ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                              : 'bg-indigo-600 text-white hover:bg-indigo-700')
                          }
                        >
                          {isBooked
                            ? 'Seat Reserved ✓'
                            : ride.seats === 0
                            ? 'Full'
                            : 'Request Seat'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* Offer a Lift Form */
          <form
            onSubmit={handleOfferSubmit}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4"
          >
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Post Your Daily Commute
              </h3>
              <p className="text-xs text-slate-500">
                Share an empty pillion or car seat with fellow VITB students and faculty.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.driver}
                  onChange={(e) => setForm({ ...form, driver: e.target.value })}
                  placeholder="e.g., Akash Reddy"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Department / Year
                </label>
                <input
                  type="text"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  placeholder="e.g., 1st Year CSE • VITB"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pickup Stop
                </label>
                <select
                  value={form.from}
                  onChange={(e) => setForm({ ...form, from: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-indigo-500"
                >
                  {POPULAR_STOPS.map((stop) => (
                    <option key={stop} value={stop}>
                      {stop}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Drop Stop
                </label>
                <select
                  value={form.to}
                  onChange={(e) => setForm({ ...form, to: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-indigo-500"
                >
                  {POPULAR_STOPS.map((stop) => (
                    <option key={stop} value={stop}>
                      {stop}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Vehicle Type
                </label>
                <select
                  value={form.vehicle}
                  onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Bike">Bike / Scooter</option>
                  <option value="Car">Car</option>
                  <option value="Auto Share">Auto Share</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Vehicle Model &amp; Plate *
                </label>
                <input
                  type="text"
                  required
                  value={form.vehicleModel}
                  onChange={(e) =>
                    setForm({ ...form, vehicleModel: e.target.value })
                  }
                  placeholder="e.g., Access 125 (AP 37 XX 1234)"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Departure Time
                </label>
                <input
                  type="text"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  placeholder="e.g., 08:30 AM"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Seats
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={form.seats}
                    onChange={(e) => setForm({ ...form, seats: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Fuel Share (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="200"
                    value={form.fare}
                    onChange={(e) => setForm({ ...form, fare: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 98480 XXXXX"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Co-Rider Preference
                </label>
                <select
                  value={form.genderPref}
                  onChange={(e) =>
                    setForm({ ...form, genderPref: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Any">Any VITB Member</option>
                  <option value="Female Only">Female Only</option>
                  <option value="Male Only">Male Only</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Landmark / Helmet Note
              </label>
              <input
                type="text"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="e.g., Waiting near SBI ATM, bringing extra helmet."
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition shadow-sm"
            >
              Publish Ride Now
            </button>
          </form>
        )}
      </main>

      {/* Booking Confirmation Modal */}
      {selectedRide && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                <CheckCircle2 className="w-4 h-4" />
                Seat Confirmed
              </span>
              <button
                onClick={() => setSelectedRide(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <h4 className="text-lg font-bold text-slate-900">
              Ride with {selectedRide.driver}
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              {selectedRide.vehicleModel}
            </p>
            <div className="mt-3 bg-slate-50 rounded-xl p-3 text-xs space-y-1.5 text-slate-700">
              <p>
                <strong>Pickup:</strong> {selectedRide.from} ({selectedRide.time})
              </p>
              <p>
                <strong>Drop:</strong> {selectedRide.to}
              </p>
              <p>
                <strong>Fuel Share:</strong> ₹{selectedRide.fare} (Pay via UPI/Cash)
              </p>
            </div>
            <div className="mt-4 flex gap-2">
              <a
                href={'tel:' + selectedRide.phone.replace(/\s+/g, '')}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold text-center"
              >
                Call {selectedRide.phone}
              </a>
              <button
                onClick={() => setSelectedRide(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SOS Safety Modal */}
      {sosOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-xl border-2 border-rose-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-rose-600 font-bold">
                <AlertTriangle className="w-5 h-5" />
                <span>Emergency &amp; Campus Safety</span>
              </div>
              <button
                onClick={() => setSosOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-600 mb-4">
              Quick-dial emergency services in Bhimavaram or share your live trip details immediately.
            </p>
            <div className="space-y-2 text-xs">
              <a
                href="tel:112"
                className="block w-full py-2.5 px-3 rounded-xl bg-rose-600 text-white font-bold text-center"
              >
                Call National Emergency (112)
              </a>
              <a
                href="tel:100"
                className="block w-full py-2.5 px-3 rounded-xl bg-slate-100 text-slate-800 font-semibold text-center"
              >
                Bhimavaram Police Control (100)
              </a>
              <a
                href="tel:108"
                className="block w-full py-2.5 px-3 rounded-xl bg-slate-100 text-slate-800 font-semibold text-center"
              >
                Ambulance Service (108)
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}