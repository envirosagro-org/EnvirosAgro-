
import { TEAM_MEMBERS, OUR_VALUES } from '@/components/about/data';
import { CheckCircle } from 'lucide-react';

export default function AboutUsPage() {
  return (
    <div className="bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <div className="relative bg-gray-800 py-32 px-6 lg:px-8">
        <div className="absolute inset-0">
          <img 
            className="w-full h-full object-cover" 
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?&auto=format&fit=crop&w=1280&q=80" 
            alt="Team working together"
          />
          <div className="absolute inset-0 bg-gray-800 mix-blend-multiply" aria-hidden="true"></div>
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold font-serif tracking-tight text-white sm:text-5xl lg:text-6xl">We are GreenTide</h1>
          <p className="mt-6 text-xl text-indigo-100 max-w-3xl mx-auto">
            We are a collective of scientists, storytellers, and strategists united by a single mission: to accelerate the transition to a sustainable and equitable world.
          </p>
        </div>
      </div>

      {/* Our Mission & Values */}
      <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">Our Foundation</h2>
            <p className="mt-2 text-3xl font-bold font-serif tracking-tight text-gray-900 dark:text-white sm:text-4xl">Our Core Values</p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              These principles guide every decision we make, every project we undertake, and every partnership we form. They are the bedrock of our identity.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              {OUR_VALUES.map((value) => (
                <div key={value.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <CheckCircle className="h-5 w-5 flex-none text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                    {value.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                    <p className="flex-auto">{value.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 dark:bg-gray-950 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold font-serif tracking-tight text-gray-900 dark:text-white sm:text-4xl">Meet Our Team</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
              The brilliant minds behind our mission. Our diverse team brings a wealth of experience and a shared passion for a greener future.
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4"
          >
            {TEAM_MEMBERS.map((person) => (
              <li key={person.name} className="text-center">
                <img className="mx-auto h-56 w-56 rounded-full object-cover" src={person.imageUrl} alt={person.name} />
                <h3 className="mt-6 text-base font-semibold leading-7 tracking-tight text-gray-900 dark:text-white">{person.name}</h3>
                <p className="text-sm leading-6 text-indigo-600 dark:text-indigo-400">{person.role}</p>
                 <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">{person.bio}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
