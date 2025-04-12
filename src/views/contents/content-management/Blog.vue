<template>
  <ContentLayout>
    <div class="header d-flex justify-content-between align-items-center p-3 bg-light shadow-sm rounded">
      <input v-model="search" type="text" :placeholder="$t('common.search')" class="form-control w-25" />
      <div>
        <button @click="toggleForm" class="btn btn-primary shadow-sm">+ {{ $t('blog.new') }}</button>
        <button class="btn btn-secondary shadow-sm ms-2">+ {{ $t('blog.categories') }}</button>
      </div>
    </div>

    <transition name="fade-slide">
      <div v-if="showForm" class="form-container card shadow-lg p-4 mt-3">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link" :class="{ active: activeTab === 'general' }" @click="activeTab = 'general'">{{ $t('blog.fields.general') }}</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="{ active: activeTab === 'seo' }" @click="activeTab = 'seo'">{{ $t('blog.fields.seo') }}</a>
          </li>
        </ul>

        <div class="tab-content p-3">
          <div v-if="activeTab === 'general'">
            <label>{{ $t('blog.fields.title') }} <span class="text-danger">({{ $t('common.required') }})</span></label>
            <input v-model="newPost.title" type="text" class="form-control mb-2" />
            <div class="row">
              <div class="col-md-6">
                <label>{{ $t('blog.fields.blogCategory') }}</label>
                <select v-model="newPost.blogCategory" class="form-control mb-2">
                  <option>{{ $t('common.noneSelected') }}</option>
                </select>
              </div>
              <div class="col-md-6">
                <label>{{ $t('blog.fields.productCategory') }}</label>
                <select v-model="newPost.productCategory" class="form-control mb-2">
                  <option>{{ $t('common.noneSelected') }}</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label>{{ $t('blog.fields.date') }}</label>
                <input v-model="newPost.date" type="datetime-local" class="form-control mb-2" />
              </div>
              <div class="col-md-6">
                <label>{{ $t('blog.fields.status') }}</label>
                <select v-model="newPost.status" class="form-control mb-2">
                  <option>{{ $t('common.active') }}</option>
                  <option>{{ $t('common.inactive') }}</option>
                </select>
              </div>
            </div>
            <label>{{ $t('blog.fields.image') }}</label>
            <input type="file" @change="uploadFile" class="form-control mb-2" />
            <label>{{ $t('blog.fields.shortDescription') }}</label>
            <input v-model="newPost.shortDescription" type="text" class="form-control mb-2" />
            <label>{{ $t('blog.fields.content') }}</label>
            <textarea v-model="newPost.content" class="form-control rich-text-editor" rows="6"></textarea>
          </div>

          <div v-if="activeTab === 'seo'">
            <label>{{ $t('blog.fields.seoTitle') }}</label>
            <input v-model="newPost.seoTitle" type="text" class="form-control mb-2" />
            <label>{{ $t('blog.fields.seoDescription') }}</label>
            <input v-model="newPost.seoDescription" type="text" class="form-control mb-2" />
            <label>{{ $t('blog.fields.seoKeywords') }}</label>
            <input v-model="newPost.seoKeywords" type="text" class="form-control" />
          </div>
        </div>

        <div class="form-actions text-end">
          <button @click="savePost" class="btn btn-success me-2">{{ $t('common.save') }}</button>
          <button @click="toggleForm" class="btn btn-secondary">{{ $t('common.cancel') }}</button>
        </div>
      </div>
    </transition>

    <table class="table table-hover mt-3 shadow-sm">
      <thead class="table-dark">
        <tr>
          <th>#</th>
          <th>{{ $t('blog.fields.id') }}</th>
          <th>{{ $t('blog.fields.title') }}</th>
          <th>{{ $t('blog.fields.blogCategory') }}</th>
          <th>{{ $t('blog.fields.views') }}</th>
          <th>{{ $t('blog.fields.date') }}</th>
          <th>{{ $t('blog.fields.status') }}</th>
          <th>{{ $t('common.actions') }}</th>
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
              <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">{{ $t('common.actions') }}</button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" @click="editPost(post.id)">✏️ {{ $t('common.edit') }}</a></li>
                <li><a class="dropdown-item text-danger" @click="deletePost(post.id)">🗑 {{ $t('common.delete') }}</a></li>
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
<style scoped>
/* Animasyon */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.5s ease;
}
.fade-slide-enter, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Header */
.header {
  background-color: var(--bs-light);
  border-radius: 10px;
  margin-bottom: 20px;
}
.header input {
  transition: box-shadow 0.3s ease;
}
.header input:focus {
  box-shadow: 0 0 0 0.2rem rgba(59, 130, 246, 0.25);
}

/* Form Container */
.form-container {
  border-radius: 12px;
  background-color: var(--bs-white);
}
.form-container label {
  font-weight: 500;
  margin-bottom: 5px;
}
.form-container .nav-tabs .nav-link {
  cursor: pointer;
}

/* Tablo */
.table-hover tbody tr:hover {
  background-color: rgba(59, 130, 246, 0.05);
}
.dropdown-menu {
  font-size: 14px;
}

/* Rich Text */
.rich-text-editor {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 12px;
  font-size: 14px;
  background-color: #fff;
  resize: vertical;
  min-height: 150px;
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
.dark .table-hover tbody tr:hover {
  background-color: rgba(255, 255, 255, 0.03);
}
.dark .rich-text-editor {
  background-color: #2e2e3e;
  color: #f3f4f6;
  border: 1px solid var(--border);
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

  .form-container .row {
    flex-direction: column;
  }

  .form-container .col-md-6 {
    width: 100% !important;
  }
}
</style>
