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
  transition: background 0.3s ease, color 0.3s ease;
}
html.dark .maintenance-settings {
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

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px dashed #e5e7eb;
  padding: 16px 0;
}
html.dark .setting-item {
  border-color: #374151;
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
  color: #1f2937;
}
html.dark .setting-label h3 {
  color: #f3f4f6;
}

.setting-label p {
  font-size: 14px;
  color: #6b7280;
}
html.dark .setting-label p {
  color: #94a3b8;
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
  color: #1e293b;
}
html.dark .icon {
  background: #374151;
  color: #e2e8f0;
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
html.dark .slider:before {
  background-color: #f1f5f9;
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
  background-color: white;
  color: #1e293b;
  transition: background 0.3s ease;
}
html.dark .textarea {
  background-color: #2a2a2a;
  color: #f9fafb;
  border-color: #4b5563;
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
  transition: background-color 0.3s ease;
}
.save-btn:hover {
  background-color: #2563eb;
}

/* Responsive */
@media (max-width: 768px) {
  .setting-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .setting-label {
    flex-direction: column;
    gap: 6px;
  }

  .save-btn {
    width: 100%;
    text-align: center;
  }
}
</style>