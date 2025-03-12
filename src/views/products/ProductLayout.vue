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
}
</style>
