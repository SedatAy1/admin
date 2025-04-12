<template>
  <div class="general-settings">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title mb-4">Genel Ayarlar</h5>

        <!-- Para Birimi Gösterimi -->
        <div class="mb-3">
          <label class="form-label">Para Birimi Gösterimi</label>
          <select v-model="form.currencyFormat" class="form-select">
            <option value="eur">X.XXX,XX (13.232,99 TL)</option>
            <option value="usd">X,XXX.XX (13,232.99 TL)</option>
          </select>
        </div>

        <!-- Ondalık Basamak Sayısı -->
        <div class="mb-3">
          <label class="form-label">Ondalık Basamak Sayısı</label>
          <input type="number" v-model="form.decimalPlaces" class="form-control" />
        </div>

        <!-- Sadece Üye Erişimi ve Telefon Zorunluluğu -->
        <div class="form-check form-switch mb-3">
          <input class="form-check-input" type="checkbox" v-model="form.membersOnly" />
          <label class="form-check-label">Sadece Üye Erişimi</label>
        </div>

        <div class="form-check form-switch mb-3">
          <input class="form-check-input" type="checkbox" v-model="form.phoneRequired" />
          <label class="form-check-label">Telefon Zorunluluğu</label>
        </div>

        <!-- Diğer input alanları -->
        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">Müşteri Hizmetleri</label>
            <input type="text" v-model="form.supportPhone" class="form-control" />
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">E-Mail</label>
            <input type="email" v-model="form.email" class="form-control" />
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">WhatsApp</label>
            <input type="text" v-model="form.whatsapp" class="form-control" />
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Google Merchant Mağaza Kodu</label>
            <input type="text" v-model="form.googleMerchant" class="form-control" />
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Facebook</label>
            <input type="text" v-model="form.facebook" class="form-control" />
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Instagram</label>
            <input type="text" v-model="form.instagram" class="form-control" />
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Youtube</label>
            <input type="text" v-model="form.youtube" class="form-control" />
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Twitter (X)</label>
            <input type="text" v-model="form.twitter" class="form-control" />
          </div>
        </div>

        <!-- App ve Play Store -->
        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">App Store</label>
            <input type="text" v-model="form.appStore" class="form-control" />
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Play Store</label>
            <input type="text" v-model="form.playStore" class="form-control" />
          </div>
        </div>

        <!-- Google Maps -->
        <div class="mb-3">
          <label class="form-label">Google Maps Kodu</label>
          <textarea v-model="form.mapsCode" class="form-control" rows="3"></textarea>
        </div>

        <!-- Footer Alanı -->
        <div class="mb-3">
          <label class="form-label">Footer</label>
          <textarea v-model="form.footer" class="form-control" rows="4"></textarea>
        </div>

        <!-- Footer İletişim Bilgisi -->
        <div class="mb-3">
          <label class="form-label">Footer İletişim Bilgisi</label>
          <textarea v-model="form.footerContact" class="form-control" rows="3"></textarea>
        </div>

        <!-- Kaydet Butonu -->
        <div class="text-end">
          <button class="btn btn-primary" @click="saveSettings">✓ Kaydet</button>
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

const saveSettings = () => {
  console.log('Kaydedilen Ayarlar:', form)
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
