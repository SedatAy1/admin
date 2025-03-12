<template>
  <div class="compatibility-groups">
    <div class="header">
      <input type="text" placeholder="🔍 Ara..." class="search-input" v-model="searchTerm" />
      <button class="btn primary" @click="showNewGroupModal = true">+ Yeni Uyumluluk Grubu</button>
      <button class="btn blue" @click="showVehicleListModal = true">+ Hazır Araç Listesi</button>
      <button class="btn green" @click="showExcelModal = true">📊 Excel İşlemleri</button>
    </div>

    <table class="group-table">
      <thead>
        <tr>
          <th>#</th>
          <th>No</th>
          <th>Grup Adı</th>
          <th>Grup Kodu</th>
          <th>Auto List</th>
          <th>İşlemler</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="groups.length === 0">
          <td colspan="6" class="empty-data">
            <i class="fas fa-frown"></i> Kayıt bulunamadı.
          </td>
        </tr>
        <tr v-for="(group, index) in groups" :key="group.id">
          <td>{{ index + 1 }}</td>
          <td>{{ group.id }}</td>
          <td>{{ group.name }}</td>
          <td>{{ group.code }}</td>
          <td>{{ group.autoList ? '✔' : '✖' }}</td>
          <td>
            <button class="btn small">İşlemler</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Yeni Uyumluluk Grubu Modal -->
    <Modal :isOpen="showNewGroupModal" title="Yeni Uyumluluk Grubu" @close="showNewGroupModal = false">
      <div class="modal-body">
        <div class="form-group">
          <label>Grup Adı <span class="required">Zorunlu</span></label>
          <input type="text" v-model="newGroup.name" />
        </div>
        <div class="form-group">
          <label>Grup Kodu</label>
          <input type="text" v-model="newGroup.code" />
        </div>
      </div>
      <template v-slot:footer>
        <button class="submit-btn" @click="saveGroup">Kaydet</button>
      </template>
    </Modal>

    <!-- Hazır Araç Listesi Modal -->
    <Modal :isOpen="showVehicleListModal" title="Araç Listesi" @close="showVehicleListModal = false">
      <div class="modal-body">
        <p>Seçilen veriler ile uyumluluk oluşturulacaktır.</p>
      </div>
    </Modal>

    <!-- Excel İşlemleri Modal -->
    <Modal :isOpen="showExcelModal" title="Uyumluluk Listesi - Excel İşlemleri" @close="showExcelModal = false">
      <div class="modal-body">
        <div class="tabs">
          <button v-for="tab in excelTabs" :key="tab" @click="activeExcelTab = tab" :class="{ active: activeExcelTab === tab }">
            {{ tab }}
          </button>
        </div>
        <div v-if="activeExcelTab === 'Dışa Aktar'">
          <p>Tüm veriler excel olarak dışarı aktarılacaktır.</p>
          <button class="download-btn" @click="downloadExcel">İndir</button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";

export default {
  name: "CompatibilityGroups",
  components: { Modal },
  data() {
    return {
      showNewGroupModal: false,
      showVehicleListModal: false,
      showExcelModal: false,
      activeExcelTab: "Dışa Aktar",
      excelTabs: ["Dışa Aktar", "İçe Aktar"],
      searchTerm: "",
      newGroup: {
        name: "",
        code: ""
      },
      groups: [] // API'den gelecek veriler
    };
  },
  methods: {
    saveGroup() {
      console.log("Yeni uyumluluk grubu kaydedildi:", this.newGroup);
      this.showNewGroupModal = false;
    },
    downloadExcel() {
      console.log("Excel Verileri İndirildi!");
      this.showExcelModal = false;
    }
  }
};
</script>

<style scoped>
.compatibility-groups {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.search-input {
  padding: 8px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.primary { background: #003c8f; color: white; }
.blue { background: #007bff; color: white; }
.green { background: #228b22; color: white; }

.group-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.group-table th, .group-table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
}

.empty-data {
  text-align: center;
  padding: 20px;
  color: #777;
}

.modal-body {
  padding: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.submit-btn {
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
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
</style>
