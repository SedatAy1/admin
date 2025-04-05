<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="close">
      <div class="modal">
        <div class="modal-header">
          <h3>E-Fatura / E-Arşiv Şablonu</h3>
          <button class="close-btn" @click="close">&times;</button>
        </div>

        <div class="modal-body">
          <div class="form-row">
            <div class="form-group">
              <label>Şablon Adı</label>
              <input type="text" placeholder="E-Fatura / E-Arşiv Şablonu" />
            </div>
            <div class="form-group">
              <label>Şablon Durumu</label>
              <select>
                <option>Pasif</option>
                <option>Aktif</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Kargo Barkodu</label>
              <select>
                <option>Göster</option>
                <option>Gizle</option>
              </select>
            </div>
            <div class="form-group">
              <label>Sipariş Barkodu</label>
              <select>
                <option>Göster</option>
                <option>Gizle</option>
              </select>
            </div>
          </div>

          <div class="panel" v-for="item in panels" :key="item">
            {{ item }}
            <span class="add-btn">+</span>
          </div>
        </div>

        <div class="modal-footer">
          <button class="secondary">👁 Önizle</button>
          <button class="primary">✔ Kaydet</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
const emit = defineEmits(['close'])
const close = () => emit('close')

const panels = [
  'Firma Logosu',
  'İmza Logosu',
  'Ürün Satırları',
  'Sabit Notlar',
  'Özel Notlar',
  'IBAN Bilgisi'
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
  background: #2563eb;
  color: white;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
}

.modal-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-row {
  display: flex;
  gap: 16px;
}

.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

input,
select {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  font-size: 14px;
}

.panel {
  background: #f1f5f9;
  padding: 12px 16px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.add-btn {
  font-size: 20px;
  color: #3b82f6;
  font-weight: bold;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border-top: 1px solid #e2e8f0;
}

.primary {
  background: #3b82f6;
  color: white;
  padding: 10px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.secondary {
  background: #0f172a;
  color: white;
  padding: 10px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
