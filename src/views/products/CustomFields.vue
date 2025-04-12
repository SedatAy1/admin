<template>
  <div class="custom-fields">
    <!-- Arama ve Yeni Özel Alan Butonu -->
    <div class="header">
      <input type="text" :placeholder="$t('customField.search')" v-model="searchTerm" class="search-bar" />
      <button class="btn primary" @click="showNewFieldModal = true">{{ $t('customField.new') }}</button>
    </div>

    <!-- Özel Alanları Listeleyen Tablo -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t('customField.id') }}</th>
            <th>{{ $t('customField.name') }}</th>
            <th>{{ $t('customField.type') }}</th>
            <th>{{ $t('customField.status') }}</th>
            <th>{{ $t('customField.required') }}</th>
            <th>{{ $t('customField.order') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="customFields.length === 0">
            <td colspan="8" class="no-data">
              <img src="@/assets/no-data.png" :alt="$t('customField.noData')" />
              <p>{{ $t('customField.noData') }}</p>
            </td>
          </tr>
          <tr v-for="(field, index) in filteredFields" :key="field.id">
            <td>{{ index + 1 }}</td>
            <td>{{ field.id }}</td>
            <td>{{ field.name }}</td>
            <td>{{ $t(`customField.types.${field.type}`) }}</td>
            <td :class="field.status === 'Aktif' ? 'active' : 'passive'">{{ $t(`customField.statuses.${field.status}`) }}</td>
            <td>
              <span v-if="field.required">✅</span>
              <span v-else>❌</span>
            </td>
            <td>{{ field.order }}</td>
            <td>
              <button class="action-btn">{{ $t('common.actions') }} ⏷</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Yeni Özel Alan Modalı -->
    <Modal :isOpen="showNewFieldModal" :title="$t('customField.newTitle')" @close="showNewFieldModal = false">
      <div class="modal-body">
        <div class="form-group">
          <label>{{ $t('customField.name') }} <span class="required">{{ $t('common.required') }}</span></label>
          <input type="text" v-model="newField.name" />
        </div>
        <div class="form-group">
          <label>{{ $t('customField.type') }}</label>
          <select v-model="newField.type">
            <option value="Metin Kutusu">{{ $t('customField.types.Metin Kutusu') }}</option>
            <option value="Seçim Kutusu">{{ $t('customField.types.Seçim Kutusu') }}</option>
            <option value="Dosya Yükleme">{{ $t('customField.types.Dosya Yükleme') }}</option>
          </select>
        </div>
        <div class="form-group">
          <label>{{ $t('customField.description') }}</label>
          <textarea v-model="newField.description"></textarea>
        </div>
        <div class="form-group">
          <label>{{ $t('customField.status') }} <span class="required">{{ $t('common.required') }}</span></label>
          <select v-model="newField.status">
            <option value="Aktif">{{ $t('customField.statuses.Aktif') }}</option>
            <option value="Pasif">{{ $t('customField.statuses.Pasif') }}</option>
          </select>
        </div>
        <div class="form-group">
          <label>{{ $t('customField.order') }}</label>
          <input type="number" v-model="newField.order" />
        </div>
        <div class="form-group switch-group">
          <label>{{ $t('customField.required') }}</label>
          <input type="checkbox" v-model="newField.required" />
        </div>
      </div>
      <template v-slot:footer>
        <button class="submit-btn" @click="saveField">✔ {{ $t('common.save') }}</button>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";

export default {
  name: "CustomFields",
  components: { Modal },
  data() {
    return {
      showNewFieldModal: false, // Yeni özel alan modalını kontrol eder
      searchTerm: "",
      customFields: [], // Özel alanları tutacak liste
      newField: {
        name: "",
        type: "Metin Kutusu",
        description: "",
        status: "Aktif",
        order: 0,
        required: false,
      },
    };
  },
  computed: {
    filteredFields() {
      if (!this.searchTerm) return this.customFields;
      return this.customFields.filter((field) =>
        field.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
  methods: {
    saveField() {
      this.customFields.push({
        id: this.customFields.length + 1,
        name: this.newField.name,
        type: this.newField.type,
        description: this.newField.description,
        status: this.newField.status,
        order: this.newField.order,
        required: this.newField.required,
      });
      this.showNewFieldModal = false;
      this.newField = { name: "", type: "Metin Kutusu", description: "", status: "Aktif", order: 0, required: false };
    },
  },
};
</script>

<style scoped>
.custom-fields {
  padding: 20px;
  background: #ffffff;
  min-height: 100vh;
  transition: background 0.3s ease;
}

/* Arama ve Buton */
.header {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
  margin-bottom: 20px;
}

.search-bar {
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  min-width: 220px;
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
  background: #2563eb;
  color: white;
}

/* Tablo */
.table-container {
  width: 100%;
  background: white;
  border-radius: 8px;
  overflow-x: auto;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #f1f5f9;
}

th, td {
  padding: 12px;
  text-align: center;
  font-size: 14px;
  border-bottom: 1px solid #e5e7eb;
}

.no-data {
  text-align: center;
  padding: 30px;
  color: #555;
}

.no-data img {
  max-width: 120px;
  margin-bottom: 10px;
}

.active {
  color: #16a34a;
  font-weight: 600;
}

.passive {
  color: #dc2626;
  font-weight: 600;
}

.action-btn {
  background: #2563eb;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
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
  font-weight: bold;
  margin-bottom: 6px;
}

.required {
  color: #dc2626;
  font-size: 12px;
  margin-left: 5px;
}

.switch-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 10px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 14px;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background: #2563eb;
  color: white;
  border: none;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
}

/* Dark Mode */
.dark-mode .custom-fields {
  background: #1e293b;
  color: #e2e8f0;
}

.dark-mode .search-bar {
  background: #1e293b;
  color: #f8fafc;
  border-color: #475569;
}

.dark-mode .table-container {
  background: #1e293b;
}

.dark-mode table {
  color: #e2e8f0;
}

.dark-mode thead {
  background: #334155;
}

.dark-mode th,
.dark-mode td {
  border-color: #334155;
}

.dark-mode .no-data {
  color: #94a3b8;
}

.dark-mode .active {
  color: #86efac;
}

.dark-mode .passive {
  color: #fca5a5;
}

.dark-mode .action-btn {
  background: #3b82f6;
  color: white;
}

.dark-mode .form-group input,
.dark-mode .form-group select,
.dark-mode .form-group textarea {
  background: #1e293b;
  color: #f8fafc;
  border-color: #475569;
}

.dark-mode .submit-btn {
  background: #3b82f6;
}

/* Responsive */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: stretch;
  }

  .search-bar,
  .btn {
    width: 100%;
  }

  table {
    font-size: 13px;
  }

  th, td {
    padding: 10px;
  }
}
</style>
