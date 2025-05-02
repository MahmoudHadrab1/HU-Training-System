import React, { useState } from 'react';
import { X } from 'lucide-react';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1); // 1: Email, 2: Verification, 3: New Password, 4: Success
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);

  // Handle email submission and request for verification code
  const handleRequestCode = (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    // Simulate API call to request verification code
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      startCountdown();
    }, 1500);
  };

  // Handle verification code submission
  const handleVerifyCode = (e) => {
    e.preventDefault();
    setError('');

    if (!verificationCode) {
      setError('Please enter the verification code');
      return;
    }

    if (verificationCode.length < 6) {
      setError('Verification code must be 6 digits');
      return;
    }

    setIsLoading(true);

    // Simulate API call to verify code
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo purposes, accept any 6-digit code
      if (verificationCode.length === 6 && !isNaN(verificationCode)) {
        setStep(3);
      } else {
        setError('Invalid verification code');
      }
    }, 1500);
  };

  // Handle password reset
  const handleResetPassword = (e) => {
    e.preventDefault();
    setError('');

    if (!newPassword) {
      setError('Please enter a new password');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    // Simulate API call to reset password
    setTimeout(() => {
      setIsLoading(false);
      setStep(4); // Success
    }, 1500);
  };

  // Start countdown for resending verification code
  const startCountdown = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);
  };

  // Resend verification code
  const handleResendCode = () => {
    setIsLoading(true);
    
    // Simulate API call to resend code
    setTimeout(() => {
      setIsLoading(false);
      startCountdown();
    }, 1500);
  };

  // Validate email format
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // Close modal and reset state
  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setEmail('');
      setVerificationCode('');
      setNewPassword('');
      setConfirmPassword('');
      setError('');
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-xl animate-fade-in">
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step 1: Email Input */}
        {step === 1 && (
          <>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Forgot Password</h2>
            <p className="text-gray-600 mb-4">
              Enter your email address and we'll send you a verification code to reset your password.
            </p>
            
            <form onSubmit={handleRequestCode}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                  placeholder="Enter your registered email"
                />
              </div>
              
              {error && (
                <p className="text-red-500 text-sm mb-4">{error}</p>
              )}
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-gray-700 text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-70 transition-colors"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending Code...
                  </span>
                ) : "Send Verification Code"}
              </button>
            </form>
          </>
        )}

        {/* Step 2: Verification Code */}
        {step === 2 && (
          <>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Verify Your Email</h2>
            <p className="text-gray-600 mb-4">
              We've sent a verification code to <span className="font-medium">{email}</span>. 
              Please enter the code below.
            </p>
            
            <form onSubmit={handleVerifyCode}>
              <div className="mb-4">
                <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Verification Code
                </label>
                <input
                  type="text"
                  id="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, ''))}
                  maxLength={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 text-center tracking-widest text-lg"
                  placeholder="000000"
                />
              </div>
              
              {error && (
                <p className="text-red-500 text-sm mb-4">{error}</p>
              )}
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-gray-700 text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-70 transition-colors"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </span>
                ) : "Verify Code"}
              </button>
              
              <div className="mt-4 text-center">
                <p className="text-gray-600 text-sm">
                  Didn't receive the code?{' '}
                  {countdown > 0 ? (
                    <span className="text-gray-500">Resend in {countdown}s</span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendCode}
                      disabled={isLoading}
                      className="text-gray-800 font-medium hover:underline focus:outline-none disabled:opacity-70"
                    >
                      Resend Code
                    </button>
                  )}
                </p>
              </div>
            </form>
          </>
        )}

        {/* Step 3: New Password */}
        {step === 3 && (
          <>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Reset Your Password</h2>
            <p className="text-gray-600 mb-4">
              Create a new password for your account.
            </p>
            
            <form onSubmit={handleResetPassword}>
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                  placeholder="Enter your new password"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
                  placeholder="Confirm your new password"
                />
              </div>
              
              {error && (
                <p className="text-red-500 text-sm mb-4">{error}</p>
              )}
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 bg-gray-700 text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-70 transition-colors"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Resetting Password...
                  </span>
                ) : "Reset Password"}
              </button>
            </form>
          </>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <>
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h2 className="text-xl font-bold text-gray-800 mb-2">Password Reset Successful!</h2>
              <p className="text-gray-600 mb-6">
                Your password has been reset successfully. You can now log in with your new password.
              </p>
              
              <button
                onClick={handleClose}
                className="w-full py-2 px-4 bg-gray-700 text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Back to Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;