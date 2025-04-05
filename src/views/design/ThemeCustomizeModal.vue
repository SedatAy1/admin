<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal">
      <!-- Header -->
      <div class="modal-header">
        <h3>Özel Ayarlar</h3>
        <button class="close-btn" @click="$emit('close')">✕</button>
      </div>

      <!-- Tabs -->
      <div class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab"
          :class="{ active: activeTab === tab }"
          @click="activeTab = tab"
        >
          {{ tabLabels[tab] }}
        </button>
      </div>

      <!-- Content -->
      <div class="tab-content">
        <!-- Genel Bilgiler -->
        <div v-if="activeTab === 'genel'" class="grid grid-cols-2 gap-4">
          <div>
            <label>Üst Menü Limiti</label>
            <input v-model="form.topMenuLimit" type="number" />
          </div>
          <div class="toggle-row">
            <label>Footer Pazaryeri Linkleri</label>
            <input type="checkbox" v-model="form.footerLinks" />
          </div>

          <div>
            <label>Footer Menü Limiti</label>
            <input v-model="form.footerMenuLimit" type="number" />
          </div>
          <div class="toggle-row">
            <label>Whatsapp Butonu</label>
            <input type="checkbox" v-model="form.whatsappButton" />
          </div>

          <div>
            <label>Whatsapp Metini</label>
            <input v-model="form.whatsappText" type="text" />
          </div>
          <div class="toggle-row">
            <label>Lazy Load eklentisi</label>
            <input type="checkbox" v-model="form.lazyLoad" />
          </div>

          <div>
            <label>Lazy Load Efekt Süresi</label>
            <input v-model="form.lazyDelay" type="number" />
          </div>
        </div>

        <!-- Ürün Kartı -->
        <div v-else-if="activeTab === 'kart'" class="grid grid-cols-2 gap-4">
          <div class="toggle-row">
            <label>Değerlendirme Yıldızları</label>
            <input type="checkbox" v-model="form.reviewStars" />
          </div>
          <div class="toggle-row">
            <label>Sepete Ekle Butonu</label>
            <input type="checkbox" v-model="form.addToCartButton" />
          </div>
        </div>

        <!-- Ürün Detay -->
        <div v-else-if="activeTab === 'detay'" class="grid grid-cols-2 gap-4">
          <div v-for="option in productDetailOptions" :key="option.key" class="toggle-row">
            <label>{{ option.label }}</label>
            <input type="checkbox" v-model="form.productDetails[option.key]" />
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="modal-footer">
        <button class="save-btn" @click="handleSave">✓ Kaydet</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const props = defineProps({
  visible: { type: Boolean, default: false }
})

const emit = defineEmits(['close'])

const activeTab = ref('genel')

const tabs = ['genel', 'kart', 'detay']
const tabLabels = {
  genel: 'Genel Bilgiler',
  kart: 'Ürün Kartı',
  detay: 'Ürün Detay'
}

const form = reactive({
  topMenuLimit: 7,
  footerMenuLimit: 10,
  whatsappButton: true,
  whatsappText: 'Ürünleriniz hakkında detaylı bilgi almak istiyorum.',
  footerLinks: false,
  lazyLoad: true,
  lazyDelay: 200,

  reviewStars: false,
  addToCartButton: true,

  productDetails: {
    stars: false,
    code: false,
    barcode: false,
    brand: true,
    category: true,
    stock: true,
    related: true,
    buyNow: true,
    localLogo: true,
    fastShipping: true,
    secureLabel: true,
    returnLabel: false,
    freeShipping: false,
    socialButtons: true,
    whatsappOrder: true,
    favorites: true,
    profileAttributes: false,
    descriptionAttributes: false,
    sizeBanner: false
  }
})

const productDetailOptions = [
  { key: 'stars', label: 'Değerlendirme Yıldızları' },
  { key: 'code', label: 'Ürün Kodu' },
  { key: 'barcode', label: 'Barkod' },
  { key: 'brand', label: 'Marka' },
  { key: 'category', label: 'Kategori' },
  { key: 'stock', label: 'Stok Miktarı' },
  { key: 'related', label: 'İlişkili Ürünler' },
  { key: 'buyNow', label: 'Hemen Al Butonu' },
  { key: 'localLogo', label: 'Yerli Üretim Logosu' },
  { key: 'fastShipping', label: 'Hızlı Gönderi Etiketi' },
  { key: 'secureLabel', label: 'Güvenli Alışveriş Etiketi' },
  { key: 'returnLabel', label: 'İade ve Değişim Etiketi' },
  { key: 'freeShipping', label: 'Ücretsiz Kargo Etiketi' },
  { key: 'socialButtons', label: 'Sosyal Medya Butonları' },
  { key: 'whatsappOrder', label: 'Whatsapp ile Sipariş Ver Butonu' },
  { key: 'favorites', label: 'Favorilerime Ekle Butonu' },
  { key: 'profileAttributes', label: 'Ürün Profilinde Nitelikler' },
  { key: 'descriptionAttributes', label: 'Ürün Açıklamasında Nitelikler' },
  { key: 'sizeBanner', label: 'Beden, Ölçü Banner Grubu' }
]

const handleSave = () => {
  console.log('Kaydedilen Ayarlar:', JSON.parse(JSON.stringify(form)))
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Daha koyu yap, şeffaflık artırıldı */
  z-index: 99998 !important; /* Üst katmanda olsun */
  display: flex !important; /* Emin olmak için */
  justify-content: center;
  align-items: center;
  visibility: visible !important; /* Eğer gizliyse göster */
}

/* Modal İçeriği */
.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 500px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 99999 !important; /* Modal her şeyin üstünde olsun */
  display: block !important; /* Eğer hala görünmüyorsa, ekle */
  position: relative;
  transform: translateY(0); /* Modal kaybolmasın */
  opacity: 1 !important;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1e3a8a;
  color: white;
  padding: 12px 16px;
  border-radius: 6px;
  margin-bottom: 16px;
}

.close-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}

.tabs button {
  background-color: #f1f5f9;
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  font-weight: 500;
  cursor: pointer;
}

.tabs button.active {
  background-color: white;
  border: 1px solid #cbd5e1;
}

.tab-content label {
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
}

.tab-content input[type="text"],
.tab-content input[type="number"] {
  width: 100%;
  padding: 6px 10px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
}

.toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-footer {
  text-align: right;
  margin-top: 20px;
}

.save-btn {
  background-color: #3b82f6;
  color: white;
  padding: 10px 18px;
  border-radius: 6px;
  border: none;
  font-weight: 500;
}
</style>