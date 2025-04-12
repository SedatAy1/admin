<template>
  <div class="app-container">
    <SidebarComponent :isCollapsed="isSidebarCollapsed" />
    <div class="main-content">
      <HeaderComponent @toggle-sidebar="toggleSidebar" />
      <OrderTabs v-if="showOrderTabs" />
      <router-view />
    </div>
  </div>
</template>

<script>
import SidebarComponent from "@/components/Sidebar.vue";
import HeaderComponent from "@/components/Header.vue";
import OrderTabs from "@/components/OrderTabs.vue";

export default {
  components: {
    SidebarComponent,
    HeaderComponent,
    OrderTabs,
  },
  data() {
    return {
      isSidebarCollapsed: false,
    };
  },
  computed: {
    showOrderTabs() {
      return [
        "/orders/new",
        "/orders/preparing",
        "/orders/shipped",
        "/orders/delivered",
        "/orders/requests",
        "/orders/cancelled",
        "/orders/incomplete",
      ].some(route => this.$route.path.startsWith(route));
    },
  },
  methods: {
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },
  },
};
</script>

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
  background: #f8f9fa;
  transition: background 0.3s ease;
}
html.dark .app-container {
  background: #0f172a;
}

/* Main Content */
.main-content {
  flex-grow: 1;
  padding: 20px;
  margin-left: 250px;
  width: calc(100% - 250px);
  background: #ffffff;
  color: #1f2937;
  transition: all 0.3s ease;
  box-shadow: inset 0 0 0 1px rgba(0,0,0,0.03); /* soft border */
}

html.dark .main-content {
  background: #1f2937; /* ✅ Koyu gri */
  color: #f1f5f9;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.05);
}

/* Collapsed Sidebar (Desktop) */
.sidebar.collapsed + .main-content {
  margin-left: 80px !important;
  width: calc(100% - 80px) !important;
}

/* Sidebar Temel Yapı (Mobil için) */
@media (max-width: 992px) {
  .app-container {
    flex-direction: column;
  }

  .main-content {
    margin-left: 0 !important;
    width: 100% !important;
    padding: 16px;
  }

  .sidebar {
    position: fixed !important;
    top: 0;
    left: 0;
    height: 100vh;
    width: 260px;
    background: #ffffff;
    border-right: 1px solid #e5e7eb;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 1001;
    padding: 20px;
    overflow-y: auto;
  }

  html.dark .sidebar {
    background: #0f172a !important;
    border-color: #1e293b;
  }

  .sidebar.mobile-open {
    transform: translateX(0);
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1000;
  }
}
html.dark .sidebar {
  background-color: #0f172a !important;
  border-right: 1px solid #1e293b !important;
  color: white !important;
}
</style>