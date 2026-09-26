export interface Sticker {
  id: string;
  type: 
    | 'denim-heart'
    | 'lilac-heart'
    | 'blue-cloud'
    | 'white-sparkle'
    | 'star-burst'
    | 'purple-flower'
    | 'doodle-ribbon'
    | 'yellow-curly'
    | 'heart-cake'
    | 'doodle-exclamation';
  x: number; // percentage or px
  y: number;
  rotation: number;
  scale?: number;
}

export interface Memory {
  id: string;
  senderName: string;
  relationship: string;
  message: string;
  photoUrl?: string;
  photoCaption?: string;
  paperclipColor?: 'silver' | 'gold' | 'pink' | 'cyan';
  stickers: Sticker[];
  createdAt: string;
  likesCount?: number;
}

export interface EventConfig {
  celebrantName: string;
  eventTitle: string;
  eventHeading: string;
  eventDate: string;
  eventLocation: string;
  customUrl: string;
}
