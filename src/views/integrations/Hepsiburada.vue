<template>
  <MarketLayout>
    <div class="hepsiburada-layout">
      <div class="sidebar">
        <button @click="activeTab = 'excel'" :class="{ active: activeTab === 'excel' }">Ürünleri Excele Aktarım</button>
        <button @click="activeTab = 'match'" :class="{ active: activeTab === 'match' }">Ürünleri Eşleştir</button>
        <button @click="activeTab = 'activate'" :class="{ active: activeTab === 'activate' }">Ürünleri Aktifleştir</button>
        <button @click="activeTab = 'reports'" :class="{ active: activeTab === 'reports' }">Raporlar</button>
      </div>

      <div class="content">
        <div v-if="activeTab === 'excel'">
          <h2>Ürünleri Excele Aktarım</h2>
          <p>Hepsiburada entegrasyonu ile ürünlerinizi Excel formatına çevirerek yükleyebilirsiniz.</p>
          <div class="header">
            <input v-model="searchQuery" type="text" placeholder="Ara..." class="search-box" />
            <button @click="openModal" class="new-button">+ Yeni Excel</button>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Excel No</th>
                <th>Adı</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!records.length" class="no-data">
                <td colspan="4">Kayıt bulunamadı.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="activeTab === 'match'">
          <h2>Ürünleri Eşleştir</h2>
          <p>Mağazadaki ürünlerinizi eşleştirin.</p>
          <table class="data-table">
            <thead>
              <tr>
                <th>Mağaza Adı</th>
                <th>Durum</th>
                <th>Son İşlem Tarihi</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#1 - Demo</td>
                <td class="error">Hatalı (Ürün bulunamadı)</td>
                <td>08.11.2024 15:33</td>
                <td><button>Başlat</button></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="activeTab === 'activate'">
          <h2>Ürünleri Aktifleştir</h2>
          <p>Seçilen mağazadaki eşleşmiş ürünleri aktifleştirin.</p>
          <button class="activate-button">Tüm Ürünleri Aktifleştir</button>
        </div>

        <div v-if="activeTab === 'reports'">
          <h2>Raporlar</h2>
          <p>Listelecek veri bulunamadı.</p>
        </div>
      </div>

      <div v-if="isModalOpen" class="modal">
        <div class="modal-content">
          <h2>Yeni Excel</h2>
          <label>Adı</label>
          <input v-model="form.name" type="text" />
          <label>Mağaza</label>
          <select v-model="form.store">
            <option>#1 - Demo</option>
          </select>
          <label>Excel Formatı</label>
          <select v-model="form.format">
            <option>Hızlı Ürün Ekleme Formatı</option>
          </select>
          <label>Kategoriler</label>
          <select v-model="form.category">
            <option>Hiçbiri seçilmedi</option>
          </select>
          <label>Ürün Kaynağı</label>
          <select v-model="form.source">
            <option>Hiçbiri seçilmedi</option>
          </select>
          <label>Markalar</label>
          <select v-model="form.brand">
            <option>Hiçbiri seçilmedi</option>
          </select>
          <label>Minimum HB Ürün Fiyatı</label>
          <input v-model="form.minPrice" type="number" />
          <label>Maksimum HB Ürün Fiyatı</label>
          <input v-model="form.maxPrice" type="number" />
          <label>HB Para Birimi</label>
          <select v-model="form.currency">
            <option>Tümü</option>
          </select>
          <button @click="save" class="save-button">Kaydet</button>
          <button @click="closeModal" class="close-button">Kapat</button>
        </div>
      </div>
    </div>
  </MarketLayout>
</template>
<script>
import MarketLayout from "@/views/integrations/MarketLayout.vue";

export default {
  components: { MarketLayout },
  data() {
    return {
      activeTab: 'excel',
      searchQuery: "",
      records: [],
      isModalOpen: false,
      form: {
        name: "",
        store: "#1 - Demo",
        format: "Hızlı Ürün Ekleme Formatı",
        category: "Hiçbiri seçilmedi",
        source: "Hiçbiri seçilmedi",
        brand: "Hiçbiri seçilmedi",
        minPrice: 0,
        maxPrice: 99999999,
        currency: "Tümü",
      },
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    save() {
      console.log("Kaydedilen form:", this.form);
      this.closeModal();
    },
  },
};
</script>

<style scoped>
/* Layout */
.hepsiburada-layout {
  display: flex;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(to right, #f5f7fa, #c3cfe2);
}

/* Sidebar */
.sidebar {
  width: 260px;
  background: #1f2937;
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  border-right: 1px solid #374151;
  transition: all 0.3s;
}

.sidebar button {
  background: transparent;
  color: #d1d5db;
  border: none;
  padding: 12px;
  margin-bottom: 10px;
  text-align: left;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.sidebar button:hover {
  background-color: #374151;
  color: #fff;
  transform: translateX(5px);
}

.sidebar .active {
  background: #3b82f6;
  color: #fff;
  font-weight: bold;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
}

/* Content */
.content {
  flex: 1;
  padding: 40px;
  animation: fadeIn 0.5s ease-in-out;
}

h2 {
  font-size: 1.75rem;
  color: #111827;
  margin-bottom: 10px;
}

p {
  color: #4b5563;
  margin-bottom: 20px;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-box {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  width: 60%;
  transition: box-shadow 0.3s;
}

.search-box:focus {
  outline: none;
  box-shadow: 0 0 5px #3b82f6;
}

.new-button {
  background-color: #10b981;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.new-button:hover {
  background-color: #059669;
}

/* Table */
.data-table, table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

table th, table td {
  padding: 14px;
  border-bottom: 1px solid #e5e7eb;
  text-align: left;
  color: #374151;
}

.no-data td {
  text-align: center;
  padding: 30px;
  color: #9ca3af;
}

/* Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 16px;
  width: 450px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  animation: slideUp 0.4s ease-out;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.modal-content h2 {
  margin-bottom: 12px;
}

.modal-content label {
  font-weight: 500;
  color: #374151;
}

.modal-content input,
.modal-content select {
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  width: 100%;
}

.save-button, .close-button {
  padding: 12px;
  border: none;
  border-radius: 8px;
  color: white;
  margin-top: 10px;
  cursor: pointer;
  font-weight: 600;
}

.save-button {
  background-color: #2563eb;
}

.save-button:hover {
  background-color: #1d4ed8;
}

.close-button {
  background-color: #ef4444;
}

.close-button:hover {
  background-color: #dc2626;
}

.activate-button {
  background-color: #3b82f6;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.activate-button:hover {
  background-color: #2563eb;
}

.error {
  color: #ef4444;
  font-weight: bold;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>
