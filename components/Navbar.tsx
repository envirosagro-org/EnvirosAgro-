import React from 'react';
import { View } from '../types';

interface NavbarProps {
  onNavigate: (view: View) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const navItems = [
    { label: 'Home', view: View.HOME },
    {
      label: 'For Farmers',
      subItems: [
        { label: 'Dashboard', view: View.DASHBOARD },
        { label: 'Crop Doctor', view: View.CROP_DOCTOR },
        { label: 'Farm Scout', view: View.FARM_SCOUT },
        { label: 'Smart Farm VR', view: View.SMART_FARM_VR },
        { label: 'Safe Harvest', view: View.SAFE_HARVEST },
        { label: 'Finance', view: View.FINANCE },
      ],
    },
    {
      label: 'For Professionals',
      subItems: [
        { label: 'Professional View', view: View.PROFESSIONAL },
        { label: 'Resilience View', view: View.RESILIENCE },
      ],
    },
    {
      label: 'Community',
      subItems: [
        { label: 'Community Hub', view: View.COMMUNITY },
        { label: 'Knowledge Base', view: View.KNOWLEDGE },
        { label: 'Network Input Hub', view: View.NETWORK_INPUT_HUB },
        { label: 'ScaleUp Summit', view: View.SCALEUP_SUMMIT },
      ],
    },
    {
      label: 'About',
      subItems: [
        { label: 'Five Thrusts', view: View.FIVE_THRUSTS },
        { label: 'Future Vision', view: View.FUTURE_VISION },
        { label: 'Roadmap AI', view: View.ROADMAP_AI },
        { label: 'Community Guidelines', view: View.COMMUNITY_GUIDELINES },
        { label: 'Trademarks', view: View.TRADEMARKS },
        { label: 'Privacy Policy', view: View.PRIVACY_POLICY },
      ],
    },
  ];

  return (
    <nav className="bg-gray-800 p-4 fixed w-full top-0 z-50">
      <ul className="flex justify-around items-center">
        {navItems.map((item, index) => (
          <li key={index} className="relative group">
            <button onClick={() => item.view && onNavigate(item.view)} className="text-white hover:text-gray-300 focus:outline-none">
              {item.label}
            </button>
            {item.subItems && (
              <ul className="absolute left-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg hidden group-hover:block">
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <button onClick={() => onNavigate(subItem.view)} className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-600">
                      {subItem.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};