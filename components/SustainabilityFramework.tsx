import React, { useState, useMemo } from 'react';
import { 
  Users, Leaf, ShieldPlus, Cpu, Factory, 
  Calculator, BookOpen, Activity, Sprout, 
  Globe, BarChart3, Droplets, TrendingUp, Settings, Scale
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, ComposedChart, Bar 
} from 'recharts';

const THRUSTS = [
  {
    id: 'SA',
    title: 'Social Agriculture',
    icon: <Users size={28} />,
    color: 'bg-rose-100 text-rose-700',
    description: 'Focuses on human relationships, community engagement, participatory learning, and effective knowledge transfer among stakeholders.'
  },
  {
    id: 'EA',
    title: 'Environmental Agriculture',
    icon: <Leaf size={28} />,
    color: 'bg-green-100 text-green-700',
    description: 'Emphasizes conservation efforts, biodiversity preservation, soil regeneration, and sustainable water use to maintain ecological balance.'
  },
  {
    id: 'HA',
    title: 'Health Agriculture',
    icon: <ShieldPlus size={28} />,
    color: 'bg-red-100 text-red-700',
    description: 'Addresses the well-being of crops, livestock, farmers, and consumers by managing pathogens, toxins, and environmental hazards.'
  },
  {
    id: 'TA',
    title: 'Technical Agriculture',
    icon: <Cpu size={28} />,
    color: 'bg-blue-100 text-blue-700',
    description: 'Involves adopting tools, technology, data management, and precision farming techniques to optimize production efficiency.'
  },
  {
    id: 'IA',
    title: 'Industrial Agriculture',
    icon: <Factory size={28} />,
    color: 'bg-slate-100 text-slate-700',
    description: 'Encompasses scalability, mechanization, value chain development, and post-harvest processing to enhance efficiency and market reach.'
  }
];

const APPLICATIONS = [
  {
    title: "Farming Operations",
    icon: <Sprout size={20} />,
    content: "Farmers use the Sustainable Time Constant (m) to determine planting windows and crop choices. If m ≈ 5.0, short-duration crops like sorghum fit; if m > 7.0, maize or bananas are viable."
  },
  {
    title: "Soil & Water Management",
    icon: <Droplets size={20} />,
    content: "By calculating In (Indirect natural factors), extension officers identify needs for water harvesting or drip irrigation. Low soil retention signals immediate need for organic matter improvement."
  },
  {
    title: "Climate Adaptation",
    icon: <Globe size={20} />,
    content: "Governments map regions based on m-scores to predict drought vulnerability. High m areas support intensification, while low m areas receive resilience-building funds."
  },
  {
    title: "Technology Adoption",
    icon: <Cpu size={20} />,
    content: "Using the geometric model to calculate how fast sustainability improves as communities adopt irrigation, improved seeds, or mechanization."
  },
  {
    title: "Value Chain Planning",
    icon: <Factory size={20} />,
    content: "Companies use C(a) to determine which regions are ready for contract farming or cold storage investments, ensuring stable supply chains."
  },
  {
    title: "Policy & Regulation",
    icon: <Scale size={20} />,
    content: "National food security modeling and county-level sustainability indices to guide subsidies, insurance, and development planning."
  }
];

export const SustainabilityFramework: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'model' | 'simulation'>('model');
  
  // Simulation State
  const [params, setParams] = useState({
    x: 2.0, // Base Agricultural Factor (Low=2, High=4)
    r: 1.1, // Growth/Adoption Ratio
    dn: 8,  // Average Rainfall Duration (months)
    years: 10
  });

  // Calculate Time Series Data
  const simulationData = useMemo(() => {
    const data = [];
    const f = 0.5; // Soil retention factor
    const S = 12; // Crop requirement (months)
    let currentX = params.x;
    
    // Seed for pseudo-random rainfall fluctuation
    let rainfall = params.dn;

    for (let t = 1; t <= params.years; t++) {
      // Simulate rainfall fluctuation (+/- 15%)
      const fluctuation = (Math.sin(t * 2.5) * 0.15) * params.dn;
      const currentDn = Math.max(0, params.dn + fluctuation);
      const currentIn = f * currentDn;
      const n = 1 * currentIn; // k = 1

      // Geometric Sustainability Coefficient Formula
      // c(a) = [x * (r^n - 1)] / (r - 1) + 1
      let ca = 0;
      if (Math.abs(params.r - 1) < 0.001) {
         ca = n * currentX + 1;
      } else {
         ca = (currentX * (Math.pow(params.r, n) - 1)) / (params.r - 1) + 1;
      }

      // Sustainable Time Constant Formula
      // m = sqrt[ (f * Dn^2 * ca) / S ]
      // Simplified: m = sqrt[ (In * Dn * ca) / S ]
      const m = Math.sqrt((currentIn * currentDn * ca) / S);

      data.push({
        year: `Year ${t}`,
        m: parseFloat(m.toFixed(2)),
        rainfall: parseFloat(currentDn.toFixed(1)),
        adoption: parseFloat(currentX.toFixed(2)),
        ca: parseFloat(ca.toFixed(1)),
      });

      // Update adoption for next year
      currentX = currentX * params.r;
    }
    return data;
  }, [params]);

  const finalValues = simulationData[simulationData.length - 1];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      
      {/* Hero Section */}
      <div className="bg-agro-900 rounded-3xl p-8 md:p-12 text-white mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-agro-800/30 transform skew-x-12 translate-x-12"></div>
        <div className="relative z-10">
           <h1 className="text-3xl md:text-5xl font-serif font-bold mb-6">EnvirosAgro Sustainability Framework</h1>
           <p className="text-agro-100 text-lg md:text-xl max-w-3xl leading-relaxed">
             A pioneering mathematical model organizing sustainability into five interconnected thrusts. 
             We quantify the balance between natural resources and agricultural practices to ensure resilience.
           </p>
           
           <div className="flex gap-4 mt-8">
             <button 
                onClick={() => setActiveTab('model')}
                className={`px-6 py-3 rounded-full font-bold transition-all ${activeTab === 'model' ? 'bg-white text-agro-900' : 'bg-agro-800 text-white hover:bg-agro-700'}`}
             >
                The Framework
             </button>
             <button 
                onClick={() => setActiveTab('simulation')}
                className={`px-6 py-3 rounded-full font-bold transition-all flex items-center gap-2 ${activeTab === 'simulation' ? 'bg-white text-agro-900' : 'bg-agro-800 text-white hover:bg-agro-700'}`}
             >
                <Activity size={18} /> Interactive Simulator
             </button>
           </div>
        </div>
      </div>

      {/* Main Content */}
      {activeTab === 'model' ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Five Thrusts */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-agro-900 mb-8 text-center">The Five Thrusts of Agriculture</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              {THRUSTS.map((thrust) => (
                <div key={thrust.id} className="bg-white p-6 rounded-2xl shadow-sm border border-earth-100 hover:shadow-md transition-shadow flex flex-col items-center text-center group">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${thrust.color} group-hover:scale-110 transition-transform`}>
                    {thrust.icon}
                  </div>
                  <h3 className="font-bold text-lg text-earth-900 mb-2">{thrust.title}</h3>
                  <p className="text-xs text-earth-500">{thrust.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-earth-100 p-6 rounded-xl text-center">
              <p className="text-earth-700 font-medium">
                <span className="font-bold">Progression:</span> As a system matures from Social (SA) to Industrial (IA) Agriculture, inefficiencies decrease and the Sustainability Coefficient <span className="font-serif italic">C(a)</span> increases exponentially.
              </p>
            </div>
          </div>

          {/* The Math Section */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-earth-200">
               <h3 className="text-2xl font-bold text-agro-900 mb-6 flex items-center gap-2">
                 <Calculator className="text-agro-600" /> The Sustainability Equation
               </h3>
               <p className="text-earth-600 mb-6">
                 We treat agriculture as a dependent variable adapting to nature (the independent variable).
               </p>
               
               <div className="bg-earth-50 p-6 rounded-xl mb-6 font-mono text-sm md:text-base border border-earth-100">
                 <div className="mb-4">
                   <strong className="text-agro-700 block mb-1">Sustainability Coefficient C(a):</strong>
                   <span className="text-earth-800">C(a) = [x(rⁿ - 1)] / (r - 1) + 1</span>
                 </div>
                 <div>
                   <strong className="text-blue-700 block mb-1">Sustainable Time Constant m:</strong>
                   <span className="text-earth-800">m = √[((Dn × In) × C(a)) / S]</span>
                 </div>
               </div>

               <div className="space-y-2 text-sm text-earth-600">
                 <div className="flex justify-between border-b border-earth-100 pb-1">
                   <span><strong>Dn</strong>: Rainfall Duration</span>
                   <span><strong>In</strong>: Soil Moisture / Irrigation</span>
                 </div>
                 <div className="flex justify-between border-b border-earth-100 pb-1">
                   <span><strong>x</strong>: Base Ag. Maturity</span>
                   <span><strong>r</strong>: Adoption Growth Rate</span>
                 </div>
                 <div className="flex justify-between">
                   <span><strong>S</strong>: Crop Water Requirement</span>
                   <span><strong>m</strong>: Resilience Score</span>
                 </div>
               </div>
            </div>

            <div className="bg-agro-50 p-8 rounded-3xl border border-agro-100">
              <h3 className="text-2xl font-bold text-agro-900 mb-6 flex items-center gap-2">
                 <BookOpen className="text-agro-600" /> Case Study: Kenya
               </h3>
               <div className="space-y-6">
                 <div className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-lg shadow-sm text-agro-700 font-bold text-xl">0.375</div>
                    <div>
                      <h4 className="font-bold text-earth-900">Baseline Threshold</h4>
                      <p className="text-earth-600 text-sm">
                        With 8 months rain and 4 months dry season, Kenya's base C(a) is 0.375. This is the minimum to support continuous agriculture.
                      </p>
                    </div>
                 </div>

                 <div className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-lg shadow-sm text-blue-600 font-bold text-xl">9.7+</div>
                    <div>
                      <h4 className="font-bold text-earth-900">High Sustainability Target</h4>
                      <p className="text-earth-600 text-sm">
                        By increasing adoption (x=4) and technology, the Time Constant (m) rises to over 9.7, signifying extreme resilience against drought shocks.
                      </p>
                    </div>
                 </div>

                 <div className="mt-6 pt-6 border-t border-agro-200">
                   <p className="text-agro-800 italic text-sm">
                     "Nature establishes the boundaries; agriculture must adapt within these limits to ensure sustainability."
                   </p>
                 </div>
               </div>
            </div>
          </div>

          {/* Applications Grid */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-agro-900 mb-8">Practical Applications</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               {APPLICATIONS.map((app, idx) => (
                 <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-earth-100 hover:border-agro-200 transition-all">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-earth-100 p-2 rounded-lg text-agro-700">
                        {app.icon}
                      </div>
                      <h4 className="font-bold text-earth-900">{app.title}</h4>
                    </div>
                    <p className="text-earth-600 text-sm leading-relaxed">
                      {app.content}
                    </p>
                 </div>
               ))}
            </div>
          </div>

        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            
            {/* Simulation Controls */}
            <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-earth-200 h-fit">
               <div className="flex items-center gap-2 mb-6">
                 <Settings className="text-earth-400" />
                 <h3 className="text-xl font-bold text-earth-900">Model Parameters</h3>
               </div>
               
               <div className="space-y-8">
                 <div>
                   <div className="flex justify-between mb-2">
                     <label className="font-semibold text-earth-700 text-sm">Base Sustainability (x)</label>
                     <span className="text-agro-600 font-bold">{params.x}</span>
                   </div>
                   <input 
                      type="range" min="1" max="5" step="0.1"
                      value={params.x}
                      onChange={(e) => setParams({...params, x: parseFloat(e.target.value)})}
                      className="w-full accent-agro-600 h-2 bg-earth-200 rounded-lg appearance-none cursor-pointer"
                   />
                   <p className="text-xs text-earth-500 mt-1">1 = Low Tech, 5 = Advanced Tech</p>
                 </div>

                 <div>
                   <div className="flex justify-between mb-2">
                     <label className="font-semibold text-earth-700 text-sm">Adoption Growth (r)</label>
                     <span className="text-agro-600 font-bold">{Math.round((params.r - 1) * 100)}% / yr</span>
                   </div>
                   <input 
                      type="range" min="1.0" max="1.3" step="0.01"
                      value={params.r}
                      onChange={(e) => setParams({...params, r: parseFloat(e.target.value)})}
                      className="w-full accent-agro-600 h-2 bg-earth-200 rounded-lg appearance-none cursor-pointer"
                   />
                   <p className="text-xs text-earth-500 mt-1">Rate of new tech adoption</p>
                 </div>

                 <div>
                   <div className="flex justify-between mb-2">
                     <label className="font-semibold text-earth-700 text-sm">Avg Rainfall (Dn)</label>
                     <span className="text-blue-600 font-bold">{params.dn} mo</span>
                   </div>
                   <input 
                      type="range" min="4" max="12" step="0.5"
                      value={params.dn}
                      onChange={(e) => setParams({...params, dn: parseFloat(e.target.value)})}
                      className="w-full accent-blue-500 h-2 bg-earth-200 rounded-lg appearance-none cursor-pointer"
                   />
                   <p className="text-xs text-earth-500 mt-1">Months of effective rain</p>
                 </div>

                 <div className="pt-4 border-t border-earth-100">
                    <p className="text-xs text-earth-400 italic">
                      Note: Charts include randomized seasonal weather fluctuations.
                    </p>
                 </div>
               </div>
            </div>

            {/* Charts Section */}
            <div className="lg:col-span-2 space-y-6">
               
               {/* Main Chart: Time Constant & Rainfall */}
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-earth-200">
                 <h3 className="text-lg font-bold text-earth-900 mb-4 flex items-center gap-2">
                   <Activity size={18} className="text-agro-600" />
                   Sustainability Resilience (m) vs Rainfall
                 </h3>
                 <div className="h-[300px] w-full">
                   <ResponsiveContainer width="100%" height="100%">
                     <ComposedChart data={simulationData} margin={{top: 10, right: 10, left: 0, bottom: 0}}>
                       <defs>
                         <linearGradient id="colorM" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#16a34a" stopOpacity={0.2}/>
                           <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                         </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} />
                       <XAxis dataKey="year" fontSize={12} />
                       <YAxis yAxisId="left" orientation="left" stroke="#16a34a" fontSize={12} label={{ value: 'm(t)', angle: -90, position: 'insideLeft' }} />
                       <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" fontSize={12} label={{ value: 'Rain (mo)', angle: 90, position: 'insideRight' }} />
                       <Tooltip 
                          contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                       />
                       <Legend />
                       <Area yAxisId="left" type="monotone" dataKey="m" stroke="#16a34a" fillOpacity={1} fill="url(#colorM)" name="Time Constant m(t)" strokeWidth={3} />
                       <Line yAxisId="right" type="monotone" dataKey="rainfall" stroke="#3b82f6" name="Rainfall Dn(t)" strokeWidth={2} dot={{r: 4}} />
                     </ComposedChart>
                   </ResponsiveContainer>
                 </div>
               </div>

               {/* Secondary Chart: Adoption Growth */}
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-earth-200">
                 <h3 className="text-lg font-bold text-earth-900 mb-4 flex items-center gap-2">
                   <TrendingUp size={18} className="text-purple-600" />
                   Adoption Factor Growth x(t)
                 </h3>
                 <div className="h-[200px] w-full">
                   <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={simulationData} margin={{top: 10, right: 10, left: 0, bottom: 0}}>
                       <defs>
                         <linearGradient id="colorX" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#9333ea" stopOpacity={0.2}/>
                           <stop offset="95%" stopColor="#9333ea" stopOpacity={0}/>
                         </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} />
                       <XAxis dataKey="year" fontSize={12} />
                       <YAxis fontSize={12} domain={['auto', 'auto']} />
                       <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                       <Area type="monotone" dataKey="adoption" stroke="#9333ea" fill="url(#colorX)" name="Adoption Level" strokeWidth={2} />
                     </AreaChart>
                   </ResponsiveContainer>
                 </div>
               </div>

            </div>
          </div>

          {/* Final Values Output */}
          <div className="grid md:grid-cols-2 gap-6">
             <div className="bg-gradient-to-br from-agro-600 to-agro-800 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center gap-2 mb-2 text-agro-200 uppercase tracking-wider text-xs font-bold">
                   <Activity size={14} /> Final Sustainable Time Constant
                </div>
                <div className="text-4xl font-serif font-bold mb-2">m = {finalValues?.m}</div>
                <p className="text-agro-100 text-sm leading-relaxed">
                   A value of <strong>{finalValues?.m}</strong> indicates the crop production system can survive {finalValues?.m} times the crop's required duration under current resource levels. Higher is better for resilience.
                </p>
             </div>

             <div className="bg-white rounded-2xl p-6 border border-earth-200 shadow-sm">
                <div className="flex items-center gap-2 mb-2 text-earth-500 uppercase tracking-wider text-xs font-bold">
                   <BarChart3 size={14} /> Final Sustainability Coefficient
                </div>
                <div className="text-4xl font-serif font-bold text-earth-900 mb-2">C(a) = {finalValues?.ca}</div>
                <p className="text-earth-600 text-sm leading-relaxed">
                   The Sustainability Coefficient represents the geometric accumulation of agricultural maturity. A score of <strong>{finalValues?.ca}</strong> shows significant system stability and reduced risk of failure.
                </p>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};