<template>
  <div class="orders-settings">
    <h2 class="page-title">Sipariş Ayarları</h2>

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
        <component
          :is="setting.type === 'toggle' ? 'input' : 'input'"
          v-if="setting.type !== 'textarea'"
          :type="setting.type === 'toggle' ? 'checkbox' : setting.type"
          v-model="formData[setting.key]"
          class="setting-control"
        />
        <textarea
          v-if="setting.type === 'textarea'"
          v-model="formData[setting.key]"
          class="setting-control textarea"
        ></textarea>
      </div>
    </div>

    <div class="section-divider">Sipariş Sayfasında hangi bilgiler zorunlu olarak istersin?</div>
    <div class="setting-group" v-for="setting in orderRequiredFields" :key="setting.key">
      <div class="setting-icon">
        <span v-html="setting.icon" />
      </div>
      <div class="setting-content">
        <h3 class="setting-title">{{ setting.title }}</h3>
        <input type="checkbox" v-model="formData[setting.key]" class="setting-control" />
      </div>
    </div>

    <div class="section-divider">Hızlı Satış ekranında hangi bilgiler zorunlu olarak istersin?</div>
    <div class="setting-group" v-for="setting in fastSaleFields" :key="setting.key">
      <div class="setting-icon">
        <span v-html="setting.icon" />
      </div>
      <div class="setting-content">
        <h3 class="setting-title">{{ setting.title }}</h3>
        <input type="checkbox" v-model="formData[setting.key]" class="setting-control" />
      </div>
    </div>

    <button class="save-btn" @click="saveSettings">✓ Kaydet</button>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const formData = reactive({
  giftCoupon: true,
  giftPackage: true,
  giftAmount: 10,
  excludeVAT: false,
  identityRequired: false,
  userStatus: false,
  forceRegister: false,
  noteActive: true,
  cancelAllowed: true,
  restockOnCancel: true,
  orderNoteText: '',
  invoiceSerial: '',
  separateItems: false,
  priceBased: false,
  minAmount: 0,
  fastSaleStatus: 'Hızlı Satış',
  reqTCKN: false,
  reqEmail: false,
  reqNameFast: true,
  reqPhoneFast: true,
  reqAddressFast: true,
  reqTerminalFast: false
})

const settings = [
  {
    key: 'giftCoupon',
    title: 'Hediye Kuponu',
    description: 'Müşterilerinizin ödeme sayfasında kupon kodu girebilmelerine izin verin.',
    icon: '🎁',
    type: 'toggle'
  },
  {
    key: 'giftPackage',
    title: 'Hediye Paketi Hizmeti',
    description: 'Hediye paketini ücretsiz/satışlı sunabilirsiniz.',
    icon: '📦',
    type: 'toggle'
  },
  {
    key: 'giftAmount',
    title: 'Hediye Paket Tutarı (TRY)',
    description: 'Hediye paketinin fiyatı.',
    icon: '💸',
    type: 'number'
  },
  {
    key: 'excludeVAT',
    title: 'KDV Hariç Fiyatlandırma',
    description: 'Ürün sayfalarında fiyatları KDV hariç gösterin.',
    icon: '🧾',
    type: 'toggle'
  },
  {
    key: 'identityRequired',
    title: 'T.C. Kimlik Numarası',
    description: 'Sipariş için TC Kimlik numarası zorunlu hale getirilebilir.',
    icon: '🆔',
    type: 'toggle'
  },
  {
    key: 'userStatus',
    title: 'Kullanıcı Durumu',
    description: 'Kayıt sırasında kullanıcı durumu manuel olarak değiştirilebilir.',
    icon: '⚙️',
    badge: 'Yeni Özellik',
    type: 'toggle'
  },
  {
    key: 'forceRegister',
    title: 'Üyelik Zorunlu',
    description: 'Ziyaretçilerin sipariş için üye olmasını zorunlu hale getirin.',
    icon: '🔒',
    type: 'toggle'
  },
  {
    key: 'noteActive',
    title: 'Sipariş Notu',
    description: 'Müşteri sipariş adımında not alanına yazı yazabilir.',
    icon: '📝',
    type: 'toggle'
  },
  {
    key: 'cancelAllowed',
    title: 'Sipariş İptal İzni',
    description: 'Müşteri onaylanmamış siparişi iptal edebilsin.',
    icon: '❌',
    type: 'toggle'
  },
  {
    key: 'restockOnCancel',
    title: 'Stok Güncelleme',
    description: 'İptal edilen siparişlerin stokları geri eklensin.',
    icon: '🔄',
    type: 'toggle'
  },
  {
    key: 'orderNoteText',
    title: 'Sipariş Notu Açıklaması',
    description: 'Sipariş notu altına görünen açıklama.',
    icon: '🗒️',
    type: 'textarea'
  },
  {
    key: 'invoiceSerial',
    title: 'Fatura Seri Numarası',
    description: 'Fatura üzerinde yazacak numara.',
    icon: '📄',
    type: 'text'
  },
  {
    key: 'separateItems',
    title: 'Ürünleri Ayır',
    description: 'Aynı ürünleri sepet içinde ayırmak için kullanılır.',
    icon: '🧮',
    type: 'toggle'
  },
  {
    key: 'priceBased',
    title: 'Fiyat Bazlı Ürünler',
    description: 'Fiyata göre ürünleri sıralamak için kullanılır.',
    icon: '📊',
    type: 'toggle'
  },
  {
    key: 'minAmount',
    title: 'Minimum Sipariş Tutarı (TL)',
    description: 'Müşterilerin bu tutarın altında sipariş vermesini engelleyin.',
    icon: '💰',
    type: 'number'
  }
]

const orderRequiredFields = [
  {
    key: 'reqTCKN',
    title: 'TC/VKN Bilgisi',
    icon: '🆔'
  },
  {
    key: 'reqEmail',
    title: 'Eposta Adresi',
    icon: '📧'
  }
]

const fastSaleFields = [
  {
    key: 'reqNameFast',
    title: 'Müşteri Adı',
    icon: '👤'
  },
  {
    key: 'reqPhoneFast',
    title: 'Telefon Numarası',
    icon: '📞'
  },
  {
    key: 'reqAddressFast',
    title: 'Adres Bilgisi',
    icon: '🏠'
  },
  {
    key: 'reqTerminalFast',
    title: 'Satış Terminali',
    icon: '🖥️'
  }
]

const saveSettings = () => {
  console.log('Ayarlar kaydedildi:', formData)
  alert('Ayarlar başarıyla kaydedildi.')
}
</script>

<style scoped>
.orders-settings {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 30px;
  font-family: 'Inter', sans-serif;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: background-color 0.3s, border-color 0.3s;
}
html.dark .orders-settings {
  background: #1f1f1f;
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
  margin-bottom: 20px;
  gap: 16px;
  flex-wrap: wrap;
}

.setting-icon {
  font-size: 24px;
  min-width: 40px;
  text-align: center;
  margin-top: 5px;
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
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}
html.dark .setting-title {
  color: #f1f1f1;
}

.setting-description {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 10px;
}
html.dark .setting-description {
  color: #a1a1aa;
}

.setting-control {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  width: 100%;
  background-color: #ffffff;
  color: #1f2937;
  transition: background-color 0.3s, border-color 0.3s;
}
html.dark .setting-control {
  background-color: #2c2c2c;
  color: #f1f1f1;
  border-color: #555;
}

.setting-control[type='checkbox'] {
  width: auto;
}

.textarea {
  min-height: 80px;
}

.badge {
  background-color: #ef4444;
  color: white;
  padding: 2px 8px;
  font-size: 12px;
  border-radius: 6px;
}
html.dark .badge {
  background-color: #f87171;
  color: #fff;
}

.section-divider {
  margin: 30px 0 20px;
  font-weight: 600;
  color: #334155;
  font-size: 15px;
}
html.dark .section-divider {
  color: #cbd5e1;
}

.save-btn {
  margin-top: 32px;
  background-color: #3b82f6;
  color: white;
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}
.save-btn:hover {
  background-color: #2563eb;
}

/* Responsive */
@media (max-width: 640px) {
  .orders-settings {
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