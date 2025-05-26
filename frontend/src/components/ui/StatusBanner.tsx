import React from 'react';
import { Clock, CheckCircle2, AlertCircle, HeartPulse } from 'lucide-react';

interface StatusBannerProps {
  status: string;
}

const StatusBanner: React.FC<StatusBannerProps> = ({ status }) => {
  let icon;
  let title;
  let message;
  let bgColor;
  let borderColor;
  let textColor;

  switch (status) {
    case 'Pending':
      icon = <Clock className="h-5 w-5 text-amber-500" />;
      title = 'Searching for Donor';
      message = 'We are currently looking for a suitable donor match for you. You will be notified once a match is found.';
      bgColor = 'bg-amber-50';
      borderColor = 'border-amber-200';
      textColor = 'text-amber-800';
      break;
    case 'Matched':
      icon = <CheckCircle2 className="h-5 w-5 text-green-500" />;
      title = 'Match Found!';
      message = 'You have been matched with a compatible donor. Please check your email for next steps.';
      bgColor = 'bg-green-50';
      borderColor = 'border-green-200';
      textColor = 'text-green-800';
      break;
    case 'Transplanted':
      icon = <HeartPulse className="h-5 w-5 text-purple-500" />;
      title = 'Transplant Completed';
      message = 'Your transplant procedure has been completed. Follow your post-operative care plan.';
      bgColor = 'bg-purple-50';
      borderColor = 'border-purple-200';
      textColor = 'text-purple-800';
      break;
    default:
      icon = <AlertCircle className="h-5 w-5 text-gray-500" />;
      title = 'Status: None';
      message = 'Your application is not currently active in the system.';
      bgColor = 'bg-gray-50';
      borderColor = 'border-gray-200';
      textColor = 'text-gray-800';
  }

  return (
    <div className={`p-4 rounded-lg border ${bgColor} ${borderColor}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          {icon}
        </div>
        <div>
          <h3 className={`text-md font-semibold ${textColor}`}>{title}</h3>
          <p className={`text-sm ${textColor} opacity-90 mt-1`}>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default StatusBanner;