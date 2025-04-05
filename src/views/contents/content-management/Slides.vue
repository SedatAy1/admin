<template>
  <ContentLayout>
    <div class="header d-flex justify-content-between align-items-center p-3 bg-light shadow-sm rounded">
      <button @click="toggleForm" class="btn btn-primary shadow-sm">+ Yeni Manşet</button>
    </div>

    <div class="alert alert-info mt-3">
      <i class="bi bi-info-circle"></i> Manşetlerin sıralamasını sürükle bırak yaparak değiştirebilirsiniz.
    </div>

    <transition name="fade-slide">
      <div v-if="showForm" class="form-container card shadow-lg p-4 mt-3">
        <h4 class="mb-3">Slayt Yönetimi</h4>

        <div class="row mb-3">
          <div class="col-md-6">
            <label>Başlık</label>
            <input v-model="newSlide.title" type="text" class="form-control" />
          </div>
          <div class="col-md-6">
            <label>Link</label>
            <input v-model="newSlide.link" type="text" class="form-control" />
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6">
            <label>Görsel (Web)</label>
            <input type="file" @change="uploadWebImage" class="form-control" />
          </div>
          <div class="col-md-6">
            <label>Görsel (Mobil Uyg.)</label>
            <input type="file" @change="uploadMobileImage" class="form-control" />
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6">
            <label>Ürün No (Mobil Uyg.)</label>
            <input v-model="newSlide.productId" type="text" class="form-control" />
          </div>
          <div class="col-md-6 d-flex align-items-center">
            <label class="me-2">Yeni Pencere</label>
            <input type="checkbox" v-model="newSlide.newTab" class="form-check-input" />
          </div>
        </div>

        <div class="mb-3">
          <label>Açıklama</label>
          <textarea v-model="newSlide.description" class="form-control" rows="3"></textarea>
        </div>

        <div class="form-actions text-end">
          <button @click="saveSlide" class="btn btn-success me-2">Kaydet</button>
          <button @click="toggleForm" class="btn btn-secondary">İptal</button>
        </div>
      </div>
    </transition>

    <div class="mt-3">
      <draggable v-if="slides.length" v-model="slides" class="list-group" @end="updateOrder">
        <div v-for="(slide, index) in slides" :key="slide.id" class="list-group-item d-flex justify-content-between align-items-center shadow-sm">
          <span class="fw-bold">Manşet #{{ slide.id }}</span>
          <div>
            <a href="#" @click.prevent="editSlide(slide.id)" class="text-primary me-3">Düzenle</a>
            <a href="#" @click.prevent="deleteSlide(slide.id)" class="text-danger">Sil</a>
          </div>
        </div>
      </draggable>
      <div v-else class="text-center text-muted mt-4">Kayıt bulunamadı.</div>
    </div>
  </ContentLayout>
</template>

<script>
import ContentLayout from "./ContentLayout.vue";
import draggable from "vuedraggable";

export default {
  components: {
    ContentLayout,
    draggable
  },
  data() {
    return {
      showForm: false,
      newSlide: { id: null, title: '', link: '', description: '', productId: '', newTab: false },
      slides: []
    };
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm;
      if (!this.showForm) {
        this.newSlide = { id: null, title: '', link: '', description: '', productId: '', newTab: false };
      }
    },
    saveSlide() {
      if (this.newSlide.id) {
        // Güncelleme işlemi
        const index = this.slides.findIndex(slide => slide.id === this.newSlide.id);
        if (index !== -1) {
          this.slides[index] = { ...this.newSlide };
        }
      } else {
        // Yeni manşet ekleme
        this.newSlide.id = this.slides.length + 1;
        this.slides.push({ ...this.newSlide });
      }
      this.toggleForm();
    },
    editSlide(id) {
      const slide = this.slides.find(slide => slide.id === id);
      if (slide) {
        this.newSlide = { ...slide };
        this.showForm = true;
      }
    },
    deleteSlide(id) {
      this.slides = this.slides.filter(slide => slide.id !== id);
    },
    uploadWebImage(event) {
      console.log("Web Görseli Yüklendi:", event.target.files[0]);
    },
    uploadMobileImage(event) {
      console.log("Mobil Görseli Yüklendi:", event.target.files[0]);
    },
    updateOrder() {
      console.log("Manşetlerin sıralaması güncellendi.");
    }
  }
};
</script>
