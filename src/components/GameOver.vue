<script setup lang="ts">
import { computed } from 'vue';
import { useGameStore } from '../store/gameStore';

const gameStore = useGameStore();

const isWin = computed(() => gameStore.isWin);
const targetChampion = computed(() => gameStore.targetChampion);
const guessCount = computed(() => gameStore.guesses.length);

const resetGame = () => {
  gameStore.resetGame();
};

const getWinMessage = () => {
  if (guessCount.value === 1) return "First try! Impressive!";
  if (guessCount.value <= 3) return "Amazing job!";
  if (guessCount.value <= 5) return "Well played!";
  return "You got it!";
};
</script>

<template>
  <div class="game-over mt-8 p-6 bg-gray-800 border border-gray-700 rounded-lg text-center">
    <div v-if="isWin" class="win-message">
      <h2 class="text-2xl font-bold text-green-400 mb-2">{{ getWinMessage() }}</h2>
      <p class="text-gray-300 mb-4">
        You guessed the champion in {{ guessCount }} {{ guessCount === 1 ? 'try' : 'tries' }}!
      </p>
    </div>
    
    <div v-else class="lose-message">
      <h2 class="text-2xl font-bold text-red-400 mb-2">Game Over!</h2>
      <p class="text-gray-300 mb-4">
        You've used all your guesses. Better luck next time!
      </p>
    </div>
    
    <div v-if="targetChampion" class="answer-reveal mb-6">
      <p class="text-gray-400 mb-2">The champion was:</p>
      <div class="flex items-center justify-center">
        <img :src="targetChampion.icon" :alt="targetChampion.name" class="w-16 h-16 rounded-full mr-3" />
        <span class="text-white font-bold text-xl">{{ targetChampion.name }}</span>
      </div>
    </div>
    
    <button 
      @click="resetGame"
      class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
    >
      Play Again
    </button>
    
    <div class="mt-6 pt-6 border-t border-gray-700">
      <p class="text-gray-400 text-sm">
        Come back tomorrow for a new challenge!
      </p>
    </div>
  </div>
</template>