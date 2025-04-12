<template>
  <div class="commissions-container">
    <!-- Üst Kısım -->
    <div class="header-section">
      <input type="text" class="search-input" :placeholder="$t('commission.search')" />
      <button class="btn btn-primary" @click="openNewCommissionModal">
        ➕ {{ $t('commission.new') }}
      </button>
    </div>

    <!-- Tablo -->
    <div class="table-container">
      <table v-if="commissions.length > 0">
        <thead>
          <tr>
            <th>{{ $t('commission.product') }}</th>
            <th>{{ $t('commission.dealerGroup') }}</th>
            <th>{{ $t('commission.dealer') }}</th>
            <th>{{ $t('commission.amount') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(commission, index) in commissions" :key="index">
            <td>{{ commission.product }}</td>
            <td>{{ commission.dealerGroup }}</td>
            <td>{{ commission.dealer }}</td>
            <td>{{ commission.commissionAmount }}</td>
            <td>
              <button class="btn btn-sm btn-danger" @click="deleteCommission(index)">
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
  </div>

  <!-- Yeni Komisyon Modalı -->
  <div v-if="showNewCommissionModal" class="modal-overlay" @click.self="closeNewCommissionModal">
    <div class="modal">
      <div class="modal-header">
        <h2>{{ $t('commission.newTitle') }}</h2>
        <button class="close-btn" @click="closeNewCommissionModal">✖</button>
      </div>

      <div class="form-section">
        <h3>🛈 {{ $t('commission.productInfo') }}</h3>
        <label>{{ $t('commission.product') }}</label>
        <select v-model="newCommission.product">
          <option>{{ $t('common.all') }}</option>
          <option>Product 1</option>
          <option>Product 2</option>
        </select>
      </div>

      <div class="form-section">
        <h3>🚨 {{ $t('commission.dealerInfo') }}</h3>
        <label>{{ $t('commission.dealerGroup') }}</label>
        <select v-model="newCommission.dealerGroup">
          <option>{{ $t('common.all') }}</option>
          <option>Group 1</option>
          <option>Group 2</option>
        </select>

        <label>{{ $t('commission.dealer') }}</label>
        <select v-model="newCommission.dealer">
          <option>{{ $t('common.all') }}</option>
          <option>Dealer 1</option>
          <option>Dealer 2</option>
        </select>
      </div>

      <div class="form-section">
        <h3>💰 {{ $t('commission.commissionInfo') }}</h3>
        <label>{{ $t('commission.type') }}</label>
        <select v-model="newCommission.commissionType">
          <option>{{ $t('commission.fixed') }}</option>
          <option>{{ $t('commission.percent') }}</option>
        </select>

        <label>{{ $t('commission.amount') }}</label>
        <input type="number" v-model="newCommission.commissionAmount">
      </div>

      <div class="modal-buttons">
        <button class="btn btn-primary" @click="saveCommission">✔ {{ $t('common.save') }}</button>
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
/* Container */
.commissions-container {
  padding: 20px;
}

/* Üst Kısım */
.header-section {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  padding: 15px;
  background: var(--header-bg, #ffffff);
  border-bottom: 1px solid var(--border-color, #ddd);
  border-radius: 8px;
}

.search-input {
  width: 250px;
  padding: 8px;
  border: 1px solid var(--border-color, #ccc);
  border-radius: 5px;
  background: var(--input-bg, #fff);
  color: var(--text-color, #000);
}

/* Butonlar */
.btn {
  padding: 8px 14px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
  font-weight: 500;
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
  background: var(--card-bg, #fff);
  padding: 20px;
  border-radius: 10px;
  margin-top: 10px;
  overflow-x: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
  min-width: 750px;
}
th, td {
  padding: 10px;
  border-bottom: 1px solid var(--border-color, #ddd);
  text-align: left;
  color: var(--text-color, #000);
}
th {
  background: var(--thead-bg, #f3f4f6);
  font-weight: bold;
}
.empty-state {
  text-align: center;
  padding: 30px;
  color: var(--text-muted, #9ca3af);
}
.empty-state img {
  width: 100px;
  opacity: 0.5;
}

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99998;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Modal İçeriği */
.modal {
  background: var(--card-bg, #fff);
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  color: var(--text-color, #000);
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

/* Form */
.form-section {
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 5px;
  background: var(--form-bg, #eef2ff);
}
h3 {
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: bold;
}
label {
  display: block;
  margin: 5px 0;
  font-weight: 500;
}
select, input {
  width: 100%;
  padding: 8px;
  border: 1px solid var(--border-color, #ccc);
  border-radius: 5px;
  background: var(--input-bg, #fff);
  color: var(--text-color, #000);
}

/* Butonlar */
.modal-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

/* 🌙 Koyu Mod Değişkenleri */
:root.dark {
  --header-bg: #1f2937;
  --card-bg: #1e293b;
  --input-bg: #111827;
  --thead-bg: #374151;
  --form-bg: #2b3548;
  --border-color: #374151;
  --text-color: #f3f4f6;
  --text-muted: #9ca3af;
}

/* 📱 Responsive */
@media (max-width: 768px) {
  .header-section {
    flex-direction: column;
    align-items: stretch;
  }
  .search-input {
    width: 100%;
  }
  .btn {
    width: 100%;
  }
  .modal {
    width: 95%;
  }
}
</style>