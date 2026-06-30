/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, ServiceOffer } from './types';

export const productsList: Product[] = [
  {
    id: 'prod-1',
    name: 'Organic All-Purpose',
    price: 499,
    description: 'Versatile cleaner for surfaces, leaving a subtle citrus scent.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC16iAoitCCLczDlVAEsVDUd8AQ54uELvdBFRRVIrjy3u8fJ1KvEhCu66FekS5PV8IiZJV2FaFWfyNODie_C5gQ-nJrrDgcD0aKhjjj1iZ4wVU_j8XZ18JMHB40SENyhysRc8N4VkpN6IW1OkDkUrhHJgkAJZC_QEVmIIl5huWvBDRJe41sCaLzXouIQgduNJmVFIduQSySGEkfuo3H24oqxNH30Ln3Xm3FvWJl2BwxmbzyB4VNTConowXKBXEuvMUMutOkQecU4l8',
    category: 'Eco-Friendly Essentials',
    dataAlt: 'A minimalist setup of a clear glass spray bottle filled with light amber organic all-purpose cleaner with a bamboo nozzle on white marble countertop.',
    isFeatured: true
  },
  {
    id: 'prod-2',
    name: 'Natural Dish Soap',
    price: 349,
    description: 'Tough on grease, gentle on hands with organic aloe extract.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdk_j8Mn-lQ-pwm4Z0Ap-lO8TjKf1Scu3A1Kts9UGpNSyiDlIgn2tHIQpmtJ6rEmqSEHhPktrKEJWE0wvgrqQYuboFo-Ypj0UCtCqmiAqjVfoItbzSQ1cqweZ3JhXmDaaiAoFNizS6F8n1CYmv5YNTvucC0aP4_hSZU9WHVMfAfe1GsQynYNfy95KrA8RIQ4p7JlhhQ3wVbFV5UQz287Ch72VqfzpOg85E2dFEU9_o3DoV7tuNKgpg88D2LtmgjgKStTD2qdt4Rrc',
    category: 'Gentle Cleansing',
    dataAlt: 'A clear glass pump bottle containing natural dish soap with a slight golden hue on a slate grey surface next to a natural sponge.',
    isFeatured: true
  },
  {
    id: 'prod-3',
    name: 'Glass Cleaner',
    price: 399,
    description: 'Streak-free shine for windows and mirrors, formulated with plant extract.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDF1hEjmz3zyZqURNPmgsHqi8FN7ZKX6ROgoA2FN6AUoHCWfn4phVtYJvr-jQQAP_A1oLDc_906ybzd3GwTV2OFhF80CB-6iBXe8FRmJvG4c3AgyiKsvxnCvOkVgMqvCOewb4JRvQ8T1P0VVcJqOfCEd3Ek55gDypIP1N81sXzuIDgjE-npZrGXncsyjreLH9xpNb22DAtWd-nPt-mhwjAsf4CSYnOlw6PWdWWNEYh4L_rOCYgF24RPK-K40ZDG9tRLlmgXxi0UfHE',
    category: 'Eco-Friendly Essentials',
    dataAlt: 'A sleek glass bottle of plant-based glass cleaner with a black spray nozzle against a bright window.',
    isFeatured: true
  },
  {
    id: 'prod-4',
    name: 'Essentials Kit',
    price: 1199,
    description: 'The complete set for a comprehensively clean home, including bottle rack.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCns3Bvb5O6ZUcTB9SikjpuhMCqnG5gUNuuw8hXv1TWTIIwQoH-DSPaW7y48SSWbkf4J-81lyUQVKzjJHaqorprNb9dHq7oYxwxnrRF3k3rHfcXwKcCO5E7tdjQV1lj03LZ5cJLlUmH7gqZpjtcQf0-c7_1mZTW_dzZGatXEDnUymk3f9oy-60xZ5ChRD-vMKXFGGGWEtcr3Z1E0gfpzafSfAvhkCbAjyvk0c84CFPeCz7MsC6wuJg4HLEXHzVxj1453xUJsW_xejA',
    category: 'Eco-Friendly Essentials',
    dataAlt: 'A curated set of three eco-home essential cleaning bottles neatly arranged in a minimalist white wire basket.',
    isFeatured: true
  },
  {
    id: 'prod-5',
    name: 'Eucalyptus Air Mist',
    price: 449,
    description: 'Revitalize any space with therapeutic eucalyptus, pure pine, and organic tea tree oils.',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80',
    category: 'Eco-Friendly Essentials',
    dataAlt: 'A beautiful amber mist glass bottle with eucalyptus leaves and rich dark background.',
    isFeatured: false
  },
  {
    id: 'prod-6',
    name: 'Botanical Floor Polish',
    price: 699,
    description: 'Nourish hardwood, tiles, and laminate finishes cleanly using organic cold-pressed coconut extracts.',
    image: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=600&q=80',
    category: 'Gentle Cleansing',
    dataAlt: 'Spacious light and modern wooden floor showing premium botanical floor maintenance texture.',
    isFeatured: false
  },
  {
    id: 'prod-7',
    name: 'Bamboo Scrub Brush Set',
    price: 549,
    description: 'Eco-friendly, completely biodegradable durable bamboo scrubbers with sisal bristles.',
    image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=600&q=80',
    category: 'Eco-Friendly Essentials',
    dataAlt: 'A set of two aesthetic round bamboo scrub brushes with coconut shell scrubbing elements.',
    isFeatured: false
  },
  {
    id: 'prod-8',
    name: 'Lavender Carpet Freshener',
    price: 429,
    description: 'Pure botanical baking soda and french lavender oil infusion that completely neutralizes carpet odors.',
    image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=600&q=80',
    category: 'Gentle Cleansing',
    dataAlt: 'French lavender stalk bundles arranged elegantly on clean beige fabric canvas.',
    isFeatured: false
  },
  {
    id: 'prod-9',
    name: 'Natural Stain Remover',
    price: 389,
    description: 'Quick-acting bio-enzymatic spray that targets textile spots and fabric smudges cleanly.',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=600&q=80',
    category: 'Eco-Friendly Essentials',
    dataAlt: 'A clean set of bathroom ceramics and dynamic cleaning mist containers on a minimalist sink table.',
    isFeatured: false
  },
  {
    id: 'prod-10',
    name: 'Citrus Kitchen Degreaser',
    price: 479,
    description: 'Heavy-duty pure D-limonene degreasing power sourced from dynamic natural orange peels.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80',
    category: 'Eco-Friendly Essentials',
    dataAlt: 'A beautifully clean and neat white and grey modern luxurious kitchen stove and backdrop.',
    isFeatured: false
  }
];

export const servicesList: ServiceOffer[] = [
  {
    id: 'srv-residential',
    title: 'Residential Cleaning',
    description: 'Transform your home into a pristine sanctuary. Our residential services go beyond the surface, offering deep-cleaning techniques that leave every room feeling refreshed, hygienic, and perfectly ordered.',
    category: 'residential',
    badge: 'Home Oasis',
    features: [
      'Deep Steam Cleaning for Carpets & Upholstery',
      'Meticulous Kitchen & Bathroom Sanitization',
      'Eco-Friendly, Pet-Safe Product Options'
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANC-zVdGYwtEz3TH_Nl6QeeRG4Pjf_ICcf0mqNaRMuSzoUyB7edLJ7K_2qHifiBiYm0d7ie1Zwxeg3G7_n2bHATKfxRbbEt1JVnhbfnRMW_yPRtF-dzD6Q4318ONuHV7S8KJrcLYBqwWAuISCAHVKKjCHpwf0sFCXRLHxfREdVFWXPJglqZcPtB5g5dR9oVlXiP1U7eXCrQ0uOJIcDYAmKK-Z0rza_E5eQ9JSDBynNZou1vZLZZLFWvQtAzLnZomHXiFmEJnluf98',
    estimatedPrice: 4999
  },
  {
    id: 'srv-deep-cleaning',
    title: 'Deep Cleaning',
    description: 'A thorough deep clean for homes and offices — we reach behind appliances, inside cabinets, along skirting, and every corner that regular cleaning misses.',
    category: 'residential',
    badge: 'Deep Clean Service',
    features: [
      'Kitchen and bathroom deep sanitization',
      'Detailed skirting, switch and fixture cleaning',
      'Cabinets, shelves and behind-appliance cleaning'
    ],
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
    estimatedPrice: 6999
  },
  {
    id: 'srv-commercial',
    title: 'Commercial Cleaning',
    description: 'Maintain an impeccable professional environment. We provide scalable, discreet, and highly efficient cleaning services for offices, lobbies, and commercial facilities, ensuring your business always presents its best face.',
    category: 'commercial',
    badge: 'Enterprise Standard',
    features: [
      'After-Hours Comprehensive Janitorial Services',
      'High-Traffic Area Hard Floor Care & Polishing',
      'Customized Routine Schedules Tailored to Your Needs'
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBz6GHckGljCrYtxLpMkSONhz3TnNjrHO1DLyJ1JyZFskyvTCnhzYFep1P9KBATt7pB0jsqSyZWq5iD8sW_t4SXIv6xHBkQdR_SB0wmq_b_VwkRF41T19ljhr_RjZKZGJx7hKap70v8vWxUUYLZMZnFyzJKIMNNPC1_BdsA3WZd6esuuwY8LHcKZC6ig-KDCgCgCF-j-H8NyWtRTPgbfPu3jUTZKsStBClGArE26F7XbuaFFz14gdfprFzAen8lTtK54IVC4kwqNFo',
    estimatedPrice: 9999
  }
];
