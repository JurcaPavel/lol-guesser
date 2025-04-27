<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useGameStore } from '../store/gameStore';
import type { Champion } from '../types/champion';

const props = defineProps<{
  disabled?: boolean;
}>();

const gameStore = useGameStore();
const searchQuery = ref('');
const isDropdownOpen = ref(false);
const selectedIndex = ref(0);

const availableChampions = computed(() => {
  const guessedChampionIds = new Set(gameStore.guesses.map(g => g.champion.id));
  return gameStore.availableChampions.filter(champion => !guessedChampionIds.has(champion.id));
});

const filteredChampions = computed(() => {
  if (!searchQuery.value) return [];

  const query = searchQuery.value.toLowerCase();
  const startsWithMatch: Champion[] = [];
  const containsMatch: Champion[] = [];

  availableChampions.value.forEach(champion => {
    const nameLower = champion.name.toLowerCase();
    if (nameLower.startsWith(query)) {
      startsWithMatch.push(champion);
    } else if (nameLower.includes(query)) {
      containsMatch.push(champion);
    }
  });

  return [...startsWithMatch, ...containsMatch].slice(0, 8);
});

const handleInput = () => {
  isDropdownOpen.value = searchQuery.value.length > 0;
  selectedIndex.value = 0;
};

const selectChampion = (champion: Champion) => {
  gameStore.makeGuess(champion);
  searchQuery.value = '';
  isDropdownOpen.value = false;
};

const handleKeydown = (e: KeyboardEvent) => {
  if (!isDropdownOpen.value || filteredChampions.value.length === 0) return;

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    selectedIndex.value = (selectedIndex.value + 1) % filteredChampions.value.length;
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    selectedIndex.value = (selectedIndex.value - 1 + filteredChampions.value.length) % filteredChampions.value.length;
  } else if (e.key === 'Enter') {
    e.preventDefault();
    selectChampion(filteredChampions.value[selectedIndex.value]);
  } else if (e.key === 'Escape') {
    isDropdownOpen.value = false;
  }
};

watch(() => gameStore.gameOver, (newVal) => {
  if (newVal) {
    isDropdownOpen.value = false;
  }
});

onMounted(() => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.champion-selector')) {
      isDropdownOpen.value = false;
    }
  });
});
</script>

<template>
  <div class="champion-selector relative w-full max-w-md mx-auto">
    <input
      type="text"
      v-model="searchQuery"
      @input="handleInput"
      @keydown="handleKeydown"
      :disabled="props.disabled || gameStore.gameOver"
      placeholder="Type a champion name..."
      class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      :class="{ 'opacity-50 cursor-not-allowed': props.disabled || gameStore.gameOver }"
    />

    <div v-if="isDropdownOpen && filteredChampions.length > 0"
      class="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-96 overflow-y-auto">
      <div
        v-for="(champion, index) in filteredChampions"
        :key="champion.id"
        @click="selectChampion(champion)"
        class="flex items-center px-4 py-2 cursor-pointer transition-colors"
        :class="{ 'bg-blue-600': index === selectedIndex, 'hover:bg-gray-700': index !== selectedIndex }"
      >
        <img :src="champion.icon" :alt="champion.name" class="w-10 h-10 rounded-full mr-3" />
        <span class="text-white">{{ champion.name }}</span>
      </div>
    </div>

    <div v-else-if="isDropdownOpen && searchQuery && filteredChampions.length === 0"
      class="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4 text-center text-gray-400">
      No champions found
    </div>
  </div>
</template>
