
import React, { useState } from 'react';
import { Loader2, ArrowLeft, ShieldCheck, UserPlus } from 'lucide-react';

interface SignUpProps {
  onSignUp: (name: string, email: string, password: string) => Promise<void>;
  onBack: () => void;
  isLoading: boolean;
  error: string | null;
}

export const SignUp: React.FC<SignUpProps> = ({ onSignUp, onBack, isLoading, error }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError(null);

        if (password !== confirmPassword) {
            setLocalError("Passwords do not match.");
            return;
        }

        if (!agreedToTerms) {
            setLocalError("You must agree to the terms and conditions.");
            return;
        }
        
        onSignUp(name, email, password);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-earth-950 p-6 font-sans">
            <div className="bg-earth-900/50 backdrop-blur-md p-8 rounded-[2.5rem] shadow-cinematic-xl w-full max-w-md border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <UserPlus size={120} />
                </div>
                
                <h2 className="text-3xl font-serif font-black mb-2 text-white tracking-tighter">Create Account</h2>
                <p className="mb-8 text-earth-300 font-medium">Join the ecosystem and start your journey.</p>
                
                {(error || localError) && (
                    <div className="bg-red-900/30 text-red-300 p-4 rounded-2xl mb-6 text-xs font-bold border border-red-500/20 flex items-center gap-3">
                        <ShieldCheck size={16} className="shrink-0" />
                        {error || localError}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-[10px] font-black text-earth-400 uppercase tracking-[0.2em] mb-2 ml-1">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="block w-full px-5 py-4 bg-black/30 border border-white/10 rounded-2xl text-white placeholder-earth-600 focus:outline-none focus:ring-2 focus:ring-agro-500/50 focus:border-agro-500 transition-all font-medium"
                            required
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-[10px] font-black text-earth-400 uppercase tracking-[0.2em] mb-2 ml-1">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full px-5 py-4 bg-black/30 border border-white/10 rounded-2xl text-white placeholder-earth-600 focus:outline-none focus:ring-2 focus:ring-agro-500/50 focus:border-agro-500 transition-all font-medium"
                            required
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-[10px] font-black text-earth-400 uppercase tracking-[0.2em] mb-2 ml-1">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full px-5 py-4 bg-black/30 border border-white/10 rounded-2xl text-white placeholder-earth-600 focus:outline-none focus:ring-2 focus:ring-agro-500/50 focus:border-agro-500 transition-all font-medium"
                            required
                            placeholder="••••••••"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirm-password" className="block text-[10px] font-black text-earth-400 uppercase tracking-[0.2em] mb-2 ml-1">Confirm Password</label>
                        <input
                            id="confirm-password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="block w-full px-5 py-4 bg-black/30 border border-white/10 rounded-2xl text-white placeholder-earth-600 focus:outline-none focus:ring-2 focus:ring-agro-500/50 focus:border-agro-500 transition-all font-medium"
                            required
                            placeholder="••••••••"
                        />
                    </div>
                    <div className="flex items-center ml-1">
                        <input
                            id="terms-signup"
                            type="checkbox"
                            checked={agreedToTerms}
                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                            className="h-5 w-5 text-agro-600 focus:ring-agro-500 border-white/10 rounded bg-black/30 focus:ring-offset-earth-900 transition-all"
                        />
                        <label htmlFor="terms-signup" className="ml-3 block text-sm text-earth-300 font-medium">
                            I agree to the <a href="/terms" target="_blank" className="text-agro-400 hover:text-agro-300 transition-colors">Terms and Conditions</a>
                        </label>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                        <button
                            type="button"
                            onClick={onBack}
                            className="text-xs font-black text-earth-400 hover:text-white uppercase tracking-[0.2em] flex items-center gap-2 transition-all group"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Back
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading || !agreedToTerms}
                            className="px-10 py-4 border border-agro-400/20 rounded-2xl shadow-glow-green text-xs font-black text-white bg-agro-600 hover:bg-agro-500 uppercase tracking-[0.2em] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-earth-900 focus:ring-agro-500 disabled:opacity-30 transition-all active:scale-95"
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : 'Sign Up'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
