import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="text-red-700 bg-red-100 p-4 border border-red-300 rounded-lg">
      <p className="text-sm font-medium">Error: {message}</p>
      </div>
  );
};
export default ErrorMessage;