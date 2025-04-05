<template>
  <ContentLayout>
    <div class="header d-flex justify-content-between align-items-center p-3 bg-light shadow-sm rounded">
      <input v-model="search" type="text" placeholder="🔍 Ara..." class="form-control w-25" />
      <button @click="toggleForm" class="btn btn-primary shadow-sm">+ Yeni Başlık</button>
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
        </ul>

        <div class="tab-content p-3">
          <div v-if="activeTab === 'general'">
            <label>Başlık</label>
            <input v-model="newHelp.title" type="text" class="form-control mb-2" />
            <label>Sıralama Önceliği</label>
            <input v-model="newHelp.order" type="number" class="form-control mb-2" />
            <label>Durum</label>
            <select v-model="newHelp.status" class="form-control mb-2">
              <option value="Aktif">Aktif</option>
              <option value="Pasif">Pasif</option>
            </select>
            <label>Resim</label>
            <input type="file" @change="uploadFile" class="form-control" />
          </div>

          <div v-if="activeTab === 'seo'">
            <label>SEO Başlığı</label>
            <input v-model="newHelp.seoTitle" type="text" class="form-control mb-2" />
            <label>SEO Açıklaması</label>
            <input v-model="newHelp.seoDescription" type="text" class="form-control mb-2" />
            <label>SEO Anahtar Kelimeleri</label>
            <input v-model="newHelp.seoKeywords" type="text" class="form-control" />
          </div>
        </div>

        <div class="form-actions text-end">
          <button @click="saveHelp" class="btn btn-success me-2">Kaydet</button>
          <button @click="toggleForm" class="btn btn-secondary">İptal</button>
        </div>
      </div>
    </transition>

    <table class="table table-hover mt-3 shadow-sm">
      <thead class="table-dark">
        <tr>
          <th>#</th>
          <th>Başlık No</th>
          <th>Başlık</th>
          <th>Durum</th>
          <th>Sıra</th>
          <th>İşlemler</th>
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
              <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">İşlemler</button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" @click="editHelp(help.id)">✏️ Düzenle</a></li>
                <li><a class="dropdown-item text-danger" @click="deleteHelp(help.id)">🗑 Sil</a></li>
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
