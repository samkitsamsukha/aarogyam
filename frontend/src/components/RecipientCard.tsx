import React from 'react';
import { Recipient, formatDate, getWaitingMonths } from '../data/mockRecipients';
import { Clock, Droplets, User } from 'lucide-react';

interface RecipientCardProps {
  recipient: Recipient;
}

const RecipientCard: React.FC<RecipientCardProps> = ({ recipient }) => {
  // Calculate urgency level based on waiting time
  const getUrgencyLevel = (months: number) => {
    if (months >= 24) return 'high';
    if (months >= 12) return 'medium';
    return 'low';
  };

  const waitingMonths = getWaitingMonths(recipient.waitingSince);
  const urgencyLevel = getUrgencyLevel(waitingMonths);
  
  // Get color classes based on urgency
  const getUrgencyClasses = () => {
    switch(urgencyLevel) {
      case 'high':
        return 'border-l-4 border-red-500';
      case 'medium':
        return 'border-l-4 border-orange-500';
      case 'low':
        return 'border-l-4 border-yellow-500';
      default:
        return '';
    }
  };

  // Get waiting time indicator styles
  const getWaitingIndicatorStyle = () => {
    let baseClasses = 'text-sm font-medium rounded-full px-3 py-1 flex items-center gap-1';
    
    switch(urgencyLevel) {
      case 'high':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'medium':
        return `${baseClasses} bg-orange-100 text-orange-800`;
      case 'low':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return baseClasses;
    }
  };

  // Blur the email for privacy
  const blurEmail = (email: string) => {
    const [username, domain] = email.split('@');
    const visiblePart = username.substring(0, 2);
    const hiddenPart = '•'.repeat(username.length - 2);
    return `${visiblePart}${hiddenPart}@${domain}`;
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px] ${getUrgencyClasses()}`}
    >
      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-4 text-white">
        <h3 className="text-xl font-semibold mb-1">{recipient.name}</h3>
        <div className="flex items-center justify-between">
          <span className={getWaitingIndicatorStyle()}>
            <Clock size={16} />
            Waiting Since: {formatDate(recipient.waitingSince)}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
              <User size={16} className="text-teal-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Gender</p>
              <p className="font-medium">{recipient.gender}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center">
              <Droplets size={16} className="text-cyan-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Blood Type</p>
              <p className="font-medium">{recipient.bloodType}</p>
            </div>
          </div>
          
          <div className="col-span-2">
            <p className="text-xs text-gray-500">Required Organ</p>
            <p className="font-medium text-teal-700">{recipient.requiredOrgan}</p>
          </div>
          
          <div className="col-span-2">
            <p className="text-xs text-gray-500">Waiting Since</p>
            <p className="font-medium">{formatDate(recipient.waitingSince)}</p>
          </div>
          
          <div className="col-span-2">
            <p className="text-xs text-gray-500">Email</p>
            <p className="font-medium blur-[8px] hover:blur-none transition-all duration-300 select-none">
              {recipient.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipientCard;