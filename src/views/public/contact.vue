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
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2792.8661882225775!2d-73.78451368444144!3d45.62281797910291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc923b55e7f3d0b%3A0x2c8d7c21b7f7e8a9!2s255%20Bd%20Cur%C3%A9-Labelle%2C%20Laval%2C%20QC%20H7L%202Z9!5e0!3m2!1sen!2sca!4v1629390374659!5m2!1sen!2sca"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
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
