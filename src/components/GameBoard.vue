<script setup lang="ts">
import { computed } from 'vue';
import { useGameStore } from '../store/gameStore';
import GuessRow from './GuessRow.vue';
import ChampionSelector from './ChampionSelector.vue';
import GameHeader from './GameHeader.vue';
import GameOver from './GameOver.vue';

const gameStore = useGameStore();

const maxGuesses = computed(() => gameStore.maxGuesses);
const remainingRows = computed(() => {
  return Math.max(0, maxGuesses.value - gameStore.guesses.length);
});

const emptyRows = computed(() => {
  return Array(remainingRows.value).fill(null);
});
</script>

<template>
  <div class="game-board w-full max-w-4xl mx-auto px-4 py-6">
    <GameHeader />

    <div class="mt-6 mb-8">
      <div v-if="gameStore.guesses.length === 0" class="text-center text-gray-300 my-8">
        <p class="text-lg mb-2">Guess League of Legends champion!</p>
        <p>Each guess will reveal information about the champion's attributes.</p>
      </div>

      <ChampionSelector :disabled="gameStore.gameOver" class="mb-8" />

      <div class="space-y-3">
        <GuessRow
          v-for="(guess, index) in gameStore.guesses"
          :key="index"
          :guess="guess"
          :attributes="gameStore.attributeNames"
          :target-champion="gameStore.targetChampion"
        />

        <div v-for="(_, index) in emptyRows" :key="`empty-${index}`"
          class="empty-row border border-gray-700 rounded-lg p-4 bg-gray-800 bg-opacity-40 min-h-[74px]">
        </div>
      </div>
    </div>

    <GameOver v-if="gameStore.gameOver" />
  </div>
</template>