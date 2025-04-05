<template>
  <div class="sms-container">
    <div class="header-section">
      <input type="text" class="search-input" placeholder="🔍 Ara...">
      <div class="buttons">
        <button class="btn btn-primary" @click="openNewSMSModal">
          ➕ Yeni Kayıt
        </button>
        <button class="btn btn-success" @click="openExcelModal">
          📊 Excel İşlemleri
        </button>
      </div>
    </div>

    <div class="table-container">
      <table v-if="smsList.length > 0">
        <thead>
          <tr>
            <th>#</th>
            <th>Kayıt No</th>
            <th>Numara</th>
            <th>Adı</th>
            <th>Grup</th>
            <th>IP</th>
            <th>Tarih</th>
            <th>İşlemler</th>
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
              <button class="btn btn-sm btn-danger" @click="deleteSMS(index)">❌ Sil</button>
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
    <div v-if="showNewSMSModal" class="modal-overlay">
      <div class="modal">
        <h2>Yeni Bülten Kaydı</h2>
        <div class="alert">📢 Telefon numarası ülke kodu ile birlikte yazılmalıdır. Örnek: +905001234567</div>
        <div class="form-group">
          <label>Telefon Numarası:</label>
          <input type="text" v-model="newSMS.number" />
        </div>
        <div class="form-group">
          <label>Adı:</label>
          <input type="text" v-model="newSMS.name" />
        </div>
        <div class="form-group">
          <label>Bülten Grubu:</label>
          <select v-model="newSMS.group">
            <option>Hiçbiri</option>
          </select>
        </div>
        <div class="form-group">
          <label>Dil:</label>
          <select v-model="newSMS.language">
            <option>Hiçbiri</option>
          </select>
        </div>
        <button class="btn btn-primary" @click="saveSMS">Kaydet</button>
        <button class="btn btn-secondary" @click="closeNewSMSModal">İptal</button>
      </div>
    </div>

    <!-- Excel Modalı -->
    <div v-if="showExcelModal" class="modal-overlay">
      <div class="modal">
        <h2>SMS E-Bülten Listesi - Excel İşlemleri</h2>
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
.sms-container {
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

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

.table-container {
  background: white;
  padding: 20px;
  border-radius: 10px;
  margin-top: 10px;
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

.btn {
  padding: 8px 14px;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}
</style>