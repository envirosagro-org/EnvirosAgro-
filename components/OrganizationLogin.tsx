
import React, { useState } from 'react';
import { Loader2, ArrowLeft } from 'lucide-react';

interface OrganizationLoginProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onBack: () => void;
  isLoading: boolean;
  error: string | null;
}

const ALLOWED_DOMAINS = ['envirosource.com', 'envirosource.dev', 'esfoundation.org'];

export const OrganizationLogin: React.FC<OrganizationLoginProps> = ({ onLogin, onBack, isLoading, error }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError(null);

        if (!agreedToTerms) {
            setLocalError("You must agree to the terms and conditions.");
            return;
        }

        const domain = email.split('@')[1];
        if (!ALLOWED_DOMAINS.includes(domain)) {
            setLocalError('This email domain is not recognized for organization login.');
            return;
        }
        
        onLogin(email, password);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">Organization Login</h2>
                <p className="mb-6 text-gray-500">Please enter your official organization credentials.</p>
                
                {error && <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">{error}</div>}
                {localError && <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">{localError}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                            placeholder="user@envirosource.com"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                            placeholder="••••••••"
                        />
                    </div>
                    <div className="mb-6 flex items-center">
                        <input
                            id="terms-org"
                            type="checkbox"
                            checked={agreedToTerms}
                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="terms-org" className="ml-2 block text-sm text-gray-900">
                            I agree to the <a href="/terms" target="_blank" className="font-medium text-indigo-600 hover:text-indigo-500">Terms and Conditions</a>
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            onClick={onBack}
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center gap-1"
                        >
                            <ArrowLeft size={16} />
                            Back
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading || !agreedToTerms}
                            className="w-1/2 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
