<template>
  <div class="attributes">
    <!-- Arama ve Butonlar -->
    <div class="header">
      <input type="text" v-model="searchQuery" :placeholder="$t('attribute.search')" class="search-box" />
      <button class="btn primary" @click="showNewAttributeModal = true">{{ $t('attribute.new') }}</button>
    </div>

    <!-- Nitelik Tablosu -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t('attribute.id') }}</th>
            <th>{{ $t('attribute.name') }}</th>
            <th>{{ $t('attribute.code') }}</th>
            <th>{{ $t('attribute.order') }}</th>
            <th>{{ $t('attribute.status') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="attributes.length === 0">
            <td colspan="7" class="empty-state">
              <img src="@/assets/no-data.png" alt="No Data" />
              <p>{{ $t('attribute.noData') }}</p>
            </td>
          </tr>
          <tr v-for="attribute in filteredAttributes" :key="attribute.id">
            <td><input type="checkbox" /></td>
            <td>{{ attribute.id }}</td>
            <td>{{ attribute.name }}</td>
            <td>{{ attribute.code }}</td>
            <td>{{ attribute.order }}</td>
            <td>
              <span class="status" :class="{ 'active': attribute.status === $t('attribute.active'), 'inactive': attribute.status === $t('attribute.passive') }">
                ✔ {{ $t(`attribute.${attribute.status === 'Aktif' ? 'active' : 'passive'}`) }}
              </span>
            </td>
            <td>
              <button class="action-btn">{{ $t('common.actions') }} ▼</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Yeni Nitelik Modal -->
    <Modal :isOpen="showNewAttributeModal" :title="$t('attribute.newTitle')" @close="showNewAttributeModal = false">
      <div class="modal-body">
        <div class="tab-header">
          <button :class="{ active: activeTab === 'Genel Bilgiler' }" @click="activeTab = 'Genel Bilgiler'">
            📌 {{ $t('attribute.tabs.general') }}
          </button>
          <button :class="{ active: activeTab === 'Nitelik Değerleri' }" @click="activeTab = 'Nitelik Değerleri'">
            📋 {{ $t('attribute.tabs.values') }}
          </button>
        </div>

        <div v-if="activeTab === 'Genel Bilgiler'">
          <div class="form-group">
            <label>{{ $t('attribute.name') }} <span class="required">{{ $t('common.required') }}</span></label>
            <input type="text" v-model="newAttribute.name" />
          </div>
          <div class="form-group">
            <label>{{ $t('attribute.code') }}</label>
            <input type="text" v-model="newAttribute.code" />
          </div>
          <div class="form-group">
            <label>{{ $t('attribute.image') }}</label>
            <input type="file" />
          </div>
          <div class="form-group">
            <label>{{ $t('attribute.status') }} <span class="required">{{ $t('common.required') }}</span></label>
            <select v-model="newAttribute.status">
              <option>{{ $t('attribute.active') }}</option>
              <option>{{ $t('attribute.passive') }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>{{ $t('attribute.order') }}</label>
            <input type="number" v-model="newAttribute.order" />
          </div>
        </div>

        <div v-if="activeTab === 'Nitelik Değerleri'">
          <p>{{ $t('attribute.valuesInfo') }}</p>
        </div>
      </div>

      <template v-slot:footer>
        <button class="submit-btn" @click="saveAttribute">✔ {{ $t('common.save') }}</button>
      </template>
    </Modal>
  </div>
</template>
<script>
import Modal from "@/components/Modal.vue";

export default {
  name: "Attributes",
  components: { Modal },
  data() {
    return {
      showNewAttributeModal: false,
      activeTab: "Genel Bilgiler",
      searchQuery: "",
      newAttribute: {
        name: "",
        code: "",
        image: null,
        status: "Aktif",
        order: 0,
      },
      attributes: [

      ],
    };
  },
  computed: {
    filteredAttributes() {
      return this.attributes.filter(attr =>
        attr.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    saveAttribute() {
      this.attributes.push({
        id: this.attributes.length + 1,
        name: this.newAttribute.name,
        code: this.newAttribute.code,
        order: this.newAttribute.order,
        status: this.newAttribute.status,
      });

      this.newAttribute = { name: "", code: "", image: null, status: "Aktif", order: 0 };
      this.showNewAttributeModal = false;
    },
  },
};
</script>

<style scoped>
.attributes {
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

.search-box {
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  min-width: 220px;
}

/* Tablo */
.table-container {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  font-size: 14px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

th {
  background: #f1f5f9;
  font-weight: 600;
  color: #1f2937;
}

.empty-state {
  text-align: center;
  padding: 40px 0;
  color: #555;
}

.empty-state img {
  max-width: 120px;
  margin-bottom: 10px;
}

/* Durum Renkleri */
.status {
  padding: 6px 12px;
  border-radius: 4px;
  font-weight: 500;
  font-size: 13px;
}

.status.active {
  background: #dcfce7;
  color: #15803d;
}

.status.inactive {
  background: #fee2e2;
  color: #b91c1c;
}

/* Butonlar */
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

.action-btn {
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  padding: 6px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
}

/* Modal */
.modal-body {
  padding: 20px;
}

.tab-header {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.tab-header button {
  padding: 8px 14px;
  border: none;
  background: #f3f4f6;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.tab-header button.active {
  background: #2563eb;
  color: white;
}

.form-group {
  margin-bottom: 14px;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
}

.form-group input,
.form-group select {
  width: 100%;
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
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
}

/* Dark Mode */
.dark-mode .attributes {
  background: #1e293b;
  color: #e2e8f0;
}

.dark-mode .search-box {
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

.dark-mode th {
  background: #334155;
  color: #f1f5f9;
}

.dark-mode td {
  border-color: #334155;
}

.dark-mode .status.active {
  background: #166534;
  color: #bbf7d0;
}

.dark-mode .status.inactive {
  background: #7f1d1d;
  color: #fecaca;
}

.dark-mode .action-btn {
  background: #334155;
  color: #e2e8f0;
}

.dark-mode .tab-header button {
  background: #334155;
  color: #e2e8f0;
}

.dark-mode .tab-header button.active {
  background: #3b82f6;
  color: white;
}

.dark-mode .form-group input,
.dark-mode .form-group select {
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

  .search-box,
  .btn {
    width: 100%;
  }

  .tab-header {
    flex-direction: column;
  }

  th, td {
    font-size: 13px;
    padding: 10px;
  }
}
</style>
