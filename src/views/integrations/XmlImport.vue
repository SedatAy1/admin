<template>
  <MarketLayout>
    <div class="xml-import-container">
      <div class="top-section">
        <input type="text" placeholder="🔍 Ara..." class="search-input" v-model="searchQuery" />
        <button class="button-primary" @click="openModal">+ Yeni XML Kaynağı</button>
      </div>

      <table class="xml-table">
        <thead>
          <tr>
            <th>XML No</th>
            <th>Adı</th>
            <th>Format</th>
            <th>Dosya Tipi</th>
            <th>Zamanlama</th>
            <th>Durum</th>
            <th>Son İşlem Tarihi</th>
            <th>İşlemler</th>
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
              <button class="button-dropdown">İşlemler ▼</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Modal -->
      <div v-if="modalOpen" class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Yeni XML Kaynağı</h2>
            <button class="close-button" @click="closeModal">×</button>
          </div>

          <!-- Sekmeler -->
          <div class="modal-tabs">
            <button v-for="(tab, index) in tabs" :key="index" @click="activeTab = index"
                    :class="{'active-tab': activeTab === index}">
              {{ tab.label }}
            </button>
          </div>

          <!-- Sekme İçeriği -->
          <div class="modal-body">
            <component :is="tabs[activeTab].component"></component>
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
        { name: "Bilgiler" },
        { name: "Ayarlar" },
        { name: "Kar Oranları" },
        { name: "Ürün Filtreleme" }
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
    },
    saveSettings() {
      console.log("Ayarlar Kaydedildi");
      this.closeModal();
    }
  }
};
</script>

<style scoped>
.xml-import-container {
  padding: 20px;
}
.top-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.search-input {
  padding: 8px;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.button-primary {
  background: #3b82f6;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.button-primary:hover {
  background: #2563eb;
}
.xml-table {
  width: 100%;
  border-collapse: collapse;
}
.xml-table th, .xml-table td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}
.xml-link {
  color: #2563eb;
  text-decoration: none;
  font-weight: bold;
}
.status-badge {
  background: #d1fae5;
  color: #047857;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
}
.button-dropdown {
  background: #e5e7eb;
  border: none;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
}
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
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 600px;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}
.close-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
.modal-tabs button {
  padding: 10px;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: bold;
}
.modal-tabs .active-tab {
  color: #3b82f6;
  border-bottom: 2px solid #3b82f6;
}
</style>
