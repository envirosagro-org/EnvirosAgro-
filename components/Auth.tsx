
import React, { useState } from 'react';
import { View, User } from '../types';
import { Sprout, Mail, Lock, User as UserIcon, Briefcase, ArrowRight, Check } from 'lucide-react';

interface AuthProps {
  onLogin: (user: User) => void;
  onNavigate: (view: View) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin, onNavigate }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Farmer' as User['role']
  });

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simulate OAuth delay
    setTimeout(() => {
      setIsLoading(false);
      
      // Mock successful Google Login
      const randomId = Math.floor(1000 + Math.random() * 9000);
      const googleUser: User = {
        name: 'Alex G.', // Simulated Google Name
        email: 'alex.google@gmail.com',
        role: 'Farmer', // Default role for social login, usually user would select this in a subsequent step
        location: 'Global',
        esin: `EA-GOO-${new Date().getFullYear()}-${randomId}`,
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        avatar: 'https://lh3.googleusercontent.com/a/default-user=s96-c', // Generic Google-like avatar
        bio: 'Verified via Google Account.'
      };
      
      onLogin(googleUser);
    }, 1500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Mock successful login/signup with rich profile data
      const randomId = Math.floor(1000 + Math.random() * 9000);
      const user: User = {
        name: isSignUp ? formData.name : 'Jane Doe', // Mock name for login
        email: formData.email,
        role: isSignUp ? formData.role : 'Farmer',
        // Mock additional profile fields
        location: isSignUp ? undefined : 'Nairobi, Kenya',
        esin: `EA-${isSignUp ? formData.role.substring(0,3).toUpperCase() : 'FAR'}-${new Date().getFullYear()}-${randomId}`,
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        bio: isSignUp ? undefined : 'Passionate about organic farming and sustainable soil management. Managing a 5-acre mixed crop farm focusing on indigenous vegetables and coffee.',
        avatar: isSignUp ? undefined : 'https://picsum.photos/200/200?random=50'
      };
      
      onLogin(user);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-earth-50">
      <div className="bg-white rounded-3xl shadow-2xl flex overflow-hidden max-w-5xl w-full border border-earth-100">
        
        {/* Left Side - Visual */}
        <div className="hidden md:flex w-1/2 bg-agro-900 relative flex-col justify-between p-12 text-white">
          <div className="absolute inset-0 opacity-30">
             <img 
                src="https://picsum.photos/800/1200?grayscale&blur=2" 
                alt="Farm Texture" 
                className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10">
            <div className="bg-agro-500/20 backdrop-blur-sm w-fit p-3 rounded-xl mb-6">
                <Sprout size={32} />
            </div>
            <h2 className="text-4xl font-serif font-bold mb-6">
              {isSignUp ? "Join the Movement" : "Welcome Back"}
            </h2>
            <p className="text-agro-100 text-lg leading-relaxed">
              {isSignUp 
                ? "Connect with a global network of farmers and researchers dedicated to sustainable agricultural innovation."
                : "Access your dashboard, network insights, and AI consultant to continue your sustainable journey."
              }
            </p>
          </div>
          
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3">
                <div className="bg-agro-500 rounded-full p-1"><Check size={14} /></div>
                <span className="text-agro-100 font-medium">Access Exclusive Research</span>
            </div>
            <div className="flex items-center gap-3">
                <div className="bg-agro-500 rounded-full p-1"><Check size={14} /></div>
                <span className="text-agro-100 font-medium">AI-Powered Farming Advice</span>
            </div>
            <div className="flex items-center gap-3">
                <div className="bg-agro-500 rounded-full p-1"><Check size={14} /></div>
                <span className="text-agro-100 font-medium">Community Network</span>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 bg-white flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <h3 className="text-2xl font-bold text-agro-900 mb-2">
                {isSignUp ? "Create Account" : "Sign In"}
            </h3>
            <p className="text-earth-500 mb-6">
                {isSignUp ? "Enter your details below to get started." : "Enter your credentials to access your account."}
            </p>

            {/* Google Login Button */}
            <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full bg-white border border-earth-200 text-earth-700 font-bold py-3 rounded-xl hover:bg-earth-50 transition-all flex items-center justify-center gap-3 mb-6 shadow-sm hover:shadow-md"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26-.19-.58z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                {isSignUp ? "Sign up with Google" : "Sign in with Google"}
            </button>

            {/* Divider */}
            <div className="relative flex py-2 items-center mb-6">
                <div className="flex-grow border-t border-earth-200"></div>
                <span className="flex-shrink-0 mx-4 text-xs font-bold text-earth-400 uppercase tracking-wider">Or Continue With Email</span>
                <div className="flex-grow border-t border-earth-200"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {isSignUp && (
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-earth-700 ml-1">Full Name</label>
                  <div className="relative">
                    <UserIcon size={20} className="absolute left-4 top-3.5 text-earth-400" />
                    <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required={isSignUp}
                        className="w-full bg-earth-50 border border-earth-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-agro-500 focus:border-transparent transition-all"
                        placeholder="Jane Doe"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-sm font-semibold text-earth-700 ml-1">Email Address</label>
                <div className="relative">
                  <Mail size={20} className="absolute left-4 top-3.5 text-earth-400" />
                  <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-earth-50 border border-earth-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-agro-500 focus:border-transparent transition-all"
                      placeholder="jane@farm.com"
                  />
                </div>
              </div>

              {isSignUp && (
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-earth-700 ml-1">Role</label>
                  <div className="relative">
                    <Briefcase size={20} className="absolute left-4 top-3.5 text-earth-400" />
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full bg-earth-50 border border-earth-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-agro-500 focus:border-transparent transition-all appearance-none text-earth-700"
                    >
                        <option value="Farmer">Farmer</option>
                        <option value="Researcher">Researcher</option>
                        <option value="Stakeholder">Stakeholder</option>
                        <option value="Other">Other</option>
                    </select>
                    <div className="absolute right-4 top-4 w-2 h-2 border-r-2 border-b-2 border-earth-400 rotate-45 pointer-events-none"></div>
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-sm font-semibold text-earth-700 ml-1">Password</label>
                <div className="relative">
                  <Lock size={20} className="absolute left-4 top-3.5 text-earth-400" />
                  <input 
                      type="password" 
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full bg-earth-50 border border-earth-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-agro-500 focus:border-transparent transition-all"
                      placeholder="••••••••"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-agro-600 hover:bg-agro-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-agro-200 transform active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                    <>
                        {isSignUp ? "Create Account" : "Sign In"} <ArrowRight size={20} />
                    </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-earth-600">
                    {isSignUp ? "Already have an account?" : "Don't have an account yet?"}
                    <button 
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="ml-2 text-agro-700 font-bold hover:underline focus:outline-none"
                    >
                        {isSignUp ? "Sign In" : "Sign Up"}
                    </button>
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
