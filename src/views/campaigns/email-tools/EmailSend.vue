<template>
  <div class="email-container">
    <div class="header-section">
      <input type="text" class="search-input" :placeholder="$t('email.search')" />
      <div class="buttons">
        <button class="btn btn-primary" @click="openNewEmailModal">
          ➕ {{ $t('email.new') }}
        </button>
      </div>
    </div>

    <div class="table-container">
      <table v-if="emails.length > 0">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t('email.id') }}</th>
            <th>{{ $t('email.name') }}</th>
            <th>{{ $t('email.status') }}</th>
            <th>{{ $t('email.sendDate') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(email, index) in emails" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ email.id }}</td>
            <td>{{ email.name }}</td>
            <td>{{ email.status }}</td>
            <td>{{ email.sendDate }}</td>
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

    <!-- Yeni E-Posta Modalı -->
    <div v-if="showNewEmailModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h2>{{ $t('email.newTitle') }}</h2>
          <button class="close-btn" @click="closeNewEmailModal">×</button>
        </div>

        <div class="tab-buttons">
          <button :class="{ active: activeTab === 'settings' }" @click="activeTab = 'settings'">⚙️ {{ $t('email.tabs.settings') }}</button>
          <button :class="{ active: activeTab === 'content' }" @click="activeTab = 'content'">📧 {{ $t('email.tabs.content') }}</button>
        </div>

        <div class="tab-content">
          <!-- Ayarlar Sekmesi -->
          <div v-if="activeTab === 'settings'">
            <label>{{ $t('email.name') }}</label>
            <input type="text" v-model="newEmail.name">

            <div class="toggle-container">
              <label>{{ $t('email.sendToNewsletter') }}</label>
              <input type="checkbox" v-model="newEmail.sendToNewsletter">
            </div>
            <div class="toggle-container">
              <label>{{ $t('email.sendToMembers') }}</label>
              <input type="checkbox" v-model="newEmail.sendToMembers">
            </div>
            <div class="toggle-container">
              <label>{{ $t('email.sendToExtra') }}</label>
              <input type="checkbox" v-model="newEmail.sendToExtraEmails">
            </div>
          </div>

          <!-- İçerik Sekmesi -->
          <div v-if="activeTab === 'content'">
            <label>{{ $t('email.subject') }}</label>
            <input type="text" v-model="newEmail.subject">
            <label>{{ $t('email.content') }}</label>
            <textarea v-model="newEmail.content"></textarea>
          </div>
        </div>

        <button class="btn btn-primary" @click="saveEmail">{{ $t('common.save') }}</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      emails: [],
      showNewEmailModal: false,
      activeTab: "settings",
      newEmail: {
        name: "",
        subject: "",
        content: "",
        sendToNewsletter: false,
        sendToMembers: false,
        sendToExtraEmails: false,
      }
    };
  },
  methods: {
    openNewEmailModal() {
      this.showNewEmailModal = true;
    },
    closeNewEmailModal() {
      this.showNewEmailModal = false;
    },
    saveEmail() {
      this.emails.push({
        id: this.emails.length + 1,
        name: this.newEmail.name,
        subject: this.newEmail.subject,
        content: this.newEmail.content,
        sendDate: new Date().toLocaleDateString(),
        status: "Taslak",
      });
      this.closeNewEmailModal();
    },
    deleteEmail(index) {
      this.emails.splice(index, 1);
    }
  }
};
</script>
<style scoped>
/* 🌙 Modern Responsive ve Dark Mod Stili */
.email-container {
  padding: 20px;
  background: var(--bg-color, #ffffff);
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: background 0.3s ease;
}

:root.dark .email-container {
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

.buttons {
  display: flex;
  gap: 10px;
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

.btn-success {
  background: #22c55e;
  color: white;
}

.btn-success:hover {
  background: #16a34a;
}

.table-container {
  background: var(--bg-color, #ffffff);
  padding: 20px;
  border-radius: 10px;
  margin-top: 10px;
  overflow-x: auto;
}

table {
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

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color, #ddd);
  padding-bottom: 10px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: var(--text-color, #000);
}

.tab-buttons {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
  gap: 10px;
}

.tab-buttons button {
  flex: 1;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  background: #f1f1f1;
  transition: background 0.3s ease;
}

.tab-buttons button.active {
  background: #3b82f6;
  color: white;
}

.toggle-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}

input, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--border-color, #ddd);
  border-radius: 5px;
  margin-top: 5px;
  background: var(--input-bg, #fff);
  color: var(--text-color, #000);
}

textarea {
  min-height: 150px;
  resize: vertical;
}

.btn-save {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.btn-save:hover {
  background: #2563eb;
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