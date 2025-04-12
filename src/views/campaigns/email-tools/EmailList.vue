<template>
  <div class="email-list-container">
    <div class="header-section">
      <input type="text" class="search-input" :placeholder="$t('emailList.search')" />
      <div class="buttons">
        <button class="btn btn-primary" @click="openNewEmailModal">
          ➕ {{ $t('emailList.new') }}
        </button>
        <button class="btn btn-success" @click="openExcelModal">
          📊 {{ $t('emailList.excel') }}
        </button>
      </div>
    </div>

    <div class="table-container">
      <table v-if="emailList.length > 0">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t('emailList.id') }}</th>
            <th>{{ $t('emailList.email') }}</th>
            <th>{{ $t('emailList.name') }}</th>
            <th>{{ $t('emailList.group') }}</th>
            <th>{{ $t('emailList.ip') }}</th>
            <th>{{ $t('emailList.date') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(email, index) in emailList" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ email.id }}</td>
            <td>{{ email.email }}</td>
            <td>{{ email.name }}</td>
            <td>{{ email.group }}</td>
            <td>{{ email.ip }}</td>
            <td>{{ email.date }}</td>
            <td>
              <button class="btn btn-sm btn-danger" @click="deleteEmail(index)">❌ {{ $t('common.delete') }}</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="empty-state">
        <img src="@/assets/empty.svg" alt="No Data" />
        <p>{{ $t('common.noData') }}</p>
      </div>
    </div>
  </div>

  <!-- Yeni Kayıt Modalı -->
  <div v-if="showNewEmailModal" class="modal-overlay">
    <div class="modal">
      <h2>{{ $t('emailList.newTitle') }}</h2>
      <div class="form-group">
        <label>{{ $t('emailList.email') }}:</label>
        <input type="email" v-model="newEmail.email" required />
      </div>
      <div class="form-group">
        <label>{{ $t('emailList.name') }}:</label>
        <input type="text" v-model="newEmail.name" />
      </div>
      <div class="form-group">
        <label>{{ $t('emailList.group') }}:</label>
        <select v-model="newEmail.group">
          <option>{{ $t('common.none') }}</option>
          <option>Grup 1</option>
          <option>Grup 2</option>
        </select>
      </div>
      <div class="form-group">
        <label>{{ $t('emailList.language') }}:</label>
        <select v-model="newEmail.language">
          <option>{{ $t('common.none') }}</option>
          <option>{{ $t('common.turkish') }}</option>
          <option>{{ $t('common.english') }}</option>
        </select>
      </div>
      <button class="btn btn-primary" @click="saveEmail">{{ $t('common.save') }}</button>
      <button class="btn btn-secondary" @click="closeNewEmailModal">{{ $t('common.cancel') }}</button>
    </div>
  </div>

  <!-- Excel Modalı -->
  <div v-if="showExcelModal" class="modal-overlay">
    <div class="modal">
      <h2>{{ $t('emailList.excelTitle') }}</h2>
      <div class="tab-buttons">
        <button :class="{ active: activeTab === 'export' }" @click="activeTab = 'export'">
          {{ $t('common.export') }}
        </button>
        <button :class="{ active: activeTab === 'import' }" @click="activeTab = 'import'">
          {{ $t('common.import') }}
        </button>
      </div>
      <div class="tab-content">
        <p v-if="activeTab === 'export'">{{ $t('emailList.exportInfo') }}</p>
        <p v-if="activeTab === 'import'">{{ $t('emailList.importInfo') }}</p>
      </div>
      <button class="btn btn-secondary" @click="closeExcelModal">{{ $t('common.close') }}</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      emailList: [],
      showNewEmailModal: false,
      showExcelModal: false,
      newEmail: {
        email: "",
        name: "",
        group: "Hiçbiri",
        language: "Hiçbiri",
      },
      activeTab: "export",
    };
  },
  methods: {
    openNewEmailModal() {
      this.showNewEmailModal = true;
    },
    closeNewEmailModal() {
      this.showNewEmailModal = false;
    },
    openExcelModal() {
      this.showExcelModal = true;
    },
    closeExcelModal() {
      this.showExcelModal = false;
    },
    saveEmail() {
      if (!this.newEmail.email.trim()) {
        alert("E-Posta adresi zorunludur!");
        return;
      }
      this.emailList.push({
        id: this.emailList.length + 1,
        email: this.newEmail.email,
        name: this.newEmail.name,
        group: this.newEmail.group,
        ip: "127.0.0.1",
        date: new Date().toISOString().split("T")[0],
      });
      this.newEmail = { email: "", name: "", group: "Hiçbiri", language: "Hiçbiri" };
      this.closeNewEmailModal();
    },
    deleteEmail(index) {
      this.emailList.splice(index, 1);
    }
  }
};
</script>

<style scoped>
/* Genel Yapı */
.email-list-container {
  padding: 20px;
  background-color: #f9fafb;
  border-radius: 10px;
  transition: background-color 0.3s ease;
}

/* Üst Kısım */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
  background: white;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.04);
}

.search-input {
  flex: 1;
  min-width: 220px;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
}

/* Butonlar */
.buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 16px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  font-weight: 500;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}
.btn-primary:hover {
  background: #2563eb;
}
.btn-success {
  background: #22c55e;
  color: white;
}
.btn-success:hover {
  background: #16a34a;
}
.btn-danger {
  background: #ef4444;
  color: white;
}
.btn-danger:hover {
  background: #dc2626;
}

/* Tablo */
.table-container {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
}

th, td {
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
  font-size: 14px;
  text-align: left;
}

th {
  background: #f3f4f6;
  font-weight: 600;
  color: #374151;
}

/* Boş Durum */
.empty-state {
  text-align: center;
  padding: 40px;
}
.empty-state img {
  width: 100px;
  opacity: 0.5;
  margin-bottom: 10px;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background: white;
  padding: 25px;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  position: relative;
}

.form-group {
  margin-bottom: 16px;
}
label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
}
input,
select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
}

/* Sekme Butonları */
.tab-buttons {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
.tab-buttons button {
  flex: 1;
  padding: 10px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  background: #e5e7eb;
  color: #1f2937;
  cursor: pointer;
  margin: 0 5px;
}
.tab-buttons button.active {
  background: #3b82f6;
  color: white;
}
.tab-content {
  padding: 10px 0;
}

/* Dark Mode */
:root.dark .email-list-container {
  background-color: #111827;
}
:root.dark .header-section,
:root.dark .table-container,
:root.dark .modal {
  background-color: #1f2937;
  color: #dbdfe2;
}
:root.dark .search-input,
:root.dark input,
:root.dark select {
  background: #0f172a;
  color: white;
  border-color: #334155;
}
:root.dark th {
  background-color: #374151;
  color: white;
}
:root.dark td {
  color: #e5e7eb;
}
:root.dark .btn-primary {
  background: #2563eb;
}
:root.dark .btn-success {
  background: #16a34a;
}
:root.dark .btn-danger {
  background: #dc2626;
}
:root.dark .tab-buttons button {
  background: #334155;
  color: white;
}
:root.dark .tab-buttons button.active {
  background: #3b82f6;
}

/* Responsive */
@media (max-width: 768px) {
  .header-section {
    flex-direction: column;
    align-items: stretch;
  }

  .buttons {
    width: 100%;
    justify-content: space-between;
  }

  .table-container {
    padding: 10px;
  }

  table {
    font-size: 13px;
  }

  .modal {
    width: 95%;
  }
}

</style>