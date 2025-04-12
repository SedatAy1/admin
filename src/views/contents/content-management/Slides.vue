<template>
  <ContentLayout>
    <div class="header d-flex justify-content-between align-items-center p-3 bg-light shadow-sm rounded">
      <button @click="toggleForm" class="btn btn-primary shadow-sm">+ {{ $t('slider.new') }}</button>
    </div>

    <div class="alert alert-info mt-3">
      <i class="bi bi-info-circle"></i> {{ $t('slider.dragInfo') }}
    </div>

    <transition name="fade-slide">
      <div v-if="showForm" class="form-container card shadow-lg p-4 mt-3">
        <h4 class="mb-3">{{ $t('slider.title') }}</h4>

        <div class="row mb-3">
          <div class="col-md-6">
            <label>{{ $t('slider.fields.title') }}</label>
            <input v-model="newSlide.title" type="text" class="form-control" />
          </div>
          <div class="col-md-6">
            <label>{{ $t('slider.fields.link') }}</label>
            <input v-model="newSlide.link" type="text" class="form-control" />
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6">
            <label>{{ $t('slider.fields.webImage') }}</label>
            <input type="file" @change="uploadWebImage" class="form-control" />
          </div>
          <div class="col-md-6">
            <label>{{ $t('slider.fields.mobileImage') }}</label>
            <input type="file" @change="uploadMobileImage" class="form-control" />
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6">
            <label>{{ $t('slider.fields.productId') }}</label>
            <input v-model="newSlide.productId" type="text" class="form-control" />
          </div>
          <div class="col-md-6 d-flex align-items-center">
            <label class="me-2">{{ $t('slider.fields.newTab') }}</label>
            <input type="checkbox" v-model="newSlide.newTab" class="form-check-input" />
          </div>
        </div>

        <div class="mb-3">
          <label>{{ $t('slider.fields.description') }}</label>
          <textarea v-model="newSlide.description" class="form-control" rows="3"></textarea>
        </div>

        <div class="form-actions text-end">
          <button @click="saveSlide" class="btn btn-success me-2">{{ $t('common.save') }}</button>
          <button @click="toggleForm" class="btn btn-secondary">{{ $t('common.cancel') }}</button>
        </div>
      </div>
    </transition>

    <div class="mt-3">
      <draggable v-if="slides.length" v-model="slides" class="list-group" @end="updateOrder">
        <div v-for="(slide, index) in slides" :key="slide.id" class="list-group-item d-flex justify-content-between align-items-center shadow-sm">
          <span class="fw-bold">{{ $t('slider.item') }} #{{ slide.id }}</span>
          <div>
            <a href="#" @click.prevent="editSlide(slide.id)" class="text-primary me-3">{{ $t('common.edit') }}</a>
            <a href="#" @click.prevent="deleteSlide(slide.id)" class="text-danger">{{ $t('common.delete') }}</a>
          </div>
        </div>
      </draggable>
      <div v-else class="text-center text-muted mt-4">{{ $t('common.noData') }}</div>
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
<style scoped>
/* Animasyon */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Uyarı Kutusu */
.alert-info {
  background-color: #e8f1ff;
  border-color: #cfe2ff;
  color: #084298;
  border-radius: 8px;
}

/* Form Alanı */
.form-container {
  border-radius: 12px;
  background-color: var(--bs-white);
}
.form-container label {
  font-weight: 500;
  margin-bottom: 5px;
}
textarea.form-control {
  resize: vertical;
  min-height: 100px;
}

/* Sıralanabilir Liste */
.list-group-item {
  background-color: var(--bs-white);
  border: 1px solid #e5e7eb;
  padding: 12px 20px;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: grab;
  transition: background 0.2s ease;
}
.list-group-item:hover {
  background-color: #f3f4f6;
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
.dark .list-group-item,
.dark .alert-info {
  background-color: var(--card) !important;
  color: var(--text);
}
.dark .form-control,
.dark input,
.dark textarea,
.dark select {
  background-color: #2e2e3e !important;
  color: white !important;
  border: 1px solid var(--border);
}
.dark .list-group-item:hover {
  background-color: rgba(255, 255, 255, 0.04);
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
