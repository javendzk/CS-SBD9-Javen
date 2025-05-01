import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TokonetCart from '../images/tokonet_cart.png';
import TokonetLogo from '../images/tokonet_logo.png';
import { loginUser } from '../utils/userRequests';
import LoaderPopup from '../elements/loader_popup.jsx';

function LoginPage() {
  useEffect(() => {
    document.title = "Login | Toko Netlab";
    return () => {
      document.title = "Toko Netlab";
    };
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popupState, setPopupState] = useState({
    show: false,
    status: 'loading',
    message: ''
  });
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setPopupState({
      show: true,
      status: 'loading',
      message: 'Logging in...'
    });
    
    try {
      const response = await loginUser({ email, password });
      
      if (response.success) {
        setPopupState({
          show: true,
          status: 'success',
          message: 'Login successful!'
        });
        
        setTimeout(() => {
          navigate('/store');
        }, 3000);
      } else {
        setPopupState({
          show: true,
          status: 'error',
          message: response.message || 'Login failed. Please check your credentials.'
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      setPopupState({
        show: true,
        status: 'error',
        message: 'An error occurred. Please try again later.'
      });
      setIsSubmitting(false);
    }
  };

  const closePopup = () => {
    setPopupState(prev => ({ ...prev, show: false }));
  };

  return (
    <div className="min-h-screen bg-white flex">
      <LoaderPopup
        show={popupState.show}
        status={popupState.status}
        message={popupState.message}
        onClose={closePopup}
        autoCloseTime={3000}
      />
      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 xl:px-20">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link to="/">
              <img
                className="mx-auto h-12 w-auto mb-5"
                src={TokonetLogo}
                alt="Tokonet"
              />
            </Link>
            <h2 className="mt-6 text-3xl font-extrabold text-orange-500">
              Welcome back!
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please sign in to your account
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-t-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-b-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600 text-white"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-300 ease-in-out`}
                disabled={isSubmitting}
              >
                Sign in
              </button>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-orange-500 hover:text-orange-400">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden lg:flex lg:flex-1 bg-orange-100 items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-4000"></div>
        <div className="flex items-center justify-center w-3/4 h-3/4 z-10 relative">
          <img
            src={TokonetCart}
            alt="Tokonet Cart"
            className="max-w-full max-h-full object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
