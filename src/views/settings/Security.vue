<template>
  <div class="security-settings">
    <h2 class="title">Güvenlik Ayarları</h2>

    <div class="card">
      <label class="label">
        <span class="icon">🔒</span>
        Engellenen IP Listesi
      </label>
      <p class="description">Her satıra 1 IP adresi yazınız.</p>
      <textarea v-model="ipList" placeholder="IP Numaralarını buraya ekleyiniz." class="textarea"></textarea>
    </div>

    <button class="save-btn" @click="save">✓ Kaydet</button>
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
}
.title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
}
.card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}
.label {
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}
.description {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 8px;
}
.textarea {
  width: 100%;
  height: 160px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  padding: 12px;
  font-size: 14px;
  resize: vertical;
}
.save-btn {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
}
</style>