
import React, { useState } from 'react';
import { GoogleAuthProvider } from 'firebase/auth';
import { OrganizationLogin } from './OrganizationLogin';
import { GroupLogin } from './GroupLogin';
import { View } from '../types';

interface AuthProps {
    onGoogleLogin: () => Promise<void>;
    onEmailLogin: (email: string, password: string) => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

enum AuthScreen {
    CHOICE,
    ORGANIZATION_LOGIN,
    GROUP_LOGIN,
}

export const Auth: React.FC<AuthProps> = ({ onGoogleLogin, onEmailLogin, isLoading, error }) => {
    const [screen, setScreen] = useState<AuthScreen>(AuthScreen.CHOICE);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const handleBack = () => {
        setScreen(AuthScreen.CHOICE);
    };

    if (screen === AuthScreen.ORGANIZATION_LOGIN) {
        return <OrganizationLogin onLogin={onEmailLogin} onBack={handleBack} isLoading={isLoading} error={error} />;
    }

    if (screen === AuthScreen.GROUP_LOGIN) {
        return <GroupLogin onLogin={onEmailLogin} onBack={handleBack} isLoading={isLoading} error={error} />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-earth-950 p-6 font-sans">
            <div className="max-w-md w-full bg-earth-900/50 backdrop-blur-sm shadow-strategic rounded-2xl p-8 border border-earth-700">
                <h2 className="text-center text-3xl font-bold font-serif text-agro-200 mb-2">Welcome</h2>
                <p className="text-center text-earth-300 mb-8">Choose your authentication method.</p>

                {error && (
                    <div className="bg-red-900/50 text-red-300 p-3 rounded-md mb-4 text-sm border border-red-700">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <button
                        onClick={onGoogleLogin}
                        disabled={isLoading || !agreedToTerms}
                        className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-earth-600 rounded-md shadow-sm text-sm font-medium text-earth-100 bg-earth-800/60 hover:bg-earth-700/60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-earth-900 focus:ring-agro-500 disabled:opacity-50 transition-all"
                    >
                        <img src="/google-logo.svg" alt="Google" className="h-5 w-5" />
                        Sign in with Google
                    </button>
                    <button
                        onClick={() => setScreen(AuthScreen.ORGANIZATION_LOGIN)}
                        disabled={isLoading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-agro-600 hover:bg-agro-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-earth-900 focus:ring-agro-500 disabled:opacity-50 transition-all"
                    >
                        Organization Login
                    </button>
                    <button
                        onClick={() => setScreen(AuthScreen.GROUP_LOGIN)}
                        disabled={isLoading}
                        className="w-full flex justify-center py-3 px-4 border border-earth-600 rounded-md shadow-sm text-sm font-medium text-earth-100 bg-earth-700/40 hover:bg-earth-600/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-earth-900 focus:ring-earth-500 disabled:opacity-50 transition-all"
                    >
                        Group/Society/Club Login
                    </button>
                </div>
                <div className="mt-6 flex items-center justify-center">
                     <input
                        id="terms-main"
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="h-4 w-4 text-agro-600 focus:ring-agro-500 border-earth-600 rounded bg-earth-800 focus:ring-offset-earth-900"
                    />
                    <label htmlFor="terms-main" className="ml-2 block text-sm text-earth-200">
                        I agree to the <a href="/terms" target="_blank" className="font-medium text-agro-400 hover:text-agro-300">Terms and Conditions</a>
                    </label>
                </div>
            </div>
        </div>
    );
};
