<template>
  <MarketLayout>
    <div class="accounting-container">
      <h2 class="section-title">{{ $t('accounting.sectionTitles.active') }}</h2>
      <p class="section-subtitle">{{ $t('accounting.subtitles.active') }}</p>

      <div class="integration-list">
        <div v-for="integration in activeIntegrations" :key="integration.id" class="integration-card">
          <img :src="integration.logo" :alt="integration.name" class="integration-logo" />
          <div class="integration-info">
            <h3>{{ integration.name }}</h3>
            <p>{{ $t(`accounting.activeIntegrations.${integration.key}`) }}</p>
          </div>
          <button class="button-secondary">{{ $t('accounting.moduleName') }}</button>
          <button class="button-primary" @click="openSettings(integration)">{{ $t('common.settings') }}</button>
        </div>
      </div>

      <h2 class="section-title">{{ $t('accounting.sectionTitles.inactive') }}</h2>
      <p class="section-subtitle">{{ $t('accounting.subtitles.inactive') }}</p>

      <div class="integration-list">
        <div v-for="integration in inactiveIntegrations" :key="integration.id" class="integration-card">
          <img :src="integration.logo" :alt="integration.name" class="integration-logo" />
          <div class="integration-info">
            <h3>{{ integration.name }}</h3>
            <p>{{ $t(`accounting.inactiveIntegrations.${integration.key}`) }}</p>
          </div>
          <button class="button-secondary">{{ $t('accounting.moduleName') }}</button>
          <button class="button-success" @click="activateIntegration(integration)">{{ $t('common.activate') }}</button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="modalOpen" class="modal-overlay">
      <div class="modal-content">
        <h2>{{ selectedIntegration.name }} {{ $t('common.settings') }}</h2>
        <form @submit.prevent="saveSettings">
          <div v-for="field in formFields" :key="field.key" class="form-group">
            <label>{{ $t(`accounting.fields.${field.key}`) }}</label>
            <input v-model="settings[field.key]" :type="field.type" />
          </div>
          <button class="button-primary" type="submit">{{ $t('common.save') }}</button>
          <button class="button-secondary" @click="closeModal">{{ $t('common.cancel') }}</button>
        </form>
      </div>
    </div>
  </MarketLayout>
</template>

<script>
import MarketLayout from '@/views/integrations/MarketLayout.vue';

export default {
  components: {
    MarketLayout,
  },
  data() {
    return {
      activeIntegrations: [
        {
          id: 1,
          name: 'E-Fatura',
          logo: 'efatura.png',
          key: 'efatura'
        },
        {
          id: 2,
          name: 'Netsis (Logo) Muhasebe',
          logo: 'netsis.png',
          key: 'netsis'
        }
      ],
      inactiveIntegrations: [
        {
          id: 3,
          name: 'Muhasebe B2B',
          logo: 'b2b.png',
          key: 'b2b'
        },
        {
          id: 4,
          name: 'Nebim Muhasebe',
          logo: 'nebim.png',
          key: 'nebim'
        }
      ],
      modalOpen: false,
      selectedIntegration: {},
      settings: {},
      formFields: [
        { key: 'apiUser', label: 'API Kullanıcı Adı', type: 'text' },
        { key: 'apiPassword', label: 'API Şifre', type: 'password' },
        { key: 'companyName', label: 'Firma Ünvanı', type: 'text' },
        { key: 'companyAddress', label: 'Firma Adresi', type: 'text' },
        { key: 'ownerName', label: 'Firma Sahibi Adı', type: 'text' },
        { key: 'ownerSurname', label: 'Firma Sahibi Soyadı', type: 'text' },
        { key: 'city', label: 'İl', type: 'text' },
        { key: 'district', label: 'İlçe', type: 'text' },
        { key: 'phone', label: 'Telefon', type: 'tel' },
        { key: 'website', label: 'Web Sitesi', type: 'url' },
        { key: 'taxNumber', label: 'VKN/TCKN', type: 'text' },
        { key: 'email', label: 'E-Posta', type: 'email' }
      ]
    };
  },
  methods: {
    openSettings(integration) {
      this.selectedIntegration = integration;
      this.modalOpen = true;
    },
    closeModal() {
      this.modalOpen = false;
    },
    saveSettings() {
      console.log('Ayarlar Kaydedildi:', this.settings);
      this.closeModal();
    },
    activateIntegration(integration) {
      console.log(`${integration.name} etkinleştirildi.`);
    }
  }
};
</script>

<style scoped>
.accounting-container {
  padding: 40px;
  max-width: 1200px;
  margin: auto;
  background: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

html.dark .accounting-container {
  background: #1e1e2f;
  color: #f1f1f1;
}

.section-title {
  font-size: 26px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  text-align: center;
}
html.dark .section-title {
  color: #ffffff;
}

.section-subtitle {
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
  text-align: center;
}
html.dark .section-subtitle {
  color: #bbbbbb;
}

.integration-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  padding: 10px;
}

.integration-card {
  background: white;
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease-in-out;
  border: 2px solid transparent;
}
.integration-card:hover {
  transform: scale(1.05);
  border-color: #007bff;
}
html.dark .integration-card {
  background: #2a2a40;
  color: #f1f1f1;
}

.integration-logo {
  width: 90px;
  height: 90px;
  margin-bottom: 15px;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.button-primary {
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  transition: all 0.3s ease;
}
.button-primary:hover {
  background: linear-gradient(135deg, #0056b3, #004494);
}
.button-secondary {
  background: linear-gradient(135deg, #6c757d, #495057);
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  transition: all 0.3s ease;
}
.button-secondary:hover {
  background: linear-gradient(135deg, #495057, #343a40);
}
.button-success {
  background: linear-gradient(135deg, #28a745, #1e7e34);
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  transition: all 0.3s ease;
}
.button-success:hover {
  background: linear-gradient(135deg, #1e7e34, #155d27);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease-in-out;
  padding: 1rem;
}

.modal-overlay::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.modal-overlay:hover {
  cursor: pointer;
}

.modal-content {
  background: white;
  padding: 25px;
  border-radius: 12px;
  width: 100%;
  max-width: 420px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  position: relative;
  animation: slideIn 0.3s ease-in-out;
  cursor: default;
}

html.dark .modal-content {
  background: #2c2c3c;
  color: #ffffff;
}

.modal-content h2 {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}
html.dark .modal-content h2 {
  color: #ffffff;
}

.modal-content .form-group {
  margin-bottom: 10px;
  text-align: left;
}
.modal-content label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #555;
  margin-bottom: 5px;
}
html.dark .modal-content label {
  color: #ddd;
}

.modal-content input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s ease;
}
.modal-content input:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
html.dark .modal-content input {
  background-color: #3a3a4a;
  border-color: #555;
  color: #f1f1f1;
}
html.dark .modal-content input::placeholder {
  color: #bbb;
}

/* Animasyonlar */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes slideIn {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* Responsive */
@media (max-width: 576px) {
  .integration-list {
    grid-template-columns: 1fr !important;
  }
  .modal-content {
    padding: 20px;
  }
}
</style>
