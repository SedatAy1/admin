<template>
  <div class="sales-quotas-container">
    <!-- Üst Kısım: Arama ve Buton -->
    <div class="header-section">
      <input type="text" class="search-input" placeholder="🔍 Ara...">
      <button class="btn btn-primary" @click="openNewQuotaModal">
        ➕ Yeni Satış Kotası
      </button>
    </div>

    <!-- Tablo -->
    <div class="table-container">
      <table v-if="quotas.length > 0">
        <thead>
          <tr>
            <th>#</th>
            <th>Kota No</th>
            <th>Adı</th>
            <th>Satış Kotası</th>
            <th>Kural</th>
            <th>Periyot</th>
            <th>Üye Grupları</th>
            <th>Tarih Aralığı</th>
            <th>Öncelik</th>
            <th>Durum</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(quota, index) in quotas" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ quota.id }}</td>
            <td>{{ quota.name }}</td>
            <td>{{ quota.amount }}</td>
            <td>{{ quota.rule }}</td>
            <td>{{ quota.period }}</td>
            <td>{{ quota.group }}</td>
            <td>{{ quota.dateRange }}</td>
            <td>{{ quota.priority }}</td>
            <td>{{ quota.status }}</td>
            <td>
              <button class="btn btn-sm btn-danger" @click="deleteQuota(index)">❌ Sil</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-else class="empty-state">
        <img src="@/assets/empty.svg" alt="No Data" />
        <p>Kayıt bulunamadı.</p>
      </div>
    </div>

    <!-- Yeni Satış Kotası Modalı -->
    <div v-if="showNewQuotaModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h2>Yeni Satış Kotası</h2>
          <button class="close-btn" @click="closeNewQuotaModal">✖</button>
        </div>

        <div class="form-group">
          <label>Kota Adı <span class="required">*</span></label>
          <input type="text" v-model="newQuota.name" required>
        </div>

        <div class="form-group">
          <label>Durum <span class="required">*</span></label>
          <select v-model="newQuota.status">
            <option>Aktif</option>
            <option>Pasif</option>
          </select>
        </div>

        <div class="form-group">
          <label>Öncelik</label>
          <input type="number" v-model="newQuota.priority" min="0">
        </div>

        <div class="form-group">
          <label>Satış Kotası</label>
          <input type="number" v-model="newQuota.amount" min="1">
        </div>

        <div class="form-group">
          <label>Kota Kuralı</label>
          <select v-model="newQuota.rule">
            <option>Müşteri Bazlı Satış Miktarı</option>
            <option>Genel Satış Miktarı</option>
          </select>
        </div>

        <div class="form-group">
          <label>Periyot</label>
          <select v-model="newQuota.period">
            <option>Tüm Zamanlar</option>
            <option>Günlük</option>
            <option>Haftalık</option>
            <option>Aylık</option>
          </select>
        </div>

        <div class="form-group">
          <label>Üye Grupları</label>
          <select v-model="newQuota.group">
            <option>Tümü</option>
            <option>Bireysel</option>
            <option>Kurumsal</option>
          </select>
        </div>

        <button class="btn btn-primary" @click="saveQuota">Kaydet</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quotas: [],
      showNewQuotaModal: false,
      newQuota: {
        name: "",
        status: "Aktif",
        priority: 0,
        amount: 0,
        rule: "Müşteri Bazlı Satış Miktarı",
        period: "Tüm Zamanlar",
        group: "Tümü",
        dateRange: "Süresiz",
      },
    };
  },
  methods: {
    openNewQuotaModal() {
      this.showNewQuotaModal = true;
    },
    closeNewQuotaModal() {
      this.showNewQuotaModal = false;
    },
    saveQuota() {
      if (!this.newQuota.name || !this.newQuota.amount) {
        alert("Lütfen tüm zorunlu alanları doldurun!");
        return;
      }
      this.quotas.push({
        id: this.quotas.length + 1,
        ...this.newQuota,
      });
      this.newQuota = {
        name: "",
        status: "Aktif",
        priority: 0,
        amount: 0,
        rule: "Müşteri Bazlı Satış Miktarı",
        period: "Tüm Zamanlar",
        group: "Tümü",
        dateRange: "Süresiz",
      };
      this.closeNewQuotaModal();
    },
    deleteQuota(index) {
      this.quotas.splice(index, 1);
    }
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
.close-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

input, select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.required {
  color: red;
  font-weight: bold;
}
</style>