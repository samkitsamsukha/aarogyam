import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from "axios";
import { toast } from "sonner";

interface MedicalCondition {
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
}

interface GeoLocation {
  lat: number | string; // Use string for input, convert to number on submit
  lng: number | string; // Use string for input, convert to number on submit
}

interface RecipientFormData {
  gender: "Male" | "Female" | "Other" | "";
  age: number | string; // Use string for input, convert to number on submit
  email: string;
  phone: string;
  bloodType: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-" | "";
  requiredOrgan: "Kidney" | "Liver" | "Heart" | "Lung" | "Pancreas" | "Intestine" | "";
  medicalCondition: MedicalCondition;
  geoLocation: GeoLocation;
  proof: string; // URL
}

const initialFormData: RecipientFormData = {
  gender: "",
  age: "",
  email: "",
  phone: "",
  bloodType: "",
  requiredOrgan: "",
  medicalCondition: {
    diagnosis: "",
    chronicDiseases: [],
    infections: {
      hiv: false,
      hepatitis: false,
      tuberculosis: false,
    },
    allergies: [],
    previousTransplants: false,
    recentMedications: [],
    smokingHistory: false,
    alcoholUse: false,
  },
  geoLocation: {
    lat: "",
    lng: "",
  },
  proof: "",
};

// Helper function to render input fields for better structure
interface FormInputProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  pattern?: string;
  placeholder?: string;
  isTextArea?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  pattern,
  placeholder,
  isTextArea = false,
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-teal-700 dark:text-teal-300 font-semibold mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {isTextArea ? (
      <textarea
        id={id}
        name={name}
        value={value as string}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        rows={3}
        className="w-full px-3 py-2 border border-teal-300 dark:border-teal-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-aqua-500 dark:focus:ring-aqua-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      />
    ) : (
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        pattern={pattern}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-teal-300 dark:border-teal-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-aqua-500 dark:focus:ring-aqua-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      />
    )}
  </div>
);

interface FormSelectProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  required?: boolean;
}

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  id,
  name,
  value,
  onChange,
  options,
  required = false,
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-teal-700 dark:text-teal-300 font-semibold mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-3 py-2 border border-teal-300 dark:border-teal-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-aqua-500 dark:focus:ring-aqua-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
    >
      <option value="" disabled>Select {label.toLowerCase()}</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
);

interface FormCheckboxProps {
  label: string;
  id: string;
  name: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({ label, id, name, checked, onChange }) => (
  <div className="mb-4 flex items-center">
    <input
      type="checkbox"
      id={id}
      name={name}
      checked={checked}
      onChange={onChange}
      className="h-5 w-5 text-aqua-600 dark:text-aqua-500 border-teal-300 dark:border-teal-600 rounded focus:ring-aqua-500 dark:focus:ring-aqua-400 bg-white dark:bg-gray-800"
    />
    <label htmlFor={id} className="ml-2 text-teal-700 dark:text-teal-300 font-medium">
      {label}
    </label>
  </div>
);

const RecipientOnboard: React.FC = () => {
  const [formData, setFormData] = useState<RecipientFormData>(initialFormData);
  const [chronicDiseasesInput, setChronicDiseasesInput] = useState<string>("");
  const [allergiesInput, setAllergiesInput] = useState<string>("");
  const [recentMedicationsInput, setRecentMedicationsInput] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (name.startsWith("medicalCondition.infections.")) {
      const infectionName = name.split(".").pop() as keyof RecipientFormData['medicalCondition']['infections'];
      setFormData(prev => ({
        ...prev,
        medicalCondition: {
          ...prev.medicalCondition,
          infections: {
            ...prev.medicalCondition.infections,
            [infectionName]: (e.target as HTMLInputElement).checked,
          },
        },
      }));
    } else if (name.startsWith("medicalCondition.")) {
      const medicalField = name.split(".").pop() as keyof RecipientFormData['medicalCondition'];
      setFormData(prev => ({
        ...prev,
        medicalCondition: {
          ...prev.medicalCondition,
          [medicalField]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        },
      }));
    } else if (name.startsWith("geoLocation.")) {
      const geoField = name.split(".").pop() as keyof RecipientFormData['geoLocation'];
      setFormData(prev => ({
        ...prev,
        geoLocation: {
          ...prev.geoLocation,
          [geoField]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Prepare data for submission (e.g., convert strings to numbers, split arrays)
    const submittedData: RecipientFormData = {
      ...formData,
      age: formData.age === "" ? 0 : Number(formData.age), // Handle empty string for age
      geoLocation: {
        lat: formData.geoLocation.lat === "" ? 0 : Number(formData.geoLocation.lat),
        lng: formData.geoLocation.lng === "" ? 0 : Number(formData.geoLocation.lng),
      },
      medicalCondition: {
        ...formData.medicalCondition,
        chronicDiseases: chronicDiseasesInput.split(',').map(s => s.trim()).filter(s => s),
        allergies: allergiesInput.split(',').map(s => s.trim()).filter(s => s),
        recentMedications: recentMedicationsInput.split(',').map(s => s.trim()).filter(s => s),
      }
    };
    
    toast.promise(
      axios.post("http://localhost:3000/onboard-recipient", submittedData),
      {
        loading: "Submitting recipient data...",
        success: "Recipient onboarded successfully!",
        error: "Failed to onboard recipient.",
      }
    );

    setFormData(initialFormData);
    setChronicDiseasesInput("");
    setAllergiesInput("");
    setRecentMedicationsInput("");
  };

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  const bloodTypeOptions = [
    { value: "A+", label: "A+" }, { value: "A-", label: "A-" },
    { value: "B+", label: "B+" }, { value: "B-", label: "B-" },
    { value: "AB+", label: "AB+" }, { value: "AB-", label: "AB-" },
    { value: "O+", label: "O+" }, { value: "O-", label: "O-" },
  ];

  const organOptions = [
    { value: "Kidney", label: "Kidney" }, { value: "Liver", label: "Liver" },
    { value: "Heart", label: "Heart" }, { value: "Lung", label: "Lung" },
    { value: "Pancreas", label: "Pancreas" }, { value: "Intestine", label: "Intestine" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 via-cyan-500 to-aqua-500 dark:from-teal-800 dark:via-cyan-800 dark:to-aqua-700 p-4 sm:p-8 flex items-center justify-center font-sans">
      <div className="bg-white dark:bg-gray-900 p-6 sm:p-10 rounded-xl shadow-2xl w-full max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-teal-700 dark:text-teal-200 mb-8">
          Recipient Onboarding
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information Section */}
          <fieldset className="border border-teal-300 dark:border-teal-600 p-4 rounded-lg">
            <legend className="text-xl font-semibold text-teal-600 dark:text-teal-300 px-2">Personal Information</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <FormSelect label="Gender" id="gender" name="gender" value={formData.gender} onChange={handleChange} options={genderOptions} />
              <FormInput label="Age" id="age" name="age" type="number" value={formData.age} onChange={handleChange} placeholder="e.g., 35" />
            </div>
            <FormInput label="Email" id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="recipient@example.com" />
            <FormInput label="Phone" id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} pattern="^[0-9]{10,15}$" placeholder="e.g., 1234567890" />
            <FormSelect label="Blood Type" id="bloodType" name="bloodType" value={formData.bloodType} onChange={handleChange} options={bloodTypeOptions} />
            <FormSelect label="Required Organ" id="requiredOrgan" name="requiredOrgan" value={formData.requiredOrgan} onChange={handleChange} options={organOptions} />
          </fieldset>

          {/* Medical Condition Section */}
          <fieldset className="border border-teal-300 dark:border-teal-600 p-4 rounded-lg">
            <legend className="text-xl font-semibold text-teal-600 dark:text-teal-300 px-2">Medical Condition</legend>
            <div className="mt-4 space-y-4">
              <FormInput label="Diagnosis" id="diagnosis" name="medicalCondition.diagnosis" value={formData.medicalCondition.diagnosis} onChange={handleChange} isTextArea placeholder="Brief medical diagnosis" />
              
              <FormInput 
                label="Chronic Diseases (comma-separated)" 
                id="chronicDiseases" 
                name="chronicDiseases" 
                value={chronicDiseasesInput} 
                onChange={(e) => setChronicDiseasesInput(e.target.value)}
                placeholder="e.g., Diabetes, Hypertension" 
              />
              
              <div>
                <h3 className="text-md font-semibold text-teal-700 dark:text-teal-300 mb-2">Infections:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <FormCheckbox label="HIV" id="hiv" name="medicalCondition.infections.hiv" checked={formData.medicalCondition.infections.hiv} onChange={handleChange} />
                    <FormCheckbox label="Hepatitis" id="hepatitis" name="medicalCondition.infections.hepatitis" checked={formData.medicalCondition.infections.hepatitis} onChange={handleChange} />
                    <FormCheckbox label="Tuberculosis" id="tuberculosis" name="medicalCondition.infections.tuberculosis" checked={formData.medicalCondition.infections.tuberculosis} onChange={handleChange} />
                </div>
              </div>

              <FormInput 
                label="Allergies (comma-separated)" 
                id="allergies" 
                name="allergies" 
                value={allergiesInput} 
                onChange={(e) => setAllergiesInput(e.target.value)}
                placeholder="e.g., Penicillin, Peanuts" 
              />
              <FormCheckbox label="Previous Transplants" id="previousTransplants" name="medicalCondition.previousTransplants" checked={formData.medicalCondition.previousTransplants} onChange={handleChange} />
              
              <FormInput 
                label="Recent Medications (comma-separated)" 
                id="recentMedications" 
                name="recentMedications" 
                value={recentMedicationsInput} 
                onChange={(e) => setRecentMedicationsInput(e.target.value)}
                placeholder="e.g., Aspirin, Metformin" 
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormCheckbox label="Smoking History" id="smokingHistory" name="medicalCondition.smokingHistory" checked={formData.medicalCondition.smokingHistory} onChange={handleChange} />
                <FormCheckbox label="Alcohol Use" id="alcoholUse" name="medicalCondition.alcoholUse" checked={formData.medicalCondition.alcoholUse} onChange={handleChange} />
              </div>
            </div>
          </fieldset>

          {/* GeoLocation Section */}
          <fieldset className="border border-teal-300 dark:border-teal-600 p-4 rounded-lg">
            <legend className="text-xl font-semibold text-teal-600 dark:text-teal-300 px-2">GeoLocation</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <FormInput label="Latitude" id="lat" name="geoLocation.lat" type="number" value={formData.geoLocation.lat} onChange={handleChange} placeholder="e.g., 34.0522" />
              <FormInput label="Longitude" id="lng" name="geoLocation.lng" type="number" value={formData.geoLocation.lng} onChange={handleChange} placeholder="e.g., -118.2437" />
            </div>
          </fieldset>

          {/* Proof Section */}
          <fieldset className="border border-teal-300 dark:border-teal-600 p-4 rounded-lg">
            <legend className="text-xl font-semibold text-teal-600 dark:text-teal-300 px-2">Proof of Condition</legend>
             <FormInput label="Proof URL" id="proof" name="proof" type="url" value={formData.proof} onChange={handleChange} placeholder="https://example.com/proof.pdf" />
          </fieldset>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-aqua-500 to-teal-600 hover:from-aqua-600 hover:to-teal-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400 dark:focus:ring-teal-500"
          >
            Submit Recipient Data
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecipientOnboard;
