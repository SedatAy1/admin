<template>
  <div class="order-limits-container">
    <!-- Üst Kısım: Arama ve Buton -->
    <div class="header-section">
      <input type="text" class="search-input" placeholder="🔍 Ara...">
      <div class="buttons">
        <button class="btn btn-primary" @click="openNewOrderLimitModal">
          ➕ Yeni Sipariş Limiti
        </button>
      </div>
    </div>

    <!-- Tablo (Boşsa "Kayıt Bulunamadı" göster) -->
    <div class="table-container">
      <table v-if="orderLimits.length > 0">
        <thead>
          <tr>
            <th>Limit No</th>
            <th>Adı</th>
            <th>Min. Miktar</th>
            <th>Maks. Miktar</th>
            <th>Varyant Kontrolü</th>
            <th>Üye Grupları</th>
            <th>Tarih Aralığı</th>
            <th>Öncelik</th>
            <th>Durum</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(limit, index) in orderLimits" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ limit.name }}</td>
            <td>{{ limit.minAmount }}</td>
            <td>{{ limit.maxAmount }}</td>
            <td>{{ limit.variantControl }}</td>
            <td>{{ limit.memberGroups }}</td>
            <td>{{ limit.dateRange }}</td>
            <td>{{ limit.priority }}</td>
            <td>{{ limit.status }}</td>
            <td>
              <button class="btn btn-sm btn-danger" @click="deleteOrderLimit(index)">❌ Sil</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Eğer hiç sipariş limiti yoksa -->
      <div v-else class="empty-state">
        <img src="@/assets/empty.svg" alt="No Data" />
        <p>Kayıt bulunamadı.</p>
      </div>
    </div>
  </div>

  <!-- Yeni Sipariş Limiti Modalı -->
  <div v-if="showNewOrderLimitModal" class="modal-overlay" @click.self="closeNewOrderLimitModal">
    <div class="modal">
      <div class="modal-header">
        <h2>Yeni Sipariş Limiti</h2>
        <button class="close-btn" @click="closeNewOrderLimitModal">✖</button>
      </div>

      <div class="form-group">
        <label>Sipariş Limiti Adı <span class="required">Zorunlu</span></label>
        <input type="text" v-model="newOrderLimit.name">
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Durum <span class="required">Zorunlu</span></label>
          <select v-model="newOrderLimit.status">
            <option>Aktif</option>
            <option>Pasif</option>
          </select>
        </div>
        <div class="form-group">
          <label>Öncelik</label>
          <input type="number" v-model="newOrderLimit.priority">
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Minimum Sipariş Miktarı</label>
          <input type="number" v-model="newOrderLimit.minAmount">
        </div>
        <div class="form-group">
          <label>Maksimum Sipariş Miktarı</label>
          <input type="number" v-model="newOrderLimit.maxAmount">
        </div>
      </div>

      <div class="modal-buttons">
        <button class="btn btn-primary" @click="saveOrderLimit">Kaydet</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderLimits: [],
      showNewOrderLimitModal: false,
      newOrderLimit: {
        name: "",
        status: "Aktif",
        priority: 0,
        minAmount: 1,
        maxAmount: 2,
        variantControl: "Aktif",
        memberGroups: "Tümü",
        dateRange: "Süresiz",
      }
    };
  },
  methods: {
    openNewOrderLimitModal() {
      console.log("✅ Yeni Sipariş Limiti Modal Açılıyor...");
      this.showNewOrderLimitModal = true;
    },
    closeNewOrderLimitModal() {
      console.log("❌ Yeni Sipariş Limiti Modal Kapatılıyor...");
      this.showNewOrderLimitModal = false;
    },
    saveOrderLimit() {
      if (this.newOrderLimit.name.trim() === "") {
        alert("⚠️ Sipariş Limiti Adı zorunludur!");
        return;
      }
      this.orderLimits.push({ ...this.newOrderLimit });
      console.log("🎉 Sipariş Limiti Kaydedildi: ", this.newOrderLimit);
      this.newOrderLimit = {
        name: "",
        status: "Aktif",
        priority: 0,
        minAmount: 1,
        maxAmount: 2,
        variantControl: "Aktif",
        memberGroups: "Tümü",
        dateRange: "Süresiz",
      };
      this.closeNewOrderLimitModal();
    },
    deleteOrderLimit(index) {
      console.log("🗑️ Sipariş Limiti Silindi: ", this.orderLimits[index]);
      this.orderLimits.splice(index, 1);
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

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.modal-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

input, select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>