<template>
  <CustomersLayout>
    <!-- Arama ve Üye Grubu Filtreleme -->
    <div class="d-flex align-items-center justify-content-between search-container">
      <input v-model="searchQuery" type="text" :placeholder="$t('common.search')" class="form-control search-input" />

      <!-- Üye Grubu Seçimi -->
      <select v-model="selectedGroup" class="form-select group-select">
        <option value="">{{ $t("customers.all") }}</option>
        <option value="uye">{{ $t("customers.member") }}</option>
        <option value="son-kullanici">{{ $t("customers.endUser") }}</option>
        <option value="bayi">{{ $t("customers.dealer") }}</option>
      </select>

      <button class="btn btn-success" @click="openExcelModal">
        📊 {{ $t("common.excelActions") }}
      </button>
    </div>

    <!-- Üye Tablosu -->
    <div class="table-responsive mt-3">
      <table class="table table-hover shadow-sm">
        <thead class="table-dark">
          <tr>
            <th>{{ $t("customers.id") }}</th>
            <th>{{ $t("customers.email") }}</th>
            <th>{{ $t("customers.name") }}</th>
            <th>{{ $t("customers.phone") }}</th>
            <th>{{ $t("customers.balance") }}</th>
            <th>{{ $t("customers.points") }}</th>
            <th>{{ $t("customers.group") }}</th>
            <th>{{ $t("customers.status") }}</th>
            <th>{{ $t("customers.lastLogin") }}</th>
            <th>{{ $t("customers.registerDate") }}</th>
            <th>{{ $t("common.actions") }}</th>
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
                  {{ $t("common.actions") }}
                </button>
                <ul v-if="activeDropdown === customer.id" class="dropdown-menu show">
                  <li><a class="dropdown-item">👁 {{ $t("common.view") }}</a></li>
                  <li><a class="dropdown-item text-danger" @click="deleteCustomer(customer.id)">🗑 {{ $t("common.delete") }}</a></li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Excel Modal -->
    <div v-if="showExcelModal" class="modal-overlay">
      <div class="modal-content">
        <h4>{{ $t("customers.excelTitle") }}</h4>
        <button class="btn btn-primary w-100 mb-2">📤 {{ $t("common.export") }}</button>
        <button class="btn btn-secondary w-100 mb-2">📥 {{ $t("common.import") }}</button>
        <button class="btn btn-danger w-100" @click="showExcelModal = false">❌ {{ $t("common.close") }}</button>
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
:root {
  --bg: #ffffff;
  --text: #1f2937;
  --card: #f9fafb;
  --muted: #6b7280;
  --accent: #316cf4;
}
.dark {
  --bg: #0f172a;
  --text: #f1f5f9;
  --card: #1e293b;
  --muted: #9ca3af;
  --accent: #60a5fa;
}

.search-container {
  display: flex;
  gap: 10px;
  align-items: center;
  background: var(--card);
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.08);
}

.search-input,
.group-select {
  background: var(--bg);
  color: var(--text);
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 8px;
}

.dropdown-menu {
  min-width: 150px;
}
.dropdown-menu.show {
  display: block;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background: var(--card);
  color: var(--text);
  padding: 24px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.2);
  transition: background 0.3s, color 0.3s;
}

.modal-content h4 {
  margin-bottom: 15px;
  font-weight: bold;
  color: var(--text);
}

@media (max-width: 768px) {
  .search-container {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
