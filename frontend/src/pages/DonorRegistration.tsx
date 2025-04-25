import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';
import FormInput from '../components/ui/FormInput';
import FormSelect from '../components/ui/FormSelect';
import FileUpload from '../components/ui/FileUpload';
import Button from '../components/ui/Button';

interface DonorFormData {
  fullName: string;
  email: string;
  phone: string;
  age: number;
  organType: string;
  bloodType: string;
  medicalHistory: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const DonorRegistration: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<DonorFormData>();
  const { isConnected, registerDonor, connectWallet } = useWeb3();
  const [identityProof, setIdentityProof] = useState<File | null>(null);
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

  const onSubmit: SubmitHandler<DonorFormData> = async (data) => {
    if (!isConnected) {
      await connectWallet();
      return;
    }

    // Prepare data for blockchain submission
    const donorData = {
      ...data,
      identityProofHash: identityProof ? await hashFile(identityProof) : null,
      timestamp: Date.now(),
    };

    const success = await registerDonor(donorData);
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
          <Heart className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h1 className="page-title">Donor Registration</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            By registering as an organ donor, you're giving the gift of life. 
            All your information is securely stored on the blockchain and only shared with 
            authorized medical personnel when necessary.
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
                  min: { value: 18, message: 'You must be at least 18 years old' },
                  max: { value: 100, message: 'Age cannot exceed 100' }
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
                id="organType"
                label="Organ Type"
                options={organTypes}
                error={errors.organType?.message}
                {...register('organType', { required: 'Please select an organ type' })}
              />
              <FormSelect
                id="bloodType"
                label="Blood Type"
                options={bloodTypes}
                error={errors.bloodType?.message}
                {...register('bloodType', { required: 'Please select a blood type' })}
              />
              <div className="md:col-span-2">
                <FormInput
                  id="medicalHistory"
                  label="Medical History (optional)"
                  as="textarea"
                  rows={4}
                  placeholder="Please share any relevant medical history..."
                  error={errors.medicalHistory?.message}
                  {...register('medicalHistory')}
                />
              </div>
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
              Verification
            </div>
            <div className="mb-6">
              <FileUpload
                id="identityProof"
                label="Identity Proof (Government ID, Passport, etc.)"
                onChange={setIdentityProof}
                error={!identityProof ? 'Identity proof is required' : undefined}
              />
              <p className="text-xs text-gray-500 mt-2">
                Your document will be encrypted and securely stored. Only authorized personnel will have access.
              </p>
            </div>

            <div className="mt-8 border-t pt-6">
              <p className="text-sm text-gray-600 mb-6">
                By clicking "Register as Donor", you consent to the storage of your information on our blockchain-based system 
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
                  variant="primary"
                  disabled={!identityProof}
                  icon={<Heart className="h-5 w-5" />}
                >
                  Register as Donor
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DonorRegistration;