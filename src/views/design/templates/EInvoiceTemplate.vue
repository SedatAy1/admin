<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="close">
      <div class="modal">
        <!-- Header -->
        <div class="modal-header">
          <h3>{{ $t('eInvoice.title') }}</h3>
          <button class="close-btn" @click="close">&times;</button>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <div class="form-row">
            <div class="form-group">
              <label>{{ $t('eInvoice.fields.name') }}</label>
              <input type="text" :placeholder="$t('eInvoice.fields.namePlaceholder')" />
            </div>
            <div class="form-group">
              <label>{{ $t('eInvoice.fields.status') }}</label>
              <select>
                <option>{{ $t('common.passive') }}</option>
                <option>{{ $t('common.active') }}</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>{{ $t('eInvoice.fields.cargoBarcode') }}</label>
              <select>
                <option>{{ $t('common.show') }}</option>
                <option>{{ $t('common.hide') }}</option>
              </select>
            </div>
            <div class="form-group">
              <label>{{ $t('eInvoice.fields.orderBarcode') }}</label>
              <select>
                <option>{{ $t('common.show') }}</option>
                <option>{{ $t('common.hide') }}</option>
              </select>
            </div>
          </div>

          <div class="panel" v-for="panel in panels" :key="panel">
            {{ $t(`eInvoice.panels.${panel}`) }}
            <span class="add-btn">+</span>
          </div>
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <button class="secondary">👁 {{ $t('common.preview') }}</button>
          <button class="primary">✔ {{ $t('common.save') }}</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const emit = defineEmits(['close'])
const close = () => emit('close')

const panels = [
  'companyLogo',
  'signatureLogo',
  'productRows',
  'staticNotes',
  'customNotes',
  'ibanInfo'
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
