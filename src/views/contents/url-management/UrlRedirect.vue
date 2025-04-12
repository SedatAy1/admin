<template>
  <UrlLayout>
    <div class="container mt-3">
      <!-- Filtreleme Seçenekleri -->
      <div class="filter-section card p-3 shadow-sm" @click="toggleFilter">
        <div class="d-flex justify-content-between align-items-center">
          <h5>{{ $t("redirect.title") }}</h5>
          <span class="toggle-icon">{{ showFilter ? "▲" : "▼" }}</span>
        </div>
        <transition name="fade-slide">
          <div v-if="showFilter" class="mt-3">
            <input v-model="search" type="text" class="form-control mb-2" :placeholder="$t('redirect.search')" />
            <select v-model="filterType" class="form-select mb-2">
              <option value="">{{ $t("redirect.typeSelect") }}</option>
              <option value="301">301 {{ $t("redirect.type") }}</option>
              <option value="302">302 {{ $t("redirect.type") }}</option>
            </select>
            <button class="btn btn-success me-2" @click.stop="applyFilter">{{ $t("common.filter") }}</button>
            <button class="btn btn-secondary" @click.stop="resetFilter">{{ $t("common.clear") }}</button>
          </div>
        </transition>
      </div>

      <!-- Yönlendirme Listesi -->
      <div class="mt-3 card shadow-sm p-3">
        <div class="d-flex justify-content-between">
          <button @click="toggleNewRedirect" class="btn btn-primary">{{ $t("redirect.new") }}</button>
          <button @click="toggleExcelModal" class="btn btn-success">{{ $t("redirect.excel") }}</button>
        </div>

        <table class="table table-hover mt-3">
          <thead class="table-dark">
            <tr>
              <th>#</th>
              <th>{{ $t("redirect.fields.id") }}</th>
              <th>{{ $t("redirect.fields.link") }}</th>
              <th>{{ $t("redirect.fields.redirectTo") }}</th>
              <th>{{ $t("redirect.fields.type") }}</th>
              <th>{{ $t("common.actions") }}</th>
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
                <button class="btn btn-danger btn-sm" @click="deleteRedirect(redirect.id)">{{ $t("common.delete") }}</button>
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
          <h5>{{ $t("redirect.newTitle") }}</h5>
          <select v-model="newRedirect.type" class="form-select mb-2">
            <option value="301">301 {{ $t("redirect.type") }}</option>
            <option value="302">302 {{ $t("redirect.type") }}</option>
          </select>
          <input v-model="newRedirect.link" type="text" class="form-control mb-2" :placeholder="$t('redirect.placeholders.old')" />
          <input v-model="newRedirect.redirectTo" type="text" class="form-control mb-2" :placeholder="$t('redirect.placeholders.new')" />
          <div class="d-flex justify-content-end">
            <button class="btn btn-success me-2" @click="saveRedirect">{{ $t("common.save") }}</button>
            <button class="btn btn-secondary" @click="toggleNewRedirect">{{ $t("common.cancel") }}</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Excel Modal -->
    <transition name="fade-slide">
      <div v-if="showExcelModal" class="modal-overlay">
        <div class="modal-content card p-4">
          <h5>{{ $t("redirect.excelTitle") }}</h5>
          <button class="btn btn-primary mt-2">{{ $t("common.export") }}</button>
          <button class="btn btn-secondary mt-2">{{ $t("common.import") }}</button>
          <button class="btn btn-danger mt-2" @click="toggleExcelModal">{{ $t("common.close") }}</button>
        </div>
      </div>
    </transition>
  </UrlLayout>
</template>
<script>
import UrlLayout from "./UrlLayout.vue";

export default {
  components: { UrlLayout },
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
      ]
    };
  },
  computed: {
    filteredRedirects() {
      return this.redirects.filter(item => {
        return (
          item.link.toLowerCase().includes(this.search.toLowerCase()) &&
          (this.filterType === "" || item.type === this.filterType)
        );
      });
    }
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
      console.log("Filtre uygulandı");
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
      this.redirects = this.redirects.filter(r => r.id !== id);
    }
  }
};
</script>

<style scoped>
/* Koyu mod ve modern tasarım destekli */
:root {
  --bg: #ffffff;
  --text: #1f2937;
  --card: #f9fafb;
  --accent: #316cf4;
  --muted: #6b7280;
  --overlay: rgba(0, 0, 0, 0.5);
}
.dark {
  --bg: #1a1c2c;
  --text: #f3f4f6;
  --card: #24263b;
  --accent: #438aff;
  --muted: #9ca3af;
  --overlay: rgba(10, 10, 20, 0.6);
}

.container, .card {
  background: var(--bg);
  color: var(--text);
}
.card {
  background-color: var(--card);
  border-radius: 10px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--overlay);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.modal-content {
  background: var(--card);
  color: var(--text);
  border-radius: 12px;
  width: 100%;
  max-width: 420px;
}

.table {
  background: var(--card);
  color: var(--text);
}
.table th {
  background-color: var(--accent);
  color: white;
}

input, select, textarea {
  background: var(--bg);
  color: var(--text);
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 10px;
  width: 100%;
}
.dark input, .dark select, .dark textarea {
  background: #2b2e44;
  border-color: #444857;
}

.btn {
  border-radius: 8px;
  font-size: 14px;
  padding: 8px 16px;
}
.btn-primary {
  background: #316cf4;
  color: white;
  border: none;
  transition: background 0.3s ease;
}
.btn-primary:hover {
  background: #2554c7; /* biraz koyusu */
}
.btn-success {
  background-color: #10b981;
  border: none;
  color: white;
}
.btn-success:hover {
  background-color: #059669;
}
.btn-secondary {
  background-color: #9ca3af;
  border: none;
  color: white;
}
.btn-danger {
  background-color: #ef4444;
  border: none;
  color: white;
}
.btn-danger:hover {
  background-color: #dc2626;
}

@media (max-width: 768px) {
  .table {
    font-size: 13px;
  }
  .modal-content {
    padding: 16px !important;
  }
}
</style>