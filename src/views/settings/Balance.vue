<template>
  <div class="balance-settings p-6">
    <h2 class="text-xl font-semibold mb-6">Bakiye Ayarları</h2>

    <div class="flex items-center justify-between mb-6">
      <div class="flex items-start gap-4">
        <div class="icon-box">
          <i class="i-tabler-wallet"></i>
        </div>
        <div>
          <p class="font-medium">Müşteri Cüzdan - Bakiye Yükleme</p>
          <p class="text-sm text-gray-500">Bakiye(Cüzdan) ödemelerini aktif/pasif yapabilirsiniz</p>
        </div>
      </div>
      <label class="switch">
        <input type="checkbox" v-model="enabled" />
        <span class="slider"></span>
      </label>
    </div>

    <div class="grid grid-cols-2 gap-6 mb-6">
      <div>
        <label class="block mb-1 font-medium">Ödeme Yöntemi</label>
        <select v-model="form.method" class="input">
          <option>Kredi Kartı</option>
          <option>Havale/EFT</option>
        </select>
      </div>
      <div>
        <label class="block mb-1 font-medium">Bakiye Yükleme Durumu</label>
        <select v-model="form.approval" class="input">
          <option>Yönetici Onayı</option>
          <option>Otomatik Onay</option>
        </select>
      </div>
      <div>
        <label class="block mb-1 font-medium">Yüklenebilecek En Düşük Tutar (TRY)</label>
        <input type="number" class="input" v-model="form.min" />
      </div>
      <div>
        <label class="block mb-1 font-medium">Yüklenebilecek En Yüksek Tutar (TRY)</label>
        <input type="number" class="input" v-model="form.max" />
      </div>
    </div>

    <div class="mb-6">
      <label class="block mb-1 font-medium">Bakiye Yükleme Dekontu</label>
      <textarea rows="6" class="input font-mono" v-model="form.receipt"></textarea>
      <div class="mt-3 text-sm text-gray-500">
        Kullanılacak Değişkenler:
        <div class="flex flex-wrap gap-2 mt-2">
          <span v-for="token in tokens" :key="token" class="bg-gray-200 text-xs px-2 py-1 rounded">{{ token }}</span>
        </div>
      </div>
    </div>

    <button class="btn-save">✓ Kaydet</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const enabled = ref(true)
const form = ref({
  method: 'Kredi Kartı',
  approval: 'Yönetici Onayı',
  min: 1000,
  max: 5000,
  receipt: ''
})

const tokens = [
  '{islem_no}', '{unvani}', '{address}', '{telefon}', '{tutar}', '{tarih}'
]
</script>

<style scoped>
.input {
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 8px;
  font-size: 14px;
}
.btn-save {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
}
.switch {
  position: relative;
  display: inline-block;
  width: 46px;
  height: 24px;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 24px;
  transition: .4s;
}
input:checked + .slider {
  background-color: #3b82f6;
}
.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  border-radius: 50%;
  transition: .4s;
}
input:checked + .slider:before {
  transform: translateX(22px);
}
.icon-box {
  width: 40px;
  height: 40px;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  font-size: 20px;
}
</style>
