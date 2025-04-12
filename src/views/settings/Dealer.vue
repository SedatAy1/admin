<template>
  <div class="dealer-settings">
    <h2 class="title">Bayi Ayarları</h2>

    <div class="setting" v-for="(setting, index) in settings" :key="index">
      <div class="setting-header">
        <div class="icon">{{ setting.icon }}</div>
        <div>
          <div class="label">{{ setting.label }}</div>
          <div class="description">{{ setting.description }}</div>
        </div>
        <div v-if="setting.type === 'toggle'" class="switch">
          <input type="checkbox" v-model="setting.value" />
        </div>
        <div v-if="setting.type === 'input'" class="input">
          <input v-model="setting.value" type="text" />
        </div>
        <div v-if="setting.type === 'select'" class="select">
          <select v-model="setting.value">
            <option v-for="option in setting.options" :key="option" :value="option">{{ option }}</option>
          </select>
        </div>
      </div>
    </div>

    <button class="save-btn">✓ Kaydet</button>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const settings = reactive([
  { label: 'Bayi Başvuru Sayfası', description: 'Bayi başvuru sayfasını aktif ederseniz bayilik başvurusu yapılabilecektir.', icon: '📄', type: 'toggle', value: false },
  { label: 'Açık Hesap Eksik Bakiye Limit (0: limitsiz)', description: 'Bayilerin açık hesap bakiyelerinin eksik limitini belirler.', icon: '📉', type: 'input', value: '1000' },
  { label: 'Sadece Onaylı Bayiler Giriş Yapabilir', description: 'Aktif edildiğinde sadece onaylı bayiler sisteme giriş yapabilir.', icon: '✅', type: 'toggle', value: false },
  { label: 'Dropship Bayi Kargo Fişini Kullan', description: 'Dropshipping yapan bayiler için özel kargo fişi şablonu.', icon: '📦', type: 'toggle', value: false },
  { label: 'Eksik(-) Stok Sınırı', description: 'Bayilerin sipariş verebileceği minimum stok miktarını belirler.', icon: '📉', type: 'input', value: '0' },
  { label: 'Sepete Eklenen Ürünlerde Eksik(-) Stok Sınırı', description: 'Sepete eklenebilecek ürünler için minimum stok miktarını belirler.', icon: '🛒', type: 'input', value: '0' },
  { label: 'Bayi Fiyat Tanımı (Varsayılan)', description: 'Bayilere gösterilecek varsayılan fiyat tipini seçin.', icon: '💰', type: 'select', options: ['Satış Fiyatı', 'İndirimli Fiyat'], value: 'Satış Fiyatı' },
  { label: 'Üyeler İçin Eksik(-) Stok Sınırı', description: 'Üyelerin sipariş verebileceği minimum stok miktarını belirler.', icon: '👥', type: 'input', value: '0' },
  { label: 'Üyeler İçin Sepete Eklenen Ürünlerde Eksik(-) Stok Sınırı', description: 'Üyelerin sepete ekleyebileceği ürünler için minimum stok miktarını belirler.', icon: '🛍️', type: 'input', value: '0' },
  { label: 'Ziyaretçiler İçin Eksik(-) Stok Sınırı', description: 'Ziyaretçilerin sipariş verebileceği minimum stok miktarını belirler.', icon: '🌐', type: 'input', value: '0' },
  { label: 'Ziyaretçiler İçin Sepete Eklenen Ürünlerde Eksik(-) Stok Sınırı', description: 'Ziyaretçilerin sepete ekleyebileceği ürünler için minimum stok miktarını belirler.', icon: '🛒', type: 'input', value: '0' },
  { label: 'Bayi Siparişleri Bayi Hareketlerine İşlensin', description: 'Bayi siparişlerinin bayi hareket listesinde görüntülenmesini sağlar.', icon: '📊', type: 'toggle', value: true },
  { label: 'Bayilere Özel Minimum Sipariş Tutarı', description: 'Bayilerin sipariş verebilmesi için minimum sipariş tutarı zorunluluğu getirir.', icon: '⚠️', type: 'toggle', value: false },
  { label: 'Bayi Minimum Sipariş Tutarı (TL)', description: 'Bayilerin sipariş verebilmesi için gerekli olan minimum tutarı belirler.', icon: '💵', type: 'input', value: '0' }
])
</script>

<style scoped>
.dealer-settings {
  font-family: Inter;
  padding: 24px;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  transition: background 0.3s, color 0.3s;
}
html.dark .dealer-settings {
  background: #1e293b;
  border-color: #334155;
  color: #f1f5f9;
}

.title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #1f2937;
}
html.dark .title {
  color: #f9fafb;
}

.setting {
  border-bottom: 1px dashed #e5e7eb;
  padding: 12px 0;
  display: flex;
  flex-direction: column;
}
html.dark .setting {
  border-color: #334155;
}

.setting-header {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
}

.icon {
  font-size: 18px;
  margin-right: 10px;
  color: #1f2937;
}
html.dark .icon {
  color: #f9fafb;
}

.label {
  font-weight: 500;
  color: #1f2937;
}
html.dark .label {
  color: #f9fafb;
}

.description {
  font-size: 13px;
  color: #6b7280;
  margin-top: 4px;
}
html.dark .description {
  color: #9ca3af;
}

.input input,
.select select {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 160px;
  background: #fff;
  color: #1f2937;
  transition: all 0.3s ease;
}
html.dark .input input,
html.dark .select select {
  background: #334155;
  border-color: #475569;
  color: #f1f5f9;
}

.switch input {
  transform: scale(1.2);
}

.save-btn {
  margin-top: 24px;
  background: #3b82f6;
  color: #fff;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
}
.save-btn:hover {
  background-color: #2563eb;
}

/* Responsive */
@media (max-width: 640px) {
  .input input,
  .select select {
    width: 100%;
  }

  .setting-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .save-btn {
    width: 100%;
    text-align: center;
  }
}
</style>