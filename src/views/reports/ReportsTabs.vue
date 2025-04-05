<template>
  <nav class="report-tabs">
    <router-link to="/reports/orders/daily" active-class="active">📦 Sipariş Raporları</router-link>
    <router-link to="/reports/products/stock" active-class="active">🛒 Ürün Raporları</router-link>
    <router-link to="/reports/members/new" active-class="active">🧑‍🤝‍🧑 Üye / Bayi Raporları</router-link>
    <router-link to="/reports/system/logs" active-class="active">🖥️ Sistem Raporları</router-link>
  </nav>
</template>

<style scoped>
.report-tabs {
  display: flex;
  gap: 12px;
  padding: 16px 24px;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.report-tabs a {
  text-decoration: none;
  color: #374151;
  background-color: #f3f4f6;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s;
}

.report-tabs a:hover {
  background-color: #e0f2fe;
}

.report-tabs a.active {
  background-color: #3b82f6;
  color: white;
}
</style>