<script setup lang="ts">
import { ref } from 'vue';
import { useGameStore } from '../store/gameStore';
import { useRouter } from 'vue-router';

const gameStore = useGameStore();
const router = useRouter();
const isInfoModalOpen = ref(false);

const toggleInfoModal = () => {
  isInfoModalOpen.value = !isInfoModalOpen.value;
};

const goToHome = () => {
  router.push('/');
};

const resetGame = () => {
  gameStore.resetGame();
};
</script>

<template>
  <header class="game-header">
    <div class="flex justify-between items-center">
      <button @click="goToHome" class="text-gray-400 hover:text-white transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>

      <h1 class="text-2xl font-bold text-center text-blue-400">
        LOL<span class="text-yellow-400"></span> GUESSER
      </h1>

      <div class="flex space-x-3">
        <button @click="resetGame" class="text-gray-400 hover:text-white transition-colors" title="New Game">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>

        <button @click="toggleInfoModal" class="text-gray-400 hover:text-white transition-colors" title="How to Play">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
    </div>

    <!-- How to Play Modal -->
    <div v-if="isInfoModalOpen" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div class="bg-gray-800 rounded-lg max-w-lg w-full p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-white">How to Play</h2>
          <button @click="toggleInfoModal" class="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="text-gray-300 space-y-3">
          <p>Guess the League of Legends champion based on their characteristics.</p>
          <p>Each guess will reveal information about your guess compared to the target champion:</p>

          <ul class="list-disc pl-5 space-y-2">
            <li><span class="inline-block px-2 py-0.5 bg-green-600 text-white rounded-full mr-1">Green</span> means the attribute is correct.</li>
            <li><span class="inline-block px-2 py-0.5 bg-yellow-600 text-white rounded-full mr-1">Yellow</span> means the attribute is partially correct (overlapping values).</li>
            <li><span class="inline-block px-2 py-0.5 bg-red-600 text-white rounded-full mr-1">Red</span> means the attribute is incorrect.</li>
            <li><span class="inline-block px-2 py-0.5 bg-blue-600 text-white rounded-full mr-1">Blue ↓</span> means the year value is higher than the target.</li>
            <li><span class="inline-block px-2 py-0.5 bg-purple-600 text-white rounded-full mr-1">Purple ↑</span> means the year value is lower than the target.</li>
          </ul>

          <p>You have 8 guesses to find the correct champion. Good luck!</p>
        </div>
      </div>
    </div>
  </header>
</template>