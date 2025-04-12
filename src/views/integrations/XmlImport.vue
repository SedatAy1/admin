<template>
  <MarketLayout>
    <div class="xml-import-container">
      <div class="top-section">
        <input type="text" :placeholder="$t('common.search')" class="search-input" v-model="searchQuery" />
        <button class="button-primary" @click="openModal">+ {{ $t("xml.addNew") }}</button>
      </div>

      <table class="xml-table">
        <thead>
          <tr>
            <th>{{ $t("xml.fields.id") }}</th>
            <th>{{ $t("xml.fields.name") }}</th>
            <th>{{ $t("xml.fields.format") }}</th>
            <th>{{ $t("xml.fields.fileType") }}</th>
            <th>{{ $t("xml.fields.schedule") }}</th>
            <th>{{ $t("xml.fields.status") }}</th>
            <th>{{ $t("xml.fields.lastProcess") }}</th>
            <th>{{ $t("common.actions") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="xml in filteredXmlData" :key="xml.id">
            <td><a href="#" class="xml-link">{{ xml.id }}</a></td>
            <td>{{ xml.name }}</td>
            <td>{{ xml.format }}</td>
            <td>{{ xml.fileType }}</td>
            <td>{{ xml.schedule }}</td>
            <td><span class="status-badge">{{ xml.status }}</span></td>
            <td>{{ xml.lastProcessDate }}</td>
            <td>
              <button class="button-dropdown">{{ $t("common.actions") }} ▼</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Modal -->
      <div v-if="modalOpen" class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <h2>{{ $t("xml.addNew") }}</h2>
            <button class="close-button" @click="closeModal">×</button>
          </div>

          <!-- Sekmeler -->
          <div class="modal-tabs">
            <button
              v-for="(tab, index) in tabs"
              :key="index"
              @click="activeTab = index"
              :class="{ 'active-tab': activeTab === index }"
            >
              {{ $t(`xml.tabs.${tab.name}`) }}
            </button>
          </div>

          <!-- Sekme İçeriği -->
          <div class="modal-body">
            <component :is="tabs[activeTab].component || 'div'">
              <p>{{ $t("xml.tabs.description") }}</p>
            </component>
          </div>
        </div>
      </div>
    </div>
  </MarketLayout>
</template>

<script>
import MarketLayout from "@/views/integrations/MarketLayout.vue";

export default {
  components: {
    MarketLayout,
  },
  data() {
    return {
      searchQuery: "",
      modalOpen: false,
      activeTab: 0,
      tabs: [
        { name: "info" },
        { name: "settings" },
        { name: "profit" },
        { name: "filtering" }
      ],
      xmlData: [
        {
          id: 1,
          name: "Test",
          format: "XML",
          fileType: "Dosya Linki",
          schedule: "Hiçbir Zaman",
          status: "İşlem Tamamlandı",
          lastProcessDate: "2021-05-05 21:57"
        }
      ]
    };
  },
  computed: {
    filteredXmlData() {
      return this.xmlData.filter(xml =>
        xml.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    openModal() {
      this.modalOpen = true;
    },
    closeModal() {
      this.modalOpen = false;
    }
  }
};
</script>

<style scoped>
.xml-import-container {
  padding: 20px;
  transition: background 0.3s ease-in-out;
}

html.dark .xml-import-container {
  background-color: #1e1e1e;
  color: #e4e4e4;
}

/* Top section */
.top-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
}

.search-input {
  padding: 8px;
  width: 300px;
  max-width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 4px rgba(59, 130, 246, 0.5);
}

html.dark .search-input {
  background: #2c2c2c;
  color: #e4e4e4;
  border-color: #444;
}
html.dark .search-input::placeholder {
  color: #aaa;
}

/* Buttons */
.button-primary {
  background: #3b82f6;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}
.button-primary:hover {
  background: #2563eb;
}

/* Table */
.xml-table {
  width: 100%;
  border-collapse: collapse;
  transition: color 0.3s;
}

.xml-table th,
.xml-table td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

html.dark .xml-table th,
html.dark .xml-table td {
  border-color: #444;
}

.xml-link {
  color: #2563eb;
  text-decoration: none;
  font-weight: bold;
}
html.dark .xml-link {
  color: #60a5fa;
}

/* Status badge */
.status-badge {
  background: #d1fae5;
  color: #047857;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
}
html.dark .status-badge {
  background: #064e3b;
  color: #a7f3d0;
}

/* Dropdown */
.button-dropdown {
  background: #e5e7eb;
  border: none;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
}
.button-dropdown:hover {
  background: #d1d5db;
}
html.dark .button-dropdown {
  background: #374151;
  color: #e5e7eb;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  max-height: 90vh;
  transition: background 0.3s ease;
}

html.dark .modal-content {
  background: #2a2a2a;
  color: #f1f1f1;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}
html.dark .modal-header {
  border-color: #444;
}

.close-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: inherit;
}

/* Tabs */
.modal-tabs {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.modal-tabs button {
  padding: 10px;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: bold;
  color: inherit;
}

.modal-tabs .active-tab {
  color: #3b82f6;
  border-bottom: 2px solid #3b82f6;
}
html.dark .modal-tabs .active-tab {
  color: #60a5fa;
  border-color: #60a5fa;
}

/* Responsive adjustments */
@media (max-width: 576px) {
  .search-input {
    width: 100%;
  }

  .modal-content {
    padding: 15px;
  }

  .top-section {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>