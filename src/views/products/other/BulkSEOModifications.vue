<template>
  <div>
    <!-- Ana İçerik -->
    <div class="container">
      <div class="seo-section">
        <!-- Sol Panel: İçerik Tipi Seçimi -->
        <div class="seo-box left-box">
          <h3 class="title">1 - {{ $t('seo.contentTypeTitle') }}</h3>
          <div class="info-box">
            <font-awesome-icon icon="info-circle" class="icon" />
            <span>{{ $t('seo.contentTypeInfo') }}</span>
          </div>
          <button class="seo-option" @click="selectContentType('product')">
            <font-awesome-icon icon="list" class="icon" /> {{ $t('seo.product') }}
          </button>
          <button class="seo-option" @click="selectContentType('category')">
            <font-awesome-icon icon="sitemap" class="icon" /> {{ $t('seo.category') }}
          </button>
          <button class="seo-option" @click="selectContentType('brand')">
            <font-awesome-icon icon="asterisk" class="icon" /> {{ $t('seo.brand') }}
          </button>
          <button class="seo-option" @click="selectContentType('tag')">
            <font-awesome-icon icon="tag" class="icon" /> {{ $t('seo.tag') }}
          </button>
        </div>

        <!-- Sağ Panel: Filtreleme -->
        <div class="seo-box right-box">
          <h3 class="title">2 - {{ $t('seo.filterTitle') }}</h3>
          <div v-if="!selectedContent" class="alert error">
            <span>{{ $t('seo.selectWarning') }}</span>
          </div>
          <div v-else class="filter-content">
            <p>{{ $t('seo.filterInfo', { type: $t('seo.' + selectedContent) }) }}</p>
            <!-- Filtreleme Formu Buraya Gelecek -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductOtherTabs from "@/components/ProductOtherTabs.vue";

export default {
  components: { ProductOtherTabs },
  data() {
    return {
      selectedContent: null,
    };
  },
  methods: {
    selectContentType(type) {
      const contentMap = {
        product: "Ürün SEO Bilgileri",
        category: "Kategori SEO Bilgileri",
        brand: "Marka SEO Bilgileri",
        tag: "Etiket SEO Bilgileri",
      };
      this.selectedContent = contentMap[type];
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
}

.seo-section {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.seo-box {
  flex: 1 1 100%;
  padding: 20px;
  background: white;
  color: #333;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background 0.3s, color 0.3s;
}

@media (min-width: 768px) {
  .seo-box {
    flex: 1 1 48%;
  }
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #d63384;
}

.right-box .title {
  color: #007bff;
}

.info-box {
  display: flex;
  align-items: center;
  background: #eef5ff;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
  color: #1d3557;
}

.icon {
  margin-right: 10px;
}

.seo-option {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: white;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s, color 0.2s;
}

.seo-option:hover {
  background: #f8f9fa;
}

.alert.error {
  background: #f8d7da;
  color: #721c24;
  padding: 10px;
  border-radius: 5px;
}

/* 🌙 DARK MODE - sadece .dark class aktifse */
.dark .seo-box {
  background: #1e293b;
  color: #f1f5f9;
}

.dark .title {
  color: #f472b6;
}

.dark .right-box .title {
  color: #60a5fa;
}

.dark .info-box {
  background: #334155;
  color: #cbd5e1;
}

.dark .seo-option {
  background: #0f172a;
  color: #e2e8f0;
  border-color: #475569;
}

.dark .seo-option:hover {
  background: #1e293b;
}

.dark .alert.error {
  background: #7f1d1d;
  color: #fca5a5;
}
</style>
