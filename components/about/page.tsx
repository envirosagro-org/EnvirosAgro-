
import React, { useState, useEffect } from 'react';

const TEAM_MEMBERS = [
  {
    name: 'Dr. Alistair Finch',
    role: 'Founder & Chief Scientist',
    imageUrl: '/images/team/alistair-finch.jpg',
    bio: 'Alistair is a world-renowned conservation biologist with over 30 years of experience in ecosystem restoration. He founded GreenTide to bridge the gap between cutting-edge science and on-the-ground action, driven by a passion for preserving biodiversity for future generations.',
  },
  {
    name: 'Priya Sharma',
    role: 'CEO',
    imageUrl: '/images/team/priya-sharma.jpg',
    bio: 'Priya is a seasoned leader with a background in sustainable business and international development. She is dedicated to scaling GreenTide\'s impact globally, fostering strategic partnerships, and ensuring the long-term financial health of our initiatives.',
  },
  {
    name: 'Ben Carter',
    role: 'Head of Field Operations',
    imageUrl: '/images/team/ben-carter.jpg',
    bio: 'Ben coordinates all our field projects, working closely with local communities to implement restoration and conservation efforts. His hands-on approach and deep respect for indigenous knowledge are key to our success.',
  },
    {
    name: 'Dr. Lena Petrova',
    role: 'Director of Research',
    imageUrl: '/images/team/lena-petrova.jpg',
    bio: `Lena leads our research and development, focusing on innovative, scalable solutions for carbon capture and biodiversity monitoring. Her work ensures all our projects are grounded in the latest scientific evidence.`
  }
];

const OUR_VALUES = [
    {
        name: "Science-Driven",
        description: "Our strategies are rooted in rigorous scientific research to ensure effective and lasting impact.",
    },
    {
        name: "Community-Powered",
        description: "We believe in empowering local communities as the primary stewards of their ecosystems.",
    },
    {
        name: "Radical Transparency",
        description: "We are open and honest about our successes, our failures, and our finances.",
    },
    {
        name: "Long-Term Commitment",
        description: "We are dedicated to the long-term health of the ecosystems and communities we serve.",
    },
]

export const AboutPage = () => {
  const [team, setTeam] = useState([]);
  const [values, setValues] = useState([]);

  useEffect(() => {
    // Simulate fetching data from a database
    const fetchTeam = new Promise((resolve) => {
      setTimeout(() => {
        resolve(TEAM_MEMBERS);
      }, 1000);
    });

    const fetchValues = new Promise((resolve) => {
      setTimeout(() => {
        resolve(OUR_VALUES);
      }, 1000);
    });

    fetchTeam.then(data => setTeam(data));
    fetchValues.then(data => setValues(data));
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">About GreenTide</h1>
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Mission</h2>
          <p className="text-xl text-center max-w-3xl mx-auto">To restore and protect marine ecosystems through science, technology, and community engagement. We are committed to creating a sustainable future for our oceans and the life they support.</p>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
          {values.length === 0 ? <p className='text-center'>Loading...</p> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg text-center">
                <h3 className="text-xl font-semibold mb-2">{value.name}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>}
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">Meet the Team</h2>
          {team.length === 0 ? <p className='text-center'>Loading...</p> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg text-center">
                <img src={member.imageUrl} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">{member.role}</p>
                <p>{member.bio}</p>
              </div>
            ))}
          </div>}
        </div>
      </div>
    </div>
  );
};
