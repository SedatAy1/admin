<template>
  <div class="countries-page">
    <h2 class="title">Ülkeler</h2>
    <div class="top-bar">
      <input v-model="search" placeholder="🔍 Ara..." class="search-input" />
      <button @click="openAddCountryModal" class="add-btn">+ Yeni Ülke Ekle</button>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th><input type="checkbox" /></th>
          <th>Ülke No</th>
          <th>Adı</th>
          <th>Durum</th>
          <th>Min. Sip. Lim.</th>
          <th>Min. Sip. Tutar.</th>
          <th>Sıra</th>
          <th>İşlemler</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(country, index) in filteredCountries" :key="country.id">
          <td><input type="checkbox" /></td>
          <td>{{ country.id }}</td>
          <td>{{ country.name }}</td>
          <td><span :class="['status', country.status ? 'active' : 'passive']">{{ country.status ? 'Aktif' : 'Pasif' }}</span></td>
          <td><span :class="['status', country.minLimit ? 'active' : 'passive']">{{ country.minLimit ? 'Aktif' : 'Pasif' }}</span></td>
          <td>{{ country.minAmount.toFixed(2) }} TL</td>
          <td>{{ country.order }}</td>
          <td>
            <div class="dropdown">
              <button @click="toggleDropdown(country.id)">İşlemler ⏷</button>
              <ul v-if="dropdownOpen === country.id" class="dropdown-menu">
                <li @click="quickView(country)">👁️ Hızlı Görüntüle</li>
                <li @click="editCountry(country)">✏️ Düzenle</li>
                <li @click="viewCities(country)">📍 İller</li>
                <li @click="deleteCountry(country)">🗑️ Sil</li>
              </ul>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Yeni Ülke</h3>
          <button @click="closeModal">✕</button>
        </div>
        <div class="tabs">
          <button :class="{ active: tab === 'general' }" @click="tab = 'general'">Genel Bilgiler</button>
          <button :class="{ active: tab === 'cities' }" @click="tab = 'cities'">İller</button>
        </div>

        <div v-if="tab === 'general'" class="form">
          <input v-model="form.name" placeholder="Adı" />
          <select v-model="form.status">
            <option value="true">Aktif</option>
            <option value="false">Pasif</option>
          </select>
          <input v-model.number="form.order" type="number" placeholder="Sıra" />
          <select v-model="form.minLimit">
            <option value="true">Aktif</option>
            <option value="false">Pasif</option>
          </select>
          <input v-model.number="form.minAmount" type="number" placeholder="Minimum Sipariş Tutarı (TL)" />
          <input v-model="form.iso2" placeholder="ISO2" />
          <input v-model="form.iso3" placeholder="ISO3" />
          <button class="save-btn" @click="saveCountry">✓ Kaydet</button>
        </div>

        <div v-if="tab === 'cities'">
          <p>İller tablosu burada olacak (bir sonraki adımda eklenecek)</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')
const dropdownOpen = ref(null)
const showModal = ref(false)
const tab = ref('general')

const countries = ref([
  { id: 225, name: 'Türkiye', status: true, minLimit: false, minAmount: 0, order: 1, iso2: 'TR', iso3: 'TUR' },
  { id: 1, name: 'Afghanistan', status: false, minLimit: false, minAmount: 0, order: 100, iso2: 'AF', iso3: 'AFG' }
])

const form = ref({
  name: '', status: true, minLimit: false, minAmount: 0, order: 100, iso2: '', iso3: ''
})

const filteredCountries = computed(() =>
  countries.value.filter(c =>
    c.name.toLowerCase().includes(search.value.toLowerCase()) ||
    c.id.toString().includes(search.value)
  )
)

const openAddCountryModal = () => {
  Object.assign(form.value, { name: '', status: true, minLimit: false, minAmount: 0, order: 100, iso2: '', iso3: '' })
  tab.value = 'general'
  showModal.value = true
}

const toggleDropdown = id => {
  dropdownOpen.value = dropdownOpen.value === id ? null : id
}

const quickView = (country) => {
  alert(`Ülke: ${country.name} (${country.iso2}/${country.iso3})`)
  dropdownOpen.value = null
}

const editCountry = country => {
  Object.assign(form.value, country)
  showModal.value = true
  tab.value = 'general'
  dropdownOpen.value = null
}

const viewCities = country => {
  Object.assign(form.value, country)
  tab.value = 'cities'
  showModal.value = true
  dropdownOpen.value = null
}

const deleteCountry = country => {
  if (confirm(`${country.name} silinsin mi?`)) {
    countries.value = countries.value.filter(c => c.id !== country.id)
  }
  dropdownOpen.value = null
}

const saveCountry = () => {
  alert('Kaydedildi: ' + form.value.name)
  showModal.value = false
}

const closeModal = () => showModal.value = false
</script>


<style scoped>
.countries-page {
  font-family: 'Inter';
}
.title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
}
.top-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}
.search-input {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 200px;
}
.add-btn {
  background: #3b82f6;
  color: #fff;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
}
.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}
.table th, .table td {
  padding: 10px;
  border-bottom: 1px solid #eee;
  text-align: left;
}
.status.active {
  background: #d1fae5;
  color: #047857;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
}
.status.passive {
  background: #fee2e2;
  color: #b91c1c;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
}
.dropdown { position: relative; }
.dropdown-menu {
  position: absolute;
  background: white;
  border: 1px solid #ddd;
  z-index: 5;
  width: 120px;
  padding: 4px 0;
  border-radius: 6px;
}
.dropdown-menu li {
  padding: 6px 10px;
  cursor: pointer;
}
.modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 600px;
  max-width: 90%;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}
.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
.tabs button {
  padding: 8px 12px;
  border: none;
  background: #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
}
.tabs button.active {
  background: #3b82f6;
  color: white;
}
.form input, .form select {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
.save-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
}
</style>