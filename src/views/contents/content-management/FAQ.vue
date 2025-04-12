<template>
  <ContentLayout>
    <!-- Üst Kısım -->
    <div class="header d-flex justify-content-between align-items-center p-3 bg-light shadow-sm rounded">
      <input v-model="search" type="text" :placeholder="$t('common.search')" class="form-control w-25" />
      <button @click="toggleForm" class="btn btn-primary shadow-sm">
        + {{ $t('faq.new') }}
      </button>
    </div>

    <!-- Form Alanı -->
    <transition name="fade-slide">
      <div v-if="showForm" class="form-container card shadow-lg p-4 mt-3">
        <h4 class="mb-3">{{ $t('faq.title') }}</h4>

        <div class="row mb-3">
          <div class="col-md-8">
            <label>{{ $t('faq.fields.question') }}</label>
            <input v-model="newFaq.question" type="text" class="form-control" />
          </div>
          <div class="col-md-4">
            <label>{{ $t('faq.fields.order') }}</label>
            <input v-model="newFaq.order" type="number" class="form-control" />
          </div>
        </div>

        <div class="mb-3">
          <label>{{ $t('faq.fields.answer') }}</label>
          <textarea v-model="newFaq.answer" class="form-control rich-text-editor" rows="6"></textarea>
        </div>

        <div class="form-actions text-end">
          <button @click="saveFaq" class="btn btn-success me-2">{{ $t('common.save') }}</button>
          <button @click="toggleForm" class="btn btn-secondary">{{ $t('common.cancel') }}</button>
        </div>
      </div>
    </transition>

    <!-- Liste Tablosu -->
    <table class="table table-hover mt-3 shadow-sm">
      <thead class="table-dark">
        <tr>
          <th>#</th>
          <th>{{ $t('faq.fields.id') }}</th>
          <th>{{ $t('faq.fields.question') }}</th>
          <th>{{ $t('faq.fields.order') }}</th>
          <th>{{ $t('common.actions') }}</th>
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
              <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                {{ $t('common.actions') }}
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" @click="editFaq(faq.id)">{{ $t('common.edit') }}</a></li>
                <li><a class="dropdown-item text-danger" @click="deleteFaq(faq.id)">{{ $t('common.delete') }}</a></li>
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
/* Animasyon */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.5s ease;
}
.fade-slide-enter, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Sayfa Başlığı ve Arama Alanı */
.header {
  background-color: var(--bs-light);
  border-radius: 10px;
  margin-bottom: 15px;
}
.header input {
  transition: box-shadow 0.3s ease;
}
.header input:focus {
  box-shadow: 0 0 0 0.2rem rgba(59, 130, 246, 0.25);
}

/* Form Alanı */
.form-container {
  border-radius: 10px;
  background-color: var(--bs-white);
}
.form-container label {
  font-weight: 500;
  margin-bottom: 5px;
}
.form-actions {
  margin-top: 20px;
}

/* Tablo */
.table {
  border-radius: 10px;
  overflow: hidden;
}
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

  .form-container .col-md-8,
  .form-container .col-md-4 {
    width: 100% !important;
  }
}
</style>
