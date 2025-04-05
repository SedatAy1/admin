<template>
  <div class="modal-overlay">
    <div class="modal-container">
      <div class="modal-header">
        <h2>Fiş Şablonu</h2>
        <button class="close-btn" @click="$emit('close')">✖</button>
      </div>

      <div class="tab-buttons">
        <button :class="{ active: activeTab === 'general' }" @click="activeTab = 'general'">Genel Bilgiler</button>
        <button :class="{ active: activeTab === 'designer' }" @click="activeTab = 'designer'">Şablon Tasarlama Aracı</button>
      </div>

      <div class="tab-content">
        <div v-if="activeTab === 'general'">
          <form class="form-grid">
            <label>Kağıt Örneği *</label>
            <input type="file" />

            <label>Kağıt Ebatı *</label>
            <select>
              <option>Özel</option>
            </select>

            <label>Kağıt Genişliği (cm)*</label>
            <input type="number" placeholder="5.00" />

            <label>Kağıt Yüksekliği (cm)*</label>
            <input type="number" placeholder="10.00" />

            <label>Kopya *</label>
            <select>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </form>

          <div class="preview-box"></div>
        </div>

        <div v-else class="designer-tab">
          <div class="design-area">

          </div>
          <div class="field-list">
            <div v-for="field in fields" :key="field" class="checkbox">
              <label><input type="checkbox" checked /> {{ field }}</label>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="save-btn">✔ Kaydet</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('general')

const fields = [
  'Firma Logosu',
  'Ürün Listesi',
  'Ürün Adı',
  'Adet',
  'Fiyat',
  'Tutar',
  'Genel Toplam',
  'Teşekkür Mesajı'
]
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-container {
  width: 900px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  background: #0f60c4;
  color: white;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background: none;
  border: none;
  font-size: 18px;
  color: white;
  cursor: pointer;
}

.tab-buttons {
  display: flex;
  background: #f1f5f9;
  padding: 10px;
}

.tab-buttons button {
  flex: 1;
  padding: 10px;
  border: none;
  cursor: pointer;
  background: transparent;
  font-weight: 500;
}

.tab-buttons .active {
  background: white;
  border-bottom: 2px solid #0f60c4;
}

.tab-content {
  padding: 20px;
  display: flex;
  gap: 24px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  flex: 1;
}

.preview-box {
  width: 150px;
  height: 200px;
  border: 1px solid red;
}

.designer-tab {
  display: flex;
  gap: 20px;
  width: 100%;
}

.design-area {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f9fa;
}

.design-preview {
  max-height: 400px;
  border: 1px solid #ccc;
  background: white;
}

.field-list {
  width: 250px;
  overflow-y: auto;
  max-height: 400px;
}

.checkbox {
  margin-bottom: 8px;
  font-size: 14px;
}

.modal-footer {
  padding: 12px 20px;
  text-align: center;
  background: #22c55e;
}

.save-btn {
  background: none;
  color: white;
  font-weight: 500;
  font-size: 16px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
}
</style>
