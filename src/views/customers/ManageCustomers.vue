<template>
  <CustomersLayout>
    <!-- Arama ve Üye Grubu Filtreleme -->
    <div class="d-flex align-items-center justify-content-between search-container">
      <input v-model="searchQuery" type="text" placeholder="🔍 Ara..." class="form-control search-input" />

      <!-- Üye Grubu Seçimi -->
      <select v-model="selectedGroup" class="form-select group-select">
        <option value="">Tümü</option>
        <option value="uye">Üye</option>
        <option value="son-kullanici">Son Kullanıcı</option>
        <option value="bayi">Bayi</option>
      </select>

      <button class="btn btn-success" @click="openExcelModal">📊 Excel İşlemleri</button>
    </div>

    <!-- Üye Tablosu -->
    <table class="table table-hover shadow-sm mt-3">
      <thead class="table-dark">
        <tr>
          <th>Üye No</th>
          <th>E-Posta</th>
          <th>Ad Soyad</th>
          <th>Telefon Numarası</th>
          <th>Bakiye</th>
          <th>Puan</th>
          <th>Müşteri Grubu</th>
          <th>Durum</th>
          <th>Son Giriş</th>
          <th>Kayıt</th>
          <th>İşlemler</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in filteredCustomers" :key="customer.id">
          <td><strong>{{ customer.id }}</strong></td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.name }}</td>
          <td>{{ customer.phone }}</td>
          <td>{{ customer.balance }}</td>
          <td>{{ customer.points }}</td>
          <td>{{ customer.group }}</td>
          <td>{{ customer.status }}</td>
          <td>{{ customer.lastLogin }}</td>
          <td>{{ customer.registerDate }}</td>
          <td>
            <div class="dropdown">
              <button class="btn btn-outline-secondary dropdown-toggle" type="button" @click="toggleDropdown(customer.id)">
                İşlemler
              </button>
              <ul v-if="activeDropdown === customer.id" class="dropdown-menu show">
                <li><a class="dropdown-item">👁 Görüntüle</a></li>
                <li><a class="dropdown-item text-danger" @click="deleteCustomer(customer.id)">🗑 Sil</a></li>
              </ul>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Excel İşlemleri Modal -->
    <div v-if="showExcelModal" class="modal-overlay">
      <div class="modal-content">
        <h4>Üyeler - Excel İşlemleri</h4>
        <button class="btn btn-primary w-100 mb-2">📤 Dışa Aktar</button>
        <button class="btn btn-secondary w-100 mb-2">📥 İçe Aktar</button>
        <button class="btn btn-danger w-100" @click="showExcelModal = false">❌ Kapat</button>
      </div>
    </div>
  </CustomersLayout>
</template>

<script>
import CustomersLayout from "./CustomersLayout.vue";

export default {
  components: {
    CustomersLayout
  },
  data() {
    return {
      searchQuery: "",
      selectedGroup: "",
      showExcelModal: false,
      activeDropdown: null,
      customers: [
        { id: 41, email: "sedat2083@hotmail.com", name: "Sedat Ay", phone: "+905394831977", balance: 0, points: 0, group: "Üye", status: 1, lastLogin: "2025-03-06", registerDate: "2025-03-06 11:53:51" },
        { id: 40, email: "mehmetakboz@hotmail.com", name: "Mehmet Akboz", phone: "+905321562807", balance: 0, points: 0, group: "Üye", status: 1, lastLogin: "2025-02-22", registerDate: "2025-02-22 14:11:27" },
        { id: 39, email: "demirokeminee@gmail.com", name: "Emine Dsemir", phone: "+905443516052", balance: 0, points: 0, group: "Bayi", status: 1, lastLogin: "2025-02-20", registerDate: "2025-02-20 17:52:08" }
      ]
    };
  },
  computed: {
    filteredCustomers() {
      return this.customers.filter(c =>
        c.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
        (this.selectedGroup === "" || c.group.toLowerCase() === this.selectedGroup.toLowerCase())
      );
    }
  },
  methods: {
    openExcelModal() {
      this.showExcelModal = true;
    },
    toggleDropdown(id) {
      this.activeDropdown = this.activeDropdown === id ? null : id;
    },
    deleteCustomer(id) {
      this.customers = this.customers.filter(c => c.id !== id);
    }
  }
};
</script>

<style scoped>
/* Arama ve Filtreleme */
.search-container {
  display: flex;
  gap: 10px;
  align-items: center;
  background: white;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.08);
}

/* Arama Kutusu */
.search-input {
  width: 250px;
  border-radius: 6px;
  padding: 8px;
  border: 1px solid #ddd;
}

/* Grup Seçimi */
.group-select {
  width: 180px;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ddd;
}

/* İşlemler Dropdown */
.dropdown-menu {
  min-width: 150px;
}
.dropdown-menu.show {
  display: block;
}

/* Modal */
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
  text-align: center;
  width: 350px;
}

.modal-content h4 {
  margin-bottom: 15px;
  font-weight: bold;
}
</style>