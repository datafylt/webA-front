<template>
  <div class="contact-page">
    <!-- Breadcrumb -->
    <section class="breadcrumb-section">
      <div class="container">
        <h1>Contactez-nous</h1>
        <nav class="breadcrumb">
          <router-link to="/">Accueil</router-link>
          <span>/</span>
          <span>Contactez-nous</span>
        </nav>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="contact-content">
      <div class="container">
        <div class="contact-grid">
          <!-- Contact Form -->
          <div class="contact-form-wrapper">
            <h2>Envoyez-nous un message</h2>
            <form @submit.prevent="handleSubmit" class="contact-form">
              <div class="form-row">
                <div class="form-group">
                  <label for="firstName">Prénom *</label>
                  <input
                    type="text"
                    id="firstName"
                    v-model="form.firstName"
                    required
                    placeholder="Votre prénom"
                  />
                </div>
                <div class="form-group">
                  <label for="lastName">Nom *</label>
                  <input
                    type="text"
                    id="lastName"
                    v-model="form.lastName"
                    required
                    placeholder="Votre nom"
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="email">Courriel *</label>
                <input
                  type="email"
                  id="email"
                  v-model="form.email"
                  required
                  placeholder="votre@courriel.com"
                />
              </div>

              <div class="form-group">
                <label for="phone">Téléphone</label>
                <input
                  type="tel"
                  id="phone"
                  v-model="form.phone"
                  placeholder="(514) 123-4567"
                />
              </div>

              <div class="form-group">
                <label for="subject">Sujet *</label>
                <select id="subject" v-model="form.subject" required>
                  <option value="">Sélectionnez un sujet</option>
                  <option value="inscription">Inscription à un programme</option>
                  <option value="information">Demande d'information</option>
                  <option value="entreprise">Formation en entreprise</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div class="form-group">
                <label for="message">Message *</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  required
                  rows="5"
                  placeholder="Votre message..."
                ></textarea>
              </div>

              <button type="submit" class="btn-submit" :disabled="submitting">
                {{ submitting ? 'Envoi en cours...' : 'Envoyer le message' }}
              </button>
            </form>
          </div>

          <!-- Contact Info -->
          <div class="contact-info">
            <div class="info-card">
              <h3>Nos coordonnées</h3>

              <div class="info-item">
                <span class="info-icon">📍</span>
                <div class="info-text">
                  <strong>Adresse</strong>
                  <p>255 Boulevard Curé-Labelle<br>Sainte-Rose, Laval, QC H7L-2R9<br>Bureau 05</p>
                </div>
              </div>

              <div class="info-item">
                <span class="info-icon">📞</span>
                <div class="info-text">
                  <strong>Téléphone</strong>
                  <p><a href="tel:+15146054275">+1-514-605-4275</a></p>
                </div>
              </div>

              <div class="info-item">
                <span class="info-icon">✉️</span>
                <div class="info-text">
                  <strong>Courriel</strong>
                  <p><a href="mailto:info@formationelectro.com">info@formationelectro.com</a></p>
                </div>
              </div>

              <div class="info-item">
                <span class="info-icon">🕐</span>
                <div class="info-text">
                  <strong>Heures d'ouverture</strong>
                  <p>Lun - Sam: 9:00 a.m. - 6:00 p.m.<br>Dimanche: Fermé</p>
                </div>
              </div>
            </div>

            <!-- Map -->
            <div class="map-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2792.5!2d-73.7!3d45.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDM2JzAwLjAiTiA3M8KwNDInMDAuMCJX!5e0!3m2!1sen!2sca!4v1234567890"
                width="100%"
                height="250"
                style="border:0; filter: grayscale(1);"
                allowfullscreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const submitting = ref(false)

const handleSubmit = async () => {
  submitting.value = true

  try {
    // TODO: Implement actual form submission
    console.log('Form submitted:', form.value)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    alert('Merci! Votre message a été envoyé avec succès.')

    // Reset form
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }
  } catch (error) {
    alert('Une erreur est survenue. Veuillez réessayer.')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.contact-page {
  width: 100%;
}

.breadcrumb-section {
  background: linear-gradient(rgba(0, 43, 83, 0.9), rgba(0, 43, 83, 0.9)), url('/images/about-us.jpg');
  background-size: cover;
  background-position: center;
  padding: 80px 0;
  text-align: center;
}

.breadcrumb-section h1 {
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 15px;
}

.breadcrumb {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.8);
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

.contact-content {
  padding: 80px 0;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 50px;
}

/* Contact Form */
.contact-form-wrapper h2 {
  font-family: 'Roboto', sans-serif;
  font-size: 28px;
  font-weight: 600;
  color: #002b53;
  margin-bottom: 30px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  font-size: 14px;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #0277BC;
}

.form-group textarea {
  resize: vertical;
}

.btn-submit {
  width: 100%;
  padding: 15px 30px;
  background: #0277BC;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-submit:hover {
  background: #002b53;
}

.btn-submit:disabled {
  background: #999;
  cursor: not-allowed;
}

/* Contact Info */
.info-card {
  background: #f8f8f8;
  padding: 30px;
  border-radius: 8px;
  margin-bottom: 30px;
}

.info-card h3 {
  font-family: 'Roboto', sans-serif;
  font-size: 22px;
  font-weight: 600;
  color: #002b53;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid #0277BC;
}

.info-item {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.info-text strong {
  display: block;
  color: #002b53;
  margin-bottom: 5px;
}

.info-text p {
  color: #666;
  margin: 0;
  line-height: 1.6;
}

.info-text a {
  color: #0277BC;
  text-decoration: none;
}

.info-text a:hover {
  text-decoration: underline;
}

.map-wrapper {
  border-radius: 8px;
  overflow: hidden;
}

@media (max-width: 991px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .contact-info {
    order: -1;
  }
}

@media (max-width: 767px) {
  .breadcrumb-section h1 {
    font-size: 32px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>