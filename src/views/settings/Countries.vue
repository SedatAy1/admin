<template>
  <div class="countries-page">
    <h2 class="title">{{ $t('country.title') }}</h2>
    <div class="top-bar">
      <input v-model="search" :placeholder="$t('common.search')" class="search-input" />
      <button @click="openAddCountryModal" class="add-btn">+ {{ $t('country.add') }}</button>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th><input type="checkbox" /></th>
          <th>{{ $t('country.id') }}</th>
          <th>{{ $t('country.name') }}</th>
          <th>{{ $t('country.status') }}</th>
          <th>{{ $t('country.minLimit') }}</th>
          <th>{{ $t('country.minAmount') }}</th>
          <th>{{ $t('country.order') }}</th>
          <th>{{ $t('common.actions') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="country in filteredCountries" :key="country.id">
          <td><input type="checkbox" /></td>
          <td>{{ country.id }}</td>
          <td>{{ country.name }}</td>
          <td><span :class="['status', country.status ? 'active' : 'passive']">{{ $t(`common.${country.status ? 'active' : 'passive'}`) }}</span></td>
          <td><span :class="['status', country.minLimit ? 'active' : 'passive']">{{ $t(`common.${country.minLimit ? 'active' : 'passive'}`) }}</span></td>
          <td>{{ country.minAmount.toFixed(2) }} TL</td>
          <td>{{ country.order }}</td>
          <td>
            <div class="dropdown">
              <button @click="toggleDropdown(country.id)">{{ $t('common.actions') }} ⏷</button>
              <ul v-if="dropdownOpen === country.id" class="dropdown-menu">
                <li @click="quickView(country)">👁️ {{ $t('common.quickView') }}</li>
                <li @click="editCountry(country)">✏️ {{ $t('common.edit') }}</li>
                <li @click="viewCities(country)">📍 {{ $t('country.cities') }}</li>
                <li @click="deleteCountry(country)">🗑️ {{ $t('common.delete') }}</li>
              </ul>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ $t('country.add') }}</h3>
          <button @click="closeModal">✕</button>
        </div>
        <div class="tabs">
          <button :class="{ active: tab === 'general' }" @click="tab = 'general'">{{ $t('common.general') }}</button>
          <button :class="{ active: tab === 'cities' }" @click="tab = 'cities'">{{ $t('country.cities') }}</button>
        </div>

        <div v-if="tab === 'general'" class="form">
          <input v-model="form.name" :placeholder="$t('country.name')" />
          <select v-model="form.status">
            <option value="true">{{ $t('common.active') }}</option>
            <option value="false">{{ $t('common.passive') }}</option>
          </select>
          <input v-model.number="form.order" type="number" :placeholder="$t('country.order')" />
          <select v-model="form.minLimit">
            <option value="true">{{ $t('common.active') }}</option>
            <option value="false">{{ $t('common.passive') }}</option>
          </select>
          <input v-model.number="form.minAmount" type="number" :placeholder="$t('country.minAmount')" />
          <input v-model="form.iso2" placeholder="ISO2" />
          <input v-model="form.iso3" placeholder="ISO3" />
          <button class="save-btn" @click="saveCountry">✓ {{ $t('common.save') }}</button>
        </div>

        <div v-if="tab === 'cities'">
          <p>{{ $t('country.citiesPlaceholder') }}</p>
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
  font-family: 'Inter', sans-serif;
  transition: background 0.3s ease, color 0.3s ease;
}
html.dark .countries-page {
  background-color: #1f1f1f;
  color: #f1f1f1;
}

.title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #1f2937;
}
html.dark .title {
  color: #ffffff;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 12px;
}

.search-input {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 200px;
  transition: background 0.2s, color 0.2s, border 0.2s;
}
html.dark .search-input {
  background: #2a2a2a;
  color: #f1f1f1;
  border-color: #444;
}

.add-btn {
  background: #3b82f6;
  color: #fff;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}
.add-btn:hover {
  background: #2563eb;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  background: white;
}
html.dark .table {
  background: #2a2a2a;
  color: #f1f1f1;
}
.table th, .table td {
  padding: 10px;
  border-bottom: 1px solid #eee;
  text-align: left;
}
html.dark .table th, html.dark .table td {
  border-color: #444;
}

.status.active {
  background: #d1fae5;
  color: #047857;
}
.status.passive {
  background: #fee2e2;
  color: #b91c1c;
}
.status {
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  display: inline-block;
  font-weight: 500;
}

.dropdown {
  position: relative;
}
.dropdown-menu {
  position: absolute;
  background: white;
  border: 1px solid #ddd;
  z-index: 5;
  width: 120px;
  padding: 4px 0;
  border-radius: 6px;
}
html.dark .dropdown-menu {
  background: #2a2a2a;
  border-color: #555;
  color: #f1f1f1;
}
.dropdown-menu li {
  padding: 6px 10px;
  cursor: pointer;
}
.dropdown-menu li:hover {
  background: #f3f4f6;
}
html.dark .dropdown-menu li:hover {
  background: #3b3b3b;
}

.modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.4);
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
html.dark .modal-content {
  background: #2b2b2b;
  color: #f1f1f1;
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
  flex-wrap: wrap;
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
html.dark .tabs button {
  background: #444;
  color: #f1f1f1;
}
html.dark .tabs button.active {
  background: #2563eb;
  color: white;
}

.form input,
.form select {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
html.dark .form input,
html.dark .form select {
  background: #3a3a3a;
  color: #f1f1f1;
  border-color: #555;
}

.save-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
}
.save-btn:hover {
  background-color: #2563eb;
}

/* Responsive */
@media (max-width: 768px) {
  .top-bar {
    flex-direction: column;
    align-items: flex-start;
  }

  .search-input {
    width: 100%;
  }

  .modal-content {
    width: 80%;
    padding: 16px;
  }

  .form input, .form select {
    font-size: 14px;
  }
}
</style>