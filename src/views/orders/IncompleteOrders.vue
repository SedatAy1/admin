<template>
  <div class="new-orders">
    <!-- Filtreleme Seçenekleri -->
    <div class="filter-section">
      <div class="filter-header">
        <span>🔍 {{ $t("orders.filters.title") }}</span>
        <button @click="toggleFilter" class="toggle-btn">
          <span v-if="showFilter">▲</span>
          <span v-else>▼</span>
        </button>
      </div>
      <div v-show="showFilter" class="filter-content">

      </div>
    </div>

    <!-- Siparişler Tablosu -->
    <div class="orders-table">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t("orders.table.orderInfo") }}</th>
            <th>{{ $t("orders.table.customerInfo") }}</th>
            <th>{{ $t("orders.table.amount") }}</th>
            <th>{{ $t("orders.table.status") }}</th>
            <th>{{ $t("orders.table.shipping") }}</th>
            <th>{{ $t("orders.table.date") }}</th>
            <th>{{ $t("orders.table.print") }}</th>
            <th>{{ $t("orders.table.actions") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="orders.length === 0">
            <td colspan="9" class="no-data">
              <img src="@/assets/no-data.png" alt="No Data" class="no-data-img" />
              <p>{{ $t("orders.noData") }}</p>
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
        {{ $t("orders.footer.showing", { total: orders.length }) }}
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
      orders: []
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
  background-color: #f4f6fa;
  min-height: 100vh;
  transition: background 0.3s ease;
}

.dark-mode .new-orders {
  background-color: #1e1e2f;
}

/* 🔍 Filtreleme Başlığı */
.filter-section {
  background: #0d47a1;
  color: white;
  padding: 15px 20px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.dark-mode .filter-section {
  background: #22324d;
}

.toggle-btn {
  background: none;
  border: none;
  color: inherit;
  font-size: 18px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.toggle-btn:hover {
  transform: scale(1.1);
}

/* 📋 Tablo */
.orders-table {
  background: white;
  border-radius: 8px;
  overflow-x: auto;
  transition: background 0.3s ease;
}

.orders-table table {
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;
}

.orders-table th,
.orders-table td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
  text-align: center;
  font-size: 14px;
}

.orders-table th {
  background: #f5f5f5;
  font-weight: bold;
  color: #333;
}

.orders-table td {
  background: #fff;
  color: #444;
}

.dark-mode .orders-table {
  background: #2a2e39;
}

.dark-mode .orders-table th {
  background: #39414f;
  color: #fff;
  border-color: #444;
}

.dark-mode .orders-table td {
  background: #2a2e39;
  color: #ddd;
  border-color: #444;
}

/* ❌ Kayıt Bulunamadı */
.no-data {
  text-align: center;
  padding: 20px;
  color: #777;
}

.dark-mode .no-data {
  color: #aaa;
}

.no-data-img {
  width: 50px;
  margin-bottom: 5px;
  opacity: 0.75;
}

/* ⬇️ Alt Bilgilendirme */
.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 10px;
  font-size: 14px;
  flex-wrap: wrap;
  gap: 10px;
}

.table-footer select {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: white;
  color: #333;
}

.dark-mode .table-footer select {
  background: #39414f;
  border-color: #555;
  color: #fff;
}

/* 🖨️ Butonlar */
.print-btn,
.action-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.print-btn:hover,
.action-btn:hover {
  transform: scale(1.1);
}

/* 📱 Responsive */
@media (max-width: 768px) {
  .orders-table table {
    font-size: 13px;
    min-width: 100%;
  }

  .filter-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .table-footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .table-footer select {
    width: 100%;
  }
}
</style>
