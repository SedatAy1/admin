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
      <!-- Dil Seçici -->
      <div class="language-switcher" @click="toggleLangDropdown" ref="langDropdown">
        <img
          :src="currentLanguage === 'tr'
            ? '/src/assets/png-transparent-flag-of-turkey-turkish-flag-miscellaneous-flag-turkey-thumbnail.png'
            : '/src/assets/png-transparent-flag-of-england-flag-of-the-united-kingdom-english-flag-of-great-britain-england-english-flag-world-thumbnail.png'"
          alt="Lang"
          class="flag"
        />
        <ul v-show="isLangDropdownOpen" class="lang-dropdown shadow">
          <li @click="changeLang('tr')">
            <img src="/src/assets/png-transparent-flag-of-turkey-turkish-flag-miscellaneous-flag-turkey-thumbnail.png" />
            Türkçe
          </li>
          <li @click="changeLang('en')">
            <img src="/src/assets/png-transparent-flag-of-england-flag-of-the-united-kingdom-english-flag-of-great-britain-england-english-flag-world-thumbnail.png" />
            English
          </li>
        </ul>
      </div>

      <button class="btn btn-light icon-btn" @click="toggleTheme">
        <i :class="isDarkMode ? 'bi bi-moon-fill' : 'bi bi-sun-fill'"></i>
      </button>

      <button class="btn btn-light icon-btn position-relative">
        <i class="bi bi-cart2"></i>
        <span class="badge"></span>
      </button>

      <!-- Ayarlar Butonu -->
      <button class="btn btn-light icon-btn" @click.stop="toggleSettingsPanel">
        <i class="bi bi-gear-fill"></i>
      </button>

      <button class="btn btn-light icon-btn" @click="toggleFullscreen">
        <i class="bi bi-arrows-fullscreen"></i>
      </button>

      <!-- Avatar ve Menü -->
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

  <!-- Tema Ayar Paneli -->
  <Teleport to="body">
    <div v-if="showSettingsPanel" class="settings-panel" ref="settingsPanel">
      <div class="settings-header d-flex justify-content-between align-items-center">
        <h5>Setting</h5>
        <button @click="toggleSettingsPanel" class="close-btn"><i class="bi bi-x-lg"></i></button>
      </div>
      <div class="settings-body">
        <div class="setting-group" v-for="(section, i) in settings" :key="i">
          <h6>{{ section.title }}</h6>
          <div class="options">
            <button
              v-for="(opt, j) in section.options"
              :key="j"
              class="option-btn"
              :class="{ active: opt.active }"
              @click="selectOption(i, j)"
            >
              {{ opt.label }}
            </button>
          </div>
        </div>
        <button class="clear-btn" @click="resetSettings">Clear all</button>
      </div>
    </div>
  </Teleport>
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
      isDropdownOpen: false,
      isLangDropdownOpen: false,
      showSettingsPanel: false,
      settings: [
        {
          title: "Theme color mode:",
          options: [
            { label: "Light", active: true },
            { label: "Dark", active: false }
          ]
        },
        {
          title: "Layout width style",
          options: [
            { label: "Full width", active: true },
            { label: "Boxed", active: false }
          ]
        },
        {
          title: "Vertical & Horizontal menu style",
          options: [
            { label: "Menu click", active: true },
            { label: "Icon hover", active: false },
            { label: "Icon default", active: false }
          ]
        },
        {
          title: "Menu position",
          options: [
            { label: "Fixed", active: true },
            { label: "Scrollable", active: false }
          ]
        },
        {
          title: "Header positions",
          options: [
            { label: "Fixed", active: true },
            { label: "Scrollable", active: false }
          ]
        },
        {
          title: "Loader",
          options: [
            { label: "Enable", active: true },
            { label: "Disable", active: false }
          ]
        }
      ]
    };
  },
  created() {
    const storedLang = localStorage.getItem("lang");
    if (storedLang) {
      this.currentLanguage = storedLang;
      this.$i18n.locale = storedLang;
    } else {
      this.currentLanguage = this.$i18n.locale;
    }
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
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    toggleLangDropdown() {
      this.isLangDropdownOpen = !this.isLangDropdownOpen;
    },
    toggleSettingsPanel() {
      this.showSettingsPanel = !this.showSettingsPanel;
    },
    changeLang(lang) {
      this.currentLanguage = lang;
      this.$i18n.locale = lang;
      localStorage.setItem("lang", lang);
      this.isLangDropdownOpen = false;
      this.$store.dispatch("changeLanguage", lang);
    },
    handleOutsideClick(event) {
      if (this.$refs.dropdown && !this.$refs.dropdown.contains(event.target)) {
        this.isDropdownOpen = false;
      }
      if (this.$refs.langDropdown && !this.$refs.langDropdown.contains(event.target)) {
        this.isLangDropdownOpen = false;
      }
      if (this.$refs.settingsPanel && !this.$refs.settingsPanel.contains(event.target)) {
        this.showSettingsPanel = false;
      }
    },
    selectOption(groupIndex, optionIndex) {
      this.settings[groupIndex].options.forEach((opt, idx) => {
        opt.active = idx === optionIndex;
      });
    },
    resetSettings() {
      this.settings.forEach(group => {
        group.options.forEach((opt, i) => {
          opt.active = i === 0;
        });
      });
    }
  }
};
</script>
<style scoped>
:root {
  --primary: #5b4ddb;
  --light-bg: #ffffff;
  --dark-bg: #1e1e2f;
  --light-text: #1f2937;
  --dark-text: #f5f5f5;
  --radius: 12px;
  --transition: all 0.3s ease;
}
.option-btn.active[data-v-c970699f] {
    background: var(--primary);
    color: white;
    border-color: var(--primary);
    font-weight: 500;
    background-color: #5b4ddb;
}



/* === HEADER === */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--light-bg);
  padding: 16px 24px;
  border-bottom: 1px solid #e5e7eb;
  font-family: 'Inter', sans-serif;
  z-index: 100;
}

.left-section {
  display: flex;
  align-items: center;
  gap: 18px;
}

.search-bar {
  position: relative;
}
.search-bar input {
  background: #f3f4f6;
  border: none;
  padding: 10px 14px 10px 40px;
  border-radius: 999px;
  font-size: 14px;
  color: #374151;
  width: 260px;
}
.search-bar::before {
  content: "🔍";
  position: absolute;
  top: 50%;
  left: 14px;
  transform: translateY(-50%);
  font-size: 16px;
  color: #6b7280;
}

.d-flex.align-items-center.gap-3 {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* === LANGUAGE === */
.language-switcher {
  position: relative;
  cursor: pointer;
}
.language-switcher .flag {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e5e7eb;
}

.lang-dropdown {
  position: absolute;
  top: 120%;
  right: 0;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 140px;
  overflow: hidden;
}

.lang-dropdown li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s ease;
}
.lang-dropdown li:hover {
  background: #f3f4f6;
}
.lang-dropdown img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

/* === ICONS === */
.icon-btn {
  background: #f3f4f6;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  font-size: 18px;
  color: #374151;
  transition: var(--transition);
}
.icon-btn:hover {
  background: #e5e7eb;
  color: var(--primary);
  transform: scale(1.05);
}

.badge {
  position: absolute;
  top: 4px;
  right: 4px;
  background: #ef4444;
  color: white;
  font-size: 11px;
  border-radius: 999px;
  padding: 2px 5px;
}

/* === USER === */
.user-btn {
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 0;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
.dropdown {
  position: relative;
}
.user-dropdown {
  position: absolute;
  top: 110%;
  right: 0;
  background: white;
  border-radius: 16px;
  padding: 12px 16px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 200px;
  animation: dropdownFade 0.25s ease-out;
}
.user-dropdown li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  padding: 8px 6px;
  color: #374151;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;
}
.user-dropdown li:hover {
  background: #f3f4f6;
}
.user-dropdown .badge {
  margin-left: auto;
  background: #22c55e;
}

.user-dropdown li.text-danger {
  color: #ef4444;
  font-weight: 600;
}
.user-dropdown li.text-danger:hover {
  background: #fee2e2;
}

/* === SETTINGS PANEL === */
.settings-panel {
  position: absolute;
  top: 65px;
  right: 20px;
  width: 340px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  padding: 24px 20px;
  font-family: 'Inter', sans-serif;
  animation: dropdownFade 0.25s ease-out;
}

.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.settings-header h5 {
  font-weight: 700;
  font-size: 18px;
  color: #1f2937;
  margin: 0;
}
.settings-header .close-btn {
  background: none;
  border: none;
  font-size: 20px;
  color: #6b7280;
  cursor: pointer;
  transition: color 0.2s ease;
}
.settings-header .close-btn:hover {
  color: var(--primary);
}

.settings-body {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.setting-group h6 {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #374151;
}
.options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.option-btn {
  padding: 8px 20px;
  font-size: 14px;
  border-radius: 999px;
  border: 1px solid #d1d5db;
  background: #f9fafb;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
}
.option-btn:hover {
  background: #ede9fe;
  border-color: var(--primary);
  color: var(--primary);
}
.option-btn.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
  font-weight: 500;
}
.clear-btn {
  margin-top: 16px;
  padding: 12px 0;
  font-size: 14px;
  font-weight: 500;
  border-radius: 999px;
  background: var(--primary);
  color: white;
  border: none;
  transition: background 0.2s ease;
  width: 100%;
}
.clear-btn:hover {
  background: #4b3ed1;
}

@keyframes dropdownFade {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* === DARK MODE === */
.dark-mode .header {
  background: var(--dark-bg);
  color: var(--dark-text);
  border-bottom: 1px solid #334155;
}
.dark-mode .search-bar input {
  background: #1f2937;
  color: #f9fafb;
}
.dark-mode .search-bar::before {
  color: #9ca3af;
}
.dark-mode .icon-btn {
  background: #1f2937;
  color: #e5e7eb;
}
.dark-mode .icon-btn:hover {
  background: #334155;
  color: var(--primary);
}
.dark-mode .settings-panel {
  background: #1f2937;
  color: #f1f5f9;
}
.dark-mode .option-btn {
  background: #1e293b;
  border-color: #475569;
  color: #cbd5e1;
}
.dark-mode .option-btn:hover {
  background: #334155;
  color: var(--primary);
  border-color: var(--primary);
}
.dark-mode .option-btn.active {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}
.dark-mode .clear-btn {
  background: var(--primary);
}
.dark-mode .clear-btn:hover {
  background: #4338ca;
}
</style>