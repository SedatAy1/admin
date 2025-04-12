<template>
  <UrlLayout>
    <div class="card shadow-sm p-3 bg-white dark:bg-gray-800 text-dark dark:text-white">
      <!-- Filtreleme Başlığı -->
      <div
        class="filter-header p-3 rounded cursor-pointer d-flex justify-content-between align-items-center bg-primary text-white"
        @click="toggleFilter"
      >
        <strong>
          <i class="fas fa-filter me-2"></i> {{ $t("report.filterTitle") }}
        </strong>
        <i :class="showFilter ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
      </div>

      <!-- Filtreleme Alanı -->
      <transition name="fade-slide">
        <div
          v-if="showFilter"
          class="filter-body bg-primary bg-opacity-10 p-3 rounded mt-2 dark:bg-gray-700"
        >
          <div class="row">
            <div class="col-md-4 mb-2">
              <label>{{ $t("report.searchTerm") }}</label>
              <input
                type="text"
                class="form-control"
                v-model="searchTerm"
                :placeholder="$t('report.searchPlaceholder')"
              />
            </div>
            <div class="col-md-4 mb-2">
              <label>{{ $t("report.status") }}</label>
              <select class="form-control" v-model="redirectStatus">
                <option value="">{{ $t("common.none") }}</option>
                <option value="1">{{ $t("report.redirected") }}</option>
                <option value="0">{{ $t("report.notRedirected") }}</option>
              </select>
            </div>
            <div class="col-md-4 mb-2">
              <label>{{ $t("report.visits") }}</label>
              <div class="d-flex">
                <input type="number" class="form-control" v-model="visitMin" :placeholder="$t('report.min')" />
                <span class="px-2">{{ $t("common.to") }}</span>
                <input type="number" class="form-control" v-model="visitMax" :placeholder="$t('report.max')" />
              </div>
            </div>
          </div>
          <div class="text-end mt-3">
            <button class="btn btn-light me-2" @click="clearFilters">{{ $t("common.clear") }}</button>
            <button class="btn btn-primary">{{ $t("common.filter") }}</button>
          </div>
        </div>
      </transition>
    </div>

    <!-- Tablo -->
    <div class="table-responsive mt-3">
      <table class="table table-hover shadow-sm bg-white dark:bg-gray-800 text-dark dark:text-white">
        <thead class="table-dark">
          <tr>
            <th>{{ $t("report.fields.id") }}</th>
            <th>{{ $t("report.fields.link") }}</th>
            <th>{{ $t("report.fields.visits") }}</th>
            <th>{{ $t("report.fields.redirect") }}</th>
            <th>{{ $t("common.actions") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="report in reports" :key="report.id">
            <td>{{ report.id }}</td>
            <td>{{ report.link }}</td>
            <td>{{ report.visits }}</td>
            <td>
              <button class="btn btn-sm btn-primary" @click="openRedirectModal(report)">
                {{ $t("report.createRedirect") }}
              </button>
            </td>
            <td>
              <div class="dropdown">
                <button class="btn btn-outline-secondary dropdown-toggle" @click="toggleDropdown(report.id)">
                  {{ $t("common.actions") }}
                </button>
                <ul v-if="dropdownVisible === report.id" class="dropdown-menu show">
                  <li>
                    <a class="dropdown-item text-danger" @click="deleteReport(report.id)">
                      <i class="fas fa-trash-alt"></i> {{ $t("common.delete") }}
                    </a>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="showRedirectModal" class="modal-overlay">
      <div class="modal-content bg-white dark:bg-gray-800 text-dark dark:text-white p-4 shadow-lg rounded">
        <h5>{{ $t("report.modal.title") }}</h5>
        <label>{{ $t("report.modal.type") }}</label>
        <select class="form-control mb-2" v-model="redirectType">
          <option>301 {{ $t("report.modal.type") }}</option>
        </select>
        <label>{{ $t("report.modal.link") }}</label>
        <input type="text" class="form-control mb-2" v-model="redirectLink" />
        <label>{{ $t("report.modal.to") }}</label>
        <input type="text" class="form-control mb-2" />
        <label>{{ $t("report.modal.note") }}</label>
        <input type="text" class="form-control mb-2" />
        <div class="text-end">
          <button class="btn btn-secondary me-2" @click="closeRedirectModal"> {{ $t("common.cancel") }} </button>
          <button class="btn btn-primary"> {{ $t("common.save") }} </button>
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
/* Animasyonlar */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Modal Arka Planı */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(4px);
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

/* Modal İçeriği */
.modal-content {
  width: 90%;
  max-width: 500px;
  background: var(--modal-bg, #ffffff);
  color: var(--modal-text, #1f2937);
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.25);
  transition: background 0.3s, color 0.3s;
}

/* Koyu Mod Değeri */
.dark .modal-content {
  --modal-bg: #1e293b;
  --modal-text: #f1f5f9;
  background: var(--modal-bg);
  color: var(--modal-text);
}

/* Responsive */
@media (max-width: 768px) {
  .modal-content {
    padding: 20px;
  }
}
</style>