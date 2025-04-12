<template>
  <div class="tags">
    <!-- Arama Çubuğu ve Yeni Etiket Butonu -->
    <div class="search-container">
      <input type="text" v-model="searchTerm" :placeholder="$t('tag.search')" class="search-input" />
      <button class="btn primary" @click="showNewTagModal = true">{{ $t('tag.new') }}</button>
    </div>

    <!-- Yeni Etiket Modal -->
    <Modal :isOpen="showNewTagModal" :title="$t('tag.newTitle')" @close="showNewTagModal = false">
      <div class="modal-body">
        <div class="form-group">
          <label>{{ $t('tag.name') }} <span class="required">{{ $t('common.required') }}</span></label>
          <input type="text" v-model="newTag.name" />
        </div>
        <div class="form-group">
          <label>{{ $t('tag.image') }}</label>
          <input type="file" @change="handleFileUpload" />
        </div>

        <!-- Etiket Konum Seçenekleri -->
        <div class="tag-positions">
          <div v-for="(position, index) in tagPositions" :key="index" class="position-option">
            <i class="fas fa-tag"></i>
            <span>{{ $t(`tag.positions.${position.key}`) }}</span>
            <p>{{ $t('tag.positionDesc') }}</p>
            <input type="checkbox" v-model="position.enabled" />
          </div>
        </div>
      </div>
      <template v-slot:footer>
        <button class="submit-btn" @click="saveTag">✔ {{ $t('common.save') }}</button>
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
  background: #ffffff;
  min-height: 100vh;
  transition: background 0.3s ease;
}

/* Arama Alanı ve Buton */
.search-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin-bottom: 20px;
}

.search-input {
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  flex-grow: 1;
  min-width: 240px;
  font-size: 14px;
}

.btn.primary {
  background: #003c8f;
  color: white;
  padding: 10px 16px;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn.primary:hover {
  background: #002f6c;
}

/* Form */
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 14px;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 5px;
}

.required {
  color: red;
  margin-left: 5px;
  font-size: 12px;
}

/* Konum Seçenekleri */
.tag-positions {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 20px;
}

.position-option {
  background: #f1f5f9;
  padding: 12px;
  border-radius: 8px;
  flex: 1 1 calc(50% - 15px);
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  transition: background 0.3s ease;
}

.position-option i {
  color: #003c8f;
  font-size: 16px;
}

/* Kaydet Butonu */
.submit-btn {
  width: 100%;
  padding: 12px;
  background: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.submit-btn:hover {
  background: #0056b3;
}

/* Dark Mode */
.dark-mode .tags {
  background: #1e293b;
  color: #f8fafc;
}

.dark-mode .search-input {
  background: #1e293b;
  border-color: #475569;
  color: #f1f5f9;
}

.dark-mode .position-option {
  background: #334155;
  color: #e2e8f0;
}

.dark-mode .form-group input,
.dark-mode .form-group select,
.dark-mode .form-group textarea {
  background: #1e293b;
  border-color: #475569;
  color: #f1f5f9;
}

.dark-mode .submit-btn {
  background: #3b82f6;
}

.dark-mode .submit-btn:hover {
  background: #2563eb;
}

.dark-mode .btn.primary {
  background: #0ea5e9;
  color: #fff;
}
.dark-mode .btn.primary:hover {
  background: #0284c7;
}

/* Responsive */
@media (max-width: 768px) {
  .position-option {
    flex: 1 1 100%;
  }

  .search-container {
    flex-direction: column;
    align-items: stretch;
  }

  .btn {
    width: 100%;
  }
}
</style>