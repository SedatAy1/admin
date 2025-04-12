<template>
  <div class="tabs">
    <router-link to="/products/other/MarketplaceMatching" class="tab-link" active-class="active">
      {{ $t("productTabs.marketplaceMatching") }}
    </router-link>
    <router-link to="/products/other/product-reviews" class="tab-link" active-class="active">
      {{ $t("productTabs.productReviews") }}
    </router-link>
    <router-link to="/products/other/product-recommendations" class="tab-link" active-class="active">
      {{ $t("productTabs.productRecommendations") }}
    </router-link>
    <router-link to="/products/other/advanced-product-sorting" class="tab-link" active-class="active">
      {{ $t("productTabs.advancedSorting") }}
    </router-link>
    <router-link to="/products/other/bulk-operations" class="tab-link" active-class="active">
      {{ $t("productTabs.bulkOperations") }}
    </router-link>
    <router-link to="/products/other/bulk-seo-modifications" class="tab-link" active-class="active">
      {{ $t("productTabs.bulkSeo") }}
    </router-link>
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 1rem 1.5rem;
  background-color: #1e2a38;
  border-bottom: 2px solid #333;
  overflow-x: auto;
}

.tab-link {
  padding: 8px 16px;
  color: #cbd5e1;
  text-decoration: none;
  border-radius: 6px;
  transition: background 0.3s, color 0.3s;
  white-space: nowrap;
  font-weight: 500;
}

.tab-link:hover {
  background: #32465a;
  color: white;
}

.tab-link.active {
  background-color: #6c63ff;
  color: white;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(108, 99, 255, 0.2);
}

/* Dark mode destekli */
.dark-mode .tabs {
  background-color: #141c2b;
  border-color: #222;
}

.dark-mode .tab-link {
  color: #bbb;
}

.dark-mode .tab-link:hover {
  background-color: #2a3444;
  color: #fff;
}

.dark-mode .tab-link.active {
  background-color: #6c63ff;
  color: white;
}

/* Responsive */
@media (max-width: 768px) {
  .tabs {
    flex-direction: column;
    gap: 8px;
  }

  .tab-link {
    padding: 10px;
    width: 100%;
  }
}
</style>