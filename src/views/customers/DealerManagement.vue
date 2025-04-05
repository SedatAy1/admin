<template>
  <CustomersLayout>
    <div class="container">
      <div class="header d-flex justify-content-between align-items-center p-3 bg-light shadow-sm rounded">
        <input v-model="search" type="text" placeholder="🔍 Ara..." class="form-control w-25" />
        <div class="button-group">
          <button @click="toggleNewDealerModal" class="btn btn-primary">+ Yeni Bayi</button>
          <button @click="toggleExcelModal" class="btn btn-success ms-2">
            📊 Excel İşlemleri
          </button>
        </div>
      </div>

      <div class="filters mt-3 d-flex gap-2">
        <select v-model="dealerStatus" class="form-select">
          <option value="all">Tümü</option>
          <option value="active">Aktif</option>
          <option value="inactive">Pasif</option>
        </select>
        <select v-model="listingType" class="form-select">
          <option value="all">Tümü</option>
          <option value="debtors">Borçlu</option>
          <option value="creditors">Alacaklı</option>
        </select>
        <select v-model="dealerGroup" class="form-select">
          <option value="all">Tümü</option>
          <option value="test">Test Grubu (İsk: %10)</option>
        </select>
      </div>

      <table class="table table-hover mt-3 shadow-sm">
        <thead class="table-dark">
          <tr>
            <th>Bayi No</th>
            <th>E-Posta</th>
            <th>Kod</th>
            <th>Ünvan</th>
            <th>Ad Soyad</th>
            <th>Bakiye</th>
            <th>Bayi Grubu</th>
            <th>Durum</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dealer in dealers" :key="dealer.id">
            <td>{{ dealer.id }}</td>
            <td>{{ dealer.email }}</td>
            <td>{{ dealer.code }}</td>
            <td>{{ dealer.title }}</td>
            <td>{{ dealer.name }}</td>
            <td>{{ dealer.balance }}</td>
            <td>{{ dealer.group }}</td>
            <td>
              <span v-if="dealer.active" class="badge bg-success">Aktif</span>
              <span v-else class="badge bg-danger">Pasif</span>
            </td>
            <td>
              <button class="btn btn-outline-secondary" @click="toggleActions">İşlemler</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <transition name="fade-slide">
      <div v-if="showNewDealerModal" class="modal-overlay">
        <div class="modal-content">
          <h5>Bayi Yönetimi</h5>
          <div class="form-group">
            <input v-model="newDealer.code" type="text" placeholder="Bayi Kodu" class="form-control mb-2" />
            <input v-model="newDealer.title" type="text" placeholder="Ünvan" class="form-control mb-2" />
            <input v-model="newDealer.name" type="text" placeholder="Ad" class="form-control mb-2" />
            <input v-model="newDealer.surname" type="text" placeholder="Soyad" class="form-control mb-2" />
            <input v-model="newDealer.email" type="text" placeholder="E-Posta" class="form-control mb-2" />
            <input v-model="newDealer.password" type="password" placeholder="Şifre" class="form-control mb-2" />
          </div>
          <button class="btn btn-primary w-100" @click="saveNewDealer">✔ Kaydet</button>
        </div>
      </div>
    </transition>

    <transition name="fade-slide">
      <div v-if="showExcelModal" class="modal-overlay">
        <div class="modal-content">
          <h5>Bayi - Excel İşlemleri</h5>
          <button class="btn btn-primary w-100 mb-2">📤 Dışa Aktar</button>
          <button class="btn btn-secondary w-100 mb-2">📥 İçe Aktar</button>
          <button class="btn btn-danger w-100" @click="toggleExcelModal">✖ Kapat</button>
        </div>
      </div>
    </transition>
  </CustomersLayout>
</template>

<script>
import CustomersLayout from "@/views/customers/CustomersLayout.vue";

export default {
  components: { CustomersLayout },
  data() {
    return {
      search: "",
      showNewDealerModal: false,
      showExcelModal: false,
      dealerStatus: "all",
      listingType: "all",
      dealerGroup: "all",
      newDealer: {
        code: "",
        title: "",
        name: "",
        surname: "",
        email: "",
        password: ""
      },
      dealers: [
        { id: 1, email: "test@test.com", code: "123", title: "MLH Design", name: "Mehmet Melih Dereli", balance: "25 TL", group: "Test Grubu (İsk: %10)", active: true }
      ]
    };
  },
  methods: {
    toggleNewDealerModal() {
      this.showNewDealerModal = !this.showNewDealerModal;
    },
    toggleExcelModal() {
      this.showExcelModal = !this.showExcelModal;
    },
    saveNewDealer() {
      alert("Yeni bayi kaydedildi!");
      this.toggleNewDealerModal();
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
}
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>