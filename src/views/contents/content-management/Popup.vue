<template>
  <ContentLayout>
    <div class="header d-flex justify-content-between align-items-center p-3 bg-light shadow-sm rounded">
      <button @click="toggleForm" class="btn btn-primary shadow-sm">+ Yeni Popup</button>
    </div>

    <div class="mt-3">
      <table class="table table-bordered shadow-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>P. No</th>
            <th>Başlık</th>
            <th>Mobil</th>
            <th>Masaüstü</th>
            <th>Başlangıç Tarihi</th>
            <th>Bitiş Tarihi</th>
            <th>İşlemler</th>
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
              <button @click="editPopup(popup.id)" class="btn btn-sm btn-primary me-2">Düzenle</button>
              <button @click="deletePopup(popup.id)" class="btn btn-sm btn-danger">Sil</button>
            </td>
          </tr>
          <tr v-else>
            <td colspan="8" class="text-center text-muted">Kayıt bulunamadı.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <transition name="fade-slide">
      <div v-if="showForm" class="form-container card shadow-lg p-4 mt-3">
        <h4 class="mb-3">Popup</h4>

        <div class="row mb-3">
          <div class="col-md-6">
            <label>Popup Adı</label>
            <input v-model="newPopup.title" type="text" class="form-control" required />
          </div>
          <div class="col-md-3">
            <label>Başlangıç Tarihi</label>
            <input v-model="newPopup.startDate" type="datetime-local" class="form-control" />
          </div>
          <div class="col-md-3">
            <label>Bitiş Tarihi</label>
            <input v-model="newPopup.endDate" type="datetime-local" class="form-control" />
          </div>
        </div>

        <div class="alert alert-danger">Aşağıdaki alanlardan popup görüntülenmesini kısıtlayabilirsiniz.</div>

        <div class="row mb-3">
          <div class="col-md-4">
            <label>Zamanlama</label>
            <select v-model="newPopup.timing" class="form-control">
              <option>24 saatte 1 kere</option>
              <option>Her girişte</option>
            </select>
          </div>
          <div class="col-md-4">
            <label>Masaüstü</label>
            <input type="checkbox" v-model="newPopup.desktop" class="form-check-input" />
          </div>
          <div class="col-md-4">
            <label>Mobil</label>
            <input type="checkbox" v-model="newPopup.mobile" class="form-check-input" />
          </div>
        </div>

        <div class="mb-3">
          <label>Açıklama</label>
          <textarea v-model="newPopup.description" class="form-control" rows="4"></textarea>
        </div>

        <div class="form-actions text-end">
          <button @click="savePopup" class="btn btn-success me-2">Kaydet</button>
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
</style>