<template>
  <div class="sms-container">
    <div class="header-section">
      <input type="text" class="search-input" placeholder="🔍 Ara...">
      <div class="buttons">
        <button class="btn btn-primary" @click="openNewSmsModal">
          ➕ Yeni SMS
        </button>
      </div>
    </div>

    <div class="table-container">
      <table v-if="smsList.length > 0">
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
          <tr v-for="(sms, index) in smsList" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ sms.id }}</td>
            <td>{{ sms.name }}</td>
            <td>{{ sms.status }}</td>
            <td>{{ sms.sendDate }}</td>
            <td>
              <button class="btn btn-sm btn-danger" @click="deleteSms(index)">❌ Sil</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-else class="empty-state">
        <img src="@/assets/empty.svg" alt="No Data" />
        <p>Kayıt bulunamadı.</p>
      </div>
    </div>

    <!-- Yeni SMS Modalı -->
    <div v-if="showNewSmsModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h2>Yeni SMS Gönder</h2>
          <button class="close-btn" @click="closeNewSmsModal">×</button>
        </div>

        <div class="tab-buttons">
          <button :class="{ active: activeTab === 'settings' }" @click="activeTab = 'settings'">⚙️ Ayarlar</button>
          <button :class="{ active: activeTab === 'content' }" @click="activeTab = 'content'">📩 SMS İçeriği</button>
        </div>

        <div class="tab-content">
          <!-- Ayarlar Sekmesi -->
          <div v-if="activeTab === 'settings'">
            <label>Tanım</label>
            <input type="text" v-model="newSms.name">

            <div class="toggle-container">
              <label>Bülten Listelerine Gönderim</label>
              <input type="checkbox" v-model="newSms.sendToNewsletter">
            </div>
            <div class="toggle-container">
              <label>Üyelere/Bayilere Gönderim</label>
              <input type="checkbox" v-model="newSms.sendToMembers">
            </div>
            <div class="toggle-container">
              <label>İlave Telefon Numaralarına Gönderim</label>
              <input type="checkbox" v-model="newSms.sendToExtraNumbers">
            </div>
          </div>

          <!-- SMS İçeriği Sekmesi -->
          <div v-if="activeTab === 'content'">
            <label>Mesaj</label>
            <textarea v-model="newSms.content"></textarea>
          </div>
        </div>

        <button class="btn btn-primary" @click="saveSms">Kaydet</button>
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
/* Genel Sayfa Yapısı */
.sms-container {
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

/* Modal Overlay (Arka Plan) */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6); /* Daha koyu ve blur etkili arka plan */
  backdrop-filter: blur(4px); /* Arka planı blur yap */
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Modal İçeriği */
.modal {
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2); /* Daha belirgin gölgelendirme */
  z-index: 99999 !important;
  display: block !important;
  position: relative;
  flex-direction: column;
  transform: translateY(0);
  animation: fadeIn 0.3s ease-in-out;
  opacity: 1 !important;
}

/* Modal Başlık */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid #ddd;
}

.modal-header h2 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;
  transition: 0.3s;
}

.close-btn:hover {
  color: #d32f2f;
}

/* Tab Butonları */
.tab-buttons {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
  border-bottom: 1px solid #ddd;
}

.tab-buttons button {
  flex: 1;
  padding: 12px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  background: #f7f7f7;
  transition: background 0.3s ease, color 0.3s ease;
}

.tab-buttons button.active {
  background: #3b82f6;
  color: white;
  font-weight: bold;
}

/* Form Alanları */
input, textarea, select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-top: 8px;
  font-size: 14px;
}

textarea {
  min-height: 120px;
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
  border-radius: 6px;
  cursor: pointer;
  margin-top: 12px;
  transition: background 0.3s ease;
}

.btn-save:hover {
  background: #2563eb;
}

/* Animasyon */
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
