import React from 'react';
import { Copyright, FileText, AlertCircle, Scale } from 'lucide-react';

const TRADEMARKS = [
  {
    term: "EnvirosAgro™",
    status: "Registered",
    description: "The official name of the organization and the comprehensive network linking farmers, researchers, and stakeholders."
  },
  {
    term: "Sustainability Coefficient C(a)™",
    status: "Pending",
    description: "The proprietary mathematical metric used to quantify and standardize the sustainability level of agricultural systems."
  },
  {
    term: "Sustainable Time Constant m(t)™",
    status: "Pending",
    description: "The predictive time-series metric derived from natural variables to assess agricultural resilience over time."
  },
  {
    term: "Five Thrusts Framework™",
    status: "Registered",
    description: "The structural model organizing agricultural development into Social, Environmental, Health, Technical, and Industrial domains."
  }
];

export const Trademarks: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="border-b border-earth-200 pb-8 mb-10">
        <h2 className="text-3xl font-bold text-agro-900 flex items-center gap-3 mb-4">
          <Scale className="text-agro-600" /> Intellectual Property & Trademarks
        </h2>
        <p className="text-earth-600">
          Guidelines regarding the use of EnvirosAgro's trademarks, service marks, and proprietary technologies.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 flex gap-4 mb-10">
         <AlertCircle className="text-amber-600 shrink-0" />
         <div>
           <h4 className="font-bold text-amber-800 mb-1">Usage Guidelines</h4>
           <p className="text-sm text-amber-700 leading-relaxed">
             The trademarks listed below are the property of EnvirosAgro. Use of these marks without express written permission is prohibited. When authorized, use must comply with our brand guidelines to ensure consistency and legal protection.
           </p>
         </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-earth-100 overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-earth-50 text-xs font-bold text-earth-500 uppercase tracking-wider border-b border-earth-200">
                <tr>
                  <th className="p-6">Trademark / Term</th>
                  <th className="p-6">Status</th>
                  <th className="p-6">Scope & Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-earth-100">
                {TRADEMARKS.map((item, idx) => (
                  <tr key={idx} className="hover:bg-earth-50 transition-colors">
                    <td className="p-6 align-top">
                      <span className="font-bold text-agro-900 text-lg">{item.term}</span>
                    </td>
                    <td className="p-6 align-top">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        item.status === 'Registered' 
                        ? 'bg-green-100 text-green-700 border border-green-200' 
                        : 'bg-blue-100 text-blue-700 border border-blue-200'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-6 text-earth-600 text-sm leading-relaxed align-top">
                      {item.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
         </div>
      </div>

      <div className="mt-12 text-sm text-earth-500 flex flex-col gap-4">
         <p className="flex items-start gap-2">
            <Copyright size={16} className="mt-0.5" />
            <span>
              Copyright {new Date().getFullYear()} EnvirosAgro. All rights reserved. All other trademarks are the property of their respective owners.
            </span>
         </p>
         <p className="flex items-start gap-2">
            <FileText size={16} className="mt-0.5" />
            <span>
              For inquiries regarding licensing or usage permission, please contact our legal department at <a href="mailto:envirosagro.com@gmail.com" className="text-agro-600 hover:underline">envirosagro.com@gmail.com</a>.
            </span>
         </p>
      </div>
    </div>
  );
};