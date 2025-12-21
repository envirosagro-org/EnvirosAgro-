import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  color?: string;
  variant?: 'ea' | 'wordmark' | 'full' | 'horizontal';
  useGradient?: boolean;
}

/**
 * EnvirosAgro Advanced Brand Identity System
 * 
 * Evolution 3.1: 
 * - Enhanced glyph spacing for high-density displays.
 * - Refined weight distribution for the EA monogram.
 * - Optimized horizontal lockup for fixed headers.
 */
export const Logo: React.FC<LogoProps> = ({ 
  className = "", 
  size = 60, 
  color = "currentColor",
  variant = 'full',
  useGradient = false
}) => {
  const uniqueId = React.useId().replace(/:/g, '');
  const fillSource = useGradient ? `url(#grad-${uniqueId})` : color;

  const getViewBox = () => {
    switch(variant) {
      case 'ea': return "0 0 400 400";
      case 'wordmark': return "0 0 1100 200";
      case 'horizontal': return "0 0 1400 250";
      default: return "0 0 1000 750";
    }
  };

  const getWidth = () => {
    if (variant === 'wordmark') return size * 5.5;
    if (variant === 'horizontal') return size * 5.6;
    if (variant === 'full') return size * 1.33;
    return size;
  };

  // Advanced Geometric Wordmark: "EnvirosAgro"
  const WordmarkPaths = (
    <g className="brand-wordmark-refined" style={{ pointerEvents: 'none' }}>
      {/* E - Uppercase */}
      <path d="M10 40H95V68H40V86H85V112H40V132H95V160H10V40Z" />
      
      {/* n - Lowercase */}
      <path d="M110 75H180V160H152V105L138 105V160H110V75Z" />
      
      {/* v - Lowercase */}
      <path d="M195 75H224L240 120L256 75H285L255 160H225L195 75Z" />
      
      {/* i - Lowercase */}
      <path d="M300 75H328V160H300V75Z M300 42H328V64H300V42Z" />
      
      {/* r - Lowercase */}
      <path d="M345 75H405V102H373V160H345V75Z" />
      
      {/* o - Lowercase */}
      <path fillRule="evenodd" d="M420 75H485L505 95V140L485 160H420L400 140V95L420 75ZM428 132H477V103H428V132Z" />
      
      {/* s - Lowercase */}
      <path d="M520 75H595V98H548V110H595V160H520V137H567V125H520V75Z" />
      
      {/* A - Uppercase */}
      <path fillRule="evenodd" d="M635 40H690L715 160H686L680 130H645L639 160H610L635 40ZM650 105H675L662 62L650 105Z" />
      
      {/* g - Lowercase */}
      <path fillRule="evenodd" d="M725 75H795V155L775 180H725V155H767V142H725V75ZM753 118H767V100H753V118Z" />
      
      {/* r - Lowercase */}
      <path d="M810 75H870V102H838V160H810V75Z" />
      
      {/* o - Lowercase */}
      <path fillRule="evenodd" d="M885 75H950L970 95V140L950 160H885L865 140V95L885 75ZM893 132H942V103H893V132Z" />
    </g>
  );

  const MonogramEA = (
    <g className="brand-hero-monogram" style={{ pointerEvents: 'none' }}>
      <path d="M20 20H170L190 40V125L170 145H65V162H170V228H65V245H170L190 265V330L170 350H20V20Z" />
      <path d="M230 350L285 20H345L400 350H350L340 280H290L280 350H230ZM295 235H335L315 100L295 235Z" />
    </g>
  );

  return (
    <div className={`inline-flex items-center justify-center select-none ${className}`} style={{ height: size }}>
      <svg 
        viewBox={getViewBox()} 
        width={getWidth()} 
        height={size} 
        fill={fillSource} 
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-500 ease-in-out hover:scale-[1.02]"
        role="img"
        aria-label="EnvirosAgro Logo"
      >
        <defs>
          <linearGradient id={`grad-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#15803d" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>
        </defs>

        {variant === 'ea' && MonogramEA}
        
        {variant === 'wordmark' && (
           <g transform="translate(20, 10) scale(0.95)">
             {WordmarkPaths}
           </g>
        )}

        {variant === 'full' && (
          <>
            <g transform="translate(285, 30) scale(1.05)">
              {MonogramEA}
            </g>
            <g transform="translate(0, 520) scale(0.88)">
              {WordmarkPaths}
            </g>
          </>
        )}

        {variant === 'horizontal' && (
          <>
            <g transform="translate(10, 25) scale(0.55)">
              {MonogramEA}
            </g>
            <g transform="translate(260, 48) scale(0.95)">
              {WordmarkPaths}
            </g>
          </>
        )}
      </svg>
    </div>
  );
};
