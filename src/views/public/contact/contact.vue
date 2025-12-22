<template>
  <div class="contact-page fe-page">
    <!-- Breadcrumb -->
    <BreadcrumbSection title="Contactez-nous" />

    <!-- Contact Content -->
    <section class="contact-section">
      <div class="fe-container">
        <div class="contact-grid">
          <!-- Contact Form -->
          <div class="contact-form-wrapper">
            <h2>Envoyez-nous un message</h2>
            
            <div v-if="submitStatus === 'success'" class="fe-alert fe-alert-success">
              Votre message a été envoyé avec succès! Nous vous répondrons bientôt.
            </div>
            
            <div v-if="submitStatus === 'error'" class="fe-alert fe-alert-error">
              Une erreur s'est produite. Veuillez réessayer.
            </div>

            <form @submit.prevent="handleSubmit" class="contact-form">
              <div class="form-row">
                <div class="fe-form-group">
                  <input 
                    v-model="form.name"
                    type="text" 
                    class="fe-form-control" 
                    placeholder="Votre nom *"
                    required
                  />
                </div>
                <div class="fe-form-group">
                  <input 
                    v-model="form.email"
                    type="email" 
                    class="fe-form-control" 
                    placeholder="Votre courriel *"
                    required
                  />
                </div>
              </div>
              
              <div class="fe-form-group">
                <input 
                  v-model="form.phone"
                  type="tel" 
                  class="fe-form-control" 
                  placeholder="Votre téléphone"
                />
              </div>
              
              <div class="fe-form-group">
                <input 
                  v-model="form.subject"
                  type="text" 
                  class="fe-form-control" 
                  placeholder="Sujet *"
                  required
                />
              </div>
              
              <div class="fe-form-group">
                <textarea 
                  v-model="form.message"
                  class="fe-form-control" 
                  placeholder="Votre message *"
                  rows="5"
                  required
                ></textarea>
              </div>
              
              <button type="submit" class="fe-btn fe-btn-primary" :disabled="isSubmitting">
                {{ isSubmitting ? 'Envoi en cours...' : 'Envoyer le message' }}
              </button>
            </form>
          </div>

          <!-- Contact Info -->
          <div class="contact-info-wrapper">
            <h2>Informations de contact</h2>
            
            <ul class="fe-contact-info">
              <li>
                <div class="fe-contact-icon">📍</div>
                <div class="fe-contact-text">
                  <h5>Adresse</h5>
                  <p>4030 Boulevard de la Côte-Vertu, Saint-Laurent, QC H4R 1V4, Bureau 05</p>
                </div>
              </li>
              <li>
                <div class="fe-contact-icon">📞</div>
                <div class="fe-contact-text">
                  <h5>Téléphone</h5>
                  <p><a href="tel:+15146054275">+1-514-605-4275</a></p>
                </div>
              </li>
              <li>
                <div class="fe-contact-icon">✉️</div>
                <div class="fe-contact-text">
                  <h5>Courriel</h5>
                  <p><a href="mailto:info@formationelectro.com">info@formationelectro.com</a></p>
                </div>
              </li>
              <li>
                <div class="fe-contact-icon">🕐</div>
                <div class="fe-contact-text">
                  <h5>Heures d'ouverture</h5>
                  <p>Lun - Sam: 9:00 - 18:00<br>Dimanche: Fermé</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="map-section">
      <div class="fe-container">
        <div class="fe-map">
          <iframe src="https://www.google.com/maps/embed?pb=!3m2!1sen!2sca!4v1765714224174!5m2!1sen!2sca!6m8!1m7!1sF83YVRY85DkQ9QtbeU8EeQ!2m2!1d45.49021950677504!2d-73.71201116423835!3f95.62472654195415!4f3.336125693412427!5f0.7820865974627469" width="800" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { BreadcrumbSection } from '@/components/public'

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submitStatus = ref(null)

const handleSubmit = async () => {
  isSubmitting.value = true
  submitStatus.value = null
  
  try {
    await new Promise(resolve => setTimeout(resolve, 1500))
    Object.keys(form).forEach(key => form[key] = '')
    submitStatus.value = 'success'
  } catch (error) {
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped src="@/assets/styles/contact.scoped.css"></style>
