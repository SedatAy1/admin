<template>
  <div class="sms-container">
    <div class="header-section">
      <input type="text" class="search-input" :placeholder="$t('sms.search')" />
      <div class="buttons">
        <button class="btn btn-primary" @click="openNewSMSModal">
          ➕ {{ $t('sms.newRecord') }}
        </button>
        <button class="btn btn-success" @click="openExcelModal">
          📊 {{ $t('sms.excelActions') }}
        </button>
      </div>
    </div>

    <div class="table-container">
      <table v-if="smsList.length > 0">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t('sms.recordNo') }}</th>
            <th>{{ $t('sms.number') }}</th>
            <th>{{ $t('sms.name') }}</th>
            <th>{{ $t('sms.group') }}</th>
            <th>{{ $t('sms.ip') }}</th>
            <th>{{ $t('sms.date') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(sms, index) in smsList" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ sms.id }}</td>
            <td>{{ sms.number }}</td>
            <td>{{ sms.name }}</td>
            <td>{{ sms.group }}</td>
            <td>{{ sms.ip }}</td>
            <td>{{ sms.date }}</td>
            <td>
              <button class="btn btn-sm btn-danger" @click="deleteSMS(index)">❌ {{ $t('common.delete') }}</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="empty-state">
        <img src="@/assets/empty.svg" alt="No Data" />
        <p>{{ $t('common.noData') }}</p>
      </div>
    </div>

    <!-- Yeni SMS Modalı -->
    <div v-if="showNewSMSModal" class="modal-overlay">
      <div class="modal">
        <h2>{{ $t('sms.newTitle') }}</h2>
        <div class="alert">📢 {{ $t('sms.phoneInfo') }}</div>
        <div class="form-group">
          <label>{{ $t('sms.number') }}</label>
          <input type="text" v-model="newSMS.number" />
        </div>
        <div class="form-group">
          <label>{{ $t('sms.name') }}</label>
          <input type="text" v-model="newSMS.name" />
        </div>
        <div class="form-group">
          <label>{{ $t('sms.group') }}</label>
          <select v-model="newSMS.group">
            <option>{{ $t('common.none') }}</option>
          </select>
        </div>
        <div class="form-group">
          <label>{{ $t('sms.language') }}</label>
          <select v-model="newSMS.language">
            <option>{{ $t('common.none') }}</option>
          </select>
        </div>
        <button class="btn btn-primary" @click="saveSMS">✔ {{ $t('common.save') }}</button>
        <button class="btn btn-secondary" @click="closeNewSMSModal">{{ $t('common.cancel') }}</button>
      </div>
    </div>

    <!-- Excel Modalı -->
    <div v-if="showExcelModal" class="modal-overlay">
      <div class="modal">
        <h2>{{ $t('sms.excelTitle') }}</h2>
        <div class="tab-buttons">
          <button :class="{ active: activeTab === 'export' }" @click="activeTab = 'export'">
            {{ $t('common.export') }}
          </button>
          <button :class="{ active: activeTab === 'import' }" @click="activeTab = 'import'">
            {{ $t('common.import') }}
          </button>
        </div>
        <div class="tab-content">
          <p v-if="activeTab === 'export'">{{ $t('common.exportInfo') }}</p>
          <p v-if="activeTab === 'import'">{{ $t('common.importInfo') }}</p>
        </div>
        <button class="btn btn-secondary" @click="closeExcelModal">{{ $t('common.close') }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      smsList: [],
      showNewSMSModal: false,
      showExcelModal: false,
      activeTab: "export",
      newSMS: {
        number: "",
        name: "",
        group: "Hiçbiri",
        language: "Hiçbiri",
      },
    };
  },
  methods: {
    openNewSMSModal() {
      this.showNewSMSModal = true;
    },
    closeNewSMSModal() {
      this.showNewSMSModal = false;
    },
    openExcelModal() {
      this.showExcelModal = true;
    },
    closeExcelModal() {
      this.showExcelModal = false;
    },
    saveSMS() {
      this.smsList.push({
        id: this.smsList.length + 1,
        number: this.newSMS.number,
        name: this.newSMS.name,
        group: this.newSMS.group,
        language: this.newSMS.language,
        date: new Date().toLocaleDateString(),
        ip: "192.168.1.1",
      });
      this.closeNewSMSModal();
    },
    deleteSMS(index) {
      this.smsList.splice(index, 1);
    },
  },
};
</script>

<style scoped>
/* 🌙 Modern Responsive ve Dark Mod Stili */
.sms-container {
  padding: 20px;
  background: var(--bg-color, #ffffff);
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
  transition: background 0.3s ease;
}

:root.dark .sms-container {
  --bg-color: #1e293b;
  --text-color: #f3f4f6;
  --input-bg: #334155;
  --border-color: #475569;
}

.header-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 15px;
  background: var(--bg-color, #ffffff);
  border-bottom: 1px solid var(--border-color, #ddd);
}

.search-input {
  width: 250px;
  padding: 8px;
  background: var(--input-bg, #ffffff);
  border: 1px solid var(--border-color, #ccc);
  border-radius: 5px;
  color: var(--text-color, #000);
  transition: all 0.3s ease;
}

.table-container {
  background: var(--bg-color, #ffffff);
  padding: 20px;
  border-radius: 10px;
  margin-top: 10px;
  overflow-x: auto;
}

.table-container table {
  width: 100%;
  border-collapse: collapse;
  color: var(--text-color, #000);
}

th, td {
  padding: 10px;
  border-bottom: 1px solid var(--border-color, #ddd);
  text-align: left;
}

th {
  background: #f3f4f6;
  font-weight: bold;
}

:root.dark th {
  background: #334155;
}

.empty-state {
  text-align: center;
  padding: 30px;
  color: var(--text-color, #888);
}

.empty-state img {
  width: 100px;
  opacity: 0.5;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99998;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: var(--bg-color, #ffffff);
  color: var(--text-color, #000);
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  position: relative;
  animation: fadeIn 0.3s ease-in-out;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, select {
  width: 100%;
  padding: 8px;
  border: 1px solid var(--border-color, #ddd);
  border-radius: 5px;
  background: var(--input-bg, #fff);
  color: var(--text-color, #000);
}

.alert {
  background: #fef3c7;
  color: #92400e;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
  font-size: 14px;
}

.btn {
  padding: 8px 14px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-secondary {
  background: #9ca3af;
  color: white;
}

.btn-secondary:hover {
  background: #6b7280;
}

.btn-success {
  background: #22c55e;
  color: white;
}

.btn-success:hover {
  background: #16a34a;
}

.tab-buttons {
  display: flex;
  gap: 10px;
  margin: 10px 0;
}

.tab-buttons button.active {
  background: #3b82f6;
  color: white;
}

.tab-content {
  margin-top: 10px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .header-section {
    flex-direction: column;
    align-items: stretch;
  }

  .buttons {
    width: 100%;
    flex-direction: column;
  }

  .search-input {
    width: 100%;
  }
}

</style>