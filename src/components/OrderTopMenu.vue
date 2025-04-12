<template>
  <div class="order-menu">
    <router-link
      v-for="item in menuItems"
      :key="item.path"
      :to="item.path"
      class="menu-item"
      :class="{ active: $route.path === item.path }"
    >
      {{ $t(item.label) }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: "OrderTopMenu",
  data() {
  return {
    menuItems: [
      { label: "orderMenu.quickSales", path: "/orders/quick-sales" },
      { label: "orderMenu.phoneOrders", path: "/orders/phone-orders" },
      { label: "orderMenu.activeCarts", path: "/orders/active-carts" },
      { label: "orderMenu.bankTransfer", path: "/orders/bank-transfer" },
      { label: "orderMenu.faultReports", path: "/orders/fault-reports" },
      { label: "orderMenu.salesTerminals", path: "/orders/sales-terminals" },
      { label: "orderMenu.bulkActions", path: "/orders/bulk-actions" },
      { label: "orderMenu.quickPayments", path: "/orders/quick-payments" }
    ]
  };
}
};
</script>

<style scoped>
.order-menu {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 1rem 1.5rem;
  background: white; /* Arka plan beyaz sabit */
  border-bottom: 1px solid #e0e0e0;
}

.menu-item {
  padding: 10px 18px;
  color: #1e3a8a;
  text-decoration: none;
  background-color: transparent;
  border-radius: 8px;
  font-weight: 500;
  font-size: 15px;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.menu-item:hover {
  background-color: #e0ecff;
  color: #1d4ed8;
  border-color: #c7d2fe;
}

.menu-item.active {
  background-color: #3b82f6;
  color: white;
  font-weight: 600;
  border-color: #2563eb;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
}

/* 🌙 Dark Mode */
.dark-mode .order-menu {
  background-color: #1e293b;
  border-color: #334155;
}

.dark-mode .menu-item {
  color: #cbd5e1;
  border-color: transparent;
}

.dark-mode .menu-item:hover {
  background-color: #2e3a4f;
  color: #93c5fd;
  border-color: #475569;
}

.dark-mode .menu-item.active {
  background-color: #3b82f6;
  color: white;
  font-weight: 600;
  border-color: #2563eb;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
}

/* 📱 Responsive */
@media (max-width: 768px) {
  .order-menu {
    flex-direction: column;
    gap: 10px;
    padding: 1rem;
  }

  .menu-item {
    width: 100%;
    text-align: center;
  }
}
</style>