import React, { useState, useMemo } from 'react';
import { Heart, Sprout, Apple, ArrowRight, Salad, Droplets, BookOpen, ArrowLeft, Share2, Clock, Calendar, User, Bookmark, X, Tag } from 'lucide-react';

const FEATURED_POST = {
  id: 1,
  title: "The Hidden Hunger: Micronutrient Deficiency & Soil Health",
  excerpt: "Why the nutrient density of our food has declined by 40% in the last 50 years, and how regenerative soil practices can reverse this trend.",
  author: "Dr. L. Wangari",
  date: "May 12, 2024",
  readTime: "8 min read",
  image: "https://images.unsplash.com/photo-1594492633630-660c6792f392?w=1600&auto=format&fit=crop&q=80",
  category: "Soil to Gut",
  tags: ['Iron Rich', 'Indigenous Crops'],
  content: `
    The nutritional quality of our food is directly linked to the health of the soil in which it grows. Over the last half-century, industrial farming practices focusing purely on yield have led to a 'dilution effect' where crops are larger but less nutrient-dense.

    ### The Dilution Effect
    Research indicates that modern varieties of vegetables and grains contain significantly lower concentrations of minerals and vitamins than those grown in the 1950s. This decline is attributed to a focus on fast-growing varieties and the use of synthetic fertilizers that bypass the complex microbial relationships plants traditionally rely on.

    ### The Regenerative Solution
    Regenerative agriculture, which focuses on restoring soil microbial diversity, has shown the potential to reverse this trend. By fostering mycorrhizal fungi and diverse bacterial colonies, plants can more efficiently absorb trace minerals like zinc, iron, and magnesium. 

    ### Key Strategies for Farmers
    1. **Cover Cropping**: Keeping roots in the ground year-round feeds the microbial community.
    2. **Zero-Till**: Protecting the soil structure prevents the destruction of fungal networks.
    3. **Compost Application**: Introducing diverse biology rather than just chemical NPK.

    This 'Soil to Gut' connection is the next frontier of preventative medicine. When we heal the earth, we heal ourselves.
  `
};

const BLOG_POSTS = [
  {
    id: 2,
    title: "Moringa: The Miracle Tree Explained",
    category: "Medicinal Plants",
    author: "Samuel O.",
    date: "May 10, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1533561917757-965a96f9c471?w=800&auto=format&fit=crop&q=60",
    desc: "Containing 7x more Vitamin C than oranges, Moringa is a powerhouse for rural nutrition.",
    tags: ['Herbal Medicine', 'Indigenous Crops'],
    content: "Moringa oleifera is often called the 'Miracle Tree' for good reason. Every part of the tree is edible or has medicinal properties. In regions where malnutrition is prevalent, Moringa provides a high-concentrate source of Vitamin A, Vitamin C, Calcium, and Potassium. Our network is supporting the integration of Moringa into school feeding programs across the East Africa cluster."
  },
  {
    id: 3,
    title: "Mycotoxins: Keeping Your Grain Safe",
    category: "Food Safety",
    author: "Alice M.",
    date: "May 08, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop&q=60",
    desc: "Practical drying and storage techniques to prevent aflatoxin contamination in maize.",
    tags: ['Indigenous Crops'],
    content: "Aflatoxins are a silent killer in many agricultural communities. These toxic metabolites produced by certain molds can lead to liver damage and stunted growth in children. Prevention starts at the harvest. Ensuring grain moisture is below 13.5% before storage and using hermetic bags are critical technical thrusts we are promoting to ensure Health Agriculture standards."
  },
  {
    id: 4,
    title: "Fermentation for Gut Health",
    category: "Nutrition",
    author: "Dr. Elena Rossi",
    date: "May 05, 2024",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1626139576127-d0a85880c8af?w=800&auto=format&fit=crop&q=60",
    desc: "Traditional preservation methods that enhance bioavailability of nutrients.",
    tags: ['Probiotics', 'Mental Health'],
    content: "Fermentation is an ancient technology for a modern world. By breaking down anti-nutrients like phytic acid in grains and tubers, fermentation makes minerals more available to our bodies. Culturally appropriate fermented foods like 'Uji' (fermented porridge) are essential tools in our NutriLife strategy to optimize the HA Thrust."
  }
];

const POPULAR_TAGS = ['Gluten-Free', 'Indigenous Crops', 'Iron Rich', 'Herbal Medicine', 'Mental Health', 'Probiotics'];

export const NutriLife: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const handleShare = (article: any) => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt || article.desc,
        url: window.location.href
      }).catch(() => {});
    } else {
      alert("Link copied to clipboard!");
    }
  };

  const filteredPosts = useMemo(() => {
    if (!activeTag) return BLOG_POSTS;
    return BLOG_POSTS.filter(post => post.tags.includes(activeTag));
  }, [activeTag]);

  const showFeatured = !activeTag;

  const renderDetailedArticle = (article: any) => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={() => setSelectedArticle(null)}
        className="mb-8 flex items-center gap-2 text-earth-500 hover:text-red-600 font-bold transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Feed
      </button>

      <div className="bg-white rounded-[3rem] shadow-sm border border-earth-100 overflow-hidden mb-12">
        <div className="relative aspect-video md:h-[500px] w-full">
           <img src={article.image} className="w-full h-full object-cover" alt={article.title} />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
           <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
              <span className="bg-red-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4 inline-block">{article.category}</span>
              <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-6">{article.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-sm text-red-200 font-bold uppercase tracking-wider">
                 <span className="flex items-center gap-2"><User size={16} /> {article.author}</span>
                 <span className="flex items-center gap-2"><Calendar size={16} /> {article.date}</span>
                 <span className="flex items-center gap-2"><Clock size={16} /> {article.readTime || '5 min read'}</span>
              </div>
           </div>
        </div>
        
        <div className="p-8 md:p-16 max-w-4xl mx-auto">
           <div className="prose prose-lg prose-earth max-w-none">
              <div className="whitespace-pre-wrap text-earth-700 leading-relaxed font-medium text-lg">
                {article.content || article.desc}
              </div>
           </div>
           
           <div className="mt-12 pt-8 border-t border-earth-100 flex justify-between items-center">
              <div className="flex gap-4">
                 <button onClick={() => handleShare(article)} className="p-3 bg-earth-50 rounded-full text-earth-400 hover:text-red-600 transition-colors">
                    <Share2 size={24} />
                 </button>
                 <button className="p-3 bg-earth-50 rounded-full text-earth-400 hover:text-red-600 transition-colors">
                    <Bookmark size={24} />
                 </button>
              </div>
              <button onClick={() => setSelectedArticle(null)} className="text-red-600 font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:gap-3 transition-all">
                Next Article <ArrowRight size={18} />
              </button>
           </div>
        </div>
      </div>
      
      {/* Related Content */}
      <h3 className="text-2xl font-serif font-bold text-earth-900 mb-8">Continue Reading</h3>
      <div className="grid md:grid-cols-3 gap-8">
         {BLOG_POSTS.filter(p => p.id !== article.id).slice(0, 3).map(post => (
           <div key={post.id} onClick={() => { setSelectedArticle(post); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="bg-white p-4 rounded-3xl border border-earth-100 hover:shadow-lg transition-all cursor-pointer group">
              <img src={post.image} className="w-full h-40 object-cover rounded-2xl mb-4" alt={post.title} />
              <h4 className="font-bold text-earth-900 group-hover:text-red-600 transition-colors line-clamp-2">{post.title}</h4>
           </div>
         ))}
      </div>
    </div>
  );

  if (selectedArticle) {
    return renderDetailedArticle(selectedArticle);
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div className="flex items-center gap-3">
           <div className="bg-red-100 p-2 rounded-xl text-red-700">
              <Heart size={32} />
           </div>
           <div>
              <h2 className="text-3xl font-serif font-bold text-agro-900 leading-none">NutriLife Blog</h2>
              <p className="text-earth-50 text-sm mt-1">Connecting soil health, crop quality, and human well-being.</p>
           </div>
        </div>

        {activeTag && (
           <div className="flex items-center gap-3 bg-red-50 px-4 py-2 rounded-full border border-red-100 animate-in slide-in-from-right-4">
              <span className="text-xs font-bold text-red-700 flex items-center gap-2">
                 <Tag size={14} /> Filtering by: <span className="uppercase tracking-widest">{activeTag}</span>
              </span>
              <button 
                onClick={() => setActiveTag(null)}
                className="p-1 hover:bg-red-200 rounded-full text-red-700 transition-colors"
              >
                 <X size={14} />
              </button>
           </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
         
         {/* Main Feed */}
         <div className="lg:col-span-2 space-y-12">
            
            {/* Featured Article - only show if not filtering or if it matches tag */}
            {showFeatured && (
               <div className="group cursor-pointer" onClick={() => setSelectedArticle(FEATURED_POST)}>
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
                     <span className="flex items-center gap-1 text-red-600 ml-auto group-hover:gap-2 transition-all font-black uppercase text-xs tracking-widest">
                        Read Full Article <ArrowRight size={16} />
                     </span>
                  </div>
               </div>
            )}

            {/* Recent Posts Grid */}
            <div className={`grid md:grid-cols-2 gap-8 pt-8 ${showFeatured ? 'border-t border-earth-100' : ''}`}>
               {filteredPosts.length > 0 ? filteredPosts.map((post) => (
                  <div key={post.id} className="group cursor-pointer" onClick={() => setSelectedArticle(post)}>
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
               )) : (
                  <div className="col-span-2 py-20 text-center bg-earth-50 rounded-3xl border-2 border-dashed border-earth-200">
                     <BookOpen size={48} className="mx-auto text-earth-300 mb-4" />
                     <h4 className="text-lg font-bold text-earth-900">No articles found</h4>
                     <p className="text-earth-500 text-sm mt-1">Try another tag or clear your filter.</p>
                     <button 
                        onClick={() => setActiveTag(null)}
                        className="mt-6 text-red-600 font-black uppercase text-xs tracking-widest hover:underline"
                     >
                        View All Articles
                     </button>
                  </div>
               )}
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
                  {POPULAR_TAGS.map(tag => (
                     <span 
                        key={tag} 
                        onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                        className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-all border ${
                           activeTag === tag 
                           ? 'bg-red-600 text-white border-red-600 shadow-lg scale-105' 
                           : 'bg-earth-50 text-earth-600 border-earth-100 hover:bg-red-50 hover:text-red-600 hover:border-red-100'
                        }`}
                     >
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
