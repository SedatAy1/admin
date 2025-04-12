<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="close">
      <div class="modal">
        <div class="modal-header">
          <h3>{{ $t('newGroupModal.title') }}</h3>
          <button class="close-btn" @click="close">✖</button>
        </div>

        <div class="modal-tabs">
          <button :class="{ active: activeTab === 'bilgi' }" @click="activeTab = 'bilgi'">
            {{ $t('newGroupModal.tabs.info') }}
          </button>
          <button :class="{ active: activeTab === 'ayar' }" @click="activeTab = 'ayar'">
            {{ $t('newGroupModal.tabs.settings') }}
          </button>
        </div>

        <div class="modal-body">
          <div v-if="activeTab === 'bilgi'">
            <label>{{ $t('newGroupModal.fields.code') }}</label>
            <input type="text" />

            <label>{{ $t('newGroupModal.fields.title') }}</label>
            <input type="text" />

            <label>{{ $t('newGroupModal.fields.description') }}</label>
            <input type="text" />

            <label>{{ $t('newGroupModal.fields.icon') }}</label>
            <input type="text" />

            <label>{{ $t('newGroupModal.fields.buttonTitle') }}</label>
            <input type="text" />

            <label>{{ $t('newGroupModal.fields.buttonLink') }}</label>
            <input type="text" />
          </div>

          <div v-else>
            <label>{{ $t('newGroupModal.fields.viewType') }}</label>
            <select>
              <option>{{ $t('newGroupModal.options.column') }}</option>
            </select>

            <label>{{ $t('newGroupModal.fields.groupSize') }}</label>
            <select>
              <option>{{ $t('newGroupModal.options.container') }}</option>
            </select>

            <label>{{ $t('newGroupModal.fields.columnCount') }}</label>
            <select>
              <option>1</option>
              <option>2</option>
            </select>

            <table>
              <thead>
                <tr>
                  <th>{{ $t('newGroupModal.table.column') }}</th>
                  <th>{{ $t('newGroupModal.table.xs') }}</th>
                  <th>{{ $t('newGroupModal.table.sm') }}</th>
                  <th>{{ $t('newGroupModal.table.md') }}</th>
                  <th>{{ $t('newGroupModal.table.lg') }}</th>
                  <th>{{ $t('newGroupModal.table.xl') }}</th>
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
          <button class="primary" @click="close">{{ $t('common.save') }}</button>
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
  background: rgba(0, 0, 0, 0.5);
  z-index: 99998 !important;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

/* Modal */
.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 99999 !important;
  animation: slideUp 0.3s ease-out;
}
html.dark .modal {
  background: #232323;
  color: #f1f1f1;
}

/* Başlık */
.modal-header {
  background: linear-gradient(to right, #2563eb, #1d4ed8);
  padding: 18px 24px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px 8px 0 0;
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
html.dark .modal-tabs {
  background: #2c2c2c;
  border-color: #444;
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
html.dark .modal-tabs button {
  color: #f1f1f1;
}
html.dark .modal-tabs button:hover {
  background-color: #3a3a3a;
}

.modal-tabs .active {
  background: #fff;
  border-bottom: 2px solid #2563eb;
  color: #1e40af;
  font-weight: 600;
}
html.dark .modal-tabs .active {
  background: #232323;
  border-bottom-color: #3b82f6;
  color: #93c5fd;
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
html.dark .modal-body label {
  color: #cbd5e1;
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
html.dark .modal-body input,
html.dark .modal-body select {
  background-color: #2c2c2c;
  border-color: #555;
  color: #f1f1f1;
}
html.dark .modal-body input::placeholder {
  color: #aaa;
}

/* Tablo */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
  font-size: 13px;
}
th, td {
  padding: 10px;
  border: 1px solid #e2e8f0;
  text-align: center;
}
th {
  background-color: #f1f5f9;
  color: #334155;
}
html.dark th {
  background-color: #2c2c2c;
  color: #e2e8f0;
}
html.dark td {
  border-color: #444;
  color: #e2e8f0;
}

/* Footer */
.modal-footer {
  padding: 16px 24px;
  background-color: #f9fafb;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #e5e7eb;
  border-radius: 0 0 8px 8px;
}
html.dark .modal-footer {
  background-color: #1f1f1f;
  border-color: #333;
}

/* Kaydet Butonu */
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
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsive */
@media (max-width: 576px) {
  .modal {
    padding: 16px;
  }
  .modal-header,
  .modal-footer {
    padding: 12px 16px;
  }
  .modal-body {
    padding: 16px;
  }
  .modal-tabs button {
    font-size: 13px;
    padding: 10px;
  }
}
</style>