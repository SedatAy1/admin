<template>
  <nav class="report-tabs">
    <router-link to="/reports/orders/daily" active-class="active">
      📦 {{ $t('reportTabs.orders') }}
    </router-link>
    <router-link to="/reports/products/stock" active-class="active">
      🛒 {{ $t('reportTabs.products') }}
    </router-link>
    <router-link to="/reports/members/new" active-class="active">
      🧑‍🤝‍🧑 {{ $t('reportTabs.members') }}
    </router-link>
    <router-link to="/reports/system/logs" active-class="active">
      🖥️ {{ $t('reportTabs.system') }}
    </router-link>
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
  transition: background-color 0.3s, border-color 0.3s;
}
html.dark .report-tabs {
  background-color: #1f1f1f;
  border-color: #333;
}

.report-tabs a {
  text-decoration: none;
  color: #374151;
  background-color: #f3f4f6;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s ease, color 0.2s ease;
}
.report-tabs a:hover {
  background-color: #e0f2fe;
}

.report-tabs a.active {
  background-color: #3b82f6;
  color: white;
}

/* Dark Mode */
html.dark .report-tabs a {
  background-color: #2c2c2c;
  color: #f1f1f1;
}
html.dark .report-tabs a:hover {
  background-color: #3a3a3a;
}
html.dark .report-tabs a.active {
  background-color: #3b82f6;
  color: #ffffff;
}

/* Responsive */
@media (max-width: 600px) {
  .report-tabs {
    padding: 12px 16px;
    gap: 8px;
  }

  .report-tabs a {
    padding: 8px 12px;
    font-size: 13px;
  }
}
</style>