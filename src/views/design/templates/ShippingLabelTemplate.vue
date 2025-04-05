<template>
  <div class="modal-overlay">
    <div class="modal">
      <div class="modal-header">
        <h3>Kargo Fişi Şablonu</h3>
        <button class="close-btn" @click="$emit('close')">✖</button>
      </div>

      <div class="tabs">
        <button :class="{ active: activeTab === 'general' }" @click="activeTab = 'general'">Genel Bilgiler</button>
        <button :class="{ active: activeTab === 'design' }" @click="activeTab = 'design'">Şablon Tasarlama Aracı</button>
      </div>

      <div class="modal-body">
        <div v-if="activeTab === 'general'" class="form-grid">
          <label>Kağıt Örneği</label>
          <input type="file" />

          <label>Kağıt Ebatı</label>
          <select><option>Özel</option></select>

          <label>Kağıt Genişliği (cm)</label>
          <input type="number" value="12.00" />

          <label>Kağıt Yüksekliği (cm)</label>
          <input type="number" value="12.00" />

          <label>Kopya</label>
          <select><option>1</option><option>2</option></select>

          <div class="preview-box"></div>
        </div>

        <div v-else class="design-grid">
          <div class="design-preview">
            <img src="https://i.imgur.com/fake-shipping-sample.png" alt="Kargo Şablonu" />
          </div>
          <div class="design-options">
            <div v-for="(field, i) in fields" :key="i" class="checkbox">
              <input type="checkbox" :id="field" checked />
              <label :for="field">{{ field }}</label>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="success-btn">✔ Kaydet</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const activeTab = ref('general')

const fields = [
  'Firma Logosu', 'Teslimat Ünvanı', 'Adres', 'Telefon',
  'Kargo Firması', 'Barkod', 'Müşteri Notu', 'Kampanya Kodu',
  'Sipariş Tarihi', 'Vergi Dairesi', 'Vergi No', 'Ödeme Tipi',
  'Ürün Listesi', 'Ürün Adı', 'Toplam', 'Özel Not 1'
]
</script>

<style scoped>


.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Daha koyu yap, şeffaflık artırıldı */
  z-index: 99998 !important; /* Üst katmanda olsun */
  display: flex !important; /* Emin olmak için */
  justify-content: center;
  align-items: center;
  visibility: visible !important; /* Eğer gizliyse göster */
}

/* Modal İçeriği */
.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 500px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 99999 !important; /* Modal her şeyin üstünde olsun */
  display: block !important; /* Eğer hala görünmüyorsa, ekle */
  position: relative;
  transform: translateY(0); /* Modal kaybolmasın */
  opacity: 1 !important;
}

.modal-header {
  background-color: #2563eb;
  color: white;
  padding: 16px;
  display: flex;
  justify-content: space-between;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
}

.tabs {
  display: flex;
  background: #f1f5f9;
}

.tabs button {
  flex: 1;
  padding: 12px;
  background: transparent;
  border: none;
  font-weight: 500;
  cursor: pointer;
}

.tabs .active {
  background: white;
  border-bottom: 2px solid #2563eb;
}

.modal-body {
  padding: 20px;
}

.form-grid label,
.form-grid input,
.form-grid select {
  display: block;
  margin-bottom: 10px;
  width: 100%;
}

.preview-box {
  width: 150px;
  height: 150px;
  border: 1px solid red;
  margin-top: 10px;
}

.design-grid {
  display: flex;
  gap: 24px;
}

.design-preview img {
  width: 260px;
  border: 1px solid #e2e8f0;
}

.design-options {
  flex: 1;
  max-height: 300px;
  overflow-y: auto;
}

.checkbox {
  margin-bottom: 8px;
}

.modal-footer {
  background: #10b981;
  color: white;
  padding: 12px;
  text-align: center;
  font-weight: 600;
}
</style>