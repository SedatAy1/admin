<template>
  <div class="template-page">
    <div class="info-box">
      <p>
        📌 {{ $t('templatePage.info1') }}<br />
        {{ $t('templatePage.info2') }}
      </p>
    </div>

    <div class="template-grid">
      <div
        v-for="(template, index) in templates"
        :key="index"
        class="template-card"
        @click="selectTemplate(template.key)"
      >
        <div class="icon">
          <img :src="template.icon" alt="icon" v-if="template.icon" />
          <i :class="template.fallbackIcon" v-else></i>
        </div>
        <span>{{ $t(`templatePage.templates.${template.key}`) }}</span>
      </div>
    </div>

    <!-- Modallar -->
    <Teleport to="body">
      <EInvoiceTemplate
        v-if="activeTemplate === 'eInvoice'"
        @close="activeTemplate = null"
      />
      <InvoiceTemplate
        v-if="activeTemplate === 'invoice'"
        @close="activeTemplate = null"
      />
      <ShippingLabelTemplate
        v-if="activeTemplate === 'shippingLabel'"
        @close="activeTemplate = null"
      />
      <ReceiptTemplate
        v-if="activeTemplate === 'receipt'"
        @close="activeTemplate = null"
      />
      <ProductTemplate
        v-if="['product1', 'product2', 'product3', 'product4'].includes(activeTemplate)"
        :title="$t(`templatePage.templates.${activeTemplate}`)"
        @close="activeTemplate = null"
      />
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import EInvoiceTemplate from '@/views/design/templates/EInvoiceTemplate.vue'
import InvoiceTemplate from '@/views/design/templates/InvoiceTemplate.vue'
import ShippingLabelTemplate from '@/views/design/templates/ShippingLabelTemplate.vue'
import ReceiptTemplate from '@/views/design/templates/ReceiptTemplate.vue'
import ProductTemplate from '@/views/design/templates/ProductTemplate.vue'

const activeTemplate = ref(null)

const templates = [
  {
    key: "eInvoice",
    icon: "https://upload.wikimedia.org/wikipedia/commons/4/48/E-Fatura_logo.png"
  },
  {
    key: "invoice",
    fallbackIcon: "fas fa-file-invoice"
  },
  {
    key: "shippingLabel",
    fallbackIcon: "fas fa-truck"
  },
  {
    key: "receipt",
    fallbackIcon: "fas fa-receipt"
  },
  {
    key: "product1",
    fallbackIcon: "fas fa-tag"
  },
  {
    key: "product2",
    fallbackIcon: "fas fa-tag"
  },
  {
    key: "product3",
    fallbackIcon: "fas fa-tag"
  },
  {
    key: "product4",
    fallbackIcon: "fas fa-tag"
  }
]

const selectTemplate = (key) => {
  activeTemplate.value = key
}
</script>
<style scoped>
.template-page {
  padding: 24px;
  font-family: 'Segoe UI', sans-serif;
  transition: background-color 0.3s ease;
}
html.dark .template-page {
  background-color: #181818;
  color: #f1f1f1;
}

/* Bilgi Kutusu */
.info-box {
  background-color: #eaf6ff;
  border-left: 4px solid #38bdf8;
  padding: 16px 20px;
  border-radius: 8px;
  color: #0f172a;
  font-size: 14px;
  margin-bottom: 24px;
}
html.dark .info-box {
  background-color: #1e3a8a;
  color: #bfdbfe;
  border-left-color: #0ea5e9;
}

/* Grid */
.template-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

/* Kart */
.template-card {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px 16px;
  text-align: center;
  cursor: pointer;
  transition: box-shadow 0.2s ease, transform 0.2s ease, background-color 0.3s;
}
.template-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.06);
  transform: translateY(-2px);
}
html.dark .template-card {
  background-color: #232323;
  border-color: #444;
}

/* Kart içi ikon */
.template-card .icon {
  font-size: 32px;
  margin-bottom: 12px;
  color: #334155;
}
html.dark .template-card .icon {
  color: #e2e8f0;
}

/* Görsel */
.template-card img {
  max-width: 48px;
  margin-bottom: 12px;
  filter: brightness(0.95);
}
html.dark .template-card img {
  filter: brightness(0.85);
}

/* Başlık */
.template-card span {
  font-weight: 500;
  font-size: 14px;
  color: #1e293b;
}
html.dark .template-card span {
  color: #f1f1f1;
}

/* Responsive */
@media (max-width: 600px) {
  .template-page {
    padding: 16px;
  }

  .template-card {
    padding: 20px 12px;
  }

  .template-card .icon {
    font-size: 28px;
  }

  .template-card span {
    font-size: 13px;
  }
}
</style>