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
          {{ $t(`settingsMenu.${item.route}`) }}
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
  { route: "general" },
  { route: "seo" },
  { route: "marketing" },
  { route: "contracts" },
  { route: "orders" },
  { route: "products" },
  { route: "payment-methods" },
  { route: "exchange-rates" },
  { route: "shipping-companies" },
  { route: "shipping" },
  { route: "assembly-points" },
  { route: "countries" },
  { route: "languages" },
  { route: "sms" },
  { route: "sms-templates" },
  { route: "email" },
  { route: "email-templates" },
  { route: "maintenance" },
  { route: "balance" },
  { route: "dealer" },
  { route: "dealer-xml" },
  { route: "quick-payment" },
  { route: "web-service" },
  { route: "admin-accounts" },
  { route: "security" },
  { route: "site" }
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
  flex-wrap: wrap;
}
html.dark .settings-layout {
  background-color: #1e293b;
}

/* Sidebar */
.settings-sidebar {
  width: 260px;
  background-color: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: background-color 0.3s, color 0.3s;
}
html.dark .settings-sidebar {
  background-color: #334155;
  border-color: #475569;
  color: #f1f5f9;
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
html.dark .settings-sidebar li {
  color: #cbd5e1;
}

.settings-sidebar li:hover {
  background-color: #e0f2fe;
  color: #0369a1;
}
html.dark .settings-sidebar li:hover {
  background-color: #1e40af;
  color: white;
}

.settings-sidebar li.active {
  background-color: #3b82f6;
  color: white;
  font-weight: 600;
}
html.dark .settings-sidebar li.active {
  background-color: #2563eb;
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
html.dark .settings-content {
  background-color: #1f2937;
  border-color: #475569;
  color: #f1f5f9;
}

/* Responsive */
@media (max-width: 768px) {
  .settings-layout {
    flex-direction: column;
  }

  .settings-sidebar {
    width: 100%;
    order: 2;
  }

  .settings-content {
    order: 1;
    width: 100%;
    padding: 24px;
  }
}
</style>