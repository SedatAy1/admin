<template>
  <div>
    <ReportsTabs />

  <div class="report-form">
    <h3 class="title">
      <i class="fas fa-chart-bar"></i> Sipariş Raporları
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

      <div class="form-group">
        <label>Sipariş Durumu</label>
        <select multiple>
          <option>Yeni Sipariş</option>
          <option>Hazırlanan Sipariş</option>
          <option>Kargolanan Sipariş</option>
          <option>Teslim Edildi</option>
        </select>
      </div>

      <div class="form-group">
        <label>Platform</label>
        <select>
          <option>Hiçbiri seçilmedi</option>
        </select>
      </div>

      <div class="form-group">
        <label>Mağaza</label>
        <select>
          <option>Hiçbiri seçilmedi</option>
        </select>
      </div>

      <div class="form-group">
        <label>Satış Terminali</label>
        <select>
          <option>Seçilmedi</option>
        </select>
      </div>

      <div class="form-group">
        <label>Sipariş Tarihi</label>
        <input type="date" />
        <input type="date" />
      </div>

      <div class="form-group">
        <label>Sipariş Saati</label>
        <input type="time" value="00:00" />
        <input type="time" value="23:59" />
      </div>

      <div class="form-group">
        <label>Kargolanma Tarihi</label>
        <input type="date" />
        <input type="date" />
      </div>

      <div class="form-group">
        <label>Fatura Tarihi</label>
        <input type="date" />
        <input type="date" />
      </div>

      <div class="form-group">
        <label>E-Fatura Tarihi</label>
        <input type="date" />
        <input type="date" />
      </div>

      <div class="form-group">
        <label>Ülke</label>
        <select>
          <option>Hiçbiri seçilmedi</option>
        </select>
      </div>

      <div class="form-group">
        <label>Üyelik No</label>
        <input type="text" />
      </div>

      <div class="form-group">
        <label>Sipariş Tutarı</label>
        <input type="number" value="0.00" />
      </div>

      <div class="form-group">
        <label>Ödeme Yöntemi</label>
        <select>
          <option>Seçilmedi</option>
        </select>
      </div>

      <div class="form-group">
        <label>Hediye Çeki Kodu</label>
        <input type="text" />
      </div>

      <div class="form-group">
        <label>Hediye Çeki Referansı</label>
        <input type="text" />
      </div>

      <div class="form-group">
        <label>Promosyon</label>
        <select>
          <option>Seçilmedi</option>
        </select>
      </div>

      <div class="form-group">
        <label>Kargo Firması</label>
        <select>
          <option>Seçilmedi</option>
        </select>
      </div>

      <div class="form-group">
        <label>Gelişmiş Arama</label>
        <select>
          <option>Hiçbiri seçilmedi</option>
        </select>
      </div>
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

const selectedReport = ref('City')
const reportOptions = [
  { value: 'Daily', label: 'Günlük Sipariş Raporu' },
  { value: 'Weekly', label: 'Haftalık Sipariş Raporu' },
  { value: 'Monthly', label: 'Aylık Sipariş Raporu' },
  { value: 'Yearly', label: 'Yıllık Sipariş Raporu' },
  { value: 'BrandSales', label: 'Marka Satış Raporu' },
  { value: 'Payment', label: 'Ödeme Yöntemi Raporu' },
  { value: 'FastDelivery', label: 'Hızlı Teslimat Listesi' },
  { value: 'Platform', label: 'Platform Bazlı Rapor' },
  { value: 'Store', label: 'Mağaza Bazlı Rapor' },
  { value: 'ProductSales', label: 'Ürün Bazlı Satış Raporu' },
  { value: 'VariantSales', label: 'Varyant Bazlı Satış Raporu' },
  { value: 'CategorySales', label: 'Kategori Satış Raporu' },
  { value: 'Source', label: 'Ürün Kaynağı Raporu' },
  { value: 'City', label: 'Şehir Bazlı Rapor' },
  { value: 'Country', label: 'Ülke Bazlı Rapor' },
  { value: 'Accounting', label: 'Muhasebe Raporu' },
  { value: 'List', label: 'Sipariş Listesi' }
]

const handleReportChange = () => {
  if (selectedReport.value) {
    router.push(`/reports/orders/${selectedReport.value}`)
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
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #3b82f6;
}

.form-group select[multiple] {
  height: 100px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 28px;
}

.clear,
.generate {
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
}

.clear {
  background-color: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
}

.generate {
  background-color: #3b82f6;
  color: white;
  border: 1px solid #3b82f6;
}
</style>