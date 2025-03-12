<template>
  <div class="app-container">
    <SidebarComponent :isCollapsed="isSidebarCollapsed" />
    <div class="main-content">
      <HeaderComponent @toggle-sidebar="toggleSidebar" />

      <!-- OrderTabs sadece belirlenen sipariş sayfalarında gösterilecek -->
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
      // OrderTabs sadece bu sayfalarda görünecek
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

<style>
.app-container {
  display: flex;
}
.main-content {
  margin-left: 250px;
  width: calc(100% - 250px);
  padding: 20px;
  transition: margin-left 0.3s ease-in-out;
}
.sidebar.collapsed + .main-content {
  margin-left: 80px;
  width: calc(100% - 80px);
}
</style>
