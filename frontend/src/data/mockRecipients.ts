import { differenceInMonths, differenceInDays } from 'date-fns';

export interface MedicalCondition {
  diagnosis?: string;
  chronicDiseases: string[];
  infections: {
    hiv: boolean;
    hepatitis: boolean;
    tuberculosis: boolean;
  };
  allergies: string[];
  previousTransplants: boolean;
  recentMedications: string[];
  smokingHistory: boolean;
  alcoholUse: boolean;
}

export interface Recipient {
  id: string;
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  age: number;
  email: string;
  phone: string;
  bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  requiredOrgan: 'Kidney' | 'Liver' | 'Heart' | 'Lung' | 'Pancreas' | 'Intestine';
  waitingSince: Date;
  medicalCondition: MedicalCondition;
  status: 'Pending' | 'Matched' | 'None' | 'Transplanted';
}

// Generate dates in the past with varying waiting times
const generatePastDate = (monthsAgo: number): Date => {
  const date = new Date();
  date.setMonth(date.getMonth() - monthsAgo);
  return date;
};

export const mck: Recipient[] = [
  {
    id: '1',
    name: 'John Smith',
    gender: 'Male',
    age: 45,
    email: 'johnsmith@example.com',
    phone: '5551234567',
    bloodType: 'O+',
    requiredOrgan: 'Kidney',
    waitingSince: generatePastDate(36), // 3 years ago
    medicalCondition: {
      diagnosis: 'End-stage renal disease',
      chronicDiseases: ['Hypertension', 'Diabetes'],
      infections: {
        hiv: false,
        hepatitis: false,
        tuberculosis: false,
      },
      allergies: ['Penicillin'],
      previousTransplants: false,
      recentMedications: ['Insulin', 'Lisinopril'],
      smokingHistory: false,
      alcoholUse: false,
    },
    status: 'Pending',
  },
  {
    id: '2',
    name: 'Maria Garcia',
    gender: 'Female',
    age: 38,
    email: 'mariagarcia@example.com',
    phone: '5559876543',
    bloodType: 'A+',
    requiredOrgan: 'Liver',
    waitingSince: generatePastDate(24), // 2 years ago
    medicalCondition: {
      diagnosis: 'Cirrhosis',
      chronicDiseases: ['Hepatitis C'],
      infections: {
        hiv: false,
        hepatitis: true,
        tuberculosis: false,
      },
      allergies: [],
      previousTransplants: false,
      recentMedications: ['Lactulose', 'Spironolactone'],
      smokingHistory: false,
      alcoholUse: false,
    },
    status: 'Pending',
  },
  {
    id: '3',
    name: 'David Johnson',
    gender: 'Male',
    age: 52,
    email: 'davidjohnson@example.com',
    phone: '5552223333',
    bloodType: 'B-',
    requiredOrgan: 'Heart',
    waitingSince: generatePastDate(18), // 1.5 years ago
    medicalCondition: {
      diagnosis: 'Dilated cardiomyopathy',
      chronicDiseases: ['Congestive Heart Failure'],
      infections: {
        hiv: false,
        hepatitis: false,
        tuberculosis: false,
      },
      allergies: ['Sulfa drugs'],
      previousTransplants: false,
      recentMedications: ['Metoprolol', 'Furosemide'],
      smokingHistory: true,
      alcoholUse: false,
    },
    status: 'Pending',
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    gender: 'Female',
    age: 29,
    email: 'sarahwilson@example.com',
    phone: '5554445555',
    bloodType: 'AB+',
    requiredOrgan: 'Lung',
    waitingSince: generatePastDate(12), // 1 year ago
    medicalCondition: {
      diagnosis: 'Cystic fibrosis',
      chronicDiseases: ['Recurrent Pneumonia'],
      infections: {
        hiv: false,
        hepatitis: false,
        tuberculosis: false,
      },
      allergies: [],
      previousTransplants: false,
      recentMedications: ['Azithromycin', 'Albuterol'],
      smokingHistory: false,
      alcoholUse: false,
    },
    status: 'Pending',
  },
  {
    id: '5',
    name: 'Michael Chen',
    gender: 'Male',
    age: 41,
    email: 'michaelchen@example.com',
    phone: '5556667777',
    bloodType: 'A-',
    requiredOrgan: 'Pancreas',
    waitingSince: generatePastDate(9), // 9 months ago
    medicalCondition: {
      diagnosis: 'Type 1 Diabetes',
      chronicDiseases: ['Diabetic Nephropathy'],
      infections: {
        hiv: false,
        hepatitis: false,
        tuberculosis: false,
      },
      allergies: ['Latex'],
      previousTransplants: false,
      recentMedications: ['Insulin', 'Lisinopril'],
      smokingHistory: false,
      alcoholUse: false,
    },
    status: 'Pending',
  },
  {
    id: '6',
    name: 'Emma Rodriguez',
    gender: 'Female',
    age: 35,
    email: 'emmarodriguez@example.com',
    phone: '5558889999',
    bloodType: 'O-',
    requiredOrgan: 'Kidney',
    waitingSince: generatePastDate(6), // 6 months ago
    medicalCondition: {
      diagnosis: 'Polycystic Kidney Disease',
      chronicDiseases: ['Hypertension'],
      infections: {
        hiv: false,
        hepatitis: false,
        tuberculosis: false,
      },
      allergies: [],
      previousTransplants: false,
      recentMedications: ['Amlodipine'],
      smokingHistory: false,
      alcoholUse: false,
    },
    status: 'Pending',
  },
  {
    id: '7',
    name: 'James Williams',
    gender: 'Male',
    age: 58,
    email: 'jameswilliams@example.com',
    phone: '5551112222',
    bloodType: 'B+',
    requiredOrgan: 'Liver',
    waitingSince: generatePastDate(3), // 3 months ago
    medicalCondition: {
      diagnosis: 'Alcoholic cirrhosis',
      chronicDiseases: [],
      infections: {
        hiv: false,
        hepatitis: false,
        tuberculosis: false,
      },
      allergies: ['Codeine'],
      previousTransplants: false,
      recentMedications: ['Propranolol'],
      smokingHistory: true,
      alcoholUse: true,
    },
    status: 'Pending',
  },
  {
    id: '8',
    name: 'Olivia Lee',
    gender: 'Female',
    age: 31,
    email: 'olivialee@example.com',
    phone: '5553334444',
    bloodType: 'AB-',
    requiredOrgan: 'Heart',
    waitingSince: generatePastDate(1), // 1 month ago
    medicalCondition: {
      diagnosis: 'Ischemic cardiomyopathy',
      chronicDiseases: ['Coronary Artery Disease'],
      infections: {
        hiv: false,
        hepatitis: false,
        tuberculosis: false,
      },
      allergies: [],
      previousTransplants: false,
      recentMedications: ['Aspirin', 'Atorvastatin'],
      smokingHistory: false,
      alcoholUse: false,
    },
    status: 'Pending',
  },
];

// Helper function to format the date in a readable format
export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Helper function to calculate waiting time in months
export const getWaitingMonths = (waitingSince: Date): number => {
  return differenceInMonths(new Date(), waitingSince);
};

// Helper function to get remaining days after months
export const getWaitingDays = (waitingSince: Date): number => {
  const months = getWaitingMonths(waitingSince);
  const dateAfterMonths = new Date(waitingSince);
  dateAfterMonths.setMonth(dateAfterMonths.getMonth() + months);
  return differenceInDays(new Date(), dateAfterMonths);
};

// Helper function to get a human-readable waiting time
export const getWaitingTimeText = (waitingSince: Date): string => {
  const months = getWaitingMonths(waitingSince);
  const days = getWaitingDays(waitingSince);
  
  if (months < 1) {
    return `${days} days`;
  } else if (months === 1) {
    return `1 month, ${days} days`;
  } else {
    return `${months} months, ${days} days`;
  }
};