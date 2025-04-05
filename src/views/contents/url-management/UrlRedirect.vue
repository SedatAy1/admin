<template>
  <UrlLayout>
    <div class="container mt-3">
      <!-- Filtreleme Seçenekleri -->
      <div class="filter-section card p-3 shadow-sm" @click="toggleFilter">
        <div class="d-flex justify-content-between align-items-center">
          <h5>🔍 Filtreleme Seçenekleri</h5>
          <span class="toggle-icon">{{ showFilter ? "▲" : "▼" }}</span>
        </div>
        <transition name="fade-slide">
          <div v-if="showFilter" class="mt-3">
            <input v-model="search" type="text" class="form-control mb-2" placeholder="Arama terimi yazınız..." />
            <select v-model="filterType" class="form-select mb-2">
              <option value="">Yönlendirme Tipi Seç</option>
              <option value="301">301 Yönlendirme</option>
              <option value="302">302 Yönlendirme</option>
            </select>
            <button class="btn btn-success me-2" @click.stop="applyFilter">Filtrele</button>
            <button class="btn btn-secondary" @click.stop="resetFilter">Temizle</button>
          </div>
        </transition>
      </div>

      <!-- Yönlendirme Listesi -->
      <div class="mt-3 card shadow-sm p-3">
        <div class="d-flex justify-content-between">
          <button @click="toggleNewRedirect" class="btn btn-primary">+ Yeni Yönlendirme Linki</button>
          <button @click="toggleExcelModal" class="btn btn-success">📥 Excel İşlemleri</button>
        </div>

        <table class="table table-hover mt-3">
          <thead class="table-dark">
            <tr>
              <th>#</th>
              <th>Link No</th>
              <th>Link</th>
              <th>Yönlendirme Linki</th>
              <th>Tip</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(redirect, index) in filteredRedirects" :key="redirect.id">
              <td>{{ index + 1 }}</td>
              <td>{{ redirect.id }}</td>
              <td>{{ redirect.link }}</td>
              <td>{{ redirect.redirectTo }}</td>
              <td>{{ redirect.type }}</td>
              <td>
                <button class="btn btn-danger btn-sm" @click="deleteRedirect(redirect.id)">Sil</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Yeni Yönlendirme Linki Modal -->
    <transition name="fade-slide">
      <div v-if="showNewRedirect" class="modal-overlay">
        <div class="modal-content card p-4">
          <h5>Yeni Yönlendirme Linki</h5>
          <select v-model="newRedirect.type" class="form-select mb-2">
            <option value="301">301 Yönlendirme</option>
            <option value="302">302 Yönlendirme</option>
          </select>
          <input v-model="newRedirect.link" type="text" class="form-control mb-2" placeholder="Eski URL" />
          <input v-model="newRedirect.redirectTo" type="text" class="form-control mb-2" placeholder="Yeni URL" />
          <div class="d-flex justify-content-end">
            <button class="btn btn-success me-2" @click="saveRedirect">Kaydet</button>
            <button class="btn btn-secondary" @click="toggleNewRedirect">İptal</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Excel Modal -->
    <transition name="fade-slide">
      <div v-if="showExcelModal" class="modal-overlay">
        <div class="modal-content card p-4">
          <h5>Link Yönlendirme - Excel İşlemleri</h5>
          <button class="btn btn-primary mt-2">Dışa Aktar</button>
          <button class="btn btn-secondary mt-2">İçe Aktar</button>
          <button class="btn btn-danger mt-2" @click="toggleExcelModal">Kapat</button>
        </div>
      </div>
    </transition>
  </UrlLayout>
</template>

<script>
import UrlLayout from "./UrlLayout.vue";

export default {
  components: {
    UrlLayout,
  },
  data() {
    return {
      search: "",
      filterType: "",
      showFilter: false,
      showNewRedirect: false,
      showExcelModal: false,
      newRedirect: { type: "301", link: "", redirectTo: "" },
      redirects: [
        { id: 1, link: "https://eski-site.com", redirectTo: "https://yeni-site.com", type: "301" },
        { id: 2, link: "https://site.com/blog", redirectTo: "https://site.com/articles", type: "302" },
      ],
    };
  },
  computed: {
    filteredRedirects() {
      return this.redirects.filter((item) => {
        return (
          item.link.toLowerCase().includes(this.search.toLowerCase()) &&
          (this.filterType === "" || item.type === this.filterType)
        );
      });
    },
  },
  methods: {
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
    toggleNewRedirect() {
      this.showNewRedirect = !this.showNewRedirect;
    },
    toggleExcelModal() {
      this.showExcelModal = !this.showExcelModal;
    },
    applyFilter() {
      console.log("Filtre uygulandı.");
    },
    resetFilter() {
      this.search = "";
      this.filterType = "";
    },
    saveRedirect() {
      if (!this.newRedirect.link || !this.newRedirect.redirectTo) {
        alert("Lütfen tüm alanları doldurun.");
        return;
      }
      this.redirects.push({
        id: this.redirects.length + 1,
        link: this.newRedirect.link,
        redirectTo: this.newRedirect.redirectTo,
        type: this.newRedirect.type,
      });
      this.newRedirect = { type: "301", link: "", redirectTo: "" };
      this.toggleNewRedirect();
    },
    deleteRedirect(id) {
      this.redirects = this.redirects.filter((r) => r.id !== id);
    },
  },
};
</script>

<style scoped>
/* Animasyonlar */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}
.fade-slide-enter,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Modal Stilleri */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}

/* Filtreleme Başlığı */
.filter-section {
  cursor: pointer;
  transition: all 0.3s;
}
.filter-section:hover {
  background-color: #0860b8;
}

/* Aç/Kapa İkonu */
.toggle-icon {
  font-size: 20px;
  font-weight: bold;
}
</style>