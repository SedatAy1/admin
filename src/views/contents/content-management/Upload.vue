<template>
  <ContentLayout>
    <div class="card shadow-sm p-4">
      <h4 class="mb-3">Resim Yükle</h4>

      <div class="mb-3">
        <label>Resim</label>
        <input type="file" ref="fileInput" @change="handleFileUpload" class="form-control" />
      </div>

      <div class="text-end">
        <button @click="uploadImage" class="btn btn-primary">✔ Yükle</button>
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
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
