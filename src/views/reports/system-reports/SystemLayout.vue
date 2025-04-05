<template>
  <div>
    <!-- Üst sekmeler burada olacak -->
    <nav class="order-tabs">
      <router-link to="/reports/orders/daily">📦 Sipariş Raporları</router-link>
      <router-link to="/reports/product-reports/Stock.vue">🛒 Ürün Raporları</router-link>
      <router-link to="/reports/member-dealer-reports/New.vue">🧑‍🤝‍🧑 Üye / Bayi Raporları</router-link>
      <router-link to="/reports/system-reports/Logs.vue">🖥️ Sistem Raporları</router-link>
    </nav>

    <!-- Alt sayfa -->
    <router-view />
  </div>
</template>

<style scoped>
.order-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.order-tabs a {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  text-decoration: none;
  color: #333;
}

.order-tabs a.router-link-exact-active {
  background: #3b82f6;
  color: white;
  font-weight: 600;
}
</style>