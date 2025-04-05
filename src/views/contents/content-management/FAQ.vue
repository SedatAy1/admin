<template>
  <ContentLayout>
    <div class="header d-flex justify-content-between align-items-center p-3 bg-light shadow-sm rounded">
      <input v-model="search" type="text" placeholder="🔍 Ara..." class="form-control w-25" />
      <button @click="toggleForm" class="btn btn-primary shadow-sm">+ Yeni Soru</button>
    </div>

    <transition name="fade-slide">
      <div v-if="showForm" class="form-container card shadow-lg p-4 mt-3">
        <h4 class="mb-3">Sıkça Sorulan Sorular</h4>

        <div class="row mb-3">
          <div class="col-md-8">
            <label>Soru</label>
            <input v-model="newFaq.question" type="text" class="form-control" />
          </div>
          <div class="col-md-4">
            <label>Sıra</label>
            <input v-model="newFaq.order" type="number" class="form-control" />
          </div>
        </div>

        <div class="mb-3">
          <label>Cevap</label>
          <textarea v-model="newFaq.answer" class="form-control rich-text-editor" rows="6"></textarea>
        </div>

        <div class="form-actions text-end">
          <button @click="saveFaq" class="btn btn-success me-2">Kaydet</button>
          <button @click="toggleForm" class="btn btn-secondary">İptal</button>
        </div>
      </div>
    </transition>

    <table class="table table-hover mt-3 shadow-sm">
      <thead class="table-dark">
        <tr>
          <th>#</th>
          <th>Soru No</th>
          <th>Soru</th>
          <th>Sıra</th>
          <th>İşlemler</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(faq, index) in filteredFaqs" :key="faq.id">
          <td>{{ index + 1 }}</td>
          <td>{{ faq.id }}</td>
          <td>{{ faq.question }}</td>
          <td>{{ faq.order }}</td>
          <td>
            <div class="dropdown">
              <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">İşlemler</button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" @click="editFaq(faq.id)">✏️ Düzenle</a></li>
                <li><a class="dropdown-item text-danger" @click="deleteFaq(faq.id)">🗑 Sil</a></li>
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
      newFaq: { question: '', answer: '', order: 0 },
      faqs: []
    };
  },
  computed: {
    filteredFaqs() {
      return this.faqs.filter(faq => faq.question.toLowerCase().includes(this.search.toLowerCase()));
    }
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm;
    },
    saveFaq() {
      this.faqs.push({ id: this.faqs.length + 1, ...this.newFaq });
      this.newFaq = { question: '', answer: '', order: 0 };
      this.showForm = false;
    },
    editFaq(id) {
      alert(`Düzenleme Açıldı: Soru ${id}`);
    },
    deleteFaq(id) {
      this.faqs = this.faqs.filter(faq => faq.id !== id);
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

.table-hover tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.rich-text-editor {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  min-height: 200px;
}
</style>
