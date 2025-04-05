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

    <!-- Sağ Taraf: Dil Seçici, Tema, Sepet, Bildirim, Tam Ekran, Kullanıcı, Ayarlar -->
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

      <!-- Alışveriş Sepeti -->
      <button class="btn btn-light icon-btn position-relative">
        <i class="bi bi-cart2"></i>
        <span class="badge">5</span>
      </button>

      <!-- Bildirimler -->
      <button class="btn btn-light icon-btn position-relative">
        <i class="bi bi-bell"></i>
      </button>

      <!-- Tam Ekran Butonu -->
      <button class="btn btn-light icon-btn" @click="toggleFullscreen">
        <i class="bi bi-arrows-fullscreen"></i>
      </button>

      <!-- Kullanıcı Profili -->
      <div class="dropdown">
        <button class="btn btn-light dropdown-toggle user-btn" type="button" id="profileDropdown" data-bs-toggle="dropdown">
          <img src="/user-avatar.png" alt="User Avatar" class="avatar">
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">{{ $t('profile') }}</a></li>
          <li><a class="dropdown-item" href="#">{{ $t('settings') }}</a></li>
          <li><a class="dropdown-item text-danger" href="#">{{ $t('logout') }}</a></li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  data() {
    return {
      isDarkMode: localStorage.getItem("darkMode") === "true",
      currentLanguage: "en" // Başlangıç değeri
    };
  },
  created() {
    this.currentLanguage = this.$i18n.locale;
  },
  mounted() {
    this.applyDarkMode();
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
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    },
    changeLanguage() {
      this.$i18n.locale = this.currentLanguage;
      this.$store.dispatch("changeLanguage", this.currentLanguage);
    }
  }
};
</script>

<style scoped>
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

/* İkon Butonları */
.icon-btn {
  font-size: 20px;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
}

/* Badge (Bildirim Sayacı) */
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

/* Kullanıcı Avatarı */
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

/* Dil Seçici */
.form-select {
  min-width: 120px;
  font-size: 14px;
  padding: 5px;
}

/* Dashboard */
.dashboard {
  margin-left: 260px;
  padding: 20px;
  background-color: aqua;
  text-decoration: double;
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
