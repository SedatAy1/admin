<template>
  <div class="quick-payment-settings">
    <h2 class="title">Hızlı Ödeme Ayarları</h2>

    <div class="grid grid-cols-2 gap-4">
      <div class="toggle-item" v-for="item in toggles" :key="item.key">
        <label class="label">{{ item.label }}</label>
        <p class="desc">Açıklama yazılacak.</p>
        <input type="checkbox" v-model="item.value" />
      </div>
    </div>

    <div class="form-grid">
      <div>
        <label>Minimum Ödeme Tutarı</label>
        <input type="number" v-model="minAmount" class="input" />
      </div>
      <div>
        <label>Ödeme Yöntemi</label>
        <select v-model="paymentMethod" class="input">
          <option>Kredi Kartı</option>
          <option>Havale / EFT</option>
          <option>Kapıda Ödeme</option>
        </select>
      </div>
    </div>

    <button class="save-button" @click="save">✓ Kaydet</button>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const toggles = reactive([
  { key: 'tckn', label: 'TCKN / VKN Zorunluluğu', value: false },
  { key: 'telefon', label: 'Telefon Zorunluluğu', value: false },
  { key: 'eposta', label: 'E-Posta Zorunluluğu', value: false },
  { key: 'adres', label: 'Adres Zorunluluğu', value: false }
])

const minAmount = ref(0)
const paymentMethod = ref('Kredi Kartı')

const save = () => {
  alert('Ayarlar kaydedildi.')
  console.log({ toggles, minAmount: minAmount.value, paymentMethod: paymentMethod.value })
}
</script>

<style scoped>
.quick-payment-settings {
  font-family: 'Inter', sans-serif;
  transition: background 0.3s, color 0.3s;
}

.title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #1e293b;
}
html.dark .title {
  color: #f9fafb;
}

.grid {
  display: grid;
  gap: 16px;
  margin-bottom: 20px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.label {
  font-weight: 500;
  color: #1f2937;
}
html.dark .label {
  color: #f1f5f9;
}

.desc {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 6px;
}
html.dark .desc {
  color: #9ca3af;
}

.input {
  width: 100%;
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  background-color: #ffffff;
  color: #1f2937;
  transition: background 0.3s, border 0.3s, color 0.3s;
}
html.dark .input {
  background-color: #334155;
  color: #f9fafb;
  border-color: #475569;
}

.save-button {
  background: #3b82f6;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;
}
.save-button:hover {
  background-color: #2563eb;
}

/* Responsive */
@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>