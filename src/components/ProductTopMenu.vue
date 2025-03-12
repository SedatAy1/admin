<template>
  <div class="product-top-menu">
    <router-link
      v-for="item in menuItems"
      :key="item.path"
      :to="item.path"
      class="menu-item"
      :class="{ active: $route.path === item.path }">
      {{ item.label }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ProductTopMenu",
  data() {
    return {
      menuItems: [
        { label: "Ürün Yönetimi", path: "/products/manage" },
        { label: "Kategori Yönetimi", path: "/products/categories" },
        { label: "Marka Yönetimi", path: "/products/brands" },
        { label: "Nitelik Yönetimi", path: "/products/attributes" },
        { label: "Özel Alan Yönetimi", path: "/products/custom-fields" },
        { label: "Uyumluluk Grupları", path: "/products/compatibility-groups" },
        { label: "Ürün Etiketleri", path: "/products/tags" },
        { label: "Arama Eşleştirme", path: "/products/search-matching" },
        { label: "Arama Konsolu", path: "/products/search-console" }
      ]
    };
  }
};
</script>

<style scoped>
.product-top-menu {
  display: flex;
  justify-content: center;
  gap: 15px;
  padding: 15px;
  background: white;
  border-bottom: 1px solid #ddd;
}

.menu-item {
  text-decoration: none;
  color: #555;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background 0.3s, color 0.3s;
}

.menu-item:hover {
  background: #f1f1f1;
}

.menu-item.active {
  background: #007bff;
  color: white;
}
</style>
