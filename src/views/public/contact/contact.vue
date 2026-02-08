<template>
  <div class="contact-page fe-page">
    <!-- Language Switcher -->
    <LanguageSwitcher />

    <!-- Breadcrumb -->
    <BreadcrumbSection :title="$t('public.contact.breadcrumb')" />

    <!-- Contact Content -->
    <section class="contact-section">
      <div class="fe-container">
        <div class="contact-grid">
          <!-- Contact Form -->
          <div class="contact-form-wrapper">
            <h2>{{ $t('public.contact.form_title') }}</h2>

            <div v-if="submitStatus === 'success'" class="fe-alert fe-alert-success">
              {{ $t('public.contact.success_message') }}
            </div>

            <div v-if="submitStatus === 'error'" class="fe-alert fe-alert-error">
              {{ $t('public.contact.error_message') }}
            </div>

            <form @submit.prevent="handleSubmit" class="contact-form">
              <div class="form-row">
                <div class="fe-form-group">
                  <input
                    v-model="form.name"
                    type="text"
                    class="fe-form-control"
                    :placeholder="$t('public.contact.name_placeholder')"
                    required
                  />
                </div>
                <div class="fe-form-group">
                  <input
                    v-model="form.email"
                    type="email"
                    class="fe-form-control"
                    :placeholder="$t('public.contact.email_placeholder')"
                    required
                  />
                </div>
              </div>

              <div class="fe-form-group">
                <input
                  v-model="form.phone"
                  type="tel"
                  class="fe-form-control"
                  :placeholder="$t('public.contact.phone_placeholder')"
                />
              </div>

              <div class="fe-form-group">
                <input
                  v-model="form.subject"
                  type="text"
                  class="fe-form-control"
                  :placeholder="$t('public.contact.subject_placeholder')"
                  required
                />
              </div>

              <div class="fe-form-group">
                <textarea
                  v-model="form.message"
                  class="fe-form-control"
                  :placeholder="$t('public.contact.message_placeholder')"
                  rows="5"
                  required
                ></textarea>
              </div>

              <button type="submit" class="fe-btn fe-btn-primary" :disabled="isSubmitting">
                {{ isSubmitting ? $t('public.contact.submitting_button') : $t('public.contact.submit_button') }}
              </button>
            </form>
          </div>

          <!-- Contact Info -->
          <div class="contact-info-wrapper">
            <h2>{{ $t('public.contact.info_title') }}</h2>

            <ul class="fe-contact-info">
              <li>
                <div class="fe-contact-icon">📍</div>
                <div class="fe-contact-text">
                  <h5>{{ $t('public.contact.address_label') }}</h5>
                  <p>{{ $t('public.contact.address') }}</p>
                </div>
              </li>
              <li>
                <div class="fe-contact-icon">📞</div>
                <div class="fe-contact-text">
                  <h5>{{ $t('public.contact.phone_label') }}</h5>
                  <p><a href="tel:+15146054275">+1-514-605-4275</a></p>
                </div>
              </li>
              <li>
                <div class="fe-contact-icon">✉️</div>
                <div class="fe-contact-text">
                  <h5>{{ $t('public.contact.email_label') }}</h5>
                  <p><a href="mailto:info@formationelectro.com">info@formationelectro.com</a></p>
                </div>
              </li>
              <li>
                <div class="fe-contact-icon">🕐</div>
                <div class="fe-contact-text">
                  <h5>{{ $t('public.contact.hours_label') }}</h5>
                  <p v-html="$t('public.contact.hours')"></p>
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
import { BreadcrumbSection, LanguageSwitcher } from '@/components/public'

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
