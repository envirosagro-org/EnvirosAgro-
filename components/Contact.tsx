import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Loader2, Check } from 'lucide-react';
import { useCountUp } from 'use-count-up';
import { View } from '../types';
import { motion } from 'framer-motion';

interface ContactProps {
    onNavigate?: (view: View) => void;
}

const StatCard: React.FC<{ end: number; suffix: string; label: string; }> = ({ end, suffix, label }) => {
    const { value } = useCountUp({ isCounting: true, end: end, duration: 3 });
    return (
        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 text-center">
            <p className="text-5xl font-black font-serif text-white">{value}{suffix}</p>
            <p className="text-white/60 text-sm mt-2">{label}</p>
        </div>
    );
};

export const Contact: React.FC<ContactProps> = ({ onNavigate }) => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setTimeout(() => {
            setStatus('success');
            // In a real app, you'd send the email here.
        }, 1500);
    };

    return (
        <div className="bg-[#0B1A1E] min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-6xl font-serif font-extrabold text-white tracking-tight">Get In Touch</h1>
                    <p className="mt-4 text-xl text-white/70 max-w-3xl mx-auto">
                        We're building the future of sustainable agriculture. Have a question, partnership idea, or just want to connect? Reach out.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="p-10 bg-gradient-to-br from-agro-600 to-green-600 rounded-3xl shadow-2xl shadow-green-600/20">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <h3 className="text-3xl font-bold text-white mb-6">Send a Message</h3>
                                <input type="text" name="name" placeholder="Your Name" onChange={handleInputChange} required className="w-full bg-white/10 text-white placeholder-white/50 rounded-lg p-4 focus:ring-2 focus:ring-white/50 outline-none transition-all" />
                                <input type="email" name="email" placeholder="Email Address" onChange={handleInputChange} required className="w-full bg-white/10 text-white placeholder-white/50 rounded-lg p-4 focus:ring-2 focus:ring-white/50 outline-none transition-all" />
                                <textarea name="message" placeholder="Your message..." rows={5} onChange={handleInputChange} required className="w-full bg-white/10 text-white placeholder-white/50 rounded-lg p-4 focus:ring-2 focus:ring-white/50 outline-none transition-all"></textarea>
                                <button 
                                    type="submit" 
                                    disabled={status === 'loading'}
                                    className="w-full bg-white text-agro-700 font-bold py-4 rounded-lg text-lg hover:bg-opacity-90 transition-all flex items-center justify-center disabled:opacity-70"
                                >
                                    {status === 'loading' ? <Loader2 className="animate-spin" /> : status === 'success' ? <Check /> : <Send />}
                                    <span className="ml-2">
                                        {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
                                    </span>
                                </button>
                            </form>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4 text-white">
                            <a href="#" className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors">
                                <Phone size={24} className="mb-2" />
                                <span className="font-bold text-sm">+1 (555) 1234</span>
                            </a>
                            <a href="#" className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors">
                                <Mail size={24} className="mb-2" />
                                <span className="font-bold text-sm">contact@envirosagro.com</span>
                            </a>
                            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                                <MapPin size={24} className="mb-2" />
                                <span className="font-bold text-sm">San Francisco, CA</span>
                            </div>
                        </div>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="h-full flex flex-col gap-8"
                    >
                        <div className="flex-1 bg-gradient-to-br from-gray-800 to-black rounded-3xl p-10 relative overflow-hidden border border-white/10">
                            <h3 className="text-3xl font-bold text-white mb-8">Our Global Impact</h3>
                            <div className="space-y-6">
                                <StatCard end={12} suffix="M" label="Hectares Under Sustainable Management" />
                                <StatCard end={3.4} suffix="T" label="Annual CO2 Sequestration" />
                                <StatCard end={4200} suffix="+" label="Partnered Agricultural Communities" />
                            </div>
                        </div>
                        
                        <div className="flex-1 h-[400px] bg-gray-800 rounded-3xl overflow-hidden border border-white/10">
                           <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019558066554!2d-122.4206796846816!3d37.78825197975811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808e6e5a5a1b%3A0x8a3f6a4f8f0a0a0!2sSan%20Francisco%20City%20Hall!5e0!3m2!1sen!2sus!4v1678886470381!5m2!1sen!2sus"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={false}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="filter grayscale invert contrast-125 opacity-80"
                            ></iframe>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;