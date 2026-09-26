import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Camera, 
  X, 
  Settings, 
  Volume2, 
  VolumeX, 
  Music, 
  Video, 
  Check, 
  Sparkles,
  Heart
} from 'lucide-react';
import { sfx } from './utils/audio';
import { BlueEnvelope, GiftBoxDoodle, BalloonsDoodle } from './components/BlueEnvelope';
import { HappyBirthdayBanner, BirthdayFontStyle } from './components/HappyBirthdayBanner';
import { GiftsSlide } from './components/GiftsSlide';
import { MessagePolaroidSlide } from './components/MessagePolaroidSlide';
import { FlowersSlide } from './components/FlowersSlide';
import { CakeCollageSlide } from './components/CakeCollageSlide';
import { BackgroundMusic } from './components/BackgroundMusic';

interface ScrapbookData {
  recipientName: string;
  birthDate: string;
  envelopePhoto: string;
  spotifyLink: string;
  videoLink: string;
  photo1: string;
  caption1: string;
  photo2: string;
  caption2: string;
  photo3: string;
  caption3: string;
  birthdayFont?: BirthdayFontStyle;
  customMessage?: string;
  polaroidPhoto1?: string;
  polaroidPhoto2?: string;
  polaroidPhoto3?: string;
  polaroidPhoto4?: string;
  flowerPhrases?: string[];
  cakeHatsPhoto?: string;
  cakeClipPhoto?: string;
  cakeCamcorderPhoto?: string;
  cakeStripPhotos?: string[];
}

const defaultData: ScrapbookData = {
  recipientName: 'Olivia',
  birthDate: '04-14-05',
  envelopePhoto: '/src/assets/images/polaroid_candid_smile_1790319059352.jpg',
  spotifyLink: 'https://open.spotify.com',
  videoLink: 'https://youtube.com',
  photo1: '/src/assets/images/polaroid_candid_smile_1790319059352.jpg',
  caption1: 'one of my favorite memories ♡',
  photo2: '/src/assets/images/polaroid_birthday_friends_1790319071128.jpg',
  caption2: 'this one makes me smile',
  photo3: '/src/assets/images/frilly_heart_cake_1790319044352.jpg',
  caption3: 'us ♡',
  birthdayFont: 'dynapuff',
  customMessage: `Happy birthday! Wishing you a day filled with laughter, good vibes, and all the little things that make you genuinely happy. You deserve to feel appreciated & celebrated—not just today, but every day. May this year bring you new memories, fun adventures, and endless reasons to smile. Always remember that you are deeply loved! ♡`,
  polaroidPhoto1: '/src/assets/images/couple_hats_1790359739368.jpg',
  polaroidPhoto2: '/src/assets/images/couple_flower_1790359751908.jpg',
  polaroidPhoto3: '/src/assets/images/polaroid_candid_smile_1790319059352.jpg',
  polaroidPhoto4: '/src/assets/images/couple_selfie_1790359764568.jpg',
  flowerPhrases: [
    'Thank You For Loving Me',
    "I'm Happiest When It's You",
    'with you everything feels right',
    'to infinity & forever ♡',
    'I Love You So Much',
    'You feel like a home to me',
    'loving you is my favorite thing',
    'my heart chose you',
  ],
  cakeHatsPhoto: '/src/assets/images/couple_hats_1790359739368.jpg',
  cakeClipPhoto: '/src/assets/images/couple_peace_pose_1790361449273.jpg',
  cakeCamcorderPhoto: '/src/assets/images/polaroid_candid_smile_1790319059352.jpg',
  cakeStripPhotos: [
    '/src/assets/images/couple_night_walk_1790361515816.jpg',
    '/src/assets/images/couple_flower_1790359751908.jpg',
    '/src/assets/images/frilly_heart_cake_1790319044352.jpg',
    '/src/assets/images/couple_selfie_1790359764568.jpg',
  ],
};

export default function App() {
  const [data, setData] = useState<ScrapbookData>(() => {
    try {
      const saved = localStorage.getItem('birthday_scrapbook_data');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return defaultData;
  });

  // PPT Slide index: 
  // 0: Cover (Blue Envelope with Wax Seal)
  // 1: Photo Reveal ("Happy Birthday [Name]!" matching Image 2)
  // 2: "These are for you" (Message, Flower, Cake gifts slide)
  // 3: "Letter & Polaroid Gallery" (Open Blue Envelope with Scalloped Lace + 4 Polaroids matching Image)
  // 4: "Flowers For You, My Sweetheart" (Vintage Cutout Hands + Bouquet + 8 Romantic Speech Bubbles)
  // 5: "Cake Music & Photostrip Collage" (Gingham Paper + Cameo Frame + Clip Polaroid + Spinning Vinyl + Camcorder + Photostrip)
  // 6: Scrapbook Spread 1 (Pages 01 & 02)
  // 7: Scrapbook Spread 2 (Pages 03 & 04)
  // 8: Scrapbook Spread 3 (Pages 05 & 06)
  // 9: End Card (Playlist & Video)
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 10;

  const [soundEnabled, setSoundEnabled] = useState(sfx.isEnabled());
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activePhotoUpload, setActivePhotoUpload] = useState<'photo1' | 'photo2' | 'photo3' | 'envelopePhoto' | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const startXRef = useRef(0);
  const startYRef = useRef(0);

  // Persist data
  useEffect(() => {
    try {
      localStorage.setItem('birthday_scrapbook_data', JSON.stringify(data));
    } catch {
      // ignore
    }
  }, [data]);

  const goToSlide = (slideIndex: number) => {
    const next = Math.max(0, Math.min(slideIndex, totalSlides - 1));
    if (next !== currentSlide) {
      sfx.playPageFlip();
    }
    setCurrentSlide(next);

    // Burst confetti ONLY when entering page 2 (slide index 1)
    if (next === 1) {
      confetti({
        particleCount: 65,
        spread: 75,
        origin: { y: 0.65 },
        colors: ['#ff72ba', '#ffe000', '#075b93', '#c98ee9', '#ffffff'],
      });
    }
  };

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      goToSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  };

  // Keyboard navigation for presentation mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isEditModalOpen) return;
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Home') {
        goToSlide(0);
      } else if (e.key === 'End') {
        goToSlide(totalSlides - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, isEditModalOpen]);

  // Touch swipe gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.changedTouches[0];
    startXRef.current = t.clientX;
    startYRef.current = t.clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const t = e.changedTouches[0];
    const dx = t.clientX - startXRef.current;
    const dy = t.clientY - startYRef.current;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) nextSlide();
      else prevSlide();
    }
  };

  const toggleSound = () => {
    const res = sfx.toggleSound();
    setSoundEnabled(res);
  };

  const handleTriggerPhotoUpload = (key: 'photo1' | 'photo2' | 'photo3' | 'envelopePhoto') => {
    setActivePhotoUpload(key);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activePhotoUpload) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setData((prev) => ({
            ...prev,
            [activePhotoUpload]: event.target!.result as string,
          }));
          sfx.playCameraShutter();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper to determine slide transition classes (Zoom In / Zoom Out)
  const getSlideClass = (index: number) => {
    if (index === currentSlide) return 'slide-active';
    if (index < currentSlide) return 'slide-prev';
    return 'slide-next';
  };

  return (
    <div 
      className="ppt-viewport selection:bg-pink-300 selection:text-pink-900"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Hidden file input for photo uploads */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Background YouTube Music Autoplay (Hidden player, no UI button per user request) */}
      <BackgroundMusic />

      {/* Floating Action Controls (Clean, no header bar taking up screen space) */}
      <div className="fixed top-3 right-3 z-50 flex items-center gap-2 select-none pointer-events-auto">
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="p-2 bg-[#ff72ba]/80 hover:bg-[#ff55ad] backdrop-blur-md text-white rounded-full border border-white/20 transition-all cursor-pointer shadow-lg active:scale-95"
          title="Edit Scrapbook"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* ========================================================================= */}
      {/* MAIN PRESENTATION STAGE (Slides Deck with Zoom In / Zoom Out Transitions) */}
      {/* ========================================================================= */}
      <main className="ppt-stage">

        {/* ------------------------------------------------------------- */}
        {/* SLIDE 0: COVER SLIDE (Enriched, Aesthetic, Not Empty!) */}
        {/* ------------------------------------------------------------- */}
        <section className={`ppt-slide ${getSlideClass(0)} bg-[#087fbd] relative overflow-hidden select-none`}>
          {/* Animated Twinkling Stars & Sparkles */}
          <div className="stars pointer-events-none">
            <span style={{ top: '8%', left: '8%' }}>✦</span>
            <span style={{ top: '14%', right: '12%', animationDelay: '0.4s' }}>✦</span>
            <span style={{ top: '26%', left: '5%', animationDelay: '1s' }}>✧</span>
            <span style={{ top: '22%', right: '7%', animationDelay: '1.4s' }}>✦</span>
            <span style={{ top: '70%', left: '7%', animationDelay: '0.7s' }}>✧</span>
            <span style={{ top: '75%', right: '9%', animationDelay: '1.2s' }}>✦</span>
            <span style={{ top: '48%', left: '3%', animationDelay: '0.9s' }}>✦</span>
            <span style={{ top: '46%', right: '4%', animationDelay: '1.6s' }}>✧</span>
            <span style={{ top: '88%', left: '25%', animationDelay: '1.1s' }}>⋆</span>
            <span style={{ top: '86%', right: '28%', animationDelay: '0.5s' }}>⋆</span>
          </div>

          {/* LEFT DECORATIVE SCRAPBOOK ELEMENTS (Ensuring Slide 0 is NOT empty!) */}
          <div className="hidden lg:flex flex-col items-center gap-4 absolute left-8 top-1/2 -translate-y-1/2 pointer-events-none select-none z-10">
            {/* Tilted Polaroid Snapshot Preview */}
            <div className="w-36 bg-white p-2.5 pb-6 rounded-lg shadow-xl -rotate-6 border border-white/60 relative">
              {/* Blue Washi Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-sky-200/80 -rotate-3 rounded-xs shadow-xs" />
              <div className="w-full aspect-square rounded-sm overflow-hidden bg-sky-100">
                <img 
                  src={data.photo3} 
                  alt="Birthday Moment" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <p className="font-['Caveat'] text-center text-sky-900 font-bold text-sm mt-1.5">
                special day ♡
              </p>
            </div>

            {/* Denim Felt Heart Badge */}
            <div className="w-20 h-20 rounded-full bg-[#0a568e] border-2 border-dashed border-white/90 flex flex-col items-center justify-center shadow-lg rotate-6">
              <span className="text-pink-300 text-2xl filter drop-shadow-xs">♥</span>
              <span className="font-['Caveat'] text-white text-xs font-bold">for you</span>
            </div>
          </div>

          {/* RIGHT DECORATIVE SCRAPBOOK ELEMENTS (Ensuring Slide 0 is NOT empty!) */}
          <div className="hidden lg:flex flex-col items-center gap-4 absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none select-none z-10">
            {/* Fluffy Stitched Cloud Sticker */}
            <div className="px-5 py-3 bg-white/95 rounded-full shadow-xl rotate-6 border-2 border-dashed border-sky-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="font-['Caveat'] text-sky-900 font-bold text-lg">
                make a wish! 🎂
              </span>
            </div>

            {/* Tilted Polaroid Snapshot Preview 2 */}
            <div className="w-36 bg-white p-2.5 pb-6 rounded-lg shadow-xl rotate-6 border border-white/60 relative">
              {/* Pinkish Washi Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-pink-200/80 rotate-2 rounded-xs shadow-xs" />
              <div className="w-full aspect-square rounded-sm overflow-hidden bg-pink-50">
                <img 
                  src={data.photo2} 
                  alt="Party Moment" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <p className="font-['Caveat'] text-center text-pink-700 font-bold text-sm mt-1.5">
                with lots of love ✨
              </p>
            </div>
          </div>

          {/* CENTER HERO AREA */}
          <div className="w-full max-w-2xl px-3 sm:px-4 py-1 sm:py-2 flex flex-col items-center justify-center text-center my-auto z-20">
            
            {/* Title: HAPPY BIRTHDAY! (Ultra-appealing bubbly font with 3D candy sticker effect) */}
            <div className="w-full flex justify-center px-1 sm:px-2">
              <HappyBirthdayBanner 
                fontFamily={data.birthdayFont || 'dynapuff'}
                className="max-w-[480px] sm:max-w-[560px]" 
              />
            </div>

            {/* Recipient Name: FOR OLIVIA (White text & Love tanpa warna / outline heart) */}
            <div 
              className="mt-2.5 cursor-pointer hover:scale-105 transition-transform select-none inline-flex items-center justify-center gap-2 group"
              onClick={() => setIsEditModalOpen(true)}
              title="Klik untuk mengubah nama"
            >
              <span className="font-['Fredoka'] font-bold text-white text-2xl sm:text-3xl tracking-wide filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
                FOR {data.recipientName ? data.recipientName.toUpperCase() : 'OLIVIA'}
              </span>
              {/* Love tanpa warna (Outline stroke heart without fill) */}
              <svg 
                className="w-6 h-6 sm:w-7 sm:h-7 text-white filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)] transition-transform group-hover:scale-115" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
            </div>

            {/* THE BLUE ENVELOPE (With Wax Seal & Direct Zoom Transition to Slide 1) */}
            <div className="w-full mt-2">
              <BlueEnvelope
                recipientName={data.recipientName}
                birthDate={data.birthDate}
                envelopePhoto={data.envelopePhoto}
                onPhotoChange={(newPhotoUrl) => setData((prev) => ({ ...prev, envelopePhoto: newPhotoUrl }))}
                onOpenEnvelope={() => {
                  // Direct Zoom Transition to Slide 1 (No modal, no blank paper)
                  goToSlide(1);
                }}
              />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* SLIDE 1: PHOTO REVEAL SLIDE (Matching Image 2 Full Photo View) */}
        {/* ------------------------------------------------------------- */}
        <section className={`ppt-slide ${getSlideClass(1)} bg-[#031d33] p-3 sm:p-8 flex items-center justify-center select-none`}>
          <div className="relative w-full max-w-4xl aspect-[1.48/1] sm:aspect-[1.62/1] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-4 border-white/25 flex flex-col justify-between p-5 sm:p-10 select-none bg-slate-900 my-auto">
            {/* Full Background Photo (Image 2) */}
            <img 
              src={data.envelopePhoto} 
              alt="Birthday Surprise Moment" 
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Cinematic dark & warm gradient overlays for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/55 pointer-events-none" />
            <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/60 pointer-events-none" />

            {/* Corner Change Photo Trigger */}
            <div className="relative z-20 flex justify-end">
              <button
                onClick={() => handleTriggerPhotoUpload('envelopePhoto')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/50 hover:bg-black/80 text-white text-xs font-sans font-medium rounded-full backdrop-blur-sm border border-white/30 transition-colors cursor-pointer"
                title="Ganti Foto Amplop Ini"
              >
                <Camera className="w-3.5 h-3.5 text-pink-300" />
                <span>Ganti Foto</span>
              </button>
            </div>

            {/* CENTER CONTENT: Typography exact to Image 2 */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto px-4">
              
              {/* Date on top: "04-14-05" (Image 2) */}
              <div className="text-white/90 font-mono tracking-widest text-sm sm:text-base mb-1 filter drop-shadow-md">
                {data.birthDate}
              </div>

              {/* Big flowing white cursive script: "Happy Birthday [Name]!" (Image 2) */}
              <h1 className="font-['Alex_Brush'] text-5xl sm:text-7xl md:text-8xl text-white font-normal leading-[1.05] tracking-wide filter drop-shadow-[0_4px_14px_rgba(0,0,0,0.85)]">
                Happy Birthday {data.recipientName ? data.recipientName : 'Olivia'} !
              </h1>

              {/* Delicate Subtitle: "I hope this little gift will make you happy 🫶" (Image 2) */}
              <p className="mt-2 text-white/95 text-sm sm:text-lg md:text-xl font-['Cormorant_Garamond'] italic font-medium tracking-wide filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] flex items-center justify-center gap-1.5">
                <span>I hope this little gift will make you happy</span>
                <span>🫶</span>
              </p>

              {/* Interactive Next Slide Prompt: Text "Click here" matching Image 2 */}
              <div 
                onClick={nextSlide}
                className="mt-6 sm:mt-9 cursor-pointer select-none group inline-block"
              >
                <span className="font-['Cormorant_Garamond'] italic text-2xl sm:text-3xl text-white group-hover:text-yellow-200 underline underline-offset-8 decoration-white/70 group-hover:decoration-yellow-200 font-semibold transition-colors filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  Click here
                </span>
              </div>
            </div>

            {/* Bottom Decorative Hand-Drawn Doodles (Image 2) */}
            <div className="relative z-10 flex justify-between items-end pointer-events-none">
              {/* Bottom Left: Gift Box with Confetti Streamers */}
              <div className="w-18 h-18 sm:w-28 sm:h-28 text-white filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] opacity-95">
                <GiftBoxDoodle className="w-full h-full" color="#ffffff" />
              </div>

              {/* Bottom Right: Festive Balloons */}
              <div className="w-18 h-22 sm:w-28 sm:h-32 text-white filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] opacity-95">
                <BalloonsDoodle className="w-full h-full" color="#ffffff" />
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* SLIDE 2: "THESE ARE FOR YOU" GIFTS SLIDE (Message, Flower, Cake) */}
        {/* ------------------------------------------------------------- */}
        <section className={`ppt-slide ${getSlideClass(2)} bg-gradient-to-b from-[#087fbd] via-[#076ba0] to-[#054d75] p-3 sm:p-6 select-none`}>
          <GiftsSlide 
            recipientName={data.recipientName}
            customMessage={data.customMessage}
            onOpenMessage={() => goToSlide(3)}
            onOpenFlower={() => goToSlide(4)}
            onOpenCake={() => goToSlide(5)}
            onNext={nextSlide}
          />
        </section>

        {/* ------------------------------------------------------------- */}
        {/* SLIDE 3: MESSAGE & POLAROID GALLERY SLIDE (Matching User Reference Image) */}
        {/* ------------------------------------------------------------- */}
        <section className={`ppt-slide ${getSlideClass(3)} p-0 select-none overflow-hidden`}>
          <MessagePolaroidSlide 
            recipientName={data.recipientName}
            customMessage={data.customMessage}
            onUpdateMessage={(newMsg) => setData((prev) => ({ ...prev, customMessage: newMsg }))}
            photo1={data.polaroidPhoto1 || '/src/assets/images/couple_hats_1790359739368.jpg'}
            photo2={data.polaroidPhoto2 || '/src/assets/images/couple_flower_1790359751908.jpg'}
            photo3={data.polaroidPhoto3 || '/src/assets/images/polaroid_candid_smile_1790319059352.jpg'}
            photo4={data.polaroidPhoto4 || '/src/assets/images/couple_selfie_1790359764568.jpg'}
            onPhotoChange={(idx, newUrl) => {
              setData((prev) => ({
                ...prev,
                [`polaroidPhoto${idx}`]: newUrl,
              }));
            }}
            onBackToGifts={() => goToSlide(2)}
            onNextPage={() => goToSlide(4)}
          />
        </section>

        {/* ------------------------------------------------------------- */}
        {/* SLIDE 4: "FLOWERS FOR YOU, MY SWEETHEART" (Vintage Hands & Bouquet + Bubbles) */}
        {/* ------------------------------------------------------------- */}
        <section className={`ppt-slide ${getSlideClass(4)} p-0 select-none overflow-hidden`}>
          <FlowersSlide
            recipientName={data.recipientName}
            customPhrases={data.flowerPhrases}
            onUpdatePhrases={(newPhrases) => setData((prev) => ({ ...prev, flowerPhrases: newPhrases }))}
            onBack={() => goToSlide(2)}
            onNext={() => goToSlide(5)}
          />
        </section>

        {/* ------------------------------------------------------------- */}
        {/* SLIDE 5: CAKE COLLAGE SLIDE (Gingham, Vinyl, Camcorder & Photostrip) */}
        {/* ------------------------------------------------------------- */}
        <section className={`ppt-slide ${getSlideClass(5)} p-0 select-none overflow-hidden`}>
          <CakeCollageSlide
            recipientName={data.recipientName}
            hatsPhoto={data.cakeHatsPhoto}
            clipPhoto={data.cakeClipPhoto}
            camcorderPhoto={data.cakeCamcorderPhoto}
            stripPhotos={data.cakeStripPhotos}
            onPhotoChange={(key, newUrl) => {
              if (key === 'hats') setData((prev) => ({ ...prev, cakeHatsPhoto: newUrl }));
              else if (key === 'clip') setData((prev) => ({ ...prev, cakeClipPhoto: newUrl }));
              else if (key === 'camcorder') setData((prev) => ({ ...prev, cakeCamcorderPhoto: newUrl }));
              else if (typeof key === 'number') {
                setData((prev) => {
                  const arr = [...(prev.cakeStripPhotos || defaultData.cakeStripPhotos || [])];
                  arr[key] = newUrl;
                  return { ...prev, cakeStripPhotos: arr };
                });
              }
            }}
            onBack={() => goToSlide(2)}
            onNext={() => goToSlide(6)}
          />
        </section>

        {/* ------------------------------------------------------------- */}
        {/* SLIDE 6: SCRAPBOOK SPREAD 1 (Pages 01 & 02) */}
        {/* ------------------------------------------------------------- */}
        <section className={`ppt-slide ${getSlideClass(6)} bg-[#095c8c] p-3 sm:p-6 select-none`}>
          <div className="w-full max-w-5xl my-auto">
            <div className="book-wrap">
              <div className="book">
                <article className="spread active">
                  {/* Page 01 */}
                  <div className="page">
                    <div className="tape t1"></div>
                    <div className="flower f1">✿</div>
                    <div className="sticker-heart h1">♥</div>

                    <div className="page-title">
                      Welcome to the<br />Celebration
                    </div>

                    <div 
                      className="polaroid group cursor-pointer" 
                      onClick={() => handleTriggerPhotoUpload('photo1')}
                      title="Klik untuk ganti foto"
                    >
                      <div className="photo-placeholder">
                        <img src={data.photo1} alt="Memory 1" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-sans transition-opacity">
                          <Camera className="w-4 h-4 mr-1" /> Ganti Foto
                        </div>
                      </div>
                      <div className="caption">{data.caption1}</div>
                    </div>

                    <div className="page-number">01</div>
                  </div>

                  {/* Page 02 */}
                  <div className="page">
                    <div className="tape t2"></div>
                    <div className="paperclip">꩜</div>

                    <div className="note">
                      <b>Dear you,</b><br /><br />
                      Today is your day, but somehow I feel like I'm the lucky one for getting to know you
                      and making all these little memories with you. 🤍
                    </div>

                    <div className="flower f2">✿</div>
                    <div className="sticker-heart h2">♥</div>
                    <div className="page-number">02</div>

                    {/* Pure Text "click here →" (No buttons, no footer) */}
                    <div 
                      onClick={nextSlide}
                      className="absolute bottom-4 right-8 sm:right-12 cursor-pointer select-none group z-30"
                    >
                      <span className="font-['Caveat'] text-2xl sm:text-3xl text-[#075b93] group-hover:text-pink-600 font-bold underline underline-offset-4 decoration-2 transition-colors">
                        click here →
                      </span>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* SLIDE 7: SCRAPBOOK SPREAD 2 (Pages 03 & 04) */}
        {/* ------------------------------------------------------------- */}
        <section className={`ppt-slide ${getSlideClass(7)} bg-[#095c8c] p-3 sm:p-6 select-none`}>
          <div className="w-full max-w-5xl my-auto">
            <div className="book-wrap">
              <div className="book">
                <article className="spread active">
                  {/* Page 03 (Dark Denim Stitched Quote) */}
                  <div className="page dark">
                    <div className="stitched">
                      <div className="quote">
                        “Some memories are ordinary until you realize they became your favorite ones.”
                        <small>— a little note from me to you</small>
                      </div>
                    </div>
                    <div className="sticker-heart h1">♥</div>
                    <div className="page-number">03</div>
                  </div>

                  {/* Page 04 */}
                  <div className="page">
                    <div className="flower f1">✿</div>
                    <div className="page-title">
                      Little moments<br />I keep
                    </div>

                    <div 
                      className="polaroid group cursor-pointer" 
                      style={{ transform: 'rotate(4deg)', marginTop: '28px' }}
                      onClick={() => handleTriggerPhotoUpload('photo2')}
                      title="Klik untuk ganti foto"
                    >
                      <div className="photo-placeholder">
                        <img src={data.photo2} alt="Memory 2" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-sans transition-opacity">
                          <Camera className="w-4 h-4 mr-1" /> Ganti Foto
                        </div>
                      </div>
                      <div className="caption">{data.caption2}</div>
                    </div>

                    <div className="note" style={{ fontSize: '20px', marginTop: '10px' }}>
                      the random days, silly conversations, late nights, and tiny things... somehow they
                      all matter. 💙
                    </div>

                    <div className="page-number">04</div>

                    {/* Pure Text "click here →" (No buttons, no footer) */}
                    <div 
                      onClick={nextSlide}
                      className="absolute bottom-4 right-8 sm:right-12 cursor-pointer select-none group z-30"
                    >
                      <span className="font-['Caveat'] text-2xl sm:text-3xl text-[#075b93] group-hover:text-pink-600 font-bold underline underline-offset-4 decoration-2 transition-colors">
                        click here →
                      </span>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* SLIDE 8: SCRAPBOOK SPREAD 3 (Pages 05 & 06 - Grand Finale Spread) */}
        {/* ------------------------------------------------------------- */}
        <section className={`ppt-slide ${getSlideClass(8)} bg-[#095c8c] p-3 sm:p-6 select-none`}>
          <div className="w-full max-w-5xl my-auto">
            <div className="book-wrap">
              <div className="book">
                <article className="spread active">
                  {/* Page 05 */}
                  <div className="page flex flex-col justify-between">
                    <div>
                      <div className="tape t1"></div>
                      <div className="flower f1">✿</div>
                      <div className="page-title">
                        Things I<br />love about you
                      </div>

                      <div className="note" style={{ transform: 'rotate(-2deg)', marginTop: '16px', width: '95%' }}>
                        ✦ the way you make me laugh<br />
                        ✦ the little things you remember<br />
                        ✦ how comfortable I feel with you<br />
                        ✦ your random side<br />
                        ✦ simply... you being you 🤍
                      </div>
                    </div>

                    <div 
                      className="polaroid group cursor-pointer" 
                      style={{ width: '64%', margin: '10px auto 0', transform: 'rotate(2deg)' }}
                      onClick={() => handleTriggerPhotoUpload('photo3')}
                      title="Klik untuk ganti foto"
                    >
                      <div className="photo-placeholder">
                        <img src={data.photo3} alt="Favorite photo" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-sans transition-opacity">
                          <Camera className="w-4 h-4 mr-1" /> Ganti Foto
                        </div>
                      </div>
                      <div className="caption">{data.caption3}</div>
                    </div>

                    <div className="sticker-heart h1">♥</div>
                    <div className="page-number">05</div>
                  </div>

                  {/* Page 06 (Dark Denim Finale) */}
                  <div className="page dark flex flex-col justify-between">
                    <div>
                      <div className="tape t2"></div>
                      <div className="quote" style={{ marginTop: '10px' }}>
                        Happy Birthday,<br />my favorite person. 💙
                      </div>

                      <div className="stitched" style={{ marginTop: '16px' }}>
                        <p style={{ fontFamily: 'Caveat, cursive', fontSize: '24px', lineHeight: '1.2' }}>
                          Here's to another year, another chapter, and filling many more pages together ✨
                        </p>
                      </div>

                      <div className="note" style={{ fontSize: '18px', marginTop: '16px', lineHeight: '1.4' }}>
                        I hope this year brings you closer to everything you've been dreaming about.<br /><br />
                        May you stay healthy, happy, loved, and proud of how far you've come. And remember you're never alone. 🤍
                      </div>
                    </div>

                    <div>
                      <div className="flower f2">✿</div>
                      <div className="sticker-heart h2">♥</div>
                      <div className="page-number">06</div>

                      {/* Pure Text "click here →" (No buttons, no footer) */}
                      <div 
                        onClick={nextSlide}
                        className="absolute bottom-4 right-8 sm:right-12 cursor-pointer select-none group z-30"
                      >
                        <span className="font-['Caveat'] text-2xl sm:text-3xl text-yellow-300 group-hover:text-pink-300 font-bold underline underline-offset-4 decoration-2 transition-colors filter drop-shadow-xs">
                          click here →
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* SLIDE 9: END CARD SLIDE (Playlist & Video Links + Replay) */}
        {/* ------------------------------------------------------------- */}
        <section className={`ppt-slide ${getSlideClass(9)} bg-[#052b47] p-4 sm:p-6 select-none`}>
          <div className="end-card my-auto">
            <h3>There's still one more thing... 💌</h3>
            <p>
              The scrapbook isn't the end. I made a playlist and a little birthday video for you too.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
              <a
                className="link-btn flex items-center gap-2"
                href={data.spotifyLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Music className="w-4 h-4" />
                <span>🎧 Open our playlist</span>
              </a>

              <a
                className="link-btn flex items-center gap-2"
                href={data.videoLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ background: '#075b93' }}
              >
                <Video className="w-4 h-4" />
                <span>🎬 Watch your video</span>
              </a>
            </div>

            {/* Pure text "click here to start over ↺" (No footer, no buttons) */}
            <div 
              onClick={() => goToSlide(0)}
              className="mt-6 pt-4 border-t border-slate-200 text-center cursor-pointer select-none group"
            >
              <span className="font-['Caveat'] text-2xl sm:text-3xl text-[#075b93] group-hover:text-pink-600 font-bold underline underline-offset-4 transition-colors">
                click here to start over ↺
              </span>
            </div>
          </div>
        </section>

      </main>

      {/* ========================================================================= */}
      {/* QUICK CUSTOMIZATION MODAL */}
      {/* ========================================================================= */}
      {isEditModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsEditModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-7 shadow-2xl text-slate-800 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bubble text-2xl text-[#075b93] font-bold">
                Kustomisasi Scrapbook 💙
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-sm font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Nama Penerima (FOR [NAMA DIA])
                  </label>
                  <input
                    type="text"
                    value={data.recipientName}
                    onChange={(e) => setData({ ...data, recipientName: e.target.value })}
                    placeholder="Contoh: Olivia"
                    className="w-full border-2 border-slate-200 rounded-xl px-3.5 py-2 font-medium focus:outline-none focus:border-[#075b93]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Tanggal (Di Atas Tulisan Amplop)
                  </label>
                  <input
                    type="text"
                    value={data.birthDate}
                    onChange={(e) => setData({ ...data, birthDate: e.target.value })}
                    placeholder="Contoh: 04-14-05"
                    className="w-full border-2 border-slate-200 rounded-xl px-3.5 py-2 font-medium focus:outline-none focus:border-[#075b93]"
                  />
                </div>
              </div>

              {/* Font Happy Birthday Selector */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                  <span>Pilihan Font Happy Birthday 🎉</span>
                  <span className="text-xs text-pink-500 font-semibold">Bubbly & Menarik</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'dynapuff', label: 'DynaPuff (Bubbly Candy)', preview: "font-['DynaPuff',_cursive]" },
                    { id: 'titan', label: 'Titan One (3D Bold Pop)', preview: "font-['Titan_One',_cursive]" },
                    { id: 'luckiest', label: 'Luckiest Guy (Festive)', preview: "font-['Luckiest_Guy',_cursive]" },
                    { id: 'chewy', label: 'Chewy (Marshmallow)', preview: "font-['Chewy',_cursive]" },
                    { id: 'fredoka', label: 'Fredoka (Cute Round)', preview: "font-['Fredoka',_sans-serif]" },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setData({ ...data, birthdayFont: f.id as BirthdayFontStyle })}
                      className={`px-2.5 py-2 rounded-xl text-left border-2 text-xs transition-all flex flex-col justify-between cursor-pointer ${
                        (data.birthdayFont || 'dynapuff') === f.id
                          ? 'border-[#ff529f] bg-pink-50 text-[#ff529f] font-bold shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                      }`}
                    >
                      <span className={`text-base font-bold text-[#ff529f] ${f.preview}`}>Happy!</span>
                      <span className="text-[10px] text-slate-400 mt-0.5">{f.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Foto Kejutan di Slide Amplop Biru
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-12 rounded-lg overflow-hidden border-2 border-slate-300">
                    <img src={data.envelopePhoto} alt="Envelope Photo" className="w-full h-full object-cover" />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleTriggerPhotoUpload('envelopePhoto')}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg border border-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5 text-pink-500" />
                    <span>Ganti Foto Amplop</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Link Playlist Spotify
                  </label>
                  <input
                    type="url"
                    value={data.spotifyLink}
                    onChange={(e) => setData({ ...data, spotifyLink: e.target.value })}
                    placeholder="https://open.spotify.com/..."
                    className="w-full border-2 border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-[#075b93]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Link Video Kenangan
                  </label>
                  <input
                    type="url"
                    value={data.videoLink}
                    onChange={(e) => setData({ ...data, videoLink: e.target.value })}
                    placeholder="https://youtube.com/..."
                    className="w-full border-2 border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-[#075b93]"
                  />
                </div>
              </div>

              {/* Message Envelope Customizer */}
              <div>
                <label className="block font-bold text-slate-700 mb-1 flex items-center justify-between">
                  <span>Isi Pesan Surat (Slide Surat & Polaroid Galeri 💌)</span>
                  <span className="text-[11px] text-sky-600 font-semibold">Tampil di Amplop Surat</span>
                </label>
                <textarea
                  rows={3}
                  value={data.customMessage || ''}
                  onChange={(e) => setData({ ...data, customMessage: e.target.value })}
                  placeholder="Tulis pesan personal untuk dia..."
                  className="w-full border-2 border-slate-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-[#075b93]"
                />
              </div>

              {/* Photo Caption Customizer */}
              <div className="pt-2 border-t border-slate-100">
                <span className="block font-bold text-xs text-slate-500 uppercase tracking-wider mb-2">
                  Caption Foto Polaroid
                </span>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 w-16">Foto 1:</span>
                    <input
                      type="text"
                      value={data.caption1}
                      onChange={(e) => setData({ ...data, caption1: e.target.value })}
                      className="flex-1 border rounded-lg px-2.5 py-1 text-xs"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 w-16">Foto 2:</span>
                    <input
                      type="text"
                      value={data.caption2}
                      onChange={(e) => setData({ ...data, caption2: e.target.value })}
                      className="flex-1 border rounded-lg px-2.5 py-1 text-xs"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400 w-16">Foto 3:</span>
                    <input
                      type="text"
                      value={data.caption3}
                      onChange={(e) => setData({ ...data, caption3: e.target.value })}
                      className="flex-1 border rounded-lg px-2.5 py-1 text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-6 py-2.5 bg-[#075b93] hover:bg-[#0b79b5] text-white font-bold rounded-full shadow-md flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  Selesai & Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
