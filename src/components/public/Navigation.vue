<template>
  <nav class="fe-navigation">
    <div class="fe-nav-container">
      <div class="fe-nav-logo">
        <router-link to="/">
          <img src="/images/electrical.png" alt="Formation Électro" />
          <span>Formation Électro</span>
        </router-link>
      </div>

      <button class="fe-nav-toggle" @click="toggleMenu" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul class="fe-nav-menu" :class="{ active: menuOpen }">
        <li><router-link to="/" @click="closeMenu">{{ $t('public.navigation.home') }}</router-link></li>
        <li><router-link to="/about" @click="closeMenu">{{ $t('public.navigation.about') }}</router-link></li>
        <li><router-link to="/programs" @click="closeMenu">{{ $t('public.navigation.programs') }}</router-link></li>
        <li><router-link to="/instructors" @click="closeMenu">{{ $t('public.navigation.instructors') }}</router-link></li>
        <li><router-link to="/contact" @click="closeMenu">{{ $t('public.navigation.contact') }}</router-link></li>
        <li><router-link to="/login" @click="closeMenu" class="fe-nav-login">{{ $t('public.navigation.login') }}</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}
</script>

<style scoped>
.fe-navigation {
  background: #002b53;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.fe-nav-container {
  max-width: 1170px;
  margin: 0 auto;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 70px;
}

.fe-nav-logo a {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: #fff;
}

.fe-nav-logo img {
  height: 40px;
  width: auto;
}

.fe-nav-logo span {
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  font-weight: 600;
}

.fe-nav-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.fe-nav-toggle span {
  width: 25px;
  height: 3px;
  background: #fff;
  transition: all 0.3s ease;
}

.fe-nav-menu {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 5px;
}

.fe-nav-menu li a {
  display: block;
  padding: 10px 18px;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  border-radius: 4px;
}

.fe-nav-menu li a:hover,
.fe-nav-menu li a.router-link-active {
  color: #fff;
  background: rgba(2, 119, 188, 0.3);
}

.fe-nav-login {
  background: #0277BC;
  color: #fff !important;
}

.fe-nav-login:hover {
  background: #025a8f !important;
}

/* Mobile styles */
@media (max-width: 991px) {
  .fe-nav-toggle {
    display: flex;
  }

  .fe-nav-menu {
    position: fixed;
    top: 70px;
    left: -100%;
    width: 280px;
    height: calc(100vh - 70px);
    background: #002b53;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px 0;
    gap: 0;
    transition: left 0.3s ease;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
    overflow-y: auto;
  }

  .fe-nav-menu.active {
    left: 0;
  }

  .fe-nav-menu li {
    width: 100%;
  }

  .fe-nav-menu li a {
    padding: 15px 25px;
    border-radius: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .fe-nav-login {
    margin: 10px 25px;
    width: calc(100% - 50px);
    text-align: center;
  }
}
</style>
