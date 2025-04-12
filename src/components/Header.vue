<template>
  <header class="header d-flex justify-content-between align-items-center px-3 py-2 shadow-sm">
    <!-- Sol Taraf -->
    <div class="left-section d-flex align-items-center">
      <button class="btn btn-light me-2" @click="toggleSidebar">
        <i class="bi bi-list"></i>
      </button>
      <div class="search-bar">
        <input type="text" class="form-control" :placeholder="$t('header.search')" />
      </div>
    </div>

    <!-- Sağ Taraf -->
    <div class="d-flex align-items-center gap-3">
      <select v-model="currentLanguage" @change="changeLanguage" class="form-select form-select-sm w-auto">
        <option value="en">English</option>
        <option value="tr">Türkçe</option>
      </select>

      <button class="btn btn-light icon-btn" @click="toggleTheme">
        <i :class="isDarkMode ? 'bi bi-moon-fill' : 'bi bi-sun-fill'"></i>
      </button>

      <button class="btn btn-light icon-btn position-relative">
        <i class="bi bi-cart2"></i>
        <span class="badge">5</span>
      </button>

      <button class="btn btn-light icon-btn position-relative">
        <i class="bi bi-bell"></i>
      </button>

      <button class="btn btn-light icon-btn" @click="toggleFullscreen">
        <i class="bi bi-arrows-fullscreen"></i>
      </button>

      <!-- Avatar ve Dropdown -->
      <div class="dropdown" ref="dropdown">
        <button class="btn btn-light user-btn" @click.stop="toggleDropdown">
          <img
            src="https://static-00.iconduck.com/assets.00/user-icon-1024x1024-dtzturco.png"
            alt="User Avatar"
            class="avatar"
          />
        </button>
        <ul v-show="isDropdownOpen" class="user-dropdown shadow p-3 border-0 rounded-4">
          <li class="d-flex align-items-center gap-2 mb-2">
            <User class="text-muted" size="20" />
            <span>{{ $t('header.account') }}</span>
          </li>
          <li class="d-flex align-items-center gap-2 mb-2">
            <Mail class="text-muted" size="20" />
            <span>{{ $t('header.inbox') }}</span>
            <span class="badge bg-success ms-auto">27</span>
          </li>
          <li class="d-flex align-items-center gap-2 mb-2">
            <ClipboardList class="text-muted" size="20" />
            <span>{{ $t('header.tasks') }}</span>
          </li>
          <li class="d-flex align-items-center gap-2 mb-2">
            <Settings class="text-muted" size="20" />
            <span>{{ $t('header.settings') }}</span>
          </li>
          <li class="d-flex align-items-center gap-2 mb-2">
            <Headphones class="text-muted" size="20" />
            <span>{{ $t('header.support') }}</span>
          </li>
          <li class="d-flex align-items-center gap-2 text-danger fw-semibold">
            <LogOut class="text-danger" size="20" />
            <span>{{ $t('header.logout') }}</span>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import {
  User,
  Mail,
  ClipboardList,
  Settings,
  Headphones,
  LogOut
} from "lucide-vue-next";

export default {
  name: "HeaderComponent",
  components: {
    User,
    Mail,
    ClipboardList,
    Settings,
    Headphones,
    LogOut
  },
  data() {
    return {
      isDarkMode: localStorage.getItem("darkMode") === "true",
      currentLanguage: "en",
      isDropdownOpen: false
    };
  },
  created() {
    this.currentLanguage = this.$i18n.locale;
  },
  mounted() {
    this.applyDarkMode();
    document.addEventListener("click", this.handleOutsideClick);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleOutsideClick);
  },
  methods: {
    toggleSidebar() {
      this.$emit("toggle-sidebar");
    },
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem("darkMode", this.isDarkMode);
      this.applyDarkMode();
    },
    applyDarkMode() {
      const html = document.documentElement;
      const body = document.body;
      if (this.isDarkMode) {
        html.classList.add("dark-mode");
        body.classList.add("dark-mode");
      } else {
        html.classList.remove("dark-mode");
        body.classList.remove("dark-mode");
      }
    },
    toggleFullscreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    },
    changeLanguage() {
      this.$i18n.locale = this.currentLanguage;
      this.$store.dispatch("changeLanguage", this.currentLanguage);
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    handleOutsideClick(event) {
      if (this.$refs.dropdown && !this.$refs.dropdown.contains(event.target)) {
        this.isDropdownOpen = false;
      }
    }
  }
};
</script>

<style scoped>
:root {
  --primary: #6c63ff;
  --light-bg: #ffffff;
  --dark-bg: #1e1e2f;
  --light-text: #333333;
  --dark-text: #f5f5f5;
  --radius: 12px;
  --transition: all 0.3s ease;
}

/* === Header Alanı === */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: var(--light-bg);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  color: var(--light-text);
  transition: var(--transition);
}

/* Sol */
.left-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search-bar input {
  width: clamp(180px, 30vw, 250px);
  padding: 10px 14px;
  border-radius: var(--radius);
  border: 1px solid #ccc;
  color: var(--light-text);
  background: #fff;
  transition: var(--transition);
}

.search-bar input:focus {
  border-color: var(--primary);
  outline: none;
  box-shadow: 0 0 0 2px rgba(108, 99, 255, 0.2);
}

/* Sağ */
.right-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.form-select {
  border-radius: var(--radius);
  padding: 6px 10px;
  border: 1px solid #ccc;
  background: #fff;
  color: var(--light-text);
  font-size: 14px;
  transition: var(--transition);
}

.icon-btn {
  background: #f7f7f7;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 8px;
  cursor: pointer;
  font-size: 1.25rem;
  color: var(--light-text);
  position: relative;
  transition: var(--transition);
}

.icon-btn:hover {
  background-color: #f0f0f0;
  transform: scale(1.05);
  color: var(--primary);
}

/* Rozet */
.badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: var(--primary);
  color: #fff;
  font-size: 11px;
  border-radius: 50%;
  padding: 2px 6px;
  line-height: 1;
}

/* Avatar */
.user-btn {
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
}

.avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--primary);
  transition: var(--transition);
}

.avatar:hover {
  transform: scale(1.05) rotate(5deg);
}

/* Dropdown Menü */
.dropdown {
  position: relative;
}

.user-dropdown {
  position: absolute;
  top: 115%;
  right: 0;
  background: rgba(255, 255, 255, 0.98); /* Daha opak */
  color: var(--light-text);
  border-radius: var(--border-radius);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  min-width: 220px;
  z-index: 1000;
  padding: 0.5rem 0;
  animation: fadeIn 0.2s ease;
  backdrop-filter: blur(4px); /* varsa korunsun */
}

/* Menü içeriği */
.user-dropdown li {
  background: transparent; /* arkası tamamen şeffaf olmasın */
  color: #333; /* yazı koyu */
}

.user-dropdown li:hover {
  background-color: #f1f1f1;
}

.user-dropdown .logout {
  color: #dc3545;
  font-weight: 600;
}

/* Dark Mode */
.dark-mode .header {
  background: var(--dark-bg);
  color: var(--dark-text);
}

.dark-mode .search-bar input,
.dark-mode .form-select {
  background: #2c2c3e;
  color: #fff;
  border: 1px solid #444;
}

.dark-mode .icon-btn {
  background: #2c2c3e;
  color: #f5f5f5;
  border-color: #444;
}

.dark-mode .icon-btn:hover {
  background: #3a3a4e;
}

.dark-mode .user-dropdown {
  background: #2c2c3e;
  color: #fff;
}

.dark-mode .user-dropdown li:hover {
  background: #3a3a4e;
}

/* Animasyon */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .search-bar input {
    width: 100%;
  }

  .user-dropdown {
    right: 10px;
  }
}
</style>