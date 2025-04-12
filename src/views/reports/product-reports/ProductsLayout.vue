<template>
  <div class="reports-layout">
    <nav class="report-tabs">
      <router-link to="/reports/orders/daily" active-class="active">
        📦 {{ $t('reportTabs.orders') }}
      </router-link>
      <router-link to="/reports/product-reports/stock" active-class="active">
        🛒 {{ $t('reportTabs.products') }}
      </router-link>
      <router-link to="/reports/member-dealer-reports/new" active-class="active">
        🧑‍🤝‍🧑 {{ $t('reportTabs.members') }}
      </router-link>
      <router-link to="/reports/system-reports/logs" active-class="active">
        🖥️ {{ $t('reportTabs.system') }}
      </router-link>
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

/* Sekmeler */
.report-tabs {
  display: flex;
  gap: 12px;
  padding: 12px 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  flex-wrap: wrap;
  transition: background-color 0.3s ease;
}
html.dark .report-tabs {
  background-color: #1f1f1f;
  border-color: #333;
}

.report-tabs a {
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 18px;
  border-radius: 8px;
  color: #374151;
  border: 1px solid #e2e8f0;
  background-color: #f8fafc;
  transition: all 0.2s ease;
}
.report-tabs a:hover {
  background-color: #e0f2fe;
}
.report-tabs a.active {
  background-color: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

/* Dark Mode */
html.dark .report-tabs a {
  background-color: #2c2c2c;
  color: #f1f1f1;
  border-color: #444;
}
html.dark .report-tabs a:hover {
  background-color: #3a3a3a;
}
html.dark .report-tabs a.active {
  background-color: #3b82f6;
  color: #ffffff;
  border-color: #3b82f6;
}

/* İçerik */
.report-content {
  padding: 24px;
  transition: background-color 0.3s ease;
}
html.dark .report-content {
  background-color: #181818;
  color: #f1f1f1;
}

/* Responsive */
@media (max-width: 600px) {
  .report-tabs {
    padding: 10px 12px;
    gap: 8px;
  }

  .report-tabs a {
    padding: 8px 14px;
    font-size: 13px;
  }

  .report-content {
    padding: 16px;
  }
}
</style>