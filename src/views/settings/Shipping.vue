<template>
  <div class="shipping-settings">
    <h2 class="title">{{ $t('shippingSettings.title') }}</h2>

    <div class="tabs">
      <button :class="{ active: activeTab === 'fixed' }" @click="activeTab = 'fixed'">
        {{ $t('shippingSettings.fixed') }}
      </button>
      <button :class="{ active: activeTab === 'category' }" @click="activeTab = 'category'">
        {{ $t('shippingSettings.category') }}
      </button>
      <button :class="{ active: activeTab === 'desi' }" @click="activeTab = 'desi'">
        {{ $t('shippingSettings.desi') }}
      </button>
    </div>

    <div class="info-box">
      <ul>
        <li>{{ $t('shippingSettings.rule1') }}</li>
        <li>{{ $t('shippingSettings.rule2') }}</li>
        <li>{{ $t('shippingSettings.rule3') }}</li>
        <li>{{ $t('shippingSettings.rule4') }}</li>
      </ul>
    </div>

    <div v-if="activeTab === 'fixed'">
      <div class="grid">
        <div>
          <label>{{ $t('shippingSettings.fixedPrice') }}</label>
          <input type="number" v-model="fixed.price" />
        </div>
        <div>
          <label>{{ $t('shippingSettings.fixedType') }}</label>
          <select v-model="fixed.type">
            <option>{{ $t('shippingSettings.option1') }}</option>
            <option>{{ $t('shippingSettings.option2') }}</option>
          </select>
        </div>
      </div>
      <div>
        <label>{{ $t('shippingSettings.freeLimit') }}</label>
        <input type="number" v-model="fixed.freeLimit" />
      </div>
      <button class="primary-btn">{{ $t('common.save') }}</button>
    </div>

    <div v-if="activeTab === 'category'">
      <div class="search-bar">
        <input type="text" :placeholder="$t('common.search')" />
        <button class="primary-btn" @click="showCategoryModal = true">
          + {{ $t('shippingSettings.addCategoryFee') }}
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t('common.no') }}</th>
            <th>{{ $t('common.title') }}</th>
            <th>{{ $t('shippingSettings.fee') }}</th>
            <th>{{ $t('common.site') }}</th>
            <th>{{ $t('common.marketplace') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="7" class="empty">{{ $t('common.noData') }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="activeTab === 'desi'">
      <div class="search-bar">
        <input type="text" :placeholder="$t('common.search')" />
        <button class="primary-btn" @click="showDesiModal = true">
          + {{ $t('shippingSettings.addDesiFee') }}
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t('shippingSettings.desiNo') }}</th>
            <th>{{ $t('shippingSettings.desiType') }}</th>
            <th>{{ $t('shippingSettings.desiStart') }}</th>
            <th>{{ $t('shippingSettings.desiEnd') }}</th>
            <th>{{ $t('shippingSettings.fee') }}</th>
            <th>{{ $t('common.marketplace') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="8" class="empty">{{ $t('common.noData') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('fixed')
const showCategoryModal = ref(false)
const showDesiModal = ref(false)

const fixed = ref({
  price: 9.99,
  type: 'Alıcı Ödemeli Ürünlere Ekle',
  freeLimit: 250
})
</script>

<style scoped>
.shipping-settings {
  font-family: 'Inter', sans-serif;
  padding: 24px;
  background: white;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}
html.dark .shipping-settings {
  background: #1e1e1e;
  border-color: #3a3a3a;
  color: #f1f1f1;
}

.title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #1e293b;
}
html.dark .title {
  color: #ffffff;
}

.tabs button {
  padding: 12px 20px;
  background: #f1f5f9;
  border: none;
  font-weight: 500;
  margin-right: 8px;
  cursor: pointer;
  color: #1f2937;
}
.tabs button.active {
  background: #475569;
  color: white;
}
html.dark .tabs button {
  background: #374151;
  color: #e2e8f0;
}
html.dark .tabs button.active {
  background: #3b82f6;
  color: white;
}

.info-box {
  background: #f9fafb;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 14px;
  color: #334155;
}
html.dark .info-box {
  background: #2c2c2c;
  color: #f1f1f1;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

input, select {
  padding: 10px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background-color: #fff;
  color: #1f2937;
  transition: background-color 0.3s ease;
}
html.dark input,
html.dark select {
  background-color: #2a2a2a;
  border-color: #4b5563;
  color: #f1f1f1;
}

.primary-btn {
  margin-top: 20px;
  padding: 10px 16px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}
.primary-btn:hover {
  background-color: #2563eb;
}

.search-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  font-size: 14px;
}
html.dark table {
  background: #2c2c2c;
  color: #f1f1f1;
}
th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}
html.dark th,
html.dark td {
  border-color: #444;
}

.empty {
  text-align: center;
  color: #9ca3af;
  padding: 20px;
}
html.dark .empty {
  color: #d1d5db;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
html.dark .modal-content {
  background: #2a2a2a;
  color: #f1f1f1;
}

.marketplaces {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.close-btn {
  padding: 8px;
  background: #e5e7eb;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
html.dark .close-btn {
  background: #374151;
  color: #f1f1f1;
}
</style>