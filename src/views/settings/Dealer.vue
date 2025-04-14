<template>
  <div class="dealer-settings">
    <h2 class="title">{{ $t('dealerSettings.title') }}</h2>

    <div class="setting" v-for="(setting, index) in settings" :key="index">
      <div class="setting-header">
        <div class="icon">{{ setting.icon }}</div>
        <div>
          <div class="label">{{ $t(`dealerSettings.settings[${index}].label`) }}</div>
          <div class="description">{{ $t(`dealerSettings.settings[${index}].description`) }}</div>
        </div>
        <div v-if="setting.type === 'toggle'" class="switch">
          <input type="checkbox" v-model="setting.value" />
        </div>
        <div v-if="setting.type === 'input'" class="input">
          <input v-model="setting.value" type="text" />
        </div>
        <div v-if="setting.type === 'select'" class="select">
          <select v-model="setting.value">
            <option v-for="option in setting.options" :key="option" :value="option">
              {{ $t(`dealerSettings.options.${option}`) }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <button class="save-btn">✓ {{ $t('dealerSettings.save') }}</button>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const settings = reactive([
  { icon: '📄', type: 'toggle', value: false },
  { icon: '📉', type: 'input', value: '1000' },
  { icon: '✅', type: 'toggle', value: false },
  { icon: '📦', type: 'toggle', value: false },
  { icon: '📉', type: 'input', value: '0' },
  { icon: '🛒', type: 'input', value: '0' },
  { icon: '💰', type: 'select', options: ['sale', 'discount'], value: 'sale' },
  { icon: '👥', type: 'input', value: '0' },
  { icon: '🛍️', type: 'input', value: '0' },
  { icon: '🌐', type: 'input', value: '0' },
  { icon: '🛒', type: 'input', value: '0' },
  { icon: '📊', type: 'toggle', value: true },
  { icon: '⚠️', type: 'toggle', value: false },
  { icon: '💵', type: 'input', value: '0' }
])
</script>

<style scoped>
.dealer-settings {
  font-family: Inter;
  padding: 24px;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  transition: background 0.3s, color 0.3s;
}
html.dark .dealer-settings {
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

.setting {
  border-bottom: 1px dashed #e5e7eb;
  padding: 12px 0;
  display: flex;
  flex-direction: column;
}
html.dark .setting {
  border-color: #334155;
}

.setting-header {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
}

.icon {
  font-size: 18px;
  margin-right: 10px;
  color: #1f2937;
}
html.dark .icon {
  color: #f9fafb;
}

.label {
  font-weight: 500;
  color: #1f2937;
}
html.dark .label {
  color: #f9fafb;
}

.description {
  font-size: 13px;
  color: #6b7280;
  margin-top: 4px;
}
html.dark .description {
  color: #9ca3af;
}

.input input,
.select select {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 160px;
  background: #fff;
  color: #1f2937;
  transition: all 0.3s ease;
}
html.dark .input input,
html.dark .select select {
  background: #334155;
  border-color: #475569;
  color: #f1f5f9;
}

.switch input {
  transform: scale(1.2);
}

.save-btn {
  margin-top: 24px;
  background: #3b82f6;
  color: #fff;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
}
.save-btn:hover {
  background-color: #2563eb;
}

/* Responsive */
@media (max-width: 640px) {
  .input input,
  .select select {
    width: 100%;
  }

  .setting-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .save-btn {
    width: 100%;
    text-align: center;
  }
}
</style>