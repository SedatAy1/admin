<template>
  <div class="content-layout">
    <div class="tab-menu">
      <router-link
        v-for="tab in tabs"
        :key="tab.route"
        :to="tab.route"
        class="nav-button"
        :class="{ active: $route.path === tab.route }"
      >
        {{ $t(tab.label) }}
      </router-link>
    </div>

    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContentManagementTabs",
  data() {
    return {
      tabs: [
        { label: "contentTabs.pages", route: "/contents/content-management/pages" },
        { label: "contentTabs.help", route: "/contents/content-management/help" },
        { label: "contentTabs.faq", route: "/contents/content-management/faq" },
        { label: "contentTabs.blog", route: "/contents/content-management/blog" },
        { label: "contentTabs.slides", route: "/contents/content-management/slides" },
        { label: "contentTabs.banners", route: "/contents/content-management/banners" },
        { label: "contentTabs.popup", route: "/contents/content-management/popup" },
        { label: "contentTabs.upload", route: "/contents/content-management/upload" }
      ]
    };
  }
};
</script>

<style scoped>
/* Sayfanın genel yapısı */
.content-layout {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

/* Üst Menü */
.tab-menu {
  display: flex;
  justify-content: flex-start;
  gap: 8px;
  padding-bottom: 10px;
  border-bottom: 2px solid #ddd;
  background: white;
  flex-wrap: wrap;
}

/* Butonlar */
.nav-button {
  text-decoration: none;
  padding: 6px 12px;
  background: white;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 13px;
  transition: 0.3s;
  white-space: nowrap;
}

.nav-button:hover {
  background: #f1f1f1;
}

.nav-button.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

/* İçerik Alanı */
.content {
  padding: 20px;
}
</style>