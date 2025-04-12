<template>
  <CustomersLayout>
    <div class="balances-container">
      <div class="search-bar">
        <input
          type="text"
          v-model="searchQuery"
          :placeholder="$t('common.search')"
          class="search-input"
        />
      </div>

      <table class="balances-table">
        <thead>
          <tr>
            <th>{{ $t("balance.transactionNo") }}</th>
            <th>{{ $t("balance.customerNo") }}</th>
            <th>{{ $t("balance.name") }}</th>
            <th>{{ $t("balance.surname") }}</th>
            <th>{{ $t("balance.amount") }}</th>
            <th>{{ $t("balance.status") }}</th>
            <th>{{ $t("balance.date") }}</th>
            <th>{{ $t("common.actions") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="balances.length === 0">
            <td colspan="8" class="empty-state">
              <img :src="noDataImage" alt="No Data" class="no-data-img" />
              <p>{{ $t("common.noData") }}</p>
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
              <button class="action-button">{{ $t("common.actions") }}</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </CustomersLayout>
</template>
<script setup>
import CustomersLayout from "@/views/customers/CustomersLayout.vue";
import noDataImage from "@/assets/no-data.png"; // ✅ Vite yolu ile import
import { ref, computed } from "vue";

const searchQuery = ref("");
const balances = ref([]); // API'den çekilecek veriler buraya

const filteredBalances = computed(() =>
  balances.value.filter((balance) =>
    Object.values(balance).some((value) =>
      String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  )
);
</script>

<style scoped>
:root {
  --bg-light: #ffffff;
  --bg-dark: #1f2937;
  --card-light: #f8fafc;
  --card-dark: #2d3748;
  --text-light: #1f2937;
  --text-dark: #f9fafb;
  --muted-light: #64748b;
  --muted-dark: #94a3b8;
  --border-light: #e2e8f0;
  --border-dark: #475569;
  --accent: #3b82f6;
  --accent-hover: #2563eb;
}

body.dark {
  background-color: var(--bg-dark);
  color: var(--text-dark);
}

/* Ana Kapsayıcı */
.balances-container {
  padding: 24px;
  background-color: var(--bg-light);
  color: var(--text-light);
  border-radius: 12px;
}
body.dark .balances-container {
  background-color: var(--bg-dark);
  color: var(--text-dark);
}

/* Arama */
.search-bar {
  margin-bottom: 16px;
}
.search-input {
  width: 100%;
  padding: 10px 14px;
  font-size: 15px;
  border-radius: 8px;
  border: 1px solid var(--border-light);
  background-color: var(--card-light);
  color: var(--text-light);
  outline: none;
}
body.dark .search-input {
  background-color: var(--card-dark);
  border: 1px solid var(--border-dark);
  color: var(--text-dark);
}

/* Tablo */
.balances-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
.balances-table th {
  background-color: var(--card-light);
  color: var(--text-light);
  padding: 12px;
  text-align: left;
  font-weight: 600;
  border-bottom: 1px solid var(--border-light);
}
.balances-table td {
  padding: 12px;
  border-bottom: 1px solid var(--border-light);
}
body.dark .balances-table th,
body.dark .balances-table td {
  background-color: var(--card-dark);
  color: var(--text-dark);
  border-color: var(--border-dark);
}

/* Boş Durum */
.empty-state {
  text-align: center;
  padding: 30px;
  color: var(--muted-light);
}
body.dark .empty-state {
  color: var(--muted-dark);
}
.no-data-img {
  width: 80px;
  opacity: 0.6;
  margin-bottom: 10px;
}

/* İşlem Butonu */
.action-button {
  background-color: var(--accent);
  color: #fff;
  padding: 8px 14px;
  border-radius: 6px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s ease;
}
.action-button:hover {
  background-color: var(--accent-hover);
}

/* Responsive */
@media (max-width: 768px) {
  .balances-table th,
  .balances-table td {
    padding: 10px;
    font-size: 13px;
  }

  .action-button {
    padding: 6px 10px;
    font-size: 13px;
  }

  .no-data-img {
    width: 60px;
  }
}
</style>