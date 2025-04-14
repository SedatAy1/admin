<template>
  <div class="language-settings">
    <h2 class="title">{{ $t('languages.title') }}</h2>
    <div class="top-bar">
      <input v-model="search" :placeholder="$t('languages.search')" class="search-input" />
      <div class="actions">
        <button class="gray-btn" @click="openModal('center')">🌐 {{ $t('languages.translationCenter') }}</button>
        <button class="yellow-btn" @click="openModal('new')">📝 {{ $t('languages.newTranslation') }}</button>
        <button class="blue-btn" @click="openModal('operations')">📘 {{ $t('languages.operations') }}</button>
      </div>
    </div>

    <table class="language-table">
      <thead>
        <tr>
          <th><input type="checkbox" /></th>
          <th>{{ $t('languages.id') }}</th>
          <th>{{ $t('languages.code') }}</th>
          <th>{{ $t('languages.name') }}</th>
          <th>{{ $t('languages.realName') }}</th>
          <th>{{ $t('languages.currency') }}</th>
          <th>{{ $t('languages.status') }}</th>
          <th>{{ $t('languages.default') }}</th>
          <th>{{ $t('languages.actions') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lang in filteredLanguages" :key="lang.id">
          <td><input type="checkbox" /></td>
          <td>{{ lang.id }}</td>
          <td>{{ lang.code }}</td>
          <td>{{ lang.name }}</td>
          <td>{{ lang.realName }}</td>
          <td>{{ lang.currency }}</td>
          <td><span :class="['status', lang.active ? 'active' : 'passive']">{{ lang.active ? $t('languages.active') : $t('languages.passive') }}</span></td>
          <td><span :class="['status', lang.default ? 'active' : 'passive']">{{ lang.default ? $t('languages.active') : $t('languages.passive') }}</span></td>
          <td>
            <div class="dropdown">
              <button @click="toggleDropdown(lang.id)">{{ $t('languages.actions') }} ⏷</button>
              <ul v-if="dropdownOpen === lang.id" class="dropdown-menu">
                <li>{{ $t('languages.quickView') }}</li>
                <li>{{ $t('languages.delete') }}</li>
              </ul>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Çeviri Merkezi Modal -->
    <div v-if="activeModal === 'center'" class="modal">
      <div class="modal-content">
        <h3>{{ $t('languages.translationCenter') }}</h3>
        <select v-model="selectedLang">
          <option v-for="lang in languages" :value="lang.code">{{ lang.name }}</option>
        </select>
        <button class="blue-btn">✓ {{ $t('languages.startTranslation') }}</button>
        <button class="close-btn" @click="closeModal">✕</button>
      </div>
    </div>

    <!-- Yeni Çeviri Modal -->
    <div v-if="activeModal === 'new'" class="modal">
      <div class="modal-content">
        <h3>{{ $t('languages.newTranslation') }}</h3>
        <input :placeholder="$t('languages.uniqueKey')" />
        <div v-for="lang in languages" :key="lang.code">
          <input :placeholder="`[${lang.name} - ${lang.code}] ${$t('languages.value')}`" />
        </div>
        <button class="blue-btn">✓ {{ $t('languages.save') }}</button>
        <button class="close-btn" @click="closeModal">✕</button>
      </div>
    </div>

    <!-- Dil İşlemleri Modal -->
    <div v-if="activeModal === 'operations'" class="modal">
      <div class="modal-content">
        <h3>{{ $t('languages.languageOperations') }}</h3>
        <div class="tabs">
          <button class="active">{{ $t('languages.export') }}</button>
          <button>{{ $t('languages.import') }}</button>
          <button>{{ $t('languages.reset') }}</button>
        </div>
        <p>{{ $t('languages.exportInfo') }}</p>
        <button class="blue-btn">⬇ {{ $t('languages.download') }}</button>
        <button class="close-btn" @click="closeModal">✕</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')
const dropdownOpen = ref(null)
const activeModal = ref(null)
const selectedLang = ref('tr')

const languages = ref([
  { id: 1, code: 'tr', name: 'Türkçe', realName: 'Türkçe', currency: 'TL', active: true, default: true },
  { id: 2, code: 'en', name: 'İngilizce', realName: 'English', currency: 'TL', active: false, default: false },
  { id: 3, code: 'de', name: 'Almanca', realName: 'Deutsch', currency: 'TL', active: false, default: false },
  // diğer diller...
])

const filteredLanguages = computed(() =>
  languages.value.filter(lang =>
    lang.name.toLowerCase().includes(search.value.toLowerCase()) ||
    lang.code.includes(search.value)
  )
)

const toggleDropdown = (id) => {
  dropdownOpen.value = dropdownOpen.value === id ? null : id
}

const openModal = (name) => {
  activeModal.value = name
  dropdownOpen.value = null
}

const closeModal = () => {
  activeModal.value = null
}
</script>

<style scoped>
.language-settings {
  font-family: 'Inter', sans-serif;
  transition: background 0.3s, color 0.3s;
}
html.dark .language-settings {
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
  gap: 10px;
  flex-wrap: wrap;
}

.search-input {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 200px;
}
html.dark .search-input {
  background-color: #2c2c2c;
  color: #f1f1f1;
  border-color: #444;
}

.actions button {
  margin-left: 8px;
}

.gray-btn,
.yellow-btn,
.blue-btn {
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  color: white;
  transition: background-color 0.2s;
}
.gray-btn {
  background: #6b7280;
}
.yellow-btn {
  background: #fbbf24;
}
.blue-btn {
  background: #3b82f6;
}
.gray-btn:hover {
  background: #4b5563;
}
.yellow-btn:hover {
  background: #f59e0b;
}
.blue-btn:hover {
  background: #2563eb;
}

.language-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}
.language-table th,
.language-table td {
  padding: 10px;
  border-bottom: 1px solid #eee;
  text-align: left;
}
html.dark .language-table {
  background: #2a2a2a;
  color: #f1f1f1;
}
html.dark .language-table th,
html.dark .language-table td {
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
  display: inline-block;
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
.dropdown-menu li {
  padding: 6px 10px;
  cursor: pointer;
}
.dropdown-menu li:hover {
  background-color: #f3f4f6;
}
html.dark .dropdown-menu {
  background: #2d2d2d;
  color: #f1f1f1;
  border-color: #444;
}
html.dark .dropdown-menu li:hover {
  background-color: #3a3a3a;
}

.modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 500px;
  max-width: 90%;
  position: relative;
}
html.dark .modal-content {
  background: #2a2a2a;
  color: #f1f1f1;
}

.modal-content h3 {
  margin-bottom: 14px;
  font-size: 18px;
}

.modal-content input,
.modal-content select {
  width: 100%;
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
html.dark .modal-content input,
html.dark .modal-content select {
  background: #3a3a3a;
  color: #f1f1f1;
  border-color: #555;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #6b7280;
}
html.dark .close-btn {
  color: #d1d5db;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.tabs button {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  background: #e5e7eb;
  cursor: pointer;
  transition: background-color 0.2s;
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
    width: 90%;
  }
}
</style>