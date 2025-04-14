<template>
  <div class="dealer-xml-settings">
    <h2 class="title">{{ $t('dealerXml.title') }}</h2>

    <div class="form-grid">
      <div class="form-item">
        <label>
          <strong>{{ $t('dealerXml.hasSubscription.title') }}</strong>
          <p>{{ $t('dealerXml.hasSubscription.desc') }}</p>
        </label>
        <ToggleSwitch v-model="form.hasSubscription" />
      </div>

      <div class="form-item">
        <label>
          <strong>{{ $t('dealerXml.hasPayments.title') }}</strong>
          <p>{{ $t('dealerXml.hasPayments.desc') }}</p>
        </label>
        <ToggleSwitch v-model="form.hasPayments" />
      </div>

      <div class="form-item three-col">
        <BaseInput :label="$t('dealerXml.price1')" v-model="form.price1" />
        <BaseInput :label="$t('dealerXml.price3')" v-model="form.price3" />
        <BaseInput :label="$t('dealerXml.price6')" v-model="form.price6" />
        <BaseInput :label="$t('dealerXml.price12')" v-model="form.price12" />
      </div>

      <div class="form-item">
        <label>
          <strong>{{ $t('dealerXml.requireIP.title') }}</strong>
          <p>{{ $t('dealerXml.requireIP.desc') }}</p>
        </label>
        <ToggleSwitch v-model="form.requireIP" />
      </div>

      <div class="form-item">
        <label>
          <strong>{{ $t('dealerXml.autoActivate.title') }}</strong>
          <p>{{ $t('dealerXml.autoActivate.desc') }}</p>
        </label>
        <ToggleSwitch v-model="form.autoActivateForNewDealers" />
      </div>

      <BaseInput :label="$t('dealerXml.productLimit')" v-model="form.productLimit" />
      <BaseInput :label="$t('dealerXml.minStock')" v-model="form.minStock" />

      <div class="form-item">
        <label>{{ $t('dealerXml.brandRestriction') }}</label>
        <select v-model="form.brandRestriction">
          <option>{{ $t('common.notSelected') }}</option>
          <option>Marka 1</option>
          <option>Marka 2</option>
        </select>
      </div>

      <div class="form-item">
        <label>{{ $t('dealerXml.categoryRestriction') }}</label>
        <select v-model="form.categoryRestriction">
          <option>{{ $t('common.notSelected') }}</option>
          <option>Kategori 1</option>
          <option>Kategori 2</option>
        </select>
      </div>

      <div class="form-item full">
        <label>
          <strong>{{ $t('dealerXml.allowedIPs.title') }}</strong>
          <p>{{ $t('dealerXml.allowedIPs.desc') }}</p>
        </label>
        <textarea v-model="form.allowedIPs" rows="5"></textarea>
      </div>
    </div>

    <button class="save-button">✓ {{ $t('common.save') }}</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  hasSubscription: false,
  hasPayments: false,
  price1: 0,
  price3: 0,
  price6: 0,
  price12: 0,
  requireIP: false,
  autoActivateForNewDealers: true,
  productLimit: 30000,
  minStock: 0,
  brandRestriction: 'Marka Seçilmedi',
  categoryRestriction: 'Kategori Seçilmedi',
  allowedIPs: ''
})
</script>

<style scoped>
.dealer-xml-settings {
  font-family: Inter, sans-serif;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  transition: background 0.3s, color 0.3s;
}
html.dark .dealer-xml-settings {
  background: #1e293b;
  border-color: #334155;
  color: #f1f5f9;
}

.title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #1f2937;
}
html.dark .title {
  color: #f9fafb;
}

.form-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.form-item {
  flex: 1 1 45%;
  display: flex;
  flex-direction: column;
}

.form-item.full {
  flex: 1 1 100%;
}

.form-item.three-col {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  flex: 1 1 100%;
}

textarea,
select,
input {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
  background: #fff;
  color: #1f2937;
  transition: background 0.3s, border 0.3s;
}
html.dark textarea,
html.dark select,
html.dark input {
  background: #334155;
  color: #f1f5f9;
  border-color: #475569;
}

.save-button {
  margin-top: 20px;
  padding: 10px 18px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
}
.save-button:hover {
  background-color: #2563eb;
}

/* Responsive */
@media (max-width: 768px) {
  .form-item {
    flex: 1 1 100%;
  }
}
</style>