<template>
  <div class="layout-container">
    <nav class="top-menu">
      <router-link
        :to="{ path: '/contents/url-management/url-redirect' }"
        :class="{ active: $route.path === '/contents/url-management/url-redirect' }"
      >
        URL Yönlendirme
      </router-link>
      <router-link
        :to="{ path: '/contents/url-management/404-reports' }"
        :class="{ active: $route.path === '/contents/url-management/404-reports' }"
      >
        404 URL Raporları
      </router-link>
    </nav>

    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "UrlLayout",
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
</style>