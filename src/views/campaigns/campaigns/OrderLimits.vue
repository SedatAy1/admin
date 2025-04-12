<template>
  <div class="order-limits-container">
    <!-- Üst Kısım -->
    <div class="header-section">
      <input type="text" class="search-input" :placeholder="$t('orderLimit.search')" />
      <div class="buttons">
        <button class="btn btn-primary" @click="openNewOrderLimitModal">
          ➕ {{ $t('orderLimit.new') }}
        </button>
      </div>
    </div>

    <!-- Tablo -->
    <div class="table-container">
      <table v-if="orderLimits.length > 0">
        <thead>
          <tr>
            <th>{{ $t('orderLimit.id') }}</th>
            <th>{{ $t('orderLimit.name') }}</th>
            <th>{{ $t('orderLimit.min') }}</th>
            <th>{{ $t('orderLimit.max') }}</th>
            <th>{{ $t('orderLimit.variant') }}</th>
            <th>{{ $t('orderLimit.groups') }}</th>
            <th>{{ $t('orderLimit.dateRange') }}</th>
            <th>{{ $t('orderLimit.priority') }}</th>
            <th>{{ $t('orderLimit.status') }}</th>
            <th>{{ $t('common.actions') }}</th>
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
              <button class="btn btn-sm btn-danger" @click="deleteOrderLimit(index)">
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

  <!-- Modal -->
  <div v-if="showNewOrderLimitModal" class="modal-overlay" @click.self="closeNewOrderLimitModal">
    <div class="modal">
      <div class="modal-header">
        <h2>{{ $t('orderLimit.newTitle') }}</h2>
        <button class="close-btn" @click="closeNewOrderLimitModal">✖</button>
      </div>

      <div class="form-group">
        <label>{{ $t('orderLimit.form.name') }} <span class="required">{{ $t('common.required') }}</span></label>
        <input type="text" v-model="newOrderLimit.name" />
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>{{ $t('orderLimit.form.status') }} <span class="required">{{ $t('common.required') }}</span></label>
          <select v-model="newOrderLimit.status">
            <option>{{ $t('common.active') }}</option>
            <option>{{ $t('common.passive') }}</option>
          </select>
        </div>
        <div class="form-group">
          <label>{{ $t('orderLimit.form.priority') }}</label>
          <input type="number" v-model="newOrderLimit.priority" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>{{ $t('orderLimit.form.min') }}</label>
          <input type="number" v-model="newOrderLimit.minAmount" />
        </div>
        <div class="form-group">
          <label>{{ $t('orderLimit.form.max') }}</label>
          <input type="number" v-model="newOrderLimit.maxAmount" />
        </div>
      </div>

      <div class="modal-buttons">
        <button class="btn btn-primary" @click="saveOrderLimit">✔ {{ $t('common.save') }}</button>
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
/* 🌐 Genel Container */
.order-limits-container {
  padding: 20px;
}

/* Üst Kısım */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 15px;
  background: var(--header-bg, white);
  border-bottom: 1px solid var(--border-color, #ddd);
}

.search-input {
  width: 250px;
  padding: 8px;
  border: 1px solid var(--border-color, #ccc);
  border-radius: 5px;
  background: var(--input-bg, #fff);
  color: var(--text-color, #1f2937);
}

/* Butonlar */
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
  background: var(--card-bg, white);
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
  border-bottom: 1px solid var(--border-color, #ddd);
  text-align: left;
  color: var(--text-color, #1f2937);
}

th {
  background: var(--thead-bg, #f3f4f6);
  font-weight: bold;
  color: var(--thead-text, #1f2937);
}

.empty-state {
  text-align: center;
  padding: 30px;
  color: var(--text-color, #6b7280);
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

/* Modal */
.modal {
  background: var(--card-bg, white);
  color: var(--text-color, #1f2937);
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
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

input, select {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  margin-top: 5px;
  border: 1px solid var(--border-color, #ccc);
  border-radius: 5px;
  background: var(--input-bg, #fff);
  color: var(--text-color, #1f2937);
}

.form-group {
  margin-bottom: 15px;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.form-row .form-group {
  flex: 1;
  min-width: 200px;
}

/* Zorunlu alan etiketi */
.required {
  color: #ef4444;
  font-size: 12px;
  margin-left: 5px;
}

/* Buton Grubu */
.modal-buttons {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

/* 🌙 Koyu Mod */
:root.dark {
  --header-bg: #1f2937;
  --card-bg: #1e293b;
  --text-color: #f3f4f6;
  --input-bg: #111827;
  --border-color: #374151;
  --thead-bg: #374151;
  --thead-text: #f9fafb;
}

/* 📱 Responsive */
@media (max-width: 768px) {
  .search-input {
    width: 100%;
    margin-bottom: 10px;
  }

  .header-section {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }

  .form-row {
    flex-direction: column;
  }

  .modal-buttons {
    flex-direction: column;
    gap: 10px;
  }

  .btn {
    width: 100%;
  }
}
</style>