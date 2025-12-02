<template>
  <div class="program-detail-page">
    <!-- Breadcrumb -->
    <section class="breadcrumb-section">
      <div class="container">
        <h1>{{ currentProgram?.title }}</h1>
        <nav class="breadcrumb">
          <router-link to="/">Accueil</router-link>
          <span>/</span>
          <router-link to="/programs">Programmes</router-link>
          <span>/</span>
          <span>{{ currentProgram?.shortTitle }}</span>
        </nav>
      </div>
    </section>

    <!-- Program Content -->
    <section class="program-content" v-if="currentProgram">
      <div class="container">
        <div class="program-grid">
          <div class="program-main">
            <div class="program-icon">{{ currentProgram.emoji }}</div>
            <h2>{{ currentProgram.title }}</h2>
            <div class="program-description" v-html="currentProgram.fullDescription"></div>
            
            <div class="program-features" v-if="currentProgram.features">
              <h3>Ce que vous apprendrez:</h3>
              <ul>
                <li v-for="(feature, index) in currentProgram.features" :key="index">
                  {{ feature }}
                </li>
              </ul>
            </div>
          </div>
          
          <div class="program-sidebar">
            <div class="sidebar-card">
              <h4>Informations</h4>
              <ul class="info-list">
                <li>
                  <span class="info-label">Durée:</span>
                  <span class="info-value">{{ currentProgram.duration || 'Variable' }}</span>
                </li>
                <li>
                  <span class="info-label">Format:</span>
                  <span class="info-value">{{ currentProgram.format || 'En personne' }}</span>
                </li>
                <li>
                  <span class="info-label">Certification:</span>
                  <span class="info-value">{{ currentProgram.certification || 'Oui' }}</span>
                </li>
              </ul>
              <router-link to="/contact" class="btn-primary">
                S'inscrire maintenant
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const programs = ref([
  {
    id: '1',
    shortTitle: 'Licence C',
    title: 'Compagnon Electricien Licence C',
    emoji: '⚡',
    duration: '120 heures',
    format: 'En personne',
    certification: 'Emploi Québec',
    fullDescription: `
      <p>Cette formation vise à préparer adéquatement les candidats à l'examen de compagnon électricien hors construction et CCQ.</p>
      <p>Le programme couvre tous les aspects théoriques et pratiques nécessaires pour réussir l'examen de qualification professionnelle.</p>
    `,
    features: [
      'Code de l\'électricité du Québec',
      'Calculs électriques',
      'Schémas et plans électriques',
      'Contrôle de moteurs',
      'Installation de chauffage électrique',
      'Transformateurs monophasés et triphasés'
    ]
  },
  {
    id: '2',
    shortTitle: 'RCA',
    title: 'Connexions restreintes d\'appareillage électrique (RCA)',
    emoji: '🔌',
    duration: '40 heures',
    format: 'En personne',
    certification: 'CMEQ',
    fullDescription: `
      <p>Formation pour les connexions restreintes d'appareillage électrique selon les normes en vigueur.</p>
      <p>Ce programme est conçu pour ceux qui souhaitent effectuer des travaux électriques restreints dans le cadre de leur métier.</p>
    `,
    features: [
      'Normes de sécurité électrique',
      'Connexions d\'appareils',
      'Lecture de schémas',
      'Réglementation en vigueur'
    ]
  },
  {
    id: '3',
    shortTitle: 'RBQ',
    title: 'Préparation aux examens de constructeur propriétaire (RBQ)',
    emoji: '🏗️',
    duration: '80 heures',
    format: 'En personne',
    certification: 'RBQ',
    fullDescription: `
      <p>Préparation complète aux examens de la Régie du bâtiment du Québec.</p>
      <p>Ce programme vous prépare à obtenir votre licence de constructeur propriétaire.</p>
    `,
    features: [
      'Réglementation RBQ',
      'Code de construction',
      'Gestion de projets',
      'Sécurité sur les chantiers'
    ]
  },
  {
    id: '4',
    shortTitle: 'CMEQ',
    title: 'Préparation aux examens entrepreneur électricien (CMEQ)',
    emoji: '📋',
    duration: '100 heures',
    format: 'En personne',
    certification: 'CMEQ',
    fullDescription: `
      <p>Formation intensive pour réussir les examens de la Corporation des maîtres électriciens du Québec.</p>
      <p>Devenez entrepreneur électricien certifié avec notre programme complet.</p>
    `,
    features: [
      'Gestion d\'entreprise',
      'Estimation de projets',
      'Code de l\'électricité',
      'Réglementation CMEQ'
    ]
  },
  {
    id: '5',
    shortTitle: 'Sceau Rouge',
    title: 'Préparation aux examens Sceau Rouge',
    emoji: '🔴',
    duration: '80 heures',
    format: 'En personne',
    certification: 'Sceau Rouge',
    fullDescription: `
      <p>Préparation aux examens interprovincaux pour la certification Sceau Rouge.</p>
      <p>Cette certification vous permet de travailler dans toutes les provinces canadiennes.</p>
    `,
    features: [
      'Code canadien de l\'électricité',
      'Normes interprovinciales',
      'Pratiques sécuritaires',
      'Examens pratiques'
    ]
  },
  {
    id: '6',
    shortTitle: 'Compagnonnage',
    title: 'Compagnonnage en atelier',
    emoji: '🛠️',
    duration: 'Variable',
    format: 'Atelier pratique',
    certification: 'Attestation',
    fullDescription: `
      <p>Formation pratique en atelier avec accompagnement personnalisé.</p>
      <p>Apprenez directement sur le terrain avec nos instructeurs expérimentés.</p>
    `,
    features: [
      'Formation pratique intensive',
      'Accompagnement personnalisé',
      'Travail sur équipements réels',
      'Mentorat professionnel'
    ]
  }
])

const currentProgram = computed(() => {
  const id = route.params.id
  return programs.value.find(p => p.id === id)
})
</script>

<style scoped>
.program-detail-page {
  width: 100%;
}

.breadcrumb-section {
  background: linear-gradient(rgba(0, 43, 83, 0.9), rgba(0, 43, 83, 0.9)), url('/images/breadcrumb-bg.jpg');
  background-size: cover;
  background-position: center;
  padding: 80px 0;
  text-align: center;
}

.breadcrumb-section h1 {
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 15px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.breadcrumb {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.8);
  flex-wrap: wrap;
}

.breadcrumb a {
  color: #0277BC;
  text-decoration: none;
}

.container {
  max-width: 1170px;
  margin: 0 auto;
  padding: 0 15px;
}

.program-content {
  padding: 80px 0;
}

.program-grid {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 40px;
}

.program-icon {
  font-size: 60px;
  margin-bottom: 20px;
}

.program-main h2 {
  font-family: 'Roboto', sans-serif;
  font-size: 32px;
  font-weight: 600;
  color: #002b53;
  margin-bottom: 25px;
}

.program-description {
  color: #666;
  line-height: 1.8;
  margin-bottom: 30px;
}

.program-description p {
  margin-bottom: 15px;
}

.program-features h3 {
  font-family: 'Roboto', sans-serif;
  font-size: 22px;
  font-weight: 600;
  color: #002b53;
  margin-bottom: 20px;
}

.program-features ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.program-features li {
  padding: 12px 0;
  padding-left: 30px;
  position: relative;
  color: #555;
  border-bottom: 1px solid #eee;
}

.program-features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #0277BC;
  font-weight: bold;
}

/* Sidebar */
.sidebar-card {
  background: #f8f8f8;
  padding: 30px;
  border-radius: 8px;
  position: sticky;
  top: 100px;
}

.sidebar-card h4 {
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: #002b53;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #0277BC;
}

.info-list {
  list-style: none;
  padding: 0;
  margin: 0 0 25px 0;
}

.info-list li {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.info-label {
  color: #666;
}

.info-value {
  font-weight: 600;
  color: #002b53;
}

.btn-primary {
  display: block;
  width: 100%;
  padding: 15px 30px;
  background: #0277BC;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  text-decoration: none;
  text-align: center;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: #002b53;
}

@media (max-width: 991px) {
  .program-grid {
    grid-template-columns: 1fr;
  }
  
  .sidebar-card {
    position: static;
  }
}

@media (max-width: 767px) {
  .breadcrumb-section h1 {
    font-size: 28px;
  }
  
  .program-main h2 {
    font-size: 26px;
  }
}
</style>
