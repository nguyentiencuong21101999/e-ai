import React from 'react';
import { FormSignIn } from '../SignIn/Main';

interface AuthPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignUp?: () => void;
  onSwitchToForgotPassword?: () => void;
}

const AuthPopup: React.FC<AuthPopupProps> = ({ isOpen, onClose, onSwitchToSignUp, onSwitchToForgotPassword }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity backdrop-blur-sm animate-fade-in" onClick={onClose}></div>

      {/* Modal */}
      <div className="flex min-h-screen items-center justify-center p-2 sm:p-4">
        <div className="relative w-full max-w-6xl bg-white rounded-lg sm:rounded-2xl shadow-2xl transform transition-all animate-scale-in">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 hover:scale-110"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Form content */}
          <div className="relative">
            <FormSignIn 
              isPopup={true} 
              onClosePopup={onClose} 
              onSwitchToSignUp={onSwitchToSignUp}
              onSwitchToForgotPassword={onSwitchToForgotPassword}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPopup; 