// i'll make this prettier later

import React from 'react';

const Loading: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 bg-gray-900/30 flex items-center justify-center z-50"
      aria-modal="true"
      role="dialog"
    >
      <div className="flex flex-col items-center justify-center bg-white p-6 rounded-xl shadow-lg">
        <p className="text-md font-medium text-gray-600">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loading;