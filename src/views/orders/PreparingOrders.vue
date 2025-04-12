<template>
  <div class="new-orders">
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
        <!-- Buraya filtreleme seçenekleri eklenecek -->
      </div>
    </div>

    <!-- Siparişler Tablosu -->
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
          <tr v-for="(order, index) in orders" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ order.orderInfo }}</td>
            <td>{{ order.customerInfo }}</td>
            <td>{{ order.amount }}</td>
            <td>{{ order.status }}</td>
            <td>{{ order.shipping }}</td>
            <td>{{ order.date }}</td>
            <td><button class="print-btn">🖨️</button></td>
            <td><button class="action-btn">⚙️</button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Alt Bilgilendirme -->
    <div class="table-footer">
      <select v-model="itemsPerPage">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
      <span>
        {{
          $t("orders.footer.showing", {
            total: orders.length
          })
        }}
      </span>
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

/* Filtreleme Seçenekleri */
.filter-section {
  background: #0d47a1;
  color: white;
  padding: 15px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.toggle-btn {
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
}

/* Tablo */
.orders-table {
  background: white;
  border-radius: 8px;
  overflow: auto;
}

.orders-table table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
}

.orders-table th,
.orders-table td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
  text-align: center;
}

.orders-table th {
  background: #f5f5f5;
  font-weight: bold;
}

.no-data {
  text-align: center;
  padding: 20px;
}

.no-data-img {
  width: 50px;
  margin-bottom: 5px;
}

/* Alt Kısım */
.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-size: 14px;
  flex-wrap: wrap;
  gap: 10px;
}

.table-footer select {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

/* 🌙 Dark Mode */
.dark-mode .filter-section {
  background: #1e2a3a;
  color: white;
}

.dark-mode .toggle-btn {
  color: white;
}

.dark-mode .orders-table {
  background: #2b2f3a;
}

.dark-mode .orders-table th {
  background: #39414f;
  color: white;
}

.dark-mode .orders-table td {
  color: #eee;
  border-color: #444;
}

.dark-mode .table-footer {
  color: #ddd;
}

.dark-mode .table-footer select {
  background: #39414f;
  color: white;
  border: 1px solid #555;
}

/* 📱 Responsive */
@media (max-width: 768px) {
  .filter-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .orders-table table {
    font-size: 14px;
  }

  .table-footer {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
