
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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8">
                <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">Welcome</h2>
                <p className="text-center text-gray-500 mb-8">Choose your authentication method.</p>

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <button
                        onClick={onGoogleLogin}
                        disabled={isLoading || !agreedToTerms}
                        className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                        <img src="/google-logo.svg" alt="Google" className="h-5 w-5" />
                        Sign in with Google
                    </button>
                    <button
                        onClick={() => setScreen(AuthScreen.ORGANIZATION_LOGIN)}
                        disabled={isLoading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                        Organization Login
                    </button>
                    <button
                        onClick={() => setScreen(AuthScreen.GROUP_LOGIN)}
                        disabled={isLoading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
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
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="terms-main" className="ml-2 block text-sm text-gray-900">
                        I agree to the <a href="/terms" target="_blank" className="font-medium text-indigo-600 hover:text-indigo-500">Terms and Conditions</a>
                    </label>
                </div>
            </div>
        </div>
    );
};
