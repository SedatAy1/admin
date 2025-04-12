<template>
  <ContentLayout>
    <div class="header d-flex justify-content-between align-items-center p-3 bg-light shadow-sm rounded">
      <input v-model="search" type="text" :placeholder="$t('common.search')" class="form-control w-25" />
      <button @click="toggleForm" class="btn btn-primary shadow-sm">
        + {{ $t('pages.newPage') }}
      </button>
    </div>

    <transition name="fade-slide">
      <div v-if="showForm" class="form-container card shadow-lg p-4 mt-3">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link" :class="{'active': activeTab === 'general'}" @click="activeTab = 'general'">
              {{ $t('pages.tabs.general') }}
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="{'active': activeTab === 'seo'}" @click="activeTab = 'seo'">
              {{ $t('pages.tabs.seo') }}
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="{'active': activeTab === 'other'}" @click="activeTab = 'other'">
              {{ $t('pages.tabs.other') }}
            </a>
          </li>
        </ul>

        <div class="tab-content p-3">
          <div v-if="activeTab === 'general'">
            <label>{{ $t('pages.title') }}</label>
            <input v-model="newPage.title" type="text" class="form-control mb-2" />
            <label>{{ $t('pages.content') }}</label>
            <textarea v-model="newPage.content" class="form-control" rows="4"></textarea>
          </div>

          <div v-if="activeTab === 'seo'">
            <label>{{ $t('pages.seoTitle') }}</label>
            <input v-model="newPage.seoTitle" type="text" class="form-control mb-2" />
            <label>{{ $t('pages.seoDescription') }}</label>
            <input v-model="newPage.seoDescription" type="text" class="form-control mb-2" />
            <label>{{ $t('pages.seoKeywords') }}</label>
            <input v-model="newPage.seoKeywords" type="text" class="form-control" />
          </div>

          <div v-if="activeTab === 'other'">
            <label>{{ $t('pages.codes') }}</label>
            <input v-model="newPage.codes" type="text" class="form-control mb-2" />
            <label>{{ $t('pages.redirect') }}</label>
            <input v-model="newPage.redirectLink" type="text" class="form-control" />
          </div>
        </div>

        <div class="form-actions text-end">
          <button @click="savePage" class="btn btn-success me-2">{{ $t('common.save') }}</button>
          <button @click="toggleForm" class="btn btn-secondary">{{ $t('common.cancel') }}</button>
        </div>
      </div>
    </transition>

    <table class="table table-hover mt-3 shadow-sm">
      <thead class="table-dark">
        <tr>
          <th><input type="checkbox" /></th>
          <th>{{ $t('pages.pageNo') }}</th>
          <th>{{ $t('pages.title') }}</th>
          <th>{{ $t('pages.codes') }}</th>
          <th>{{ $t('common.actions') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(page, index) in filteredPages" :key="page.id">
          <td><input type="checkbox" /></td>
          <td>{{ page.id }}</td>
          <td>{{ page.title }}</td>
          <td>{{ page.codes }}</td>
          <td>
            <div class="dropdown">
              <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                {{ $t('common.actions') }}
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" @click="viewPage(page.id)">👁 {{ $t('common.preview') }}</a></li>
                <li><a class="dropdown-item" @click="editPage(page.id)">🔗 {{ $t('common.edit') }}</a></li>
                <li><a class="dropdown-item text-danger" @click="deletePage(page.id)">🗑 {{ $t('common.delete') }}</a></li>
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
      newPage: { title: '', content: '', seoTitle: '', seoDescription: '', seoKeywords: '', codes: '', redirectLink: '' },
      pages: [
        { id: 1, title: 'Hakkımızda', codes: '' },
        { id: 2, title: 'Gizlilik Sözleşmesi', codes: '' },
        { id: 3, title: 'Kullanıcı Sözleşmesi', codes: '' },
        { id: 4, title: 'İletişim', codes: '' }
      ]
    };
  },
  computed: {
    filteredPages() {
      return this.pages.filter(page => page.title.toLowerCase().includes(this.search.toLowerCase()));
    }
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm;
    },
    savePage() {
      this.pages.push({ id: this.pages.length + 1, ...this.newPage });
      this.newPage = { title: '', content: '', seoTitle: '', seoDescription: '', seoKeywords: '', codes: '', redirectLink: '' };
      this.showForm = false;
    },
    viewPage(id) {
      alert(`Hızlı Görüntüleme: Sayfa ${id}`);
    },
    editPage(id) {
      alert(`İçerik Sayfası: Sayfa ${id}`);
    },
    deletePage(id) {
      this.pages = this.pages.filter(page => page.id !== id);
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

/* Arama ve Form Butonu */
.header {
  background-color: var(--bs-light);
  border-radius: 10px;
  margin-bottom: 15px;
}

input.form-control {
  transition: box-shadow 0.3s ease;
}
input.form-control:focus {
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
.dark input.form-control,
.dark textarea.form-control {
  background-color: #2e2e3e;
  color: white;
  border: 1px solid var(--border);
}
.dark .nav-tabs .nav-link.active {
  background-color: #3b82f6 !important;
  color: white !important;
}
.dark .table-hover tbody tr:hover {
  background-color: rgba(255, 255, 255, 0.03);
}

/* Responsive iyileştirme */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start !important;
    gap: 10px;
  }

  .header input {
    width: 100% !important;
  }

  .header .btn {
    width: 100%;
  }
}
</style>
