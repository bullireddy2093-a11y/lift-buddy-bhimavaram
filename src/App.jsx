```react
import React, { useState, useEffect, useMemo } from 'react';
import {
  Car,
  Search,
  PlusCircle,
  Calendar,
  MapPin,
  ShieldCheck,
  ShieldAlert,
  User,
  Phone,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Star,
  Share2,
  Flag,
  Ban,
  Trash2,
  FileText,
  Camera,
  Upload,
  Lock,
  Eye,
  EyeOff,
  ChevronRight,
  ArrowLeft,
  Navigation,
  Users,
  Sparkles,
  RefreshCw,
  LogOut,
  Check,
  Info,
  Award,
  Bike,
  SlidersHorizontal
} from 'lucide-react';

// ============================================================================
// INITIAL SEED DATA (Mirroring Relational Schema: users, driver_documents,
// vehicles, trips, ride_requests, ratings, reports)
// ============================================================================

const BHIMAVARAM_LOCATIONS = [
  'Vishnu Institute of Technology (Kovvada)',
  'Bhimavaram Town Railway Station',
  'Undi Road Junction',
  'PP Road (Prakasam Chowk)',
  'DNR College Campus',
  'SRKR Engineering College',
  'Juvvalapalem Road',
  'Tanuku Bypass Junction',
  'Bhimavaram Bus Complex',
  'ASR Nagar'
];

const TODAY_STR = new Date().toISOString().split('T')[0];
const TOMORROW_STR = new Date(Date.now() + 86400000).toISOString().split('T')[0];

const INITIAL_DB = {
  users: [
    {
      id: 'u_demo',
      name: 'Karthik Varma',
      phone: '+91 98480 12345',
      role: 'driver', // 'rider' | 'driver' | 'admin'
      affiliation: 'VITB CSE 3rd Year',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Karthik&backgroundColor=b6e3f4',
      verified: false,
      verificationStatus: 'unverified', // 'unverified' | 'pending_admin' | 'verified' | 'rejected'
      studentIdUploaded: true,
      blocked: false,
      rating: 4.8,
      ratingCount: 12,
      emergencyContact: {
        name: 'Suresh Varma (Father)',
        phone: '+91 98480 54321'
      },
      privacyConsent: true,
      createdAt: '2026-10-12'
    },
    {
      id: 'u_ravi',
      name: 'Dr. Ravi Teja',
      phone: '+91 94401 77889',
      role: 'driver',
      affiliation: 'VITB Assoc. Professor (ECE)',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RaviTeja&backgroundColor=c0aede',
      verified: true,
      verificationStatus: 'verified',
      studentIdUploaded: false,
      blocked: false,
      rating: 4.95,
      ratingCount: 38,
      emergencyContact: {
        name: 'Padma Teja',
        phone: '+91 94401 77890'
      },
      privacyConsent: true,
      createdAt: '2026-08-05'
    },
    {
      id: 'u_sneha',
      name: 'Sneha Reddy',
      phone: '+91 91234 56780',
      role: 'driver',
      affiliation: 'VITB IT 4th Year',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha&backgroundColor=ffdfbf',
      verified: true,
      verificationStatus: 'verified',
      studentIdUploaded: true,
      blocked: false,
      rating: 4.9,
      ratingCount: 24,
      emergencyContact: {
        name: 'Anitha Reddy',
        phone: '+91 91234 56789'
      },
      privacyConsent: true,
      createdAt: '2026-09-01'
    },
    {
      id: 'u_praveen',
      name: 'Praveen Kumar',
      phone: '+91 99887 66554',
      role: 'driver',
      affiliation: 'VITB Mechanical 2nd Year',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Praveen&backgroundColor=d1d4f9',
      verified: false,
      verificationStatus: 'pending_admin',
      studentIdUploaded: true,
      blocked: false,
      rating: 4.5,
      ratingCount: 4,
      emergencyContact: {
        name: 'Ramesh Kumar',
        phone: '+91 99887 66550'
      },
      privacyConsent: true,
      createdAt: '2026-11-18'
    },
    {
      id: 'u_ananya',
      name: 'Ananya Rao',
      phone: '+91 90001 22334',
      role: 'rider',
      affiliation: 'VITB AI&DS 2nd Year',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya&backgroundColor=ffd5dc',
      verified: true,
      verificationStatus: 'verified',
      studentIdUploaded: true,
      blocked: false,
      rating: 5.0,
      ratingCount: 9,
      emergencyContact: {
        name: 'Kiran Rao',
        phone: '+91 90001 22335'
      },
      privacyConsent: true,
      createdAt: '2026-09-15'
    },
    {
      id: 'u_admin',
      name: 'VITB Campus Safety Admin',
      phone: '+91 88162 50864',
      role: 'admin',
      affiliation: 'Bhimavaram Moderation Team',
      photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AdminVITB&backgroundColor=b6e3f4',
      verified: true,
      verificationStatus: 'verified',
      studentIdUploaded: false,
      blocked: false,
      rating: 5.0,
      ratingCount: 1,
      emergencyContact: {
        name: 'VITB Security Control Room',
        phone: '+91 88162 50864'
      },
      privacyConsent: true,
      createdAt: '2026-01-01'
    }
  ],
  vehicles: [
    {
      id: 'v_1',
      userId: 'u_ravi',
      type: 'Car',
      model: 'Maruti Suzuki Swift (White)',
      plateNumber: 'AP 37 DQ 4512',
      seats: 4
    },
    {
      id: 'v_2',
      userId: 'u_sneha',
      type: 'Scooter',
      model: 'Honda Activa 6G (Matte Grey)',
      plateNumber: 'AP 37 EF 8921',
      seats: 1
    },
    {
      id: 'v_3',
      userId: 'u_praveen',
      type: 'Bike',
      model: 'Royal Enfield Classic 350',
      plateNumber: 'AP 37 CX 1109',
      seats: 1
    }
  ],
  driver_documents: [
    {
      id: 'doc_praveen',
      userId: 'u_praveen',
      dlNumber: 'AP03720230041982',
      extractedName: 'PRAVEEN K.',
      expiryDate: '2043-06-14',
      nameMatchScore: 84,
      faceMatchScore: 76,
      flagReason: 'Name abbreviation ("PRAVEEN K." vs "Praveen Kumar") & low selfie lighting (76% confidence)',
      dlImageLabel: 'DL_AP0372023_Front.jpg [Encrypted Private Vault]',
      rcImageLabel: 'RC_AP37CX1109.jpg [Encrypted Private Vault]',
      selfieImageLabel: 'LiveSelfie_20261118.jpg [Encrypted Private Vault]',
      submittedAt: '2026-11-18 16:40',
      status: 'pending'
    }
  ],
  trips: [
    {
      id: 't_101',
      driverId: 'u_ravi',
      vehicleId: 'v_1',
      from: 'Bhimavaram Town Railway Station',
      to: 'Vishnu Institute of Technology (Kovvada)',
      date: TODAY_STR,
      time: '08:30',
      totalSeats: 3,
      availableSeats: 2,
      fuelShare: 40,
      notes: 'Passing via Undi Road Junction & PP Road. Punctual departure after Circar Express arrival.',
      status: 'scheduled'
    },
    {
      id: 't_102',
      driverId: 'u_sneha',
      vehicleId: 'v_2',
      from: 'Undi Road Junction',
      to: 'Vishnu Institute of Technology (Kovvada)',
      date: TODAY_STR,
      time: '08:45',
      totalSeats: 1,
      availableSeats: 1,
      fuelShare: 20,
      notes: 'Spare ISI helmet available for pillion rider. Female students preferred.',
      status: 'scheduled'
    },
    {
      id: 't_103',
      driverId: 'u_ravi',
      vehicleId: 'v_1',
      from: 'Vishnu Institute of Technology (Kovvada)',
      to: 'PP Road (Prakasam Chowk)',
      date: TODAY_STR,
      time: '17:15',
      totalSeats: 3,
      availableSeats: 3,
      fuelShare: 35,
      notes: 'Evening return after college hours. Can drop near DNR College or Town Station.',
      status: 'scheduled'
    },
    {
      id: 't_104',
      driverId: 'u_sneha',
      vehicleId: 'v_2',
      from: 'SRKR Engineering College',
      to: 'Bhimavaram Town Railway Station',
      date: TOMORROW_STR,
      time: '18:00',
      totalSeats: 1,
      availableSeats: 1,
      fuelShare: 25,
      notes: 'Heading to railway station via Juvvalapalem Road.',
      status: 'scheduled'
    }
  ],
  ride_requests: [
    {
      id: 'req_1',
      tripId: 't_101',
      riderId: 'u_ananya',
      pickupPoint: 'Undi Road Junction (Near SBI ATM)',
      status: 'accepted', // 'requested' | 'accepted' | 'started' | 'completed' | 'cancelled' | 'rejected'
      rated: false,
      createdAt: '2026-11-22 07:15'
    }
  ],
  ratings: [
    {
      id: 'rat_1',
      tripId: 't_101',
      fromUserId: 'u_ananya',
      toUserId: 'u_ravi',
      score: 5,
      comment: 'Very safe driving and right on time for morning lab!',
      createdAt: '2026-11-20'
    }
  ],
  reports: [
    {
      id: 'rep_1',
      reporterId: 'u_ananya',
      reportedUserId: 'u_praveen',
      tripId: 't_102',
      reason: 'Asked to negotiate fare outside app guidelines',
      status: 'open', // 'open' | 'resolved'
      createdAt: '2026-11-19'
    }
  ]
};

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================

export default function App() {
  // Persistent Database State
  const [db, setDb] = useState(() => {
    try {
      const saved = localStorage.getItem('liftbuddy_bvrm_db_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load state from localStorage', e);
    }
    return INITIAL_DB;
  });

  useEffect(() => {
    try {
      localStorage.setItem('liftbuddy_bvrm_db_v1', JSON.stringify(db));
    } catch (e) {
      console.error('Failed to save state', e);
    }
  }, [db]);

  // Auth & Active Session State
  const [currentUserId, setCurrentUserId] = useState('u_demo');
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Navigation State ('home' | 'search' | 'trip_details' | 'post' | 'my_trips' | 'profile' | 'verification' | 'admin')
  const [activePage, setActivePage] = useState('home');
  const [selectedTripId, setSelectedTripId] = useState(null);

  // Search Filters
  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState('');
  const [searchDate, setSearchDate] = useState('');

  // Global UI Modals & Toast Notifications
  const [showSosModal, setShowSosModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const currentUser = useMemo(
    () => db.users.find((u) => u.id === currentUserId) || db.users[0],
    [db.users, currentUserId]
  );

  const pendingVerificationsCount = useMemo(
    () => db.driver_documents.filter((d) => d.status === 'pending').length,
    [db.driver_documents]
  );

  const openReportsCount = useMemo(
    () => db.reports.filter((r) => r.status === 'open').length,
    [db.reports]
  );

  const handleResetDemo = () => {
    setDb(INITIAL_DB);
    setCurrentUserId('u_demo');
    setIsAuthenticated(true);
    setActivePage('home');
    showToast('Demo data reset to fresh Bhimavaram state!', 'info');
  };

  // Helper to navigate cleanly
  const navigateTo = (page, tripId = null) => {
    if (tripId) setSelectedTripId(tripId);
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ==========================================================================
  // RENDER: HEADER & EMERGENCY SOS
  // ==========================================================================

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col pb-20 md:pb-8">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md animate-fade-in">
          <div
            className={`px-4 py-3 {' items-center gap-3 text-sm font-medium ${
              toast.type === 'error'
                ? 'bg-rose-600 text-white border-rose-500'
                : toast.type === 'info'
                ? 'bg-slate-800 text-white border-slate-700'
                : 'bg-emerald-600 text-white border-emerald-500'
            }`}
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

      {/* Top Sticky App Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between gap-2">
          {/* Brand Logo */}
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2 text-left focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-sm">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 leading-tight text-base tracking-tight flex items-center gap-1">
                LiftBuddy
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  BVRM
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-none">VITB & Bhimavaram</p>
            </div>
          </button>

          {/* Right Controls: Quick Role Switcher + SOS Button */}
          <div className="flex items-center gap-2">
            {/* Demo Account Switcher for Easy Testing */}
            <div className="hidden sm:flex items-center bg-slate-100 rounded-xl p-1 text-xs">
              <button
                onClick={() => {
                  setCurrentUserId('u_demo');
                  setIsAuthenticated(true);
                  showToast('Switched to Karthik (Student / Unverified Driver)', 'info');
                }}
                className={`px-2 py-1 rounded-lg font-medium transition ${
                  currentUserId === 'u_demo'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Student
              </button>
              <button
                onClick={() => {
                  setCurrentUserId('u_ravi');
                  setIsAuthenticated(true);
                  showToast('Switched to Dr. Ravi Teja (Verified Driver)', 'info');
                }}
                className={`px-2 py-1 rounded-lg font-medium transition ${
                  currentUserId === 'u_ravi'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Verified Driver
              </button>
              <button
                onClick={() => {
                  setCurrentUserId('u_admin');
                  setIsAuthenticated(true);
                  navigateTo('admin');
                  showToast('Switched to Campus Safety Admin', 'info');
                }}
                className={`px-2 py-1 rounded-lg font-medium transition flex items-center gap-1 ${
                  currentUserId === 'u_admin' || activePage === 'admin'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Admin
                {(pendingVerificationsCount > 0 || openReportsCount > 0) && (
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                )}
              </button>
            </div>

            {/* Admin Quick Pill on Mobile */}
            <button
              onClick={() => navigateTo('admin')}
              className={`sm:hidden px-2.5 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1 ${
                activePage === 'admin'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}
              title="Admin Review Queue"
            >
              Admin
              {pendingVerificationsCount + openReportsCount > 0 && (
                <span className="px-1.5 py-0.2 bg-amber-500 text-white rounded-full text-[10px]">
                  {pendingVerificationsCount + openReportsCount}
                </span>
              )}
            </button>

            {/* Persistent Emergency SOS Button */}
            <button
              onClick={() => setShowSosModal(true)}
              className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition"
              aria-label="Emergency SOS"
            >
              <AlertTriangle className="w-4 h-4 animate-pulse" />
              <span>SOS</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 pt-4 pb-6">
        {currentUser?.blocked ? (
          <BlockedAccountView onReset={handleResetDemo} />
        ) : (
          <>
            {activePage === 'home' && (
              <HomePage
                db={db}
                currentUser={currentUser}
                searchFrom={searchFrom}
                setSearchFrom={setSearchFrom}
                searchTo={searchTo}
                setSearchTo={setSearchTo}
                searchDate={searchDate}
                setSearchDate={setSearchDate}
                onSearch={() => navigateTo('search')}
                onOfferRide={() => navigateTo('post')}
                onSelectTrip={(id) => navigateTo('trip_details', id)}
                onOpenVerification={() => navigateTo('verification')}
              />
            )}

            {activePage === 'search' && (
              <SearchResultsPage
                db={db}
                searchFrom={searchFrom}
                setSearchFrom={setSearchFrom}
                searchTo={searchTo}
                setSearchTo={setSearchTo}
                searchDate={searchDate}
                setSearchDate={setSearchDate}
                onSelectTrip={(id) => navigateTo('trip_details', id)}
                onBack={() => navigateTo('home')}
              />
            )}

            {activePage === 'trip_details' && (
              <TripDetailsPage
                db={db}
                setDb={setDb}
                tripId={selectedTripId}
                currentUser={currentUser}
                isAuthenticated={isAuthenticated}
                onRequireAuth={() => setShowAuthModal(true)}
                onBack={() => navigateTo('search')}
                onOpenSos={() => setShowSosModal(true)}
                showToast={showToast}
                onGoMyTrips={() => navigateTo('my_trips')}
              />
            )}

            {activePage === 'post' && (
              <PostTripPage
                db={db}
                setDb={setDb}
                currentUser={currentUser}
                onGoVerification={() => navigateTo('verification')}
                onTripCreated={() => navigateTo('my_trips')}
                showToast={showToast}
              />
            )}

            {activePage === 'my_trips' && (
              <MyTripsPage
                db={db}
                setDb={setDb}
                currentUser={currentUser}
                showToast={showToast}
                onSelectTrip={(id) => navigateTo('trip_details', id)}
                onOfferRide={() => navigateTo('post')}
                onSearchRides={() => navigateTo('search')}
              />
            )}

            {activePage === 'verification' && (
              <VerificationPage
                db={db}
                setDb={setDb}
                currentUser={currentUser}
                showToast={showToast}
                onGoPostTrip={() => navigateTo('post')}
                onGoAdmin={() => navigateTo('admin')}
              />
            )}

            {activePage === 'profile' && (
              <ProfilePage
                db={db}
                setDb={setDb}
                currentUser={currentUser}
                setCurrentUserId={setCurrentUserId}
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                onOpenAuthModal={() => setShowAuthModal(true)}
                onGoVerification={() => navigateTo('verification')}
                onResetDemo={handleResetDemo}
                showToast={showToast}
              />
            )}

            {activePage === 'admin' && (
              <AdminDashboardPage
                db={db}
                setDb={setDb}
                showToast={showToast}
                onBackHome={() => navigateTo('home')}
              />
            )}
          </>
        )}
      </main>

      {/* Bottom Mobile Navigation Bar */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-200 px-2 py-1.5 shadow-lg">
        <div className="max-w-3xl mx-auto grid grid-cols-5 gap-1">
          <NavButton
            icon={<Search className="w-5 h-5" />}
            label="Find Ride"
            active={activePage === 'home' || activePage === 'search' || activePage === 'trip_details'}
            onClick={() => navigateTo('home')}
          />
          <NavButton
            icon={<PlusCircle className="w-5 h-5" />}
            label="Offer Ride"
            active={activePage === 'post'}
            onClick={() => navigateTo('post')}
          />
          <NavButton
            icon={<Navigation className="w-5 h-5" />}
            label="My Trips"
            active={activePage === 'my_trips'}
            onClick={() => navigateTo('my_trips')}
          />
          <NavButton
            icon={<ShieldCheck className="w-5 h-5" />}
            label="Verify"
            badge={!currentUser?.verified ? '!' : null}
            active={activePage === 'verification'}
            onClick={() => navigateTo('verification')}
          />
          <NavButton
            icon={<User className="w-5 h-5" />}
            label="Profile"
            active={activePage === 'profile'}
            onClick={() => navigateTo('profile')}
          />
        </div>
      </nav>

      {/* Emergency SOS Modal */}
      {showSosModal && (
        <SosModal
          currentUser={currentUser}
          onClose={() => setShowSosModal(false)}
          showToast={showToast}
        />
      )}

      {/* Phone OTP Sign Up / Login Modal */}
      {showAuthModal && (
        <OtpAuthModal
          db={db}
          setDb={setDb}
          setCurrentUserId={setCurrentUserId}
          setIsAuthenticated={setIsAuthenticated}
          onClose={() => setShowAuthModal(false)}
          showToast={showToast}
        />
      )}
    </div>
  );
}

// ============================================================================
// SUB-COMPONENTS & PAGES
// ============================================================================

function NavButton({ icon, label, active, onClick, badge }) {
  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition ${
        active
          ? 'text-emerald-700 bg-emerald-50 font-semibold'
          : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
      }`}
    >
      <div className="relative">
        {icon}
        {badge && (
          <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">
            {badge}
          </span>
        )}
      </div>
      <span className="text-[11px] mt-0.5 leading-tight">{label}</span>
    </button>
  );
}

// ----------------------------------------------------------------------------
// 1. HOME PAGE
// ----------------------------------------------------------------------------
function HomePage({
  db,
  currentUser,
  searchFrom,
  setSearchFrom,
  searchTo,
  setSearchTo,
  searchDate,
  setSearchDate,
  onSearch,
  onOfferRide,
  onSelectTrip,
  onOpenVerification
}) {
  const upcomingTrips = db.trips.filter((t) => t.status === 'scheduled' && t.availableSeats > 0);

  const applyQuickRoute = (from, to) => {
    setSearchFrom(from);
    setSearchTo(to);
    onSearch();
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner & Search Card */}
      <section className="rounded-3xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-900 text-white p-5 sm:p-7 shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-emerald-100 text-xs font-medium mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>Verified VITB & Bhimavaram Community</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
            Share your daily commute across Bhimavaram.
          </h1>
          <p className="text-emerald-100 text-sm mt-1.5 max-w-lg">
            Safe, verified carpools & bike lifts for Vishnu Institute of Technology students, faculty, and local commuters.
          </p>

          {/* Search Form */}
          <div className="mt-5 bg-white text-slate-900 rounded-2xl p-4 shadow-xl space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  From (Pickup Area)
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-emerald-600 absolute left-3 top-3" />
                  <input
                    list="bvrm-locations"
                    value={searchFrom}
                    onChange={(e) => setSearchFrom(e.target.value)}
                    placeholder="e.g., Town Railway Station"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  To (Destination)
                </label>
                <div className="relative">
                  <Navigation className="w-4 h-4 text-teal-600 absolute left-3 top-3" />
                  <input
                    list="bvrm-locations"
                    value={searchTo}
                    onChange={(e) => setSearchTo(e.target.value)}
                    placeholder="e.g., Vishnu Institute (Kovvada)"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            <datalist id="bvrm-locations">
              {BHIMAVARAM_LOCATIONS.map((loc) => (
                <option key={loc} value={loc} />
              ))}
            </datalist>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Travel Date (Optional)
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="date"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <button
                onClick={onSearch}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition"
              >
                <Search className="w-4 h-4" />
                <span>Search Available Lifts</span>
              </button>
            </div>
          </div>

          {/* Secondary Action: Offer a Ride */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/15">
            <div className="text-xs text-emerald-100">
              Driving to VITB or Town with a spare seat?
            </div>
            <button
              onClick={onOfferRide}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm shadow-sm flex items-center gap-1.5 transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Offer a Ride</span>
            </button>
          </div>
        </div>
      </section>

      {/* Verification Status Callout if Unverified */}
      {!currentUser?.verified && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-950">
                Complete Driver or Student Verification
              </h3>
              <p className="text-xs text-amber-800 mt-0.5">
                {currentUser.verificationStatus === 'pending_admin'
                  ? 'Your documents are currently in the Admin review queue.'
                  : 'Verify your Driving Licence & Selfie to post trips, or upload your VITB ID for a trusted badge.'}
              </p>
            </div>
          </div>
          <button
            onClick={onOpenVerification}
            className="px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shrink-0"
          >
            Verify Now
          </button>
        </div>
      )}

      {/* Popular Bhimavaram Commute Corridors */}
      <section>
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Popular VITB & Town Routes
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            {
              from: 'Bhimavaram Town Railway Station',
              to: 'Vishnu Institute of Technology (Kovvada)',
              tag: 'Morning Train Rush'
            },
            {
              from: 'Undi Road Junction',
              to: 'Vishnu Institute of Technology (Kovvada)',
              tag: '5 min to Campus'
            },
            {
              from: 'Vishnu Institute of Technology (Kovvada)',
              to: 'PP Road (Prakasam Chowk)',
              tag: 'Evening Return'
            },
            {
              from: 'SRKR Engineering College',
              to: 'Bhimavaram Town Railway Station',
              tag: 'Inter-Campus'
            }
          ].map((route, idx) => (
            <button
              key={idx}
              onClick={() => applyQuickRoute(route.from, route.to)}
              className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 text-left transition shadow-2xs flex items-center justify-between gap-2 group"
            >
              <div className="min-w-0">
                <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 mb-1">
                  {route.tag}
                </span>
                <p className="text-xs font-bold text-slate-800 truncate">{route.from}</p>
                <p className="text-xs text-slate-500 truncate">→ {route.to}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 shrink-0" />
            </button>
          ))}
        </div>
      </section>

      {/* Upcoming Live Trips Feed */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-slate-900">
            Upcoming Verified Lifts ({upcomingTrips.length})
          </h2>
          <button
            onClick={onSearch}
            className="text-xs font-semibold text-emerald-700 hover:underline"
          >
            View All
          </button>
        </div>
        <div className="space-y-3">
          {upcomingTrips.slice(0, 3).map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              db={db}
              onClick={() => onSelectTrip(trip.id)}
            />
          ))}
        </div>
      </section>

      {/* Trust & Privacy Assurance Footer */}
      <section className="rounded-2xl bg-slate-100 border border-slate-200 p-4 flex items-start gap-3">
        <Lock className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 space-y-1">
          <p className="font-bold text-slate-800">Privacy-First Campus Carpooling</p>
          <p>
            Driver licences, RC books, and selfies are encrypted in private storage and{' '}
            <span className="font-semibold text-slate-800">never shown to other users</span>. Only
            a Verified badge, name, and profile photo are shared.
          </p>
        </div>
      </section>
    </div>
  );
}

// ----------------------------------------------------------------------------
// 2. SEARCH RESULTS PAGE
// ----------------------------------------------------------------------------
function SearchResultsPage({
  db,
  searchFrom,
  setSearchFrom,
  searchTo,
  setSearchTo,
  searchDate,
  setSearchDate,
  onSelectTrip,
  onBack
}) {
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const filteredTrips = useMemo(() => {
    return db.trips.filter((trip) => {
      if (trip.status !== 'scheduled' || trip.availableSeats <= 0) return false;
      const driver = db.users.find((u) => u.id === trip.driverId);
      if (!driver || driver.blocked) return false;
      if (verifiedOnly && !driver.verified) return false;

      if (
        searchFrom.trim() &&
        !trip.from.toLowerCase().includes(searchFrom.trim().toLowerCase()) &&
        !trip.notes.toLowerCase().includes(searchFrom.trim().toLowerCase())
      ) {
        return false;
      }

      if (
        searchTo.trim() &&
        !trip.to.toLowerCase().includes(searchTo.trim().toLowerCase()) &&
        !trip.notes.toLowerCase().includes(searchTo.trim().toLowerCase())
      ) {
        return false;
      }

      if (searchDate && trip.date !== searchDate) {
        return false;
      }

      return true;
    });
  }, [db, searchFrom, searchTo, searchDate, verifiedOnly]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-slate-900">Available Lifts</h1>
          <p className="text-xs text-slate-500">
            Showing {filteredTrips.length} matching trip{filteredTrips.length === 1 ? '' : 's'} in Bhimavaram
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-3.5 space-y-3 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <input
            list="bvrm-locations"
            value={searchFrom}
            onChange={(e) => setSearchFrom(e.target.value)}
            placeholder="From location..."
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <input
            list="bvrm-locations"
            value={searchTo}
            onChange={(e) => setSearchTo(e.target.value)}
            placeholder="To destination..."
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <div className="flex gap-2">
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {(searchFrom || searchTo || searchDate) && (
              <button
                onClick={() => {
                  setSearchFrom('');
                  setSearchTo('');
                  setSearchDate('');
                }}
                className="px-2.5 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-semibold hover:bg-slate-200"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-slate-100">
          <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500"
            />
            <span>Verified Drivers Only</span>
          </label>
          <span className="text-[11px] text-slate-400">Sorted by departure time</span>
        </div>
      </div>

      {/* Results List */}
      {filteredTrips.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Car className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-slate-800">No matching rides found</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Try clearing your date or location filters to see all scheduled rides around VIT Bhimavaram.
          </p>
          <button
            onClick={() => {
              setSearchFrom('');
              setSearchTo('');
              setSearchDate('');
              setVerifiedOnly(false);
            }}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
          >
            Show All Rides
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTrips.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              db={db}
              onClick={() => onSelectTrip(trip.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Reusable Trip Card Component
function TripCard({ trip, db, onClick }) {
  const driver = db.users.find((u) => u.id === trip.driverId);
  const vehicle = db.vehicles.find((v) => v.id === trip.vehicleId);

  if (!driver) return null;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 p-4 shadow-2xs transition cursor-pointer space-y-3"
    >
      {/* Top Row: Time, Date, Fuel Share */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {trip.time}
          </span>
          <span className="text-slate-500 font-medium">{trip.date}</span>
        </div>

        <div className="text-right">
          <span className="text-base font-extrabold text-emerald-700">
            {trip.fuelShare > 0 ? `₹${trip.fuelShare}` : 'Free Lift'}
          </span>
          <span className="block text-[10px] text-slate-400">fuel share / seat</span>
        </div>
      </div>

      {/* Route Timeline */}
      <div className="relative pl-5 space-y-2 border-l-2 border-dashed border-emerald-300 ml-2">
        <div className="relative">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 absolute -left-[25px] top-1 ring-4 ring-white" />
          <p className="text-xs font-bold text-slate-900 leading-snug">{trip.from}</p>
        </div>
        <div className="relative">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-600 absolute -left-[25px] top-1 ring-4 ring-white" />
          <p className="text-xs font-bold text-slate-900 leading-snug">{trip.to}</p>
        </div>
      </div>

      {/* Bottom Row: Driver Info & Seats */}
      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src={driver.photo}
            alt={driver.name}
            className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 shrink-0"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-900 truncate">{driver.name}</span>
              {driver.verified && (
                <span
                  className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold shrink-0"
                  title="Identity & Driving Licence Verified"
                >
                  <ShieldCheck className="w-3 h-3" />
                  Verified
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 truncate">
              <span className="inline-flex items-center gap-0.5 text-amber-600 font-semibold">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                {driver.rating}
              </span>
              <span>•</span>
              <span className="truncate">{vehicle?.model || 'Vehicle'}</span>
            </div>
          </div>
        </div>

        <div className="shrink-0">
          <span className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold">
            {trip.availableSeats} {trip.availableSeats === 1 ? 'seat' : 'seats'} left
          </span>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// 3. TRIP DETAILS & SEAT REQUEST PAGE
// ----------------------------------------------------------------------------
function TripDetailsPage({
  db,
  setDb,
  tripId,
  currentUser,
  isAuthenticated,
  onRequireAuth,
  onBack,
  onOpenSos,
  showToast,
  onGoMyTrips
}) {
  const trip = db.trips.find((t) => t.id === tripId) || db.trips[0];
  const driver = db.users.find((u) => u.id === trip?.driverId);
  const vehicle = db.vehicles.find((v) => v.id === trip?.vehicleId);

  const [pickupPoint, setPickupPoint] = useState(trip?.from || '');
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');

  if (!trip || !driver) {
    return (
      <div className="p-6 text-center">
        <p className="text-sm text-slate-500">Trip not found.</p>
        <button onClick={onBack} className="mt-3 text-emerald-700 font-bold text-sm">
          Go Back
        </button>
      </div>
    );
  }

  const existingRequest = db.ride_requests.find(
    (r) => r.tripId === trip.id && r.riderId === currentUser.id && r.status !== 'cancelled'
  );
  const isOwnTrip = trip.driverId === currentUser.id;

  const handleRequestSeat = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      onRequireAuth();
      return;
    }
    if (!pickupPoint.trim()) {
      showToast('Please enter your preferred pickup point.', 'error');
      return;
    }

    const newReq = {
      id: 'req_' + Date.now(),
      tripId: trip.id,
      riderId: currentUser.id,
      pickupPoint: pickupPoint.trim(),
      status: 'requested',
      rated: false,
      createdAt: new Date().toLocaleString()
    };

    setDb((prev) => ({
      ...prev,
      ride_requests: [newReq, ...prev.ride_requests]
    }));

    showToast('Seat requested! Waiting for driver confirmation.');
    onGoMyTrips();
  };

  const handleShareTrip = () => {
    const shareText = `LiftBuddy Bhimavaram Trip Details:\nDriver: ${driver.name} (${
      driver.verified ? 'Verified' : 'Unverified'
    })\nVehicle: ${vehicle?.model} (${vehicle?.plateNumber})\nRoute: ${trip.from} to ${
      trip.to
    }\nDate & Time: ${trip.date} at ${trip.time}\nEmergency Contact: ${
      currentUser.emergencyContact?.name
    } (${currentUser.emergencyContact?.phone})`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText).catch(() => {});
    }
    showToast(
      `Trip details copied & ready to share with ${
        currentUser.emergencyContact?.name || 'trusted contact'
      }!`
    );
  };

  const handleSubmitReport = (e) => {
    e.preventDefault();
    if (!reportReason.trim()) return;
    const newReport = {
      id: 'rep_' + Date.now(),
      reporterId: currentUser.id,
      reportedUserId: driver.id,
      tripId: trip.id,
      reason: reportReason.trim(),
      status: 'open',
      createdAt: TODAY_STR
    };
    setDb((prev) => ({
      ...prev,
      reports: [newReport, ...prev.reports]
    }));
    setShowReportModal(false);
    setReportReason('');
    showToast('Report submitted to Campus Safety Admin team.');
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShareTrip}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Trip</span>
          </button>
          <button
            onClick={() => setShowReportModal(true)}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-rose-600"
            title="Report or Block User"
          >
            <Flag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Route Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="text-xs font-semibold text-slate-500">{trip.date}</span>
            <h1 className="text-xl font-extrabold text-slate-900">Departure at {trip.time}</h1>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-emerald-700">
              {trip.fuelShare > 0 ? `₹${trip.fuelShare}` : 'Free'}
            </span>
            <p className="text-[11px] text-slate-500">per seat fuel share</p>
          </div>
        </div>

        <div className="relative pl-6 space-y-4 border-l-2 border-emerald-500 ml-2 py-1">
          <div className="relative">
            <span className="w-3 h-3 rounded-full bg-emerald-600 absolute -left-[31px] top-1 ring-4 ring-emerald-50" />
            <p className="text-[11px] uppercase font-bold text-slate-400">Start Location</p>
            <p className="text-sm font-bold text-slate-900">{trip.from}</p>
          </div>
          <div className="relative">
            <span className="w-3 h-3 rounded-full bg-teal-700 absolute -left-[31px] top-1 ring-4 ring-teal-50" />
            <p className="text-[11px] uppercase font-bold text-slate-400">Destination</p>
            <p className="text-sm font-bold text-slate-900">{trip.to}</p>
          </div>
        </div>

        {trip.notes && (
          <div className="bg-slate-50 rounded-2xl p-3 text-xs text-slate-700 border border-slate-100">
            <span className="font-bold text-slate-900">Driver Note: </span>
            {trip.notes}
          </div>
        )}
      </div>

      {/* Driver & Vehicle Public Profile (Strictly No Private Docs Exposed) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Verified Driver Profile
          </h2>
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <Lock className="w-3 h-3" /> Docs stored privately
          </span>
        </div>

        <div className="flex items-center gap-3.5">
          <img
            src={driver.photo}
            alt={driver.name}
            className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200"
          />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <h3 className="text-base font-bold text-slate-900">{driver.name}</h3>
              {driver.verified && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600 mt-0.5">{driver.affiliation}</p>
            <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1 font-bold text-amber-600">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {driver.rating} ({driver.ratingCount} trips)
              </span>
            </div>
          </div>
        </div>

        {vehicle && (
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-emerald-700">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">{vehicle.model}</p>
                <p className="text-[11px] text-slate-500">
                  {vehicle.type} • Reg: <span className="font-mono font-semibold">{vehicle.plateNumber}</span>
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">
              {trip.availableSeats} open
            </span>
          </div>
        )}
      </div>

      {/* Seat Request Form */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-2xs">
        {isOwnTrip ? (
          <div className="text-center py-2 space-y-2">
            <p className="text-sm font-bold text-slate-800">This is your offered trip.</p>
            <button
              onClick={onGoMyTrips}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
            >
              Manage Requests in My Trips
            </button>
          </div>
        ) : existingRequest ? (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
            <p className="text-sm font-bold text-emerald-900">
              Seat Request Status: <span className="uppercase">{existingRequest.status}</span>
            </p>
            <p className="text-xs text-emerald-700">
              Pickup Point: {existingRequest.pickupPoint}
            </p>
            <button
              onClick={onGoMyTrips}
              className="mt-1 px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold"
            >
              Open My Trips
            </button>
          </div>
        ) : trip.availableSeats <= 0 ? (
          <div className="text-center py-3 text-sm font-bold text-slate-500">
            All seats on this ride have been filled.
          </div>
        ) : (
          <form onSubmit={handleRequestSeat} className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Request a Seat</h3>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Your Exact Pickup Landmark (along route)
              </label>
              <input
                type="text"
                required
                value={pickupPoint}
                onChange={(e) => setPickupPoint(e.target.value)}
                placeholder="e.g., Undi Road Junction near Bus Stop"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition"
            >
              Request 1 Seat • {trip.fuelShare > 0 ? `₹${trip.fuelShare} Share` : 'Free Lift'}
            </button>
          </form>
        )}
      </div>

      {/* Safety Strip */}
      <div className="flex items-center justify-between gap-2 px-4 py-3 rounded-2xl bg-rose-50 border border-rose-200">
        <span className="text-xs font-semibold text-rose-900">
          Need urgent help during a ride?
        </span>
        <button
          onClick={onOpenSos}
          className="px-3 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold"
        >
          Open SOS Helplines
        </button>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Flag className="w-4 h-4 text-rose-600" />
                Report or Block {driver.name}
              </h3>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmitReport} className="space-y-3">
              <p className="text-xs text-slate-600">
                Reports are reviewed confidentially by the VITB & Bhimavaram safety moderators.
              </p>
              <textarea
                rows={3}
                required
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                placeholder="Describe the safety concern, route deviation, or policy violation..."
                className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------------
// 4. POST A TRIP PAGE (GATED BY DRIVER VERIFICATION)
// ----------------------------------------------------------------------------
function PostTripPage({
  db,
  setDb,
  currentUser,
  onGoVerification,
  onTripCreated,
  showToast
}) {
  const userVehicle = db.vehicles.find((v) => v.userId === currentUser.id);

  const [from, setFrom] = useState('Bhimavaram Town Railway Station');
  const [to, setTo] = useState('Vishnu Institute of Technology (Kovvada)');
  const [date, setDate] = useState(TODAY_STR);
  const [time, setTime] = useState('08:30');
  const [seats, setSeats] = useState(2);
  const [fuelShare, setFuelShare] = useState(30);
  const [vehicleModel, setVehicleModel] = useState(userVehicle?.model || 'Maruti Swift / Honda Activa');
  const [plateNumber, setPlateNumber] = useState(userVehicle?.plateNumber || 'AP 37 DQ 9012');
  const [notes, setNotes] = useState('');

  // Enforce: Drivers must be fully verified before posting
  if (!currentUser.verified) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 text-center space-y-4 shadow-2xs">
        <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div className="space-y-1.5 max-w-md mx-auto">
          <h1 className="text-xl font-extrabold text-slate-900">
            Driver Verification Required
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            To keep VIT Bhimavaram students and residents safe, every driver must verify their{' '}
            <span className="font-semibold text-slate-800">Driving Licence</span>,{' '}
            <span className="font-semibold text-slate-800">Vehicle RC</span>, and{' '}
            <span className="font-semibold text-slate-800">Live Selfie</span> before offering a lift.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 max-w-md mx-auto">
          Current Status:{' '}
          <span className="font-bold uppercase text-amber-700">
            {currentUser.verificationStatus.replace('_', ' ')}
          </span>
        </div>

        <div className="pt-2">
          <button
            onClick={onGoVerification}
            className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm inline-flex items-center gap-2"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>Complete Driver Verification Now</span>
          </button>
        </div>
      </div>
    );
  }

  const handlePublishTrip = (e) => {
    e.preventDefault();
    if (!from.trim() || !to.trim()) {
      showToast('Please enter both start and destination locations.', 'error');
      return;
    }

    let vehicleId = userVehicle?.id;
    let updatedVehicles = [...db.vehicles];

    if (!vehicleId) {
      vehicleId = 'v_' + Date.now();
      updatedVehicles.push({
        id: vehicleId,
        userId: currentUser.id,
        type: Number(seats) === 1 ? 'Two-Wheeler' : 'Car',
        model: vehicleModel.trim(),
        plateNumber: plateNumber.trim().toUpperCase(),
        seats: Number(seats)
      });
    }

    const newTrip = {
      id: 't_' + Date.now(),
      driverId: currentUser.id,
      vehicleId,
      from: from.trim(),
      to: to.trim(),
      date,
      time,
      totalSeats: Number(seats),
      availableSeats: Number(seats),
      fuelShare: Number(fuelShare) || 0,
      notes: notes.trim(),
      status: 'scheduled'
    };

    setDb((prev) => ({
      ...prev,
      vehicles: updatedVehicles,
      trips: [newTrip, ...prev.trips]
    }));

    showToast('Your trip is live! Riders in Bhimavaram can now request seats.');
    onTripCreated();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">Offer a Lift</h1>
          <p className="text-xs text-slate-500">
            Share empty seats & split fuel costs fairly (non-commercial)
          </p>
        </div>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          Verified Driver
        </span>
      </div>

      <form
        onSubmit={handlePublishTrip}
        className="bg-white rounded-3xl border border-slate-200 p-5 space-y-4 shadow-2xs"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Start Location</label>
            <input
              list="bvrm-locations"
              required
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Destination</label>
            <input
              list="bvrm-locations"
              required
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Date</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Departure Time</label>
            <input
              type="time"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Available Seats
            </label>
            <select
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value={1}>1 Seat (Bike Pillion / Car)</option>
              <option value={2}>2 Seats</option>
              <option value={3}>3 Seats</option>
              <option value={4}>4 Seats</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Fuel Cost Share (₹ / seat)
            </label>
            <input
              type="number"
              min="0"
              max="300"
              value={fuelShare}
              onChange={(e) => setFuelShare(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {!userVehicle && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Vehicle Model</label>
              <input
                type="text"
                required
                value={vehicleModel}
                onChange={(e) => setVehicleModel(e.target.value)}
                placeholder="e.g., Honda Activa / Maruti Swift"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                