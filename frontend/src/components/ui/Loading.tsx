// i'll make this prettier later

import React from 'react';

const Loading: React.FC = () => {
  return (
    <>
      <style>
        {`
          .loading-message {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 24px;
            font-weight: bold;
            color: #333;
          }
        `}
      </style>
      <div className="loading-message">
        Loading...
      </div>
    </>
  );
};

export default Loading;