<template>
  <div class="tabs">
    <router-link to="/products/other/MarketplaceMatching" active-class="active">Pazaryeri Eşleştirmeleri</router-link>
    <router-link to="/products/other/product-reviews" active-class="active">Ürün Yorumları</router-link>
    <router-link to="/products/other/product-recommendations" active-class="active">Ürün Önerileri</router-link>
    <router-link to="/products/other/advanced-product-sorting" active-class="active">Gelişmiş Ürün Sıralama</router-link>
    <router-link to="/Users/sedat/ecommerce-dashboard/src/views/products/other/BulkSEOModifications.vue" active-class="active">Toplu Ürün İşlemleri</router-link>
    <router-link to="/products/other/bulk-seo-modifications" active-class="active">Toplu SEO Güncelleme</router-link>
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  gap: 10px;
  padding: 10px;
  background-color: #24496e;
  border-bottom: 2px solid #ddd;
}
</style>
