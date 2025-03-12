<template>
  <div class="order-menu">
    <router-link
      v-for="tab in orderTabs"
      :key="tab.route"
      :to="tab.route"
      class="menu-item"
      :class="{ active: $route.path === tab.route }"
    >
      {{ tab.name }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: "OrderTabs",
  data() {
    return {
      orderTabs: [
        { name: "Yeni Siparişler", route: "/orders/new" },
        { name: "Hazırlanan Siparişler", route: "/orders/preparing" },
        { name: "Kargolanan Siparişler", route: "/orders/shipped" },
        { name: "Teslim Edilen Siparişler", route: "/orders/delivered" },
        { name: "Sipariş Talepleri", route: "/orders/requests" },
        { name: "İptal Edilenler", route: "/orders/cancelled" },
        { name: "Tamamlanmayan Siparişler", route: "/orders/incomplete" }
      ]
    };
  }
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
