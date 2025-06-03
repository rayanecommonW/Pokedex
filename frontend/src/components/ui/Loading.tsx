// i'll make this prettier later

import React from 'react';

const Loading: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 bg-opacity-70 flex items-center justify-center z-50"
      aria-modal="true"
      role="dialog"
    >
      <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-xl">
        <p className="text-lg font-semibold text-gray-700">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loading;