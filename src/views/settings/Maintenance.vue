<template>
  <div class="maintenance-settings">
    <h2 class="title">Bakım Modu</h2>

    <div class="setting-item">
      <div class="setting-label">
        <div class="icon">🔖</div>
        <div>
          <h3>Bakım Modu</h3>
          <p>Sitenizi bakım moduna alarak ziyaretçilerin erişimini engelleyebilirsiniz.</p>
        </div>
      </div>
      <label class="switch">
        <input type="checkbox" v-model="maintenanceMode" />
        <span class="slider"></span>
      </label>
    </div>

    <div class="setting-item">
      <div class="setting-label">
        <div class="icon">🔓</div>
        <div>
          <h3>Yönetici Siteye Erişebilsin</h3>
          <p>Bakım modu aktifken yöneticilerin siteye erişebilmesini sağlar.</p>
        </div>
      </div>
      <label class="switch">
        <input type="checkbox" v-model="adminAccess" />
        <span class="slider"></span>
      </label>
    </div>

    <div class="setting-item column">
      <div class="setting-label">
        <div class="icon">📄</div>
        <div>
          <h3>Açıklama</h3>
          <p>Bakım modu aktif olduğunda ziyaretçilere gösterilecek açıklama metnini buradan düzenleyebilirsiniz.</p>
        </div>
      </div>
      <textarea v-model="description" class="textarea"></textarea>
    </div>

    <button class="save-btn" @click="saveSettings">✓ Kaydet</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const maintenanceMode = ref(true)
const adminAccess = ref(true)
const description = ref('Sitemizde altyapı çalışması yapılmaktadır.')

const saveSettings = () => {
  alert('Ayarlar kaydedildi.')
  // API gönderimi buraya eklenebilir
}
</script>

<style scoped>
.maintenance-settings {
  font-family: 'Inter';
  background: #fff;
  padding: 24px;
  border-radius: 10px;
}

.title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px dashed #e5e7eb;
  padding: 16px 0;
}

.setting-item.column {
  flex-direction: column;
  align-items: flex-start;
}

.setting-label {
  display: flex;
  gap: 12px;
}

.setting-label h3 {
  font-weight: 600;
  margin-bottom: 4px;
}

.setting-label p {
  font-size: 14px;
  color: #6b7280;
}

.icon {
  width: 40px;
  height: 40px;
  background: #f3f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
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

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2563eb;
}

input:checked + .slider:before {
  transform: translateX(22px);
}

.textarea {
  width: 100%;
  height: 180px;
  padding: 12px;
  margin-top: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
}

.save-btn {
  background: #3b82f6;
  color: white;
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 20px;
}
</style>
