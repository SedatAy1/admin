<template>
  <div class="order-menu">
    <router-link
      v-for="item in menuItems"
      :key="item.path"
      :to="item.path"
      class="menu-item"
      :class="{ active: $route.path === item.path }"
    >
      {{ item.label }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: "OrderTopMenu",
  data() {
    return {
      menuItems: [
        { label: "Hızlı Satış", path: "/orders/quick-sales" },
        { label: "Telefonla Sipariş Talepleri", path: "/orders/phone-orders" },
        { label: "Aktif Sepetler", path: "/orders/active-carts" },
        { label: "Havale Bildirimleri", path: "/orders/bank-transfer" },
        { label: "Arıza Bildirimleri", path: "/orders/fault-reports" },
        { label: "Satış Terminalleri", path: "/orders/sales-terminals" },
        { label: "Toplu İşlemler", path: "/orders/bulk-actions" },
        { label: "Hızlı Ödemeler", path: "/orders/quick-payments" }
      ],
    };
  },
};
</script>

<style scoped>
.order-menu {
  display: flex;
  gap: 15px;
  padding: 10px 20px;
  background: #f8f9fa;
  border-bottom: 2px solid #ddd;
}

.menu-item {
  text-decoration: none;
  color: #6c757d;
  padding: 10px 15px;
  border-radius: 5px;
  font-weight: 500;
  transition: all 0.3s ease-in-out;
}

.menu-item:hover {
  background: #e9ecef;
}

.active {
  background: #007bff;
  color: white;
  font-weight: bold;
}
</style>
