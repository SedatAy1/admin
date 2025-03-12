<template>
  <div class="new-orders">
    <!-- Filtreleme Seçenekleri -->
    <div class="filter-section">
      <div class="filter-header">
        <span>🔍 Filtreleme Seçenekleri</span>
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
            <th>Sipariş Bilgileri</th>
            <th>Müşteri Bilgileri</th>
            <th>Tutar</th>
            <th>Durum</th>
            <th>Kargo</th>
            <th>Tarih</th>
            <th>Yazdır</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="orders.length === 0">
            <td colspan="9" class="no-data">
              <img src="@/assets/no-data.png" alt="No Data" class="no-data-img" />
              <p>Kayıt bulunamadı.</p>
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
      <span>{{ orders.length }} kayıttan 1 ile {{ orders.length }} arası gösteriliyor</span>
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
  overflow: hidden;
}

.orders-table table {
  width: 100%;
  border-collapse: collapse;
}

.orders-table th, .orders-table td {
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
}

.table-footer select {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ddd;
}
</style>
