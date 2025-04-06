<template>
  <header class="header d-flex justify-content-between align-items-center px-3 py-2 shadow-sm">
    <!-- Sol Taraf: Hamburger Menü ve Arama Kutusu -->
    <div class="left-section d-flex align-items-center">
      <button class="btn btn-light me-2" @click="toggleSidebar">
        <i class="bi bi-list"></i>
      </button>
      <div class="search-bar">
        <input type="text" class="form-control" :placeholder="$t('searchPlaceholder')" />
      </div>
    </div>

    <!-- Sağ Taraf -->
    <div class="d-flex align-items-center gap-3">
      <!-- Dil Seçici -->
      <select v-model="currentLanguage" @change="changeLanguage" class="form-select form-select-sm w-auto">
        <option value="en">English</option>
        <option value="tr">Türkçe</option>
      </select>

      <!-- Tema Değiştirici -->
      <button class="btn btn-light icon-btn" @click="toggleTheme">
        <i :class="isDarkMode ? 'bi bi-moon-fill' : 'bi bi-sun-fill'"></i>
      </button>

      <!-- Sepet -->
      <button class="btn btn-light icon-btn position-relative">
        <i class="bi bi-cart2"></i>
        <span class="badge">5</span>
      </button>

      <!-- Bildirim -->
      <button class="btn btn-light icon-btn position-relative">
        <i class="bi bi-bell"></i>
      </button>

      <!-- Tam ekran -->
      <button class="btn btn-light icon-btn" @click="toggleFullscreen">
        <i class="bi bi-arrows-fullscreen"></i>
      </button>

      <!-- Kullanıcı Avatarı -->
      <div class="dropdown" ref="dropdown">
        <button class="btn btn-light user-btn" @click="toggleDropdown">
          <img src="https://static-00.iconduck.com/assets.00/user-icon-1024x1024-dtzturco.png" alt="User Avatar" class="avatar" />
        </button>
        <ul v-show="isDropdownOpen" class="dropdown-menu user-dropdown shadow p-3 border-0 rounded-4">
          <li class="d-flex align-items-center gap-2 mb-2">
            <User class="text-muted" size="20" />
            <span>Hesabım</span>
          </li>
          <li class="d-flex align-items-center gap-2 mb-2">
            <Mail class="text-muted" size="20" />
            <span>Gelen Kutusu</span>
            <span class="badge bg-success ms-auto">27</span>
          </li>
          <li class="d-flex align-items-center gap-2 mb-2">
            <ClipboardList class="text-muted" size="20" />
            <span>Görevler</span>
          </li>
          <li class="d-flex align-items-center gap-2 mb-2">
            <Settings class="text-muted" size="20" />
            <span>Ayarlar</span>
          </li>
          <li class="d-flex align-items-center gap-2 mb-2">
            <Headphones class="text-muted" size="20" />
            <span>Destek</span>
          </li>
          <li class="d-flex align-items-center gap-2 text-danger fw-semibold">
            <LogOut class="text-danger" size="20" />
            <span>Çıkış Yap</span>
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
.user-dropdown {
  min-width: 220px;
  right: 0;
  left: auto;
  transform: translateX(-10%);
  white-space: nowrap;
  z-index: 9999;
  display: block;
  position: absolute;
  background: white;
}

.dropdown {
  position: relative;
}

.header {
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.left-section {
  display: flex;
  align-items: center;
}

.search-bar input {
  width: 250px;
  border-radius: 5px;
  padding: 5px;
}

.icon-btn {
  font-size: 20px;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
}

.badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #17a2b8;
  color: white;
  font-size: 12px;
  border-radius: 50%;
  padding: 3px 7px;
}

.user-btn {
  padding: 0;
  border: none;
  background: none;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid white;
  background: #6a5acd;
  padding: 3px;
}

.form-select {
  min-width: 120px;
  font-size: 14px;
  padding: 5px;
}

.dashboard {
  margin-left: 260px;
  padding: 20px;
  background-color: aqua;
  padding-right: 100px;
}

.stats {
  display: flex;
  gap: 10px;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}
</style>