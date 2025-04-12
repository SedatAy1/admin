<template>
  <div>
    <!-- Üst Menü -->
    <nav class="tabs">
      <router-link :to="getRoute('marketplace-matching')">{{ $t('productTabs.marketplaceMatching') }}</router-link>
      <router-link :to="getRoute('reviews')">{{ $t('productTabs.reviews') }}</router-link>
      <router-link :to="getRoute('recommendations')">{{ $t('productTabs.recommendations') }}</router-link>
      <router-link :to="getRoute('advanced-sorting')">{{ $t('productTabs.advancedSorting') }}</router-link>
      <router-link :to="getRoute('bulk-actions')">{{ $t('productTabs.bulkActions') }}</router-link>
      <router-link :to="getRoute('bulk-seo')">{{ $t('productTabs.bulkSeo') }}</router-link>
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
.tabs {
  display: flex;
  gap: 20px;
  padding: 15px 20px;
  background-color: white;
  border-bottom: 2px solid #e0e0e0;
  justify-content: flex-start;
  flex-wrap: wrap; /* mobilde alt satıra geçmesini sağlar */
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
  cursor: pointer;
}

.tabs a:hover {
  color: #333;
}

.tabs a.router-link-exact-active {
  color: white !important;
  background-color: #2f80ed !important;
  font-weight: 600;
  border-radius: 6px;
}

/* 🌙 Dark Mode Desteği */
:root.dark .tabs {
  background-color: #1f2937;
  border-bottom: 2px solid #374151;
}

:root.dark .tabs a {
  color: #9ca3af;
}

:root.dark .tabs a:hover {
  color: #e5e7eb;
}

:root.dark .tabs a.router-link-exact-active {
  background-color: #2563eb !important;
  color: white !important;
}

/* 📱 Responsive */
@media (max-width: 768px) {
  .tabs {
    gap: 10px;
    padding: 10px;
    justify-content: flex-start;
  }

  .tabs a {
    padding: 10px 14px;
    font-size: 13px;
    white-space: nowrap;
  }
}
</style>
