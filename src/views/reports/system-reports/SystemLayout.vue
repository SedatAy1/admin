<template>
  <div>
    <!-- Üst sekmeler -->
    <nav class="order-tabs">
      <router-link to="/reports/orders/daily">
        📦 {{ $t('reportsTabs.orderReports') }}
      </router-link>
      <router-link to="/reports/product-reports/stock">
        🛒 {{ $t('reportsTabs.productReports') }}
      </router-link>
      <router-link to="/reports/member-dealer-reports/new">
        🧑‍🤝‍🧑 {{ $t('reportsTabs.memberDealerReports') }}
      </router-link>
      <router-link to="/reports/system-reports/logs">
        🖥️ {{ $t('reportsTabs.systemReports') }}
      </router-link>
    </nav>

    <!-- Alt sayfa içeriği -->
    <router-view />
  </div>
</template>
<style scoped>
.order-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

/* Sekmeler */
.order-tabs a {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  text-decoration: none;
  color: #333;
  background-color: #f9fafb;
  font-size: 14px;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.order-tabs a:hover {
  background-color: #e2e8f0;
}

.order-tabs a.router-link-exact-active {
  background: #3b82f6;
  color: white;
  font-weight: 600;
  border-color: #3b82f6;
}

/* Dark Mode */
html.dark .order-tabs a {
  background-color: #2c2c2c;
  color: #f1f1f1;
  border-color: #444;
}
html.dark .order-tabs a:hover {
  background-color: #3a3a3a;
}
html.dark .order-tabs a.router-link-exact-active {
  background-color: #3b82f6;
  color: #ffffff;
  border-color: #3b82f6;
}

/* Responsive */
@media (max-width: 600px) {
  .order-tabs a {
    padding: 6px 12px;
    font-size: 13px;
  }
}
</style>