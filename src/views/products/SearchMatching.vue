<template>
  <div class="search-matching">
    <!-- Arama Çubuğu ve Butonlar -->
    <div class="search-bar">
      <input type="text" v-model="searchQuery" :placeholder="$t('matching.search')" />
      <button class="primary-btn" @click="showNewMatchingModal = true">{{ $t('matching.new') }}</button>
      <button class="excel-btn" @click="showExcelModal = true">{{ $t('matching.excel') }}</button>
    </div>

    <!-- Yeni Eşleştirme Modal -->
    <Modal :isOpen="showNewMatchingModal" :title="$t('matching.newTitle')" @close="showNewMatchingModal = false">
      <div class="modal-body">
        <div class="info-box">
          <i class="fas fa-info-circle"></i>
          <p>{{ $t('matching.info') }}</p>
        </div>
        <div class="form-group">
          <label>{{ $t('matching.searchWord') }} <span class="required">{{ $t('common.required') }}</span></label>
          <input type="text" v-model="newMatch.searchTerm" />
        </div>
        <div class="form-group">
          <label>{{ $t('matching.matchWord') }} <span class="required">{{ $t('common.required') }}</span></label>
          <input type="text" v-model="newMatch.matchedTerm" />
        </div>
      </div>
      <template v-slot:footer>
        <button class="save-btn" @click="saveMatch">✔ {{ $t('common.save') }}</button>
      </template>
    </Modal>

    <!-- Excel İşlemleri Modal -->
    <Modal :isOpen="showExcelModal" :title="$t('matching.excelTitle')" @close="showExcelModal = false">
      <div class="modal-body">
        <div class="tabs">
          <button @click="activeTab = 'export'" :class="{ active: activeTab === 'export' }">{{ $t('matching.tabs.export') }}</button>
          <button @click="activeTab = 'import'" :class="{ active: activeTab === 'import' }">{{ $t('matching.tabs.import') }}</button>
        </div>
        <div v-if="activeTab === 'export'">
          <div class="info-box">
            <i class="fas fa-info-circle"></i>
            <span>{{ $t('matching.exportInfo') }}</span>
          </div>
          <button class="download-btn" @click="downloadExcel">
            <i class="fas fa-download"></i> {{ $t('common.download') }}
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import Modal from "@/components/Modal.vue";

export default {
  name: "SearchMatching",
  components: { Modal },
  data() {
    return {
      searchQuery: "",
      showNewMatchingModal: false,
      showExcelModal: false,
      activeTab: "export",
      newMatch: {
        searchTerm: "",
        matchedTerm: "",
      },
    };
  },
  methods: {
    saveMatch() {
      console.log("Yeni eşleştirme kaydedildi:", this.newMatch);
      this.showNewMatchingModal = false;
    },
    downloadExcel() {
      console.log("Excel Verileri İndirildi!");
      this.showExcelModal = false;
    },
  },
};
</script>

<style scoped>
.search-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 20px;
}

.search-bar input {
  flex: 1 1 250px;
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

.primary-btn,
.excel-btn {
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: white;
  transition: background 0.3s ease;
}

.primary-btn {
  background: #003c8f;
}

.primary-btn:hover {
  background: #002f6c;
}

.excel-btn {
  background: #228b22;
}

.excel-btn:hover {
  background: #1a691a;
}

.modal-body {
  padding: 20px;
}

.info-box {
  background: #f0f8ff;
  padding: 12px;
  border-left: 5px solid #007bff;
  margin-bottom: 15px;
  border-radius: 5px;
  font-size: 14px;
  line-height: 1.5;
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.info-box i {
  color: #007bff;
  font-size: 18px;
  margin-top: 3px;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.required {
  color: red;
  font-size: 12px;
  margin-left: 5px;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.tabs button {
  padding: 8px 12px;
  border: none;
  background: #f0f0f0;
  cursor: pointer;
  border-radius: 5px;
  font-weight: 500;
}

.tabs button.active {
  background: #007bff;
  color: white;
}

.download-btn {
  padding: 10px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.download-btn i {
  font-size: 16px;
}

.save-btn {
  background: #003c8f;
  color: white;
  padding: 12px;
  border: none;
  width: 100%;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.save-btn:hover {
  background: #002f6c;
}

/* Dark Mode */
.dark-mode .search-bar input {
  background: #1e293b;
  color: #f1f5f9;
  border-color: #475569;
}

.dark-mode .modal-body,
.dark-mode .tabs button {
  background: #1e293b;
  color: #f1f5f9;
}

.dark-mode .form-group input {
  background: #1e293b;
  color: #f1f5f9;
  border-color: #475569;
}

.dark-mode .info-box {
  background: #334155;
  color: #f1f5f9;
  border-left-color: #60a5fa;
}

.dark-mode .tabs button.active {
  background: #3b82f6;
  color: white;
}

.dark-mode .download-btn {
  background: #3b82f6;
}

.dark-mode .save-btn {
  background: #0ea5e9;
}

.dark-mode .save-btn:hover {
  background: #0284c7;
}

/* Responsive */
@media (max-width: 768px) {
  .search-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .primary-btn,
  .excel-btn {
    width: 100%;
  }
}
</style>