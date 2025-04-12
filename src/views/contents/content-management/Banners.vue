<template>
  <ContentLayout>
    <div class="header d-flex justify-content-between align-items-center p-3 bg-light shadow-sm rounded">
      <button @click="toggleForm" class="btn btn-primary shadow-sm">+ {{ $t('banner.newGroup') }}</button>
    </div>

    <div class="mt-3">
      <table class="table table-bordered shadow-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t('banner.fields.id') }}</th>
            <th>{{ $t('banner.fields.name') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="banners.length" v-for="(banner, index) in banners" :key="banner.id">
            <td>{{ index + 1 }}</td>
            <td>{{ banner.id }}</td>
            <td>{{ banner.name }}</td>
            <td>
              <button @click="editBanner(banner.id)" class="btn btn-sm btn-primary me-2">{{ $t('common.edit') }}</button>
              <button @click="deleteBanner(banner.id)" class="btn btn-sm btn-danger">{{ $t('common.delete') }}</button>
            </td>
          </tr>
          <tr v-else>
            <td colspan="4" class="text-center text-muted">{{ $t('common.noData') }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <transition name="fade-slide">
      <div v-if="showForm" class="form-container card shadow-lg p-4 mt-3">
        <h4 class="mb-3">{{ $t('banner.title') }}</h4>

        <div class="mb-3">
          <label>{{ $t('banner.fields.name') }}</label>
          <input v-model="newBanner.name" type="text" class="form-control" required />
        </div>

        <div class="mb-3 upload-box" @click="uploadBanner">
          <input type="file" ref="fileInput" @change="handleFileUpload" class="d-none" />
          <div class="upload-area">
            <i class="bi bi-upload"></i>
            <p>{{ $t('banner.uploadText') }}</p>
          </div>
        </div>

        <div class="form-actions text-end">
          <button @click="saveBanner" class="btn btn-success me-2">{{ $t('common.save') }}</button>
          <button @click="toggleForm" class="btn btn-secondary">{{ $t('common.cancel') }}</button>
        </div>
      </div>
    </transition>
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
      showForm: false,
      newBanner: { id: null, name: '', file: null },
      banners: [
        { id: 1, name: "Ana Sayfa Banner" },
        { id: 2, name: "Kampanya Banner" }
      ]
    };
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm;
      if (!this.showForm) {
        this.newBanner = { id: null, name: '', file: null };
      }
    },
    saveBanner() {
      if (!this.newBanner.name.trim()) {
        alert("Grup adı boş olamaz!");
        return;
      }
      if (this.newBanner.id) {
        const index = this.banners.findIndex(banner => banner.id === this.newBanner.id);
        if (index !== -1) {
          this.banners[index] = { ...this.newBanner };
        }
      } else {
        this.newBanner.id = this.banners.length + 1;
        this.banners.push({ ...this.newBanner });
      }
      this.toggleForm();
    },
    editBanner(id) {
      const banner = this.banners.find(banner => banner.id === id);
      if (banner) {
        this.newBanner = { ...banner };
        this.showForm = true;
      }
    },
    deleteBanner(id) {
      this.banners = this.banners.filter(banner => banner.id !== id);
    },
    uploadBanner() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      this.newBanner.file = event.target.files[0];
    }
  }
};
</script>

<style scoped>
/* Animasyon */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Genel */
:root {
  --bg: #ffffff;
  --text: #1f2937;
  --card: #f9fafb;
  --muted: #6b7280;
  --accent: #3b82f6;
  --accent-light: #dbeafe;
  --glass-bg: rgba(255, 255, 255, 0.4);
}
.dark {
  --bg: #1a1c2c;
  --text: #f9fafb;
  --card: #24263b;
  --muted: #9ca3af;
  --accent: #60a5fa;
  --accent-light: rgba(96, 165, 250, 0.1);
  --glass-bg: rgba(36, 38, 59, 0.4);
}

/* Form Alanları */
.form-container {
  background: var(--card);
  border-radius: 16px;
  padding: 30px;
  backdrop-filter: blur(6px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}
.form-container label {
  font-weight: 500;
  color: var(--text);
}

/* Input */
input[type="text"],
input[type="file"],
select {
  width: 100%;
  padding: 10px 12px;
  margin-top: 6px;
  margin-bottom: 16px;
  font-size: 14px;
  background: var(--bg);
  color: var(--text);
  border: 1px solid #d1d5db;
  border-radius: 8px;
  outline: none;
  transition: border 0.2s;
}
.dark input,
.dark select {
  background: #2b2e44;
  border: 1px solid #444857;
}

/* Upload Box */
.upload-box {
  border-radius: 14px;
  padding: 30px;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px dashed var(--accent);
  text-align: center;
  color: var(--accent);
  cursor: pointer;
  transition: all 0.3s ease;
}
.upload-box:hover {
  background: var(--accent-light);
  border-style: solid;
}
.upload-box i {
  font-size: 28px;
  margin-bottom: 10px;
  display: block;
}

/* Tablo */
.table {
  background: var(--card);
  color: var(--text);
  border-radius: 12px;
  overflow: hidden;
}
.table th {
  background-color: var(--accent);
  color: rgb(173, 38, 38);
  font-weight: 600;
  font-size: 14px;
}
.table td {
  font-size: 14px;
}
.table-hover tbody tr:hover {
  background-color: var(--accent-light);
}

/* Butonlar */
.btn {
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 8px;
  transition: 0.3s;
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
.btn-secondary {
  background: #1c3e84;
  color: #1f2937;
}
.dark .btn-secondary {
  background: #374151;
  color: #f3f4f6;
}

/* Responsive */
@media (max-width: 768px) {
  .form-container .row {
    flex-direction: column;
  }
  .form-container .col-md-6 {
    width: 100% !important;
  }
  .header {
    flex-direction: column;
    gap: 10px;
  }
}
</style>