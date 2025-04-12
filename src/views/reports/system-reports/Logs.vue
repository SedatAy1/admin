<template>
  <ReportsTabs />

  <div class="report-form">
    <h3 class="title">
      <i class="fas fa-server"></i> {{ $t('systemReports.title') }}
    </h3>
    <div class="form-grid">
      <div class="form-group">
        <label>{{ $t('systemReports.reportType') }}</label>
        <select v-model="selectedReport" @change="handleReportChange">
          <option value="Logs">{{ $t('systemReports.logs') }}</option>
        </select>
      </div>

      <div class="form-group">
        <label>{{ $t('systemReports.dateRange') }}</label>
        <div class="date-range">
          <input type="date" />
          <span>{{ $t('systemReports.to') }}</span>
          <input type="date" />
        </div>
      </div>

      <div class="form-group">
        <label>{{ $t('systemReports.adminId') }}</label>
        <input type="text" />
      </div>
    </div>

    <div class="form-actions">
      <button class="clear">{{ $t('systemReports.clear') }}</button>
      <button class="generate">{{ $t('systemReports.generate') }}</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ReportsTabs from '@/views/reports/ReportsTabs.vue'

const router = useRouter()
const selectedReport = ref('Logs')

const handleReportChange = () => {
  if (selectedReport.value) {
    router.push(`/reports/system/${selectedReport.value}`)
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
  color: #1f2937;
}
html.dark .title {
  color: #f1f1f1;
}

/* Form Genel */
.report-form {
  background: #fff;
  border-radius: 12px;
  padding: 24px 28px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  font-family: 'Segoe UI', sans-serif;
  font-size: 14px;
  color: #1f2937;
  margin-bottom: 24px;
  transition: background-color 0.3s ease, color 0.3s ease;
}
html.dark .report-form {
  background: #232323;
  color: #f1f1f1;
}

/* Grid Yapı */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px 24px;
  margin-top: 16px;
}

/* Tarih aralığı */
.date-range {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

/* Grup */
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
html.dark .form-group label {
  color: #d1d5db;
}

.form-group input,
.form-group select {
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 13px;
  background-color: white;
  color: #1f2937;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}
html.dark .form-group input,
html.dark .form-group select {
  background-color: #2c2c2c;
  border-color: #444;
  color: #f1f1f1;
}
html.dark .form-group input::placeholder,
html.dark .form-group select::placeholder {
  color: #aaa;
}

/* Butonlar */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 28px;
  flex-wrap: wrap;
}

.clear {
  background-color: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}
.clear:hover {
  background-color: #e5e7eb;
}
html.dark .clear {
  background-color: #2c2c2c;
  color: #f1f1f1;
  border-color: #555;
}
html.dark .clear:hover {
  background-color: #3a3a3a;
}

.generate {
  background-color: #3b82f6;
  color: white;
  border: 1px solid #3b82f6;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.generate:hover {
  background-color: #2563eb;
}

/* Responsive */
@media (max-width: 600px) {
  .report-form {
    padding: 18px 16px;
  }

  .form-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .clear,
  .generate {
    width: 100%;
  }

  .date-range {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>