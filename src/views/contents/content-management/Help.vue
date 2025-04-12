<template>
  <ContentLayout>
    <div class="header d-flex justify-content-between align-items-center p-3 bg-light shadow-sm rounded">
      <input v-model="search" type="text" :placeholder="$t('common.search')" class="form-control w-25" />
      <button @click="toggleForm" class="btn btn-primary shadow-sm">+ {{ $t('help.newTitle') }}</button>
    </div>

    <transition name="fade-slide">
      <div v-if="showForm" class="form-container card shadow-lg p-4 mt-3">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link" :class="{ 'active': activeTab === 'general' }" @click="activeTab = 'general'">{{ $t('help.tabs.general') }}</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="{ 'active': activeTab === 'seo' }" @click="activeTab = 'seo'">{{ $t('help.tabs.seo') }}</a>
          </li>
        </ul>

        <div class="tab-content p-3">
          <div v-if="activeTab === 'general'">
            <label>{{ $t('help.fields.title') }}</label>
            <input v-model="newHelp.title" type="text" class="form-control mb-2" />

            <label>{{ $t('help.fields.order') }}</label>
            <input v-model="newHelp.order" type="number" class="form-control mb-2" />

            <label>{{ $t('help.fields.status') }}</label>
            <select v-model="newHelp.status" class="form-control mb-2">
              <option value="Aktif">{{ $t('common.active') }}</option>
              <option value="Pasif">{{ $t('common.passive') }}</option>
            </select>

            <label>{{ $t('help.fields.image') }}</label>
            <input type="file" @change="uploadFile" class="form-control" />
          </div>

          <div v-if="activeTab === 'seo'">
            <label>{{ $t('seo.title') }}</label>
            <input v-model="newHelp.seoTitle" type="text" class="form-control mb-2" />

            <label>{{ $t('seo.description') }}</label>
            <input v-model="newHelp.seoDescription" type="text" class="form-control mb-2" />

            <label>{{ $t('seo.keywords') }}</label>
            <input v-model="newHelp.seoKeywords" type="text" class="form-control" />
          </div>
        </div>

        <div class="form-actions text-end">
          <button @click="saveHelp" class="btn btn-success me-2">{{ $t('common.save') }}</button>
          <button @click="toggleForm" class="btn btn-secondary">{{ $t('common.cancel') }}</button>
        </div>
      </div>
    </transition>

    <table class="table table-hover mt-3 shadow-sm">
      <thead class="table-dark">
        <tr>
          <th>#</th>
          <th>{{ $t('help.fields.id') }}</th>
          <th>{{ $t('help.fields.title') }}</th>
          <th>{{ $t('help.fields.status') }}</th>
          <th>{{ $t('help.fields.order') }}</th>
          <th>{{ $t('common.actions') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(help, index) in filteredHelps" :key="help.id">
          <td>{{ index + 1 }}</td>
          <td>{{ help.id }}</td>
          <td>{{ help.title }}</td>
          <td>{{ help.status }}</td>
          <td>{{ help.order }}</td>
          <td>
            <div class="dropdown">
              <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                {{ $t('common.actions') }}
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" @click="editHelp(help.id)">✏️ {{ $t('common.edit') }}</a>
                </li>
                <li>
                  <a class="dropdown-item text-danger" @click="deleteHelp(help.id)">🗑 {{ $t('common.delete') }}</a>
                </li>
              </ul>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </ContentLayout>
</template>

<script>
import ContentLayout from "./ContentLayout.vue";

export default {
  components: {
    ContentLayout
  },
  data() {
    return {
      search: '',
      showForm: false,
      activeTab: 'general',
      newHelp: { title: '', order: 0, status: 'Aktif', seoTitle: '', seoDescription: '', seoKeywords: '' },
      helps: []
    };
  },
  computed: {
    filteredHelps() {
      return this.helps.filter(help => help.title.toLowerCase().includes(this.search.toLowerCase()));
    }
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm;
    },
    saveHelp() {
      this.helps.push({ id: this.helps.length + 1, ...this.newHelp });
      this.newHelp = { title: '', order: 0, status: 'Aktif', seoTitle: '', seoDescription: '', seoKeywords: '' };
      this.showForm = false;
    },
    editHelp(id) {
      alert(`Düzenleme Açıldı: Başlık ${id}`);
    },
    deleteHelp(id) {
      this.helps = this.helps.filter(help => help.id !== id);
    },
    uploadFile(event) {
      console.log("Dosya seçildi:", event.target.files[0]);
    }
  }
};
</script>

<style scoped>
/* Animasyon */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.5s ease;
}
.fade-slide-enter, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Başlık ve Arama Alanı */
.header {
  background-color: var(--bs-light);
  border-radius: 10px;
  margin-bottom: 15px;
}
.header input {
  transition: box-shadow 0.3s ease;
}
.header input:focus {
  box-shadow: 0 0 0 0.2rem rgba(59, 130, 246, 0.25);
}

/* Form Alanı */
.form-container {
  border-radius: 10px;
  background-color: var(--bs-white);
}
.form-container label {
  font-weight: 500;
  margin-top: 10px;
}
.form-actions {
  margin-top: 20px;
}

/* Sekmeler */
.nav-tabs .nav-link {
  cursor: pointer;
  transition: background 0.3s ease;
}
.nav-tabs .nav-link.active {
  background-color: var(--bs-primary);
  color: white;
  font-weight: 600;
}

/* Tablo */
.table {
  border-radius: 10px;
  overflow: hidden;
}
.table-hover tbody tr:hover {
  background-color: rgba(59, 130, 246, 0.05);
}
.dropdown-menu {
  font-size: 14px;
}

/* Dark Mode */
:root {
  --bg: #ffffff;
  --text: #1f2937;
  --card: #f9fafb;
  --border: #e5e7eb;
}
.dark {
  --bg: #1e1e2f;
  --text: #f3f4f6;
  --card: #2a2a3d;
  --border: #3b3b4f;
}
.dark .header,
.dark .form-container,
.dark .table,
.dark .dropdown-menu {
  background-color: var(--card) !important;
  color: var(--text);
}
.dark input,
.dark textarea,
.dark select {
  background-color: #2e2e3e !important;
  color: white !important;
  border: 1px solid var(--border) !important;
}
.dark .nav-tabs .nav-link.active {
  background-color: #3b82f6 !important;
  color: white !important;
}
.dark .table-hover tbody tr:hover {
  background-color: rgba(255, 255, 255, 0.03);
}

/* Responsive */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start !important;
    gap: 10px;
  }

  .header input,
  .header .btn {
    width: 100% !important;
  }
}
</style>