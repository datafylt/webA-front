<template>
  <div class="about-page fe-page">
    <!-- Breadcrumb -->
    <BreadcrumbSection title="À Propos De Nous" />

    <!-- About Content Section 1 -->
    <section class="about-section">
      <div class="fe-container">
        <div class="about-grid">
          <div class="about-text fe-content">
            <h2>Notre Histoire</h2>
            <p class="fe-text-justify">
              Depuis plus de trois décennies, Formation Électro Inc. se distingue comme 
              un leader dans la formation professionnelle en électricité au Québec. Notre 
              entreprise a accompagné des milliers de candidats vers la réussite de leurs 
              examens de qualification, contribuant ainsi à l'excellence de la main-d'œuvre 
              québécoise dans le secteur de l'électricité.
            </p>

            <h2>Le Fondateur</h2>
            <p class="fe-text-justify">
              Yvan Dumais est maître électricien et le fondateur de Formation Électro Inc. 
              Il détient un certificat de qualification d'électricien interprovincial ainsi 
              qu'un brevet d'enseignement en électrotechnique du ministère de l'Éducation 
              du Québec. Il est également formateur certifié en santé et sécurité dans le 
              milieu du travail.
            </p>
            <p class="fe-text-justify">
              Après une carrière de plus de 10 ans comme électricien professionnel sur le 
              terrain, M. Dumais a consacré les 25 années suivantes à l'enseignement de 
              l'électrotechnique. En 1992, animé par sa passion pour la transmission du 
              savoir, il a fondé l'entreprise "Formation Électro Inc." avec la mission 
              d'offrir une formation de qualité supérieure aux futurs électriciens du Québec.
            </p>
            <p class="fe-text-justify">
              Au fil des années, M. Dumais a partagé son expertise et son savoir-faire avec 
              M. Mahmad Sabhir Pheerunggee, qui est aujourd'hui instructeur principal et 
              associé de l'entreprise.
            </p>

            <h2>Notre Expertise</h2>
            <p class="fe-text-justify">
              Fort de cette longue expérience pratique et de connaissances théoriques 
              approfondies, notre équipe a développé des programmes de formation complets 
              et structurés. Ces programmes sont spécifiquement conçus pour aider les 
              apprentis électriciens à maîtriser les notions essentielles et à réussir 
              leurs examens de qualification.
            </p>
            <p class="fe-text-justify">
              Nos formations couvrent notamment la préparation au test de compagnon 
              électricien (Licence C) pour la construction et hors construction, ainsi 
              que le test d'électricien interprovincial (Sceau Rouge). Nous offrons 
              également des formations pour les examens de maîtres électriciens et de 
              constructeurs propriétaires (RBQ).
            </p>
          </div>
          <div class="about-images">
            <div class="about-img">
              <img src="/images/team4.png" alt="Yvan Dumais - Fondateur" />
            </div>
            <div class="about-img">
              <img src="/images/aboutUs.png" alt="Formation Électro - Nos installations" />
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
          <h2>Expansion en 2008</h2>
          <p class="fe-text-justify">
            En 2008, Formation Électro Inc. a élargi son offre de services en développant 
            un programme de formation pour les futurs compagnons en connexions restreintes 
            d'appareillage électrique (RCA). Cette initiative répondait à la nouvelle 
            accessibilité offerte par Emploi Québec et ses partenaires, permettant aux 
            travailleurs québécois d'obtenir le certificat de compagnon en connexions 
            restreintes d'appareillage électrique.
          </p>

          <h2>Nos Services</h2>
          <p class="fe-text-justify">
            Aujourd'hui, Formation Électro Inc. dispense une gamme complète de formations 
            pratiques et théoriques adaptées aux besoins de l'industrie. Notre offre comprend :
          </p>
          <ul class="fe-list">
            <li>Contrôle de moteurs électriques</li>
            <li>Installation et contrôle de systèmes de chauffage et de climatisation</li>
            <li>Installation et contrôle de systèmes d'éclairage</li>
            <li>Installation de transformateurs monophasés et triphasés</li>
            <li>Lecture de plans et devis électriques</li>
            <li>Interprétation de croquis et schémas</li>
            <li>Élaboration d'examens pré-embauche théoriques et pratiques</li>
          </ul>

          <h2>Notre Engagement</h2>
          <p class="fe-text-justify">
            Formation Électro Inc. est officiellement reconnue par Emploi Québec 
            (No. d'agrément : 0055420). Cette reconnaissance témoigne de la qualité 
            de nos formations et de notre engagement envers l'excellence.
          </p>
          <p class="fe-text-justify">
            Que vous soyez un apprenti électricien, un professionnel cherchant à 
            obtenir une nouvelle qualification, ou une entreprise souhaitant former 
            son personnel, Formation Électro Inc. peut répondre à tous vos besoins 
            de formation en électricité. Nous sommes fiers d'être une référence 
            incontournable dans ce domaine au Québec.
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

const ctaTitle = "Examens de compétence pour le pré-embauche"
const ctaDescription = "À la demande des dirigeants d'entreprises, Formation Électro Inc. élabore des examens théoriques et pratiques personnalisés afin d'évaluer rigoureusement les compétences des candidats à l'embauche dans le domaine de l'électricité."
</script>

<style scoped src="@/assets/styles/about.scoped.css"></style>
