import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const LoaderPopup = ({ 
  show, 
  status = 'loading', 
  message = 'Processing...', 
  onClose, 
  autoCloseTime = 3000 
}) => {
  const [timeLeft, setTimeLeft] = useState(autoCloseTime);
  
  useEffect(() => {
    if (show && status !== 'loading' && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseTime);
      
      const interval = setInterval(() => {
        setTimeLeft(prev => Math.max(prev - 50, 0));
      }, 50);
      
      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
    
    if (show) {
      setTimeLeft(autoCloseTime);
    }
  }, [show, status, onClose, autoCloseTime]);

  if (!show) return null;

  const progress = (timeLeft / autoCloseTime) * 100;

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center">
      <div className="bg-white mt-4 px-6 py-4 rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex items-center mb-2">
          {status === 'loading' && (
            <div className="mr-3">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          )}

          {status === 'success' && (
            <div className="text-green-500 mr-3">
              <FaCheckCircle className="h-6 w-6" />
            </div>
          )}

          {status === 'error' && (
            <div className="text-red-500 mr-3">
              <FaTimesCircle className="h-6 w-6" />
            </div>
          )}

          <div className="text-gray-800 flex-grow">{message}</div>

          {onClose && (
            <button 
              onClick={onClose} 
              className="ml-4 text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              ×
            </button>
          )}
        </div>
        
        {status !== 'loading' && (
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
            <div 
              className={`h-1.5 rounded-full ${status === 'success' ? 'bg-green-500' : 'bg-red-500'}`} 
              style={{ width: `${progress}%`, transition: 'width 50ms linear' }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoaderPopup;
