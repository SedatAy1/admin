<template>
  <div>
    <!-- ÜST MENÜ -->
    <ReportsTabs />

    <!-- FORM -->
    <div class="report-form">
      <h3 class="title">
        <i class="fas fa-chart-bar"></i> Ürün Raporları
      </h3>

      <div class="form-grid">
        <div class="form-group">
          <label>Rapor Tipi</label>
          <select v-model="selectedReport" @change="handleReportChange">
            <option v-for="report in reportOptions" :key="report.value" :value="report.value">
              {{ report.label }}
            </option>
          </select>
        </div>

        <div class="form-group"><label>Ürün Kaynağı</label><select><option>Kaynak Seçilmedi</option></select></div>
        <div class="form-group"><label>Kategori</label><select><option>Kategori Seçilmedi</option></select></div>
        <div class="form-group"><label>Marka</label><select><option>Marka Seçilmedi</option></select></div>
        <div class="form-group"><label>Ürün Etiketleri</label><select><option>Seçilmedi</option></select></div>
        <div class="form-group"><label>Ürün No</label><input type="text" /></div>
        <div class="form-group"><label>Ürün Kodu</label><input type="text" /></div>
        <div class="form-group"><label>Barkod</label><input type="text" /></div>
        <div class="form-group"><label>Gelişmiş Filtreleme</label><select><option>Seçilmedi</option></select></div>
      </div>

      <div class="form-actions">
        <button class="clear">Temizle</button>
        <button class="generate">Oluştur</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ReportsTabs from '@/views/reports/ReportsTabs.vue'

const router = useRouter()
const selectedReport = ref('VariantSales')

const reportOptions = [
  { value: 'Stock', label: 'Stok Raporu' },
  { value: 'VariantStock', label: 'Varyant Stok Raporu' },
  { value: 'StockMovements', label: 'Stok Hareketleri' },
  { value: 'Sales', label: 'Ürün Satış Raporu' },
  { value: 'VariantSales', label: 'Ürün Satış Raporu (Varyantlı)' },
  { value: 'CategorySales', label: 'Kategori Satış Raporu' },
  { value: 'BrandSales', label: 'Marka Satış Raporu' },
  { value: 'TagSales', label: 'Etiket Satış Raporu' },
  { value: 'SourceSales', label: 'Kaynak Satış Raporu' },
  { value: 'TopRated', label: 'En Çok Puanlanan Ürünler' },
  { value: 'Favorites', label: 'Favori Ürünler Raporu' },
  { value: 'Summary', label: 'Ürün Özet Raporu' },
  { value: 'Recommended', label: 'Tavsiye Edilen Ürünler' },
  { value: 'PriceAlerts', label: 'Fiyat Alarmı Kurulan Ürünler' },
  { value: 'StockAlerts', label: 'Stok Alarmı Kurulan Ürünler' }
]

const handleReportChange = () => {
  if (selectedReport.value) {
    router.push(`/reports/products/${selectedReport.value}`)
  }
}
</script>

<style scoped>
.title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.report-form {
  background: #fff;
  border-radius: 12px;
  padding: 24px 28px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  font-family: 'Segoe UI', sans-serif;
  font-size: 14px;
  color: #1f2937;
  margin-bottom: 24px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px 24px;
  margin-top: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 500;
  margin-bottom: 6px;
  font-size: 13px;
  color: #374151;
}

.form-group input,
.form-group select {
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 13px;
  background-color: white;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 28px;
}

.clear {
  background-color: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
  padding: 10px 20px;
  border-radius: 6px;
}

.generate {
  background-color: #3b82f6;
  color: white;
  border: 1px solid #3b82f6;
  padding: 10px 20px;
  border-radius: 6px;
}
</style>
