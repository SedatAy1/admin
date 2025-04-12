<template>
  <div class="order-tabs">
    <router-link
      v-for="tab in orderTabs"
      :key="tab.route"
      :to="tab.route"
      class="tab-item"
      :class="{ active: $route.path === tab.route }"
    >
      {{ $t(tab.name) }}
    </router-link>
  </div>
</template>
<script>
export default {
  name: "OrderTabs",
  data() {
  return {
    orderTabs: [
      { name: "orders.new", route: "/orders/new" },
      { name: "orders.preparing", route: "/orders/preparing" },
      { name: "orders.shipped", route: "/orders/shipped" },
      { name: "orders.delivered", route: "/orders/delivered" },
      { name: "orders.requests", route: "/orders/requests" },
      { name: "orders.cancelled", route: "/orders/cancelled" },
      { name: "orders.incomplete", route: "/orders/incomplete" }
    ]
  };
}
};
</script>
<style scoped>
.order-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: var(--bg, #f0f2f5);
  border-bottom: 1px solid #dcdcdc;
}

/* Sekme Butonları */
.tab-item {
  padding: 10px 18px;
  border-radius: 8px;
  text-decoration: none;
  background-color: white;
  color: #204f9c;
  font-weight: 500;
  font-size: 15px;
  border: 1px solid #204f9c;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.04);
}

.tab-item:hover {
  background-color: #204f9c;
  color: white;
  transform: translateY(-1px);
}

/* Aktif Buton */
.tab-item.active {
  background-color: #204f9c;
  color: white;
  font-weight: 600;
  box-shadow: 0 3px 8px rgba(32, 79, 156, 0.3);
}

/* 🌙 Dark Mode */
.dark-mode .order-tabs {
  background: #1e1e2f;
  border-color: #2e2e40;
}

.dark-mode .tab-item {
  background-color: transparent;
  color: #c0c4d0;
  border: 1px solid #3f4a6b;
}

.dark-mode .tab-item:hover {
  background-color: #204f9c;
  color: white;
}

.dark-mode .tab-item.active {
  background-color: #204f9c;
  color: white;
  border-color: #204f9c;
}

/* 📱 Responsive */
@media (max-width: 768px) {
  .order-tabs {
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
  }

  .tab-item {
    width: 100%;
    text-align: center;
    font-size: 14px;
  }
}
</style>