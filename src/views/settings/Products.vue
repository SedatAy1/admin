<template>
  <div class="product-settings">
    <h2 class="page-title">{{ $t('productSettings.title') }}</h2>

    <div class="setting-group" v-for="setting in settings" :key="setting.key">
      <div class="setting-icon">
        <span v-html="setting.icon" />
      </div>
      <div class="setting-content">
        <h3 class="setting-title">
          {{ $t(`productSettings.${setting.key}.title`) }}
          <span v-if="setting.badge" class="badge">{{ setting.badge }}</span>
        </h3>
        <p class="setting-description">{{ $t(`productSettings.${setting.key}.description`) }}</p>

        <input v-if="setting.type === 'toggle'" type="checkbox" v-model="formData[setting.key]" class="setting-control" />
        <input v-else-if="setting.type === 'text'" type="text" v-model="formData[setting.key]" class="setting-control" />
        <input v-else-if="setting.type === 'number'" type="number" v-model="formData[setting.key]" class="setting-control" />
        <textarea v-else-if="setting.type === 'textarea'" v-model="formData[setting.key]" class="setting-control textarea"></textarea>
      </div>
    </div>

    <div class="section-divider">{{ $t('productSettings.priceRounding') }}</div>
    <div class="wysiwyg-box">
      <textarea class="wysiwyg-editor"></textarea>
    </div>

    <div class="section-divider">{{ $t('productSettings.shippingInfo') }}</div>
    <div class="wysiwyg-box">
      <textarea class="wysiwyg-editor">
{{ $t('productSettings.shippingDescription') }}
      </textarea>
    </div>

    <button class="save-btn" @click="saveSettings">✓ {{ $t('common.save') }}</button>
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
  transition: background-color 0.3s ease, border-color 0.3s ease;
}
html.dark .product-settings {
  background: #1e1e1e;
  border-color: #3a3a3a;
  color: #f1f1f1;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 28px;
  color: #1e293b;
}
html.dark .page-title {
  color: #ffffff;
}

.setting-group {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.setting-icon {
  font-size: 22px;
  width: 40px;
  text-align: center;
  margin-top: 6px;
  color: #3b82f6;
}
html.dark .setting-icon {
  color: #60a5fa;
}

.setting-content {
  flex: 1;
  min-width: 240px;
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
html.dark .setting-title {
  color: #ffffff;
}

.badge {
  background: #ef4444;
  color: white;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 12px;
}
html.dark .badge {
  background: #f87171;
  color: #fff;
}

.setting-description {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 8px;
}
html.dark .setting-description {
  color: #a1a1aa;
}

.setting-control {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  background-color: #ffffff;
  color: #1f2937;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}
html.dark .setting-control {
  background-color: #2c2c2c;
  color: #f1f1f1;
  border-color: #555;
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
html.dark .section-divider {
  color: #cbd5e1;
}

.wysiwyg-box {
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 32px;
  transition: background-color 0.3s, border-color 0.3s;
}
html.dark .wysiwyg-box {
  background: #2c2c2c;
  border-color: #444;
}

.wysiwyg-editor {
  width: 100%;
  min-height: 120px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px;
  font-size: 14px;
  font-family: inherit;
  background-color: #ffffff;
  color: #1f2937;
}
html.dark .wysiwyg-editor {
  background-color: #3a3a3a;
  border-color: #555;
  color: #f1f1f1;
}

.save-btn {
  background: #3b82f6;
  color: white;
  padding: 10px 24px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.save-btn:hover {
  background-color: #2563eb;
}

/* Responsive */
@media (max-width: 640px) {
  .product-settings {
    padding: 20px;
  }

  .page-title {
    font-size: 20px;
  }

  .setting-group {
    flex-direction: column;
  }

  .save-btn {
    width: 100%;
  }
}
</style>