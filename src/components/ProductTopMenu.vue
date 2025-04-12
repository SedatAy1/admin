<template>
  <div class="product-top-menu">
    <router-link
      v-for="item in menuItems"
      :key="item.path"
      :to="item.path"
      class="menu-item"
      :class="{ active: $route.path === item.path }">
      {{ $t(item.label) }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ProductTopMenu",
  data() {
  return {
    menuItems: [
      { label: "productMenu.manage", path: "/products/manage" },
      { label: "productMenu.categories", path: "/products/categories" },
      { label: "productMenu.brands", path: "/products/brands" },
      { label: "productMenu.attributes", path: "/products/attributes" },
      { label: "productMenu.customFields", path: "/products/custom-fields" },
      { label: "productMenu.compatibilityGroups", path: "/products/compatibility-groups" },
      { label: "productMenu.tags", path: "/products/tags" },
      { label: "productMenu.searchMatching", path: "/products/search-matching" },
      { label: "productMenu.searchConsole", path: "/products/search-console" }
    ]
  };
}
};
</script>

<style scoped>
.product-top-menu {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 1rem 1.5rem;
  background: white; /* Beyaz arka plan */
  border-bottom: 1px solid #e5e7eb;
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
.dark-mode .product-top-menu {
  background-color: #1e293b;
  border-color: #334155;
}

.dark-mode .menu-item {
  color: #cbd5e1;
}

.dark-mode .menu-item:hover {
  background-color: #2e3a4f;
  color: #93c5fd;
}

.dark-mode .menu-item.active {
  background-color: #3b82f6;
  color: white;
}

/* 📱 Responsive */
@media (max-width: 768px) {
  .product-top-menu {
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