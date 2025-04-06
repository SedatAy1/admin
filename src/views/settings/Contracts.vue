<template>
  <div class="contracts-wrapper">
    <div class="info-box">
      <i class="bi bi-info-circle-fill"></i>
      <p>
        Aşağıdaki butonlara tıklayarak sözleşmeleri düzenleyebilirsiniz. <br />
        Sözleşmeler üye kayıt ve sipariş adımlarında kullanılmaktadır.
      </p>
    </div>

    <div class="contract-grid">
      <div v-for="contract in contracts" :key="contract.key" class="contract-card" @click="editContract(contract)">
        <i :class="contract.icon"></i>
        <h5>{{ contract.title }}</h5>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const contracts = ref([
  { key: 'membership', title: 'Üyelik Kuralları', icon: 'bi bi-person-shield-fill' },
  { key: 'kvkk', title: 'KVKK Politikası', icon: 'bi bi-person-fill-lock' },
  { key: 'orderPre', title: 'Sipariş Ön Bilgilendirme Kuralları', icon: 'bi bi-file-earmark-text-fill' },
  { key: 'distance', title: 'Sipariş Mesafeli Satış Sözleşmesi', icon: 'bi bi-handshake-fill' },
  { key: 'email', title: 'Ticari Elektronik İleti İzni Aydınlatma Metni', icon: 'bi bi-envelope-fill' },
  { key: 'dealer', title: 'Bayiilik Sözleşmesi', icon: 'bi bi-people-fill' }
])

const editContract = (contract) => {
  alert(`Düzenle: ${contract.title}`)
  // Modal veya başka işlem burada açılacak
}
</script>

<style scoped>
.contracts-wrapper {
  padding: 24px;
}

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

.info-box i {
  font-size: 24px;
  color: #0ea5e9;
}

.contract-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
}

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

.contract-card i {
  font-size: 36px;
  color: #1d4ed8;
  margin-bottom: 12px;
}

.contract-card h5 {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}
</style>
