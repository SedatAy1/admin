<template>
  <div class="settings-layout">
    <!-- SOL: Ayar Menüsü -->
    <aside class="settings-sidebar">
      <ul>
        <li
          v-for="item in menuItems"
          :key="item.route"
          :class="{ active: isActive(item.route) }"
          @click="navigateTo(item.route)"
        >
          {{ item.label }}
        </li>
      </ul>
    </aside>

    <!-- SAĞ: İçerik -->
    <section class="settings-content">
      <router-view />
    </section>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const menuItems = [
  { label: "Genel Ayarlar", route: "general" },
  { label: "SEO Ayarları", route: "seo" },
  { label: "Pazarlama Araçları", route: "marketing" },
  { label: "Sözleşmeler", route: "contracts" },
  { label: "Sipariş Ayarları", route: "orders" },
  { label: "Ürün Ayarları", route: "products" },
  { label: "Ödeme Yöntemleri", route: "payment-methods" },
  { label: "Döviz Kurları", route: "exchange-rates" },
  { label: "Kargo Firmaları", route: "shipping-companies" },
  { label: "Kargo Ayarları", route: "shipping" },
  { label: "Montaj Noktaları", route: "assembly-points" },
  { label: "Ülkeler", route: "countries" },
  { label: "Diller", route: "languages" },
  { label: "SMS Ayarları", route: "sms" },
  { label: "SMS Şablonları", route: "sms-templates" },
  { label: "E-Posta Ayarları", route: "email" },
  { label: "E-Posta Şablonları", route: "email-templates" },
  { label: "Bakım Modu", route: "maintenance" },
  { label: "Bakiye Ayarları", route: "balance" },
  { label: "Bayi Ayarları", route: "dealer" },
  { label: "Bayi XML Ayarları", route: "dealer-xml" },
  { label: "Hızlı Ödeme Ayarları", route: "quick-payment" },
  { label: "Web Servis Ayarları", route: "web-service" },
  { label: "Yönetici Hesapları", route: "admin-accounts" },
  { label: "Güvenlik Ayarları", route: "security" },
  { label: "Site Ayarları", route: "site" }
]

const navigateTo = (path) => {
  router.push(`/settings/${path}`)
}

const isActive = (path) => {
  return route.path.startsWith(`/settings/${path}`)
}
</script>

<style scoped>
.settings-layout {
  display: flex;
  padding: 20px;
  background-color: #f9fafb;
  min-height: 100vh;
  gap: 24px;
}

/* Sidebar */
.settings-sidebar {
  width: 260px;
  background-color: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.settings-sidebar ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.settings-sidebar li {
  padding: 12px 16px;
  margin-bottom: 10px;
  border-radius: 8px;
  color: #334155;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s, color 0.2s;
}

.settings-sidebar li:hover {
  background-color: #e0f2fe;
  color: #0369a1;
}

.settings-sidebar li.active {
  background-color: #3b82f6;
  color: white;
  font-weight: 600;
}

/* İçerik */
.settings-content {
  flex: 1;
  background-color: white;
  padding: 32px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.03);
}
</style>