<template>
  <ContentLayout>
    <div class="header d-flex justify-content-between align-items-center p-3 bg-light shadow-sm rounded">
      <input v-model="search" type="text" placeholder="🔍 Ara..." class="form-control w-25" />
      <button @click="toggleForm" class="btn btn-primary shadow-sm">+ Yeni Sayfa</button>
    </div>

    <transition name="fade-slide">
      <div v-if="showForm" class="form-container card shadow-lg p-4 mt-3">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link" :class="{'active': activeTab === 'general'}" @click="activeTab = 'general'">Genel Bilgiler</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="{'active': activeTab === 'seo'}" @click="activeTab = 'seo'">S.E.O Bilgileri</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="{'active': activeTab === 'other'}" @click="activeTab = 'other'">Diğer</a>
          </li>
        </ul>

        <div class="tab-content p-3">
          <div v-if="activeTab === 'general'">
            <label>Sayfa Başlığı</label>
            <input v-model="newPage.title" type="text" class="form-control mb-2" />
            <label>Sayfa İçeriği</label>
            <textarea v-model="newPage.content" class="form-control" rows="4"></textarea>
          </div>

          <div v-if="activeTab === 'seo'">
            <label>SEO Başlığı</label>
            <input v-model="newPage.seoTitle" type="text" class="form-control mb-2" />
            <label>SEO Açıklaması</label>
            <input v-model="newPage.seoDescription" type="text" class="form-control mb-2" />
            <label>SEO Anahtar Kelimeleri</label>
            <input v-model="newPage.seoKeywords" type="text" class="form-control" />
          </div>

          <div v-if="activeTab === 'other'">
            <label>Özel Kodlar</label>
            <input v-model="newPage.codes" type="text" class="form-control mb-2" />
            <label>Yönlendirme Linki</label>
            <input v-model="newPage.redirectLink" type="text" class="form-control" />
          </div>
        </div>

        <div class="form-actions text-end">
          <button @click="savePage" class="btn btn-success me-2">Kaydet</button>
          <button @click="toggleForm" class="btn btn-secondary">İptal</button>
        </div>
      </div>
    </transition>

    <table class="table table-hover mt-3 shadow-sm">
      <thead class="table-dark">
        <tr>
          <th><input type="checkbox" /></th>
          <th>Sayfa No</th>
          <th>Başlık</th>
          <th>Özel Kodlar</th>
          <th>İşlemler</th>
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
              <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">İşlemler</button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" @click="viewPage(page.id)">👁 Hızlı Görüntüle</a></li>
                <li><a class="dropdown-item" @click="editPage(page.id)">🔗 İçerik Sayfası</a></li>
                <li><a class="dropdown-item text-danger" @click="deletePage(page.id)">🗑 Sil</a></li>
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
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.5s ease;
}
.fade-slide-enter, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.table-hover tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
