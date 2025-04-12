<template>
  <CustomersLayout>
    <div class="container">
      <div class="header d-flex flex-wrap justify-content-between align-items-center p-3 bg-light dark:bg-zinc-800 shadow-sm rounded gap-2">
        <input v-model="search" type="text" :placeholder="$t('common.search')" class="form-control w-100 w-md-25" />
        <div class="button-group d-flex flex-wrap gap-2">
          <button @click="toggleNewDealerModal" class="btn btn-primary">+ {{ $t("dealer.new") }}</button>
          <button @click="toggleExcelModal" class="btn btn-success">
            📊 {{ $t("common.excelActions") }}
          </button>
        </div>
      </div>

      <div class="filters mt-3 d-flex flex-wrap gap-2">
        <select v-model="dealerStatus" class="form-select">
          <option value="all">{{ $t("common.all") }}</option>
          <option value="active">{{ $t("common.active") }}</option>
          <option value="inactive">{{ $t("common.inactive") }}</option>
        </select>
        <select v-model="listingType" class="form-select">
          <option value="all">{{ $t("common.all") }}</option>
          <option value="debtors">{{ $t("dealer.debtors") }}</option>
          <option value="creditors">{{ $t("dealer.creditors") }}</option>
        </select>
        <select v-model="dealerGroup" class="form-select">
          <option value="all">{{ $t("common.all") }}</option>
          <option value="test">{{ $t("dealer.testGroup") }}</option>
        </select>
      </div>

      <div class="table-responsive mt-3">
        <table class="table table-hover shadow-sm">
          <thead class="table-dark">
            <tr>
              <th>{{ $t("dealer.id") }}</th>
              <th>{{ $t("dealer.email") }}</th>
              <th>{{ $t("dealer.code") }}</th>
              <th>{{ $t("dealer.title") }}</th>
              <th>{{ $t("dealer.name") }}</th>
              <th>{{ $t("dealer.balance") }}</th>
              <th>{{ $t("dealer.group") }}</th>
              <th>{{ $t("dealer.status") }}</th>
              <th>{{ $t("common.actions") }}</th>
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
                <span v-if="dealer.active" class="badge bg-success">{{ $t("common.active") }}</span>
                <span v-else class="badge bg-danger">{{ $t("common.inactive") }}</span>
              </td>
              <td>
                <button class="btn btn-outline-secondary">{{ $t("common.actions") }}</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Yeni Bayi Modal -->
    <transition name="fade-slide">
      <div v-if="showNewDealerModal" class="modal-overlay">
        <div class="modal-content dark-mode">
          <h5 class="mb-3">{{ $t("dealer.title") }}</h5>
          <div class="form-group">
            <input v-model="newDealer.code" type="text" :placeholder="$t('dealer.code')" class="form-control mb-2" />
            <input v-model="newDealer.title" type="text" :placeholder="$t('dealer.title')" class="form-control mb-2" />
            <input v-model="newDealer.name" type="text" :placeholder="$t('dealer.name')" class="form-control mb-2" />
            <input v-model="newDealer.surname" type="text" :placeholder="$t('dealer.surname')" class="form-control mb-2" />
            <input v-model="newDealer.email" type="text" :placeholder="$t('dealer.email')" class="form-control mb-2" />
            <input v-model="newDealer.password" type="password" :placeholder="$t('dealer.password')" class="form-control mb-2" />
          </div>
          <button class="btn btn-primary w-100" @click="saveNewDealer">✔ {{ $t("common.save") }}</button>
        </div>
      </div>
    </transition>

    <!-- Excel Modal -->
    <transition name="fade-slide">
      <div v-if="showExcelModal" class="modal-overlay">
        <div class="modal-content dark-mode">
          <h5 class="mb-3">{{ $t("dealer.excelTitle") }}</h5>
          <button class="btn btn-primary w-100 mb-2">📤 {{ $t("common.export") }}</button>
          <button class="btn btn-secondary w-100 mb-2">📥 {{ $t("common.import") }}</button>
          <button class="btn btn-danger w-100" @click="toggleExcelModal">✖ {{ $t("common.cancel") }}</button>
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
/* Fade Animasyonu */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.modal-content {
  background: var(--modal-bg, #ffffff);
  color: var(--text-color, #1f2937);
  padding: 24px;
  border-radius: 12px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  transition: background 0.3s ease;
}

/* Koyu mod */
body.dark {
  --modal-bg: #1f2937;
  --text-color: #f3f4f6;
  --input-bg: #374151;
  --input-border: #4b5563;
  --btn-bg: #3b82f6;
  --btn-hover: #2563eb;
  --btn-sec: #6b7280;
  --btn-sec-hover: #4b5563;
}
body:not(.dark) {
  --modal-bg: #ffffff;
  --text-color: #1f2937;
  --input-bg: #ffffff;
  --input-border: #d1d5db;
  --btn-bg: #3b82f6;
  --btn-hover: #2563eb;
  --btn-sec: #e5e7eb;
  --btn-sec-hover: #d1d5db;
}

/* Form */
.form-group input {
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 8px;
  border: 1px solid var(--input-border);
  background: var(--input-bg);
  color: var(--text-color);
  transition: 0.3s;
}
.form-group input::placeholder {
  color: #9ca3af;
}

/* Butonlar */
button.btn {
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: 0.3s ease;
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
  background: #10b981;
  color: #fff;
}
.btn-success:hover {
  background: #059669;
}
.btn-secondary {
  background: var(--btn-sec);
  color: var(--text-color);
}
.btn-secondary:hover {
  background: var(--btn-sec-hover);
}

/* Responsive ayarlar */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start !important;
  }
  .button-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }
  .button-group button {
    width: 100%;
  }
}
</style>
