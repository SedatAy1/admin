<template>
  <CustomersLayout>
    <div class="balances-container">
      <div class="search-bar">
        <input type="text" v-model="searchQuery" placeholder="🔍 Ara..." class="search-input" />
      </div>
      <table class="balances-table">
        <thead>
          <tr>
            <th>Har. No</th>
            <th>Müşteri No</th>
            <th>Müşteri Adı</th>
            <th>Müşteri Soyadı</th>
            <th>Tutar</th>
            <th>Durum</th>
            <th>Tarih</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="balances.length === 0">
            <td colspan="8" class="empty-state">
              <img src="/Users/sedat/ecommerce-dashboard/src/assets/no-data.png" alt="No Data" class="no-data-img" />
              <p>Kayıt bulunamadı.</p>
            </td>
          </tr>
          <tr v-for="balance in filteredBalances" :key="balance.id">
            <td>{{ balance.transactionNo }}</td>
            <td>{{ balance.customerNo }}</td>
            <td>{{ balance.customerName }}</td>
            <td>{{ balance.customerSurname }}</td>
            <td>{{ balance.amount }}</td>
            <td>{{ balance.status }}</td>
            <td>{{ balance.date }}</td>
            <td>
              <button class="action-button">İşlemler</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </CustomersLayout>
</template>

<script>
import CustomersLayout from "@/views/customers/CustomersLayout.vue";

export default {
  components: {
    CustomersLayout,
  },
  data() {
    return {
      searchQuery: "",
      balances: [],
    };
  },
  computed: {
    filteredBalances() {
      return this.balances.filter((balance) =>
        Object.values(balance).some((value) =>
          String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      );
    },
  },
};
</script>

<style scoped>
.balances-container {
  padding: 20px;
}

.search-bar {
  margin-bottom: 15px;
}

.search-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
}

.balances-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.balances-table th {
  background: #f1f5f9;
  padding: 12px;
  text-align: left;
  font-weight: 600;
}

.balances-table td {
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.empty-state {
  text-align: center;
  padding: 20px;
  color: #64748b;
}

.no-data-img {
  width: 100px;
  margin-bottom: 10px;
}

.action-button {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

.action-button:hover {
  background: #2563eb;
}
</style>