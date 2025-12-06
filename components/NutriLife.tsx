import React from 'react';
import { Heart, Sprout, Apple, ArrowRight, Salad, Droplets, BookOpen } from 'lucide-react';

const FEATURED_POST = {
  id: 1,
  title: "The Hidden Hunger: Micronutrient Deficiency & Soil Health",
  excerpt: "Why the nutrient density of our food has declined by 40% in the last 50 years, and how regenerative soil practices can reverse this trend.",
  author: "Dr. L. Wangari",
  date: "May 12, 2024",
  image: "https://images.unsplash.com/photo-1594492633630-660c6792f392?w=1600&auto=format&fit=crop&q=80",
  category: "Soil to Gut"
};

const BLOG_POSTS = [
  {
    id: 2,
    title: "Moringa: The Miracle Tree Explained",
    category: "Medicinal Plants",
    image: "https://images.unsplash.com/photo-1533561917757-965a96f9c471?w=800&auto=format&fit=crop&q=60",
    desc: "Containing 7x more Vitamin C than oranges, Moringa is a powerhouse for rural nutrition."
  },
  {
    id: 3,
    title: "Mycotoxins: Keeping Your Grain Safe",
    category: "Food Safety",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop&q=60",
    desc: "Practical drying and storage techniques to prevent aflatoxin contamination in maize."
  },
  {
    id: 4,
    title: "Fermentation for Gut Health",
    category: "Nutrition",
    image: "https://images.unsplash.com/photo-1626139576127-d0a85880c8af?w=800&auto=format&fit=crop&q=60",
    desc: "Traditional preservation methods that enhance bioavailability of nutrients."
  }
];

export const NutriLife: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-10">
         <div className="bg-red-100 p-2 rounded-xl text-red-700">
            <Heart size={32} />
         </div>
         <div>
            <h2 className="text-3xl font-serif font-bold text-agro-900 leading-none">NutriLife Blog</h2>
            <p className="text-earth-500 text-sm mt-1">Connecting soil health, crop quality, and human well-being.</p>
         </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
         
         {/* Main Feed */}
         <div className="lg:col-span-2 space-y-12">
            
            {/* Featured Article */}
            <div className="group cursor-pointer">
               <div className="rounded-3xl overflow-hidden mb-6 relative aspect-video">
                  <img src={FEATURED_POST.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={FEATURED_POST.title} />
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                     {FEATURED_POST.category}
                  </div>
               </div>
               <h3 className="text-3xl font-bold text-earth-900 mb-3 group-hover:text-red-700 transition-colors leading-tight">
                  {FEATURED_POST.title}
               </h3>
               <p className="text-earth-600 mb-4 text-lg leading-relaxed">
                  {FEATURED_POST.excerpt}
               </p>
               <div className="flex items-center gap-4 text-sm text-earth-500 font-medium">
                  <span>{FEATURED_POST.author}</span>
                  <span>•</span>
                  <span>{FEATURED_POST.date}</span>
                  <span className="flex items-center gap-1 text-red-600 ml-auto group-hover:gap-2 transition-all">
                     Read Full Article <ArrowRight size={16} />
                  </span>
               </div>
            </div>

            {/* Recent Posts Grid */}
            <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-earth-100">
               {BLOG_POSTS.map((post) => (
                  <div key={post.id} className="group cursor-pointer">
                     <div className="rounded-2xl overflow-hidden mb-4 aspect-[4/3]">
                        <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                     </div>
                     <span className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2 block">{post.category}</span>
                     <h4 className="text-xl font-bold text-earth-900 mb-2 group-hover:text-red-700 transition-colors line-clamp-2">
                        {post.title}
                     </h4>
                     <p className="text-earth-600 text-sm line-clamp-3">
                        {post.desc}
                     </p>
                  </div>
               ))}
            </div>
         </div>

         {/* Sidebar */}
         <div className="space-y-8">
            <div className="bg-red-50 p-8 rounded-3xl border border-red-100">
               <h3 className="font-bold text-red-900 mb-6 flex items-center gap-2">
                  <Apple size={20} /> Wellness Tips
               </h3>
               <ul className="space-y-6">
                  <li className="flex gap-4">
                     <div className="bg-white p-2 rounded-lg text-red-500 h-fit shadow-sm"><Salad size={18} /></div>
                     <div>
                        <h4 className="font-bold text-red-800 text-sm">Diversify Your Plate</h4>
                        <p className="text-xs text-red-700 leading-relaxed mt-1">Aim for 5 different colors of vegetables daily to ensure a mix of phytonutrients.</p>
                     </div>
                  </li>
                  <li className="flex gap-4">
                     <div className="bg-white p-2 rounded-lg text-blue-500 h-fit shadow-sm"><Droplets size={18} /></div>
                     <div>
                        <h4 className="font-bold text-red-800 text-sm">Hydration & Farming</h4>
                        <p className="text-xs text-red-700 leading-relaxed mt-1">Working in the field? Drink 250ml of water every 20 mins to prevent heat stress.</p>
                     </div>
                  </li>
                  <li className="flex gap-4">
                     <div className="bg-white p-2 rounded-lg text-green-500 h-fit shadow-sm"><Sprout size={18} /></div>
                     <div>
                        <h4 className="font-bold text-red-800 text-sm">Bio-Fortification</h4>
                        <p className="text-xs text-red-700 leading-relaxed mt-1">Choose orange-fleshed sweet potatoes over white ones for Vitamin A.</p>
                     </div>
                  </li>
               </ul>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-earth-200 shadow-sm">
               <h3 className="font-bold text-earth-900 mb-4 flex items-center gap-2">
                  <BookOpen className="text-earth-400" size={18} /> Popular Tags
               </h3>
               <div className="flex flex-wrap gap-2">
                  {['Gluten-Free', 'Indigenous Crops', 'Iron Rich', 'Herbal Medicine', 'Mental Health', 'Probiotics'].map(tag => (
                     <span key={tag} className="px-3 py-1 bg-earth-50 text-earth-600 rounded-full text-xs font-bold hover:bg-red-50 hover:text-red-600 cursor-pointer transition-colors border border-earth-100">
                        {tag}
                     </span>
                  ))}
               </div>
            </div>
         </div>

      </div>
    </div>
  );
};