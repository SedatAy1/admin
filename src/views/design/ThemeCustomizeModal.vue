<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal">
      <!-- Header -->
      <div class="modal-header">
        <h3>{{ $t('customModal.title') }}</h3>
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
          {{ $t(`customModal.tabs.${tab}`) }}
        </button>
      </div>

      <!-- Content -->
      <div class="tab-content">
        <!-- Genel Bilgiler -->
        <div v-if="activeTab === 'genel'" class="grid grid-cols-2 gap-4">
          <div>
            <label>{{ $t('customModal.fields.topMenuLimit') }}</label>
            <input v-model="form.topMenuLimit" type="number" />
          </div>
          <div class="toggle-row">
            <label>{{ $t('customModal.fields.footerLinks') }}</label>
            <input type="checkbox" v-model="form.footerLinks" />
          </div>

          <div>
            <label>{{ $t('customModal.fields.footerMenuLimit') }}</label>
            <input v-model="form.footerMenuLimit" type="number" />
          </div>
          <div class="toggle-row">
            <label>{{ $t('customModal.fields.whatsappButton') }}</label>
            <input type="checkbox" v-model="form.whatsappButton" />
          </div>

          <div>
            <label>{{ $t('customModal.fields.whatsappText') }}</label>
            <input v-model="form.whatsappText" type="text" />
          </div>
          <div class="toggle-row">
            <label>{{ $t('customModal.fields.lazyLoad') }}</label>
            <input type="checkbox" v-model="form.lazyLoad" />
          </div>

          <div>
            <label>{{ $t('customModal.fields.lazyDelay') }}</label>
            <input v-model="form.lazyDelay" type="number" />
          </div>
        </div>

        <!-- Ürün Kartı -->
        <div v-else-if="activeTab === 'kart'" class="grid grid-cols-2 gap-4">
          <div class="toggle-row">
            <label>{{ $t('customModal.fields.reviewStars') }}</label>
            <input type="checkbox" v-model="form.reviewStars" />
          </div>
          <div class="toggle-row">
            <label>{{ $t('customModal.fields.addToCartButton') }}</label>
            <input type="checkbox" v-model="form.addToCartButton" />
          </div>
        </div>

        <!-- Ürün Detay -->
        <div v-else-if="activeTab === 'detay'" class="grid grid-cols-2 gap-4">
          <div
            v-for="option in productDetailOptions"
            :key="option.key"
            class="toggle-row"
          >
            <label>{{ $t(`customModal.fields.productDetails.${option.key}`) }}</label>
            <input type="checkbox" v-model="form.productDetails[option.key]" />
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="modal-footer">
        <button class="save-btn" @click="handleSave">✓ {{ $t('common.save') }}</button>
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
  { key: 'stars' },
  { key: 'code' },
  { key: 'barcode' },
  { key: 'brand' },
  { key: 'category' },
  { key: 'stock' },
  { key: 'related' },
  { key: 'buyNow' },
  { key: 'localLogo' },
  { key: 'fastShipping' },
  { key: 'secureLabel' },
  { key: 'returnLabel' },
  { key: 'freeShipping' },
  { key: 'socialButtons' },
  { key: 'whatsappOrder' },
  { key: 'favorites' },
  { key: 'profileAttributes' },
  { key: 'descriptionAttributes' },
  { key: 'sizeBanner' }
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
  background: rgba(0, 0, 0, 0.5);
  z-index: 99998 !important;
  display: flex !important;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

/* Modal İçeriği */
.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 99999 !important;
  position: relative;
  transform: translateY(0);
  opacity: 1 !important;
}
html.dark .modal {
  background-color: #232323;
  color: #f1f1f1;
}

/* Başlık */
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
html.dark .modal-header {
  background-color: #2563eb;
  color: #fff;
}

.close-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
}

/* Sekmeler */
.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.tabs button {
  background-color: #f1f5f9;
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.tabs button.active {
  background-color: white;
  border: 1px solid #cbd5e1;
}
.tabs button:hover {
  background-color: #e2e8f0;
}
html.dark .tabs button {
  background-color: #2c2c2c;
  color: #f1f1f1;
}
html.dark .tabs button.active {
  background-color: #1f1f1f;
  border: 1px solid #3b82f6;
}
html.dark .tabs button:hover {
  background-color: #3a3a3a;
}

/* İçerik */
.tab-content label {
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
  color: #334155;
}
html.dark .tab-content label {
  color: #cbd5e1;
}

.tab-content input[type="text"],
.tab-content input[type="number"] {
  width: 100%;
  padding: 6px 10px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background-color: #fff;
  color: #1e293b;
  transition: border-color 0.3s ease;
}
.tab-content input:focus {
  border-color: #2563eb;
  outline: none;
}
html.dark .tab-content input {
  background-color: #2c2c2c;
  border-color: #444;
  color: #f1f1f1;
}

/* Toggle satırı */
.toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Footer */
.modal-footer {
  text-align: right;
  margin-top: 20px;
}

/* Kaydet butonu */
.save-btn {
  background-color: #3b82f6;
  color: white;
  padding: 10px 18px;
  border-radius: 6px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.save-btn:hover {
  background-color: #2563eb;
}

/* Responsive */
@media (max-width: 576px) {
  .modal {
    padding: 16px;
  }
  .modal-header {
    padding: 10px 14px;
  }
  .tabs button {
    font-size: 13px;
    padding: 6px 12px;
  }
}
</style>