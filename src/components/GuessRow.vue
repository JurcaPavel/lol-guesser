<script setup lang="ts">
import type { Champion, ChampionGuess } from '../types/champion';

const props = defineProps<{
  guess: ChampionGuess;
  attributes: string[];
  targetChampion: Champion;
}>();

const getAttributeClass = (attribute: string) => {
  const guessValue = props.guess.champion[attribute];
  const targetValue = props.targetChampion[attribute];

  // Handle array values (positions, regions, rangeType)
  if (Array.isArray(guessValue) && Array.isArray(targetValue)) {
    // Exact match
    if (JSON.stringify(guessValue.sort()) === JSON.stringify(targetValue.sort())) {
      return 'bg-green-600 text-white';
    }
    // Partial match
    if (guessValue.some(value => targetValue.includes(value))) {
      return 'bg-yellow-600 text-white';
    }
    return 'bg-red-600 text-white';
  }

  // Handle release year
  if (attribute === 'releaseYear') {
    if (guessValue === targetValue) {
      return 'bg-green-600 text-white';
    }
    return guessValue > targetValue
      ? 'bg-blue-600 text-white after:content-["▼"] after:ml-1 after:text-lg'
      : 'bg-purple-600 text-white after:content-["▲"] after:ml-1 after:text-lg';
  }

  // Handle simple string values
  return guessValue === targetValue
    ? 'bg-green-600 text-white'
    : 'bg-red-600 text-white';
};
</script>

<template>
  <div class="flex gap-4 items-center p-4 bg-gray-800 rounded-lg">
    <div class="w-16 h-16 flex-shrink-0">
      <img
        :src="guess.champion.icon"
        :alt="guess.champion.name"
        class="w-full h-full object-cover rounded-lg"
      />
    </div>
    <div class="flex-1 grid grid-cols-7 gap-2">
      <div
        v-for="attribute in attributes"
        :key="attribute"
        class="p-2 rounded-md text-sm flex items-center justify-center min-h-[48px] text-center"
        :class="getAttributeClass(attribute)"
      >
        <div class="w-full">
          <template v-if="Array.isArray(guess.champion[attribute])">
            {{ guess.champion[attribute].join(', ') }}
          </template>
          <template v-else>
            {{ guess.champion[attribute] }}
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid-cols-7 {
  grid-template-columns: repeat(7, minmax(0, 1fr));
}
</style>