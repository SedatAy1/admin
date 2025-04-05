<template>
  <ContentLayout>
    <div class="header d-flex justify-content-between align-items-center p-3 bg-light shadow-sm rounded">
      <input v-model="search" type="text" placeholder="🔍 Ara..." class="form-control w-25" />
      <div>
        <button @click="toggleForm" class="btn btn-primary shadow-sm">+ Yeni Yazı</button>
        <button class="btn btn-secondary shadow-sm ms-2">+ Kategoriler</button>
      </div>
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
            <label>Başlık <span class="text-danger">(Zorunlu)</span></label>
            <input v-model="newPost.title" type="text" class="form-control mb-2" />
            <div class="row">
              <div class="col-md-6">
                <label>Blog Kategorisi</label>
                <select v-model="newPost.blogCategory" class="form-control mb-2">
                  <option>Hiçbiri seçilmedi</option>
                </select>
              </div>
              <div class="col-md-6">
                <label>Ürün Kategorisi</label>
                <select v-model="newPost.productCategory" class="form-control mb-2">
                  <option>Kategori Seçilmedi</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label>Eklenme Tarihi</label>
                <input v-model="newPost.date" type="datetime-local" class="form-control mb-2" />
              </div>
              <div class="col-md-6">
                <label>Durum</label>
                <select v-model="newPost.status" class="form-control mb-2">
                  <option>Aktif</option>
                  <option>Pasif</option>
                </select>
              </div>
            </div>
            <label>Resim</label>
            <input type="file" @change="uploadFile" class="form-control mb-2" />
            <label>Kısa Açıklama</label>
            <input v-model="newPost.shortDescription" type="text" class="form-control mb-2" />
            <label>İçerik</label>
            <textarea v-model="newPost.content" class="form-control rich-text-editor" rows="6"></textarea>
          </div>

          <div v-if="activeTab === 'seo'">
            <label>SEO Başlığı</label>
            <input v-model="newPost.seoTitle" type="text" class="form-control mb-2" />
            <label>SEO Açıklaması</label>
            <input v-model="newPost.seoDescription" type="text" class="form-control mb-2" />
            <label>SEO Anahtar Kelimeleri</label>
            <input v-model="newPost.seoKeywords" type="text" class="form-control" />
          </div>
        </div>

        <div class="form-actions text-end">
          <button @click="savePost" class="btn btn-success me-2">Kaydet</button>
          <button @click="toggleForm" class="btn btn-secondary">İptal</button>
        </div>
      </div>
    </transition>

    <table class="table table-hover mt-3 shadow-sm">
      <thead class="table-dark">
        <tr>
          <th>#</th>
          <th>Yazı No</th>
          <th>Başlık</th>
          <th>Kategori</th>
          <th>Okunma</th>
          <th>Tarih</th>
          <th>Durum</th>
          <th>İşlemler</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(post, index) in filteredPosts" :key="post.id">
          <td>{{ index + 1 }}</td>
          <td>{{ post.id }}</td>
          <td>{{ post.title }}</td>
          <td>{{ post.blogCategory }}</td>
          <td>{{ post.views }}</td>
          <td>{{ post.date }}</td>
          <td>{{ post.status }}</td>
          <td>
            <div class="dropdown">
              <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">İşlemler</button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" @click="editPost(post.id)">✏️ Düzenle</a></li>
                <li><a class="dropdown-item text-danger" @click="deletePost(post.id)">🗑 Sil</a></li>
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
      newPost: { title: '', blogCategory: '', productCategory: '', date: '', status: 'Aktif', shortDescription: '', content: '', seoTitle: '', seoDescription: '', seoKeywords: '' },
      posts: []
    };
  },
  computed: {
    filteredPosts() {
      return this.posts.filter(post => post.title.toLowerCase().includes(this.search.toLowerCase()));
    }
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm;
    },
    savePost() {
      this.posts.push({ id: this.posts.length + 1, ...this.newPost });
      this.newPost = { title: '', blogCategory: '', productCategory: '', date: '', status: 'Aktif', shortDescription: '', content: '', seoTitle: '', seoDescription: '', seoKeywords: '' };
      this.showForm = false;
    },
    editPost(id) {
      alert(`Düzenleme Açıldı: Yazı ${id}`);
    },
    deletePost(id) {
      this.posts = this.posts.filter(post => post.id !== id);
    },
    uploadFile(event) {
      console.log("Dosya seçildi:", event.target.files[0]);
    }
  }
};
</script>
