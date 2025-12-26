import React from 'react';
import { ChevronRight } from 'lucide-react';

interface CtaProps {
    title: string;
    subtitle: string;
    buttonText: string;
    onClick?: () => void;
}

export const Cta: React.FC<CtaProps> = ({ title, subtitle, buttonText, onClick }) => {
    return (
        <div className="bg-green-700">
            <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                    <span className="block">{title}</span>
                </h2>
                <p className="mt-4 text-lg text-green-200">
                    {subtitle}
                </p>
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        onClick?.();
                    }}
                    className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50 sm:w-auto cursor-pointer"
                >
                    {buttonText}
                    <ChevronRight className="ml-2 -mr-1 h-5 w-5" />
                </a>
            </div>
        </div>
    );
};