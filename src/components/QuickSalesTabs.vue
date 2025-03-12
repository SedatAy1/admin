<template>
  <div class="quick-sales-tabs">
    <router-link
      v-for="tab in quickSalesTabs"
      :key="tab.route"
      :to="tab.route"
      class="tab-link"
      :class="{ active: $route.path === tab.route }"
    >
      {{ tab.name }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: "QuickSalesTabs",
  data() {
    return {
      quickSalesTabs: [
        { name: "Hızlı Satış", route: "/orders/quick-sales" },
        { name: "Telefonla Sipariş Talepleri", route: "/orders/phone-orders" },
        { name: "Aktif Sepetler", route: "/orders/active-carts" },
        { name: "Havale Bildirimleri", route: "/orders/bank-transfer" }
      ]
    };
  }
};
</script>

<style scoped>
.quick-sales-tabs {
  display: flex;
  gap: 15px;
  padding: 10px 20px;
  background: #f8f9fa;
  border-bottom: 2px solid #ddd;
}

.tab-link {
  text-decoration: none;
  color: #6c757d;
  padding: 10px 15px;
  border-radius: 5px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.tab-link:hover {
  background: #e9ecef;
}

.active {
  background: #007bff;
  color: white;
  font-weight: bold;
}
</style>
