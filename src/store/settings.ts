import { defineStore } from 'pinia';
import { ref } from 'vue';

interface ICity {
  id: number;
  spell: string;
  name: string;
}

export const useSettingsStore = defineStore(
  'settings',
  () => {
    const currentCity = ref<ICity>({
      id: 28,
      spell: 'luoyang',
      name: '洛阳',
    });

    const setCurrentCity = (city: ICity) => {
      currentCity.value = city;
    };

    return {
      currentCity,
      setCurrentCity,
    };
  },
  {
    persist: true,
  }
);
