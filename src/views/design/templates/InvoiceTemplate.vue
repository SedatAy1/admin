<template>
  <Teleport to="body">
    <div class="modal-overlay">
      <div class="invoice-modal">
        <div class="header">
          <h2>Fatura Şablonu</h2>
          <div class="tabs">
            <button :class="{ active: activeTab === 'genel' }" @click="activeTab = 'genel'">Genel Bilgiler</button>
            <button :class="{ active: activeTab === 'sablon' }" @click="activeTab = 'sablon'">Şablon Tasarlama Aracı</button>
          </div>
        </div>

        <div class="content">
          <!-- Genel Bilgiler -->
          <div v-if="activeTab === 'genel'" class="form-section">
            <label>Şablon Adı</label>
            <input type="text" placeholder="Fatura Şablonu" />

            <label>Varsayılan Kağıt Tipi</label>
            <select>
              <option>A4</option>
              <option>Letter</option>
            </select>

            <label>Açıklama</label>
            <textarea placeholder="Bu şablon, standart e-fatura yapısı içindir." />
          </div>

          <!-- Şablon Tasarlama Aracı -->
          <div v-else class="builder-section">
            <div class="preview">
              <div class="preview-box">
                <h4 v-if="options.header">🔵 Başlık</h4>
                <p v-if="options.address">📍 Adres Bilgisi</p>
                <p v-if="options.logo">🖼 Logo</p>
                <p v-if="options.table">📄 Ürün Tablosu</p>
                <p v-if="options.footer">🔻 Alt Bilgi</p>
              </div>
            </div>
            <div class="options">
              <label><input type="checkbox" v-model="options.header" /> Başlık</label>
              <label><input type="checkbox" v-model="options.address" /> Adres</label>
              <label><input type="checkbox" v-model="options.logo" /> Logo</label>
              <label><input type="checkbox" v-model="options.table" /> Ürün Tablosu</label>
              <label><input type="checkbox" v-model="options.footer" /> Alt Bilgi</label>
            </div>
          </div>
        </div>

        <div class="footer">
          <button class="btn-primary">Kaydet</button>
          <button class="btn-secondary" @click="$emit('close')">İptal</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('genel')
const options = ref({
  header: true,
  address: false,
  logo: false,
  table: true,
  footer: true
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.invoice-modal {
  background: white;
  width: 800px;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.header {
  background-color: #3b82f6;
  padding: 16px 24px;
  color: white;
}

.tabs {
  margin-top: 12px;
  display: flex;
  gap: 10px;
}

.tabs button {
  background: white;
  color: #3b82f6;
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
}

.tabs .active {
  background-color: #2563eb;
  color: white;
}

.content {
  padding: 24px;
  display: flex;
  gap: 32px;
  justify-content: space-between;
}

.form-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.builder-section {
  display: flex;
  gap: 20px;
  width: 100%;
}

.preview {
  flex: 1;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  min-height: 300px;
}

.options {
  flex: 0 0 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer {
  padding: 16px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
  padding: 10px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
}

.btn-secondary {
  background-color: #f3f4f6;
  color: #111827;
  padding: 10px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
}
</style>
