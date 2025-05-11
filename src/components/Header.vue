<template>
  <header class="header">
    <!-- Sol: Arama -->
    <div class="left-section">
      <div class="search-bar">
        <i class="bi bi-search search-icon"></i>
        <input type="text" :placeholder="$t('header.search')" />
      </div>
    </div>

    <!-- Mobil Menü Hamburger Butonu -->
    <button class="menu-toggle" @click="toggleMobileMenu">
      <i class="bi bi-three-dots-vertical"></i>
    </button>

    <!-- Sağ: Butonlar ve Kullanıcı -->
    <div class="right-section" :class="{ 'mobile-menu-open': isMobileMenuOpen }">
      <div class="mobile-menu-header" v-if="isMobile">
        <button class="close-menu" @click="closeMobileMenu">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>

      <!-- Dil Seçici -->
      <div class="icon-wrapper dropdown-wrapper" @click.stop="toggleLangDropdown" ref="langDropdown">
        <img
          class="flag"
          :src="getFlag(currentLanguage)"
          alt="language"
        />
        <ul v-show="isLangDropdownOpen" class="lang-dropdown">
          <li @click="changeLang('en')"><img src="/flags/england.png" alt="English" /> English</li>
          <li @click="changeLang('fr')"><img src="/flags/france.png" alt="French" /> Français</li>
          <li @click="changeLang('de')"><img src="/flags/germany.jpg" alt="German" /> Deutsch</li>
        </ul>
      </div>

      <!-- Karanlık Mod -->
      <button class="icon-wrapper" @click="toggleTheme">
        <i :class="isDarkMode ? 'bi bi-moon-fill' : 'bi bi-sun-fill'"></i>
      </button>

      <!-- Bildirim -->
      <button class="icon-wrapper position-relative">
        <i class="bi bi-bell"></i>

      </button>

      <!-- Mesajlar -->
      <button class="icon-wrapper position-relative">
        <i class="bi bi-chat-dots"></i>

      </button>

      <!-- Tam Ekran -->
      <button class="icon-wrapper" @click="toggleFullscreen">
        <i class="bi bi-arrows-fullscreen"></i>
      </button>

      <!-- Menü Butonu -->
      <button class="icon-wrapper">
        <i class="bi bi-grid-3x3-gap-fill"></i>
      </button>

      <!-- Kullanıcı Bilgisi (Dropdown ile birlikte) -->
      <div class="user-info dropdown-wrapper" ref="dropdown" @click.stop="toggleDropdown">
        <img
          class="avatar"
          src="https://static-00.iconduck.com/assets.00/user-icon-1024x1024-dtzturco.png"
          alt="User"
        />
        <div class="user-text">
          <div class="name">Soren Blackwell</div>
          <div class="role">Sale Administrator</div>
        </div>

        <!-- Kullanıcı Dropdown Menüsü -->
        <ul v-show="isDropdownOpen" class="user-dropdown">
          <li><i class="bi bi-person"></i> <span>My Account</span></li>
          <li><i class="bi bi-envelope"></i> <span>Inbox</span></li>
          <li><i class="bi bi-clipboard-check"></i> <span>My Tasks</span></li>
          <li><i class="bi bi-gear"></i> <span>Settings</span></li>
          <li><i class="bi bi-headset"></i> <span>Support</span></li>
          <li class="logout"><i class="bi bi-box-arrow-right"></i> <span>Logout</span></li>
        </ul>
      </div>

      <!-- Ayarlar -->
      <button class="icon-wrapper" @click="toggleSettingsPanel">
        <i class="bi bi-gear-fill"></i>
      </button>
    </div>
  </header>

  <!-- Overlay - Mobile Menu için -->
  <div v-if="isMobileMenuOpen" class="mobile-overlay" @click="closeMobileMenu"></div>

  <!-- Ayarlar Paneli -->
  <Teleport to="body">
    <div v-if="showSettingsPanel" class="settings-panel" :class="{'dark-settings': isDarkMode}">
      <div class="settings-header">
        <h5>Setting</h5>
        <button class="close-btn" @click="toggleSettingsPanel">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
      <div class="settings-body">
        <div class="setting-group" v-for="(section, index) in settings" :key="index">
          <h6>{{ section.title }}</h6>
          <div class="options">
            <button
              v-for="(opt, i) in section.options"
              :key="i"
              class="option-btn"
              :class="{ active: opt.active }"
              @click="selectOption(index, i)"
            >
              {{ opt.label }}
            </button>
          </div>
        </div>
        <button class="clear-btn" @click="resetSettings">Clear all</button>
      </div>
    </div>
  </Teleport>

  <!-- Overlay - Settings Panel için -->
  <div v-if="showSettingsPanel" class="settings-overlay" @click="toggleSettingsPanel"></div>
</template>

<script>
export default {
  name: "HeaderComponent",
  data() {
    return {
      isDarkMode: localStorage.getItem("darkMode") === "true",
      currentLanguage: "en",
      isLangDropdownOpen: false,
      isDropdownOpen: false,
      showSettingsPanel: false,
      isMobileMenuOpen: false,
      isMobile: false,
      windowWidth: window.innerWidth,
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
      localStorage.setItem("lang", "en");
      this.$i18n.locale = "en";
    }
  },
  mounted() {
    this.applyDarkMode();
    this.checkScreenSize();
    window.addEventListener("resize", this.checkScreenSize);
    document.addEventListener("click", this.handleOutsideClick);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleOutsideClick);
    window.removeEventListener("resize", this.checkScreenSize);
  },
  methods: {
    checkScreenSize() {
      this.windowWidth = window.innerWidth;
      this.isMobile = this.windowWidth < 992;
      if (!this.isMobile && this.isMobileMenuOpen) {
        this.isMobileMenuOpen = false;
      }
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
      // Mobil menü açıldığında diğer dropdown'ları kapat
      if (this.isMobileMenuOpen) {
        this.isLangDropdownOpen = false;
        this.isDropdownOpen = false;
      }
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false;
    },
    toggleLangDropdown(event) {
      event.stopPropagation();
      this.isLangDropdownOpen = !this.isLangDropdownOpen;
      // Dil dropdown açıldığında kullanıcı dropdown'ı kapat
      if (this.isLangDropdownOpen) {
        this.isDropdownOpen = false;
      }
    },
    toggleDropdown(event) {
      event.stopPropagation();
      this.isDropdownOpen = !this.isDropdownOpen;
      // Kullanıcı dropdown açıldığında dil dropdown'ı kapat
      if (this.isDropdownOpen) {
        this.isLangDropdownOpen = false;
      }
    },
    toggleSettingsPanel() {
      this.showSettingsPanel = !this.showSettingsPanel;
      // Ayarlar paneli açıldığında diğer açık menüleri kapat
      if (this.showSettingsPanel) {
        this.isMobileMenuOpen = false;
        this.isLangDropdownOpen = false;
        this.isDropdownOpen = false;
      }
    },
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem("darkMode", this.isDarkMode);
      this.applyDarkMode();
    },
    applyDarkMode() {
      const html = document.documentElement;
      html.classList.toggle("dark-mode", this.isDarkMode);
    },
    toggleFullscreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
          console.error(`Fullscreen error: ${err.message}`);
        });
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    },
    changeLang(lang) {
      this.currentLanguage = lang;
      this.$i18n.locale = lang;
      localStorage.setItem("lang", lang);
      this.isLangDropdownOpen = false;
    },
    getFlag(lang) {
      switch (lang) {
        case "en":
          return "/flags/england.png";
        case "fr":
          return "/flags/france.png";
        case "de":
          return "/flags/germany.jpg";
        default:
          return "/flags/england.png";
      }
    },
    handleOutsideClick(event) {
      if (this.$refs.langDropdown && !this.$refs.langDropdown.contains(event.target)) {
        this.isLangDropdownOpen = false;
      }
      if (this.$refs.dropdown && !this.$refs.dropdown.contains(event.target)) {
        this.isDropdownOpen = false;
      }
    },
    selectOption(groupIndex, optionIndex) {
      this.settings[groupIndex].options.forEach((opt, i) => {
        opt.active = i === optionIndex;
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
/* === GENEL HEADER === */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 24px;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  font-family: 'Inter', sans-serif;
  position: sticky;
  top: 0;
  z-index: 100;
}

/* === ARAMA === */
.left-section {
  display: flex;
  align-items: center;
}
.search-bar {
  position: relative;
}
.search-bar input {
  padding: 8px 12px 8px 36px;
  border-radius: 999px;
  border: none;
  background-color: #f3f4f6;
  font-size: 14px;
  color: #374151;
  width: 240px;
  outline: none;
}
.search-bar input:focus {
  box-shadow: 0 0 0 2px rgba(91, 77, 219, 0.2);
}
.search-icon {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  font-size: 16px;
  color: #6b7280;
}

/* === MOBILE MENU TOGGLE === */
.menu-toggle {
  display: none;
  width: 38px;
  height: 38px;
  background: #f3f4f6;
  border-radius: 50%;
  border: none;
  font-size: 20px;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
  align-items: center;
  justify-content: center;
}
.menu-toggle:hover {
  background: #e5e7eb;
  color: #5b4ddb;
}
.mobile-menu-header {
  display: none;
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 15px;
}
.close-menu {
  background: none;
  border: none;
  font-size: 24px;
  color: #6b7280;
  cursor: pointer;
  padding: 0;
}
.close-menu:hover {
  color: #5b4ddb;
}

/* === SAĞ BUTONLAR === */
.right-section {
  display: flex;
  align-items: center;
  gap: 16px;
}
.icon-wrapper {
  width: 38px;
  height: 38px;
  background: #f3f4f6;
  border-radius: 50%;
  border: none;
  display: grid;
  place-items: center;
  font-size: 18px;
  color: #374151;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}
.icon-wrapper:hover {
  background: #e5e7eb;
  color: #5b4ddb;
}
.flag {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
}

/* === BADGE === */
.badge {
  position: absolute;
  top: 0;
  right: 0;
  background: #ef4444;
  color: white;
  font-size: 10px;
  border-radius: 999px;
  padding: 2px 6px;
  transform: translate(25%, -25%);
}
.badge.bg-primary {
  background: #3b82f6;
}

/* === DROPDOWN WRAPPER === */
.dropdown-wrapper {
  position: relative;
  cursor: pointer;
}

/* === DİL AÇILIR MENÜ === */
.lang-dropdown {
  position: absolute;
  top: 110%;
  right: 0;
  background: white;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  overflow: hidden;
  min-width: 140px;
  z-index: 999;
  padding: 0;
  margin: 0;
  list-style: none;
}
.lang-dropdown li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}
.lang-dropdown li:hover {
  background: #f3f4f6;
}
.lang-dropdown img {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

/* === KULLANICI === */
.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 8px;
  border-radius: 50px;
  background: #f3f4f6;
  height: 40px;
  transition: all 0.2s ease;
}
.user-info:hover {
  background: #e5e7eb;
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}
.user-text {
  display: flex;
  flex-direction: column;
  padding-right: 5px;
}
.user-text .name {
  font-size: 14px;
  font-weight: 500;
  color: #111827;
  white-space: nowrap;
}
.user-text .role {
  font-size: 12px;
  color: #6b7280;
  white-space: nowrap;
}
.user-dropdown {
  position: absolute;
  top: 110%;
  right: 0;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  min-width: 180px;
  padding: 8px 0;
  z-index: 999;
  margin: 0;
  list-style: none;
}
.user-dropdown li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  transition: background 0.2s;
}
.user-dropdown li:hover {
  background: #f3f4f6;
}
.user-dropdown li i {
  font-size: 16px;
  color: #6b7280;
}
.user-dropdown li.logout {
  color: #ef4444;
  font-weight: 500;
}
.user-dropdown li.logout i {
  color: #ef4444;
}
.user-dropdown li.logout:hover {
  background: #fee2e2;
}

/* === AYARLAR PANELİ === */
.settings-panel {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 300px;
  background: #fff;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.08);
  z-index: 9999;
  padding: 24px;
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  animation: slideIn 0.3s ease-out;
  overflow-y: auto;
}
.settings-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 9998;
}
@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.settings-header h5 {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin: 0;
}
.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  color: #6b7280;
  cursor: pointer;
}
.close-btn:hover {
  color: #5b4ddb;
}
.settings-body {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.setting-group h6 {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 10px;
}
.options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.option-btn {
  padding: 8px 18px;
  font-size: 13px;
  border-radius: 999px;
  background: #ede9fe;
  color: #5b4ddb;
  border: none;
  cursor: pointer;
  transition: 0.2s;
}
.option-btn:hover {
  background: #ddd6fe;
}
.option-btn.active {
  background: #5b4ddb;
  color: #fff;
}
.clear-btn {
  margin-top: 12px;
  padding: 10px;
  border-radius: 999px;
  background: #5b4ddb;
  color: white;
  font-size: 14px;
  border: none;
  cursor: pointer;
}
.clear-btn:hover {
  background: #4338ca;
}

/* === DARK MODE === */
:global(.dark-mode) .header {
  background-color: #1f2937;
  border-color: #374151;
}
:global(.dark-mode) .search-bar input {
  background-color: #374151;
  color: #f3f4f6;
}
:global(.dark-mode) .search-icon {
  color: #9ca3af;
}
:global(.dark-mode) .icon-wrapper {
  background: #374151;
  color: #e5e7eb;
}
:global(.dark-mode) .icon-wrapper:hover {
  background: #4b5563;
  color: #5b4ddb;
}
:global(.dark-mode) .user-info {
  background: #333;
}
:global(.dark-mode) .user-info:hover {
  background: #4b5563;
}
:global(.dark-mode) .user-text .name {
  color: #f3f4f6;
}
:global(.dark-mode) .user-text .role {
  color: #d1d5db;
}
:global(.dark-mode) .lang-dropdown,
:global(.dark-mode) .user-dropdown {
  background: #374151;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}
:global(.dark-mode) .lang-dropdown li,
:global(.dark-mode) .user-dropdown li {
  color: #e5e7eb;
}
:global(.dark-mode) .lang-dropdown li:hover,
:global(.dark-mode) .user-dropdown li:hover {
  background: #4b5563;
}
:global(.dark-mode) .user-dropdown li i {
  color: #9ca3af;
}
:global(.dark-mode) .user-dropdown li.logout:hover {
  background: #7f1d1d;
}
:global(.dark-mode) .dark-settings {
  background: #1f2937;
}
:global(.dark-mode) .dark-settings .settings-header h5 {
  color: #f3f4f6;
}
:global(.dark-mode) .dark-settings .close-btn {
  color: #9ca3af;
}
:global(.dark-mode) .dark-settings .close-btn:hover {
  color: #5b4ddb;
}
:global(.dark-mode) .dark-settings .setting-group h6 {
  color: #f3f4f6;
}
:global(.dark-mode) .dark-settings .option-btn {
  background: #374151;
  color: #cbd5e1;
}
:global(.dark-mode) .dark-settings .option-btn:hover {
  background: #475569;
}
:global(.dark-mode) .dark-settings .option-btn.active {
  background: #5b4ddb;
  color: white;
}

/* === MOBILE OVERLAY === */
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 98;
  animation: fadeIn 0.2s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* === RESPONSIVE === */
@media (max-width: 1199px) {
  .user-text .name {
    font-size: 13px;
  }
  .user-text .role {
    font-size: 11px;
  }
}

@media (max-width: 991px) {
  .menu-toggle {
    display: flex;
  }
  .right-section {
    position: fixed;
    top: 0;
    right: -300px;
    width: 280px;
    height: 100vh;
    background: #fff;
    flex-direction: column;
    padding: 20px;
    z-index: 99;
    transition: right 0.3s ease;
    box-shadow: -4px 0 15px rgba(0, 0, 0, 0.1);
    align-items: flex-start;
    overflow-y: auto;
  }
  :global(.dark-mode) .right-section {
    background: #1f2937;
  }
  .right-section.mobile-menu-open {
    right: 0;
  }
  .mobile-menu-header {
    display: flex;
    justify-content: flex-end;
  }
  .icon-wrapper {
    width: 100%;
    height: 45px;
    border-radius: 8px;
    display: flex;
    justify-content: flex-start;
    padding-left: 15px;
    gap: 15px;
  }
  .icon-wrapper::after {
    content: attr(data-label);
    font-size: 14px;
  }
  .icon-wrapper[data-label="Dark Mode"]::after {
    content: "Dark Mode";
  }
  .icon-wrapper[data-label="Notifications"]::after {
    content: "Notifications";
  }
  .icon-wrapper[data-label="Messages"]::after {
    content: "Messages";
  }
  .icon-wrapper[data-label="Fullscreen"]::after {
    content: "Fullscreen";
  }
  .icon-wrapper[data-label="Grid Menu"]::after {
    content: "Grid Menu";
  }
  .icon-wrapper[data-label="Settings"]::after {
    content: "Settings";
  }
  .dropdown-wrapper.icon-wrapper::after {
    content: "Language";
  }
  .lang-dropdown {
    position: static;
    box-shadow: none;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
  }
  .user-info {
    width: 100%;
    height: 50px;
    border-radius: 8px;
    padding: 8px;
    margin-bottom: 10px;
  }
  .user-dropdown {
    position: static;
    box-shadow: none;
    margin-top: 5px;
    width: 100%;
  }
  .settings-panel {
    width: 100%;
  }
}

@media (max-width: 767px) {
  .header {
    padding: 8px 16px;
  }
  .search-bar input {
    width: 180px;
  }
}

@media (max-width: 575px) {
  .search-bar input {
    width: 140px;
  }
  .settings-panel {
    padding: 16px;
  }
  .option-btn {
    padding: 6px 12px;
    font-size: 12px;
  }
}
</style>