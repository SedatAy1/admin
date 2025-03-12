<template>
  <div>
    <!-- Üst Menü -->
    <nav class="tabs">
      <router-link :to="getRoute('marketplace-matching')">Pazaryeri Eşleştirmeleri</router-link>
      <router-link :to="getRoute('reviews')">Ürün Yorumları</router-link>
      <router-link :to="getRoute('recommendations')">Ürün Önerileri</router-link>
      <router-link :to="getRoute('advanced-sorting')">Gelişmiş Ürün Sıralama</router-link>
      <router-link :to="getRoute('bulk-actions')">Toplu Ürün İşlemleri</router-link>
      <router-link :to="getRoute('bulk-seo')">Toplu SEO Güncelleme</router-link>
    </nav>

    <!-- İçerik -->
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    getRoute(name) {
      // Eğer mevcut sayfa zaten "products/other" içindeyse, bu yapıyı koru
      if (this.$route.path.includes("/products/other")) {
        return `/products/other/${name}`;
      }
      // Eğer mevcut sayfa "products" altındaysa, "other" olmadan yönlendir
      return `/products/${name}`;
    }
  }
};
</script>

<style>
/* Üst Menü Stilleri */
.tabs {
  display: flex;
  gap: 20px;
  padding: 15px 20px;
  background-color: white;
  border-bottom: 2px solid #e0e0e0;
  justify-content: flex-start;
}

.tabs a {
  all: unset;
  display: inline-block;
  padding: 12px 18px;
  text-decoration: none;
  color: #666;
  font-weight: 500;
  font-size: 14px;
  transition: color 0.3s ease, background-color 0.3s ease;
  border-radius: 6px;
}

.tabs a:hover {
  color: #333;
}

/* Aktif Olan Sayfa */
.tabs a.router-link-exact-active {
  color: white !important;
  background-color: #2f80ed !important;
  font-weight: 600;
  border-radius: 6px;
}
</style>
