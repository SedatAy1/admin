<template>
  <div class="layout-container">
    <nav class="top-menu">
      <router-link to="/design/theme-settings" active-class="active">Tema Ayarları</router-link>
      <router-link to="/design/module-layout" active-class="active">Modül Yerleşimi</router-link>
      <router-link to="/design/print-templates" active-class="active">Yazdırma Şablonları</router-link>
      <router-link to="/design/email-templates" active-class="active">E-Posta Tasarımları</router-link>
    </nav>

    <!-- Değişiklik burada: <slot /> yerine router-view -->
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

.top-menu {
  display: flex;
  gap: 10px;
  padding: 12px;
  background-color: white;
  border-bottom: 2px solid #e0e0e0;
  flex-wrap: wrap;
}

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

.content {
  padding: 20px;
}
</style>