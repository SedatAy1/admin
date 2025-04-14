<template>
  <div class="shipping-page">
    <h2 class="page-title">{{ $t('shippingCompanies.title') }}</h2>

    <div class="add-box" @click="showAddModal = true">
      <span>＋ {{ $t('shippingCompanies.addNew') }}</span>
    </div>

    <div v-for="company in shippingCompanies" :key="company.id" class="company-card">
      <div class="left">
        <img :src="company.logo" class="logo" />
        <span>{{ company.name }}</span>
      </div>
      <div class="center">
        <button :class="company.active ? 'btn-active' : 'btn-passive'">
          {{ company.active ? $t('common.active') : $t('common.passive') }}
        </button>
        <button class="btn-outline">{{ $t('shippingCompanies.deliveryHours') }}</button>
        <button class="btn-settings" @click="openEditModal(company)">{{ $t('common.settings') }}</button>
      </div>
      <div class="right">0</div>
    </div>

    <!-- Yeni Firma Modali -->
    <div class="modal" v-if="showAddModal">
      <div class="modal-box">
        <div class="modal-header">
          <h3>{{ $t('shippingCompanies.addModal.title') }}</h3>
          <button class="close" @click="showAddModal = false">×</button>
        </div>
        <p class="info-text">{{ $t('shippingCompanies.addModal.description') }}</p>
        <div class="radio-list">
          <label v-for="firm in firmOptions" :key="firm">
            <input type="radio" v-model="selectedFirm" :value="firm" /> {{ firm }}
          </label>
        </div>
        <button class="next-btn" @click="confirmAdd">➡ {{ $t('common.next') }}</button>
      </div>
    </div>

    <!-- Ayarlar Modali -->
    <div class="modal" v-if="showEditModal">
      <div class="modal-box">
        <div class="modal-header">
          <h3>{{ selectedCompany.name }} {{ $t('shippingCompanies.editModal.title') }}</h3>
          <button class="close" @click="showEditModal = false">×</button>
        </div>

        <div class="tabs">
          <button :class="{ active: activeTab === 'genel' }" @click="activeTab = 'genel'">
            ⚙ {{ $t('common.general') }}
          </button>
          <button :class="{ active: activeTab === 'api' }" @click="activeTab = 'api'">
            {{ $t('common.api') }}
          </button>
        </div>

        <div v-if="activeTab === 'genel'" class="form">
          <div class="form-row">
            <label>{{ $t('common.name') }}</label>
            <input v-model="selectedCompany.name" />
            <label>{{ $t('common.status') }}</label>
            <select v-model="selectedCompany.active">
              <option :value="true">{{ $t('common.active') }}</option>
              <option :value="false">{{ $t('common.passive') }}</option>
            </select>
          </div>
          <div class="form-row">
            <label>{{ $t('shippingCompanies.description') }}</label>
            <input />
            <label>{{ $t('shippingCompanies.order') }}</label>
            <input type="number" />
          </div>
          <div class="form-row">
            <label>{{ $t('shippingCompanies.taxNumber') }}</label>
            <input />
            <label>{{ $t('shippingCompanies.memberGroup') }}</label>
            <select><option>{{ $t('common.all') }}</option></select>
          </div>
          <label><input type="checkbox" /> {{ $t('shippingCompanies.customLogo') }}</label>
          <label><input type="checkbox" /> {{ $t('shippingCompanies.customDeliveryTime') }}</label>
        </div>

        <button class="save-btn">✓ {{ $t('common.save') }}</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const showAddModal = ref(false)
const showEditModal = ref(false)
const selectedFirm = ref('')
const selectedCompany = ref({})
const activeTab = ref('genel')

const shippingCompanies = ref([
  { id: 1, name: 'Aras Kargo', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Aras_Kargo_logo.png', active: true },
  { id: 2, name: 'Mng Kargo', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/67/MNG_Kargo_logo.png', active: true },
  { id: 3, name: 'UPS Kargo', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/UPS_Logo_Shield_2017.svg', active: false },
  { id: 4, name: 'Sürat Kargo', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/S%C3%BCrat_Kargo_logo.png', active: false },
  { id: 5, name: 'PTT Kargo', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/PTT_logo.png', active: false },
  { id: 6, name: 'Yurtiçi Kargo', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Yurtici_Kargo_logo.png', active: false }
])

const firmOptions = [
  'E-Ticaret Kampanyalı Kargo', 'Aras Kargo', 'Byexpress Kargo', 'Gelal Kargo',
  'HTS Kargo', 'Interline Express Kargo', 'MNG Kargo', 'PTT Kargo', 'PTT Kargo Global',
  'Sendeo Kargo', 'Sürat Kargo', 'UPS Kargo', 'Yurtiçi Kargo', 'Diğer', 'Mağazadan Teslim Al'
]

function confirmAdd() {
  alert(`${selectedFirm.value} eklenecek! (Simülasyon)`)
  showAddModal.value = false
}

function openEditModal(company) {
  selectedCompany.value = { ...company }
  activeTab.value = 'genel'
  showEditModal.value = true
}
</script>

<style scoped>
.shipping-page {
  font-family: 'Inter', sans-serif;
  padding: 32px;
  background-color: #f9fafb;
  transition: background-color 0.3s ease;
}
html.dark .shipping-page {
  background-color: #1e1e1e;
  color: #f1f1f1;
}

/* Başlık */
.page-title {
  font-size: 22px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 20px;
}
html.dark .page-title {
  color: #ffffff;
}

/* Ekleme Kutusu */
.add-box {
  border: 2px dashed #d1d5db;
  background-color: #f3f4f6;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 28px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
}
.add-box:hover {
  background-color: #e5e7eb;
}
html.dark .add-box {
  background-color: #2a2a2a;
  border-color: #4b5563;
  color: #f1f1f1;
}
html.dark .add-box:hover {
  background-color: #374151;
}

/* Firma Kartı */
.company-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 18px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
  margin-bottom: 14px;
  transition: transform 0.2s ease, background-color 0.3s ease;
}
.company-card:hover {
  transform: translateY(-2px);
}
html.dark .company-card {
  background: #2c2c2c;
  border-color: #444;
}

/* Sol Alan */
.company-card .left {
  display: flex;
  align-items: center;
  gap: 12px;
}
.company-card .logo {
  height: 42px;
  width: auto;
}

/* Orta Butonlar */
.center button {
  margin: 0 6px;
}

/* Butonlar */
.btn-active {
  background: #4ade80;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 500;
}
.btn-passive {
  background: #ef4444;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 500;
}
.btn-outline {
  border: 1px solid #d1d5db;
  background: #fff;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 500;
  color: #374151;
}
html.dark .btn-outline {
  background: #1f1f1f;
  border-color: #555;
  color: #f1f1f1;
}
.btn-settings {
  background: #2563eb;
  color: #ffffff;
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  font-weight: 500;
}

/* Modal */
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
}
.modal-box {
  background: #ffffff;
  padding: 28px;
  border-radius: 14px;
  width: 520px;
  max-width: 95%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
html.dark .modal-box {
  background: #2c2c2c;
  color: #f1f1f1;
}

/* Modal Başlığı */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 18px;
  color: #111827;
  margin-bottom: 20px;
}
html.dark .modal-header {
  color: #ffffff;
}
.close {
  background: none;
  border: none;
  font-size: 22px;
  color: #6b7280;
  cursor: pointer;
}
html.dark .close {
  color: #d1d5db;
}

/* Radyo Listesi */
.radio-list {
  max-height: 300px;
  overflow-y: auto;
  margin: 18px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* İleri Butonu */
.next-btn {
  background: #3b82f6;
  color: white;
  padding: 12px 18px;
  border-radius: 10px;
  border: none;
  width: 100%;
  font-weight: 600;
}

/* Sekmeler */
.tabs {
  display: flex;
  margin-bottom: 16px;
  gap: 14px;
  flex-wrap: wrap;
}
.tabs button {
  padding: 8px 14px;
  border-radius: 10px;
  border: none;
  background: #f3f4f6;
  color: #374151;
  font-weight: 500;
  transition: background 0.2s ease;
}
.tabs .active {
  background: #3b82f6;
  color: white;
}
html.dark .tabs button {
  background: #374151;
  color: #f1f1f1;
}
html.dark .tabs .active {
  background: #3b82f6;
  color: white;
}

/* Form */
.form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.form-row {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  flex-wrap: wrap;
}
input,
select {
  flex: 1;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  background-color: white;
  color: #1f2937;
}
html.dark input,
html.dark select {
  background-color: #3a3a3a;
  border-color: #555;
  color: #f1f1f1;
}

/* Kaydet Butonu */
.save-btn {
  margin-top: 18px;
  background: #3b82f6;
  color: white;
  padding: 12px 18px;
  border-radius: 10px;
  border: none;
  width: 100%;
  font-weight: 600;
}

/* Responsive */
@media (max-width: 640px) {
  .shipping-page {
    padding: 20px;
  }

  .form-row {
    flex-direction: column;
  }

  .tabs {
    gap: 8px;
  }

  .modal-box {
    padding: 20px;
    width: 100%;
  }
}
</style>