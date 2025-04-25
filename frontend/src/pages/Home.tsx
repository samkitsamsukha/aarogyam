import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  FileCheck, 
  Clock, 
  UserCheck, 
  Users, 
  Heart, 
  Fingerprint, 
  Activity
} from 'lucide-react';
import Button from '../components/ui/Button';
import FeatureCard from '../components/ui/FeatureCard';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 md:pr-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Revolutionizing Organ Transplantation with Blockchain
              </h1>
              <p className="mt-6 text-xl text-gray-600">
                A transparent, secure, and fair system for organ donation and transplantation 
                powered by blockchain technology.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={() => navigate('/donor-registration')}
                  icon={<Heart className="h-5 w-5" />}
                >
                  Register as Donor
                </Button>
                <Button 
                  variant="secondary" 
                  size="lg"
                  onClick={() => navigate('/recipient-registration')}
                  icon={<UserCheck className="h-5 w-5" />}
                >
                  Register as Recipient
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/queue')}
                  icon={<Clock className="h-5 w-5" />}
                >
                  View Queue
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0 flex items-center justify-center">
              <img 
                src="https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg"
                alt="Medical professional with tablet" 
                className="rounded-lg shadow-xl max-h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Why Choose OrganChain?
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our blockchain-based solution addresses key challenges in organ transplantation systems
            </p>
          </div>

          <div className="features-grid">
            <FeatureCard 
              icon={<ShieldCheck className="h-6 w-6" />}
              title="Complete Transparency"
              description="All transactions are recorded on the blockchain, visible to authorized parties, ensuring a transparent process."
            />
            <FeatureCard 
              icon={<FileCheck className="h-6 w-6" />}
              title="Tamper-Proof Records"
              description="Blockchain's immutable nature ensures that medical records and waiting lists cannot be altered retroactively."
            />
            <FeatureCard 
              icon={<Clock className="h-6 w-6" />}
              title="Fair Allocation"
              description="Smart contracts enforce fair organ allocation based on medical urgency, compatibility, and wait time."
            />
            <FeatureCard 
              icon={<Fingerprint className="h-6 w-6" />}
              title="Patient Privacy"
              description="Sensitive patient data is encrypted, and only authorized healthcare providers can access complete records."
            />
            <FeatureCard 
              icon={<Activity className="h-6 w-6" />}
              title="Real-time Updates"
              description="The system provides real-time updates on organ availability and transplant status to all stakeholders."
            />
            <FeatureCard 
              icon={<Users className="h-6 w-6" />}
              title="Trust Building"
              description="Increased trust through transparent processes encourages more people to become organ donors."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-white rounded-lg shadow">
              <p className="text-4xl font-bold text-blue-600">10,000+</p>
              <p className="mt-2 text-gray-600">Registered Donors</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <p className="text-4xl font-bold text-blue-600">5,000+</p>
              <p className="mt-2 text-gray-600">Registered Recipients</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <p className="text-4xl font-bold text-blue-600">1,200+</p>
              <p className="mt-2 text-gray-600">Successful Matches</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <p className="text-4xl font-bold text-blue-600">50+</p>
              <p className="mt-2 text-gray-600">Partner Hospitals</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-green-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">
            Join Us in Revolutionizing Healthcare
          </h2>
          <p className="mt-4 text-xl text-white max-w-3xl mx-auto">
            Whether you're a potential donor, a patient in need, or a healthcare provider, 
            be part of this transformative journey.
          </p>
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Button 
              variant="primary" 
              size="lg"
              className="bg-white text-blue-500 hover:bg-gray-100"
              onClick={() => navigate('/donor-registration')}
            >
              Register as Donor
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              className="bg-white text-green-500 hover:bg-gray-100"
              onClick={() => navigate('/recipient-registration')}
            >
              Register as Recipient
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;