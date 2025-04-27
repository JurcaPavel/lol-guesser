import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import championsData from './champions';
import type { Champion, ChampionGuess } from '../types/champion';

export const useGameStore = defineStore('game', () => {
  // Game state
  const gameMode = ref('classic');
  const guesses = ref<ChampionGuess[]>([]);
  const targetChampion = ref<Champion>();
  const gameOver = ref(false);
  const maxGuesses = ref(8);

  // Computed properties
  const isWin = computed(() => {
    if (!guesses.value.length || !targetChampion.value) return false;
    return guesses.value[guesses.value.length - 1].champion.id === targetChampion.value.id;
  });

  const availableChampions = computed(() => {
    return championsData;
  });

  const attributeNames = computed(() => {
    if (gameMode.value === 'classic') {
      return ['gender', 'positions', 'species', 'resource', 'rangeType', 'regions', 'releaseYear'];
    }
    return [];
  });

  // Methods
  function setGameMode(mode: string) {
    gameMode.value = mode;
    resetGame();
  }

  function selectRandomChampion() {
    const champions = availableChampions.value;
    const randomIndex = Math.floor(Math.random() * champions.length);
    targetChampion.value = champions[randomIndex];
  }

  function makeGuess(champion: Champion) {
    // Don't allow guesses if game is over
    if (gameOver.value) return;

    // Add the guess
    const newGuess: ChampionGuess = {
      champion,
      timestamp: Date.now()
    };

    guesses.value.push(newGuess);

    // Check if won or out of guesses
    if (champion.id === targetChampion.value?.id) {
      gameOver.value = true;
    } else if (guesses.value.length >= maxGuesses.value) {
      gameOver.value = true;
    }
  }

  function resetGame() {
    guesses.value = [];
    gameOver.value = false;
    selectRandomChampion();
  }

  // Initialize the game
  selectRandomChampion();

  return {
    gameMode,
    guesses,
    targetChampion,
    gameOver,
    maxGuesses,
    isWin,
    availableChampions,
    attributeNames,
    setGameMode,
    makeGuess,
    resetGame
  };
});