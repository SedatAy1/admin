<template>
  <MarketLayout>
    <div class="excel-container">
      <div class="sidebar">
        <h3>{{ $t("excel.title") }}</h3>
        <ul>
          <li v-for="item in menuItems" :key="item">{{ $t(`excel.menu.${item}`) }}</li>
        </ul>
      </div>

      <div class="content">
        <div class="excel-header">
          <p>{{ $t("excel.description") }}</p>
        </div>

        <div class="excel-sections">
          <!-- Excel Dışarı Aktar Bölümü -->
          <div class="excel-card">
            <h4><i class="fas fa-file-export"></i> {{ $t("excel.exportTitle") }}</h4>
            <div class="form-group">
              <label>{{ $t("excel.category") }}</label>
              <button class="button-link">{{ $t("common.change") }}</button>
            </div>
            <div class="form-group">
              <label>{{ $t("excel.brand") }}</label>
              <button class="button-link">{{ $t("common.change") }}</button>
            </div>
            <div class="switch-group">
              <label>{{ $t("excel.brandInfo") }}</label>
              <input type="checkbox" v-model="exportOptions.brandInfo" />
            </div>
            <div class="switch-group">
              <label>{{ $t("excel.productDescription") }}</label>
              <input type="checkbox" v-model="exportOptions.productDescription" />
            </div>
            <button class="button-primary">{{ $t("common.download") }}</button>
          </div>

          <!-- Excel İçe Aktar Bölümü -->
          <div class="excel-card">
            <h4><i class="fas fa-file-import"></i> {{ $t("excel.importTitle") }}</h4>
            <p class="info-text">{{ $t("excel.importInfo") }}</p>
            <input type="file" class="file-input" />
            <select class="dropdown">
              <option>{{ $t("excel.identifiers.id") }}</option>
              <option>{{ $t("excel.identifiers.code") }}</option>
              <option>{{ $t("excel.identifiers.barcode") }}</option>
            </select>
            <select class="dropdown">
              <option>{{ $t("excel.separators.dot") }}</option>
              <option>{{ $t("excel.separators.comma") }}</option>
            </select>
            <button class="button-primary">{{ $t("common.upload") }}</button>
          </div>
        </div>
      </div>
    </div>
  </MarketLayout>
</template>

<script>
import MarketLayout from '@/views/integrations/MarketLayout.vue';

export default {
  components: {
    MarketLayout,
  },
  data() {
    return {
      menuItems: [
        "productInfo", "productVariants", "productCategories", "productImages",
        "productStock", "productAttributes", "productCompatibility", "productBrandCodes"
      ],
      exportOptions: {
        brandInfo: false,
        productDescription: false
      }
    };
  }
};
</script>
<style scoped>
/* Layout */
.excel-container {
  display: flex;
  gap: 20px;
  padding: 30px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(to right, #f5f7fa, #c3cfe2);
  min-height: 100vh;
  transition: all 0.3s ease-in-out;
}

html.dark .excel-container {
  background: linear-gradient(to right, #1e1e1e, #2e2e2e);
}

/* Responsive layout */
@media (max-width: 768px) {
  .excel-container {
    flex-direction: column;
    padding: 20px;
  }
}

/* Sidebar */
.sidebar {
  width: 260px;
  background: #1f2937;
  padding: 20px;
  border-radius: 12px;
  color: #f9fafb;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease-in-out;
}

.sidebar h3 {
  margin-bottom: 16px;
  font-size: 20px;
  color: #ffffff;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  padding: 10px 0;
  cursor: pointer;
  color: #d1d5db;
  transition: color 0.3s;
}

.sidebar li:hover {
  color: #ffffff;
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
  }
}

/* Content */
.content {
  flex: 1;
  animation: fadeIn 0.5s ease-in-out;
  transition: all 0.3s ease;
}

.excel-header {
  background: #eef2ff;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.excel-header p {
  margin: 0;
  color: #374151;
  font-size: 15px;
}

html.dark .excel-header {
  background: #2a2d34;
}
html.dark .excel-header p {
  color: #e5e7eb;
}

.excel-sections {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .excel-sections {
    flex-direction: column;
  }
}

.excel-card {
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  flex: 1 1 45%;
  animation: slideUp 0.4s ease-out;
  transition: background 0.3s ease;
}

html.dark .excel-card {
  background: #2e2e38;
  color: #f1f1f1;
}

.excel-card h4 {
  margin-bottom: 16px;
  font-size: 18px;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 8px;
}

html.dark .excel-card h4 {
  color: #ffffff;
}

/* Form Elements */
.form-group,
.switch-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

/* Buttons */
.button-primary {
  background: #3b82f6;
  color: white;
  padding: 12px 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
  width: 100%;
  margin-top: 10px;
}

.button-primary:hover {
  background-color: #2563eb;
}

.button-link {
  background: none;
  color: #3b82f6;
  border: none;
  cursor: pointer;
  font-weight: 500;
  text-decoration: underline;
}

.file-input,
.dropdown {
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  transition: box-shadow 0.3s;
}

.file-input:focus,
.dropdown:focus {
  outline: none;
  box-shadow: 0 0 5px #3b82f6;
}

html.dark .file-input,
html.dark .dropdown {
  background-color: #444;
  color: #f1f1f1;
  border-color: #666;
}
html.dark .file-input::placeholder,
html.dark .dropdown::placeholder {
  color: #ccc;
}

/* Info text */
.info-text {
  color: #6b7280;
  margin-bottom: 10px;
  font-size: 14px;
}
html.dark .info-text {
  color: #9ca3af;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>
