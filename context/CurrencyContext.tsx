import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

// Define the shape of the currency context state
interface CurrencyContextType {
  currentCurrency: string;
  setCurrency: (currencyCode: string) => void;
  convertPrice: (priceInUsd: number) => number;
  conversionRates: Record<string, number>;
}

// Create the context with a default undefined value
const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Define default conversion rates (USD as base)
const DEFAULT_CONVERSION_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 154.67,
  CAD: 1.37,
  AUD: 1.54,
  CNY: 7.23,
  INR: 83.47,
  BRL: 5.14,
  ZAR: 18.77,
};

// CurrencyProvider component
interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  const [currentCurrency, setCurrentCurrency] = useState<string>('USD');
  const [conversionRates, setConversionRates] = useState<Record<string, number>>(DEFAULT_CONVERSION_RATES);

  // Function to update the current currency
  const setCurrency = useCallback((currencyCode: string) => {
    if (conversionRates[currencyCode]) {
      setCurrentCurrency(currencyCode);
    } else {
      console.warn(`Currency code ${currencyCode} not found in conversion rates.`);
      // Optionally fall back to a default or USD
      setCurrentCurrency('USD');
    }
  }, [conversionRates]);

  // Function to convert a price from USD to the current currency
  const convertPrice = useCallback((priceInUsd: number): number => {
    const rate = conversionRates[currentCurrency];
    if (rate) {
      return priceInUsd * rate;
    }
    console.warn(`Conversion rate for ${currentCurrency} not found. Returning price in USD.`);
    return priceInUsd;
  }, [currentCurrency, conversionRates]);

  // The value that will be supplied to any consumers of the context
  const value = {
    currentCurrency,
    setCurrency,
    convertPrice,
    conversionRates,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

// Custom hook to use the CurrencyContext
export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};