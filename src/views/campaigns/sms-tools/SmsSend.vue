<template>
  <div class="sms-container">
    <div class="header-section">
      <input type="text" class="search-input" :placeholder="$t('sms.search')" />
      <div class="buttons">
        <button class="btn btn-primary" @click="openNewSmsModal">
          ➕ {{ $t('sms.new') }}
        </button>
      </div>
    </div>

    <div class="table-container">
      <table v-if="smsList.length > 0">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t('sms.no') }}</th>
            <th>{{ $t('sms.name') }}</th>
            <th>{{ $t('sms.status') }}</th>
            <th>{{ $t('sms.date') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(sms, index) in smsList" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ sms.id }}</td>
            <td>{{ sms.name }}</td>
            <td>{{ sms.status }}</td>
            <td>{{ sms.sendDate }}</td>
            <td>
              <button class="btn btn-sm btn-danger" @click="deleteSms(index)">
                ❌ {{ $t('common.delete') }}
              </button>
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
    <div v-if="showNewSmsModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h2>{{ $t('sms.newTitle') }}</h2>
          <button class="close-btn" @click="closeNewSmsModal">×</button>
        </div>

        <div class="tab-buttons">
          <button :class="{ active: activeTab === 'settings' }" @click="activeTab = 'settings'">
            ⚙️ {{ $t('sms.settings') }}
          </button>
          <button :class="{ active: activeTab === 'content' }" @click="activeTab = 'content'">
            📩 {{ $t('sms.content') }}
          </button>
        </div>

        <div class="tab-content">
          <!-- Ayarlar Sekmesi -->
          <div v-if="activeTab === 'settings'">
            <label>{{ $t('sms.name') }}</label>
            <input type="text" v-model="newSms.name" />

            <div class="toggle-container">
              <label>{{ $t('sms.toNewsletter') }}</label>
              <input type="checkbox" v-model="newSms.sendToNewsletter" />
            </div>
            <div class="toggle-container">
              <label>{{ $t('sms.toMembers') }}</label>
              <input type="checkbox" v-model="newSms.sendToMembers" />
            </div>
            <div class="toggle-container">
              <label>{{ $t('sms.toExtraNumbers') }}</label>
              <input type="checkbox" v-model="newSms.sendToExtraNumbers" />
            </div>
          </div>

          <!-- İçerik Sekmesi -->
          <div v-if="activeTab === 'content'">
            <label>{{ $t('sms.message') }}</label>
            <textarea v-model="newSms.content"></textarea>
          </div>
        </div>

        <button class="btn btn-primary" @click="saveSms">✔ {{ $t('common.save') }}</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      smsList: [],
      showNewSmsModal: false,
      activeTab: "settings",
      newSms: {
        name: "",
        content: "",
        sendToNewsletter: false,
        sendToMembers: false,
        sendToExtraNumbers: false,
      }
    };
  },
  methods: {
    openNewSmsModal() {
      this.showNewSmsModal = true;
    },
    closeNewSmsModal() {
      this.showNewSmsModal = false;
    },
    saveSms() {
      this.smsList.push({
        id: this.smsList.length + 1,
        name: this.newSms.name,
        content: this.newSms.content,
        sendDate: new Date().toLocaleDateString(),
        status: "Taslak",
      });
      this.closeNewSmsModal();
    },
    deleteSms(index) {
      this.smsList.splice(index, 1);
    }
  }
};
</script>

<style scoped>
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

/* Sayfa Genel Yapısı */
.sms-container {
  padding: 20px;
  background-color: var(--bg);
  color: var(--text);
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}

/* Üst Kısım */
.header-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  background-color: var(--card);
  border-bottom: 1px solid var(--border);
  border-radius: 10px;
}
@media (min-width: 640px) {
  .header-section {
    flex-direction: row;
    justify-content: space-between;
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

/* Butonlar */
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

/* Tablo */
.table-container {
  background-color: var(--card);
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
  padding: 12px;
  border-bottom: 1px solid var(--border);
  text-align: left;
  white-space: nowrap;
}
th {
  background: rgba(59, 130, 246, 0.05);
  font-weight: 600;
}

/* Kayıt Yoksa */
.empty-state {
  text-align: center;
  padding: 30px;
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
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99998;
}

/* Modal İçerik */
.modal {
  background: var(--card);
  padding: 25px;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  color: var(--text);
  animation: fadeIn 0.3s ease-out;
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--border);
}
.modal-header h2 {
  font-size: 18px;
  font-weight: 600;
}
.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  color: var(--text);
  cursor: pointer;
}
.close-btn:hover {
  color: #ef4444;
}

/* Sekmeler */
.tab-buttons {
  display: flex;
  justify-content: space-between;
  margin: 20px 0 10px;
  border-bottom: 1px solid var(--border);
}
.tab-buttons button {
  flex: 1;
  padding: 10px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
  border-radius: 6px 6px 0 0;
  transition: all 0.3s ease;
}
.tab-buttons button.active {
  background: #3b82f6;
  color: white;
  font-weight: bold;
}

/* Alanlar */
input, textarea, select {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg);
  color: var(--text);
  font-size: 14px;
}
textarea {
  min-height: 120px;
  resize: vertical;
}

.toggle-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
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
