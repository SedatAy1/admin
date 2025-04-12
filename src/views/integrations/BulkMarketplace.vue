<template>
  <MarketLayout />
  <div class="market-layout">
    <div class="header">
      <input v-model="searchQuery" type="text" :placeholder="$t('common.search')" class="search-box" />
      <button @click="openModal" class="new-button">+ {{ $t("marketplaceBatch.addNew") }}</button>
    </div>

    <table class="market-table">
      <thead>
        <tr>
          <th>{{ $t("marketplaceBatch.fields.operationNo") }}</th>
          <th>{{ $t("marketplaceBatch.fields.name") }}</th>
          <th>{{ $t("marketplaceBatch.fields.process") }}</th>
          <th>{{ $t("marketplaceBatch.fields.marketplace") }}</th>
          <th>{{ $t("marketplaceBatch.fields.schedule") }}</th>
          <th>{{ $t("marketplaceBatch.fields.status") }}</th>
          <th>{{ $t("common.actions") }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!records.length" class="no-data">
          <td colspan="7">
            <div class="no-data-content">
              <p>{{ $t("common.noRecords") }}</p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div v-if="isModalOpen" class="modal">
      <div class="modal-content">
        <h2>{{ $t("marketplaceBatch.title") }}</h2>

        <label>{{ $t("marketplaceBatch.fields.name") }}</label>
        <input v-model="form.name" type="text" />

        <label>{{ $t("marketplaceBatch.fields.marketplace") }}</label>
        <select v-model="form.marketplace">
          <option>N11</option>
        </select>

        <label>{{ $t("marketplaceBatch.fields.store") }}</label>
        <select v-model="form.store">
          <option>#19 - Demo</option>
        </select>

        <label>{{ $t("marketplaceBatch.fields.process") }}</label>
        <select v-model="form.process">
          <option>{{ $t("marketplaceBatch.options.pullProducts") }}</option>
        </select>

        <label>{{ $t("marketplaceBatch.fields.schedule") }}</label>
        <select v-model="form.schedule">
          <option>{{ $t("marketplaceBatch.options.never") }}</option>
        </select>

        <div class="warning-box">
          <p>{{ $t("marketplaceBatch.warning") }}</p>
        </div>

        <label>{{ $t("marketplaceBatch.fields.vatRate") }}</label>
        <input v-model="form.vatRate" type="number" step="0.01" />

        <label>{{ $t("marketplaceBatch.fields.matchingMethod") }}</label>
        <select v-model="form.matchingMethod">
          <option>{{ $t("marketplaceBatch.options.matchByProductCode") }}</option>
        </select>

        <button @click="save" class="save-button">{{ $t("common.save") }}</button>
        <button @click="closeModal" class="close-button">{{ $t("common.cancel") }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import MarketLayout from '@/views/integrations/MarketLayout.vue';
export default {
  components: {
    MarketLayout,
  },
  data() {
    return {
      searchQuery: "",
      records: [],
      isModalOpen: false,
      form: {
        name: "",
        marketplace: "N11",
        store: "#19 - Demo",
        process: "Ürün Çekme",
        schedule: "Hiçbir Zaman",
        vatRate: 0.18,
        matchingMethod: "Ürün kodları ile eşleştir",
      },
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    save() {
      console.log("Kaydedilen form:", this.form);
      this.closeModal();
    },
  },
};
</script>

<style scoped>
.market-layout {
  padding: 20px;
  background: #ffffff;
  transition: background 0.3s ease-in-out;
}
html.dark .market-layout {
  background: #1e1e1e;
  color: #f1f1f1;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
}

/* Search Box */
.search-box {
  width: 300px;
  max-width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: border 0.3s ease;
}
.search-box:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.4);
}
html.dark .search-box {
  background: #2e2e2e;
  color: #f1f1f1;
  border-color: #555;
}
html.dark .search-box::placeholder {
  color: #aaa;
}

/* New Button */
.new-button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
}
.new-button:hover {
  background-color: #0056b3;
  transform: scale(1.03);
}

/* Table */
.market-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  transition: background 0.3s;
}
th,
td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}
th {
  background: #f1f5f9;
  color: #1f2937;
}
html.dark th {
  background: #2a2a2a;
  color: #f1f1f1;
}
html.dark td {
  border-color: #444;
  color: #e4e4e4;
  background: #2e2e2e;
}

/* No data */
.no-data {
  text-align: center;
  padding: 20px;
  color: #6b7280;
}
html.dark .no-data {
  color: #9ca3af;
}

/* Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  transition: background 0.3s ease;
}
html.dark .modal-content {
  background: #2c2c2c;
  color: #f1f1f1;
}

/* Buttons inside modal */
.save-button {
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
  transition: background 0.3s;
}
.save-button:hover {
  background-color: #0056b3;
}

.close-button {
  background-color: #dc3545;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
  transition: background 0.3s;
}
.close-button:hover {
  background-color: #c82333;
}

/* Warning box */
.warning-box {
  background: #ffebeb;
  color: #d9534f;
  padding: 10px;
  border-radius: 5px;
  margin: 10px 0;
}
html.dark .warning-box {
  background: #3a1e1e;
  color: #fca5a5;
}

/* Responsive */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: stretch;
  }

  .search-box {
    width: 100%;
  }
}
</style>