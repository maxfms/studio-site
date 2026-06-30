import { pageSeo, serviceSeoItems, buildLocalBusinessSchema, siteSeo } from './seoData';

export function getPageSeo(pageId: string) {
  return pageSeo[pageId] ?? pageSeo.home;
}

export function getServiceSeoById(serviceId: string) {
  return serviceSeoItems.find((item) => item.id === serviceId) ?? serviceSeoItems[0];
}

export function buildFaqSchema(faqItems: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
}

export function buildServiceSchema(serviceName: string, pathname = '/') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: serviceName,
    provider: {
      '@type': 'LocalBusiness',
      name: siteSeo.businessName,
      telephone: siteSeo.phone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: siteSeo.address.addressLocality,
        addressRegion: siteSeo.address.addressRegion,
        addressCountry: siteSeo.address.addressCountry
      }
    },
    areaServed: siteSeo.areasServed,
    url: `${siteSeo.siteUrl}${pathname === '/' ? '' : pathname}`
  };
}
