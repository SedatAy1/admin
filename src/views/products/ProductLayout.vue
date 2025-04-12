<template>
  <div>
    <ProductTopMenu v-if="isProductPage" />
    <router-view />
  </div>
</template>

<script>
import ProductTopMenu from "@/components/ProductTopMenu.vue";
import { useRoute } from "vue-router";

export default {
  components: { ProductTopMenu },
  computed: {
    isProductPage() {
      const route = useRoute();
      return route.path.startsWith("/products");
    },
  },
};
</script>

<style scoped>
.product-layout {
  padding: 20px;
  background-color: white;
  color: #1f2937;
  transition: background 0.3s ease, color 0.3s ease;
}

/* 🌙 Dark Mode */
:root.dark .product-layout {
  background-color: #111827;
  color: #f3f4f6;
}

/* 📱 Responsive */
@media (max-width: 768px) {
  .product-layout {
    padding: 15px;
  }
}
</style>
