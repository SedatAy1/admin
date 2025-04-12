<template>
  <div class="compatibility-groups">
    <div class="header">
      <input type="text" :placeholder="$t('group.search')" class="search-input" v-model="searchTerm" />
      <button class="btn primary" @click="showNewGroupModal = true">{{ $t('group.new') }}</button>
      <button class="btn blue" @click="showVehicleListModal = true">{{ $t('group.vehicleList') }}</button>
      <button class="btn green" @click="showExcelModal = true">{{ $t('group.excel') }}</button>
    </div>

    <table class="group-table">
      <thead>
        <tr>
          <th>#</th>
          <th>{{ $t('group.id') }}</th>
          <th>{{ $t('group.name') }}</th>
          <th>{{ $t('group.code') }}</th>
          <th>{{ $t('group.autoList') }}</th>
          <th>{{ $t('common.actions') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="groups.length === 0">
          <td colspan="6" class="empty-data">
            <i class="fas fa-frown"></i> {{ $t('group.noData') }}
          </td>
        </tr>
        <tr v-for="(group, index) in groups" :key="group.id">
          <td>{{ index + 1 }}</td>
          <td>{{ group.id }}</td>
          <td>{{ group.name }}</td>
          <td>{{ group.code }}</td>
          <td>{{ group.autoList ? '✔' : '✖' }}</td>
          <td>
            <button class="btn small">{{ $t('common.actions') }}</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Yeni Uyumluluk Grubu Modal -->
    <Modal :isOpen="showNewGroupModal" :title="$t('group.newTitle')" @close="showNewGroupModal = false">
      <div class="modal-body">
        <div class="form-group">
          <label>{{ $t('group.name') }} <span class="required">{{ $t('common.required') }}</span></label>
          <input type="text" v-model="newGroup.name" />
        </div>
        <div class="form-group">
          <label>{{ $t('group.code') }}</label>
          <input type="text" v-model="newGroup.code" />
        </div>
      </div>
      <template v-slot:footer>
        <button class="submit-btn" @click="saveGroup">{{ $t('common.save') }}</button>
      </template>
    </Modal>

    <!-- Hazır Araç Listesi Modal -->
    <Modal :isOpen="showVehicleListModal" :title="$t('group.vehicleListTitle')" @close="showVehicleListModal = false">
      <div class="modal-body">
        <p>{{ $t('group.vehicleListInfo') }}</p>
      </div>
    </Modal>

    <!-- Excel İşlemleri Modal -->
    <Modal :isOpen="showExcelModal" :title="$t('group.excelTitle')" @close="showExcelModal = false">
      <div class="modal-body">
        <div class="tabs">
          <button v-for="tab in excelTabs" :key="tab" @click="activeExcelTab = tab" :class="{ active: activeExcelTab === tab }">
            {{ $t(`group.tabs.${tab}`) }}
          </button>
        </div>
        <div v-if="activeExcelTab === 'Dışa Aktar'">
          <p>{{ $t('group.exportInfo') }}</p>
          <button class="download-btn" @click="downloadExcel">{{ $t('common.download') }}</button>
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
  background: #ffffff;
  min-height: 100vh;
  transition: background 0.3s ease;
}

/* Header */
.header {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
  margin-bottom: 20px;
}

.search-input {
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  min-width: 220px;
  font-size: 14px;
}

.btn {
  padding: 10px 16px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  border: none;
}

.primary {
  background: #003c8f;
  color: white;
}
.blue {
  background: #007bff;
  color: white;
}
.green {
  background: #228b22;
  color: white;
}
.small {
  font-size: 13px;
  padding: 6px 10px;
}

/* Tablo */
.group-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.group-table th,
.group-table td {
  padding: 12px;
  text-align: center;
  font-size: 14px;
  border-bottom: 1px solid #e0e0e0;
}

.group-table thead {
  background: #f5f7fa;
}

.empty-data {
  text-align: center;
  padding: 30px;
  font-size: 15px;
  color: #777;
}

/* Modal */
.modal-body {
  padding: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 14px;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 6px;
}

.required {
  color: red;
  font-size: 12px;
  margin-left: 6px;
}

.form-group input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background: #007bff;
  color: white;
  border: none;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
}

/* Excel Tabs */
.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.tabs button {
  padding: 8px 12px;
  border: none;
  background: #f1f5f9;
  cursor: pointer;
  border-radius: 5px;
  font-weight: 500;
  font-size: 14px;
}

.tabs button.active {
  background: #007bff;
  color: white;
}

/* Dark Mode */
.dark-mode .compatibility-groups {
  background: #1e293b;
  color: #f1f5f9;
}

.dark-mode .search-input {
  background: #1e293b;
  border-color: #475569;
  color: #f8fafc;
}

.dark-mode .group-table {
  background: #1e293b;
  color: #e2e8f0;
}

.dark-mode .group-table thead {
  background: #334155;
}

.dark-mode .group-table th,
.dark-mode .group-table td {
  border-color: #334155;
}

.dark-mode .empty-data {
  color: #94a3b8;
}

.dark-mode .form-group input {
  background: #1e293b;
  border-color: #475569;
  color: #f8fafc;
}

.dark-mode .submit-btn {
  background: #3b82f6;
}

.dark-mode .tabs button {
  background: #475569;
  color: #f1f5f9;
}
.dark-mode .tabs button.active {
  background: #3b82f6;
  color: white;
}

/* Responsive */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: stretch;
  }

  .search-input,
  .btn {
    width: 100%;
  }

  .group-table {
    font-size: 13px;
  }

  th, td {
    padding: 10px;
  }
}
</style>