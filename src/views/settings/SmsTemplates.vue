<template>
  <div class="sms-templates-page">
    <h2 class="title">SMS Şablonları</h2>

    <div class="template-selector">
      <label class="selector-label">
        » Lütfen sms gönderim aksiyonunu seçin
      </label>
      <select v-model="selectedTemplate" class="template-dropdown">
        <option disabled value="">Lütfen seçim yapın</option>
        <optgroup label="Üye ve Şifre Aksiyonları">
          <option>Yeni üye kayıt</option>
          <option>Şifre sıfırlama talebi</option>
        </optgroup>
        <optgroup label="İletişim Aksiyonları">
          <option>Yeni iletişim talebi</option>
          <option>İletişim talebi yanıtı</option>
        </optgroup>
        <optgroup label="Arıza Bildirimleri">
          <option>Yeni arıza bildirimi</option>
          <option>Arıza bildirimi yönetici yanıtı</option>
          <option>Arıza bildirimi üye yanıtı</option>
        </optgroup>
        <optgroup label="Sipariş Aksiyonları">
          <option>Yeni sipariş</option>
          <option>Sipariş hazırlanıyor</option>
          <option>Sipariş kargolandı</option>
          <option>Sipariş teslim edildi</option>
          <option>Sipariş iptali</option>
          <option>Siparişe özel aksiyonlar</option>
        </optgroup>
        <optgroup label="Ödeme ve Bayi Aksiyonları">
          <option>Müşteri havale bildirimi</option>
          <option>Yeni bayi ödemesi</option>
          <option>Bayi ödeme onayı</option>
          <option>Bayi ödeme reddi</option>
          <option>Yeni bayi şifresi</option>
          <option>Hızlı ödeme işlemi</option>
        </optgroup>
        <optgroup label="Ürün Tavsiye ve Uyarılar">
          <option>Müşteri ürün tavsiyesi</option>
          <option>Müşteri fiyat alarmı</option>
          <option>Müşteri stok alarmı</option>
          <option>Yeni ürün önerisi</option>
          <option>Ürün önerisi yanıtı</option>
        </optgroup>
      </select>
    </div>

    <div v-if="selectedTemplate" class="selected-info">
      <strong>Seçilen Şablon:</strong> {{ selectedTemplate }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const selectedTemplate = ref('')
</script>

<style scoped>
.sms-templates-page {
  font-family: 'Inter', sans-serif;
  padding: 24px;
  background-color: #fff;
  transition: background 0.3s ease, color 0.3s ease;
}
html.dark .sms-templates-page {
  background-color: #1f1f1f;
  color: #f1f1f1;
}

.title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #1e293b;
}
html.dark .title {
  color: #f9fafb;
}

.template-selector {
  background-color: #3b82f6;
  padding: 24px;
  border-radius: 10px;
  color: white;
  margin-bottom: 16px;
}
html.dark .template-selector {
  background-color: #2563eb;
}

.selector-label {
  display: block;
  font-weight: 500;
  margin-bottom: 8px;
  color: white;
}

.template-dropdown {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  font-size: 14px;
  border: none;
  color: #1e293b;
}
html.dark .template-dropdown {
  background-color: #f8fafc;
  color: #1f2937;
}

.selected-info {
  margin-top: 12px;
  font-size: 14px;
  color: #334155;
}
html.dark .selected-info {
  color: #cbd5e1;
}

/* Responsive */
@media (max-width: 768px) {
  .template-selector {
    padding: 16px;
  }

  .template-dropdown {
    font-size: 13px;
  }

  .title {
    font-size: 18px;
  }

  .selected-info {
    font-size: 13px;
  }
}
</style>