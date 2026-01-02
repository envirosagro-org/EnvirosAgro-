
import React, { useState } from 'react';
import { Loader2, ArrowLeft, Upload } from 'lucide-react';

interface GroupLoginProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onBack: () => void;
  isLoading: boolean;
  error: string | null;
}

// Mock data for organizations and groups, now with registration numbers
const ORGANIZATIONS = {
    'envirosource-inc': {
        name: 'EnviroSource Inc.',
        groups: {
            'farmers-club': { name: 'Farmers Club', regNumber: 'SOC-FARM-12345' },
            'research-society': { name: 'Research Society', regNumber: 'SOC-RES-67890' },
        },
    },
    'es-foundation': {
        name: 'ES Foundation',
        groups: {
            'community-gardeners': { name: 'Community Gardeners', regNumber: 'SOC-CG-11223' },
            'sustainability-advocates': { name: 'Sustainability Advocates', regNumber: 'SOC-SA-33445' },
        },
    },
};

// Mock data for group membership (for validation)
const GROUP_MEMBERS = {
    'farmers-club': ['user1@envirosource.com', 'farmer@envirosource.com'],
    'research-society': ['researcher@envirosource.com'],
    'community-gardeners': ['gardener@esfoundation.org'],
    'sustainability-advocates': ['advocate@esfoundation.org'],
};

export const GroupLogin: React.FC<GroupLoginProps> = ({ onLogin, onBack, isLoading, error }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedOrg, setSelectedOrg] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [groupCertificate, setGroupCertificate] = useState<File | null>(null);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setGroupCertificate(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError(null);

        if (!agreedToTerms) {
            setLocalError("You must agree to the terms and conditions.");
            return;
        }

        if (!groupCertificate) {
            setLocalError("Please upload your group\'s registration certificate.");
            return;
        }

        // @ts-ignore
        const org = ORGANIZATIONS[selectedOrg];
        if (!org) {
            setLocalError("Invalid organization selected.");
            return;
        }

        // @ts-ignore
        const group = org.groups[selectedGroup];
        if (!group || group.regNumber !== registrationNumber) {
            setLocalError("The society registration number is incorrect.");
            return;
        }
        
        // @ts-ignore
        const groupMembers = GROUP_MEMBERS[selectedGroup];
        if (!groupMembers || !groupMembers.includes(email)) {
            setLocalError('This email is not registered for the selected group.');
            return;
        }
        
        onLogin(email, password);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">Group / Society / Club Login</h2>
                <p className="mb-6 text-gray-500">Login via your affiliated group.</p>

                {error && <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">{error}</div>}
                {localError && <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">{localError}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                        <select
                            id="organization"
                            value={selectedOrg}
                            onChange={(e) => {
                                setSelectedOrg(e.target.value);
                                setSelectedGroup('');
                            }}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            required
                        >
                            <option value="" disabled>Select an organization</option>
                            {Object.entries(ORGANIZATIONS).map(([orgId, orgData]) => (
                                <option key={orgId} value={orgId}>{(orgData as any).name}</option>
                            ))}
                        </select>
                    </div>

                    {selectedOrg && (
                        <>
                            <div className="mb-4">
                                <label htmlFor="group" className="block text-sm font-medium text-gray-700 mb-1">Group</label>
                                <select
                                    id="group"
                                    value={selectedGroup}
                                    onChange={(e) => setSelectedGroup(e.target.value)}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    required
                                >
                                    <option value="" disabled>Select your group</option>
                                    {Object.entries(ORGANIZATIONS[selectedOrg as keyof typeof ORGANIZATIONS].groups).map(([groupId, groupData]) => (
                                        <option key={groupId} value={groupId}>{(groupData as any).name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700 mb-1">Society Registration Number</label>
                                <input
                                    id="registrationNumber"
                                    type="text"
                                    value={registrationNumber}
                                    onChange={(e) => setRegistrationNumber(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                    placeholder="e.g., SOC-FARM-12345"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="groupCertificate" className="block text-sm font-medium text-gray-700 mb-1">Group Registration Certificate</label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                        <div className="flex text-sm text-gray-600">
                                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                                    </div>
                                </div>
                                {groupCertificate && <p className='text-sm text-gray-500 mt-2'>File: {groupCertificate.name}</p>}
                            </div>
                        </>
                    )}

                    <div className="mb-4">
                         <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                            placeholder="your-email@example.com"
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
                            id="terms"
                            type="checkbox"
                            checked={agreedToTerms}
                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
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
                            disabled={isLoading || !selectedGroup || !agreedToTerms}
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
