<template>
  <div class="about-page fe-page">
    <!-- Breadcrumb -->
    <BreadcrumbSection title="À Propos De Nous" />

    <!-- About Content Section 1 -->
    <section class="about-section">
      <div class="fe-container">
        <div class="about-grid">
          <div class="about-text fe-content">
            <h2>Fondateur</h2>
            <p class="fe-text-justify">
              Voici un bref historique de "formation électro Inc." et les noms de plusieurs
              entreprises qui ont pu bénéficier de nos formations et services.
            </p>
            <p class="fe-text-justify">
              Yvan Dumais est maître électricien, il détient un certificat de qualification
              d'électricien interprovincial et d'un brevet d'enseignement en électrotechnique
              du ministère de l'Éducation du Québec, il est aussi formateur en santé et
              sécurité dans le milieu du travail.
            </p>
            <p class="fe-text-justify">
              Après une carrière de plus de 10 ans comme électricien professionnel il a
              poursuivi les prochaines 25 années dans l'enseignement de l'électrotechnique.
              En 1992, il a fondé l'entreprise "formation électro Inc." et depuis il a
              partagé son savoir-faire à M. Mahmad Sabhir Pheerunggee.
            </p>

            <h2>Expérience</h2>
            <p class="fe-text-justify">
              Fort de cette longue expérience pratique et de ses connaissances théoriques
              approfondie, il a d'abord élaboré un plan de formations pour aider les apprentis
              électriciens à réviser leurs notions théoriques dans le but de présenter et
              réussir le test de compagnon électricien (licence C) construction ou hors
              construction et pour le test d'électricien interprovincial (sceau rouge).
            </p>
            <p class="fe-text-justify">
              Par la suite il a élaboré un autre plan de formation pour les électriciens
              afin de les aider pour les tests de Maîtres électriciens ou constructeurs
              propriétaires.
            </p>
          </div>
          <div class="about-images">
            <div class="about-img">
              <img src="/images/team4.png" alt="Fondateur" />
            </div>
            <div class="about-img">
              <img src="/images/aboutUs.png" alt="Formation Électro" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <CtaSection
      :title="ctaTitle"
      :description="ctaDescription"
    />

    <!-- About Content Section 2 -->
    <section class="about-section">
      <div class="fe-container">
        <div class="about-text fe-content about-text--narrow">
          <h2>En 2008</h2>
          <p class="fe-text-justify">
            J'ai élaboré un plan de formation pour les futurs compagnons en connexions
            restreintes d'appareillage électrique puisque c'est l'année ou Emploie Québec
            et ses partenaires donnaient cette accessibilité aux travailleurs Québécois
            soit d'obtenir le certificat de compagnon connexions restreintes d'appareillage
            électrique (CRCA).
          </p>
          <p class="fe-text-justify">
            Plus est, Formation Électro inc, dispense des formations pratiques et théoriques
            en contrôle de moteurs, installation et contrôle de chauffage, d'éclairage et
            installation de transformateurs monophasé ou triphasé. Des cours en lecture de
            plans et devis, de croquis et schémas, élaboration d'examens pré-embauche
            théoriques et pratiques.
          </p>
          <p class="fe-text-justify">
            Bref, Formation Électro Inc. peut répondre à plusieurs, sinon tous vos besoins
            de formations en ce qui concerne l'électricité et est une référence très
            appréciable dans ce domaine.
          </p>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <TeamSection image="/images/team2.png" />

    <!-- Testimonials Section -->
    <TestimonialsSection />
  </div>
</template>

<script setup>
import { BreadcrumbSection, CtaSection, TeamSection, TestimonialsSection } from '@/components/public'

const ctaTitle = "L'élaboration des examens mesurant la compétence du pré-embauche"
const ctaDescription = "À la demande des dirigeants d'entreprises, \"Formation électro Inc.\" élabore des examens théoriques et pratiques dans le but d'évaluer la compétence des éventuels candidats à l'embauche."
</script>

<style scoped src="@/assets/styles/about.scoped.css"></style>
