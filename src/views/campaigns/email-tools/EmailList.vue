<template>
  <div class="email-list-container">
    <div class="header-section">
      <input type="text" class="search-input" placeholder="🔍 Ara...">
      <div class="buttons">
        <button class="btn btn-primary" @click="openNewEmailModal">
          ➕ Yeni Kayıt
        </button>
        <button class="btn btn-success" @click="openExcelModal">
          📊 Excel İşlemleri
        </button>
      </div>
    </div>

    <div class="table-container">
      <table v-if="emailList.length > 0">
        <thead>
          <tr>
            <th>#</th>
            <th>Kayıt No</th>
            <th>E-Posta</th>
            <th>Adı</th>
            <th>Grup</th>
            <th>IP</th>
            <th>Tarih</th>
            <th>İşlemler</th>
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
  </div>

  <!-- Yeni Kayıt Modalı -->
  <div v-if="showNewEmailModal" class="modal-overlay">
    <div class="modal">
      <h2>Yeni Bülten Kaydı</h2>
      <div class="form-group">
        <label>E-Posta Adresi:</label>
        <input type="email" v-model="newEmail.email" required />
      </div>
      <div class="form-group">
        <label>Adı:</label>
        <input type="text" v-model="newEmail.name" />
      </div>
      <div class="form-group">
        <label>Bülten Grubu:</label>
        <select v-model="newEmail.group">
          <option>Hiçbiri</option>
          <option>Grup 1</option>
          <option>Grup 2</option>
        </select>
      </div>
      <div class="form-group">
        <label>Dil:</label>
        <select v-model="newEmail.language">
          <option>Hiçbiri</option>
          <option>Türkçe</option>
          <option>İngilizce</option>
        </select>
      </div>
      <button class="btn btn-primary" @click="saveEmail">Kaydet</button>
      <button class="btn btn-secondary" @click="closeNewEmailModal">İptal</button>
    </div>
  </div>

  <!-- Excel İşlemleri Modalı -->
  <div v-if="showExcelModal" class="modal-overlay">
    <div class="modal">
      <h2>E-Posta E-Bülten Listesi - Excel İşlemleri</h2>
      <div class="tab-buttons">
        <button :class="{ active: activeTab === 'export' }" @click="activeTab = 'export'">Dışa Aktar</button>
        <button :class="{ active: activeTab === 'import' }" @click="activeTab = 'import'">İçe Aktar</button>
      </div>
      <div class="tab-content">
        <p v-if="activeTab === 'export'">Tüm veriler Excel olarak dışa aktarılacaktır.</p>
        <p v-if="activeTab === 'import'">Excel dosyanızı yükleyerek içe aktarım yapabilirsiniz.</p>
      </div>
      <button class="btn btn-secondary" @click="closeExcelModal">Kapat</button>
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

.empty-state {
  text-align: center;
  padding: 30px;
}

.empty-state img {
  width: 100px;
  opacity: 0.5;
}

/* Modal */
/* Modal Overlay */
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

/* Kapat Butonu */
.close-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  float: right;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

/* Excel Modal Stili */
.excel-modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 100000;
}

.excel-tabs {
  display: flex;
  justify-content: space-around;
  margin-bottom: 15px;
}

.excel-tab {
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  border-radius: 5px;
}

.excel-tab.active {
  background: #3b82f6;
  color: white;
}

.excel-content {
  padding: 10px;
}
</style>