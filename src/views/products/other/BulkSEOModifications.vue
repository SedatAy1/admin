<template>
  <div>
    <!-- Ana İçerik -->
    <div class="container">
      <div class="seo-section">
        <!-- Sol Panel: İçerik Tipi Seçimi -->
        <div class="seo-box left-box">
          <h3 class="title">1 - İçerik Tipi Seçimi</h3>
          <div class="info-box">
            <font-awesome-icon icon="info-circle" class="icon" />
            <span>Lütfen güncellemek istediğiniz içerik tipini seçin.</span>
          </div>
          <button class="seo-option" @click="selectContentType('product')">
            <font-awesome-icon icon="list" class="icon" /> Ürün SEO Bilgileri
          </button>
          <button class="seo-option" @click="selectContentType('category')">
            <font-awesome-icon icon="sitemap" class="icon" /> Kategori SEO Bilgileri
          </button>
          <button class="seo-option" @click="selectContentType('brand')">
            <font-awesome-icon icon="asterisk" class="icon" /> Marka SEO Bilgileri
          </button>
          <button class="seo-option" @click="selectContentType('tag')">
            <font-awesome-icon icon="tag" class="icon" /> Etiket SEO Bilgileri
          </button>
        </div>

        <!-- Sağ Panel: Filtreleme -->
        <div class="seo-box right-box">
          <h3 class="title">2 - Filtreleme</h3>
          <div v-if="!selectedContent" class="alert error">
            <span>Lütfen güncellemek istediğiniz içerik tipini seçin.</span>
          </div>
          <div v-else class="filter-content">
            <p>{{ selectedContent }} için filtreleme seçenekleri burada olacak.</p>
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
}
.seo-box {
  flex: 1;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
</style>
