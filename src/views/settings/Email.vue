<template>
  <div class="email-settings">
    <h2 class="title">E-Posta Ayarları</h2>

    <div class="section">
      <label class="field-label">
        <i class="icon">📧</i>
        <span>Yönetici E-posta Bildirim Adresi <small title="E-Posta adresi giriniz.">?</small></span>
      </label>
      <input v-model="form.adminEmail" type="email" placeholder="E-posta adresi giriniz." class="input" />
    </div>

    <div class="section toggle-section">
      <label class="toggle-label">
        <span>Standart SMTP</span>
        <input type="checkbox" v-model="form.smtpEnabled" />
      </label>
    </div>

    <div class="section toggle-section">
      <label class="toggle-label">
        <span>Mailjet</span>
        <input type="checkbox" v-model="form.mailjetEnabled" />
      </label>
    </div>

    <div class="action-buttons">
      <button class="save-btn" @click="save">✓ Kaydet</button>
      <button class="test-btn" @click="testEmail">Test Et</button>
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
}
.title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
}
.section {
  margin-bottom: 20px;
}
.field-label {
  display: flex;
  align-items: center;
  font-weight: 500;
  margin-bottom: 6px;
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
.toggle-label {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-weight: 500;
  font-size: 16px;
}
.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
}
.save-btn {
  background-color: #3b82f6;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
}
.test-btn {
  background-color: #6b7280;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
}
</style>
