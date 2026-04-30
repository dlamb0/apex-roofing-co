export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  icon: string;
  features: string[];
  image: string;
  priceRange: string;
  duration: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  service: string;
  date: string;
  avatar: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  body: unknown;
  publishedAt: string;
  mainImage?: { asset: { url: string }; alt: string };
  author: { name: string; image?: { asset: { url: string } } };
  categories: { title: string }[];
  estimatedReadingTime?: number;
}

export interface QuoteFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  serviceType: string;
  roofSize?: string;
  urgency: string;
  description: string;
  preferredContact: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface PricingTier {
  name: string;
  pricePerSqFt: number;
  features: string[];
  recommended?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
