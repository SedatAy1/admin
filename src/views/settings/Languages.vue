<template>
  <div class="language-settings">
    <h2 class="title">Diller</h2>
    <div class="top-bar">
      <input v-model="search" placeholder="🔍 Ara..." class="search-input" />
      <div class="actions">
        <button class="gray-btn" @click="openModal('center')">🌐 Çeviri Merkezi</button>
        <button class="yellow-btn" @click="openModal('new')">📝 Yeni Çeviri</button>
        <button class="blue-btn" @click="openModal('operations')">📘 İşlemler</button>
      </div>
    </div>

    <table class="language-table">
      <thead>
        <tr>
          <th><input type="checkbox" /></th>
          <th>Dil No</th>
          <th>Kodu</th>
          <th>Adı</th>
          <th>Gerçek Adı</th>
          <th>Varsayılan Para Birimi</th>
          <th>Durum</th>
          <th>Varsayılan</th>
          <th>İşlemler</th>
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
          <td><span :class="['status', lang.active ? 'active' : 'passive']">{{ lang.active ? 'Aktif' : 'Pasif' }}</span></td>
          <td><span :class="['status', lang.default ? 'active' : 'passive']">{{ lang.default ? 'Aktif' : 'Pasif' }}</span></td>
          <td>
            <div class="dropdown">
              <button @click="toggleDropdown(lang.id)">İşlemler ⏷</button>
              <ul v-if="dropdownOpen === lang.id" class="dropdown-menu">
                <li>Hızlı Görüntüle</li>
                <li>Sil</li>
              </ul>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Çeviri Merkezi Modal -->
    <div v-if="activeModal === 'center'" class="modal">
      <div class="modal-content">
        <h3>Çeviri Merkezi</h3>
        <select v-model="selectedLang">
          <option v-for="lang in languages" :value="lang.code">{{ lang.name }}</option>
        </select>
        <button class="blue-btn">✓ Çeviriye Başla</button>
        <button class="close-btn" @click="closeModal">✕</button>
      </div>
    </div>

    <!-- Yeni Çeviri Modal -->
    <div v-if="activeModal === 'new'" class="modal">
      <div class="modal-content">
        <h3>Yeni Çeviri</h3>
        <input placeholder="Benzersiz Kod" />
        <div v-for="lang in languages" :key="lang.code">
          <input :placeholder="`[${lang.name} - ${lang.code}] Değer`" />
        </div>
        <button class="blue-btn">✓ Kaydet</button>
        <button class="close-btn" @click="closeModal">✕</button>
      </div>
    </div>

    <!-- Dil İşlemleri Modal -->
    <div v-if="activeModal === 'operations'" class="modal">
      <div class="modal-content">
        <h3>Dil İşlemleri</h3>
        <div class="tabs">
          <button class="active">Dışa Aktar</button>
          <button>İçe Aktar</button>
          <button>Sıfırla</button>
        </div>
        <p>Çeviri merkezindeki tüm veriler excel olarak dışarı aktarılacaktır.</p>
        <button class="blue-btn">⬇ İndir</button>
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
.language-settings { font-family: 'Inter', sans-serif; }
.title { font-size: 20px; font-weight: 600; margin-bottom: 16px; }
.top-bar { display: flex; justify-content: space-between; margin-bottom: 16px; gap: 10px; flex-wrap: wrap; }
.actions button { margin-left: 8px; }
.search-input { padding: 8px; border-radius: 6px; border: 1px solid #ccc; width: 200px; }
.gray-btn, .yellow-btn, .blue-btn {
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  color: white;
}
.gray-btn { background: #6b7280; }
.yellow-btn { background: #fbbf24; }
.blue-btn { background: #3b82f6; }
.language-table { width: 100%; border-collapse: collapse; }
.language-table th, .language-table td { padding: 10px; border-bottom: 1px solid #eee; text-align: left; }
.status.active { background: #d1fae5; color: #047857; padding: 4px 8px; border-radius: 6px; font-size: 12px; }
.status.passive { background: #fee2e2; color: #b91c1c; padding: 4px 8px; border-radius: 6px; font-size: 12px; }
.dropdown { position: relative; display: inline-block; }
.dropdown-menu {
  position: absolute;
  background: white;
  border: 1px solid #ddd;
  z-index: 5;
  width: 120px;
  padding: 4px 0;
  border-radius: 6px;
}
.dropdown-menu li { padding: 6px 10px; cursor: pointer; }
.modal {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex; align-items: center; justify-content: center;
  z-index: 50;
}
.modal-content {
  background: #fff; padding: 20px; border-radius: 10px;
  width: 500px; max-width: 90%; position: relative;
}
.modal-content h3 { margin-bottom: 14px; font-size: 18px; }
.modal-content input, .modal-content select {
  width: 100%; padding: 8px; margin-bottom: 8px;
  border: 1px solid #ccc; border-radius: 6px;
}
.close-btn {
  position: absolute; top: 10px; right: 10px;
  background: transparent; border: none;
  font-size: 18px; cursor: pointer;
}
.tabs { display: flex; gap: 10px; margin-bottom: 12px; }
.tabs button {
  padding: 6px 12px; border: none; border-radius: 6px;
  background: #e5e7eb; cursor: pointer;
}
.tabs button.active { background: #3b82f6; color: white; }
</style>