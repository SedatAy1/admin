<template>
  <div class="discount-container">
    <!-- Üst Kısım -->
    <div class="header-section">
      <input type="text" class="search-input" :placeholder="$t('discount.search')" />
      <button class="btn btn-primary" @click="openNewDiscountModal">
        ➕ {{ $t('discount.new') }}
      </button>
    </div>

    <!-- Tablo -->
    <div class="table-container">
      <table v-if="discounts.length > 0">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t('discount.id') }}</th>
            <th>{{ $t('discount.category') }}</th>
            <th>{{ $t('discount.brand') }}</th>
            <th>{{ $t('discount.product') }}</th>
            <th>{{ $t('discount.group') }}</th>
            <th>{{ $t('discount.user') }}</th>
            <th>{{ $t('discount.type') }}</th>
            <th>{{ $t('discount.amount') }}</th>
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
            <td>{{ discount.group }}</td>
            <td>{{ discount.user }}</td>
            <td>{{ discount.type }}</td>
            <td>{{ discount.amount }}</td>
            <td>
              <button class="btn btn-sm btn-danger" @click="deleteDiscount(index)">❌ {{ $t('common.delete') }}</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-else class="empty-state">
        <img src="@/assets/empty.svg" alt="No Data" />
        <p>{{ $t('common.noData') }}</p>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showNewDiscountModal" class="modal-overlay" @click.self="closeNewDiscountModal">
      <div class="modal">
        <div class="modal-header">
          <h2>{{ $t('discount.modalTitle') }}</h2>
          <button class="close-btn" @click="closeNewDiscountModal">✖</button>
        </div>

        <!-- Ürün Bilgileri -->
        <div class="section">
          <h3>{{ $t('discount.productInfo') }}</h3>
          <div class="form-group">
            <label>{{ $t('discount.category') }}</label>
            <select v-model="newDiscount.category">
              <option>{{ $t('common.allCategories') }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>{{ $t('discount.brand') }}</label>
            <select v-model="newDiscount.brand">
              <option>{{ $t('common.allBrands') }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>{{ $t('discount.product') }}</label>
            <input type="text" v-model="newDiscount.product" :placeholder="$t('discount.productPlaceholder')" />
          </div>
        </div>

        <!-- Üye Bilgileri -->
        <div class="section">
          <h3>{{ $t('discount.userInfo') }}</h3>
          <div class="form-group">
            <label>{{ $t('discount.group') }}</label>
            <select v-model="newDiscount.group">
              <option>{{ $t('discount.groupDefault') }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>{{ $t('discount.user') }}</label>
            <input type="text" v-model="newDiscount.user" :placeholder="$t('discount.userPlaceholder')" />
          </div>
        </div>

        <!-- İndirim Bilgileri -->
        <div class="section">
          <h3>{{ $t('discount.discountInfo') }}</h3>
          <div class="form-group">
            <label>{{ $t('discount.type') }}</label>
            <select v-model="newDiscount.type">
              <option>{{ $t('discount.typeAmount') }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>{{ $t('discount.amount') }}</label>
            <input type="text" v-model="newDiscount.amount" :placeholder="$t('discount.amountPlaceholder')" />
          </div>
        </div>

        <!-- Butonlar -->
        <div class="modal-buttons">
          <button class="btn btn-primary" @click="saveDiscount">💾 {{ $t('common.save') }}</button>
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
      newDiscount: {
        category: "",
        brand: "",
        product: "",
        group: "",
        user: "",
        type: "",
        amount: "",
      },
    };
  },
  methods: {
    openNewDiscountModal() {
      console.log("Yeni İndirim Modal Açılıyor...");
      this.showNewDiscountModal = true;
    },
    closeNewDiscountModal() {
      console.log("Yeni İndirim Modal Kapatılıyor...");
      this.showNewDiscountModal = false;
    },
    saveDiscount() {
      this.discounts.push({
        id: this.discounts.length + 1,
        category: this.newDiscount.category,
        brand: this.newDiscount.brand,
        product: this.newDiscount.product,
        group: this.newDiscount.group,
        user: this.newDiscount.user,
        type: this.newDiscount.type,
        amount: this.newDiscount.amount,
      });
      this.closeNewDiscountModal();
    },
    deleteDiscount(index) {
      this.discounts.splice(index, 1);
    },
  },
};
</script>
<style scoped>
.discount-container {
  padding: 20px;
}

/* Üst Alan */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  min-width: 900px;
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

/* Boş Durum */
.empty-state {
  text-align: center;
  padding: 30px;
  color: var(--text-muted, #9ca3af);
}
.empty-state img {
  width: 100px;
  opacity: 0.5;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99998;
  display: flex;
  justify-content: center;
  align-items: center;
}
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
.modal-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

/* Form Alanları */
.section {
  margin-top: 20px;
}
.section h3 {
  font-size: 16px;
  margin-bottom: 10px;
}
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
.form-group label {
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 5px;
  color: var(--text-color, #000);
}
.form-group input,
.form-group select {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid var(--border-color, #ccc);
  background: var(--input-bg, #fff);
  color: var(--text-color, #000);
}

/* 🌙 Koyu Mod Teması */
:root.dark {
  --header-bg: #1f2937;
  --card-bg: #1e293b;
  --input-bg: #111827;
  --thead-bg: #374151;
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