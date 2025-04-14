<template>
  <div class="exchange-rates">
    <h2 class="title">{{ $t('exchangeRates.title') }}</h2>
    <input v-model="search" type="text" :placeholder="$t('exchangeRates.search')" class="search-box" />

    <table class="rates-table">
      <thead>
        <tr>
          <th>#</th>
          <th>{{ $t('exchangeRates.code') }}</th>
          <th>{{ $t('exchangeRates.name') }}</th>
          <th>{{ $t('exchangeRates.value') }}</th>
          <th>{{ $t('exchangeRates.siteStatus') }}</th>
          <th>{{ $t('exchangeRates.tcmb') }}</th>
          <th>{{ $t('exchangeRates.actions') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(rate, index) in filteredRates" :key="rate.code">
          <td>{{ index + 1 }}</td>
          <td>{{ rate.code }}</td>
          <td>{{ rate.name }}</td>
          <td>{{ rate.value }}</td>
          <td>
            <span :class="['status', rate.siteStatus ? 'active' : 'passive']">
              {{ rate.siteStatus ? $t('exchangeRates.active') : $t('exchangeRates.passive') }}
            </span>
          </td>
          <td>
            <span :class="['status', rate.tcmb ? 'active' : 'passive']">
              {{ rate.tcmb ? $t('exchangeRates.active') : $t('exchangeRates.passive') }}
            </span>
          </td>
          <td>
            <div class="dropdown">
              <button @click.stop="toggleDropdown(rate.code)">{{ $t('exchangeRates.actions') }} ⏷</button>
              <ul v-if="dropdownOpen === rate.code" class="dropdown-menu">
                <li @click.stop="editRate(rate)">{{ $t('exchangeRates.edit') }}</li>
                <li @click.stop="deleteRate(rate.code)">{{ $t('exchangeRates.delete') }}</li>
              </ul>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const search = ref('')
const dropdownOpen = ref(null)

const rates = ref([
  { code: 'TL', name: 'Türk Lirası', value: 1, siteStatus: true, tcmb: true },
  { code: 'USD', name: 'Dolar', value: 37.9715, siteStatus: true, tcmb: true },
  { code: 'EUR', name: 'Euro', value: 41.8494, siteStatus: true, tcmb: true },
  { code: 'CHF', name: 'İsviçre Frangı', value: 44.5788, siteStatus: true, tcmb: true },
  { code: 'GBP', name: 'İngiliz Sterlini', value: 49.4823, siteStatus: true, tcmb: true },
  { code: 'GR', name: 'Gram Altın', value: 1357.08, siteStatus: false, tcmb: true },
  { code: 'RUB', name: 'Rus Rublesi', value: 0.45151, siteStatus: false, tcmb: true }
])

const filteredRates = computed(() =>
  rates.value.filter(rate =>
    rate.code.toLowerCase().includes(search.value.toLowerCase()) ||
    rate.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

function toggleDropdown(code) {
  dropdownOpen.value = dropdownOpen.value === code ? null : code
}

function editRate(rate) {
  alert(`Düzenleme penceresi açılıyor: ${rate.code}`)
  dropdownOpen.value = null
}

function deleteRate(code) {
  const confirmed = confirm(`${code} kodlu döviz silinsin mi?`)
  if (confirmed) {
    rates.value = rates.value.filter(r => r.code !== code)
  }
  dropdownOpen.value = null
}

function handleClickOutside(event) {
  const dropdowns = document.querySelectorAll('.dropdown')
  let clickedInside = false

  dropdowns.forEach(dropdown => {
    if (dropdown.contains(event.target)) {
      clickedInside = true
    }
  })

  if (!clickedInside) {
    dropdownOpen.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
<style scoped>
.exchange-rates {
  background: #fff;
  border: 1px solid #e2e8f0;
  padding: 30px;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}
html.dark .exchange-rates {
  background: #1e1e1e;
  border-color: #3a3a3a;
  color: #f1f1f1;
}

.title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #1e293b;
}
html.dark .title {
  color: #ffffff;
}

.search-box {
  padding: 10px 14px;
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  border: 2px solid #93c5fd;
  font-size: 14px;
  margin-bottom: 24px;
  background-color: white;
  color: #1f2937;
}
html.dark .search-box {
  background-color: #2a2a2a;
  color: #f1f1f1;
  border-color: #60a5fa;
}

.rates-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #f9fafb;
}
html.dark .rates-table {
  background-color: #2c2c2c;
}

.rates-table th,
.rates-table td {
  padding: 12px 14px;
  text-align: left;
  font-size: 14px;
  border-bottom: 1px solid #e5e7eb;
  color: #1f2937;
}
html.dark .rates-table th,
html.dark .rates-table td {
  border-color: #444;
  color: #f1f1f1;
}

.rates-table th {
  background-color: #f1f5f9;
  font-weight: 600;
  color: #1f2937;
}
html.dark .rates-table th {
  background-color: #3a3a3a;
  color: #e5e5e5;
}

.status {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  display: inline-block;
}
.status.active {
  background-color: #d1fae5;
  color: #047857;
}
html.dark .status.active {
  background-color: #064e3b;
  color: #6ee7b7;
}
.status.passive {
  background-color: #fee2e2;
  color: #b91c1c;
}
html.dark .status.passive {
  background-color: #7f1d1d;
  color: #fecaca;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown button {
  padding: 6px 12px;
  font-size: 14px;
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
}
html.dark .dropdown button {
  background-color: #374151;
  border-color: #4b5563;
  color: #f1f1f1;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  width: 120px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  z-index: 10;
  padding: 6px 0;
}
html.dark .dropdown-menu {
  background-color: #2a2a2a;
  border-color: #444;
}

.dropdown-menu li {
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  color: #1f2937;
}
html.dark .dropdown-menu li {
  color: #f1f1f1;
}
.dropdown-menu li:hover {
  background-color: #f3f4f6;
}
html.dark .dropdown-menu li:hover {
  background-color: #374151;
}

/* Responsive */
@media (max-width: 640px) {
  .exchange-rates {
    padding: 20px;
  }

  .title {
    font-size: 20px;
  }

  .search-box {
    max-width: 100%;
  }

  .rates-table th,
  .rates-table td {
    font-size: 13px;
    padding: 10px;
  }

  .dropdown-menu {
    width: 100%;
  }
}
</style>