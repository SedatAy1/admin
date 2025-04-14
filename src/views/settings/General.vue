<template>
  <div class="general-settings">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title mb-4">{{ $t('general.title') }}</h5>

        <!-- Para Birimi Gösterimi -->
        <div class="mb-3">
          <label class="form-label">{{ $t('general.currencyFormat') }}</label>
          <select v-model="form.currencyFormat" class="form-select">
            <option value="eur">X.XXX,XX (13.232,99 TL)</option>
            <option value="usd">X,XXX.XX (13,232.99 TL)</option>
          </select>
        </div>

        <!-- Ondalık Basamak Sayısı -->
        <div class="mb-3">
          <label class="form-label">{{ $t('general.decimalPlaces') }}</label>
          <input type="number" v-model="form.decimalPlaces" class="form-control" />
        </div>

        <!-- Sadece Üye Erişimi ve Telefon Zorunluluğu -->
        <div class="form-check form-switch mb-3">
          <input class="form-check-input" type="checkbox" v-model="form.membersOnly" />
          <label class="form-check-label">{{ $t('general.membersOnly') }}</label>
        </div>

        <div class="form-check form-switch mb-3">
          <input class="form-check-input" type="checkbox" v-model="form.phoneRequired" />
          <label class="form-check-label">{{ $t('general.phoneRequired') }}</label>
        </div>

        <!-- Diğer input alanları -->
        <div class="row">
          <div class="col-md-6 mb-3" v-for="field in fields" :key="field.key">
            <label class="form-label">{{ $t(field.label) }}</label>
            <input :type="field.type" v-model="form[field.key]" class="form-control" />
          </div>
        </div>

        <!-- App Store & Play Store -->
        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">{{ $t('general.appStore') }}</label>
            <input type="text" v-model="form.appStore" class="form-control" />
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">{{ $t('general.playStore') }}</label>
            <input type="text" v-model="form.playStore" class="form-control" />
          </div>
        </div>

        <!-- Google Maps -->
        <div class="mb-3">
          <label class="form-label">{{ $t('general.mapsCode') }}</label>
          <textarea v-model="form.mapsCode" class="form-control" rows="3"></textarea>
        </div>

        <!-- Footer -->
        <div class="mb-3">
          <label class="form-label">{{ $t('general.footer') }}</label>
          <textarea v-model="form.footer" class="form-control" rows="4"></textarea>
        </div>

        <!-- Footer İletişim -->
        <div class="mb-3">
          <label class="form-label">{{ $t('general.footerContact') }}</label>
          <textarea v-model="form.footerContact" class="form-control" rows="3"></textarea>
        </div>

        <div class="text-end">
          <button class="btn btn-primary" @click="saveSettings">✓ {{ $t('general.save') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  currencyFormat: 'eur',
  decimalPlaces: 2,
  membersOnly: false,
  phoneRequired: false,
  supportPhone: '',
  email: '',
  whatsapp: '',
  googleMerchant: '',
  facebook: '',
  instagram: '',
  youtube: '',
  twitter: '',
  appStore: '',
  playStore: '',
  mapsCode: '',
  footer: '',
  footerContact: ''
})

const fields = [
  { key: 'supportPhone', label: 'general.supportPhone', type: 'text' },
  { key: 'email', label: 'general.email', type: 'email' },
  { key: 'whatsapp', label: 'general.whatsapp', type: 'text' },
  { key: 'googleMerchant', label: 'general.googleMerchant', type: 'text' },
  { key: 'facebook', label: 'general.facebook', type: 'text' },
  { key: 'instagram', label: 'general.instagram', type: 'text' },
  { key: 'youtube', label: 'general.youtube', type: 'text' },
  { key: 'twitter', label: 'general.twitter', type: 'text' }
]

const saveSettings = () => {
  alert('Ayarlar başarıyla kaydedildi.')
}
</script>
<style scoped>
.general-settings {
  padding: 30px;
  background-color: #f8fafc;
  transition: background-color 0.3s ease;
}
html.dark .general-settings {
  background-color: #1e1e1e;
}

/* Kart */
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  padding: 24px;
  transition: background-color 0.3s ease, color 0.3s ease;
}
html.dark .card {
  background: #2c2c2c;
  color: #f1f1f1;
}

/* Başlık */
.card-title {
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 16px;
}
html.dark .card-title {
  color: #f1f1f1;
}

/* Responsive */
@media (max-width: 600px) {
  .general-settings {
    padding: 20px;
  }

  .card {
    padding: 18px;
  }

  .card-title {
    font-size: 18px;
  }
}
</style>
<style scoped>
.general-settings {
  padding: 30px;
  background-color: #f8fafc;
}
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}
.card-title {
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
}
</style>
