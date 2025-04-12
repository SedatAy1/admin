<template>
  <div class="shipping-settings">
    <h2 class="title">Kargo Ayarları</h2>

    <div class="tabs">
      <button :class="{ active: activeTab === 'fixed' }" @click="activeTab = 'fixed'">
        Sabit Kargo Ücretleri
      </button>
      <button :class="{ active: activeTab === 'category' }" @click="activeTab = 'category'">
        Kategori Bazlı Kargo Ücretleri
      </button>
      <button :class="{ active: activeTab === 'desi' }" @click="activeTab = 'desi'">
        Desi Bazlı Kargo Ücretleri
      </button>
    </div>

    <div v-if="activeTab === 'fixed'">
      <div class="info-box">
        <ul>
          <li>Sabit kargo ücretleri sepet tutarına eklenmektedir.</li>
          <li>Kategori bazlı ücretler sepetteki her ürün için eklenir.</li>
          <li>Bir ürünü aynı anda sabit, kategori ve desi bazlı kargo ücreti uygulanamaz.</li>
          <li>Ürünlere kargo ücreti eklenmesi için "Kargo Alıcı Öder" seçeneğinin aktif edilmesi gerekir.</li>
        </ul>
      </div>
      <div class="grid">
        <div>
          <label>Sabit Kargo Ücreti</label>
          <input type="number" v-model="fixed.price" />
        </div>
        <div>
          <label>Sabit Kargo Ücret Tipi</label>
          <select v-model="fixed.type">
            <option>Alıcı Ödemeli Ürünlere Ekle</option>
            <option>Tüm Ürünlere Uygula</option>
          </select>
        </div>
      </div>
      <div>
        <label>Ücretsiz Kargo Limiti</label>
        <input type="number" v-model="fixed.freeLimit" />
      </div>
      <button class="primary-btn">Kaydet</button>
    </div>

    <div v-if="activeTab === 'category'">
      <div class="info-box">
        <ul>
          <li>Sabit kargo ücretleri sepet tutarına eklenmektedir.</li>
          <li>Kategori bazlı ücretler sepetteki her ürün için eklenir.</li>
          <li>Bir ürünü aynı anda sabit, kategori ve desi bazlı kargo ücreti uygulanamaz.</li>
          <li>Ürünlere kargo ücreti eklenmesi için "Kargo Alıcı Öder" seçeneğinin aktif edilmesi gerekir.</li>
        </ul>
      </div>
      <div class="search-bar">
        <input type="text" placeholder="🔍 Ara..." />
        <button class="primary-btn" @click="showCategoryModal = true">
          + Yeni Kategori Ücreti
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>No</th>
            <th>Başlık</th>
            <th>Kargo Ücreti</th>
            <th>Site</th>
            <th>Pazaryeri</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="7" class="empty">Kayıt bulunamadı.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="activeTab === 'desi'">
      <div class="info-box">
        <ul>
          <li>Sabit kargo ücretleri sepet tutarına eklenmektedir.</li>
          <li>Kategori bazlı ücretler sepetteki her ürün için eklenir.</li>
          <li>Bir ürünü aynı anda sabit, kategori ve desi bazlı kargo ücreti uygulanamaz.</li>
          <li>Ürünlere kargo ücreti eklenmesi için "Kargo Alıcı Öder" seçeneğinin aktif edilmesi gerekir.</li>
        </ul>
      </div>
      <div class="search-bar">
        <input type="text" placeholder="🔍 Ara..." />
        <button class="primary-btn" @click="showDesiModal = true">
          + Yeni Desi Ücreti
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Desi No</th>
            <th>Desi Tipi</th>
            <th>Desi Başlangıç Değeri</th>
            <th>Desi Bitiş Değeri</th>
            <th>Ücret</th>
            <th>Pazaryeri</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="8" class="empty">Kayıt bulunamadı.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Kategori Modalı -->
    <div v-if="showCategoryModal" class="modal">
      <div class="modal-content">
        <h3>Yeni Kategori Ücreti Ekle</h3>
        <input placeholder="Tanımlayıcı Başlık" />
        <input placeholder="Kargo Ücreti" type="number" />
        <select>
          <option>Hiçbiri seçilmedi</option>
        </select>
        <div class="marketplaces">
          <label v-for="site in marketplaces" :key="site">
            <input type="checkbox" /> {{ site }}
          </label>
        </div>
        <button class="primary-btn">Kaydet</button>
        <button class="close-btn" @click="showCategoryModal = false">Kapat</button>
      </div>
    </div>

    <!-- Desi Modalı -->
    <div v-if="showDesiModal" class="modal">
      <div class="modal-content">
        <h3>Yeni Desi Ücreti Ekle</h3>
        <select>
          <option>Ürün Bazında</option>
        </select>
        <input placeholder="Desi Başlangıç Değeri" type="number" />
        <input placeholder="Desi Bitiş Değeri" type="number" />
        <input placeholder="Ücret" type="number" />
        <div class="marketplaces">
          <label v-for="site in marketplaces" :key="site">
            <input type="checkbox" /> {{ site }}
          </label>
        </div>
        <button class="primary-btn">Kaydet</button>
        <button class="close-btn" @click="showDesiModal = false">Kapat</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const activeTab = ref('fixed')
const showCategoryModal = ref(false)
const showDesiModal = ref(false)
const fixed = ref({ price: 9.99, type: 'Alıcı Ödemeli Ürünlere Ekle', freeLimit: 250 })
const marketplaces = [
  'N11', 'Hepsiburada', 'ePttAVM', 'Amazon', 'Trendyol', 'ÇiçekSepeti',
  'Modanisa', 'Pazarama', 'Goturc', 'Allesgo', 'Idefix', 'Reistrend'
]
</script>

<style scoped>
.shipping-settings {
  font-family: 'Inter', sans-serif;
  padding: 24px;
  background: white;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}
html.dark .shipping-settings {
  background: #1e1e1e;
  border-color: #3a3a3a;
  color: #f1f1f1;
}

.title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #1e293b;
}
html.dark .title {
  color: #ffffff;
}

.tabs button {
  padding: 12px 20px;
  background: #f1f5f9;
  border: none;
  font-weight: 500;
  margin-right: 8px;
  cursor: pointer;
  color: #1f2937;
}
.tabs button.active {
  background: #475569;
  color: white;
}
html.dark .tabs button {
  background: #374151;
  color: #e2e8f0;
}
html.dark .tabs button.active {
  background: #3b82f6;
  color: white;
}

.info-box {
  background: #f9fafb;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 14px;
  color: #334155;
}
html.dark .info-box {
  background: #2c2c2c;
  color: #f1f1f1;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

input, select {
  padding: 10px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background-color: #fff;
  color: #1f2937;
  transition: background-color 0.3s ease;
}
html.dark input,
html.dark select {
  background-color: #2a2a2a;
  border-color: #4b5563;
  color: #f1f1f1;
}

.primary-btn {
  margin-top: 20px;
  padding: 10px 16px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}
.primary-btn:hover {
  background-color: #2563eb;
}

.search-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  font-size: 14px;
}
html.dark table {
  background: #2c2c2c;
  color: #f1f1f1;
}
th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}
html.dark th,
html.dark td {
  border-color: #444;
}

.empty {
  text-align: center;
  color: #9ca3af;
  padding: 20px;
}
html.dark .empty {
  color: #d1d5db;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
html.dark .modal-content {
  background: #2a2a2a;
  color: #f1f1f1;
}

.marketplaces {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.close-btn {
  padding: 8px;
  background: #e5e7eb;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
html.dark .close-btn {
  background: #374151;
  color: #f1f1f1;
}
</style>