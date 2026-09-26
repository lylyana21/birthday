import { Memory, EventConfig } from '../types';

export const initialEventConfig: EventConfig = {
  celebrantName: 'Olivia',
  eventTitle: 'Happy Birthday',
  eventHeading: 'Welcome to the Celebration',
  eventDate: '24 September 2026',
  eventLocation: 'The Glasshouse Garden',
  customUrl: 'www.reallygreatsite.com',
};

export const initialMemories: Memory[] = [
  // Page 1 & 2 (Matching Image 3 precisely!)
  {
    id: 'mem-1',
    senderName: 'Olivia & Besties',
    relationship: 'The Celebrant',
    photoUrl: '/src/assets/images/polaroid_candid_smile_1790319059352.jpg',
    photoCaption: 'Welcome to the Celebration!',
    paperclipColor: 'silver',
    createdAt: '24 Sep 2026, 19:30',
    likesCount: 24,
    stickers: [
      { id: 'stk-1', type: 'star-burst', x: 75, y: 78, rotation: 15 },
      { id: 'stk-2', type: 'purple-flower', x: 80, y: 15, rotation: -8 },
    ],
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam quis nisl sed urna sagittis hendrerit vitae sit amet ex. Nulla aliquet id massa id congue. Terima kasih sudah hadir dan menjadi bagian dari hari yang sangat membahagiakan ini!',
  },
  // Page 3 & 4
  {
    id: 'mem-2',
    senderName: 'Sarah & Kevin',
    relationship: 'Sahabat Sejak SMA',
    photoUrl: '/src/assets/images/polaroid_birthday_friends_1790319071128.jpg',
    photoCaption: 'Party squad forever! ✨🎂',
    paperclipColor: 'pink',
    createdAt: '24 Sep 2026, 20:15',
    likesCount: 19,
    stickers: [
      { id: 'stk-3', type: 'denim-heart', x: 70, y: 70, rotation: 10 },
      { id: 'stk-4', type: 'lilac-heart', x: 20, y: 25, rotation: -12 },
    ],
    message: 'Happy Birthday Olivia tersayang! 🎉 Rasanya baru kemarin kita seru-seruan ngerjain tugas bareng, sekarang kamu udah makin bersinar dan luar biasa. Semoga tahun ini bawa jutaan senyum dan sukses buat semua impianmu!',
  },
  // Page 5 & 6
  {
    id: 'mem-3',
    senderName: 'Tante Maya & Om Budi',
    relationship: 'Keluarga Besar',
    photoUrl: '/src/assets/images/frilly_heart_cake_1790319044352.jpg',
    photoCaption: 'Sweetest 21st Birthday Cake 💖',
    paperclipColor: 'gold',
    createdAt: '24 Sep 2026, 21:05',
    likesCount: 14,
    stickers: [
      { id: 'stk-5', type: 'blue-cloud', x: 65, y: 20, rotation: 5 },
      { id: 'stk-6', type: 'white-sparkle', x: 80, y: 75, rotation: 18 },
    ],
    message: 'Selamat ulang tahun keponakan tersayang Olivia! Doa kami sekeluarga selalu menyertaimu: sehat selalu, bahagia, dan selalu menjadi berkat serta kebanggaan bagi banyak orang. Tetap rendah hati dan ceria ya sayang!',
  },
];
