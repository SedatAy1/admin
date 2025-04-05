<template>
  <ContentLayout>
    <div class="header d-flex justify-content-between align-items-center p-3 bg-light shadow-sm rounded">
      <button @click="toggleForm" class="btn btn-primary shadow-sm">+ Yeni Banner Grubu</button>
    </div>

    <div class="mt-3">
      <table class="table table-bordered shadow-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Banner No</th>
            <th>Banner Grubu Adı</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="banners.length" v-for="(banner, index) in banners" :key="banner.id">
            <td>{{ index + 1 }}</td>
            <td>{{ banner.id }}</td>
            <td>{{ banner.name }}</td>
            <td>
              <button @click="editBanner(banner.id)" class="btn btn-sm btn-primary me-2">Düzenle</button>
              <button @click="deleteBanner(banner.id)" class="btn btn-sm btn-danger">Sil</button>
            </td>
          </tr>
          <tr v-else>
            <td colspan="4" class="text-center text-muted">Kayıt bulunamadı.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <transition name="fade-slide">
      <div v-if="showForm" class="form-container card shadow-lg p-4 mt-3">
        <h4 class="mb-3">Afiş Yönetimi</h4>

        <div class="mb-3">
          <label>Grup Adı</label>
          <input v-model="newBanner.name" type="text" class="form-control" required />
        </div>

        <div class="mb-3 upload-box" @click="uploadBanner">
          <input type="file" ref="fileInput" @change="handleFileUpload" class="d-none" />
          <div class="upload-area">
            <i class="bi bi-upload"></i>
            <p>Banner yüklemek için buraya tıklayın.</p>
          </div>
        </div>

        <div class="form-actions text-end">
          <button @click="saveBanner" class="btn btn-success me-2">Kaydet</button>
          <button @click="toggleForm" class="btn btn-secondary">İptal</button>
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
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.5s ease;
}
.fade-slide-enter, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.table {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

.upload-box {
  border: 2px dashed #007bff;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  color: #007bff;
}
.upload-box:hover {
  background-color: #f8f9fa;
}
</style>