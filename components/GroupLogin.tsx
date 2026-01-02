
import React, { useState } from 'react';
import { Loader2, ArrowLeft, Upload, Users, ShieldCheck } from 'lucide-react';

interface GroupLoginProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onBack: () => void;
  isLoading: boolean;
  error: string | null;
}

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
        <div className="min-h-screen flex items-center justify-center bg-earth-950 p-6 font-sans">
            <div className="bg-earth-900/50 backdrop-blur-md p-8 rounded-[2.5rem] shadow-cinematic-xl w-full max-w-md border border-white/10 relative overflow-hidden flex flex-col max-h-[90vh]">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Users size={120} />
                </div>
                
                <div className="mb-8 shrink-0">
                    <h2 className="text-3xl font-serif font-black mb-2 text-white tracking-tighter">Affiliate Login</h2>
                    <p className="text-earth-300 font-medium">Connect via your society, club or group.</p>
                </div>

                {(error || localError) && (
                    <div className="bg-red-900/30 text-red-300 p-4 rounded-2xl mb-6 text-xs font-bold border border-red-500/20 flex items-center gap-3 shrink-0">
                        <ShieldCheck size={16} className="shrink-0" />
                        {error || localError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 overflow-y-auto pr-2 custom-scrollbar">
                    <div>
                        <label className="block text-[10px] font-black text-earth-400 uppercase tracking-[0.2em] mb-2 ml-1">Organization</label>
                        <select
                            value={selectedOrg}
                            onChange={(e) => {
                                setSelectedOrg(e.target.value);
                                setSelectedGroup('');
                            }}
                            className="block w-full px-5 py-4 bg-black/30 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-agro-500/50 focus:border-agro-500 transition-all font-medium appearance-none"
                            required
                        >
                            <option value="" className="bg-earth-900">Select Organization</option>
                            {Object.entries(ORGANIZATIONS).map(([orgId, orgData]) => (
                                <option key={orgId} value={orgId} className="bg-earth-900">{(orgData as any).name}</option>
                            ))}
                        </select>
                    </div>

                    {selectedOrg && (
                        <>
                            <div className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-6">
                                <div>
                                    <label className="block text-[10px] font-black text-earth-400 uppercase tracking-[0.2em] mb-2 ml-1">Affiliated Group</label>
                                    <select
                                        value={selectedGroup}
                                        onChange={(e) => setSelectedGroup(e.target.value)}
                                        className="block w-full px-5 py-4 bg-black/30 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-agro-500/50 focus:border-agro-500 transition-all font-medium appearance-none"
                                        required
                                    >
                                        <option value="" className="bg-earth-900">Select Group</option>
                                        {Object.entries(ORGANIZATIONS[selectedOrg as keyof typeof ORGANIZATIONS].groups).map(([groupId, groupData]) => (
                                            <option key={groupId} value={groupId} className="bg-earth-900">{(groupData as any).name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-earth-400 uppercase tracking-[0.2em] mb-2 ml-1">Registration ID</label>
                                    <input
                                        type="text"
                                        value={registrationNumber}
                                        onChange={(e) => setRegistrationNumber(e.target.value)}
                                        className="block w-full px-5 py-4 bg-black/30 border border-white/10 rounded-2xl text-white placeholder-earth-600 focus:outline-none focus:ring-2 focus:ring-agro-500/50 focus:border-agro-500 transition-all font-medium"
                                        required
                                        placeholder="SOC-FARM-XXXXX"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-earth-400 uppercase tracking-[0.2em] mb-2 ml-1">Registration Certificate</label>
                                    <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-2xl transition-all ${groupCertificate ? 'border-agro-500/50 bg-agro-500/5' : 'border-white/10 bg-black/30 hover:border-earth-700'}`}>
                                        <div className="space-y-1 text-center">
                                            <Upload className={`mx-auto h-10 w-10 ${groupCertificate ? 'text-agro-400' : 'text-earth-600'}`} />
                                            <div className="flex text-sm text-earth-300">
                                                <label className="relative cursor-pointer font-bold text-agro-400 hover:text-agro-300 transition-colors">
                                                    <span>{groupCertificate ? 'Change File' : 'Upload Document'}</span>
                                                    <input type="file" className="sr-only" onChange={handleFileChange} />
                                                </label>
                                            </div>
                                            <p className="text-[10px] text-earth-500 font-black uppercase tracking-widest">PDF, PNG, JPG (Max 10MB)</p>
                                        </div>
                                    </div>
                                    {groupCertificate && (
                                        <div className="mt-3 px-4 py-2 bg-agro-500/10 border border-agro-500/20 rounded-xl flex items-center justify-between">
                                            <span className="text-[10px] font-black text-agro-400 truncate max-w-[200px]">{groupCertificate.name}</span>
                                            <ShieldCheck size={14} className="text-agro-400" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                    <div className="space-y-6 shrink-0">
                        <div>
                            <label className="block text-[10px] font-black text-earth-400 uppercase tracking-[0.2em] mb-2 ml-1">Member Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full px-5 py-4 bg-black/30 border border-white/10 rounded-2xl text-white placeholder-earth-600 focus:outline-none focus:ring-2 focus:ring-agro-500/50 focus:border-agro-500 transition-all font-medium"
                                required
                                placeholder="member@domain.org"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-earth-400 uppercase tracking-[0.2em] mb-2 ml-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full px-5 py-4 bg-black/30 border border-white/10 rounded-2xl text-white placeholder-earth-600 focus:outline-none focus:ring-2 focus:ring-agro-500/50 focus:border-agro-500 transition-all font-medium"
                                required
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="flex items-center ml-1 pb-2">
                            <input
                                id="terms"
                                type="checkbox"
                                checked={agreedToTerms}
                                onChange={(e) => setAgreedToTerms(e.target.checked)}
                                className="h-5 w-5 text-agro-600 focus:ring-agro-500 border-white/10 rounded bg-black/30 focus:ring-offset-earth-900 transition-all"
                            />
                            <label htmlFor="terms" className="ml-3 block text-sm text-earth-300 font-medium">
                                I agree to the <a href="/terms" target="_blank" className="text-agro-400 hover:text-agro-300 transition-colors">Terms and Conditions</a>
                            </label>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 mt-auto sticky bottom-0 bg-transparent py-4 backdrop-blur-sm">
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
                            disabled={isLoading || !selectedGroup || !agreedToTerms}
                            className="px-10 py-4 border border-agro-400/20 rounded-2xl shadow-glow-green text-xs font-black text-white bg-agro-600 hover:bg-agro-500 uppercase tracking-[0.2em] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-earth-900 focus:ring-agro-500 disabled:opacity-30 transition-all active:scale-95"
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : 'Authorize'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
