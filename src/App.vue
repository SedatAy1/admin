<template>
  <div class="app-container">
    <!-- Sidebar -->
    <SidebarComponent
      :isCollapsed="isSidebarCollapsed"
      :class="{ 'mobile-open': isSidebarOpen }"
    />

    <!-- Mobilde karartma alanı -->
    <div
      v-if="isSidebarOpen && isMobile"
      class="overlay"
      @click="closeSidebar"
    ></div>

    <!-- Ana içerik -->
    <div class="main-content" :class="{ collapsed: isSidebarCollapsed }">
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
      isSidebarOpen: false,
      isMobile: window.innerWidth < 992,
    };
  },
  computed: {
    showOrderTabs() {
      return this.$route.path.startsWith("/orders");
    },
  },
  methods: {
    toggleSidebar() {
      if (this.isMobile) {
        this.isSidebarOpen = !this.isSidebarOpen;
      } else {
        this.isSidebarCollapsed = !this.isSidebarCollapsed;
      }
    },
    closeSidebar() {
      this.isSidebarOpen = false;
    },
    handleResize() {
      this.isMobile = window.innerWidth < 992;
      if (!this.isMobile) {
        this.isSidebarOpen = false;
      }
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Inter:wght@400;500;700&display=swap");

:root {
  --primary: #5b4ddb;
  --light-bg: #ffffff;
  --dark-bg: #1e1e2f;
  --light-text: #1f2937;
  --dark-text: #f5f5f5;
  --radius: 12px;
  --transition: all 0.3s ease;
}

body {
  font-family: 'DM Sans', 'Inter', sans-serif;
  font-size: 13px;
  background: #f4f4f4;
  margin: 0;
  padding: 0;
  line-height: 1.6;
}

h1, h2, h3 {
  font-weight: 600;
  letter-spacing: -0.5px;
}

p, td, th, span {
  font-weight: 400;
  font-size: 12.5px;
  line-height: 1.6;
}

.app-container {
  display: flex;
  min-height: 100vh;
  background: var(--light-bg);
  transition: background 0.3s ease;
}

html.dark .app-container {
  background: var(--dark-bg);
}

/* === MAIN CONTENT === */
.main-content {
  flex-grow: 1;
  padding: 20px;
  margin-left: 250px;
  width: calc(100% - 250px);
  background: var(--light-bg);
  color: var(--light-text);
  transition: all 0.3s ease;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.03);
}

.main-content.collapsed {
  margin-left: 80px !important;
  width: calc(100% - 80px) !important;
}

html.dark .main-content {
  background: #000000;
  color: var(--dark-text);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05);
}

/* === MOBİL === */
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
    background: var(--light-bg);
    border-right: 1px solid #e5e7eb;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 1050;
    padding: 20px;
    overflow-y: auto;
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
    z-index: 1049;
  }

  html.dark .sidebar {
    background: #0f172a !important;
    border-color: #1e293b;
  }
}

html.dark .sidebar {
  background-color: #0f172a !important;
  border-right: 1px solid #1e293b !important;
  color: white !important;
}
</style>