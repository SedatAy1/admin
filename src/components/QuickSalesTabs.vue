<template>
  <div class="quick-sales-tabs">
    <router-link
      v-for="tab in quickSalesTabs"
      :key="tab.route"
      :to="tab.route"
      class="tab-link"
      :class="{ active: $route.path === tab.route }"
    >
      {{ $t(tab.name) }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: "QuickSalesTabs",
  data() {
  return {
    quickSalesTabs: [
      { name: "quickSales.tabs.quickSales", route: "/orders/quick-sales" },
      { name: "quickSales.tabs.phoneOrders", route: "/orders/phone-orders" },
      { name: "quickSales.tabs.activeCarts", route: "/orders/active-carts" },
      { name: "quickSales.tabs.bankTransfer", route: "/orders/bank-transfer" }
    ]
  };
}
};
</script>

<style scoped>
.quick-sales-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 1rem 1.5rem;
  background: #f0f4f8;
  border-bottom: 1px solid #ccc;
}

.tab-link {
  text-decoration: none;
  color: #334155;
  background-color: transparent;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.tab-link:hover {
  background-color: #e2e8f0;
  color: #1e40af;
}

.tab-link.active {
  background-color: #6c63ff;
  color: white;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(108, 99, 255, 0.2);
}

/* Dark Mode */
.dark-mode .quick-sales-tabs {
  background-color: #1e293b;
  border-color: #334155;
}

.dark-mode .tab-link {
  color: #cbd5e1;
}

.dark-mode .tab-link:hover {
  background-color: #2c3a4f;
  color: #a5b4fc;
}

.dark-mode .tab-link.active {
  background-color: #6c63ff;
  color: white;
}

/* Responsive */
@media (max-width: 768px) {
  .quick-sales-tabs {
    flex-direction: column;
    gap: 8px;
  }

  .tab-link {
    width: 100%;
    text-align: center;
  }
}
</style>