/**
 * WashNearMe — High-Fidelity Interactive Prototype State & Interaction Engine
 * Clean, modern client-side state machine with realistic demo data
 */

// Global State
const state = {
  currentRole: 'customer', // 'customer' or 'owner'
  currentScreen: 'screen-home',
  selectedShopId: 'sparkle',
  
  // Active Booking Configuration
  booking: {
    shopId: 'sparkle',
    serviceId: 'body',
    serviceName: 'Body Wash',
    vehicleId: 'sedan',
    vehicleName: 'Sedan',
    vehicleIcon: '🚘',
    dateIndex: 2, // Sep 29 default demo
    dateString: 'September 29, 2026',
    timeSlot: '10:30 AM – 11:00 AM',
    basePrice: 349,
    finalPrice: 349,
    bookingId: 'CW10001'
  },
  
  currentBookingStep: 1, // 1: Service, 2: Vehicle, 3: Date, 4: Time

  // Customer's Bookings
  customerBookings: {
    upcoming: [
      {
        id: 'CW10001',
        shopName: 'Sparkle Auto Care',
        service: 'Body Wash',
        vehicle: 'Sedan',
        date: 'September 29, 2026',
        time: '10:30 AM – 11:00 AM',
        price: '₹349',
        status: 'Confirmed',
        location: '560037, Bengaluru'
      }
    ],
    past: [
      {
        id: 'CW09844',
        shopName: 'AquaShine Car Wash',
        service: 'Interior Cleaning',
        vehicle: 'Sedan',
        date: 'September 15, 2026',
        time: '02:00 PM – 02:30 PM',
        price: '₹319',
        status: 'Completed',
        location: '560037, Bengaluru'
      },
      {
        id: 'CW09120',
        shopName: 'CleanRide Motors',
        service: 'Body Wash',
        vehicle: 'Sedan',
        date: 'August 28, 2026',
        time: '11:00 AM – 11:30 AM',
        price: '₹249',
        status: 'Completed',
        location: '560037, Bengaluru'
      }
    ]
  },

  // Owner's Demo Bookings & Schedule
  ownerSchedule: [
    { time: '09:00 – 09:30', status: 'available', customer: null, vehicle: null, service: null },
    { time: '09:30 – 10:00', status: 'confirmed', customer: 'Rahul', vehicle: 'Sedan', service: 'Body Wash', price: '₹349' },
    { time: '10:00 – 10:30', status: 'confirmed', customer: 'Arun', vehicle: 'SUV', service: 'Interior Cleaning', price: '₹420' },
    { time: '10:30 – 11:00', status: 'available', customer: null, vehicle: null, service: null },
    { time: '11:00 – 11:30', status: 'confirmed', customer: 'Vivek', vehicle: 'Hatchback', service: 'Body Wash', price: '₹299' },
    { time: '11:30 – 12:00', status: 'in-progress', customer: 'Rohan', vehicle: 'Compact SUV', service: 'Underbody Cleaning', price: '₹299' },
    { time: '12:00 – 12:30', status: 'confirmed', customer: 'Priya', vehicle: 'Sedan', service: 'Body Wash', price: '₹349' },
    { time: '14:00 – 14:30', status: 'available', customer: null, vehicle: null, service: null },
    { time: '14:30 – 15:00', status: 'confirmed', customer: 'Vikram', vehicle: 'Compact SUV', service: 'Interior Cleaning', price: '₹350' },
    { time: '15:00 – 15:30', status: 'available', customer: null, vehicle: null, service: null }
  ],

  ownerBookingsList: {
    today: [
      { name: 'Rahul', vehicle: 'Sedan', service: 'Body Wash', date: 'Sep 29', time: '09:30–10:00', price: '₹349', status: 'Confirmed' },
      { name: 'Arun', vehicle: 'SUV', service: 'Interior Cleaning', date: 'Sep 29', time: '10:00–10:30', price: '₹420', status: 'Confirmed' },
      { name: 'Vivek', vehicle: 'Hatchback', service: 'Body Wash', date: 'Sep 29', time: '11:00–11:30', price: '₹299', status: 'Confirmed' },
      { name: 'Rohan', vehicle: 'Compact SUV', service: 'Underbody Cleaning', date: 'Sep 29', time: '11:30–12:00', price: '₹299', status: 'In-Bay' },
      { name: 'Priya', vehicle: 'Sedan', service: 'Body Wash', date: 'Sep 29', time: '12:00–12:30', price: '₹349', status: 'Confirmed' },
      { name: 'Vikram', vehicle: 'Compact SUV', service: 'Interior Cleaning', date: 'Sep 29', time: '14:30–15:00', price: '₹350', status: 'Confirmed' }
    ],
    upcoming: [
      { name: 'Aditya S.', vehicle: 'Sedan', service: 'Body Wash', date: 'Sep 30', time: '10:00–10:30', price: '₹349', status: 'Scheduled' },
      { name: 'Manish T.', vehicle: 'SUV', service: 'Underbody Cleaning', date: 'Sep 30', time: '11:30–12:00', price: '₹370', status: 'Scheduled' },
      { name: 'Kavita M.', vehicle: 'Hatchback', service: 'Interior Cleaning', date: 'Oct 01', time: '09:30–10:00', price: '₹299', status: 'Scheduled' },
      { name: 'Sameer J.', vehicle: 'Sedan', service: 'Body Wash', date: 'Oct 02', time: '16:00–16:30', price: '₹349', status: 'Scheduled' }
    ],
    completed: [
      { name: 'Karthik', vehicle: 'Creta', service: 'Body Wash', date: 'Sep 28', time: '17:00–17:30', price: '₹349', status: 'Completed' },
      { name: 'Ananya', vehicle: 'City', service: 'Interior Cleaning', date: 'Sep 28', time: '15:30–16:00', price: '₹299', status: 'Completed' },
      { name: 'Rajesh', vehicle: 'Fortuner', service: 'Underbody Cleaning', date: 'Sep 27', time: '11:00–11:30', price: '₹420', status: 'Completed' }
    ]
  }
};

// Demo Shops Static Data
const SHOPS = {
  sparkle: {
    id: 'sparkle',
    name: 'Sparkle Auto Care',
    rating: 4.6,
    reviewsCount: 128,
    distance: '1.2 km away',
    address: 'Plot 42, Brookefield Main Rd, 560037 Bengaluru',
    tagline: 'Professional car cleaning and detailing services for your everyday drive.',
    image: 'assets/sparkle.jpg',
    startingPrice: 249,
    services: [
      { id: 'interior', name: 'Interior Cleaning', price: 299, icon: '🧽', desc: 'Deep vacuuming, steam sanitization, leather conditioning & dashboard care' },
      { id: 'body', name: 'Body Wash', price: 349, icon: '🚿', desc: 'High-pressure snow foam wash, under-fender rinse & microfiber polish' },
      { id: 'underbody', name: 'Underbody Cleaning', price: 249, icon: '✨', desc: 'Hydraulic ramp lift, mud degreasing & anti-rust chassis blast' }
    ],
    reviews: [
      { name: 'Priya R.', car: 'Honda City', rating: '5.0', text: 'Very professional service and good finishing. The foam wash was spotless!' },
      { name: 'Karthik M.', car: 'Hyundai Creta', rating: '5.0', text: 'Easy booking and the car was cleaned really well. Done in 30 mins flat.' },
      { name: 'Deepa S.', car: 'Hyundai i20', rating: '4.5', text: 'Clean air-conditioned waiting lounge with WiFi. Staff was courteous.' }
    ]
  },
  cleanride: {
    id: 'cleanride',
    name: 'CleanRide Motors',
    rating: 4.4,
    reviewsCount: 96,
    distance: '1.8 km away',
    address: 'ITPL Main Rd, near Kundalahalli Gate, 560037 Bengaluru',
    tagline: 'Touchless automatic car wash and express exterior cleaning.',
    image: 'assets/cleanride.jpg',
    startingPrice: 249,
    services: [
      { id: 'interior', name: 'Interior Cleaning', price: 299, icon: '🧽', desc: 'Deep vacuuming & anti-bacterial cabin treatment' },
      { id: 'body', name: 'Body Wash', price: 249, icon: '🚿', desc: 'Automated touchless spray wash & rim detailing' }
    ],
    reviews: [
      { name: 'Vikram S.', car: 'Tata Nexon', rating: '4.5', text: 'Super fast! Took less than 25 minutes for a complete wash.' }
    ]
  },
  aquashine: {
    id: 'aquashine',
    name: 'AquaShine Car Wash',
    rating: 4.8,
    reviewsCount: 214,
    distance: '0.9 km away',
    address: 'AECS Layout, 1st Main Rd, 560037 Bengaluru',
    tagline: 'Eco-friendly water-recycling active foam wash spa.',
    image: 'assets/aquashine.jpg',
    startingPrice: 259,
    services: [
      { id: 'interior', name: 'Interior Cleaning', price: 319, icon: '🧽', desc: 'Upholstery stain extraction & odorless sanitization' },
      { id: 'body', name: 'Body Wash', price: 279, icon: '🚿', desc: 'Active snow foam with hydrophobic ceramic rinse' },
      { id: 'underbody', name: 'Underbody Cleaning', price: 259, icon: '✨', desc: 'High-pressure under-carriage rinse' }
    ],
    reviews: [
      { name: 'Ananya B.', car: 'Kia Seltos', rating: '5.0', text: 'Loved the water recycling tech and the showroom finish!' }
    ]
  },
  prowash: {
    id: 'prowash',
    name: 'ProWash 560037',
    rating: 4.5,
    reviewsCount: 82,
    distance: '2.4 km away',
    address: 'Outer Ring Rd, Marathahalli-Brookefield Junction, 560037 Bengaluru',
    tagline: 'Heavy-duty chassis wash and express detailing specialists.',
    image: 'assets/prowash.jpg',
    startingPrice: 249,
    services: [
      { id: 'body', name: 'Body Wash', price: 299, icon: '🚿', desc: 'High-pressure jet wash & hand dry shine' },
      { id: 'underbody', name: 'Underbody Cleaning', price: 249, icon: '✨', desc: 'Heavy vehicle hydraulic lift with degreaser' }
    ],
    reviews: [
      { name: 'Sameer K.', car: 'Mahindra XUV700', rating: '4.5', text: 'Best underbody ramp cleaning in 560037 area.' }
    ]
  },
  autoglow: {
    id: 'autoglow',
    name: 'AutoGlow Care',
    rating: 4.7,
    reviewsCount: 165,
    distance: '1.5 km away',
    address: 'BEML Layout, 6th Cross, 560037 Bengaluru',
    tagline: 'Showroom-grade ceramic shine and hydrophobic sealant care.',
    image: 'assets/autoglow.jpg',
    startingPrice: 299,
    services: [
      { id: 'interior', name: 'Interior Cleaning', price: 349, icon: '🧽', desc: 'Full leather conditioning & matte trim dressing' },
      { id: 'body', name: 'Body Wash', price: 399, icon: '🚿', desc: 'pH-neutral two-bucket hand wash with gloss sealant' },
      { id: 'underbody', name: 'Underbody Cleaning', price: 299, icon: '✨', desc: 'Suspension & chassis anti-corrosion protection spray' }
    ],
    reviews: [
      { name: 'Naveen P.', car: 'Skoda Slavia', rating: '5.0', text: 'Attention to detail is unmatched. Paint looks like a mirror!' }
    ]
  }
};

// Vehicles List
const VEHICLES = [
  { id: 'hatchback', name: 'Hatchback / Compact', icon: '🚗', examples: 'Swift, i20, Tiago, Baleno', multiplier: 1.0 },
  { id: 'sedan', name: 'Sedan', icon: '🚘', examples: 'City, Verna, Ciaz, Slavia', multiplier: 1.0 }, // Base matches ₹349
  { id: 'compact_suv', name: 'Compact SUV', icon: '🚙', examples: 'Brezza, Nexon, Sonet, Venue', multiplier: 1.1 },
  { id: 'suv', name: 'SUV', icon: '🚙', examples: 'Creta, Harrier, XUV700, Safari', multiplier: 1.25 }
];

// Next 7 Days (Starting from Sep 27 / Today)
const DATES = [
  { day: 'Sun', num: '27', month: 'Sep', label: 'Today (Sep 27)', full: 'September 27, 2026' },
  { day: 'Mon', num: '28', month: 'Sep', label: 'Mon, Sep 28', full: 'September 28, 2026' },
  { day: 'Tue', num: '29', month: 'Sep', label: 'Tue, Sep 29', full: 'September 29, 2026' },
  { day: 'Wed', num: '30', month: 'Sep', label: 'Wed, Sep 30', full: 'September 30, 2026' },
  { day: 'Thu', num: '01', month: 'Oct', label: 'Thu, Oct 1', full: 'October 1, 2026' },
  { day: 'Fri', num: '02', month: 'Oct', label: 'Fri, Oct 2', full: 'October 2, 2026' },
  { day: 'Sat', num: '03', month: 'Oct', label: 'Sat, Oct 3', full: 'October 3, 2026' }
];

// Time Slots
const TIME_SLOTS = [
  { time: '09:00 – 09:30', status: 'available' },
  { time: '09:30 – 10:00', status: 'booked' }, // Rahul
  { time: '10:00 – 10:30', status: 'booked' }, // Arun
  { time: '10:30 – 11:00', status: 'available' }, // User primary selection
  { time: '11:00 – 11:30', status: 'booked' }, // Vivek
  { time: '11:30 – 12:00', status: 'available' },
  { time: '12:00 – 12:30', status: 'available' },
  { time: '14:00 – 14:30', status: 'available' },
  { time: '14:30 – 15:00', status: 'booked' },
  { time: '15:00 – 15:30', status: 'available' },
  { time: '15:30 – 16:00', status: 'available' },
  { time: '16:00 – 16:30', status: 'booked' },
  { time: '16:30 – 17:00', status: 'available' },
  { time: '17:00 – 17:30', status: 'available' }
];

/* ==========================================================================
   ROUTING & SCREEN SWITCHER
   ========================================================================== */
function navigateTo(screenId) {
  state.currentScreen = screenId;
  
  // Hide all screens
  document.querySelectorAll('.screen').forEach(el => {
    el.classList.remove('active');
  });

  // Show target screen
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add('active');
    
    // Scroll viewport to top
    const viewport = document.getElementById('appViewport');
    if (viewport) viewport.scrollTop = 0;
  }

  // Update Prototype Control Bar dropdown selector
  const jumpSelect = document.getElementById('jumpSelect');
  if (jumpSelect) {
    jumpSelect.value = screenId;
  }

  // Update Mobile Bottom Nav Active State
  updateBottomNav(screenId);

  // If entering details screen, populate details
  if (screenId === 'screen-details') {
    renderShopDetails(state.selectedShopId);
  }

  // If entering booking screen, sync steps
  if (screenId === 'screen-booking') {
    renderBookingStep(state.currentBookingStep);
  }

  // If entering summary screen, update summary
  if (screenId === 'screen-summary') {
    renderSummaryScreen();
  }

  // If entering confirmation screen, update confirmation
  if (screenId === 'screen-confirmation') {
    renderConfirmationScreen();
  }

  // If entering customer bookings, render lists
  if (screenId === 'screen-bookings') {
    renderCustomerBookings('upcoming');
  }

  // If entering owner screens, update dashboard/bookings
  if (screenId === 'screen-owner-dashboard') {
    renderOwnerDashboard();
  }
  if (screenId === 'screen-owner-bookings') {
    renderOwnerBookings('today');
  }

  // Toggle bottom nav visibility on owner screens
  const bottomNav = document.getElementById('appBottomNav');
  if (bottomNav) {
    if (screenId.startsWith('screen-owner')) {
      bottomNav.style.display = 'none';
    } else {
      bottomNav.style.display = 'flex';
    }
  }
}

function updateBottomNav(screenId) {
  document.querySelectorAll('.nav-tab-item').forEach(btn => {
    btn.classList.remove('active');
  });
  
  if (screenId === 'screen-home') {
    document.getElementById('navBtnHome')?.classList.add('active');
  } else if (screenId === 'screen-listing' || screenId === 'screen-details' || screenId === 'screen-booking') {
    document.getElementById('navBtnExplore')?.classList.add('active');
  } else if (screenId === 'screen-bookings' || screenId === 'screen-confirmation') {
    document.getElementById('navBtnBookings')?.classList.add('active');
  } else if (screenId === 'screen-profile') {
    document.getElementById('navBtnProfile')?.classList.add('active');
  }
}

/* ==========================================================================
   SCREEN 2: CAR WASH LISTINGS RENDERER & FILTERS
   ========================================================================== */
function renderShopsList(filterType = 'all', searchQuery = '') {
  const container = document.getElementById('shopsListContainer');
  if (!container) return;

  const query = searchQuery.toLowerCase().trim();
  const shopKeys = Object.keys(SHOPS);

  const filteredShops = shopKeys.filter(key => {
    const shop = SHOPS[key];
    const matchQuery = !query || shop.name.toLowerCase().includes(query) || shop.address.toLowerCase().includes(query);
    
    let matchFilter = true;
    if (filterType === 'interior') {
      matchFilter = shop.services.some(s => s.id === 'interior');
    } else if (filterType === 'body') {
      matchFilter = shop.services.some(s => s.id === 'body');
    } else if (filterType === 'underbody') {
      matchFilter = shop.services.some(s => s.id === 'underbody');
    }
    
    return matchQuery && matchFilter;
  });

  if (filteredShops.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 16px; color: #64748b;">
        <div style="font-size: 2.2rem; margin-bottom: 8px;">🔍</div>
        <p style="font-weight: 700; color: #0f172a;">No car washes found</p>
        <p style="font-size: 0.8rem;">Try clearing your filter or searching for another shop in 560037.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filteredShops.map(key => {
    const shop = SHOPS[key];
    const servicesTagsHtml = shop.services.map(s => `<span class="service-tag">${s.name}</span>`).join('');
    
    return `
      <div class="shop-card" onclick="viewShopDetails('${shop.id}')">
        <div class="shop-card-media">
          <img src="${shop.image}" alt="${shop.name}" loading="lazy" />
          <div class="shop-distance-badge">
            <span>📍</span> ${shop.distance}
          </div>
        </div>
        <div class="shop-card-body">
          <div class="shop-card-top">
            <h3 class="shop-card-name">${shop.name}</h3>
            <div class="shop-rating-pill">
              <span>⭐</span> ${shop.rating}
              <span class="shop-reviews-count">(${shop.reviewsCount})</span>
            </div>
          </div>
          <div class="shop-services-tags">
            ${servicesTagsHtml}
          </div>
          <div class="shop-card-footer">
            <div class="shop-starting-price">
              <span class="price-label">Starting from</span>
              <span class="price-val">₹${shop.startingPrice}</span>
            </div>
            <button class="btn-view-shop" onclick="event.stopPropagation(); viewShopDetails('${shop.id}')">
              View Shop →
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function viewShopDetails(shopId) {
  state.selectedShopId = shopId;
  state.booking.shopId = shopId;
  const shop = SHOPS[shopId];
  if (shop && shop.services.length > 0) {
    // Select first service by default or preserve selected
    const existing = shop.services.find(s => s.id === state.booking.serviceId);
    const chosen = existing || shop.services[0];
    state.booking.serviceId = chosen.id;
    state.booking.serviceName = chosen.name;
    state.booking.basePrice = chosen.price;
    recalculatePrice();
  }
  navigateTo('screen-details');
}

/* ==========================================================================
   SCREEN 3: CAR WASH DETAILS RENDERER
   ========================================================================== */
function renderShopDetails(shopId) {
  const shop = SHOPS[shopId] || SHOPS.sparkle;
  
  // Banner & Info
  document.getElementById('shopDetailImg').src = shop.image;
  document.getElementById('shopDetailTitle').textContent = shop.name;
  document.getElementById('shopDetailRating').textContent = shop.rating;
  document.getElementById('shopDetailReviewsCount').textContent = `(${shop.reviewsCount} reviews)`;
  document.getElementById('shopDetailDistance').textContent = shop.distance;
  document.getElementById('shopDetailTagline').textContent = `"${shop.tagline}"`;

  // Services List
  const servicesContainer = document.getElementById('shopDetailServicesList');
  servicesContainer.innerHTML = shop.services.map(svc => {
    const isSelected = (svc.id === state.booking.serviceId);
    return `
      <div class="service-detail-card ${isSelected ? 'selected' : ''}" onclick="selectDetailService('${svc.id}')">
        <div class="service-thumb">${svc.icon}</div>
        <div class="service-detail-body">
          <div class="service-detail-name">${svc.name}</div>
          <div class="service-detail-desc">${svc.desc}</div>
          <div class="service-detail-bottom">
            <span class="service-from-price">From ₹${svc.price}</span>
            <button class="btn-select-chip">${isSelected ? 'Selected ✓' : 'Select'}</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Reviews
  const reviewsContainer = document.getElementById('shopDetailReviewsList');
  reviewsContainer.innerHTML = shop.reviews.map(r => `
    <div class="review-item">
      <div class="review-header">
        <div>
          <span class="review-user-name">${r.name}</span>
          <span class="review-car-tag">(${r.car})</span>
        </div>
        <div class="review-stars">⭐ ${r.rating}</div>
      </div>
      <p class="review-comment">"${r.text}"</p>
    </div>
  `).join('');
}

function selectDetailService(svcId) {
  const shop = SHOPS[state.selectedShopId];
  const service = shop.services.find(s => s.id === svcId);
  if (service) {
    state.booking.serviceId = service.id;
    state.booking.serviceName = service.name;
    state.booking.basePrice = service.price;
    recalculatePrice();
    renderShopDetails(state.selectedShopId);
    showToast(`Selected: ${service.name}`);
  }
}

/* ==========================================================================
   SCREEN 4: MULTI-STEP BOOKING FLOW
   ========================================================================== */
function startBookingFlow(initialStep = 1) {
  state.currentBookingStep = initialStep;
  navigateTo('screen-booking');
}

function renderBookingStep(stepNum) {
  state.currentBookingStep = stepNum;

  // Update step indicators
  document.querySelectorAll('.step-node').forEach(node => {
    const nodeStep = parseInt(node.getAttribute('data-step'), 10);
    node.classList.remove('active', 'completed');
    if (nodeStep === stepNum) {
      node.classList.add('active');
    } else if (nodeStep < stepNum) {
      node.classList.add('completed');
    }
  });

  // Hide all step sections
  document.querySelectorAll('.booking-step-content').forEach(section => {
    section.style.display = 'none';
  });

  // Show target step section
  const currentSection = document.getElementById(`bookingStepSection${stepNum}`);
  if (currentSection) {
    currentSection.style.display = 'block';
  }

  // Populate dynamic step contents
  const shop = SHOPS[state.booking.shopId] || SHOPS.sparkle;

  if (stepNum === 1) {
    // Step 1: Services
    const container = document.getElementById('step1ServicesContainer');
    container.innerHTML = shop.services.map(s => {
      const isSelected = (s.id === state.booking.serviceId);
      return `
        <div class="service-detail-card ${isSelected ? 'selected' : ''}" onclick="pickService('${s.id}')">
          <div class="service-thumb">${s.icon}</div>
          <div class="service-detail-body">
            <div class="service-detail-name">${s.name}</div>
            <div class="service-detail-desc">${s.desc}</div>
            <div class="service-detail-bottom">
              <span class="service-from-price">₹${s.price}</span>
              <button class="btn-select-chip">${isSelected ? 'Selected ✓' : 'Select'}</button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  } else if (stepNum === 2) {
    // Step 2: Vehicles
    const container = document.getElementById('step2VehiclesContainer');
    container.innerHTML = VEHICLES.map(v => {
      const isSelected = (v.id === state.booking.vehicleId);
      return `
        <div class="vehicle-card ${isSelected ? 'selected' : ''}" onclick="pickVehicle('${v.id}')">
          <div class="vehicle-check-badge">✓</div>
          <div class="vehicle-icon-large">${v.icon}</div>
          <div class="vehicle-title">${v.name}</div>
          <div class="vehicle-examples">${v.examples}</div>
        </div>
      `;
    }).join('');
  } else if (stepNum === 3) {
    // Step 3: Date
    const container = document.getElementById('step3DatesContainer');
    container.innerHTML = DATES.map((d, index) => {
      const isSelected = (index === state.booking.dateIndex);
      return `
        <div class="date-pill-card ${isSelected ? 'selected' : ''}" onclick="pickDate(${index})">
          <span class="date-day-name">${d.day}</span>
          <span class="date-num">${d.num}</span>
          <span class="date-month-name">${d.month}</span>
        </div>
      `;
    }).join('');
  } else if (stepNum === 4) {
    // Step 4: Time Slots
    const container = document.getElementById('step4TimesContainer');
    container.innerHTML = TIME_SLOTS.map(slot => {
      const isBooked = (slot.status === 'booked');
      const isSelected = !isBooked && (slot.time === state.booking.timeSlot);
      return `
        <button class="time-slot-btn ${isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''}" 
          ${isBooked ? 'disabled' : ''} 
          onclick="pickTimeSlot('${slot.time}')">
          <span>${slot.time}</span>
          <span class="slot-status-tag">${isBooked ? 'Booked' : (isSelected ? 'Selected' : 'Available')}</span>
        </button>
      `;
    }).join('');
  }

  // Update Live Booking Summary HUD
  updateLiveBookingHUD();

  // Update Next/Back button labels
  const btnNext = document.getElementById('btnBookingNext');
  if (stepNum === 4) {
    btnNext.innerHTML = 'Review Summary →';
  } else {
    btnNext.innerHTML = `Continue to Step ${stepNum + 1} →`;
  }
}

function pickService(svcId) {
  const shop = SHOPS[state.booking.shopId];
  const service = shop.services.find(s => s.id === svcId);
  if (service) {
    state.booking.serviceId = service.id;
    state.booking.serviceName = service.name;
    state.booking.basePrice = service.price;
    recalculatePrice();
    renderBookingStep(1);
    showToast(`Service selected: ${service.name}`);
  }
}

function pickVehicle(vehId) {
  const vehicle = VEHICLES.find(v => v.id === vehId);
  if (vehicle) {
    state.booking.vehicleId = vehicle.id;
    state.booking.vehicleName = vehicle.name;
    state.booking.vehicleIcon = vehicle.icon;
    recalculatePrice();
    renderBookingStep(2);
    showToast(`Vehicle selected: ${vehicle.name}`);
  }
}

function pickDate(index) {
  state.booking.dateIndex = index;
  state.booking.dateString = DATES[index].full;
  renderBookingStep(3);
  showToast(`Date selected: ${DATES[index].label}`);
}

function pickTimeSlot(timeStr) {
  state.booking.timeSlot = timeStr;
  renderBookingStep(4);
  showToast(`Slot selected: ${timeStr}`);
}

function handleBookingNext() {
  if (state.currentBookingStep < 4) {
    renderBookingStep(state.currentBookingStep + 1);
  } else {
    // Proceed to Screen 5: Booking Summary
    navigateTo('screen-summary');
  }
}

function handleBookingPrev() {
  if (state.currentBookingStep > 1) {
    renderBookingStep(state.currentBookingStep - 1);
  } else {
    navigateTo('screen-details');
  }
}

function recalculatePrice() {
  // Sedan base calculation
  let price = state.booking.basePrice || 349;
  const vehicle = VEHICLES.find(v => v.id === state.booking.vehicleId);
  if (vehicle && vehicle.id === 'suv') {
    price = Math.round(price * 1.2);
  } else if (vehicle && vehicle.id === 'compact_suv') {
    price = Math.round(price * 1.1);
  }
  state.booking.finalPrice = price;
}

function updateLiveBookingHUD() {
  const shop = SHOPS[state.booking.shopId] || SHOPS.sparkle;
  const dateObj = DATES[state.booking.dateIndex];

  document.getElementById('hudShopName').textContent = shop.name;
  document.getElementById('hudConfigText').textContent = 
    `${state.booking.serviceName} • ${state.booking.vehicleName} • ${dateObj.day}, ${dateObj.num} ${dateObj.month} • ${state.booking.timeSlot}`;
  document.getElementById('hudPriceVal').textContent = `₹${state.booking.finalPrice}`;
}

/* ==========================================================================
   SCREEN 5: BOOKING SUMMARY RENDERER
   ========================================================================== */
function renderSummaryScreen() {
  const shop = SHOPS[state.booking.shopId] || SHOPS.sparkle;
  const dateObj = DATES[state.booking.dateIndex];

  document.getElementById('sumShopName').textContent = shop.name;
  document.getElementById('sumShopAddress').textContent = shop.address;
  document.getElementById('sumServiceName').textContent = state.booking.serviceName;
  document.getElementById('sumVehicleName').textContent = `${state.booking.vehicleIcon} ${state.booking.vehicleName}`;
  document.getElementById('sumDate').textContent = `${dateObj.day}, ${dateObj.month} ${dateObj.num}, 2026`;
  document.getElementById('sumTimeSlot').textContent = state.booking.timeSlot;
  document.getElementById('sumServicePrice').textContent = `₹${state.booking.finalPrice}`;
  document.getElementById('sumTotalPrice').textContent = `₹${state.booking.finalPrice}`;
}

/* ==========================================================================
   SCREEN 6: BOOKING CONFIRMATION RENDERER
   ========================================================================== */
function confirmCurrentBooking() {
  // Generate a mock booking ID
  const newBookingId = 'CW' + Math.floor(10000 + Math.random() * 90000);
  state.booking.bookingId = newBookingId;
  const shop = SHOPS[state.booking.shopId] || SHOPS.sparkle;

  // Add to customer's upcoming bookings
  const newBookingItem = {
    id: newBookingId,
    shopName: shop.name,
    service: state.booking.serviceName,
    vehicle: state.booking.vehicleName,
    date: state.booking.dateString,
    time: state.booking.timeSlot,
    price: `₹${state.booking.finalPrice}`,
    status: 'Confirmed',
    location: '560037, Bengaluru'
  };
  state.customerBookings.upcoming.unshift(newBookingItem);

  // If Sparkle Auto Care was booked, update owner's today schedule for demo realism
  const matchingSlot = state.ownerSchedule.find(s => s.time.startsWith('10:30'));
  if (matchingSlot && matchingSlot.status === 'available') {
    matchingSlot.status = 'confirmed';
    matchingSlot.customer = 'Sankar (You)';
    matchingSlot.vehicle = state.booking.vehicleName;
    matchingSlot.service = state.booking.serviceName;
    matchingSlot.price = `₹${state.booking.finalPrice}`;
  }

  showToast('Booking successfully confirmed!');
  navigateTo('screen-confirmation');
}

function renderConfirmationScreen() {
  const shop = SHOPS[state.booking.shopId] || SHOPS.sparkle;

  document.getElementById('confBookingId').textContent = `Booking ID: ${state.booking.bookingId}`;
  document.getElementById('confShopName').textContent = shop.name;
  document.getElementById('confServiceName').textContent = state.booking.serviceName;
  document.getElementById('confVehicleName').textContent = `${state.booking.vehicleIcon} ${state.booking.vehicleName}`;
  document.getElementById('confDate').textContent = state.booking.dateString;
  document.getElementById('confTimeSlot').textContent = state.booking.timeSlot;
  document.getElementById('confTotalPrice').textContent = `₹${state.booking.finalPrice}`;
}

/* ==========================================================================
   SCREEN 7: MY BOOKINGS RENDERER
   ========================================================================== */
function renderCustomerBookings(activeTab = 'upcoming') {
  // Tab UI toggle
  document.querySelectorAll('.booking-tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  if (activeTab === 'upcoming') {
    document.getElementById('tabUpcomingBtn').classList.add('active');
  } else {
    document.getElementById('tabPastBtn').classList.add('active');
  }

  const container = document.getElementById('customerBookingsContainer');
  const list = state.customerBookings[activeTab] || [];

  if (list.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 16px; color: #64748b;">
        <div style="font-size: 2.2rem; margin-bottom: 8px;">📅</div>
        <p style="font-weight: 700; color: #0f172a;">No ${activeTab} bookings</p>
        <p style="font-size: 0.8rem;">Browse nearby car washes and book your next slot.</p>
        <button class="btn-primary-cta" style="margin-top: 14px;" onclick="navigateTo('screen-listing')">
          Book a Car Wash
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(item => `
    <div class="customer-booking-card">
      <div class="booking-card-top-row">
        <div>
          <h4 class="booking-shop-name">${item.shopName}</h4>
          <span style="font-size: 0.7rem; color: #64748b;">ID: ${item.id} • 📍 ${item.location}</span>
        </div>
        <span class="booking-status-badge ${item.status === 'Confirmed' ? 'badge-confirmed' : 'badge-completed'}">
          ${item.status === 'Confirmed' ? '● Confirmed' : '✓ Completed'}
        </span>
      </div>

      <div class="booking-pill-details">
        <span class="booking-info-pill">🧽 ${item.service}</span>
        <span class="booking-info-pill">🚘 ${item.vehicle}</span>
        <span class="booking-info-pill">📅 ${item.date}</span>
        <span class="booking-info-pill">⏰ ${item.time}</span>
      </div>

      <div class="booking-card-footer-row">
        <span class="booking-price-tag">${item.price}</span>
        <button class="btn-view-shop" onclick="showBookingDetailModal('${item.id}', '${item.shopName}')">
          View Details →
        </button>
      </div>
    </div>
  `).join('');
}

function showBookingDetailModal(id, shopName) {
  showToast(`Viewing details for ${shopName} (#${id})`);
}

/* ==========================================================================
   SCREEN 10 & 11: OWNER PORTAL RENDERERS
   ========================================================================== */
function renderOwnerDashboard() {
  const container = document.getElementById('ownerTimelineContainer');
  if (!container) return;

  container.innerHTML = state.ownerSchedule.map(slot => {
    let statusClass = 'status-available';
    let statusLabel = 'Available';
    let detailsHtml = '<span style="color: #94a3b8; font-size: 0.75rem;">Slot open for booking</span>';

    if (slot.status === 'confirmed') {
      statusClass = 'status-confirmed';
      statusLabel = 'Confirmed';
      detailsHtml = `
        <div class="slot-cust-name">${slot.customer} — ${slot.vehicle}</div>
        <div class="slot-sub-service">${slot.service} • ${slot.price}</div>
      `;
    } else if (slot.status === 'in-progress') {
      statusClass = 'status-progress';
      statusLabel = 'In-Bay Washing';
      detailsHtml = `
        <div class="slot-cust-name">${slot.customer} — ${slot.vehicle}</div>
        <div class="slot-sub-service">${slot.service} • ${slot.price}</div>
      `;
    }

    return `
      <div class="timeline-slot-row">
        <div class="slot-time-col">${slot.time}</div>
        <div class="slot-details-col">${detailsHtml}</div>
        <div>
          <span class="status-badge-chip ${statusClass}">${statusLabel}</span>
        </div>
      </div>
    `;
  }).join('');
}

function renderOwnerBookings(filterTab = 'today') {
  document.querySelectorAll('.owner-tab-chip').forEach(c => c.classList.remove('active'));
  document.getElementById(`ownerTab${filterTab.charAt(0).toUpperCase() + filterTab.slice(1)}`)?.classList.add('active');

  const container = document.getElementById('ownerBookingsListContainer');
  const list = state.ownerBookingsList[filterTab] || [];

  container.innerHTML = list.map(b => `
    <div class="owner-booking-card">
      <div class="owner-card-top">
        <span class="owner-cust-title">${b.name} (${b.vehicle})</span>
        <span class="status-badge-chip status-confirmed">${b.status}</span>
      </div>
      <div style="font-size: 0.78rem; color: #475569; margin: 4px 0 8px;">
        <strong>${b.service}</strong> • ${b.date} • ${b.time}
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 0.95rem; font-weight: 800; color: #0f172a;">${b.price}</span>
        <span style="font-size: 0.7rem; color: #64748b;">Bay 1 Scheduled</span>
      </div>
      <div class="owner-card-actions">
        <button class="btn-owner-action" onclick="showToast('Customer notified')">📞 Call</button>
        <button class="btn-owner-action primary-act" onclick="showToast('Moved to Active Bay')">Mark In-Bay</button>
        <button class="btn-owner-action" onclick="showToast('Marked as Completed')">✓ Complete</button>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   UI NOTIFICATION TOAST
   ========================================================================== */
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById('toastNotice');
  if (!toast) return;
  
  toast.innerHTML = `<span>✨</span> ${message}`;
  toast.classList.add('show');
  
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}

/* ==========================================================================
   VIEWPORT TOGGLE (Mobile 390px vs Desktop Full View)
   ========================================================================== */
function setDeviceMode(mode) {
  const wrapper = document.getElementById('viewportWrapper');
  const btnMobile = document.getElementById('btnModeMobile');
  const btnDesktop = document.getElementById('btnModeDesktop');

  if (mode === 'mobile') {
    wrapper.classList.remove('mode-desktop');
    wrapper.classList.add('mode-mobile');
    btnMobile.classList.add('active');
    btnDesktop.classList.remove('active');
    showToast('Switched to 390px Mobile View');
  } else {
    wrapper.classList.remove('mode-mobile');
    wrapper.classList.add('mode-desktop');
    btnDesktop.classList.add('active');
    btnMobile.classList.remove('active');
    showToast('Switched to Desktop Adaptation View');
  }
}

/* ==========================================================================
   INITIALIZATION & EVENT LISTENERS
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // Render listings on startup
  renderShopsList('all');

  // Search input live filter
  const searchInput = document.getElementById('shopSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderShopsList(state.currentFilter || 'all', e.target.value);
    });
  }

  // Filter pills
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.getAttribute('data-filter');
      state.currentFilter = filter;
      renderShopsList(filter, searchInput ? searchInput.value : '');
    });
  });

  // Jump Selector in Prototype bar
  const jumpSelect = document.getElementById('jumpSelect');
  if (jumpSelect) {
    jumpSelect.addEventListener('change', (e) => {
      navigateTo(e.target.value);
    });
  }

  // Start on Home Screen
  navigateTo('screen-home');
});
