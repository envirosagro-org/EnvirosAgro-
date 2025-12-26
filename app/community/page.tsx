
import { FORUM_HIGHLIGHTS, FEATURED_MEMBERS } from '@/components/community/communityData';
import { Rss, Users, Calendar } from 'lucide-react';

// Mock data for upcoming events
const UPCOMING_EVENTS = [
  {
    id: 1,
    title: "Webinar: Intro to Regenerative Agriculture",
    date: "2024-08-15T14:00:00Z",
    platform: "Online",
  },
  {
    id: 2,
    title: "AMA with Dr. Sarah Jenkins",
    date: "2024-08-22T18:00:00Z",
    platform: "Community Forum",
  },
  {
    id: 3,
    title: "Tech Demo: Drone-based Soil Sensing",
    date: "2024-09-05T16:00:00Z",
    platform: "Online",
  },
];

export default function CommunityPage() {

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold font-serif text-gray-900 dark:text-white">Community Hub</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Connect, learn, and grow with the brightest minds in sustainable agriculture.</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content: Forum Highlights */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
                <Rss className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Forum Highlights</h2>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-800">
                    {FORUM_HIGHLIGHTS.map((post) => (
                        <li key={post.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">{post.category}</p>
                                    <a href="#" className="block mt-1">
                                        <p className="text-lg font-semibold text-gray-900 dark:text-white hover:underline">{post.topic}</p>
                                    </a>
                                </div>
                                {post.isTrending && (
                                    <span className="ml-2 flex-shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300">
                                        Trending
                                    </span>
                                )}
                            </div>
                            <div className="mt-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <img src={post.authorAvatar} alt={post.author} className="h-6 w-6 rounded-full mr-2" />
                                <span>{post.author}</span>
                                <span className="mx-2">·</span>
                                <span>{`${post.replies} replies`}</span>
                                <span className="mx-2">·</span>
                                <span>{post.lastReply}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Featured Members */}
            <div>
                <div className="flex items-center mb-4">
                    <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Featured Members</h2>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow">
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-800">
                        {FEATURED_MEMBERS.map((member) => (
                            <li key={member.id} className="px-6 py-4 flex items-center space-x-4">
                                <img className="h-10 w-10 rounded-full" src={member.avatar} alt={member.name} />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{member.name}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{member.specialty}</p>
                                </div>
                                <a href="#" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">View</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            
            {/* Upcoming Events */}
            <div>
                <div className="flex items-center mb-4">
                    <Calendar className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-2" />
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Upcoming Events</h2>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow">
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-800">
                        {UPCOMING_EVENTS.map((event) => (
                             <li key={event.id} className="px-6 py-4">
                                <p className="font-semibold text-gray-900 dark:text-white">{event.title}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - {event.platform}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
