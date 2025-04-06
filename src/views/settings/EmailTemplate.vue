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
}
.title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
}
.template-selector {
  background-color: #3b82f6;
  padding: 24px;
  border-radius: 10px;
  color: white;
  margin-bottom: 16px;
}
.selector-label {
  display: block;
  font-weight: 500;
  margin-bottom: 8px;
}
.template-dropdown {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  font-size: 14px;
  border: none;
  color: #1e293b;
}
.selected-info {
  margin-top: 12px;
  font-size: 14px;
  color: #334155;
}
</style>