<template>
  <div>
    <ReportsTabs />

    <div class="report-form">
      <h3 class="title">
        <i class="fas fa-chart-bar"></i> {{ $t('orderReports.title') }}
      </h3>
      <div class="form-grid">
        <div class="form-group">
          <label>{{ $t('orderReports.fields.reportType') }}</label>
          <select v-model="selectedReport" @change="handleReportChange">
            <option v-for="report in reportOptions" :key="report" :value="report">
              {{ $t(`orderReports.reportTypes.${report}`) }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>{{ $t('orderReports.fields.orderStatus') }}</label>
          <select multiple>
            <option>{{ $t('orderReports.status.new') }}</option>
            <option>{{ $t('orderReports.status.preparing') }}</option>
            <option>{{ $t('orderReports.status.shipping') }}</option>
            <option>{{ $t('orderReports.status.delivered') }}</option>
          </select>
        </div>

        <div class="form-group">
          <label>{{ $t('orderReports.fields.platform') }}</label>
          <select>
            <option>{{ $t('common.noneSelected') }}</option>
          </select>
        </div>

        <div class="form-group">
          <label>{{ $t('orderReports.fields.store') }}</label>
          <select>
            <option>{{ $t('common.noneSelected') }}</option>
          </select>
        </div>

        <div class="form-group">
          <label>{{ $t('orderReports.fields.terminal') }}</label>
          <select>
            <option>{{ $t('common.notSelected') }}</option>
          </select>
        </div>

        <div class="form-group">
          <label>{{ $t('orderReports.fields.orderDate') }}</label>
          <input type="date" />
          <input type="date" />
        </div>

        <div class="form-group">
          <label>{{ $t('orderReports.fields.orderTime') }}</label>
          <input type="time" value="00:00" />
          <input type="time" value="23:59" />
        </div>

        <div class="form-group">
          <label>{{ $t('orderReports.fields.shippingDate') }}</label>
          <input type="date" />
          <input type="date" />
        </div>

        <div class="form-group">
          <label>{{ $t('orderReports.fields.invoiceDate') }}</label>
          <input type="date" />
          <input type="date" />
        </div>

        <div class="form-group">
          <label>{{ $t('orderReports.fields.eInvoiceDate') }}</label>
          <input type="date" />
          <input type="date" />
        </div>

        <div class="form-group">
          <label>{{ $t('orderReports.fields.country') }}</label>
          <select>
            <option>{{ $t('common.noneSelected') }}</option>
          </select>
        </div>

        <div class="form-group">
          <label>{{ $t('orderReports.fields.memberNo') }}</label>
          <input type="text" />
        </div>

        <div class="form-group">
          <label>{{ $t('orderReports.fields.orderAmount') }}</label>
          <input type="number" value="0.00" />
        </div>

        <div class="form-group">
          <label>{{ $t('orderReports.fields.payment') }}</label>
          <select>
            <option>{{ $t('common.notSelected') }}</option>
          </select>
        </div>

        <div class="form-group">
          <label>{{ $t('orderReports.fields.giftCode') }}</label>
          <input type="text" />
        </div>

        <div class="form-group">
          <label>{{ $t('orderReports.fields.giftRef') }}</label>
          <input type="text" />
        </div>

        <div class="form-group">
          <label>{{ $t('orderReports.fields.promotion') }}</label>
          <select>
            <option>{{ $t('common.notSelected') }}</option>
          </select>
        </div>

        <div class="form-group">
          <label>{{ $t('orderReports.fields.cargo') }}</label>
          <select>
            <option>{{ $t('common.notSelected') }}</option>
          </select>
        </div>

        <div class="form-group">
          <label>{{ $t('orderReports.fields.advanced') }}</label>
          <select>
            <option>{{ $t('common.noneSelected') }}</option>
          </select>
        </div>
      </div>

      <div class="form-actions">
        <button class="clear">{{ $t('common.clear') }}</button>
        <button class="generate">{{ $t('common.generate') }}</button>
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
  'Daily', 'Weekly', 'Monthly', 'Yearly', 'BrandSales',
  'Payment', 'FastDelivery', 'Platform', 'Store',
  'ProductSales', 'VariantSales', 'CategorySales', 'Source',
  'City', 'Country', 'Accounting', 'List'
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
  color: #1f2937;
}
html.dark .title {
  color: #f1f1f1;
}

/* Form Kutusu */
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

/* Grid */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px 24px;
  margin-top: 16px;
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

/* Input + Select */
.form-group input,
.form-group select {
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 13px;
  background-color: white;
  transition: border-color 0.2s ease, background-color 0.3s ease;
}
html.dark .form-group input,
html.dark .form-group select {
  background-color: #2c2c2c;
  border-color: #555;
  color: #f1f1f1;
}
html.dark .form-group input::placeholder,
html.dark .form-group select::placeholder {
  color: #aaa;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #3b82f6;
}

/* Multi Select */
.form-group select[multiple] {
  height: 100px;
}

/* Buton Alanı */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 28px;
  flex-wrap: wrap;
}

/* Temizle */
.clear,
.generate {
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.clear {
  background-color: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
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

/* Oluştur */
.generate {
  background-color: #3b82f6;
  color: white;
  border: 1px solid #3b82f6;
}
.generate:hover {
  background-color: #2563eb;
}

/* Responsive */
@media (max-width: 600px) {
  .report-form {
    padding: 16px 18px;
  }

  .form-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .clear,
  .generate {
    width: 100%;
  }
}
</style>