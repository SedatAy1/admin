<template>
  <div class="contracts-wrapper">
    <div class="info-box">
      <i class="bi bi-info-circle-fill"></i>
      <p>
        {{ $t('contracts.description1') }}<br />
        {{ $t('contracts.description2') }}
      </p>
    </div>

    <div class="contract-grid">
      <div
        v-for="contract in contracts"
        :key="contract.key"
        class="contract-card"
        @click="editContract(contract)"
      >
        <i :class="contract.icon"></i>
        <h5>{{ $t(`contracts.types.${contract.key}`) }}</h5>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const contracts = ref([
  { key: 'membership', icon: 'bi bi-person-shield-fill' },
  { key: 'kvkk', icon: 'bi bi-person-fill-lock' },
  { key: 'orderPre', icon: 'bi bi-file-earmark-text-fill' },
  { key: 'distance', icon: 'bi bi-handshake-fill' },
  { key: 'email', icon: 'bi bi-envelope-fill' },
  { key: 'dealer', icon: 'bi bi-people-fill' }
])

const editContract = (contract) => {
  alert(`Düzenle: ${contract.key}`)
}
</script>

<style scoped>
.contracts-wrapper {
  padding: 24px;
  transition: background-color 0.3s ease;
  background-color: #ffffff;
}
html.dark .contracts-wrapper {
  background-color: #1e1e1e;
}

/* Bilgilendirme Kutusu */
.info-box {
  background-color: #f1f5f9;
  padding: 16px;
  border-radius: 12px;
  border-left: 4px solid #0ea5e9;
  display: flex;
  gap: 12px;
  align-items: center;
  font-size: 15px;
  margin-bottom: 24px;
  color: #334155;
}
html.dark .info-box {
  background-color: #2a2a2a;
  color: #e2e8f0;
  border-left-color: #38bdf8;
}
html.dark .info-box i {
  color: #38bdf8;
}

.info-box i {
  font-size: 24px;
  color: #0ea5e9;
}

/* Grid */
.contract-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
}
@media (max-width: 640px) {
  .contract-grid {
    grid-template-columns: 1fr;
  }
}

/* Kartlar */
.contract-card {
  background-color: white;
  border-radius: 16px;
  padding: 32px 16px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  cursor: pointer;
  transition: 0.2s ease;
  border: 1px solid #e2e8f0;
}
.contract-card:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}
html.dark .contract-card {
  background-color: #2c2c2c;
  border-color: #444;
  color: #f1f1f1;
}

/* Kart ikonları */
.contract-card i {
  font-size: 36px;
  color: #1d4ed8;
  margin-bottom: 12px;
}
html.dark .contract-card i {
  color: #60a5fa;
}

/* Kart başlık */
.contract-card h5 {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}
html.dark .contract-card h5 {
  color: #f1f1f1;
}
</style>
