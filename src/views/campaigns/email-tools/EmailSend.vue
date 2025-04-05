<template>
  <div class="email-container">
    <div class="header-section">
      <input type="text" class="search-input" placeholder="🔍 Ara...">
      <div class="buttons">
        <button class="btn btn-primary" @click="openNewEmailModal">
          ➕ Yeni E-Posta
        </button>
      </div>
    </div>

    <div class="table-container">
      <table v-if="emails.length > 0">
        <thead>
          <tr>
            <th>#</th>
            <th>No</th>
            <th>Tanım</th>
            <th>Durum</th>
            <th>Gönderim Tarihi</th>
            <th>İşlemler</th>
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
              <button class="btn btn-sm btn-danger" @click="deleteEmail(index)">❌ Sil</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-else class="empty-state">
        <img src="@/assets/empty.svg" alt="No Data" />
        <p>Kayıt bulunamadı.</p>
      </div>
    </div>

    <!-- Yeni E-Posta Modalı -->
    <div v-if="showNewEmailModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h2>Yeni E-Posta Gönder</h2>
          <button class="close-btn" @click="closeNewEmailModal">×</button>
        </div>

        <div class="tab-buttons">
          <button :class="{ active: activeTab === 'settings' }" @click="activeTab = 'settings'">⚙️ Ayarlar</button>
          <button :class="{ active: activeTab === 'content' }" @click="activeTab = 'content'">📧 E-Posta İçeriği</button>
        </div>

        <div class="tab-content">
          <!-- Ayarlar Sekmesi -->
          <div v-if="activeTab === 'settings'">
            <label>Tanım</label>
            <input type="text" v-model="newEmail.name">

            <div class="toggle-container">
              <label>Bülten Listelerine Gönderim</label>
              <input type="checkbox" v-model="newEmail.sendToNewsletter">
            </div>
            <div class="toggle-container">
              <label>Üyelere/Bayilere Gönderim</label>
              <input type="checkbox" v-model="newEmail.sendToMembers">
            </div>
            <div class="toggle-container">
              <label>İlave E-Posta Adreslerine Gönderim</label>
              <input type="checkbox" v-model="newEmail.sendToExtraEmails">
            </div>
          </div>

          <!-- E-Posta İçeriği Sekmesi -->
          <div v-if="activeTab === 'content'">
            <label>E-Posta Konusu</label>
            <input type="text" v-model="newEmail.subject">
            <label>E-Posta İçeriği</label>
            <textarea v-model="newEmail.content"></textarea>
          </div>
        </div>

        <button class="btn btn-primary" @click="saveEmail">Kaydet</button>
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
/* Genel Sayfa Yapısı */
.email-container {
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

/* Üst Kısım */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: white;
  border-bottom: 1px solid #ddd;
}

.search-input {
  width: 250px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.buttons {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 14px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
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

/* Tablo */
.table-container {
  background: white;
  padding: 20px;
  border-radius: 10px;
  margin-top: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

th {
  background: #f3f4f6;
  font-weight: bold;
}

/* Modal Overlay (Arka Plan) */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Daha koyu yap, şeffaflık artırıldı */
  z-index: 99998 !important; /* Üst katmanda olsun */
  display: flex !important; /* Emin olmak için */
  justify-content: center;
  align-items: center;
  visibility: visible !important; /* Eğer gizliyse göster */
}

/* Modal İçeriği */
.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 500px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 99999 !important; /* Modal her şeyin üstünde olsun */
  display: block !important; /* Eğer hala görünmüyorsa, ekle */
  position: relative;
  transform: translateY(0); /* Modal kaybolmasın */
  opacity: 1 !important;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.tab-buttons {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
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

/* Giriş Alanları */
input, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 5px;
}

textarea {
  min-height: 150px;
  resize: vertical;
}

/* Kaydet Butonu */
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

/* Geçiş Efekti */
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
</style>