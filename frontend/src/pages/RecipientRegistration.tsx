import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';
import FormInput from '../components/ui/FormInput';
import FormSelect from '../components/ui/FormSelect';
import FileUpload from '../components/ui/FileUpload';
import Button from '../components/ui/Button';

interface RecipientFormData {
  fullName: string;
  email: string;
  phone: string;
  age: number;
  requiredOrgan: string;
  bloodType: string;
  medicalCondition: string;
  urgencyLevel: string;
  hospital: string;
  doctorName: string;
  doctorContact: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const RecipientRegistration: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RecipientFormData>();
  const { isConnected, registerRecipient, connectWallet } = useWeb3();
  const [medicalReport, setMedicalReport] = useState<File | null>(null);
  const navigate = useNavigate();

  const organTypes = [
    { value: 'kidney', label: 'Kidney' },
    { value: 'liver', label: 'Liver' },
    { value: 'heart', label: 'Heart' },
    { value: 'lung', label: 'Lung' },
    { value: 'pancreas', label: 'Pancreas' },
    { value: 'cornea', label: 'Cornea' },
  ];

  const bloodTypes = [
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'AB+', label: 'AB+' },
    { value: 'AB-', label: 'AB-' },
    { value: 'O+', label: 'O+' },
    { value: 'O-', label: 'O-' },
  ];

  const urgencyLevels = [
    { value: 'critical', label: 'Critical (Immediate)' },
    { value: 'urgent', label: 'Urgent (Days to weeks)' },
    { value: 'standard', label: 'Standard (Weeks to months)' },
    { value: 'non-urgent', label: 'Non-urgent (Months)' },
  ];

  const onSubmit: SubmitHandler<RecipientFormData> = async (data) => {
    if (!isConnected) {
      await connectWallet();
      return;
    }

    // Prepare data for blockchain submission
    const recipientData = {
      ...data,
      medicalReportHash: medicalReport ? await hashFile(medicalReport) : null,
      timestamp: Date.now(),
    };

    const success = await registerRecipient(recipientData);
    if (success) {
      navigate('/');
    }
  };

  // Mock function to hash a file - in a real app this would use a cryptographic hash function
  const hashFile = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockHash = 'QmT5NvUtoM5nWFfrQdVrFtvGfKFmG7AHE8P34isapyhCxX';
        resolve(mockHash);
      }, 1000);
    });
  };

  return (
    <div className="page-container">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <UserCheck className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h1 className="page-title">Recipient Registration</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Register as an organ recipient to join the waitlist. Your information is securely stored,
            and our blockchain system ensures fair allocation based on medical urgency and compatibility.
          </p>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="section-title text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
              Personal Information
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                id="fullName"
                label="Full Name"
                type="text"
                error={errors.fullName?.message}
                {...register('fullName', { required: 'Full name is required' })}
              />
              <FormInput
                id="age"
                label="Age"
                type="number"
                error={errors.age?.message}
                {...register('age', { 
                  required: 'Age is required',
                  min: { value: 0, message: 'Age must be a positive number' },
                  max: { value: 120, message: 'Age cannot exceed 120' }
                })}
              />
              <FormInput
                id="email"
                label="Email Address"
                type="email"
                error={errors.email?.message}
                {...register('email', { 
                  required: 'Email is required',
                  pattern: { 
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                    message: 'Invalid email address' 
                  }
                })}
              />
              <FormInput
                id="phone"
                label="Phone Number"
                type="tel"
                error={errors.phone?.message}
                {...register('phone', { required: 'Phone number is required' })}
              />
            </div>

            <div className="section-title text-xl font-semibold text-gray-800 mt-8 mb-4 pb-2 border-b">
              Medical Information
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormSelect
                id="requiredOrgan"
                label="Required Organ"
                options={organTypes}
                error={errors.requiredOrgan?.message}
                {...register('requiredOrgan', { required: 'Please select a required organ' })}
              />
              <FormSelect
                id="bloodType"
                label="Blood Type"
                options={bloodTypes}
                error={errors.bloodType?.message}
                {...register('bloodType', { required: 'Please select a blood type' })}
              />
              <FormSelect
                id="urgencyLevel"
                label="Urgency Level"
                options={urgencyLevels}
                error={errors.urgencyLevel?.message}
                {...register('urgencyLevel', { required: 'Please select an urgency level' })}
              />
              <div className="md:col-span-2">
                <FormInput
                  id="medicalCondition"
                  label="Medical Condition"
                  as="textarea"
                  rows={4}
                  placeholder="Please describe your medical condition and reason for organ transplant..."
                  error={errors.medicalCondition?.message}
                  {...register('medicalCondition', { required: 'Medical condition is required' })}
                />
              </div>
            </div>

            <div className="section-title text-xl font-semibold text-gray-800 mt-8 mb-4 pb-2 border-b">
              Healthcare Provider Information
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                id="hospital"
                label="Hospital/Medical Center"
                type="text"
                error={errors.hospital?.message}
                {...register('hospital', { required: 'Hospital is required' })}
              />
              <FormInput
                id="doctorName"
                label="Physician Name"
                type="text"
                error={errors.doctorName?.message}
                {...register('doctorName', { required: "Physician's name is required" })}
              />
              <FormInput
                id="doctorContact"
                label="Physician Contact"
                type="text"
                error={errors.doctorContact?.message}
                {...register('doctorContact', { required: "Physician's contact is required" })}
              />
            </div>

            <div className="section-title text-xl font-semibold text-gray-800 mt-8 mb-4 pb-2 border-b">
              Address
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <FormInput
                  id="address"
                  label="Street Address"
                  type="text"
                  error={errors.address?.message}
                  {...register('address', { required: 'Address is required' })}
                />
              </div>
              <FormInput
                id="city"
                label="City"
                type="text"
                error={errors.city?.message}
                {...register('city', { required: 'City is required' })}
              />
              <FormInput
                id="state"
                label="State/Province"
                type="text"
                error={errors.state?.message}
                {...register('state', { required: 'State is required' })}
              />
              <FormInput
                id="zipCode"
                label="ZIP/Postal Code"
                type="text"
                error={errors.zipCode?.message}
                {...register('zipCode', { required: 'ZIP code is required' })}
              />
              <FormInput
                id="country"
                label="Country"
                type="text"
                error={errors.country?.message}
                {...register('country', { required: 'Country is required' })}
              />
            </div>

            <div className="section-title text-xl font-semibold text-gray-800 mt-8 mb-4 pb-2 border-b">
              Medical Documents
            </div>
            <div className="mb-6">
              <FileUpload
                id="medicalReport"
                label="Medical Report (will be encrypted)"
                onChange={setMedicalReport}
                error={!medicalReport ? 'Medical report is required' : undefined}
              />
              <p className="text-xs text-gray-500 mt-2">
                Your medical documents will be encrypted and securely stored. Only authorized healthcare providers will have access.
              </p>
            </div>

            <div className="mt-8 border-t pt-6">
              <p className="text-sm text-gray-600 mb-6">
                By clicking "Register as Recipient", you consent to the storage of your information on our blockchain-based system 
                and agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and 
                <a href="#" className="text-blue-600 hover:underline"> Privacy Policy</a>.
              </p>
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate('/')}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="secondary"
                  disabled={!medicalReport}
                  icon={<UserCheck className="h-5 w-5" />}
                >
                  Register as Recipient
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecipientRegistration;