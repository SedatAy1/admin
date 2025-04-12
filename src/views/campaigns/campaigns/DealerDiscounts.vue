<template>
  <div class="discounts-container">
    <!-- Üst Kısım -->
    <div class="header-section">
      <input type="text" class="search-input" :placeholder="$t('dealerDiscount.search')" />
      <div class="buttons">
        <button class="btn btn-primary" @click="openNewDiscountModal">
          ➕ {{ $t('dealerDiscount.new') }}
        </button>
        <button class="btn btn-success" @click="openExcelModal">
          📊 {{ $t('dealerDiscount.excel') }}
        </button>
      </div>
    </div>

    <!-- Tablo -->
    <div class="table-container">
      <table v-if="discounts.length > 0">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t('dealerDiscount.id') }}</th>
            <th>{{ $t('dealerDiscount.category') }}</th>
            <th>{{ $t('dealerDiscount.brand') }}</th>
            <th>{{ $t('dealerDiscount.product') }}</th>
            <th>{{ $t('dealerDiscount.group') }}</th>
            <th>{{ $t('dealerDiscount.dealer') }}</th>
            <th>{{ $t('dealerDiscount.type') }}</th>
            <th>{{ $t('dealerDiscount.amount') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(discount, index) in discounts" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ discount.id }}</td>
            <td>{{ discount.category }}</td>
            <td>{{ discount.brand }}</td>
            <td>{{ discount.product }}</td>
            <td>{{ discount.dealerGroup }}</td>
            <td>{{ discount.dealer }}</td>
            <td>{{ discount.discountType }}</td>
            <td>{{ discount.discountValue }}</td>
            <td>
              <button class="btn btn-sm btn-danger" @click="deleteDiscount(index)">
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

    <!-- Yeni İndirim Modalı -->
    <div v-if="showNewDiscountModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h2>{{ $t('dealerDiscount.newTitle') }}</h2>
          <button class="close-btn" @click="closeNewDiscountModal">✖</button>
        </div>

        <!-- Ürün Grubu -->
        <div class="modal-section">
          <h3>📌 {{ $t('dealerDiscount.productInfo') }}</h3>
          <p>{{ $t('dealerDiscount.productHint') }}</p>
          <div class="form-group">
            <label>{{ $t('dealerDiscount.category') }}</label>
            <select><option>{{ $t('common.allCategories') }}</option></select>
          </div>
          <div class="form-group">
            <label>{{ $t('dealerDiscount.brand') }}</label>
            <select><option>{{ $t('common.allBrands') }}</option></select>
          </div>
          <div class="form-group">
            <label>{{ $t('dealerDiscount.product') }}</label>
            <input type="text" />
          </div>
        </div>

        <!-- Bayi Grubu -->
        <div class="modal-section">
          <h3>📌 {{ $t('dealerDiscount.dealerInfo') }}</h3>
          <p>{{ $t('dealerDiscount.dealerHint') }}</p>
          <div class="form-group">
            <label>{{ $t('dealerDiscount.group') }}</label>
            <select><option>{{ $t('common.allGroups') }}</option></select>
          </div>
          <div class="form-group">
            <label>{{ $t('dealerDiscount.dealer') }}</label>
            <input type="text" />
          </div>
        </div>

        <!-- İndirim -->
        <div class="modal-section">
          <h3>📌 {{ $t('dealerDiscount.discountInfo') }}</h3>
          <div class="form-group">
            <label>{{ $t('dealerDiscount.type') }}</label>
            <select><option>{{ $t('dealerDiscount.typeAmount') }}</option></select>
          </div>
          <div class="form-group">
            <label>{{ $t('dealerDiscount.amount') }}</label>
            <input type="number" />
          </div>
        </div>

        <button class="btn btn-primary" @click="saveDiscount">✔ {{ $t('common.save') }}</button>
      </div>
    </div>

    <!-- Excel Modalı -->
    <div v-if="showExcelModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h2>{{ $t('dealerDiscount.excelTitle') }}</h2>
          <button class="close-btn" @click="closeExcelModal">✖</button>
        </div>
        <div class="tab-buttons">
          <button :class="{ active: activeTab === 'export' }" @click="activeTab = 'export'">
            {{ $t('dealerDiscount.export') }}
          </button>
          <button :class="{ active: activeTab === 'import' }" @click="activeTab = 'import'">
            {{ $t('dealerDiscount.import') }}
          </button>
        </div>
        <div class="tab-content">
          <p v-if="activeTab === 'export'">{{ $t('dealerDiscount.exportInfo') }}</p>
          <p v-if="activeTab === 'import'">{{ $t('dealerDiscount.importInfo') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      discounts: [],
      showNewDiscountModal: false,
      showExcelModal: false,
      activeTab: "export",
    };
  },
  methods: {
    openNewDiscountModal() {
      console.log("✅ Yeni İndirim Modal Açılıyor...");
      this.showNewDiscountModal = true;
    },
    closeNewDiscountModal() {
      console.log("❌ Yeni İndirim Modal Kapatılıyor...");
      this.showNewDiscountModal = false;
    },
    openExcelModal() {
      console.log("✅ Excel Modal Açılıyor...");
      this.showExcelModal = true;
    },
    closeExcelModal() {
      console.log("❌ Excel Modal Kapatılıyor...");
      this.showExcelModal = false;
    },
    saveDiscount() {
      console.log("✔ İndirim Kaydedildi");
      this.closeNewDiscountModal();
    },
    deleteDiscount(index) {
      console.log("🗑️ İndirim Silindi");
      this.discounts.splice(index, 1);
    }
  },
};
</script>

<style scoped>
/* Genel Container */
.discounts-container {
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

.buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

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
.btn-success {
  background: #22c55e;
  color: white;
}
.btn-success:hover {
  background: #16a34a;
}
.btn-danger {
  background: #ef4444;
  color: white;
}
.btn-danger:hover {
  background: #dc2626;
}

/* Tablo Alanı */
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
  min-width: 950px;
}
th, td {
  padding: 10px;
  border-bottom: 1px solid var(--border-color, #ddd);
  text-align: left;
  font-size: 14px;
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
.modal-section {
  margin-top: 20px;
}
.modal-section h3 {
  font-size: 16px;
  margin-bottom: 5px;
}
.modal-section p {
  font-size: 13px;
  margin-bottom: 10px;
  color: var(--text-muted, #666);
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
.form-group label {
  font-weight: 500;
  margin-bottom: 5px;
}
.form-group input,
.form-group select {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid var(--border-color, #ccc);
  background: var(--input-bg, #fff);
  color: var(--text-color, #000);
}

/* Sekme Butonları */
.tab-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}
.tab-buttons button {
  padding: 8px 12px;
  border-radius: 5px;
  border: none;
  background: #f3f4f6;
  cursor: pointer;
}
.tab-buttons .active {
  background: #3b82f6;
  color: white;
}

/* Karanlık Mod */
:root.dark {
  --header-bg: #1f2937;
  --card-bg: #1e293b;
  --input-bg: #111827;
  --thead-bg: #374151;
  --border-color: #374151;
  --text-color: #f3f4f6;
  --text-muted: #9ca3af;
}

/* Responsive */
@media (max-width: 768px) {
  .header-section {
    flex-direction: column;
    align-items: stretch;
  }
  .search-input {
    width: 100%;
  }
  .buttons {
    flex-direction: column;
  }
  .btn {
    width: 100%;
  }
  .modal {
    width: 95%;
  }
}
</style>