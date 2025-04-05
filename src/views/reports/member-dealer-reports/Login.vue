<template>
  <ReportsTabs />

  <div class="report-form">
    <h3 class="title">
      <i class="fas fa-user"></i> Üye Raporları
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
        <label>Üye No</label>
        <input type="text" />
      </div>

      <div class="form-group">
        <label>Bayi No</label>
        <input type="text" />
      </div>

      <div class="form-group">
        <label>Üyelik Tarihi</label>
        <input type="date" />
        <input type="date" />
      </div>

      <div class="form-group">
        <label>Rapor Gruplama</label>
        <select>
          <option>Gün</option>
          <option>Hafta</option>
          <option>Ay</option>
        </select>
      </div>
    </div>

    <div class="form-actions">
      <button class="clear">Temizle</button>
      <button class="generate">Oluştur</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ReportsTabs from '@/views/reports/ReportsTabs.vue'

const router = useRouter()
const selectedReport = ref('Login')

const reportOptions = [
  { value: 'New', label: 'Yeni Üyelik Raporu' },
  { value: 'Login', label: 'Üye Giriş Raporu' },
  { value: 'Orders', label: 'Üye Sipariş Raporu' },
  { value: 'DealerOrders', label: 'Bayi Sipariş Raporu' },
  { value: 'DealerBalance', label: 'Bayi Bakiye Raporu' },
  { value: 'DealerDeposits', label: 'Bayi Bakiye Yükleme Raporu' },
  { value: 'DealerActivities', label: 'Bayi Hareketleri' },
  { value: 'PriceAlerts', label: 'Fiyat Alarmları' },
  { value: 'StockAlerts', label: 'Stok Alarmları' },
]

const handleReportChange = () => {
  if (selectedReport.value) {
    router.push(`/reports/members/${selectedReport.value}`)
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