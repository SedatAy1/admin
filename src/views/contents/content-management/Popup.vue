<template>
  <ContentLayout>
    <div class="header d-flex justify-content-between align-items-center p-3 bg-light shadow-sm rounded">
      <button @click="toggleForm" class="btn btn-primary shadow-sm">+ {{ $t('popup.new') }}</button>
    </div>

    <div class="mt-3">
      <table class="table table-bordered shadow-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t('popup.fields.id') }}</th>
            <th>{{ $t('popup.fields.title') }}</th>
            <th>{{ $t('popup.fields.mobile') }}</th>
            <th>{{ $t('popup.fields.desktop') }}</th>
            <th>{{ $t('popup.fields.start') }}</th>
            <th>{{ $t('popup.fields.end') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="popups.length" v-for="(popup, index) in popups" :key="popup.id">
            <td>{{ index + 1 }}</td>
            <td>{{ popup.id }}</td>
            <td>{{ popup.title }}</td>
            <td>{{ popup.mobile ? '✔' : '✖' }}</td>
            <td>{{ popup.desktop ? '✔' : '✖' }}</td>
            <td>{{ popup.startDate }}</td>
            <td>{{ popup.endDate }}</td>
            <td>
              <button @click="editPopup(popup.id)" class="btn btn-sm btn-primary me-2">{{ $t('common.edit') }}</button>
              <button @click="deletePopup(popup.id)" class="btn btn-sm btn-danger">{{ $t('common.delete') }}</button>
            </td>
          </tr>
          <tr v-else>
            <td colspan="8" class="text-center text-muted">{{ $t('common.noData') }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <transition name="fade-slide">
      <div v-if="showForm" class="form-container card shadow-lg p-4 mt-3">
        <h4 class="mb-3">{{ $t('popup.title') }}</h4>

        <div class="row mb-3">
          <div class="col-md-6">
            <label>{{ $t('popup.fields.title') }}</label>
            <input v-model="newPopup.title" type="text" class="form-control" required />
          </div>
          <div class="col-md-3">
            <label>{{ $t('popup.fields.start') }}</label>
            <input v-model="newPopup.startDate" type="datetime-local" class="form-control" />
          </div>
          <div class="col-md-3">
            <label>{{ $t('popup.fields.end') }}</label>
            <input v-model="newPopup.endDate" type="datetime-local" class="form-control" />
          </div>
        </div>

        <div class="alert alert-danger">{{ $t('popup.warning') }}</div>

        <div class="row mb-3">
          <div class="col-md-4">
            <label>{{ $t('popup.fields.timing') }}</label>
            <select v-model="newPopup.timing" class="form-control">
              <option>{{ $t('popup.options.oncePerDay') }}</option>
              <option>{{ $t('popup.options.everyVisit') }}</option>
            </select>
          </div>
          <div class="col-md-4">
            <label>{{ $t('popup.fields.desktop') }}</label>
            <input type="checkbox" v-model="newPopup.desktop" class="form-check-input" />
          </div>
          <div class="col-md-4">
            <label>{{ $t('popup.fields.mobile') }}</label>
            <input type="checkbox" v-model="newPopup.mobile" class="form-check-input" />
          </div>
        </div>

        <div class="mb-3">
          <label>{{ $t('popup.fields.description') }}</label>
          <textarea v-model="newPopup.description" class="form-control" rows="4"></textarea>
        </div>

        <div class="form-actions text-end">
          <button @click="savePopup" class="btn btn-success me-2">{{ $t('common.save') }}</button>
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
      newPopup: { id: null, title: '', startDate: '', endDate: '', desktop: false, mobile: false, timing: '24 saatte 1 kere', description: '' },
      popups: [
        { id: 1, title: "Kampanya Popup", startDate: "2025-03-19T09:51:11", endDate: "2025-03-26T09:51:11", desktop: true, mobile: true }
      ]
    };
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm;
      if (!this.showForm) {
        this.newPopup = { id: null, title: '', startDate: '', endDate: '', desktop: false, mobile: false, timing: '24 saatte 1 kere', description: '' };
      }
    },
    savePopup() {
      if (!this.newPopup.title.trim()) {
        alert("Popup adı boş olamaz!");
        return;
      }
      if (this.newPopup.id) {
        const index = this.popups.findIndex(popup => popup.id === this.newPopup.id);
        if (index !== -1) {
          this.popups[index] = { ...this.newPopup };
        }
      } else {
        this.newPopup.id = this.popups.length + 1;
        this.popups.push({ ...this.newPopup });
      }
      this.toggleForm();
    },
    editPopup(id) {
      const popup = this.popups.find(popup => popup.id === id);
      if (popup) {
        this.newPopup = { ...popup };
        this.showForm = true;
      }
    },
    deletePopup(id) {
      this.popups = this.popups.filter(popup => popup.id !== id);
    }
  }
};
</script>

<style scoped>
:root {
  --primary-color: #316cf4;
  --success-color: #10b981;
  --secondary-color: #6b7280;
  --bg-light: #ffffff;
  --bg-dark: #1e293b;
  --text-light: #1f2937;
  --text-dark: #f3f4f6;
  --border-light: #e5e7eb;
  --border-dark: #374151;
}

/* Light & Dark Mode Uyumlu Temel Ayarlar */
body {
  background-color: var(--bg-light);
  color: var(--text-light);
}
.dark body {
  background-color: var(--bg-dark);
  color: var(--text-dark);
}

/* Geçiş Efekti */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Tablo */
.table {
  border-radius: 12px;
  overflow: hidden;
  background-color: var(--bg-light);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
}
.dark .table {
  background-color: #273043;
}
.table thead {
  background-color: var(--primary-color);
  color: white;
}
.table th, .table td {
  vertical-align: middle;
  padding: 12px;
}

/* Form Kartı */
.form-container {
  background-color: var(--bg-light);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
}
.dark .form-container {
  background-color: #1f2937;
  box-shadow: 0 8px 30px rgba(255, 255, 255, 0.05);
}

/* Butonlar */
.btn {
  border: none;
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
.btn-success {
  background-color: var(--success-color);
  color: white;
}
.btn-success:hover {
  background-color: #0e9e6f;
}
.btn-secondary {
  background-color: var(--secondary-color);
  color: white;
}
.btn-secondary:hover {
  background-color: #4b5563;
}
.btn-sm {
  padding: 6px 12px;
  font-size: 13px;
  border-radius: 6px;
}

/* Alert */
.alert {
  border-radius: 8px;
  font-size: 14px;
  padding: 10px 16px;
}
.alert-danger {
  background-color: #fee2e2;
  color: #991b1b;
}
.dark .alert-danger {
  background-color: #7f1d1d;
  color: #fee2e2;
}
.alert-info {
  background-color: #e0f2fe;
  color: #0369a1;
}
.dark .alert-info {
  background-color: #0c4a6e;
  color: #e0f2fe;
}

/* Input, Select, Textarea */
input[type="text"],
input[type="datetime-local"],
textarea,
select {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid var(--border-light);
  background-color: var(--bg-light);
  color: var(--text-light);
  font-size: 14px;
  transition: 0.3s;
}
input:focus,
textarea:focus,
select:focus {
  border-color: var(--primary-color);
  outline: none;
  box-shadow: 0 0 0 2px rgba(49, 108, 244, 0.2);
}
.dark input,
.dark textarea,
.dark select {
  background-color: #1e293b;
  color: var(--text-dark);
  border: 1px solid var(--border-dark);
}

/* Checkbox */
.form-check-input {
  transform: scale(1.2);
  cursor: pointer;
}

/* Responsive */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .table th, .table td {
    padding: 10px 6px;
    font-size: 14px;
  }

  .form-container {
    padding: 16px;
  }

  .btn {
    width: 100%;
    margin-top: 8px;
  }
}
</style>