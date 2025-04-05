<template>
  <MarketLayout>
    <div class="excel-container">
      <div class="sidebar">
        <h3>Excel İşlemleri</h3>
        <ul>
          <li v-for="item in menuItems" :key="item">{{ item }}</li>
        </ul>
      </div>

      <div class="content">
        <div class="excel-header">
          <p>Hızlı Excel işlemleri ile ürünlerinizi dışarı aktarabilir ve içeri yükleyebilirsiniz.</p>
        </div>

        <div class="excel-sections">
          <!-- Excel Dışarı Aktar Bölümü -->
          <div class="excel-card">
            <h4><i class="fas fa-file-export"></i> Excel Dışarı Aktar</h4>
            <div class="form-group">
              <label>Kategori</label>
              <button class="button-link">Değiştir</button>
            </div>
            <div class="form-group">
              <label>Marka</label>
              <button class="button-link">Değiştir</button>
            </div>
            <div class="switch-group">
              <label>Marka Bilgisi</label>
              <input type="checkbox" v-model="exportOptions.brandInfo" />
            </div>
            <div class="switch-group">
              <label>Ürün Açıklaması</label>
              <input type="checkbox" v-model="exportOptions.productDescription" />
            </div>
            <button class="button-primary">İndir</button>
          </div>

          <!-- Excel İçe Aktar Bölümü -->
          <div class="excel-card">
            <h4><i class="fas fa-file-import"></i> Excel İçe Aktar</h4>
            <p class="info-text">Sadece desteklenen formatlardaki dosyalar içeri aktarılır.</p>
            <input type="file" class="file-input" />
            <select class="dropdown">
              <option>Ürün ID (ID)</option>
              <option>Ürün Kodu</option>
              <option>Barkod No</option>
            </select>
            <select class="dropdown">
              <option>Nokta (.)</option>
              <option>Virgül (,)</option>
            </select>
            <button class="button-primary">Yükle</button>
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
        "Ürün Bilgileri", "Ürün Varyantları", "Ürün Kategorileri", "Ürün Resimleri (URL ile)",
        "Ürün Stokları", "Ürün Nitelikleri", "Ürün Uyumluluk Listesi", "Ürün Marka Özel Kodları"
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
}

/* Sidebar */
.sidebar {
  width: 260px;
  background: #1f2937;
  padding: 20px;
  border-radius: 12px;
  color: #f9fafb;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
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

/* Content */
.content {
  flex: 1;
  animation: fadeIn 0.5s ease-in-out;
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

.excel-sections {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.excel-card {
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  flex: 1 1 45%;
  animation: slideUp 0.4s ease-out;
}

.excel-card h4 {
  margin-bottom: 16px;
  font-size: 18px;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-group,
.switch-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

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

.info-text {
  color: #6b7280;
  margin-bottom: 10px;
  font-size: 14px;
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
