<template>
  <div class="sms-container">
    <div class="header-section">
      <input type="text" class="search-input" :placeholder="$t('sms.search')" />
      <div class="buttons">
        <button class="btn btn-primary" @click="openNewGroupModal">
          ➕ {{ $t('sms.newGroup') }}
        </button>
      </div>
    </div>

    <div class="table-container">
      <table v-if="groups.length > 0">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t('sms.groupId') }}</th>
            <th>{{ $t('sms.groupName') }}</th>
            <th>{{ $t('sms.default') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(group, index) in groups" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ group.id }}</td>
            <td>{{ group.name }}</td>
            <td>{{ group.default ? $t('common.yes') : $t('common.no') }}</td>
            <td>
              <button class="btn btn-sm btn-danger" @click="deleteGroup(index)">❌ {{ $t('common.delete') }}</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-else class="empty-state">
        <img src="@/assets/empty.svg" alt="No Data" />
        <p>{{ $t('common.noData') }}</p>
      </div>
    </div>

    <!-- Yeni Grup Modalı -->
    <div v-if="showNewGroupModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h2>{{ $t('sms.newGroupTitle') }}</h2>
          <button class="close-btn" @click="closeNewGroupModal">×</button>
        </div>

        <label>{{ $t('sms.groupName') }}</label>
        <input type="text" v-model="newGroup.name" />

        <label>{{ $t('sms.default') }}</label>
        <select v-model="newGroup.default">
          <option :value="true">{{ $t('common.yes') }}</option>
          <option :value="false">{{ $t('common.no') }}</option>
        </select>

        <button class="btn btn-primary" @click="saveGroup">✔ {{ $t('common.save') }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      groups: [],
      showNewGroupModal: false,
      newGroup: {
        name: "",
        default: false,
      }
    };
  },
  methods: {
    openNewGroupModal() {
      this.showNewGroupModal = true;
    },
    closeNewGroupModal() {
      this.showNewGroupModal = false;
    },
    saveGroup() {
      this.groups.push({
        id: this.groups.length + 1,
        name: this.newGroup.name,
        default: this.newGroup.default,
      });
      this.closeNewGroupModal();
    },
    deleteGroup(index) {
      this.groups.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.sms-container {
  padding: 20px;
  background-color: var(--bg);
  color: var(--text);
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}

/* Theme Variables */
:root {
  --bg: #ffffff;
  --text: #1f2937;
  --card: #f9fafb;
  --border: #e5e7eb;
}

.dark {
  --bg: #1e1e2f;
  --text: #f3f4f6;
  --card: #2a2a3d;
  --border: #3b3b4f;
}

/* Header */
.header-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
  align-items: stretch;
  padding: 15px;
  background: var(--card);
  border-bottom: 1px solid var(--border);
  border-radius: 10px;
}

@media (min-width: 640px) {
  .header-section {
    flex-direction: row;
    align-items: center;
  }
}

.search-input {
  flex: 1;
  padding: 10px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg);
  color: var(--text);
}

.buttons {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 10px 16px;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
}

/* Table */
.table-container {
  background: var(--card);
  padding: 20px;
  border-radius: 10px;
  margin-top: 16px;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  color: var(--text);
}

th, td {
  padding: 12px 10px;
  border-bottom: 1px solid var(--border);
  text-align: left;
  white-space: nowrap;
}

th {
  background-color: rgba(59, 130, 246, 0.1);
  font-weight: bold;
}

.empty-state {
  text-align: center;
  padding: 30px;
  color: var(--text);
}

.empty-state img {
  width: 100px;
  opacity: 0.5;
}

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 99998;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Modal İçeriği */
.modal {
  background: var(--card);
  padding: 25px;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  position: relative;
  animation: fadeIn 0.3s ease-out;
  color: var(--text);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border);
  margin-bottom: 16px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: var(--text);
}

input, select {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg);
  color: var(--text);
  margin-top: 5px;
  margin-bottom: 15px;
}

/* Animasyon */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>