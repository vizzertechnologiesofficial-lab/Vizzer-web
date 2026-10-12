import pitchitIcon from '../assets/apps/pitchit-icon.png'
import restroIcon from '../assets/apps/restro-icon.png'
import siyyanaIcon from '../assets/apps/siyyana-icon.png'

// Order matters: it matches the hero headline ("the gate, the table, the home and the pitch").
// Store links: paste the Play Store / App Store URLs once the listings are live under
// the Vizzer accounts and a download button will appear automatically.
export const products = [
  {
    id: 'gater',
    name: 'Gater',
    word: 'gate',
    kind: 'Visitor management',
    title: 'Gater replaces the paper register at your gate.',
    body:
      'Visitors scan a QR code at the entrance, fill your form on their own phone, and the guard clears them in seconds. Every visit lands in a log you can search by name, date or vehicle.',
    points: [
      'Build the visitor form your gate needs, no developer required',
      'Reusable passes for staff, vendors and contractors',
      'Visitors without a smartphone are added by the guard in the same log',
      'Each site gets its own isolated database with a full audit trail',
    ],
    platforms: ['Web app', 'Works on any phone'],
    fact: { value: '₹499', label: 'a month per site, after a 7 day free trial' },
    link: { href: 'https://www.gaterlogs.com/', label: 'Visit gaterlogs.com' },
    icon: null,
    tile: '#E7F3F0',
    accent: { light: '#137566', dark: '#4FCDB2' },
    stage: { light: '#E6F2EE', dark: '#0A1C19' },
  },
  {
    id: 'restro',
    name: 'Restro',
    word: 'table',
    kind: 'Restaurant deals',
    title: 'Restro puts the best food deals nearby in one feed.',
    body:
      'Diners browse offers around them by category, claim a coupon and redeem it at the counter. Restaurants sign up as vendors, post their own offers and run promoted banners.',
    points: [
      'Offers near you, filtered by category',
      'Coupons with claim limits and expiry times',
      'Vendor dashboard for offers, banners and redemptions',
      'Banner subscriptions paid in app through Razorpay',
    ],
    platforms: ['Android', 'iOS'],
    stores: { play: '', apple: '' },
    icon: restroIcon,
    tile: '#B9D3B3',
    accent: { light: '#C4502C', dark: '#F28A62' },
    stage: { light: '#F8ECE5', dark: '#1D120C' },
  },
  {
    id: 'siyyana',
    name: 'Siyyana',
    word: 'home',
    kind: 'Home services',
    title: 'Siyyana books trusted help for your home.',
    body:
      'Pick a service, choose a verified specialist, set a date and a time slot, then close the job with a completion PIN. The whole app works in Arabic and English.',
    points: [
      'Cleaning, laundry, cooking, gardening, car care and repairs',
      'Specialists sign up with a government ID and documents',
      'Time slots, ratings and reviews on every booking',
      'Results within 25 km of where you are',
    ],
    platforms: ['Android', 'iOS'],
    fact: { value: 'AR + EN', label: 'built for both languages from the first screen' },
    stores: { play: '', apple: '' },
    icon: siyyanaIcon,
    tile: '#FFFFFF',
    accent: { light: '#056C95', dark: '#5BBDE6' },
    stage: { light: '#E5EFF6', dark: '#07161F' },
  },
  {
    id: 'pitchit',
    name: 'Pitch It',
    word: 'pitch',
    kind: 'Founders and investors',
    title: 'Pitch It turns a business idea into a meeting with an investor.',
    body:
      'Founders post short video pitches with their stage, investment range and margin. Investors connect with the ideas they like and book a call on Zoom or Google Meet.',
    points: [
      'Video pitches in a full screen scrolling feed',
      'Profiles for entrepreneurs, investors and explorers',
      'Connections and direct messages',
      'Meeting requests with Zoom or Google Meet links',
    ],
    platforms: ['Android', 'iOS'],
    stores: { play: '', apple: '' },
    icon: pitchitIcon,
    tile: '#2F5734',
    accent: { light: '#36603C', dark: '#A6D94A' },
    stage: { light: '#EDF3E3', dark: '#11190B' },
  },
]

export const productById = Object.fromEntries(products.map((p) => [p.id, p]))
