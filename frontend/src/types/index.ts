export interface Testimonial {
  id: number;
  name: string;
  role: string; // 'donor' or 'recipient'
  quote: string;
  image: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: 'general' | 'donor' | 'recipient';
}

export interface Statistic {
  id: number;
  value: string;
  label: string;
  icon: string;
}