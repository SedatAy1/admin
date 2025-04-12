<template>
  <div class="layout-container">
    <nav class="top-menu">
      <router-link to="/design/theme-settings" active-class="active">
        {{ $t('designLayout.themeSettings') }}
      </router-link>
      <router-link to="/design/module-layout" active-class="active">
        {{ $t('designLayout.moduleLayout') }}
      </router-link>
      <router-link to="/design/print-templates" active-class="active">
        {{ $t('designLayout.printTemplates') }}
      </router-link>
      <router-link to="/design/email-templates" active-class="active">
        {{ $t('designLayout.emailTemplates') }}
      </router-link>
    </nav>

    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "DesignLayout",
};
</script>

<style scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

/* Üst Menü */
.top-menu {
  display: flex;
  gap: 10px;
  padding: 12px;
  background-color: white;
  border-bottom: 2px solid #e0e0e0;
  flex-wrap: wrap;
  overflow-x: auto;
  transition: background-color 0.3s ease;
}
html.dark .top-menu {
  background-color: #1e1e1e;
  border-color: #2c2c2c;
}

/* Menü Bağlantıları */
.top-menu a {
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  color: #333;
  padding: 12px 24px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  transition: all 0.3s ease;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  white-space: nowrap;
}
.top-menu a:hover {
  background-color: #f5f5f5;
}
.top-menu a.active {
  background-color: #3b82f6;
  color: white;
  border-color: #3b82f6;
  font-weight: 600;
  box-shadow: none;
}

html.dark .top-menu a {
  background-color: #2a2a2a;
  color: #f1f1f1;
  border-color: #444;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
}
html.dark .top-menu a:hover {
  background-color: #3a3a3a;
}
html.dark .top-menu a.active {
  background-color: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

/* İçerik Alanı */
.content {
  padding: 20px;
  transition: background-color 0.3s ease;
}
html.dark .content {
  background-color: #181818;
  color: #f1f1f1;
}

/* Responsive */
@media (max-width: 768px) {
  .top-menu {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding: 10px;
  }

  .top-menu a {
    padding: 10px 16px;
    font-size: 14px;
  }

  .content {
    padding: 15px;
  }
}
</style>