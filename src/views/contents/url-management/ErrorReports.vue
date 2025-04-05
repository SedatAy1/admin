<template>
  <UrlLayout>
    <div class="card shadow-sm p-3">
      <div class="filter-header bg-primary text-white p-3 rounded" @click="toggleFilter">
        <strong>
          <i class="fas fa-filter me-2"></i> Filtreleme Seçenekleri
        </strong>
        <span class="float-end">
          <i :class="{'fas fa-chevron-down': !showFilter, 'fas fa-chevron-up': showFilter}"></i>
        </span>
      </div>

      <transition name="fade-slide">
        <div v-if="showFilter" class="filter-body bg-primary text-white p-3 rounded mt-2">
          <div class="row">
            <div class="col-md-4">
              <label>Arama Terimi</label>
              <input type="text" class="form-control" v-model="searchTerm" placeholder="Arama terimi yazınız" />
            </div>
            <div class="col-md-4">
              <label>Yönlendirme Durumu</label>
              <select class="form-control" v-model="redirectStatus">
                <option value="">Seçilmedi</option>
                <option value="1">Yönlendirilmiş</option>
                <option value="0">Yönlendirilmemiş</option>
              </select>
            </div>
            <div class="col-md-4">
              <label>Ziyaret Sayısı</label>
              <div class="d-flex">
                <input type="number" class="form-control" v-model="visitMin" placeholder="Min" />
                <span class="px-2">ile</span>
                <input type="number" class="form-control" v-model="visitMax" placeholder="Max" />
              </div>
            </div>
          </div>
          <div class="text-end mt-3">
            <button class="btn btn-light me-2" @click="clearFilters">Temizle</button>
            <button class="btn btn-secondary">Filtrele</button>
          </div>
        </div>
      </transition>
    </div>

    <div class="table-responsive mt-3">
      <table class="table table-hover shadow-sm">
        <thead class="table-dark">
          <tr>
            <th>Link No</th>
            <th>Link</th>
            <th>Ziyaret Sayısı</th>
            <th>Yönlendirme</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="report in reports" :key="report.id">
            <td>{{ report.id }}</td>
            <td>{{ report.link }}</td>
            <td>{{ report.visits }}</td>
            <td>
              <button class="btn btn-primary btn-sm" @click="openRedirectModal(report)">
                Yönlendirme Oluştur
              </button>
            </td>
            <td>
              <div class="dropdown">
                <button class="btn btn-outline-secondary dropdown-toggle" @click="toggleDropdown(report.id)">
                  İşlemler
                </button>
                <ul v-if="dropdownVisible === report.id" class="dropdown-menu show">
                  <li>
                    <a class="dropdown-item text-danger" @click="deleteReport(report.id)">
                      <i class="fas fa-trash-alt"></i> Sil
                    </a>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showRedirectModal" class="modal-overlay">
      <div class="modal-content p-4 shadow-lg rounded">
        <h5>Yeni Yönlendirme Linki</h5>
        <label>Yönlendirme Tipi</label>
        <select class="form-control mb-2" v-model="redirectType">
          <option>301 Yönlendirme</option>
        </select>
        <label>Link</label>
        <input type="text" class="form-control mb-2" v-model="redirectLink" />
        <label>Yönlendirilecek Link</label>
        <input type="text" class="form-control mb-2" />
        <label>Notlar</label>
        <input type="text" class="form-control mb-2" />
        <div class="text-end">
          <button class="btn btn-secondary me-2" @click="closeRedirectModal">İptal</button>
          <button class="btn btn-primary">Kaydet</button>
        </div>
      </div>
    </div>
  </UrlLayout>
</template>

<script>
import UrlLayout from "./UrlLayout.vue";

export default {
  components: { UrlLayout },
  data() {
    return {
      showFilter: false,
      showRedirectModal: false,
      searchTerm: "",
      redirectStatus: "",
      visitMin: "",
      visitMax: "",
      dropdownVisible: null,
      redirectLink: "",
      reports: [
        { id: 1, link: "admin/demo.html", visits: 84 },
        { id: 2, link: "admin/index.html", visits: 2853 }
      ]
    };
  },
  methods: {
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
    toggleDropdown(id) {
      this.dropdownVisible = this.dropdownVisible === id ? null : id;
    },
    openRedirectModal(report) {
      this.redirectLink = report.link;
      this.showRedirectModal = true;
    },
    closeRedirectModal() {
      this.showRedirectModal = false;
    },
    deleteReport(id) {
      this.reports = this.reports.filter(report => report.id !== id);
    },
    clearFilters() {
      this.searchTerm = "";
      this.redirectStatus = "";
      this.visitMin = "";
      this.visitMax = "";
    }
  }
};
</script>

<style scoped>
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  width: 400px;
}
</style>