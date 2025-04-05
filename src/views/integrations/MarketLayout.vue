<template>
  <div class="layout-container">
    <nav class="top-menu">
      <router-link to="/integrations/marketplace" active-class="active">Pazaryeri Entegrasyonları</router-link>
      <router-link to="/integrations/accounting" active-class="active">Muhasebe Entegrasyonları</router-link>
      <router-link to="/integrations/excel" active-class="active">Hızlı Excel İşlemleri</router-link>
      <router-link to="/integrations/xml-import" active-class="active">XML İçeri Aktar</router-link>
      <router-link to="/integrations/xml-export" active-class="active">XML Dışarı Aktar</router-link>
      <router-link to="/integrations/bulk-marketplace" active-class="active">Toplu Pazaryeri İşlemleri</router-link>
      <router-link to="/integrations/hepsiburada" active-class="active">Hepsiburada İşlemleri</router-link>
      <router-link to="/integrations/monitor" active-class="active">Pazaryeri Monitorü</router-link>
    </nav>
    <div class="content">
      <slot /> <!-- Router içeriğini burada göster -->
    </div>
  </div>
</template>

<script>
export default {
  name: "MarketLayout",
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
