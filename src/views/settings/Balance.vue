<template>
  <div class="balance-settings p-6">
    <h2 class="text-xl font-semibold mb-6">{{ $t('balance.title') }}</h2>

    <div class="flex items-center justify-between mb-6">
      <div class="flex items-start gap-4">
        <div class="icon-box">
          <i class="i-tabler-wallet"></i>
        </div>
        <div>
          <p class="font-medium">{{ $t('balance.walletTitle') }}</p>
          <p class="text-sm text-gray-500">{{ $t('balance.walletDescription') }}</p>
        </div>
      </div>
      <label class="switch">
        <input type="checkbox" v-model="enabled" />
        <span class="slider"></span>
      </label>
    </div>

    <div class="grid grid-cols-2 gap-6 mb-6">
      <div>
        <label class="block mb-1 font-medium">{{ $t('balance.paymentMethod') }}</label>
        <select v-model="form.method" class="input">
          <option>{{ $t('balance.card') }}</option>
          <option>{{ $t('balance.transfer') }}</option>
        </select>
      </div>
      <div>
        <label class="block mb-1 font-medium">{{ $t('balance.approvalStatus') }}</label>
        <select v-model="form.approval" class="input">
          <option>{{ $t('balance.adminApproval') }}</option>
          <option>{{ $t('balance.autoApproval') }}</option>
        </select>
      </div>
      <div>
        <label class="block mb-1 font-medium">{{ $t('balance.minAmount') }}</label>
        <input type="number" class="input" v-model="form.min" />
      </div>
      <div>
        <label class="block mb-1 font-medium">{{ $t('balance.maxAmount') }}</label>
        <input type="number" class="input" v-model="form.max" />
      </div>
    </div>

    <div class="mb-6">
      <label class="block mb-1 font-medium">{{ $t('balance.receipt') }}</label>
      <textarea rows="6" class="input font-mono" v-model="form.receipt"></textarea>
      <div class="mt-3 text-sm text-gray-500">
        {{ $t('balance.availableTokens') }}:
        <div class="flex flex-wrap gap-2 mt-2">
          <span v-for="token in tokens" :key="token" class="bg-gray-200 text-xs px-2 py-1 rounded">{{ token }}</span>
        </div>
      </div>
    </div>

    <button class="btn-save">✓ {{ $t('balance.save') }}</button>
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
  background-color: #fff;
  color: #1e293b;
  transition: background 0.3s ease, color 0.3s ease;
}
html.dark .input {
  background-color: #1f2937;
  border-color: #4b5563;
  color: #f9fafb;
}

.btn-save {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.btn-save:hover {
  background: #2563eb;
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
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: #ccc;
  border-radius: 24px;
  transition: .4s;
}
html.dark .slider {
  background-color: #4b5563;
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
html.dark .slider:before {
  background-color: #f9fafb;
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
  color: #1e293b;
  transition: background 0.3s ease, color 0.3s ease;
}
html.dark .icon-box {
  background: #334155;
  color: #f9fafb;
}

/* Responsive destek (isteğe bağlı alan genişliği için örnek) */
@media (max-width: 640px) {
  .btn-save {
    width: 100%;
    text-align: center;
  }

  .input {
    font-size: 13px;
  }
}
</style>