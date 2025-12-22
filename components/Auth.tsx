import React, { useState, useEffect } from 'react';
import { View, User } from '../types';
import { Sprout, Mail, Lock, User as UserIcon, Briefcase, ArrowRight, Check, Loader2, Globe, ShieldCheck } from 'lucide-react';

interface AuthProps {
  onLogin: (user: User) => void;
  onNavigate: (view: View) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin, onNavigate }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Farmer' as User['role']
  });

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    
    // Phase 1: Simulate "Opening Window" and "Fetching Accounts"
    setTimeout(() => {
      // Phase 2: Mock successful selection and token exchange
      const randomId = Math.floor(1000 + Math.random() * 9000);
      const googleUser: User = {
        name: 'Alex G.', 
        email: 'alex.google@gmail.com',
        role: 'Farmer', 
        location: 'Global Node',
        esin: `EA-GOO-${new Date().getFullYear()}-${randomId}`,
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
        bio: 'Strategic partner authenticated via Google SSO. Focused on m(t) resilience scaling.'
      };
      
      onLogin(googleUser);
      setIsGoogleLoading(false);
    }, 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      const randomId = Math.floor(1000 + Math.random() * 9000);
      const user: User = {
        name: isSignUp ? formData.name : 'Jane Doe',
        email: formData.email,
        role: isSignUp ? formData.role : 'Farmer',
        location: isSignUp ? undefined : 'Nairobi, Kenya',
        esin: `EA-${isSignUp ? formData.role.substring(0,3).toUpperCase() : 'FAR'}-${new Date().getFullYear()}-${randomId}`,
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        bio: isSignUp ? undefined : 'Passionate about organic farming and sustainable soil management.',
        avatar: isSignUp ? undefined : 'https://picsum.photos/200/200?random=50'
      };
      
      onLogin(user);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-earth-50 dark:bg-earth-950/20 transition-colors duration-500">
      
      {/* OAuth Simulation Overlay */}
      {isGoogleLoading && (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 text-center border-b border-earth-100">
              <div className="flex justify-center mb-6">
                <svg className="w-10 h-10" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26-.19-.58z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800">Sign in with Google</h3>
              <p className="text-sm text-slate-500 mt-1">Choose an account to continue to EnvirosAgro</p>
            </div>
            
            <div className="p-6 space-y-3">
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-blue-100 bg-blue-50/30 cursor-wait">
                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shadow-sm">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-bold text-slate-800">Alex G.</p>
                  <p className="text-xs text-slate-500">alex.google@gmail.com</p>
                </div>
                <Loader2 className="animate-spin text-blue-600" size={18} />
              </div>
              
              <div className="pt-4 flex flex-col items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-green-500" /> Secure Connection Established
                </div>
                <p className="text-center px-4 leading-relaxed opacity-60">To continue, Google will share your name, email address, language preference, and profile picture with EnvirosAgro.</p>
              </div>
            </div>
            
            <div className="bg-slate-50 p-4 flex justify-center">
              <div className="h-1 w-full max-w-[120px] bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 animate-[progress_2s_ease-in-out_infinite]"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-earth-900 rounded-[3rem] shadow-strategic flex overflow-hidden max-w-5xl w-full border border-earth-100 dark:border-white/5">
        
        {/* Left Side - Visual */}
        <div className="hidden md:flex w-1/2 bg-agro-900 relative flex-col justify-between p-12 text-white">
          <div className="absolute inset-0 opacity-20">
             <img 
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800" 
                alt="Farm Landscape" 
                className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10">
            <div className="bg-white/10 w-fit p-4 rounded-2xl mb-8 backdrop-blur-md border border-white/20">
                <Sprout size={32} className="text-agro-400" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-6 tracking-tight leading-tight">
              {isSignUp ? "Join the Global Resilience Network" : "Welcome Back to Command"}
            </h2>
            <p className="text-agro-100 text-lg leading-relaxed font-medium opacity-80">
              {isSignUp 
                ? "Connect with a world-class network of farmers and researchers dedicated to the Five Thrusts framework."
                : "Access your personalized m(t) dashboard and AI consultant to continue your sustainable journey."
              }
            </p>
          </div>
          
          <div className="relative z-10 space-y-6">
            {[
              { label: "Access Global Research Hub", icon: <Globe size={18} /> },
              { label: "AI-Powered Diagnostics", icon: <ShieldCheck size={18} /> },
              { label: "Industrial Supply Nodes", icon: <Briefcase size={18} /> }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 text-sm font-bold tracking-wide">
                <div className="bg-agro-500/20 text-agro-400 rounded-xl p-2.5 shadow-inner">
                  {item.icon}
                </div>
                <span className="text-agro-50">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-14 bg-white dark:bg-earth-900 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-10">
                <h3 className="text-3xl font-serif font-bold text-agro-900 dark:text-white mb-2">
                    {isSignUp ? "Identify Node" : "Access Hub"}
                </h3>
                <p className="text-earth-500 dark:text-earth-400 font-medium">
                    {isSignUp ? "Initialize your professional ESIN credentials." : "Re-sync with your agricultural network."}
                </p>
            </div>

            {/* Simulated Google Identity Button */}
            <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading || isGoogleLoading}
                className="w-full bg-white dark:bg-earth-800 border-2 border-earth-100 dark:border-earth-700 text-slate-700 dark:text-earth-200 font-black py-4 rounded-2xl hover:bg-earth-50 dark:hover:bg-earth-700 transition-all flex items-center justify-center gap-4 mb-8 shadow-sm active:scale-95 disabled:opacity-50 text-[10px] uppercase tracking-widest"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26-.19-.58z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                {isSignUp ? "Register with Google" : "Login with Google"}
            </button>

            <div className="relative flex py-2 items-center mb-8">
                <div className="flex-grow border-t border-earth-100 dark:border-earth-800"></div>
                <span className="flex-shrink-0 mx-6 text-[9px] font-black text-earth-300 dark:text-earth-600 uppercase tracking-[0.3em]">Bilateral Handshake</span>
                <div className="flex-grow border-t border-earth-100 dark:border-earth-800"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {isSignUp && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-earth-400 tracking-widest px-1">Legal Entity Name</label>
                  <div className="relative group">
                    <UserIcon size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-earth-300 group-focus-within:text-agro-600 transition-colors" />
                    <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required={isSignUp}
                        className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-agro-500 rounded-2xl py-4 pl-14 pr-6 focus:outline-none transition-all dark:text-white font-bold text-sm shadow-inner"
                        placeholder="e.g. John Doe / Global Farms Ltd"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-earth-400 tracking-widest px-1">Transmission Email</label>
                <div className="relative group">
                  <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-earth-300 group-focus-within:text-agro-600 transition-colors" />
                  <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-agro-500 rounded-2xl py-4 pl-14 pr-6 focus:outline-none transition-all dark:text-white font-bold text-sm shadow-inner"
                      placeholder="node@envirosagro.org"
                  />
                </div>
              </div>

              {isSignUp && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-earth-400 tracking-widest px-1">Network Role</label>
                  <div className="relative group">
                    <Briefcase size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-earth-300 group-focus-within:text-agro-600 transition-colors pointer-events-none" />
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-agro-500 rounded-2xl py-4 pl-14 pr-6 focus:outline-none transition-all dark:text-white font-bold text-sm shadow-inner appearance-none"
                    >
                        <option value="Farmer">Farmer Node</option>
                        <option value="Researcher">Scientific Researcher</option>
                        <option value="Stakeholder">Industrial Stakeholder</option>
                        <option value="Other">External Observer</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-earth-300">
                        <ChevronRight size={16} className="rotate-90" />
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-earth-400 tracking-widest px-1">Security Key</label>
                <div className="relative group">
                  <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-earth-300 group-focus-within:text-agro-600 transition-colors" />
                  <input 
                      type="password" 
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-agro-500 rounded-2xl py-4 pl-14 pr-6 focus:outline-none transition-all dark:text-white font-bold text-sm shadow-inner"
                      placeholder="••••••••••••"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading || isGoogleLoading}
                className="w-full bg-agro-900 dark:bg-agro-600 hover:bg-agro-800 dark:hover:bg-agro-500 text-white font-black py-5 rounded-2xl shadow-xl shadow-agro-900/20 active:scale-95 transition-all flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.4em] disabled:opacity-50"
              >
                {isLoading ? (
                    <Loader2 className="animate-spin" size={20} />
                ) : (
                    <>
                        {isSignUp ? "Generate ESIN Credentials" : "Authorize Linkage"} <ArrowRight size={18} />
                    </>
                )}
              </button>
            </form>

            <div className="mt-10 text-center">
                <p className="text-[10px] font-bold text-earth-400 uppercase tracking-widest">
                    {isSignUp ? "Already part of the node?" : "New to the network?"}
                    <button 
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="ml-2 text-agro-700 dark:text-agro-400 font-black hover:underline focus:outline-none"
                    >
                        {isSignUp ? "Sign In" : "Register"}
                    </button>
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper components for Select
const ChevronRight = ({ size, className }: { size: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m9 18 6-6-6-6"/>
    </svg>
);
