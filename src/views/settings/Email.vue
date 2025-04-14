<template>
  <div class="email-settings">
    <h2 class="title">{{ $t('email.title') }}</h2>

    <div class="section">
      <label class="field-label">
        <i class="icon">📧</i>
        <span>
          {{ $t('email.adminAddress.label') }}
          <small :title="$t('email.adminAddress.tooltip')">?</small>
        </span>
      </label>
      <input v-model="form.adminEmail" type="email" :placeholder="$t('email.adminAddress.placeholder')" class="input" />
    </div>

    <div class="section toggle-section">
      <label class="toggle-label">
        <span>{{ $t('email.smtp') }}</span>
        <input type="checkbox" v-model="form.smtpEnabled" />
      </label>
    </div>

    <div class="section toggle-section">
      <label class="toggle-label">
        <span>{{ $t('email.mailjet') }}</span>
        <input type="checkbox" v-model="form.mailjetEnabled" />
      </label>
    </div>

    <div class="action-buttons">
      <button class="save-btn" @click="save">✓ {{ $t('common.save') }}</button>
      <button class="test-btn" @click="testEmail">{{ $t('email.test') }}</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  adminEmail: '',
  smtpEnabled: false,
  mailjetEnabled: false
})

const save = () => {
  alert('E-posta ayarları kaydedildi!')
}

const testEmail = () => {
  alert('Test e-postası gönderildi!')
}
</script>

<style scoped>
.email-settings {
  font-family: 'Inter';
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  max-width: 900px;
  margin: auto;
  transition: background 0.3s ease, color 0.3s ease;
}
html.dark .email-settings {
  background: #1f1f1f;
  color: #f1f5f9;
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

.section {
  margin-bottom: 20px;
}

.field-label {
  display: flex;
  align-items: center;
  font-weight: 500;
  margin-bottom: 6px;
  color: #374151;
}
html.dark .field-label {
  color: #e2e8f0;
}

.field-label i {
  margin-right: 8px;
}

.input {
  width: 100%;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  background: #fff;
  color: #1f2937;
  transition: background 0.3s ease, border 0.3s ease;
}
html.dark .input {
  background: #2a2a2a;
  color: #f1f5f9;
  border-color: #3b3b3b;
}

.toggle-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e5e7eb;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
}
html.dark .toggle-section {
  background: #27272a;
  border-color: #3f3f46;
}

.toggle-label {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-weight: 500;
  font-size: 16px;
  color: #334155;
}
html.dark .toggle-label {
  color: #e2e8f0;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  flex-wrap: wrap;
  gap: 12px;
}

.save-btn {
  background-color: #3b82f6;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}
.save-btn:hover {
  background-color: #2563eb;
}

.test-btn {
  background-color: #6b7280;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}
.test-btn:hover {
  background-color: #4b5563;
}

/* Responsive */
@media (max-width: 768px) {
  .email-settings {
    padding: 16px;
  }

  .toggle-label {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }

  .action-buttons {
    flex-direction: column;
    align-items: stretch;
  }

  .save-btn,
  .test-btn {
    width: 100%;
    text-align: center;
  }
}
</style>