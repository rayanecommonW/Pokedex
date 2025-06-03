import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="text-red-600 bg-red-50 p-3 border border-red-200 rounded-md">
      <p className="font-semibold">Error: {message}</p>
      </div>
  );
};
export default ErrorMessage;