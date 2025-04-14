<template>
  <div class="security-settings">
    <h2 class="title">{{ $t('security.title') }}</h2>

    <div class="card">
      <label class="label">
        <span class="icon">🔒</span>
        {{ $t('security.blockedIPs.label') }}
      </label>
      <p class="description">{{ $t('security.blockedIPs.description') }}</p>
      <textarea
        v-model="ipList"
        :placeholder="$t('security.blockedIPs.placeholder')"
        class="textarea"
      ></textarea>
    </div>

    <button class="save-btn" @click="save">✓ {{ $t('common.save') }}</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const ipList = ref('')

const save = () => {
  alert('Kaydedildi!')
}
</script>

<style scoped>
.security-settings {
  font-family: 'Inter', sans-serif;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #ffffff;
}
html.dark .security-settings {
  background-color: #1e293b;
}

.title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #1f2937;
}
html.dark .title {
  color: #f1f5f9;
}

.card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}
html.dark .card {
  background: #334155;
  border-color: #475569;
}

.label {
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  color: #1f2937;
}
html.dark .label {
  color: #f1f5f9;
}

.description {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 8px;
}
html.dark .description {
  color: #cbd5e1;
}

.textarea {
  width: 100%;
  height: 160px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  padding: 12px;
  font-size: 14px;
  resize: vertical;
  background-color: #ffffff;
  color: #1f2937;
}
.textarea:focus {
  outline: none;
  border-color: #3b82f6;
}
html.dark .textarea {
  background-color: #1f2937;
  color: #f1f5f9;
  border-color: #475569;
}

.save-btn {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}
.save-btn:hover {
  background-color: #2563eb;
}

/* ✅ Responsive destek */
@media (max-width: 640px) {
  .security-settings {
    padding: 16px;
  }

  .title {
    font-size: 18px;
  }

  .textarea {
    height: 140px;
  }

  .save-btn {
    width: 100%;
    padding: 12px;
  }
}
</style>