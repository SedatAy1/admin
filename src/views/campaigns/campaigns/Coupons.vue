<template>
  <div class="coupon-container">
    <!-- Üst Kısım -->
    <div class="header-section">
      <input type="text" class="search-input" :placeholder="$t('coupon.searchPlaceholder')" />
      <div class="buttons">
        <button class="btn btn-primary" @click="openNewCouponModal">
          ➕ {{ $t('coupon.new') }}
        </button>
        <button class="btn btn-success" @click="openExcelModal">
          📊 {{ $t('coupon.excel') }}
        </button>
      </div>
    </div>

    <!-- Tablo -->
    <div class="table-container">
      <table v-if="coupons.length > 0">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t('coupon.table.id') }}</th>
            <th>{{ $t('coupon.table.name') }}</th>
            <th>{{ $t('coupon.table.code') }}</th>
            <th>{{ $t('coupon.table.freeShipping') }}</th>
            <th>{{ $t('coupon.table.minCart') }}</th>
            <th>{{ $t('coupon.table.maxUsage') }}</th>
            <th>{{ $t('coupon.table.totalUsage') }}</th>
            <th>{{ $t('coupon.table.startDate') }}</th>
            <th>{{ $t('coupon.table.endDate') }}</th>
            <th>{{ $t('coupon.table.status') }}</th>
            <th>{{ $t('coupon.table.action') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(coupon, index) in coupons" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ coupon.id }}</td>
            <td>{{ coupon.name }}</td>
            <td>{{ coupon.code }}</td>
            <td>{{ coupon.freeShipping ? '✅' : '❌' }}</td>
            <td>{{ coupon.minCart }}</td>
            <td>{{ coupon.maxUsage }}</td>
            <td>{{ coupon.totalUsage }}</td>
            <td>{{ coupon.startDate }}</td>
            <td>{{ coupon.endDate }}</td>
            <td>{{ coupon.status }}</td>
            <td>
              <button class="btn btn-sm btn-danger" @click="deleteCoupon(index)">
                ❌ {{ $t('coupon.delete') }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-else class="empty-state">
        <img src="@/assets/empty.svg" alt="No Data" />
        <p>{{ $t('coupon.noData') }}</p>
      </div>
    </div>

    <!-- Yeni Kupon Modalı -->
    <div v-if="showNewCouponModal" class="modal-overlay">
      <div class="modal">
        <h2>{{ $t('coupon.modal.newTitle') }}</h2>
        <div class="form-group">
          <label>{{ $t('coupon.modal.code') }}</label>
          <input type="text" v-model="newCoupon.code" />
        </div>
        <div class="modal-buttons">
          <button class="btn btn-primary" @click="saveCoupon">{{ $t('common.save') }}</button>
          <button class="btn btn-secondary" @click="closeNewCouponModal">{{ $t('common.cancel') }}</button>
        </div>
      </div>
    </div>

    <!-- Excel Modalı -->
    <div v-if="showExcelModal" class="modal-overlay">
      <div class="modal">
        <h2>{{ $t('coupon.modal.excelTitle') }}</h2>
        <div class="tab-buttons">
          <button :class="{ active: activeTab === 'export' }" @click="activeTab = 'export'">
            {{ $t('coupon.export') }}
          </button>
          <button :class="{ active: activeTab === 'import' }" @click="activeTab = 'import'">
            {{ $t('coupon.import') }}
          </button>
        </div>
        <div class="tab-content">
          <p v-if="activeTab === 'export'">{{ $t('coupon.exportInfo') }}</p>
          <p v-if="activeTab === 'import'">{{ $t('coupon.importInfo') }}</p>
        </div>
        <div class="modal-buttons">
          <button class="btn btn-secondary" @click="closeExcelModal">{{ $t('common.close') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coupons: [],
      showNewCouponModal: false,
      showExcelModal: false,
      newCoupon: {
        code: "",
      },
      activeTab: "export",
    };
  },
  methods: {
    openNewCouponModal() {
      this.showNewCouponModal = true;
    },
    closeNewCouponModal() {
      this.showNewCouponModal = false;
    },
    openExcelModal() {
      this.showExcelModal = true;
    },
    closeExcelModal() {
      this.showExcelModal = false;
    },
    saveCoupon() {
      if (this.newCoupon.code.trim() === "") {
        alert(this.$t("coupon.modal.code") + " " + this.$t("common.required"));
        return;
      }
      this.coupons.push({
        id: this.coupons.length + 1,
        code: this.newCoupon.code,
        name: this.$t("coupon.modal.newTitle"),
        freeShipping: false,
        minCart: 0,
        maxUsage: 10,
        totalUsage: 0,
        startDate: "15.03.2025",
        endDate: "22.03.2025",
        status: this.$t("coupon.status.active")
      });
      this.newCoupon.code = "";
      this.closeNewCouponModal();
    },
    deleteCoupon(index) {
      this.coupons.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.coupon-container {
  padding: 20px;
  background-color: var(--bg-color, #f9fafb);
  color: var(--text-color, #1f2937);
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 15px;
  background: var(--header-bg, white);
  padding: 15px;
  border-radius: 8px;
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

.table-container {
  background: var(--card-bg, white);
  padding: 20px;
  border-radius: 10px;
  margin-top: 10px;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
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
  color: #999;
}

.empty-state img {
  width: 100px;
  opacity: 0.5;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9998;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: var(--card-bg, white);
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.modal h2 {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
}

.tab-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.tab-buttons button {
  padding: 8px 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
}

.tab-buttons .active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.tab-content {
  margin-bottom: 10px;
}

/* 🌙 Dark Mode */
:root.dark {
  --bg-color: #0f172a;
  --text-color: #f3f4f6;
  --card-bg: #1e293b;
  --header-bg: #1e293b;
}
</style>