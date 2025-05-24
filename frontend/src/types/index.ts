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

export interface Donor {
  name: string;
  gender: "Male" | "Female" | "Other";
  password: string;
  age: number;
  email: string;
  phone: string;
  bloodType: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  organType: "Kidney" | "Liver" | "Heart" | "Lung" | "Pancreas" | "Intestine";
  organAvailabilityDate: Date;
  isLivingDonor: boolean;
  medicalHistory: {
    conditions: string[];
    allergies: string[];
    recentMedications: string[];
    smokingHistory: boolean;
    alcoholUse: boolean;
    chronicDiseases: string[];
    infections: {
      hiv: boolean;
      hepatitis: boolean;
      tuberculosis: boolean;
    };
  };
  geoLocation: {
    lat: number;
    lng: number;
  };
  proof: string;
  status: "Pending" | "Matched" | "None" | "Transplanted";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Recipient {
  name: string;
  gender: "Male" | "Female" | "Other";
  age: number;
  email: string;
  password: string;
  phone: string;
  bloodType: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  requiredOrgan: "Kidney" | "Liver" | "Heart" | "Lung" | "Pancreas" | "Intestine";
  waitingSince: Date;
  medicalCondition: {
    diagnosis: string;
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
  };
  geoLocation: {
    lat: number;
    lng: number;
  };
  proof: string;
  status: "Pending" | "Matched" | "None" | "Transplanted";
  matchedDonor: Donor;
  createdAt?: Date;
  updatedAt?: Date;
}