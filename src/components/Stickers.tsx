import React from 'react';

// Frayed denim heart with white running stitch (as in Image 3 & 2)
export function DenimHeart({ size = 70, className = '' }: { size?: number; className?: string }) {
  return (
    <div 
      className={`relative select-none inline-block filter drop-shadow-md hover:scale-105 transition-transform ${className}`}
      style={{ width: size, height: size * 0.9 }}
    >
      <svg viewBox="0 0 100 90" className="w-full h-full">
        <defs>
          <pattern id="denimTwill" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="6" stroke="#5d8bbb" strokeWidth="1.6" />
            <line x1="3" y1="0" x2="3" y2="6" stroke="#25436c" strokeWidth="2.2" />
          </pattern>
          <filter id="fringe">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        {/* Outer frayed denim edge */}
        <path
          d="M 50,85 C 20,60 0,38 0,22 C 0,8 12,0 26,0 C 37,0 46,7 50,15 C 54,7 63,0 74,0 C 88,0 100,8 100,22 C 100,38 80,60 50,85 Z"
          fill="#31527e"
          filter="url(#fringe)"
          opacity="0.9"
        />
        {/* Inner denim body */}
        <path
          d="M 50,83 C 21,59 2,37 2,22 C 2,9 13,2 26,2 C 37,2 45,8 50,16 C 55,8 63,2 74,2 C 87,2 98,9 98,22 C 98,37 79,59 50,83 Z"
          fill="url(#denimTwill)"
        />
        {/* White dashed top stitching */}
        <path
          d="M 50,77 C 24,55 8,36 8,23 C 8,13 16,7 26,7 C 35,7 43,12 50,20 C 57,12 65,7 74,7 C 84,7 92,13 92,23 C 92,36 76,55 50,77 Z"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.2"
          strokeDasharray="4 3"
          strokeLinecap="round"
          className="filter drop-shadow-sm"
        />
      </svg>
    </div>
  );
}

// Lilac felt heart with white running stitch (as in Image 2)
export function LilacHeart({ size = 50, className = '' }: { size?: number; className?: string }) {
  return (
    <div 
      className={`relative select-none inline-block filter drop-shadow-md hover:scale-105 transition-transform ${className}`}
      style={{ width: size, height: size * 0.9 }}
    >
      <svg viewBox="0 0 100 90" className="w-full h-full">
        <path
          d="M 50,85 C 20,60 0,38 0,22 C 0,8 12,0 26,0 C 37,0 46,7 50,15 C 54,7 63,0 74,0 C 88,0 100,8 100,22 C 100,38 80,60 50,85 Z"
          fill="#c09fdc"
        />
        {/* Inner white dashed running stitch */}
        <path
          d="M 50,77 C 24,55 8,36 8,23 C 8,13 16,7 26,7 C 35,7 43,12 50,20 C 57,12 65,7 74,7 C 84,7 92,13 92,23 C 92,36 76,55 50,77 Z"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeDasharray="4 3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

// Baby blue felt cloud with white running stitch (as in Image 2)
export function BlueCloud({ size = 70, className = '' }: { size?: number; className?: string }) {
  return (
    <div 
      className={`relative select-none inline-block filter drop-shadow-md hover:scale-105 transition-transform ${className}`}
      style={{ width: size, height: size * 0.6 }}
    >
      <svg viewBox="0 0 120 75" className="w-full h-full">
        {/* Cloud background */}
        <path
          d="M 28,62 C 12,62 0,52 0,38 C 0,25 10,15 23,15 C 26,6 36,0 48,0 C 62,0 74,8 77,20 C 83,16 91,16 98,21 C 107,21 120,29 120,43 C 120,57 108,62 96,62 Z"
          fill="#bce1fb"
        />
        {/* White running dashed stitch */}
        <path
          d="M 28,56 C 16,56 6,48 6,38 C 6,28 14,20 25,20 C 29,12 38,6 48,6 C 60,6 70,13 73,23 C 80,20 88,20 95,24 C 103,24 114,31 114,43 C 114,54 104,56 94,56 Z"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeDasharray="4 3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

// 4-Pointed doodle sparkle star sticker (as in Image 2)
export function WhiteSparkle({ size = 48, className = '' }: { size?: number; className?: string }) {
  return (
    <div 
      className={`relative select-none inline-block filter drop-shadow-md hover:rotate-12 transition-transform ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path
          d="M 50,0 C 50,32 58,42 98,50 C 58,58 50,68 50,100 C 50,68 42,58 2,50 C 42,42 50,32 50,0 Z"
          fill="#ffffff"
          stroke="#1e293b"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// 8-Pointed doodle burst star (as in Image 3)
export function EightPointBurst({ size = 52, className = '' }: { size?: number; className?: string }) {
  return (
    <div 
      className={`relative select-none inline-block filter drop-shadow-md hover:rotate-45 transition-transform ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path
          d="M 50,2 L 61,33 L 95,21 L 76,50 L 98,75 L 65,71 L 52,98 L 39,71 L 5,79 L 24,50 L 2,23 L 36,33 Z"
          fill="#ffffff"
          stroke="#1e293b"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// Pastel purple 5-petal flower sticker (as in Image 3)
export function PurpleFlower({ size = 46, className = '' }: { size?: number; className?: string }) {
  return (
    <div 
      className={`relative select-none inline-block filter drop-shadow-md hover:scale-110 transition-transform ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <g fill="#c094e6">
          <circle cx="50" cy="24" r="20" />
          <circle cx="75" cy="42" r="20" />
          <circle cx="65" cy="73" r="20" />
          <circle cx="35" cy="73" r="20" />
          <circle cx="25" cy="42" r="20" />
        </g>
        <circle cx="50" cy="50" r="14" fill="#a472d1" />
      </svg>
    </div>
  );
}

// Doodle loop squiggle tape / ribbon (as in Image 3)
export function DoodleRibbonTape({ size = 50, className = '' }: { size?: number; className?: string }) {
  return (
    <div 
      className={`relative select-none inline-block filter drop-shadow-sm ${className}`}
      style={{ width: size * 1.3, height: size }}
    >
      <svg viewBox="0 0 120 90" className="w-full h-full">
        {/* White background silhouette */}
        <path
          d="M 15,65 C 20,40 30,20 45,20 C 60,20 65,50 80,50 C 95,50 105,30 95,20 C 85,10 75,25 75,45 C 75,65 95,75 110,60"
          fill="none"
          stroke="#ffffff"
          strokeWidth="18"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Black marker center line */}
        <path
          d="M 15,65 C 20,40 30,20 45,20 C 60,20 65,50 80,50 C 95,50 105,30 95,20 C 85,10 75,25 75,45 C 75,65 95,75 110,60"
          fill="none"
          stroke="#1e293b"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// Yellow curly streamer ribbon (as in Image 1)
export function YellowCurlyRibbon({ size = 44, className = '' }: { size?: number; className?: string }) {
  return (
    <div 
      className={`relative select-none inline-block filter drop-shadow-md ${className}`}
      style={{ width: size * 0.8, height: size * 1.8 }}
    >
      <svg viewBox="0 0 80 180" className="w-full h-full">
        <path
          d="M 40,5 C 80,30 75,70 30,65 C -10,60 -5,110 50,110 C 90,110 70,165 25,175"
          fill="none"
          stroke="#ffd214"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// Frilly piped vintage heart cake (as in Image 1)
export function FrillyHeartCake({ size = 70, className = '' }: { size?: number; className?: string }) {
  return (
    <div 
      className={`relative select-none inline-block filter drop-shadow-lg hover:scale-105 transition-transform ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src="/src/assets/images/frilly_heart_cake_1790319044352.jpg"
        alt="Frilly Heart Cake"
        className="w-full h-full object-cover rounded-2xl filter drop-shadow-md border-2 border-white/60"
        onError={(e) => {
          // If image fails, replace with SVG cake
          e.currentTarget.style.display = 'none';
        }}
      />
    </div>
  );
}

// Doodle "!!" exclamation badge (as in Image 2)
export function DoodleExclamation({ size = 38, className = '' }: { size?: number; className?: string }) {
  return (
    <div 
      className={`relative select-none inline-block filter drop-shadow-md bg-white rounded-md p-1 border-2 border-slate-900 ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="flex items-center justify-center h-full gap-0.5 font-bubble text-slate-900 font-extrabold text-xl leading-none">
        <span>!</span>
        <span>!</span>
      </div>
    </div>
  );
}

// Realistic metallic paperclip overlay (as in Image 3)
export function MetalPaperclip({ 
  color = 'silver', 
  size = 54, 
  className = '' 
}: { 
  color?: 'silver' | 'gold' | 'pink' | 'cyan'; 
  size?: number; 
  className?: string 
}) {
  const strokeColor = color === 'gold' 
    ? '#e5b839' 
    : color === 'pink' 
    ? '#ff76b0' 
    : color === 'cyan'
    ? '#38bdf8'
    : '#d4d8e0';

  return (
    <div 
      className={`relative select-none inline-block filter drop-shadow-md pointer-events-none z-20 ${className}`}
      style={{ width: size * 0.42, height: size }}
    >
      <svg viewBox="0 0 45 100" className="w-full h-full">
        {/* Shadow */}
        <path
          d="M 12,90 L 12,30 C 12,14 34,14 34,30 L 34,80 C 34,88 20,88 20,80 L 20,38 C 20,32 26,32 26,38 L 26,72"
          fill="none"
          stroke="rgba(0, 0, 0, 0.35)"
          strokeWidth="4"
          strokeLinecap="round"
          transform="translate(1.5, 2)"
        />
        {/* Main clip */}
        <path
          d="M 12,90 L 12,30 C 12,14 34,14 34,30 L 34,80 C 34,88 20,88 20,80 L 20,38 C 20,32 26,32 26,38 L 26,72"
          fill="none"
          stroke={strokeColor}
          strokeWidth="4.2"
          strokeLinecap="round"
        />
        {/* Metallic Highlight */}
        <path
          d="M 12,85 L 12,32 C 12,18 32,18 32,32 L 32,75"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.8"
        />
      </svg>
    </div>
  );
}

// Master sticker dispatcher
export function StickerItem({ sticker }: { sticker: { type: string; size?: number; className?: string } }) {
  switch (sticker.type) {
    case 'denim-heart':
      return <DenimHeart size={sticker.size || 60} className={sticker.className} />;
    case 'lilac-heart':
      return <LilacHeart size={sticker.size || 50} className={sticker.className} />;
    case 'blue-cloud':
      return <BlueCloud size={sticker.size || 65} className={sticker.className} />;
    case 'white-sparkle':
      return <WhiteSparkle size={sticker.size || 45} className={sticker.className} />;
    case 'star-burst':
      return <EightPointBurst size={sticker.size || 50} className={sticker.className} />;
    case 'purple-flower':
      return <PurpleFlower size={sticker.size || 42} className={sticker.className} />;
    case 'doodle-ribbon':
      return <DoodleRibbonTape size={sticker.size || 50} className={sticker.className} />;
    case 'yellow-curly':
      return <YellowCurlyRibbon size={sticker.size || 40} className={sticker.className} />;
    case 'heart-cake':
      return <FrillyHeartCake size={sticker.size || 60} className={sticker.className} />;
    case 'doodle-exclamation':
      return <DoodleExclamation size={sticker.size || 36} className={sticker.className} />;
    default:
      return null;
  }
}
