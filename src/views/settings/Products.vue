<template>
  <div class="product-settings">
    <h2 class="page-title">Ürün Ayarları</h2>

    <div class="setting-group" v-for="setting in settings" :key="setting.key">
      <div class="setting-icon">
        <span v-html="setting.icon" />
      </div>
      <div class="setting-content">
        <h3 class="setting-title">
          {{ setting.title }}
          <span v-if="setting.badge" class="badge">{{ setting.badge }}</span>
        </h3>
        <p class="setting-description">{{ setting.description }}</p>

        <input
          v-if="setting.type === 'toggle'"
          type="checkbox"
          v-model="formData[setting.key]"
          class="setting-control"
        />

        <input
          v-else-if="setting.type === 'text'"
          type="text"
          v-model="formData[setting.key]"
          class="setting-control"
        />

        <input
          v-else-if="setting.type === 'number'"
          type="number"
          v-model="formData[setting.key]"
          class="setting-control"
        />

        <textarea
          v-else-if="setting.type === 'textarea'"
          v-model="formData[setting.key]"
          class="setting-control textarea"
        ></textarea>
      </div>
    </div>

    <div class="section-divider">Fiyat Yuvarlama</div>
    <div class="wysiwyg-box">
      <textarea class="wysiwyg-editor"></textarea>
    </div>

    <div class="section-divider">Kargo Bilgisi</div>
    <div class="wysiwyg-box">
      <textarea class="wysiwyg-editor">
Ürünü sipariş verdiğiniz gün saat 18:00 ve öncesi ise siparişiniz aynı gün kargoya verilir. Ve ertesi gün teslim edilir.

Eğer kargoyu saat 18:00'den sonra verdiyseniz ürününüzün stoklarda olması durumunda ertesi gün kargolama yapılmaktadır.
      </textarea>
    </div>

    <button class="save-btn" @click="saveSettings">✓ Kaydet</button>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const formData = reactive({
  removeOutOfStock: true,
  publishStocked: false,
  marketplaceStock: true,
  passiveCategory: false,
  searchFields: 'Urun Adı, Ürün Kodu, Barkod, Ülke',
  barcodeCountry: '624',
  barcodeCompany: '2005',
  hidePrices: false,
  fastLoadCategories: false,
  stockLimit: '',
  requireImage: false,
  hideOutOfStock: false
})

const settings = [
  {
    key: 'removeOutOfStock',
    title: 'Stoksuz Ürünleri Kaldır',
    description: 'Stok u biten ürünler otomatik olarak pasif olsun istiyorsanız aktif edebilirsiniz.',
    icon: '📦',
    type: 'toggle'
  },
  {
    key: 'publishStocked',
    title: 'Stoklu Ürünleri Yayınla',
    description: 'En az 1 adet ve üstü stok miktarına sahip ürünlerin otomatik olarak satışa sunulmasını istiyorsanız aktif ediniz.',
    icon: '✅',
    type: 'toggle'
  },
  {
    key: 'marketplaceStock',
    title: 'Pazaryerine Özel Stok',
    description: 'Pazaryerleri için ürünlerinize farklı stok miktarı belirtebilmek istiyorsanız aktif ediniz.',
    icon: '🛒',
    type: 'toggle'
  },
  {
    key: 'passiveCategory',
    title: 'Pasif Kategori Ürünleri',
    description: 'Bir ürünü kategori pasif edildiğinde, kategoride yer alan ürünler de pasif olsun istiyorsanız aktif edin.',
    icon: '📁',
    type: 'toggle'
  },
  {
    key: 'searchFields',
    title: 'Arama Alanları',
    description: 'Site içi arama motorunuzda arama yapılırken hangi alanlarda arama yapılacağını seçebilirsiniz.',
    icon: '🔍',
    type: 'text'
  },
  {
    key: 'barcodeCountry',
    title: 'Barkod Ülke Kodu',
    description: '3 karakterlik barkod ülke kodunuzu girin.',
    icon: '🌍',
    type: 'text'
  },
  {
    key: 'barcodeCompany',
    title: 'Barkod Şirket Kodu',
    description: '4 karakterlik şirket kodunuzu girin.',
    icon: '🏢',
    type: 'text'
  },
  {
    key: 'hidePrices',
    title: 'Ürün Fiyatlarını Gizle',
    description: 'Ürün sayfalarında fiyat bilgisini gizlemek için bu ayarı aktif edin.',
    icon: '💰',
    type: 'toggle'
  },
  {
    key: 'fastLoadCategories',
    title: 'Kategoriler Bellekten Yüklensin',
    description: 'Kategori ilk açıldığında 1 gün boyunca bellekte tutulmak üzere kaydedilir.',
    icon: '⚡',
    type: 'toggle'
  },
  {
    key: 'stockLimit',
    title: 'Stok Alt Miktarı',
    description: 'Ürünlerin minimum stok miktarını belirleyebilirsiniz. Bu değerin altındaki ürünler yayından kaldırılacaktır.',
    icon: '📉',
    type: 'text'
  },
  {
    key: 'requireImage',
    title: 'Görsel Zorunluluğu',
    description: 'Aktif ederek yayında olan ürünler için görselleri zorunlu hale getirebilirsiniz. Görselsiz ürün yayından kaldırılır.',
    icon: '🖼️',
    type: 'toggle'
  },
  {
    key: 'hideOutOfStock',
    title: 'Stoksuz Ürün Gösterimi',
    description: 'Stok biten ürünleri liste sonuna almak istiyorsanız bu seçeneği aktif edin.',
    icon: '📦',
    type: 'toggle'
  }
]

const saveSettings = () => {
  console.log('Ayarlar:', formData)
  alert('Ayarlar kaydedildi.')
}
</script>

<style scoped>
.product-settings {
  padding: 30px;
  background: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  font-family: 'Inter', sans-serif;
}
.page-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 28px;
}
.setting-group {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 20px;
}
.setting-icon {
  font-size: 22px;
  width: 40px;
  text-align: center;
  margin-top: 6px;
}
.setting-content {
  flex: 1;
}
.setting-title {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.badge {
  background: #ef4444;
  color: white;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 12px;
}
.setting-description {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 8px;
}
.setting-control {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 14px;
}
.textarea {
  min-height: 100px;
}
.section-divider {
  font-weight: 600;
  font-size: 16px;
  color: #334155;
  margin: 32px 0 16px;
}
.wysiwyg-box {
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 32px;
}
.wysiwyg-editor {
  width: 100%;
  min-height: 120px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px;
  font-size: 14px;
  font-family: inherit;
}
.save-btn {
  background: #3b82f6;
  color: white;
  padding: 10px 24px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}
.save-btn:hover {
  background-color: #2563eb;
}
</style>