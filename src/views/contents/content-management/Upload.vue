<template>
  <ContentLayout>
    <div class="card shadow-sm p-4">
      <h4 class="mb-3">{{ $t("imageUpload.title") }}</h4>

      <div class="mb-3">
        <label>{{ $t("imageUpload.fields.image") }}</label>
        <input type="file" ref="fileInput" @change="handleFileUpload" class="form-control" />
      </div>

      <div class="text-end">
        <button @click="uploadImage" class="btn btn-primary">✔ {{ $t("common.upload") }}</button>
      </div>
    </div>
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
      selectedFile: null
    };
  },
  methods: {
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    uploadImage() {
      if (!this.selectedFile) {
        alert("Lütfen bir dosya seçin!");
        return;
      }
      console.log("Dosya yüklendi:", this.selectedFile.name);
      alert("Dosya başarıyla yüklendi: " + this.selectedFile.name);
    }
  }
};
</script>

<style scoped>
.card {
  background-color: var(--card);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: background-color 0.3s ease;
  color: var(--text);
}

/* Tema Değişkenleri */
:root {
  --bg: #ffffff;
  --text: #1f2937;
  --card: #f9fafb;
  --accent: #316cf4;
}

.dark {
  --bg: #1a1c2c;
  --text: #f3f4f6;
  --card: #24263b;
  --accent: #438aff;
}

/* Input */
input[type="file"] {
  padding: 12px;
  background: var(--bg);
  color: var(--text);
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.dark input[type="file"] {
  background: #2b2e44;
  border-color: #444857;
}

/* Buton */
.btn-primary {
  background: #316cf4;
  color: white;
  border: none;
  transition: background 0.3s ease;
}
.btn-primary:hover {
  background: #2554c7; /* biraz koyusu */
}
/* Responsive */
@media (max-width: 768px) {
  .card {
    padding: 16px;
  }
}

</style>
