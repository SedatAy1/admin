<template>
  <div class="new-orders">
    <div class="order-tabs">
      <router-link
        v-for="tab in orderTabs"
        :key="tab.route"
        :to="tab.route"
        class="order-tab"
        :class="{ active: $route.path === tab.route }"
      >
        <span>{{ $t(tab.name) }}</span>
      </router-link>
    </div>

    <!-- Filtreleme Seçenekleri -->
    <div class="filter-section">
      <div class="filter-header">
        <span>🔍 {{ $t('orders.filters.title') }}</span>
        <button @click="toggleFilter" class="toggle-btn">
          <span v-if="showFilter">▲</span>
          <span v-else>▼</span>
        </button>
      </div>

      <div v-show="showFilter" class="filter-content">
        <div class="filter-grid">
          <div class="filter-item">
            <label for="orderStatus">{{ $t('orders.filters.status') }}</label>
            <select id="orderStatus">
              <option>{{ $t('orders.status.new') }}</option>
              <option>{{ $t('orders.status.preparing') }}</option>
              <option>{{ $t('orders.status.shipped') }}</option>
              <option>{{ $t('orders.status.delivered') }}</option>
              <option>{{ $t('orders.status.requests') }}</option>
              <option>{{ $t('orders.status.cancelled') }}</option>
              <option>{{ $t('orders.status.incomplete') }}</option>
            </select>
          </div>

          <div class="filter-item">
            <label for="platform">{{ $t('orders.filters.platform') }}</label>
            <select id="platform">
              <option>{{ $t('common.notSelected') }}</option>
            </select>
          </div>

          <div class="filter-item">
            <label for="store">{{ $t('orders.filters.store') }}</label>
            <select id="store">
              <option>{{ $t('common.notSelected') }}</option>
            </select>
          </div>

          <div class="filter-item">
            <label for="terminal">{{ $t('orders.filters.terminal') }}</label>
            <select id="terminal">
              <option>{{ $t('common.notSelected') }}</option>
            </select>
          </div>

          <div class="filter-item">
            <label for="orderNumber">{{ $t('orders.filters.orderNumber') }}</label>
            <input type="text" id="orderNumber" />
          </div>

          <div class="filter-item">
            <label for="orderDate">{{ $t('orders.filters.orderDate') }}</label>
            <input type="date" id="orderDate" />
          </div>

          <!-- Diğer tüm input ve select label’ları aynı şekilde devam eder... -->
        </div>

        <div class="filter-buttons">
          <button class="reset-btn">{{ $t('common.clear') }}</button>
          <button class="apply-btn">{{ $t('common.filter') }}</button>
        </div>
      </div>
    </div>

    <!-- Tablo Başlığı -->
    <div class="orders-table">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t('orders.table.orderInfo') }}</th>
            <th>{{ $t('orders.table.customerInfo') }}</th>
            <th>{{ $t('orders.table.amount') }}</th>
            <th>{{ $t('orders.table.status') }}</th>
            <th>{{ $t('orders.table.shipping') }}</th>
            <th>{{ $t('orders.table.date') }}</th>
            <th>{{ $t('orders.table.print') }}</th>
            <th>{{ $t('orders.table.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="orders.length === 0">
            <td colspan="9" class="no-data">
              <img src="@/assets/no-data.png" alt="No Data" class="no-data-img" />
              <p>{{ $t('orders.noData') }}</p>
            </td>
          </tr>
          <!-- Sipariş listesi -->
        </tbody>
      </table>
    </div>

    <!-- Alt Bilgi -->
    <div class="table-footer">
      <select v-model="itemsPerPage">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
      <span>{{ $t('orders.footer.showing', { total: orders.length }) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewOrders",
  data() {
    return {
      showFilter: true,
      itemsPerPage: 20,
      orders: [] // Burada siparişler listesi olacak (API bağlanınca güncellenecek)
    };
  },
  methods: {
    toggleFilter() {
      this.showFilter = !this.showFilter;
    }
  }
};
</script>

<style scoped>
.new-orders {
  padding: 20px;
}

/* 🔵 Filtreleme Başlığı */
.filter-section {
  background: #0d47a1;
  color: white;
  padding: 15px 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
}

.toggle-btn {
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: 0.2s ease;
}
.toggle-btn:hover {
  color: #90caf9;
  transform: scale(1.1);
}

/* ⚙️ Filtre İçeriği */
.filter-content {
  background: white;
  padding: 25px;
  border-radius: 12px;
  margin-top: 10px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.08);
  transition: 0.3s ease;
}

/* 🧩 Grid Yapısı */
.filter-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.filter-item {
  display: flex;
  flex-direction: column;
}

.filter-item label {
  font-weight: 600;
  margin-bottom: 6px;
  color: #333;
  font-size: 14px;
}

.filter-item input,
.filter-item select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  transition: border 0.3s, box-shadow 0.2s;
}

.filter-item input:focus,
.filter-item select:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  outline: none;
}

/* 🔘 Butonlar */
.filter-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.reset-btn,
.apply-btn {
  padding: 10px 18px;
  border-radius: 6px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

.reset-btn {
  background: #6c757d;
  color: white;
}
.reset-btn:hover {
  background: #5a6268;
  transform: translateY(-1px);
}

.apply-btn {
  background: #007bff;
  color: white;
}
.apply-btn:hover {
  background: #0069d9;
  transform: translateY(-1px);
}

/* 📋 Tablo */
.orders-table {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
  margin-top: 20px;
}

.orders-table table {
  width: 100%;
  border-collapse: collapse;
}

.orders-table th,
.orders-table td {
  padding: 12px 14px;
  border-bottom: 1px solid #e0e0e0;
  text-align: center;
  font-size: 14px;
}

.orders-table th {
  background: #f8f9fa;
  font-weight: bold;
}

/* 📭 Veri yoksa */
.no-data {
  text-align: center;
  padding: 30px 10px;
  color: #666;
}

.no-data-img {
  width: 60px;
  margin-bottom: 10px;
}

/* 🔻 Alt kısmı */
.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 10px;
  font-size: 14px;
  margin-top: 10px;
}

.table-footer select {
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

/* 🌐 Responsive Grid */
@media (max-width: 1200px) {
  .filter-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 992px) {
  .filter-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 576px) {
  .filter-grid {
    grid-template-columns: 1fr;
  }

  .filter-buttons {
    flex-direction: column;
    align-items: stretch;
  }

  .reset-btn,
  .apply-btn {
    width: 100%;
    margin: 5px 0;
  }
}

/* 🌙 Dark Mode */
.dark-mode .filter-section {
  background: #1e2a3a;
  color: #fff;
}

.dark-mode .toggle-btn {
  color: #fff;
}

.dark-mode .filter-content {
  background: #2e3a4d;
}

.dark-mode .filter-item label {
  color: #ccc;
}

.dark-mode .filter-item input,
.dark-mode .filter-item select {
  background: #3b4b5c;
  color: #fff;
  border-color: #555;
}

.dark-mode .filter-item input::placeholder {
  color: #aaa;
}

.dark-mode .reset-btn {
  background: #555;
  color: #eee;
}

.dark-mode .apply-btn {
  background: #007bff;
  color: white;
}

.dark-mode .orders-table {
  background: #2e3a4d;
}

.dark-mode .orders-table th {
  background: #394a5a;
  color: #ddd;
}

.dark-mode .orders-table td {
  color: #eee;
}
</style>