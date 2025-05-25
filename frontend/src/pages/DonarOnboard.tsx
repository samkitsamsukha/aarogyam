import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { toast } from "sonner";

// Interface for Form Data
interface DonorFormData {
  gender: string;
  age: string; // Keep as string for input, parse on submit
  email: string;
  phone: string;
  bloodType: string;
  organType: string;
  organAvailabilityDate: string;
  isLivingDonor: boolean;
  medicalHistory: {
    conditions: string; // Comma-separated
    allergies: string; // Comma-separated
    recentMedications: string; // Comma-separated
    smokingHistory: boolean;
    alcoholUse: boolean;
    chronicDiseases: string; // Comma-separated
    infections: {
      hiv: boolean;
      hepatitis: boolean;
      tuberculosis: boolean;
    };
  };
  geoLocation: {
    lat: string; // Keep as string for input, parse on submit
    lng: string; // Keep as string for input, parse on submit
  };
  proof: string; // URL
}

// Interface for Form Errors
interface FormErrors {
  gender?: string;
  age?: string;
  email?: string;
  phone?: string;
  bloodType?: string;
  organType?: string;
  organAvailabilityDate?: string;
  proof?: string;
  // Add other fields as needed for more specific error messages
}

// Props for FormSection
interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children }) => (
  <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-semibold text-teal-700 border-b-2 border-teal-300 pb-3 mb-6">
      {title}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
  </div>
);

// Props for InputField
interface InputFieldProps {
  label: string;
  id: string;
  type?: string;
  value: string | number;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  required?: boolean;
  placeholder?: string;
  pattern?: string;
  error?: string;
  children?: React.ReactNode; // For wrapping select or other custom inputs
  step?: string; // For number inputs
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  required = false,
  placeholder,
  pattern,
  error,
  children,
  step,
}) => (
  <div className="mb-4">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children ? (
      children
    ) : (
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        pattern={pattern}
        step={step}
        className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
          error ? "border-red-500" : "border-cyan-300"
        }`}
      />
    )}
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

// Props for SelectField
interface SelectOption {
  value: string;
  label: string;
}
interface SelectFieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  options: (string | SelectOption)[];
  error?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  id,
  value,
  onChange,
  required = false,
  options,
  error,
}) => (
  <InputField
    label={label}
    id={id}
    required={required}
    error={error}
    value={value}
    //@ts-ignore
    onChange={onChange}
  >
    <select
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      required={required}
      className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 ${
        error ? "border-red-500" : "border-cyan-300"
      }`}
    >
      <option value="">Select {label.toLowerCase()}...</option>
      {options.map((option) => {
        const val = typeof option === "string" ? option : option.value;
        const lbl = typeof option === "string" ? option : option.label;
        return (
          <option key={val} value={val}>
            {lbl}
          </option>
        );
      })}
    </select>
  </InputField>
);

// Props for CheckboxField
interface CheckboxFieldProps {
  label: string;
  id: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  subLabel?: string;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  id,
  checked,
  onChange,
  subLabel,
}) => (
  <div className="flex items-start mb-4">
    <div className="flex items-center h-5">
      <input
        id={id}
        name={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded"
      />
    </div>
    <div className="ml-3 text-sm">
      <label htmlFor={id} className="font-medium text-gray-700">
        {label}
      </label>
      {subLabel && <p className="text-gray-500 text-xs">{subLabel}</p>}
    </div>
  </div>
);

// Main App component
export default function DonarOnboard(): JSX.Element {
  // State for form data
  const [formData, setFormData] = useState<DonorFormData>({
    gender: "",
    age: "",
    email: "",
    phone: "",
    bloodType: "",
    organType: "",
    organAvailabilityDate: "",
    isLivingDonor: false,
    medicalHistory: {
      conditions: "",
      allergies: "",
      recentMedications: "",
      smokingHistory: false,
      alcoholUse: false,
      chronicDiseases: "",
      infections: {
        hiv: false,
        hepatitis: false,
        tuberculosis: false,
      },
    },
    geoLocation: {
      lat: "",
      lng: "",
    },
    proof: "",
  });

  // State for form errors
  const [errors, setErrors] = useState<FormErrors>({});

  // Handle input change for simple fields and nested fields
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    // Type assertion for checkbox
    const checked = (e.target as HTMLInputElement).checked;

    const [section, field, subField] = name.split(".");

    setFormData((prev) => {
      const newState = { ...prev };
      if (section && field && subField) {
        (newState[section as keyof DonorFormData] as any)[field][subField] =
          type === "checkbox" ? checked : value;
      } else if (section && field) {
        (newState[section as keyof DonorFormData] as any)[field] =
          type === "checkbox" ? checked : value;
      } else {
        (newState[name as keyof DonorFormData] as any) =
          type === "checkbox" ? checked : value;
      }
      return newState;
    });

    // Clear error for the field being changed
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Basic form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid.";

    if (!formData.phone) newErrors.phone = "Phone number is required.";
    else if (!/^[0-9]{10,15}$/.test(formData.phone))
      newErrors.phone = "Phone number must be 10-15 digits.";

    if (!formData.age) newErrors.age = "Age is required.";
    else if (isNaN(parseFloat(formData.age)) || parseFloat(formData.age) <= 0)
      newErrors.age = "Age must be a positive number.";

    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.bloodType) newErrors.bloodType = "Blood type is required.";
    if (!formData.organType) newErrors.organType = "Organ type is required.";
    if (!formData.organAvailabilityDate)
      newErrors.organAvailabilityDate = "Organ availability date is required.";

    if (!formData.proof) newErrors.proof = "Proof URL is required.";
    else {
      try {
        new URL(formData.proof);
      } catch (_) {
        newErrors.proof =
          "Proof URL is invalid (must be a full URL e.g., https://example.com).";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      // Prepare data for submission
      const submissionData = {
        ...formData,
        medicalHistory: {
          ...formData.medicalHistory,
          conditions: formData.medicalHistory.conditions
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s),
          allergies: formData.medicalHistory.allergies
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s),
          recentMedications: formData.medicalHistory.recentMedications
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s),
          chronicDiseases: formData.medicalHistory.chronicDiseases
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s),
        },
        age: parseInt(formData.age, 10), // Parse age to number
        geoLocation: {
          lat: formData.geoLocation.lat
            ? parseFloat(formData.geoLocation.lat)
            : null,
          lng: formData.geoLocation.lng
            ? parseFloat(formData.geoLocation.lng)
            : null,
        },
      };
      console.log("Donor Onboarding Data (Typed):", submissionData);

      toast.promise(
        axios.post("http://localhost:3000/onboard-donor", submissionData),
        {
          loading: "Submitting donor information...",
          success: "Donor information submitted successfully!",
          error: "Failed to submit donor information. Please try again.",
        }
      );
    } else {
      console.log("Form validation failed:", errors);
      alert("Please correct the errors in the form.");
    }
  };

  // Options for select fields
  const genderOptions: string[] = ["Male", "Female", "Other"];
  const bloodTypeOptions: string[] = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
  ];
  const organTypeOptions: string[] = [
    "Kidney",
    "Liver",
    "Heart",
    "Lung",
    "Pancreas",
    "Intestine",
  ];

  return (
    <div className="min-h-screen bg-sky-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-teal-700">Donor Onboarding</h1>
          <p className="text-lg text-teal-600 mt-2">
            Thank you for considering organ donation. Please fill out the form
            below.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
          {/* Personal Information Section */}
          <FormSection title="Personal Information">
            <SelectField
              label="Gender"
              id="gender"
              value={formData.gender}
              onChange={handleChange}
              options={genderOptions}
              required
              error={errors.gender}
            />
            <InputField
              label="Age"
              id="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              required
              placeholder="e.g., 30"
              error={errors.age}
            />
            <InputField
              label="Email"
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              error={errors.email}
            />
            <InputField
              label="Phone"
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="1234567890"
              pattern="^[0-9]{10,15}$"
              error={errors.phone}
            />
          </FormSection>

          {/* Donation Details Section */}
          <FormSection title="Donation Details">
            <SelectField
              label="Blood Type"
              id="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              options={bloodTypeOptions}
              required
              error={errors.bloodType}
            />
            <SelectField
              label="Organ to Donate"
              id="organType"
              value={formData.organType}
              onChange={handleChange}
              options={organTypeOptions}
              required
              error={errors.organType}
            />
            <InputField
              label="Organ Availability Date"
              id="organAvailabilityDate"
              type="date"
              value={formData.organAvailabilityDate}
              onChange={handleChange}
              required
              error={errors.organAvailabilityDate}
            />
            <div className="md:col-span-2">
              <CheckboxField
                label="Are you a living donor?"
                id="isLivingDonor"
                checked={formData.isLivingDonor}
                onChange={handleChange}
              />
            </div>
          </FormSection>

          {/* Medical History Section */}
          <FormSection title="Medical History">
            <InputField
              label="Existing Conditions"
              id="medicalHistory.conditions"
              value={formData.medicalHistory.conditions}
              onChange={handleChange}
              placeholder="e.g., Hypertension, Diabetes (comma-separated)"
            />
            <InputField
              label="Allergies"
              id="medicalHistory.allergies"
              value={formData.medicalHistory.allergies}
              onChange={handleChange}
              placeholder="e.g., Penicillin, Peanuts (comma-separated)"
            />
            <InputField
              label="Recent Medications"
              id="medicalHistory.recentMedications"
              value={formData.medicalHistory.recentMedications}
              onChange={handleChange}
              placeholder="e.g., Aspirin, Metformin (comma-separated)"
            />
            <InputField
              label="Chronic Diseases"
              id="medicalHistory.chronicDiseases"
              value={formData.medicalHistory.chronicDiseases}
              onChange={handleChange}
              placeholder="e.g., Asthma, Arthritis (comma-separated)"
            />

            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-md font-medium text-gray-700 mb-2">
                  Lifestyle
                </h3>
                <CheckboxField
                  label="Smoking History"
                  id="medicalHistory.smokingHistory"
                  checked={formData.medicalHistory.smokingHistory}
                  onChange={handleChange}
                  subLabel="Have you smoked regularly in the past?"
                />
                <CheckboxField
                  label="Alcohol Use"
                  id="medicalHistory.alcoholUse"
                  checked={formData.medicalHistory.alcoholUse}
                  onChange={handleChange}
                  subLabel="Do you consume alcohol regularly?"
                />
              </div>
              <div>
                <h3 className="text-md font-medium text-gray-700 mb-2">
                  Infections
                </h3>
                <CheckboxField
                  label="HIV"
                  id="medicalHistory.infections.hiv"
                  checked={formData.medicalHistory.infections.hiv}
                  onChange={handleChange}
                />
                <CheckboxField
                  label="Hepatitis (B or C)"
                  id="medicalHistory.infections.hepatitis"
                  checked={formData.medicalHistory.infections.hepatitis}
                  onChange={handleChange}
                />
                <CheckboxField
                  label="Tuberculosis"
                  id="medicalHistory.infections.tuberculosis"
                  checked={formData.medicalHistory.infections.tuberculosis}
                  onChange={handleChange}
                />
              </div>
            </div>
          </FormSection>

          {/* GeoLocation & Proof Section */}
          <FormSection title="Location & Verification">
            <InputField
              label="Latitude"
              id="geoLocation.lat"
              type="number"
              step="any"
              value={formData.geoLocation.lat}
              onChange={handleChange}
              placeholder="e.g., 34.0522"
            />
            <InputField
              label="Longitude"
              id="geoLocation.lng"
              type="number"
              step="any"
              value={formData.geoLocation.lng}
              onChange={handleChange}
              placeholder="e.g., -118.2437"
            />
            <div className="md:col-span-2">
              <InputField
                label="Proof Document URL"
                id="proof"
                type="url"
                value={formData.proof}
                onChange={handleChange}
                required
                placeholder="https://example.com/proof.pdf"
                error={errors.proof}
              />
            </div>
          </FormSection>

          {/* Submission Button */}
          <div className="mt-10 text-center">
            <button
              type="submit"
              className="w-full md:w-auto inline-flex justify-center py-3 px-8 border border-transparent shadow-lg text-lg font-semibold rounded-lg text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-150 ease-in-out"
            >
              Submit Donor Information
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
