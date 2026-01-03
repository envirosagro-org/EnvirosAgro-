
import { TrendingUp, Activity, ShieldCheck, Zap } from 'lucide-react';

export const FINANCIAL_PRODUCTS = [
  {
    id: 'impact-investing',
    title: 'Impact Investing',
    icon: <TrendingUp />,
    border: 'border-green-200',
    bg: 'bg-green-50',
    text: 'text-green-800',
    products: [
      { name: 'Green Bonds', desc: 'Finance eco-friendly projects.', rate: '3.5% APY' },
      { name: 'Micro-loans', desc: 'Support smallholder farmers.', rate: '5% APY' },
    ],
  },
  {
    id: 'carbon-credits',
    title: 'Carbon Credits',
    icon: <Activity />,
    border: 'border-blue-200',
    bg: 'bg-blue-50',
    text: 'text-blue-800',
    products: [
      { name: 'Buy Credits', desc: 'Offset your carbon footprint.', rate: '$25/ton' },
      { name: 'Sell Credits', desc: 'Monetize your carbon savings.', rate: 'Market' },
    ],
  },
];

export const TRANSACTIONS = [
    {
        id: "1",
        date: "2024-07-29",
        description: "Initial EAC Deposit",
        amount: 500,
        type: "DEPOSIT",
        status: "COMPLETED"
    },
    {
        id: "2",
        date: "2024-07-28",
        description: "Purchase: Green Bond Series A",
        amount: -250,
        type: "PURCHASE",
        status: "COMPLETED"
    },
    {
        id: "3",
        date: "2024-07-27",
        description: "Carbon Credit Sale (0.5T)",
        amount: 12.5,
        type: "SALE",
        status: "COMPLETED"
    }
];
