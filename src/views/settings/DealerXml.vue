<template>
  <div class="dealer-xml-settings">
    <h2 class="title">Bayi XML Ayarları</h2>

    <div class="form-grid">
      <div class="form-item">
        <label>
          <strong>XML Aboneliği Süreli Olsun</strong>
          <p>Açıklama girilecek.</p>
        </label>
        <ToggleSwitch v-model="form.hasSubscription" />
      </div>

      <div class="form-item">
        <label>
          <strong>XML Abonelik Ödemeleri</strong>
          <p>Açıklama girilecek.</p>
        </label>
        <ToggleSwitch v-model="form.hasPayments" />
      </div>

      <div class="form-item three-col">
        <BaseInput label="XML Ücreti(1 Ay, TL)" v-model="form.price1" />
        <BaseInput label="XML Ücreti(3 Ay, TL)" v-model="form.price3" />
        <BaseInput label="XML Ücreti(6 Ay, TL)" v-model="form.price6" />
        <BaseInput label="XML Ücreti(12 Ay, TL)" v-model="form.price12" />
      </div>

      <div class="form-item">
        <label>
          <strong>XML İçin IP İzni Gereksin</strong>
          <p>Açıklama girilecek.</p>
        </label>
        <ToggleSwitch v-model="form.requireIP" />
      </div>

      <div class="form-item">
        <label>
          <strong>Yeni Kayıt Olan Bayilerde XML'i Otomatik Aktif Et</strong>
          <p>Açıklama girilecek.</p>
        </label>
        <ToggleSwitch v-model="form.autoActivateForNewDealers" />
      </div>

      <BaseInput label="XML Ürün Limiti" v-model="form.productLimit" />
      <BaseInput label="Minimum Stok (Bu stoktan aşağısı XML'de 0 stok olarak gönderilir)" v-model="form.minStock" />

      <div class="form-item">
        <label>Marka Kısıtlama</label>
        <select v-model="form.brandRestriction">
          <option>Marka Seçilmedi</option>
          <option>Marka 1</option>
          <option>Marka 2</option>
        </select>
      </div>

      <div class="form-item">
        <label>Kategori Kısıtlama</label>
        <select v-model="form.categoryRestriction">
          <option>Kategori Seçilmedi</option>
          <option>Kategori 1</option>
          <option>Kategori 2</option>
        </select>
      </div>

      <div class="form-item full">
        <label>
          <strong>İzinli IP Listesi (Her satıra 1 ip adresi)</strong>
          <p>IP adreslerini buraya giriniz.</p>
        </label>
        <textarea v-model="form.allowedIPs" rows="5"></textarea>
      </div>
    </div>

    <button class="save-button">✓ Kaydet</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  hasSubscription: false,
  hasPayments: false,
  price1: 0,
  price3: 0,
  price6: 0,
  price12: 0,
  requireIP: false,
  autoActivateForNewDealers: true,
  productLimit: 30000,
  minStock: 0,
  brandRestriction: 'Marka Seçilmedi',
  categoryRestriction: 'Kategori Seçilmedi',
  allowedIPs: ''
})
</script>

<style scoped>
.dealer-xml-settings {
  font-family: Inter, sans-serif;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
}
.title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
}
.form-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.form-item {
  flex: 1 1 45%;
  display: flex;
  flex-direction: column;
}
.form-item.full {
  flex: 1 1 100%;
}
.form-item.three-col {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  flex: 1 1 100%;
}
textarea, select, input {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
}
.save-button {
  margin-top: 20px;
  padding: 10px 18px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
}
</style>
