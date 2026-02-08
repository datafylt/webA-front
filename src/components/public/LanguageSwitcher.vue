<template>
  <button
    class="language-switcher"
    @click="toggleLanguage"
    :title="currentLanguage === 'fr' ? 'Switch to English' : 'Passer au français'"
  >
    <span class="flag">{{ currentLanguage === 'fr' ? '🇬🇧' : '🇫🇷' }}</span>
    <span class="lang-text">{{ currentLanguage === 'fr' ? 'EN' : 'FR' }}</span>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { lStorage } from '@/utils'

const { locale } = useI18n()

const currentLanguage = computed(() => locale.value)

const toggleLanguage = () => {
  const newLang = locale.value === 'fr' ? 'en' : 'fr'
  locale.value = newLang
  lStorage.set('locale', newLang)
}
</script>

<style scoped>
.language-switcher {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid #0277BC;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
}

.language-switcher:hover {
  background: #0277BC;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.language-switcher .flag {
  font-size: 20px;
  line-height: 1;
}

.language-switcher .lang-text {
  font-size: 14px;
  font-weight: 600;
  color: #002b53;
  transition: color 0.3s ease;
}

.language-switcher:hover .lang-text {
  color: #fff;
}
</style>
