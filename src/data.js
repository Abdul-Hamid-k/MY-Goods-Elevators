// Single place to edit site content.

export const COMPANY = {
  name: 'M.Y. Goods Elevators & Machinery Works',
  short: 'M.Y. Goods Elevators',
  since: 1990,
  city: 'Indore, Madhya Pradesh',
  address: '5, Roshan Nagar, Khajrana, Indore – 452016, Madhya Pradesh, India',
}

// TODO: replace with the real numbers/email (not readable on the old website).
export const CONTACT = {
  phoneLabel: '+91 00000 00000',
  tel: '+910000000000',
  whatsapp: '910000000000', // country code + number, no "+"
  email: 'info@example.com',
  person: 'Yusuf Khatree',
  role: 'CEO',
}

export const NAV = [
  ['Services', '#services'],
  ['Lift Models', '#models'],
  ['Our Work', '#work'],
  ['Process', '#process'],
  ['Clients', '#clients'],
  ['Contact', '#contact'],
]

export const SERVICES = [
  { t: 'Goods Lifts & Elevators', d: 'Heavy-duty goods lifts and industrial elevators for factories, warehouses, shops and godowns.' },
  { t: 'Hydraulic Goods Lifts', d: 'Smooth hydraulic MS lifts built for loading, unloading and multi-floor material movement.' },
  { t: 'Dumbwaiter, Kitchen & Lab Lifts', d: 'Compact hydraulic and stainless steel dumbwaiters that move food, samples and light goods between floors for hotels, restaurants, labs and shops.' },
  { t: 'Wall-Mounted Goods Lifts', d: 'Space-saving goods lifts mounted on the building wall, ideal where a full shaft is not possible.' },
  { t: 'Single-Sided Loading Lifts', d: 'Loading lifts with single-sided access for docks, godowns and shops.' },
  { t: 'Industrial Elevators', d: 'Industrial goods elevators and goods-cum-passenger elevators built for daily heavy use.' },
  { t: 'Platform & Loading Lifts', d: 'Platform and loading lifts for docks, showrooms and workshops.' },
  { t: 'Stainless Steel Elevators', d: 'Clean, corrosion-resistant stainless steel lifts with a premium finish.' },
  { t: 'Elevator Panels & Control', d: 'Manufacture and replacement of elevator control panels, wiring and safety gear.' },
  { t: 'Installation & AMC', d: 'On-site installation, commissioning, annual maintenance contracts and breakdown repair.' },
  { t: 'Machinery Works', d: 'Custom fabrication, repair and machinery work from our own workshop.' },
]

export const MODELS = [
  {
    id: 'goods',
    name: 'Goods Lift',
    blurb: 'Open-cage industrial goods lift with a heavy MS platform, guide rails and safety gates.',
    specs: [['Use', 'Factories, warehouses, godowns'], ['Drive', 'Geared traction / hydraulic'], ['Build', 'Mild steel, powder coated'], ['Safety', 'Gate interlocks, overload protection']],
  },
  {
    id: 'passenger',
    name: 'Passenger / SS Elevator',
    blurb: 'Enclosed stainless steel cabin with automatic doors, LED lighting and a floor indicator.',
    specs: [['Use', 'Homes, offices, showrooms'], ['Cabin', 'Stainless steel finish'], ['Doors', 'Automatic sliding'], ['Control', 'Microprocessor panel']],
  },
  {
    id: 'hydraulic',
    name: 'Hydraulic Platform Lift',
    blurb: 'Scissor-type hydraulic platform for loading bays, workshops and showrooms.',
    specs: [['Use', 'Loading, workshops, display'], ['Drive', 'Hydraulic power pack'], ['Build', 'Heavy MS scissor arms'], ['Travel', 'Custom to site']],
  },
  {
    id: 'hydraulicGoods',
    name: 'Hydraulic Goods Lift',
    blurb: 'Ram-driven MS goods lift with an enclosed shaft and a power pack beside it. Smooth, quiet and needs no overhead machine room.',
    specs: [['Use', 'Factories, godowns, multi-floor shops'], ['Drive', 'Hydraulic ram + power pack'], ['Build', 'Heavy MS frame and platform'], ['Travel', 'Custom to site']],
  },
  {
    id: 'dumbwaiter',
    name: 'Kitchen / Lab Dumbwaiter',
    blurb: 'Compact stainless steel dumbwaiter that carries food, samples and files between floors through a floor hatch.',
    specs: [['Use', 'Kitchens, restaurants, labs, shops'], ['Car', 'Stainless steel, with shelf'], ['Options', 'Hydraulic or geared drive'], ['Size', 'Made to order']],
  },
  {
    id: 'wall',
    name: 'Wall-Mounted Goods Lift',
    blurb: 'Space-saving goods lift fixed to the building wall. No full shaft needed, ideal for shops and tight sites.',
    specs: [['Use', 'Shops, godowns, narrow sites'], ['Mounting', 'Wall guide rails'], ['Build', 'MS carriage with side guards'], ['Travel', 'Custom to site']],
  },
  {
    id: 'loading',
    name: 'Single-Sided Loading Lift',
    blurb: 'Platform lift that rises from ground level to dock level and is loaded from one side, built for trucks and loading bays.',
    specs: [['Use', 'Docks, loading bays, showrooms'], ['Access', 'Single side loading'], ['Safety', 'Side rails and front guard'], ['Travel', 'Ground to dock height']],
  },
  {
    id: 'panel',
    name: 'Elevator Control Panel',
    blurb: 'Control panels made in our workshop, with display, push buttons, status lamps and safety wiring. Also supplied as replacement panels.',
    specs: [['Use', 'New lifts and panel replacement'], ['Control', 'Microprocessor based'], ['Includes', 'Display, buttons, status lamps'], ['Wiring', 'Tested before dispatch']],
  },
]

export const STEPS = [
  ['01', 'Site Survey', 'We visit, measure the shaft or space and understand your load and usage.'],
  ['02', 'Design & Quote', 'A clear drawing and transparent quotation for the right lift.'],
  ['03', 'Manufacture', 'Fabricated and wired in our own workshop with quality components.'],
  ['04', 'Install & Test', 'Installation, safety testing and handover by our trained team.'],
  ['05', 'Service', 'AMC plans and quick breakdown support after installation.'],
]

export const WHY = [
  'Manufacturer, not a middleman',
  'Custom sizes for your site',
  'Safety-first build and testing',
  'Installation and after-sales service in-house',
]

export const STRENGTHS = [
  'Competitive pricing',
  'Bulk-order capability',
  'Timely delivery by road',
  'Customised packaging',
]

export const CREDENTIALS = [
  'UDYAM registered',
  'GST registered',
  'IndiaMART TrustSeal verified',
]

// Clients from the previous website. Confirm the owner is happy to display each name (see TODO.md).
export const CLIENTS = [
  ['Healthcare', ['Bombay Hospital Indore', 'Askon Health Care Ujjain', 'Cureza Healthcare', 'S M S Energy Hospital']],
  ['Food & Confectionery', ['Amber Confectionery', 'Joshi Sweets Pune', 'Rajesh Food Products', 'Ajmer Food Industries', 'Namkeen Cluster Indore']],
  ['Pharma & Nutrition', ['Eamon Drugs', 'Candylake Nutritions']],
  ['Hospitality', ['On The Rocks Restaurant', 'Celebrity (Hotel Shrimaya) Indore']],
  ['Industry & Others', ['Crossroads Clothing', 'Aadinath Flexipack', 'Anni Industries', 'Bharat Feeds and Extractions', 'Sri Satya Sai Vidhya Vihar', 'Rathore Auto Electric Works']],
]
