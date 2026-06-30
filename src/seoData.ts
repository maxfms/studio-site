export interface SeoPageConfig {
  title: string;
  description: string;
  canonicalPath: string;
}

export interface ServiceSeoItem {
  id: string;
  title: string;
  keyword: string;
  summary: string;
  areaFocus: string;
}

export const siteSeo = {
  businessName: 'MAXFMS',
  siteUrl: 'https://maxfms.com',
  phone: '+91-98765-43210',
  email: 'info@maxfms.com',
  address: {
    streetAddress: 'Hyderabad',
    addressLocality: 'Hyderabad',
    addressRegion: 'Telangana',
    postalCode: '500001',
    addressCountry: 'IN'
  },
  areasServed: [
    'Hyderabad',
    'Secunderabad',
    'Vijayawada',
    'Visakhapatnam',
    'Guntur',
    'Tirupati',
    'Nellore',
    'Warangal',
    'Kakinada',
    'Rajahmundry',
    'Karimnagar',
    'Andhra Pradesh',
    'Telangana'
  ],
  openingHours: [
    {
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '20:00'
    },
    {
      dayOfWeek: ['Sunday'],
      opens: '09:00',
      closes: '18:00'
    }
  ]
};

export const pageSeo: Record<string, SeoPageConfig> = {
  home: {
    title: 'Professional Cleaning Services in AP & Telangana | MAXFMS',
    description: 'MAXFMS offers AC cleaning, floor cleaning, deep cleaning, sofa and carpet cleaning, kitchen and bathroom cleaning, tank cleaning and office housekeeping across Hyderabad, Vijayawada, Vizag and nearby cities.',
    canonicalPath: '/'
  },
  services: {
    title: 'Residential & Commercial Cleaning Services in AP & Telangana | MAXFMS',
    description: 'Book reliable residential and commercial cleaning services in Hyderabad, Vijayawada, Vizag, Guntur, Tirupati, Warangal, Nellore and nearby areas with MAXFMS.',
    canonicalPath: '/services'
  },
  products: {
    title: 'Eco-Friendly Cleaning Chemicals and Supplies | MAXFMS',
    description: 'Browse eco-safe cleaning chemical products and essential supplies from MAXFMS for homes, offices and commercial spaces across AP and Telangana.',
    canonicalPath: '/products'
  },
  about: {
    title: 'About MAXFMS Cleaning and Facility Services',
    description: 'Learn how MAXFMS delivers trusted cleaning and facility support for homes, offices and commercial spaces across Andhra Pradesh and Telangana.',
    canonicalPath: '/about'
  },
  contact: {
    title: 'Contact MAXFMS for Cleaning Quotes in AP & Telangana',
    description: 'Get a quote for AC cleaning, floor cleaning, deep cleaning, office housekeeping and more from MAXFMS in Hyderabad and nearby cities.',
    canonicalPath: '/contact'
  },
  testimonials: {
    title: 'Customer Reviews for MAXFMS Cleaning Services',
    description: 'See how MAXFMS customers rate our cleaning services for homes, offices and commercial spaces across AP and Telangana.',
    canonicalPath: '/testimonials'
  },
  portal: {
    title: 'MAXFMS Portal for Booking and Service Management',
    description: 'Use the MAXFMS portal to book cleaning services, track appointments and manage your cleaning needs with ease.',
    canonicalPath: '/portal'
  },
  dashboard: {
    title: 'MAXFMS Dashboard',
    description: 'Track your bookings, inquiries and cleaning service activity in the MAXFMS dashboard.',
    canonicalPath: '/dashboard'
  }
};

export const serviceSeoItems: ServiceSeoItem[] = [
  {
    id: 'ac-cleaning',
    title: 'AC Cleaning',
    keyword: 'ac cleaning services',
    summary: 'Improve cooling, airflow and indoor air quality with professional AC cleaning for homes, offices and shops.',
    areaFocus: 'Hyderabad, Secunderabad and nearby localities'
  },
  {
    id: 'floor-cleaning',
    title: 'Floor Cleaning',
    keyword: 'floor cleaning services',
    summary: 'Refresh tile, marble, granite and cement floors with deep cleaning built for daily traffic and heavy use.',
    areaFocus: 'Vijayawada, Vizag, Guntur and commercial spaces'
  },
  {
    id: 'deep-cleaning',
    title: 'Deep Cleaning',
    keyword: 'deep cleaning services',
    summary: 'Get a thorough reset for kitchens, bathrooms, corners, shelves and hidden areas that regular cleaning misses.',
    areaFocus: 'Apartments, homes and offices across AP and Telangana'
  },
  {
    id: 'sofa-carpet',
    title: 'Sofa & Carpet Cleaning',
    keyword: 'sofa and carpet cleaning',
    summary: 'Remove dust, stains and odors from upholstery and carpets with safe, fabric-friendly cleaning methods.',
    areaFocus: 'Residential homes and offices in major city areas'
  },
  {
    id: 'kitchen-cleaning',
    title: 'Kitchen Cleaning',
    keyword: 'kitchen cleaning services',
    summary: 'Clean grease, oil, cabinets, chimneys, backsplashes and food-prep surfaces with a hygienic finish.',
    areaFocus: 'Homes, villas and apartment kitchens'
  },
  {
    id: 'bathroom-cleaning',
    title: 'Bathroom Cleaning',
    keyword: 'bathroom cleaning services',
    summary: 'Restore shine, hygiene and freshness to tiles, sanitary fittings, mirrors and shower areas.',
    areaFocus: 'Residential and commercial washrooms'
  },
  {
    id: 'tank-cleaning',
    title: 'Tank Cleaning',
    keyword: 'tank cleaning services',
    summary: 'Keep water storage safe and clean with professional tank cleaning for residential and commercial properties.',
    areaFocus: 'Apartment complexes and independent homes'
  },
  {
    id: 'office-cleaning',
    title: 'Office & Housekeeping',
    keyword: 'office cleaning services',
    summary: 'Maintain professional workplaces with scheduled office cleaning, common-area care and housekeeping support.',
    areaFocus: 'Offices, clinics, retail spaces and business premises'
  }
];

export function buildLocalBusinessSchema(pathname = '/') {
  return {
    '@context': 'https://schema.org',
    '@type': 'CleaningService',
    name: siteSeo.businessName,
    url: `${siteSeo.siteUrl}${pathname === '/' ? '' : pathname}`,
    telephone: siteSeo.phone,
    email: siteSeo.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteSeo.address.streetAddress,
      addressLocality: siteSeo.address.addressLocality,
      addressRegion: siteSeo.address.addressRegion,
      postalCode: siteSeo.address.postalCode,
      addressCountry: siteSeo.address.addressCountry
    },
    areaServed: siteSeo.areasServed,
    priceRange: '₹₹',
    openingHoursSpecification: siteSeo.openingHours.map((schedule) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: schedule.dayOfWeek,
      opens: schedule.opens,
      closes: schedule.closes
    })),
    sameAs: ['https://www.facebook.com', 'https://www.instagram.com']
  };
}
