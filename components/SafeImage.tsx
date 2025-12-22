import React, { useState } from 'react';
import { ImageOff, Loader2 } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({ 
  src, 
  alt, 
  className = "", 
  containerClassName = "", 
  loading = "lazy",
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-earth-100/50 dark:bg-earth-900/50 ${containerClassName}`}>
      {/* Loading Skeleton */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 animate-pulse flex items-center justify-center">
          <div className="w-full h-full bg-earth-200 dark:bg-earth-800 opacity-20"></div>
          <Loader2 className="absolute text-earth-300 dark:text-earth-600 animate-spin" size={24} />
        </div>
      )}
      
      {/* Error Fallback */}
      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-earth-400 dark:text-earth-600 p-4 text-center bg-earth-50 dark:bg-earth-950">
          <ImageOff size={24} className="mb-2 opacity-50" />
          <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Content Unavailable</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={loading}
          onLoad={() => setIsLoaded(true)}
          onError={() => setError(true)}
          className={`${className} transition-opacity duration-700 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          {...props}
        />
      )}
    </div>
  );
};