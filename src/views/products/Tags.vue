<template>
  <div class="tags">
    <!-- Arama Çubuğu ve Yeni Etiket Butonu -->
    <div class="search-container">
      <input type="text" v-model="searchTerm" placeholder="🔍 Ara..." class="search-input" />
      <button class="btn primary" @click="showNewTagModal = true">+ Yeni Etiket</button>
    </div>

    <!-- Yeni Etiket Modal -->
    <Modal :isOpen="showNewTagModal" title="Yeni Etiket" @close="showNewTagModal = false">
      <div class="modal-body">
        <div class="form-group">
          <label>Etiket Adı <span class="required">Zorunlu</span></label>
          <input type="text" v-model="newTag.name" />
        </div>
        <div class="form-group">
          <label>Resim</label>
          <input type="file" @change="handleFileUpload" />
        </div>

        <!-- Etiket Konum Seçenekleri -->
        <div class="tag-positions">
          <div v-for="(position, index) in tagPositions" :key="index" class="position-option">
            <i class="fas fa-tag"></i>
            <span>{{ position.label }}</span>
            <p>Açıklama Girilecek.</p>
            <input type="checkbox" v-model="position.enabled" />
          </div>
        </div>
      </div>
      <template v-slot:footer>
        <button class="submit-btn" @click="saveTag">✔ Kaydet</button>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";

export default {
  name: "TagsManagement",
  components: { Modal },
  data() {
    return {
      searchTerm: "",
      showNewTagModal: false,
      newTag: {
        name: "",
        image: null,
      },
      tagPositions: [
        { label: "Sol Üst", enabled: false },
        { label: "Sağ Üst", enabled: false },
        { label: "Sol Alt", enabled: false },
        { label: "Sağ Alt", enabled: false },
      ],
    };
  },
  methods: {
    handleFileUpload(event) {
      this.newTag.image = event.target.files[0];
    },
    saveTag() {
      console.log("Yeni Etiket Kaydedildi:", this.newTag);
      this.showNewTagModal = false;
    },
  },
};
</script>

<style scoped>
.tags {
  padding: 20px;
}

.search-container {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 15px;
}

.search-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex-grow: 1;
}

.btn.primary {
  background: #003c8f;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 5px;
}

.required {
  color: red;
  margin-left: 5px;
}

.tag-positions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.position-option {
  background: #f8f9fa;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 48%;
}

.submit-btn {
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
}
</style>
