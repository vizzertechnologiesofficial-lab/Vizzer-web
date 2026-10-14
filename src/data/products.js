import pitchitIcon from '../assets/apps/pitchit-icon.png'
import restroIcon from '../assets/apps/restro-icon.png'
import siyyanaIcon from '../assets/apps/siyyana-icon.png'
import gaterIcon from '../assets/apps/gater-icon.png'

// Order follows the company content guide: Siyyana, Gater, Restro, Pitch IT.
// `summary` is the one sentence shown on the home page; `audience` is who the product is for.
// Store links: paste the Play Store / App Store URLs once the listings are live under
// the Vizzer accounts and a download button will appear automatically.
export const products = [
  {
    id: 'siyyana',
    name: 'Siyyana',
    word: 'home',
    kind: 'Home services',
    summary:
      'A home services app, in Arabic and English, that helps households book verified specialists for cleaning, cooking, repairs and more.',
    audience: 'Households that need trusted help at home, and the verified specialists who provide it.',
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
    id: 'gater',
    name: 'Gater',
    word: 'gate',
    kind: 'Visitor management',
    summary:
      'A visitor management app that replaces the paper register at the gate, for sites that check visitors in and the guards who run the entrance.',
    audience: 'Sites that check visitors in at a gate, and the guards who run it.',
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
    icon: gaterIcon,
    tile: '#F8F3EF',
    accent: { light: '#137566', dark: '#4FCDB2' },
    stage: { light: '#E6F2EE', dark: '#0A1C19' },
  },
  {
    id: 'restro',
    name: 'Restro',
    word: 'table',
    kind: 'Restaurant deals',
    summary:
      'A restaurant deals app that helps diners find offers nearby and lets restaurants post and promote their own.',
    audience: 'Diners looking for food deals nearby, and the restaurants that want to reach them.',
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
    id: 'pitchit',
    name: 'Pitch IT',
    word: 'pitch',
    kind: 'Founders and investors',
    summary:
      'A video pitch app that connects founders looking for investment with investors looking for their next idea.',
    audience: 'Founders raising investment, and investors looking for new ideas.',
    title: 'Pitch IT turns a business idea into a meeting with an investor.',
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
