
import React, { useState } from 'react';
import { Users, Leaf, ShieldPlus, Cpu, Factory, Building2, X, Send, CheckCircle2, ArrowRight, Scale, Globe, BookOpen, Star, Handshake, PlusCircle } from 'lucide-react';

const PARTNER_CATEGORIES = [
  {
    id: 'SA',
    title: 'Social Alliances',
    icon: <Users size={32} />,
    color: 'bg-rose-50 border-rose-100 text-rose-800',
    description: 'Collaborating with NGOs, cooperatives, and educational institutions to foster community resilience and knowledge transfer.',
    fullDescription: "Social alliances form the bedrock of community resilience. By partnering with educational bodies and local cooperatives, we ensure that agricultural knowledge is preserved, shared, and evolved. These partnerships focus on the human element of farming—empowering women, youth, and indigenous communities.",
    opportunities: ["Joint Training Workshops", "Community Seed Banks", "Cultural Heritage Documentation", "Youth Mentorship Programs"]
  },
  {
    id: 'EA',
    title: 'Environmental Coalitions',
    icon: <Leaf size={32} />,
    color: 'bg-green-50 border-green-100 text-green-800',
    description: 'Partnering with conservation bodies and climate funds to drive biodiversity restoration and carbon neutrality.',
    fullDescription: "Our environmental coalitions aim to restore the delicate balance between agriculture and nature. Partners in this sector work on reforestation projects, soil regeneration initiatives, and water conservation strategies. We connect farmers with carbon credit markets and green financing.",
    opportunities: ["Carbon Sequestration Projects", "Biodiversity Mapping", "Sustainable Water Management", "Eco-Certification Systems"]
  },
  {
    id: 'HA',
    title: 'Health & Safety Boards',
    icon: <ShieldPlus size={32} />,
    color: 'bg-red-50 border-red-100 text-red-800',
    description: 'Working with health organizations and regulators to ensure food safety and the well-being of agricultural workers.',
    fullDescription: "Health is wealth in agriculture. These partnerships bridge the gap between public health and farming practices. We collaborate to reduce chemical exposure, manage zoonotic diseases, and ensure nutritional security for farming households and consumers alike.",
    opportunities: ["Occupational Safety Training", "Food Safety Certification", "Nutritional Program Rollouts", "Disease Surveillance Networks"]
  },
  {
    id: 'TA',
    title: 'Tech & Research Labs',
    icon: <Cpu size={32} />,
    color: 'bg-blue-50 border-blue-100 text-blue-800',
    description: 'Joint ventures with universities and tech firms to develop precision agriculture tools and AI diagnostics.',
    fullDescription: "Innovation drives efficiency. Our technical partners provide the cutting-edge tools needed for modern sustainable farming. From AI-driven pest detection to IoT soil sensors, these collaborations bring the lab to the land, democratizing access to data.",
    opportunities: ["AgTech Pilot Programs", "Data Analysis & Modeling", "Precision Farming Tools", "Remote Sensing Research"]
  },
  {
    id: 'IA',
    title: 'Industrial Consortiums',
    icon: <Factory size={32} />,
    color: 'bg-slate-50 border-slate-100 text-slate-800',
    description: 'Strategic alignment with manufacturing giants and logistics fleets to scale sustainable supply chains.',
    fullDescription: "Scalability is key to global impact. Industrial consortiums connect smallholder farmers to massive supply chains, ensuring market access and fair pricing. These partnerships focus on value addition, processing infrastructure, and efficient logistics.",
    opportunities: ["Supply Chain Integration", "Processing Infrastructure", "Global Market Access", "Bulk Logistics Optimization"]
  }
];

const CRITERIA_LIST = [
    {
        title: "Strategic Alignment",
        description: "Your organization's mission must align with at least one of the Five Thrusts of the EnvirosAgro framework.",
        icon: <Globe className="text-agro-600" />
    },
    {
        title: "Legal Compliance",
        description: "Must be a registered legal entity (NGO, Company, Cooperative, or Government Body) in your country of operation.",
        icon: <Scale className="text-blue-600" />
    },
    {
        title: "Sustainability Commitment",
        description: "Demonstrated track record of environmentally friendly practices or social impact in the agricultural sector.",
        icon: <Leaf className="text-green-600" />
    },
    {
        title: "Scalability Potential",
        description: "Capacity to impact a minimum of 100 farmers, 10 hectares of land, or significant research output within 12 months.",
        icon: <Factory className="text-slate-600" />
    },
    {
        title: "Data Collaboration",
        description: "Willingness to contribute non-proprietary anonymized data to the EnvirosAgro Data Base to improve the global m(t) score.",
        icon: <BookOpen className="text-amber-600" />
    }
];

export const Partnerships: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showCriteriaModal, setShowCriteriaModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<typeof PARTNER_CATEGORIES[0] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    orgName: '',
    email: '',
    category: 'SA',
    proposal: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset after success
      setTimeout(() => {
        setIsSuccess(false);
        setShowModal(false);
        setFormData({ orgName: '', email: '', category: 'SA', proposal: '' });
      }, 2000);
    }, 1500);
  };

  const handleApplyFromDetails = (categoryId: string) => {
      setFormData(prev => ({ ...prev, category: categoryId }));
      setSelectedCategory(null);
      setShowModal(true);
  };

  const handleApplyForOpportunity = (categoryId: string, opportunity: string) => {
      setFormData(prev => ({
          ...prev,
          category: categoryId,
          proposal: `I am interested in collaborating on the "${opportunity}" initiative. We have expertise in this area and would like to explore...`
      }));
      setSelectedCategory(null);
      setShowModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 relative">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif font-bold text-agro-900 mb-4">Strategic Partnerships</h2>
        <p className="text-xl text-earth-600 max-w-3xl mx-auto">
          Building a unified ecosystem by collaborating with leaders across the Five Thrusts of sustainability.
        </p>
      </div>

      {/* Thrust Categories */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
        {PARTNER_CATEGORIES.map((cat) => (
            <div key={cat.id} className={`p-6 rounded-2xl border ${cat.color} bg-white hover:shadow-lg transition-all flex flex-col`}>
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${cat.color} bg-opacity-50`}>
                    {cat.icon}
                </div>
                <h3 className="font-bold text-lg mb-2 text-earth-900">{cat.title}</h3>
                <p className="text-xs text-earth-600 mb-4 flex-1 leading-relaxed">
                    {cat.description}
                </p>
                <button 
                    onClick={() => setSelectedCategory(cat)}
                    className="text-xs font-bold uppercase tracking-wider text-earth-400 hover:text-agro-600 text-left flex items-center gap-1 group"
                >
                    Learn More <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-earth-100 rounded-3xl p-12 text-center">
         <Building2 size={48} className="mx-auto mb-4 text-earth-400" />
         <h3 className="text-2xl font-bold text-earth-900 mb-2">Become a Partner</h3>
         <p className="text-earth-600 max-w-xl mx-auto mb-8">
            Join the EnvirosAgro network to amplify your impact and drive the future of sustainable agriculture.
         </p>
         <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
                onClick={() => setShowModal(true)}
                className="bg-agro-600 text-white px-8 py-3 rounded-full font-bold hover:bg-agro-700 transition-colors shadow-lg hover:shadow-agro-200/50"
            >
                Apply for Partnership
            </button>
            <button 
                onClick={() => setShowCriteriaModal(true)}
                className="bg-white text-earth-700 border border-earth-300 px-8 py-3 rounded-full font-bold hover:bg-earth-50 transition-colors"
            >
                View Criteria
            </button>
         </div>
      </div>

      {/* Criteria Modal */}
      {showCriteriaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-earth-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-earth-100 flex justify-between items-center bg-agro-50">
                    <div>
                        <h3 className="font-bold text-xl text-agro-900">Partnership Eligibility Criteria</h3>
                        <p className="text-xs text-agro-700 mt-1">Standards for joining the EnvirosAgro Ecosystem.</p>
                    </div>
                    <button 
                        onClick={() => setShowCriteriaModal(false)}
                        className="text-earth-400 hover:text-earth-700 transition-colors p-2 hover:bg-white/50 rounded-full"
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className="p-8 overflow-y-auto">
                   <div className="space-y-6">
                       {CRITERIA_LIST.map((criteria, idx) => (
                           <div key={idx} className="flex gap-4 items-start p-4 rounded-xl hover:bg-earth-50 transition-colors border border-transparent hover:border-earth-100">
                               <div className="bg-white p-2 rounded-lg shadow-sm border border-earth-100 shrink-0 mt-1">
                                   {criteria.icon}
                               </div>
                               <div>
                                   <h4 className="font-bold text-earth-900 text-lg mb-1">{criteria.title}</h4>
                                   <p className="text-earth-600 text-sm leading-relaxed">{criteria.description}</p>
                               </div>
                           </div>
                       ))}
                   </div>
                   
                   <div className="mt-8 pt-6 border-t border-earth-100 text-center bg-earth-50/50 rounded-xl p-6">
                       <p className="text-sm text-earth-600 mb-4 font-medium">Does your organization meet these standards?</p>
                       <button 
                           onClick={() => { setShowCriteriaModal(false); setShowModal(true); }}
                           className="bg-agro-600 text-white px-8 py-3 rounded-full font-bold hover:bg-agro-700 transition-colors shadow-md flex items-center justify-center gap-2 mx-auto"
                       >
                           Yes, Proceed to Application <ArrowRight size={18} />
                       </button>
                   </div>
                </div>
            </div>
        </div>
      )}

      {/* Category Details Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-earth-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                <div className={`p-6 border-b border-earth-100 flex justify-between items-center ${selectedCategory.color.split(' ')[0]}`}>
                    <div className="flex items-center gap-4">
                        <div className="bg-white p-2 rounded-xl shadow-sm bg-opacity-70">
                            {selectedCategory.icon}
                        </div>
                        <div>
                            <h3 className="font-bold text-xl text-earth-900">{selectedCategory.title}</h3>
                            <p className="text-xs text-earth-700 mt-1 uppercase font-bold tracking-wider">Partnership Overview</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setSelectedCategory(null)}
                        className="text-earth-600 hover:text-earth-900 transition-colors p-2 hover:bg-white/30 rounded-full"
                    >
                        <X size={24} />
                    </button>
                </div>
                
                <div className="p-8 overflow-y-auto">
                    <div className="prose prose-earth max-w-none mb-8">
                        <p className="text-lg text-earth-600 leading-relaxed">
                            {selectedCategory.fullDescription}
                        </p>
                    </div>

                    <div className="bg-earth-50 rounded-2xl p-6 border border-earth-100 mb-8">
                        <h4 className="font-bold text-earth-900 mb-4 flex items-center gap-2">
                            <Star size={18} className="text-agro-600" /> Collaboration Opportunities
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {selectedCategory.opportunities.map((opp, idx) => (
                                <button 
                                    key={idx} 
                                    onClick={() => handleApplyForOpportunity(selectedCategory.id, opp)}
                                    className="flex items-center justify-between gap-3 bg-white p-4 rounded-xl border border-earth-100 shadow-sm hover:shadow-md hover:border-agro-200 hover:bg-agro-50/50 transition-all text-left group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-agro-500 group-hover:scale-125 transition-transform"></div>
                                        <span className="text-sm text-earth-700 font-medium group-hover:text-agro-800">{opp}</span>
                                    </div>
                                    <PlusCircle size={16} className="text-earth-300 group-hover:text-agro-600 opacity-0 group-hover:opacity-100 transition-all" />
                                </button>
                            ))}
                        </div>
                        <p className="text-xs text-earth-400 mt-4 text-center italic">Click an opportunity to start a specific proposal.</p>
                    </div>

                    <div className="flex justify-end">
                        <button 
                            onClick={() => handleApplyFromDetails(selectedCategory.id)}
                            className="bg-agro-600 text-white px-8 py-3 rounded-full font-bold hover:bg-agro-700 transition-colors shadow-lg flex items-center gap-2 w-full sm:w-auto justify-center"
                        >
                            <Handshake size={18} /> General Partnership Inquiry
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Application Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-earth-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                
                {/* Header */}
                <div className="p-6 border-b border-earth-100 flex justify-between items-center bg-agro-50">
                    <div>
                        <h3 className="font-bold text-xl text-agro-900">Partnership Application</h3>
                        <p className="text-xs text-agro-700 mt-1">Join the global sustainability network.</p>
                    </div>
                    <button 
                        onClick={() => setShowModal(false)}
                        className="text-earth-400 hover:text-earth-700 transition-colors p-2 hover:bg-white/50 rounded-full"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form Content */}
                <div className="p-8 overflow-y-auto">
                    {isSuccess ? (
                        <div className="flex flex-col items-center justify-center text-center py-8 animate-in zoom-in">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
                                <CheckCircle2 size={48} />
                            </div>
                            <h4 className="text-2xl font-bold text-earth-900 mb-2">Application Received!</h4>
                            <p className="text-earth-600 max-w-xs">
                                Thank you for your interest. Our partnership team will review your proposal and contact you within 5 business days.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-1">
                                <label className="text-sm font-bold text-earth-700 ml-1">Organization Name</label>
                                <input 
                                    type="text" 
                                    required
                                    value={formData.orgName}
                                    onChange={(e) => setFormData({...formData, orgName: e.target.value})}
                                    className="w-full bg-earth-50 border border-earth-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-agro-500 transition-all"
                                    placeholder="e.g. GreenTech Innovations"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-bold text-earth-700 ml-1">Contact Email</label>
                                <input 
                                    type="email" 
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full bg-earth-50 border border-earth-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-agro-500 transition-all"
                                    placeholder="partnerships@company.com"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-bold text-earth-700 ml-1">Partnership Category</label>
                                <div className="relative">
                                    <select 
                                        value={formData.category}
                                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                                        className="w-full bg-earth-50 border border-earth-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-agro-500 transition-all appearance-none text-earth-700"
                                    >
                                        {PARTNER_CATEGORIES.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.title}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-4 top-4 w-2 h-2 border-r-2 border-b-2 border-earth-400 rotate-45 pointer-events-none"></div>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-bold text-earth-700 ml-1">Proposal / Message</label>
                                <textarea 
                                    rows={4}
                                    required
                                    value={formData.proposal}
                                    onChange={(e) => setFormData({...formData, proposal: e.target.value})}
                                    className="w-full bg-earth-50 border border-earth-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-agro-500 transition-all resize-none"
                                    placeholder="Briefly describe how you wish to collaborate with EnvirosAgro..."
                                ></textarea>
                            </div>

                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full bg-agro-600 hover:bg-agro-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    'Processing...'
                                ) : (
                                    <>
                                        Submit Application <Send size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
