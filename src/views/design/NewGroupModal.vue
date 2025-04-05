<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="close">
      <div class="modal">
        <div class="modal-header">
          <h3>Yeni Grup</h3>
          <button class="close-btn" @click="close">✖</button>
        </div>

        <div class="modal-tabs">
          <button :class="{ active: activeTab === 'bilgi' }" @click="activeTab = 'bilgi'">Grup Bilgileri</button>
          <button :class="{ active: activeTab === 'ayar' }" @click="activeTab = 'ayar'">Grup Ayarları</button>
        </div>

        <div class="modal-body">
          <div v-if="activeTab === 'bilgi'">
            <label>Grup Kodu</label>
            <input type="text" />

            <label>Başlık</label>
            <input type="text" />

            <label>Açıklama</label>
            <input type="text" />

            <label>İkon</label>
            <input type="text" />

            <label>Buton Başlık</label>
            <input type="text" />

            <label>Buton Link</label>
            <input type="text" />
          </div>

          <div v-else>
            <label>Görünüm Tipi</label>
            <select>
              <option>Sütun</option>
            </select>

            <label>Grup Boyutu</label>
            <select>
              <option>Normal (container)</option>
            </select>

            <label>Sütun Sayısı</label>
            <select>
              <option>1</option>
              <option>2</option>
            </select>

            <table>
              <thead>
                <tr>
                  <th>Sütun</th>
                  <th>Ekstra Küçük</th>
                  <th>Küçük</th>
                  <th>Orta</th>
                  <th>Geniş</th>
                  <th>Ekstra Geniş</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>%100</td>
                  <td>%100</td>
                  <td>%100</td>
                  <td>%100</td>
                  <td>%100</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="modal-footer">
          <button class="primary" @click="close">Kaydet</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  visible: Boolean
})

const emit = defineEmits(['close'])
const activeTab = ref('bilgi')

const close = () => emit('close')
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

/* Başlık */
.modal-header {
  background: linear-gradient(to right, #2563eb, #1d4ed8);
  padding: 18px 24px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  transition: transform 0.2s;
}

.close-btn:hover {
  transform: scale(1.2);
}

/* Sekmeler */
.modal-tabs {
  display: flex;
  background: #f1f5f9;
  border-bottom: 1px solid #e5e7eb;
}

.modal-tabs button {
  flex: 1;
  padding: 12px;
  background: none;
  border: none;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  color: #334155;
}

.modal-tabs button:hover {
  background-color: #e2e8f0;
}

.modal-tabs .active {
  background: #fff;
  border-bottom: 2px solid #2563eb;
  color: #1e40af;
  font-weight: 600;
}

/* İçerik */
.modal-body {
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.modal-body label {
  font-size: 14px;
  font-weight: 500;
  color: #475569;
  margin-bottom: 4px;
}

.modal-body input,
.modal-body select {
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background-color: #f8fafc;
  font-size: 14px;
  transition: 0.2s ease;
}

.modal-body input:focus,
.modal-body select:focus {
  outline: none;
  border-color: #2563eb;
  background-color: #fff;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
}

/* Tablo */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
  font-size: 13px;
}

th,
td {
  padding: 10px;
  border: 1px solid #e2e8f0;
  text-align: center;
}

th {
  background-color: #f1f5f9;
  color: #334155;
}

/* Footer */
.modal-footer {
  padding: 16px 24px;
  background-color: #f9fafb;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #e5e7eb;
}

.primary {
  background-color: #2563eb;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.primary:hover {
  background-color: #1d4ed8;
}

/* Animasyonlar */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
