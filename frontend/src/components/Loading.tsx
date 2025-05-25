// src/components/OrganTransplantLoader.tsx
import React from 'react';

interface OrganTransplantLoaderProps {
  loadingText?: string;
}

const OrganTransplantLoader: React.FC<OrganTransplantLoaderProps> = ({
  loadingText = 'Processing Vital Data...',
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-600 to-aqua-400 text-white p-4">
      <div className="relative flex items-center justify-center w-48 h-48">
        {/* Central Node - like a core organ */}
        <div className="absolute w-16 h-16 bg-teal-300 rounded-full animate-pulse opacity-90"></div>
        <div className="absolute w-12 h-12 bg-aqua-200 rounded-full animate-ping opacity-75"></div>

        {/* Connecting Pathways/Vessels - 4 pathways */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={`pathway-${i}`}
            className="absolute w-full h-full"
            style={{ transform: `rotate(${i * 90}deg)` }}
          >
            <div className="absolute top-1/2 left-0 w-1/2 h-1.5 bg-teal-200 rounded-r-full opacity-70 transform -translate-y-1/2">
              {/* Small 'cells' moving along pathways */}
              <div
                className={`absolute w-2 h-2 bg-aqua-100 rounded-full top-1/2 transform -translate-y-1/2 animate-flow`}
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            </div>
          </div>
        ))}

        {/* Inner Detail - subtle pulsing */}
        <div className="absolute w-8 h-8 border-2 border-aqua-300 rounded-full animate-pulse-slow opacity-60"></div>
      </div>
      <p className="mt-8 text-xl font-semibold text-teal-50 tracking-wider">
        {loadingText}
      </p>
    </div>
  );
};

export default OrganTransplantLoader;