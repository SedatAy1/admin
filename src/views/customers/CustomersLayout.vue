<template>
  <div class="layout-container">
    <!-- Üst Menü -->
    <div class="top-menu">
      <router-link
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        active-class="active">
        {{ $t(item.label) }}
      </router-link>
    </div>

    <!-- İçerik -->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuItems: [
        { label: "customers.menu.manage", path: "/customers/manage" },
        { label: "customers.menu.risk", path: "/customers/risk" },
        { label: "customers.menu.balances", path: "/customers/balances" },
        { label: "customers.menu.dealers", path: "/customers/dealers" },
        { label: "customers.menu.groups", path: "/customers/groups" },
        { label: "customers.menu.transactions", path: "/customers/transactions" }
      ]
    };
  }
};
</script>

<style scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.top-menu {
  display: flex;
  gap: 10px;
  padding: 12px;
  background-color: white;
  border-bottom: 2px solid #e0e0e0;
}

.top-menu a {
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  color: #333;
  padding: 12px 24px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  transition: all 0.3s ease;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
}

.top-menu a:hover {
  background-color: #f5f5f5;
}

.top-menu a.active {
  background-color: #3b82f6;
  color: white;
  border-color: #3b82f6;
  font-weight: 600;
  box-shadow: none;
}

.content {
  padding: 20px;
}
</style>