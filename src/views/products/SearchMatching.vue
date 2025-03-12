<template>
  <div class="search-matching">
    <!-- Arama Çubuğu ve Butonlar -->
    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="🔍 Ara..." />
      <button class="primary-btn" @click="showNewMatchingModal = true">+ Yeni Eşleştirme</button>
      <button class="excel-btn" @click="showExcelModal = true">📊 Excel İşlemleri</button>
    </div>

    <!-- Yeni Eşleştirme Modal -->
    <Modal :isOpen="showNewMatchingModal" title="Yeni Arama Eşleştirmesi" @close="showNewMatchingModal = false">
      <div class="modal-body">
        <div class="info-box">
          <i class="fas fa-info-circle"></i>
          <p>
            Ziyaretçileriniz sitede yaptığı kelime hatalarını doğruları ile eşleştirerek doğru sonuçlara ulaşmasını sağlayabilirsiniz.
            <br />
            Örneğin; tişört, tishirt gibi hatalı kelimeleri t-shirt ile eşleştirebilirsiniz.
          </p>
        </div>
        <div class="form-group">
          <label>Aranan Kelime <span class="required">Zorunlu</span></label>
          <input type="text" v-model="newMatch.searchTerm" />
        </div>
        <div class="form-group">
          <label>Eşleştirilen Kelime <span class="required">Zorunlu</span></label>
          <input type="text" v-model="newMatch.matchedTerm" />
        </div>
      </div>
      <template v-slot:footer>
        <button class="save-btn" @click="saveMatch">✔ Kaydet</button>
      </template>
    </Modal>

    <!-- Excel İşlemleri Modal -->
    <Modal :isOpen="showExcelModal" title="Arama Eşleştirme - Excel İşlemleri" @close="showExcelModal = false">
      <div class="modal-body">
        <div class="tabs">
          <button @click="activeTab = 'export'" :class="{ active: activeTab === 'export' }">Dışa Aktar</button>
          <button @click="activeTab = 'import'" :class="{ active: activeTab === 'import' }">İçe Aktar</button>
        </div>
        <div v-if="activeTab === 'export'">
          <div class="info-box">
            <i class="fas fa-info-circle"></i>
            <span>Tüm veriler excel olarak dışarı aktarılacaktır.</span>
          </div>
          <button class="download-btn" @click="downloadExcel">
            <i class="fas fa-download"></i> İndir
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
  gap: 10px;
  align-items: center;
  margin-bottom: 20px;
}
.search-bar input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.primary-btn, .excel-btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  color: white;
}
.primary-btn { background: #003c8f; }
.excel-btn { background: #228b22; }
.modal-body {
  padding: 10px;
}
.info-box {
  background: #f0f8ff;
  padding: 10px;
  border-left: 5px solid #007bff;
  margin-bottom: 10px;
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
}
.tabs button.active {
  background: #007bff;
  color: white;
}
.download-btn {
  padding: 10px 15px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.save-btn {
  background: #003c8f;
  color: white;
  padding: 10px;
  border: none;
  width: 100%;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
