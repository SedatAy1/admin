<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal">
      <div class="modal-header">
        <h3>{{ title }}</h3>
        <button class="close-btn" @click="close">✖</button>
      </div>

      <div class="tabs">
        <button :class="{ active: activeTab === 'general' }" @click="activeTab = 'general'">
          Genel Bilgiler
        </button>
        <button :class="{ active: activeTab === 'designer' }" @click="activeTab = 'designer'">
          Şablon Tasarlama Aracı
        </button>
      </div>

      <div class="modal-body">
        <div v-if="activeTab === 'general'" class="form-layout">
          <div class="form">
            <label>Kağıt Örneği</label>
            <input type="file" />

            <label>Kağıt Ebatı</label>
            <select>
              <option>Özel</option>
            </select>

            <label>Kağıt Genişliği (cm)</label>
            <input type="number" value="10.00" />

            <label>Kağıt Yüksekliği (cm)</label>
            <input type="number" value="6.00" />

            <label>Kopya</label>
            <select>
              <option>1</option>
              <option>2</option>
            </select>
          </div>

          <div class="preview-box"></div>
        </div>

        <div v-else class="designer-layout">
          <div class="preview-area">
            <img src="https://i.imgur.com/s5I5f1b.png" alt="Şablon" />
          </div>

          <div class="field-checklist">
            <div v-for="field in fields" :key="field">
              <label>
                <input type="checkbox" checked />
                {{ field }}
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="save-btn" @click="close">✔ Kaydet</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({ title: String })
const emit = defineEmits(['close'])
const close = () => emit('close')
const activeTab = ref('general')

const fields = [
  'Firma Logosu', 'Ürün Adı', 'Fatura Adı', 'Ürün Kodu',
  'Ürün Barkodu', 'Ürün DİNG Kod', 'MPN', 'Kısa Açıklama',
  'Kategori', 'KDV Oranı', 'Satış Fiyatı', 'Piyasa Fiyatı',
  'Ürün Resmi', 'Varyant Bilgisi'
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
  background: #0f4eb3;
  color: white;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tabs {
  display: flex;
  background: #f1f5f9;
}
.tabs button {
  flex: 1;
  padding: 12px;
  border: none;
  background: transparent;
  font-weight: 500;
  cursor: pointer;
}
.tabs button.active {
  background: #fff;
  border-bottom: 2px solid #0f4eb3;
}
.modal-body {
  padding: 20px;
}
.form-layout {
  display: flex;
  gap: 20px;
}
.form {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.preview-box {
  width: 200px;
  height: 120px;
  border: 2px solid red;
}
.designer-layout {
  display: flex;
  gap: 24px;
}
.preview-area {
  flex: 2;
  background: #eee;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.field-checklist {
  flex: 1;
  max-height: 400px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-right: 10px;
}
.modal-footer {
  background: #10b981;
  color: white;
  padding: 12px;
  text-align: center;
}
.save-btn {
  background: none;
  border: none;
  font-size: 16px;
  color: white;
  cursor: pointer;
}
</style>