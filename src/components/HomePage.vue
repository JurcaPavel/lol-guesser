<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useGameStore } from '../store/gameStore';

const router = useRouter();
const gameStore = useGameStore();

const startGame = (mode: string) => {
  gameStore.setGameMode(mode);
  router.push('/game');
};
</script>

<template>
  <div class="home-page min-h-screen flex flex-col">
    <header class="py-6 px-4">
      <h1 class="text-4xl font-bold text-center">
        <span class="text-blue-400">HRAT</span><span class="text-yellow-400"> DPČ</span>
      </h1>
      <p class="text-gray-400 text-center mt-2">
        A League of Legends champion guessing game
      </p>
    </header>

    <main class="flex-1 flex flex-col items-center justify-center px-4 py-8">
      <div class="max-w-2xl w-full">
        <div class="game-modes flex justify-center">
          <div
            @click="startGame('classic')"
            class="game-mode bg-gray-800 border border-gray-700 hover:border-blue-500 rounded-lg p-6 cursor-pointer transition-all transform hover:-translate-y-1 w-80"
          >
            <h2 class="text-xl font-bold text-blue-400 mb-2">Classic</h2>
            <p class="text-gray-300 mb-4">Guess the champion based on their attributes</p>
            <div class="mt-auto">
              <button class="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                Play
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="py-6 px-4 text-center text-gray-500 text-sm">
      <p>Hrat dpč, co se děje??</p>
    </footer>
  </div>
</template>

<style scoped>
.home-page {
  background: linear-gradient(to bottom, #1a1a2e, #16213e);
}

.game-mode {
  display: flex;
  flex-direction: column;
  height: 200px;
}
</style>