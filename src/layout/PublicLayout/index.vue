<template>
  <div class="public-layout">
    <!-- Pre Loader -->
    <div v-if="loading" class="loader" id="dvLoading"></div>

    <!-- Header -->
    <header class="main-header" :class="{ 'is-scrolled': isScrolled }">
      <!-- Top Bar -->
      <div class="top-bar" v-show="!isScrolled">
        <div class="container">
          <div class="top-bar-inner">
            <div class="top-left">
              <ul>
                <li>
                  <a href="mailto:info@formationelectro.com">
                    <span class="icon">✉</span>
                    info@formationelectro.com
                  </a>
                </li>
                <li>
                  <span class="icon">📞</span>
                  +1-514-605-4275
                </li>
              </ul>
            </div>
            <div class="top-right">
              <ul class="social-icons">
                <li>
                  <a href="https://facebook.com" target="_blank" aria-label="Facebook">
                    <span>f</span>
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                    <span>in</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Navigation -->
      <div class="nav-bar">
        <div class="container">
          <div class="nav-inner">
            <!-- Logo -->
            <router-link to="/" class="logo">
              <img src="/images/logo.png" alt="Formation Électro Inc" />
            </router-link>

            <!-- Desktop Navigation -->
            <nav class="main-nav" :class="{ 'is-open': mobileMenuOpen }">
              <ul class="nav-menu">
                <li :class="{ active: isActive('/') }">
                  <router-link to="/" @click="closeMobileMenu">Accueil</router-link>
                </li>
                <li :class="{ active: isActive('/about') }">
                  <router-link to="/about" @click="closeMobileMenu">À propos de nous</router-link>
                </li>
                <li class="has-dropdown" :class="{ active: isActive('/programs') }">
                  <a href="javascript:void(0)" @click.prevent="toggleDropdown">
                    Programmes <span class="dropdown-arrow">▼</span>
                  </a>
                  <ul class="dropdown-menu" :class="{ show: dropdownOpen }">
                    <li><router-link to="/programs/1" @click="closeMobileMenu">Compagnon Electricien Licence C</router-link></li>
                    <li><router-link to="/programs/2" @click="closeMobileMenu">Connexions restreintes d'appareillage électrique (RCA)</router-link></li>
                    <li><router-link to="/programs/3" @click="closeMobileMenu">Préparation aux examens de constructeur propriétaire (RBQ)</router-link></li>
                    <li><router-link to="/programs/4" @click="closeMobileMenu">Préparation aux examens entrepreneur électricien (CMEQ)</router-link></li>
                    <li><router-link to="/programs/5" @click="closeMobileMenu">Préparation aux examens Sceau Rouge</router-link></li>
                    <li><router-link to="/programs/6" @click="closeMobileMenu">Compagnonnage en atelier</router-link></li>
                  </ul>
                </li>
                <li :class="{ active: isActive('/instructors') }">
                  <router-link to="/instructors" @click="closeMobileMenu">Nos instructeurs</router-link>
                </li>
                <li :class="{ active: isActive('/contact') }">
                  <router-link to="/contact" @click="closeMobileMenu">Contactez-nous</router-link>
                </li>
                <li class="nav-login">
                  <router-link to="/login" @click="closeMobileMenu">Connexion</router-link>
                </li>
              </ul>
            </nav>

            <!-- Mobile Menu Toggle -->
            <button
              class="mobile-toggle"
              @click="toggleMobileMenu"
              :class="{ 'is-open': mobileMenuOpen }"
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="main-footer">
      <div class="container">
        <div class="footer-grid">
          <!-- Company Info -->
          <div class="footer-section">
            <div class="footer-logo">
              <img src="/images/logo.png" alt="Formation Électro Inc" />
            </div>
            <p class="footer-desc">
              Connaître les notions et concepts de base en électricité.
            </p>
          </div>

          <!-- Quick Links -->
          <div class="footer-section">
            <h4>Extra Links</h4>
            <ul class="footer-links">
              <li><router-link to="/">Accueil</router-link></li>
              <li><router-link to="/about">À propos de nous</router-link></li>
              <li><router-link to="/programs/1">Programmes</router-link></li>
              <li><router-link to="/instructors">Nos instructeurs</router-link></li>
              <li><router-link to="/contact">Contactez-nous</router-link></li>
              <li>
                <a href="http://www.emploiquebec.gouv.qc.ca/fileadmin/fichiers/pdf/Guide-qualif/electricite_fiche.pdf#page=9" target="_blank">
                  Emploi Québec
                </a>
              </li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div class="footer-section">
            <h4>Entrer en contact</h4>
            <ul class="footer-contact">
              <li>
                <span class="contact-icon">🕐</span>
                <span>Mon - Sat 9:00 a.m. - 6:00 p.m.<br>Sunday Closed</span>
              </li>
              <li>
                <span class="contact-icon">📍</span>
                <span>255 Boulevard Curé-Labelle, Sainte-Rose, Laval, QC H7L-2R9, Bureau 05</span>
              </li>
              <li>
                <span class="contact-icon">📞</span>
                <span>+1-514-605-4275</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="copyright">
        <div class="container">
          <p>&copy; Copyright {{ currentYear }}, Formation Électro Inc | All Rights Reserved.</p>
        </div>
      </div>
    </footer>

    <!-- Scroll to Top Button -->
    <button
      v-show="showScrollTop"
      class="scroll-top"
      @click="scrollToTop"
      aria-label="Scroll to top"
    >
      ↑
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// State
const loading = ref(true)
const isScrolled = ref(false)
const showScrollTop = ref(false)
const mobileMenuOpen = ref(false)
const dropdownOpen = ref(false)

// Computed
const currentYear = computed(() => new Date().getFullYear())

// Methods
const isActive = (path) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  if (mobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
  dropdownOpen.value = false
  document.body.style.overflow = ''
}

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 100
  showScrollTop.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// Lifecycle
onMounted(() => {
  // Enable scrolling on body for public pages
  document.body.classList.add('public-page')
  document.body.style.overflow = 'auto'
  document.body.style.height = 'auto'
  document.documentElement.style.overflow = 'auto'
  document.documentElement.style.height = 'auto'

  // Hide loader after content loads
  setTimeout(() => {
    loading.value = false
  }, 500)

  // Listen for scroll
  window.addEventListener('scroll', handleScroll)
  handleScroll()

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-dropdown')) {
      dropdownOpen.value = false
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  // Remove public page class and reset styles
  document.body.classList.remove('public-page')
  document.body.style.overflow = ''
  document.body.style.height = ''
  document.documentElement.style.overflow = ''
  document.documentElement.style.height = ''
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700|Roboto:300,400,600,700');

.public-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Open Sans', sans-serif;
  color: #2d2e2e;
  overflow-y: auto !important;
  overflow-x: hidden;
  height: auto !important;
  position: relative;
}

/* ================================
   Loader
   ================================ */
.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff url('/images/loader.gif') no-repeat center center;
  z-index: 99999;
}

/* Logo Text */
.logo-text {
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #002b53;
  text-decoration: none;
}

.footer-logo .logo-text {
  color: #fff;
}

/* ================================
   Header
   ================================ */
.main-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

.main-header.is-scrolled {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.main-header.is-scrolled .top-bar {
  display: none;
}

/* Top Bar */
.top-bar {
  background: #002b53;
  padding: 8px 0;
}

.container {
  max-width: 1170px;
  margin: 0 auto;
  padding: 0 15px;
}

.top-bar-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top-left ul,
.top-right ul {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 20px;
}

.top-left ul li {
  color: #fff;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.top-left ul li a {
  color: #fff;
  text-decoration: none;
  transition: opacity 0.3s;
}

.top-left ul li a:hover {
  opacity: 0.8;
}

.top-left .icon {
  color: #0277BC;
}

/* Social Icons */
.social-icons {
  display: flex;
  gap: 8px;
}

.social-icons li a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  background: #fff;
  border-radius: 50%;
  color: #002b53;
  font-size: 11px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s;
}

.social-icons li a:hover {
  background: #0277BC;
  color: #fff;
}

/* Nav Bar */
.nav-bar {
  background: #fff;
  padding: 0;
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo */
.logo {
  display: block;
  padding: 15px 0;
}

.logo img {
  height: 50px;
  width: auto;
}

.main-header.is-scrolled .logo {
  padding: 8px 0;
}

.main-header.is-scrolled .logo img {
  height: 45px;
}

/* Main Navigation */
.main-nav {
  display: flex;
}

.nav-menu {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 5px;
}

.nav-menu > li > a {
  display: block;
  padding: 15px 15px;
  color: #000;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-menu > li:hover > a,
.nav-menu > li.active > a {
  color: #0277BC;
}

/* Dropdown */
.has-dropdown {
  position: relative;
}

.dropdown-arrow {
  font-size: 10px;
  margin-left: 4px;
  transition: transform 0.3s;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 320px;
  background: #222;
  padding: 0;
  margin: 0;
  list-style: none;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s ease;
  z-index: 100;
}

.has-dropdown:hover .dropdown-menu,
.dropdown-menu.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-menu li {
  border-bottom: 1px solid #3a3a3a;
}

.dropdown-menu li:last-child {
  border-bottom: none;
}

.dropdown-menu li a {
  display: block;
  padding: 15px;
  color: #fff;
  font-size: 13px;
  text-decoration: none;
  transition: all 0.3s;
}

.dropdown-menu li a:hover {
  background: #191919;
  color: #0277BC;
}

/* Login Button in Nav */
.nav-login {
  margin-left: 10px;
}

.nav-login a {
  background: #0277BC !important;
  color: #fff !important;
  padding: 10px 20px !important;
  border-radius: 4px;
}

.nav-login a:hover {
  background: #002b53 !important;
}

/* Mobile Toggle */
.mobile-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  gap: 6px;
  padding: 8px;
}

.mobile-toggle span {
  display: block;
  width: 24px;
  height: 2px;
  background: #002b53;
  transition: all 0.3s ease;
}

.mobile-toggle.is-open span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.mobile-toggle.is-open span:nth-child(2) {
  opacity: 0;
}

.mobile-toggle.is-open span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* ================================
   Main Content
   ================================ */
.main-content {
  flex: 1;
  margin-top: 95px;
}

.main-header.is-scrolled + .main-content {
  margin-top: 65px;
}

/* ================================
   Footer
   ================================ */
.main-footer {
  background: #222;
  padding: 40px 0 0;
  margin-top: auto;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 40px;
  padding-bottom: 40px;
}

.footer-section h4 {
  color: #ededed;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
}

.footer-logo img {
  height: 50px;
  width: auto;
  margin-bottom: 15px;
}

.footer-desc {
  color: #b2b2b2;
  font-size: 14px;
  line-height: 1.6;
}

/* Footer Links */
.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 8px;
}

.footer-links li a {
  color: #b1b1b1;
  font-size: 14px;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links li a:hover {
  color: #0277BC;
}

/* Footer Contact */
.footer-contact {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-contact li {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  color: #b1b1b1;
  font-size: 14px;
  line-height: 1.6;
}

.contact-icon {
  flex-shrink: 0;
}

/* Copyright */
.copyright {
  background: #333;
  padding: 15px 0;
}

.copyright p {
  color: #b2b2b2;
  font-size: 14px;
  text-align: center;
  margin: 0;
}

/* ================================
   Scroll to Top
   ================================ */
.scroll-top {
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 40px;
  height: 40px;
  background: #0277BC;
  color: #fff;
  border: none;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scroll-top:hover {
  background: #002b53;
}

/* ================================
   Responsive
   ================================ */
@media (max-width: 991px) {
  .top-bar {
    display: none;
  }

  .main-content {
    margin-top: 70px;
  }

  .mobile-toggle {
    display: flex;
  }

  .main-nav {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 0;
    background: #333;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    overflow-y: auto;
  }

  .main-nav.is-open {
    transform: translateX(0);
  }

  .nav-menu {
    flex-direction: column;
    align-items: stretch;
    padding: 20px;
    gap: 0;
  }

  .nav-menu > li > a {
    color: #fff;
    padding: 15px 0;
    border-bottom: 1px solid #444;
  }

  .nav-menu > li:hover > a,
  .nav-menu > li.active > a {
    color: #0277BC;
  }

  .dropdown-menu {
    position: static;
    width: 100%;
    opacity: 1;
    visibility: visible;
    transform: none;
    display: none;
    background: #1a1a1a;
  }

  .dropdown-menu.show {
    display: block;
  }

  .dropdown-menu li a {
    padding-left: 20px;
  }

  .nav-login {
    margin-left: 0;
    margin-top: 10px;
  }

  .nav-login a {
    display: block;
    text-align: center;
  }

  .footer-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}

@media (max-width: 767px) {
  .footer-section h4 {
    font-size: 15px;
  }
}
</style>

<style>
/* Global overrides for public pages - ensure scrolling works */
html:has(.public-layout),
body:has(.public-layout) {
  overflow: auto !important;
  height: auto !important;
  min-height: 100vh;
}

#app:has(.public-layout) {
  overflow: visible !important;
  height: auto !important;
}
</style>