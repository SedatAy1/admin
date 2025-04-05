<template>
  <div class="template-page">
    <div class="info-box">
      <p>
        📌 Aşağıdaki butonlara tıklayarak şablonlarınızı düzenleyebilirsiniz.<br />
        Faturanızın görselini “Kağıt Örneği” alanına yükleyebilirsiniz.
      </p>
    </div>

    <div class="template-grid">
      <div
        v-for="(template, index) in templates"
        :key="index"
        class="template-card"
        @click="selectTemplate(template.name)"
      >
        <div class="icon">
          <img :src="template.icon" alt="icon" v-if="template.icon" />
          <i :class="template.fallbackIcon" v-else></i>
        </div>
        <span>{{ template.name }}</span>
      </div>
    </div>

    <!-- Modallar -->
    <Teleport to="body">
      <EInvoiceTemplate
        v-if="activeTemplate === 'E-Fatura / E-Arşiv Şablonu'"
        @close="activeTemplate = null"
      />
      <InvoiceTemplate
        v-if="activeTemplate === 'Fatura Şablonu'"
        @close="activeTemplate = null"
      />
      <ShippingLabelTemplate
        v-if="activeTemplate === 'Kargo Fişi Şablonu'"
        @close="activeTemplate = null"
      />
      <ReceiptTemplate
        v-if="activeTemplate === 'Fiş Şablonu'"
        @close="activeTemplate = null"
      />
      <ProductTemplate
        v-if="['Ürün Şablonu 1', 'Ürün Şablonu 2', 'Ürün Şablonu 3', 'Ürün Şablonu 4'].includes(activeTemplate)"
        :title="activeTemplate"
        @close="activeTemplate = null"
      />
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Modal bileşenleri
import EInvoiceTemplate from '@/views/design/templates/EInvoiceTemplate.vue'
import InvoiceTemplate from '@/views/design/templates/InvoiceTemplate.vue'
import ShippingLabelTemplate from '@/views/design/templates/ShippingLabelTemplate.vue'
import ReceiptTemplate from '@/views/design/templates/ReceiptTemplate.vue'
import ProductTemplate from '@/views/design/templates/ProductTemplate.vue' // ✅ Eklendi

const activeTemplate = ref(null)

const templates = [
  {
    name: "E-Fatura / E-Arşiv Şablonu",
    icon: "https://upload.wikimedia.org/wikipedia/commons/4/48/E-Fatura_logo.png"
  },
  {
    name: "Fatura Şablonu",
    fallbackIcon: "fas fa-file-invoice"
  },
  {
    name: "Kargo Fişi Şablonu",
    fallbackIcon: "fas fa-truck"
  },
  {
    name: "Fiş Şablonu",
    fallbackIcon: "fas fa-receipt"
  },
  {
    name: "Ürün Şablonu 1",
    fallbackIcon: "fas fa-tag"
  },
  {
    name: "Ürün Şablonu 2",
    fallbackIcon: "fas fa-tag"
  },
  {
    name: "Ürün Şablonu 3",
    fallbackIcon: "fas fa-tag"
  },
  {
    name: "Ürün Şablonu 4",
    fallbackIcon: "fas fa-tag"
  }
]

const selectTemplate = (name) => {
  activeTemplate.value = name
}
</script>

<style scoped>
.template-page {
  padding: 24px;
  font-family: 'Segoe UI', sans-serif;
}

.info-box {
  background-color: #eaf6ff;
  border-left: 4px solid #38bdf8;
  padding: 16px 20px;
  border-radius: 8px;
  color: #0f172a;
  font-size: 14px;
  margin-bottom: 24px;
}

.template-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.template-card {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px 16px;
  text-align: center;
  cursor: pointer;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.template-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.06);
  transform: translateY(-2px);
}

.template-card .icon {
  font-size: 32px;
  margin-bottom: 12px;
  color: #334155;
}

.template-card img {
  max-width: 48px;
  margin-bottom: 12px;
}

.template-card span {
  font-weight: 500;
  font-size: 14px;
  color: #1e293b;
}
</style>