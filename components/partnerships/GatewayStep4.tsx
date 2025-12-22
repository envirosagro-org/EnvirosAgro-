import React from 'react';
import { CheckCircle2, Receipt, Download, Share2, CreditCard, Coins, Lock, Loader2, ArrowRight } from 'lucide-react';

interface GatewayStep4Props {
  paymentVerified: boolean;
  generatedInvoice: any;
  displayedFee: string;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  handlePayment: () => void;
  isPaying: boolean;
  onNext: () => void;
}

export const GatewayStep4: React.FC<GatewayStep4Props> = ({
  paymentVerified,
  generatedInvoice,
  displayedFee,
  paymentMethod,
  setPaymentMethod,
  handlePayment,
  isPaying,
  onNext,
}) => {
  return (
    <div className="space-y-12 animate-in slide-in-from-right-4 duration-500">
      <div className="text-center max-w-2xl mx-auto">
        <h4 className="text-3xl font-serif font-bold text-earth-900 dark:text-white mb-2">04. Automated Gateway Payment</h4>
        <p className="text-earth-500 dark:text-earth-400 font-medium">Verified payments trigger immediate issuance of organizational unique IDs.</p>
      </div>

      {paymentVerified ? (
        <div className="space-y-10">
          <div className="bg-green-50 dark:bg-green-950/20 border-2 border-green-500/30 p-10 rounded-[4rem] text-center animate-in zoom-in">
            <div className="w-20 h-20 bg-green-500 text-white rounded-[1.8rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/20">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-3xl font-serif font-bold text-green-900 dark:text-green-100 mb-2">Payment Confirmed</h3>
            <p className="text-green-700 dark:text-green-400 font-bold uppercase text-[10px] tracking-[0.3em]">Hashed to Global Ledger</p>
          </div>

          <div className="bg-white dark:bg-earth-800 p-10 rounded-[3.5rem] border border-earth-100 dark:border-earth-700 shadow-xl flex flex-col md:flex-row gap-12">
            <div className="flex-1">
              <h5 className="font-bold text-earth-900 dark:text-white mb-6 flex items-center gap-3">
                <Receipt size={20} className="text-blue-500" /> E-Invoice & Receipt
              </h5>
              <div className="space-y-4 font-mono text-xs text-earth-600 dark:text-earth-400 bg-earth-50 dark:bg-earth-900 p-8 rounded-2xl shadow-inner border border-black/5">
                <div className="flex justify-between border-b border-black/5 pb-2"><span>Invoice ID:</span> <span className="text-blue-600 font-bold">{generatedInvoice.id}</span></div>
                <div className="flex justify-between border-b border-black/5 pb-2"><span>Partner:</span> <span className="text-earth-900 dark:text-white font-bold">{generatedInvoice.partner}</span></div>
                <div className="flex justify-between border-b border-black/5 pb-2"><span>Date:</span> <span>{generatedInvoice.date}</span></div>
                <div className="flex justify-between pt-4 text-sm font-black text-earth-900 dark:text-white"><span>Total Paid:</span> <span className="text-agro-600">{generatedInvoice.amount}</span></div>
              </div>
            </div>
            <div className="w-full md:w-64 flex flex-col gap-3 justify-center">
              <button className="w-full bg-white dark:bg-earth-800 border-2 border-earth-100 dark:border-earth-700 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-earth-50 transition-all">
                <Download size={18} /> Download PDF
              </button>
              <button className="w-full bg-white dark:bg-earth-800 border-2 border-earth-100 dark:border-earth-700 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-earth-50 transition-all">
                <Share2 size={18} /> Share Receipt
              </button>
            </div>
          </div>

          <button
            onClick={onNext}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-6 rounded-[2rem] text-xs uppercase tracking-[0.4em] shadow-xl shadow-blue-600/20 active:scale-95 transition-all flex items-center justify-center gap-4"
          >
            Finalize ID Issuance <ArrowRight size={20} />
          </button>
        </div>
      ) : (
        <div className="max-w-md mx-auto bg-white dark:bg-earth-800 p-10 rounded-[4rem] border border-earth-100 dark:border-earth-700 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5"><CreditCard size={150} /></div>
          <div className="relative z-10">
            <h5 className="font-bold text-earth-900 dark:text-white mb-8 text-center uppercase tracking-widest text-sm">Checkout Node</h5>

            <div className="bg-earth-50 dark:bg-earth-900 p-6 rounded-2xl mb-8 border border-black/5 shadow-inner">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-black text-earth-400 uppercase tracking-widest">Service Fee</span>
                <span className="text-xl font-serif font-black text-agro-600">{displayedFee}</span>
              </div>
              <p className="text-[8px] font-bold text-earth-400 uppercase text-center tracking-widest">Approx. {displayedFee} (USD Equivalent)</p>
            </div>

            <div className="space-y-4 mb-10">
              <label className="text-[10px] font-black uppercase text-earth-400 tracking-widest px-1">Payment Method</label>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setPaymentMethod('Tokenz™')} className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${paymentMethod === 'Tokenz™' ? 'bg-amber-50 border-amber-400 text-amber-700' : 'border-earth-100 dark:border-earth-700 opacity-60'}`}>
                  <Coins size={24} />
                  <span className="text-[8px] font-black uppercase">Tokenz™</span>
                </button>
                <button onClick={() => setPaymentMethod('Visa/Credit')} className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${paymentMethod === 'Visa/Credit' ? 'bg-blue-50 border-blue-400 text-blue-700' : 'border-earth-100 dark:border-earth-700 opacity-60'}`}>
                  <CreditCard size={24} />
                  <span className="text-[8px] font-black uppercase">Credit Card</span>
                </button>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={isPaying}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl text-[10px] uppercase tracking-[0.4em] shadow-xl shadow-blue-600/20 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isPaying ? <><Loader2 size={18} className="animate-spin" /> Verifying Bank Node...</> : <><Lock size={18} /> Authorize Transaction</>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
