import React from 'react';

export type BirthdayFontStyle = 'dynapuff' | 'titan' | 'luckiest' | 'chewy' | 'fredoka';

interface HappyBirthdayBannerProps {
  className?: string;
  fontFamily?: BirthdayFontStyle;
}

interface LetterInfo {
  char: string;
  rotate: string;
  offset: string;
  delay: string;
}

const happyLetters: LetterInfo[] = [
  { char: 'H', rotate: '-rotate-4', offset: '-translate-y-1', delay: '0ms' },
  { char: 'A', rotate: '-rotate-2', offset: 'translate-y-0.5', delay: '40ms' },
  { char: 'P', rotate: 'rotate-3', offset: '-translate-y-1', delay: '80ms' },
  { char: 'P', rotate: 'rotate-5', offset: 'translate-y-0.5', delay: '120ms' },
  { char: 'Y', rotate: 'rotate-8', offset: '-translate-y-0.5', delay: '160ms' },
];

const birthdayLetters: LetterInfo[] = [
  { char: 'B', rotate: '-rotate-6', offset: '-translate-y-1', delay: '0ms' },
  { char: 'I', rotate: '-rotate-3', offset: 'translate-y-0.5', delay: '30ms' },
  { char: 'R', rotate: '-rotate-1', offset: '-translate-y-0.5', delay: '60ms' },
  { char: 'T', rotate: 'rotate-0', offset: 'translate-y-1', delay: '90ms' },
  { char: 'H', rotate: 'rotate-2', offset: '-translate-y-0.5', delay: '120ms' },
  { char: 'D', rotate: 'rotate-4', offset: 'translate-y-0.5', delay: '150ms' },
  { char: 'A', rotate: 'rotate-6', offset: '-translate-y-1', delay: '180ms' },
  { char: 'Y', rotate: 'rotate-8', offset: 'translate-y-0.5', delay: '210ms' },
  { char: '!', rotate: 'rotate-12', offset: '-translate-y-1.5', delay: '240ms' },
];

export function HappyBirthdayBanner({ 
  className = '', 
  fontFamily = 'dynapuff' 
}: HappyBirthdayBannerProps) {

  // Font family selector class
  const getFontClass = () => {
    switch (fontFamily) {
      case 'titan':
        return "font-['Titan_One',_cursive]";
      case 'luckiest':
        return "font-['Luckiest_Guy',_cursive]";
      case 'chewy':
        return "font-['Chewy',_cursive]";
      case 'fredoka':
        return "font-['Fredoka',_sans-serif]";
      case 'dynapuff':
      default:
        return "font-['DynaPuff',_cursive]";
    }
  };

  const fontClass = getFontClass();

  return (
    <div 
      className={`relative w-full max-w-2xl mx-auto flex flex-col items-center justify-center select-none py-1 ${className}`}
      role="heading" 
      aria-level={1}
      aria-label="HAPPY BIRTHDAY!"
    >
      {/* Line 1: HAPPY */}
      <div className="flex items-center justify-center gap-1 sm:gap-2 leading-none">
        {happyLetters.map((l, i) => (
          <span
            key={`happy-${i}`}
            className={`bubbly-letter ${fontClass} text-5xl sm:text-7xl md:text-8xl ${l.rotate} ${l.offset} cursor-pointer transition-transform`}
            style={{ 
              transitionDelay: l.delay,
            }}
          >
            {l.char}
          </span>
        ))}
      </div>

      {/* Line 2: BIRTHDAY! */}
      <div className="flex items-center justify-center gap-0.5 sm:gap-1.5 leading-none mt-1 sm:mt-2">
        {birthdayLetters.map((l, i) => (
          <span
            key={`birthday-${i}`}
            className={`bubbly-letter ${fontClass} text-4xl sm:text-6xl md:text-7xl ${l.rotate} ${l.offset} cursor-pointer transition-transform ${
              l.char === '!' ? 'text-[#ff388e]' : ''
            }`}
            style={{ 
              transitionDelay: l.delay,
            }}
          >
            {l.char}
          </span>
        ))}
      </div>
    </div>
  );
}
