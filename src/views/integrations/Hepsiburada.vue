<template>
  <MarketLayout>
    <div class="hepsiburada-layout">
      <div class="sidebar">
        <button @click="activeTab = 'excel'" :class="{ active: activeTab === 'excel' }">{{ $t('hepsiburada.tabs.excel') }}</button>
        <button @click="activeTab = 'match'" :class="{ active: activeTab === 'match' }">{{ $t('hepsiburada.tabs.match') }}</button>
        <button @click="activeTab = 'activate'" :class="{ active: activeTab === 'activate' }">{{ $t('hepsiburada.tabs.activate') }}</button>
        <button @click="activeTab = 'reports'" :class="{ active: activeTab === 'reports' }">{{ $t('hepsiburada.tabs.reports') }}</button>
      </div>

      <div class="content">
        <div v-if="activeTab === 'excel'">
          <h2>{{ $t('hepsiburada.excel.title') }}</h2>
          <p>{{ $t('hepsiburada.excel.description') }}</p>
          <div class="header">
            <input v-model="searchQuery" type="text" :placeholder="$t('common.search')" class="search-box" />
            <button @click="openModal" class="new-button">+ {{ $t("hepsiburada.excel.add") }}</button>
          </div>
          <table class="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>{{ $t('hepsiburada.excel.excelNo') }}</th>
                <th>{{ $t('common.name') }}</th>
                <th>{{ $t('common.actions') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!records.length" class="no-data">
                <td colspan="4">{{ $t("common.noRecords") }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="activeTab === 'match'">
          <h2>{{ $t("hepsiburada.match.title") }}</h2>
          <p>{{ $t("hepsiburada.match.description") }}</p>
          <table class="data-table">
            <thead>
              <tr>
                <th>{{ $t("hepsiburada.match.store") }}</th>
                <th>{{ $t("hepsiburada.match.status") }}</th>
                <th>{{ $t("hepsiburada.match.date") }}</th>
                <th>{{ $t("common.actions") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#1 - Demo</td>
                <td class="error">{{ $t("hepsiburada.match.error") }}</td>
                <td>08.11.2024 15:33</td>
                <td><button>{{ $t("common.start") }}</button></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="activeTab === 'activate'">
          <h2>{{ $t("hepsiburada.activate.title") }}</h2>
          <p>{{ $t("hepsiburada.activate.description") }}</p>
          <button class="activate-button">{{ $t("hepsiburada.activate.activateAll") }}</button>
        </div>

        <div v-if="activeTab === 'reports'">
          <h2>{{ $t("hepsiburada.reports.title") }}</h2>
          <p>{{ $t("common.noRecords") }}</p>
        </div>
      </div>

      <!-- Modal -->
      <div v-if="isModalOpen" class="modal">
        <div class="modal-content">
          <h2>{{ $t("hepsiburada.excel.modal.title") }}</h2>
          <label>{{ $t("common.name") }}</label>
          <input v-model="form.name" type="text" />

          <label>{{ $t("common.store") }}</label>
          <select v-model="form.store">
            <option>#1 - Demo</option>
          </select>

          <label>{{ $t("hepsiburada.excel.modal.format") }}</label>
          <select v-model="form.format">
            <option>{{ $t("hepsiburada.excel.modal.fastAdd") }}</option>
          </select>

          <label>{{ $t("common.categories") }}</label>
          <select v-model="form.category">
            <option>{{ $t("common.noneSelected") }}</option>
          </select>

          <label>{{ $t("common.source") }}</label>
          <select v-model="form.source">
            <option>{{ $t("common.noneSelected") }}</option>
          </select>

          <label>{{ $t("common.brands") }}</label>
          <select v-model="form.brand">
            <option>{{ $t("common.noneSelected") }}</option>
          </select>

          <label>{{ $t("hepsiburada.excel.modal.minPrice") }}</label>
          <input v-model="form.minPrice" type="number" />

          <label>{{ $t("hepsiburada.excel.modal.maxPrice") }}</label>
          <input v-model="form.maxPrice" type="number" />

          <label>{{ $t("hepsiburada.excel.modal.currency") }}</label>
          <select v-model="form.currency">
            <option>{{ $t("common.all") }}</option>
          </select>

          <button @click="save" class="save-button">{{ $t("common.save") }}</button>
          <button @click="closeModal" class="close-button">{{ $t("common.cancel") }}</button>
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
/* Genel layout */
.hepsiburada-layout {
  display: flex;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(to right, #f5f7fa, #c3cfe2);
  transition: background 0.3s ease;
}
html.dark .hepsiburada-layout {
  background: linear-gradient(to right, #1e1e1e, #2a2a2a);
  color: #f1f1f1;
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
html.dark .sidebar {
  background: #111827;
  border-color: #2c2c2c;
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

/* İçerik */
.content {
  flex: 1;
  padding: 40px;
  animation: fadeIn 0.5s ease-in-out;
}
.content h2 {
  font-size: 1.75rem;
  color: #111827;
  margin-bottom: 10px;
}
.content p {
  color: #4b5563;
  margin-bottom: 20px;
}
html.dark .content h2 {
  color: #f1f1f1;
}
html.dark .content p {
  color: #9ca3af;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
}

/* Arama kutusu */
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
html.dark .search-box {
  background: #2e2e2e;
  color: #f1f1f1;
  border-color: #444;
}
html.dark .search-box::placeholder {
  color: #aaa;
}

/* Yeni buton */
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

/* Tablo */
.data-table, table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}
html.dark table {
  background: #2a2a2a;
  color: #f1f1f1;
}
table th, table td {
  padding: 14px;
  border-bottom: 1px solid #e5e7eb;
  text-align: left;
  color: #374151;
}
html.dark th, html.dark td {
  border-color: #444;
  color: #e4e4e4;
}
.no-data td {
  text-align: center;
  padding: 30px;
  color: #9ca3af;
}
html.dark .no-data td {
  color: #aaa;
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
  padding: 1rem;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 16px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  animation: slideUp 0.4s ease-out;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
html.dark .modal-content {
  background: #2c2c2c;
  color: #f1f1f1;
}

.modal-content h2 {
  margin-bottom: 12px;
}
.modal-content label {
  font-weight: 500;
  color: #374151;
}
html.dark .modal-content label {
  color: #ddd;
}

.modal-content input,
.modal-content select {
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  width: 100%;
}
html.dark .modal-content input,
html.dark .modal-content select {
  background: #3a3a3a;
  border-color: #555;
  color: #f1f1f1;
}

/* Butonlar */
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

/* Hatalar */
.error {
  color: #ef4444;
  font-weight: bold;
}

/* Animasyonlar */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* Responsive */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: stretch;
  }

  .search-box {
    width: 100%;
  }

  .sidebar {
    width: 100%;
    flex-direction: row;
    overflow-x: auto;
  }

  .content {
    padding: 20px;
  }
}
</style>

