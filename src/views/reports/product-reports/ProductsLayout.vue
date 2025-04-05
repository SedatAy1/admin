<template>
  <div class="reports-layout">
    <nav class="report-tabs">
      <router-link to="/reports/orders/daily">📦 Sipariş Raporları</router-link>
      <router-link to="/reports/product-reports/stock" active-class="active">🛒 Ürün Raporları</router-link>
      <router-link to="/reports/member-dealer-reports/new">🧑‍🤝‍🧑 Üye / Bayi Raporları</router-link>
      <router-link to="/reports/system-reports/logs">🖥️ Sistem Raporları</router-link>
    </nav>

    <div class="report-content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.reports-layout {
  display: flex;
  flex-direction: column;
}

.report-tabs {
  display: flex;
  gap: 12px;
  padding: 12px 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
}

.report-tabs a {
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 18px;
  border-radius: 8px;
  color: #374151;
  transition: background-color 0.2s ease;
  border: 1px solid #e2e8f0;
  background-color: #f8fafc;
}

.report-tabs a:hover {
  background-color: #e0f2fe;
}

.report-tabs a.active {
  background-color: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.report-content {
  padding: 24px;
}
</style>