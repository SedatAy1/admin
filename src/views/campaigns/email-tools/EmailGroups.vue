<template>
  <div class="email-groups-container">
    <!-- Üst Kısım: Arama ve Buton -->
    <div class="header-section">
      <input type="text" class="search-input" :placeholder="$t('emailGroups.search')" />
      <button class="btn btn-primary" @click="openNewGroupModal">
        ➕ {{ $t('emailGroups.new') }}
      </button>
    </div>

    <!-- Tablo -->
    <div class="table-container">
      <table v-if="emailGroups.length > 0">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t('emailGroups.id') }}</th>
            <th>{{ $t('emailGroups.name') }}</th>
            <th>{{ $t('emailGroups.default') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(group, index) in emailGroups" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ group.id }}</td>
            <td>{{ group.name }}</td>
            <td>{{ group.default ? '✅' : '❌' }}</td>
            <td>
              <button class="btn btn-sm btn-danger" @click="deleteGroup(index)">❌ {{ $t('common.delete') }}</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Boş durum -->
      <div v-else class="empty-state">
        <img src="@/assets/empty.svg" alt="No Data" />
        <p>{{ $t('common.noData') }}</p>
      </div>
    </div>
  </div>

  <!-- Yeni Grup Modalı -->
  <div v-if="showNewGroupModal" class="modal-overlay">
    <div class="modal">
      <div class="modal-header">
        <h2>{{ $t('emailGroups.newTitle') }}</h2>
        <button class="close-btn" @click="closeNewGroupModal">✖</button>
      </div>

      <div class="form-group">
        <label>{{ $t('emailGroups.name') }}:</label>
        <input type="text" v-model="newGroup.name" />
      </div>

      <div class="form-group">
        <label>{{ $t('emailGroups.default') }}:</label>
        <select v-model="newGroup.default">
          <option :value="true">{{ $t('common.active') }}</option>
          <option :value="false">{{ $t('common.passive') }}</option>
        </select>
      </div>

      <div class="modal-buttons">
        <button class="btn btn-primary" @click="saveGroup">{{ $t('common.save') }}</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      emailGroups: [],
      showNewGroupModal: false,
      newGroup: {
        name: "",
        default: false,
      },
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
      if (!this.newGroup.name.trim()) {
        alert("Grup adı boş olamaz!");
        return;
      }
      this.emailGroups.push({
        id: this.emailGroups.length + 1,
        name: this.newGroup.name,
        default: this.newGroup.default,
      });
      this.newGroup.name = "";
      this.newGroup.default = false;
      this.closeNewGroupModal();
    },
    deleteGroup(index) {
      this.emailGroups.splice(index, 1);
    },
  },
};
</script>

<style scoped>
/* Üst Kısım */
.header-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: var(--bg-color, white);
  border-bottom: 1px solid #ddd;
  gap: 10px;
}

.search-input {
  flex: 1;
  min-width: 200px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: var(--input-bg, white);
  color: var(--text-color, #111);
}

.btn {
  padding: 8px 14px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s ease;
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

/* Tablo */
.table-container {
  background: var(--bg-color, white);
  padding: 20px;
  border-radius: 12px;
  margin-top: 15px;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

th, td {
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
  text-align: left;
}

th {
  background: #f9fafb;
  font-weight: 600;
  color: #374151;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #9ca3af;
}

.empty-state img {
  width: 80px;
  opacity: 0.5;
  margin-bottom: 10px;
}

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Modal */
.modal {
  background: var(--bg-color, white);
  color: var(--text-color, #111);
  padding: 24px;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: inherit;
}

.modal-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.form-group {
  margin-bottom: 16px;
}

input,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  background: var(--input-bg, white);
  color: var(--text-color, #111);
}

/* 🌙 Dark Mode */
:root.dark {
  --bg-color: #1f2937;
  --text-color: #f3f4f6;
  --input-bg: #374151;
}

:root.dark th {
  background: #374151;
  color: #f9fafb;
}

:root.dark .empty-state {
  color: #9ca3af;
}

@media (max-width: 768px) {
  .header-section {
    flex-direction: column;
    align-items: stretch;
  }
  .modal {
    padding: 16px;
  }
  th, td {
    font-size: 13px;
  }
}
</style>