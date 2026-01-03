import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, Clock, XCircle, RefreshCw } from 'lucide-react';

const STATUS_ICON = {
    COMPLETED: <CheckCircle className="text-green-500" />,
    PENDING: <Clock className="text-yellow-500" />,
    FAILED: <XCircle className="text-red-500" />,
    PROCESSING: <RefreshCw className="text-blue-500 animate-spin" />
};

const TRANSACTION_TYPE_STYLES = {
    DEPOSIT: 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300',
    PURCHASE: 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300',
    SALE: 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300',
    WITHDRAWAL: 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300',
};

interface Transaction {
    id: string;
    date: string;
    description: string;
    amount: number;
    type: keyof typeof TRANSACTION_TYPE_STYLES;
    status: keyof typeof STATUS_ICON;
}

interface TransactionHistoryProps {
    transactions: Transaction[];
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const transactionsPerPage = 5;

    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

    const totalPages = Math.ceil(transactions.length / transactionsPerPage);

    return (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Transaction History</h3>
            
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">
                        <tr>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="px-6 py-3">Description</th>
                            <th scope="col" className="px-6 py-3">Type</th>
                            <th scope="col" className="px-6 py-3 text-right">Amount (EAC)</th>
                            <th scope="col" className="px-6 py-3 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTransactions.map((tx) => (
                            <tr key={tx.id} className="dark:hover:bg-gray-800/50">
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-600 dark:text-gray-300">{new Date(tx.date).toLocaleDateString()}</td>
                                <td className="px-6 py-4 font-bold text-gray-800 dark:text-gray-100">{tx.description}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${TRANSACTION_TYPE_STYLES[tx.type]}`}>
                                        {tx.type}
                                    </span>
                                </td>
                                <td className={`px-6 py-4 text-right font-mono font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 flex justify-center items-center">
                                    {STATUS_ICON[tx.status]}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-sm">
                    <button 
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
                    >
                        <ArrowLeft size={16} /> Previous
                    </button>
                    <span className="font-bold">Page {currentPage} of {totalPages}</span>
                    <button 
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
                    >
                        Next <ArrowRight size={16} />
                    </button>
                </div>
            )}
        </div>
    );
};