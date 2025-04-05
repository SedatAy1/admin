<template>
  <div class="commissions-container">
    <!-- Üst Kısım: Arama ve Buton -->
    <div class="header-section">
      <input type="text" class="search-input" placeholder="🔍 Ara...">
      <button class="btn btn-primary" @click="openNewCommissionModal">
        ➕ Yeni Komisyon Tanımla
      </button>
    </div>

    <!-- Tablo (Boşsa "Kayıt Bulunamadı" göster) -->
    <div class="table-container">
      <table v-if="commissions.length > 0">
        <thead>
          <tr>
            <th>Ürün</th>
            <th>Bayi Grubu</th>
            <th>Bayi</th>
            <th>Komisyon</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(commission, index) in commissions" :key="index">
            <td>{{ commission.product }}</td>
            <td>{{ commission.dealerGroup }}</td>
            <td>{{ commission.dealer }}</td>
            <td>{{ commission.commissionAmount }}</td>
            <td>
              <button class="btn btn-sm btn-danger" @click="deleteCommission(index)">❌ Sil</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Eğer hiç komisyon yoksa -->
      <div v-else class="empty-state">
        <img src="@/assets/empty.svg" alt="No Data" />
        <p>Kayıt bulunamadı.</p>
      </div>
    </div>
  </div>

  <!-- Yeni Komisyon Modalı -->
  <div v-if="showNewCommissionModal" class="modal-overlay" @click.self="closeNewCommissionModal">
    <div class="modal">
      <div class="modal-header">
        <h2>Yeni Komisyon Tanımla</h2>
        <button class="close-btn" @click="closeNewCommissionModal">✖</button>
      </div>

      <div class="form-section">
        <h3>🛈 Ürün Bilgileri</h3>
        <label>Ürün</label>
        <select v-model="newCommission.product">
          <option>Tümü</option>
          <option>Ürün 1</option>
          <option>Ürün 2</option>
        </select>
      </div>

      <div class="form-section">
        <h3>🚨 Bayi Grubu Bilgileri</h3>
        <label>Bayi Grubu</label>
        <select v-model="newCommission.dealerGroup">
          <option>Tümü</option>
          <option>Grup 1</option>
          <option>Grup 2</option>
        </select>

        <label>Bayi</label>
        <select v-model="newCommission.dealer">
          <option>Tümü</option>
          <option>Bayi 1</option>
          <option>Bayi 2</option>
        </select>
      </div>

      <div class="form-section">
        <h3>💰 Komisyon Bilgileri</h3>
        <label>Komisyon Tipi</label>
        <select v-model="newCommission.commissionType">
          <option>Sabit Tutar</option>
          <option>Yüzde (%)</option>
        </select>

        <label>Komisyon Tutarı</label>
        <input type="number" v-model="newCommission.commissionAmount">
      </div>

      <div class="modal-buttons">
        <button class="btn btn-primary" @click="saveCommission">✔ Kaydet</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commissions: [],
      showNewCommissionModal: false,
      newCommission: {
        product: "Tümü",
        dealerGroup: "Tümü",
        dealer: "Tümü",
        commissionType: "Sabit Tutar",
        commissionAmount: "",
      },
    };
  },
  methods: {
    openNewCommissionModal() {
      console.log("Yeni Komisyon Modal Açılıyor...");
      this.showNewCommissionModal = true;
    },
    closeNewCommissionModal() {
      console.log("Yeni Komisyon Modal Kapatılıyor...");
      this.showNewCommissionModal = false;
    },
    saveCommission() {
      if (!this.newCommission.commissionAmount) {
        alert("Komisyon tutarı giriniz!");
        return;
      }
      this.commissions.push({ ...this.newCommission });
      this.newCommission.commissionAmount = "";
      this.closeNewCommissionModal();
    },
    deleteCommission(index) {
      this.commissions.splice(index, 1);
    },
  },
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

/* Form */
.form-section {
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 5px;
  background: #eef2ff;
}

h3 {
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: bold;
}

label {
  display: block;
  margin: 5px 0;
}

select, input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

/* Butonlar */
.modal-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>