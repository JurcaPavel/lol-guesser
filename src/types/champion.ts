export interface Champion {
  id: string;
  name: string;
  icon: string;
  gender: string;
  positions: string[];
  species: string;
  resource: string;
  rangeType: string | string[];
  regions: string[];
  releaseYear: number;
}

export interface ChampionGuess {
  champion: Champion;
  timestamp: number;
}

export interface QuoteChallenge {
  quote: string;
  champion: Champion;
}

export interface AbilityChallenge {
  abilityIcon: string;
  abilityName: string;
  champion: Champion;
}

export interface SplashArtChallenge {
  splashArt: string;
  zoomLevel: number;
  champion: Champion;
}

export interface EmojiChallenge {
  emojis: string[];
  champion: Champion;
}