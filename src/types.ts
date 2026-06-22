export interface Game {
  id: string;
  title: string;
  genre: string;
  description: string;
  image: string;
  trailerUrl?: string;
  downloadUrl?: string;
}

export type SectionId = 'home' | 'about' | 'games' | 'contact';
