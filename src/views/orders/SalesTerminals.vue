<template>
  <div>
    <OrderTopMenu />

    <div class="sales-terminals">
      <!-- 🔍 Filtreleme -->
      <div class="filter-container">
        <div class="filter-header" @click="toggleFilter">
          <i class="fas fa-filter"></i>
          <span>{{ $t("terminal.filters.title") }}</span>
          <i class="fas" :class="showFilter ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
        </div>
        <div v-show="showFilter" class="filter-content">
          <div class="filter-row">
            <div class="filter-group">
              <label>{{ $t("terminal.filters.name") }}</label>
              <input type="text" v-model="filters.terminalName" class="filter-input" :placeholder="$t('terminal.filters.name')" />
            </div>
            <div class="filter-group">
              <label>{{ $t("terminal.filters.status") }}</label>
              <select v-model="filters.status" class="filter-input">
                <option value="">{{ $t("common.all") }}</option>
                <option value="Aktif">{{ $t("common.active") }}</option>
                <option value="Pasif">{{ $t("common.passive") }}</option>
              </select>
            </div>
            <div class="filter-group">
              <label>{{ $t("terminal.filters.date") }}</label>
              <input type="date" v-model="filters.date" class="filter-input" />
            </div>
          </div>
          <div class="filter-actions">
            <button @click="clearFilters" class="clear-btn">{{ $t("common.clear") }}</button>
            <button @click="applyFilters" class="filter-btn">{{ $t("common.filter") }}</button>
          </div>
        </div>
      </div>

      <!-- ➕ Yeni Terminal -->
      <div class="button-container">
        <button class="new-terminal-btn" @click="openModal">+ {{ $t("terminal.new") }}</button>
      </div>

      <!-- 📋 Tablo -->
      <div class="terminals-table">
        <table>
          <thead>
            <tr>
              <th>{{ $t("terminal.table.id") }}</th>
              <th>{{ $t("terminal.table.name") }}</th>
              <th>{{ $t("terminal.table.status") }}</th>
              <th>{{ $t("terminal.table.date") }}</th>
              <th>{{ $t("terminal.table.actions") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredTerminals.length === 0">
              <td colspan="5" class="no-data">{{ $t("terminal.noData") }}</td>
            </tr>
            <tr v-for="(terminal, index) in filteredTerminals" :key="index">
              <td><strong>{{ terminal.id }}</strong></td>
              <td>{{ terminal.name }}</td>
              <td><span class="status-icon">✔</span></td>
              <td>{{ terminal.date }}</td>
              <td>
                <div class="dropdown">
                  <button class="dropdown-btn">{{ $t("terminal.actions.label") }} ⌄</button>
                  <div class="dropdown-content">
                    <a href="#">{{ $t("terminal.actions.edit") }}</a>
                    <a href="#">{{ $t("terminal.actions.delete") }}</a>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modal -->
      <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3>{{ $t("terminal.modal.title") }}</h3>
            <button class="close-btn" @click="closeModal">✖</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>{{ $t("terminal.modal.name") }} <span class="required">{{ $t("common.required") }}</span></label>
              <input type="text" v-model="newTerminal.name" class="form-control" :placeholder="$t('terminal.modal.name')" />
            </div>
            <div class="form-group">
              <label>{{ $t("terminal.modal.status") }}</label>
              <select v-model="newTerminal.status" class="form-control">
                <option value="Aktif">{{ $t("common.active") }}</option>
                <option value="Pasif">{{ $t("common.passive") }}</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button class="save-btn" @click="saveTerminal">✔ {{ $t("common.save") }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderTopMenu from "@/components/OrderTopMenu.vue";

export default {
  components: {
    OrderTopMenu,
  },
  data() {
    return {
      showFilter: true,
      filters: {
        terminalName: "",
        status: "",
        date: "",
      },
      terminals: [
        { id: 6, name: "Mağaza", status: "Aktif", date: "07.05.2021 00:19" },
        { id: 5, name: "Telefon", status: "Aktif", date: "07.05.2021 00:19" },
        { id: 4, name: "Twitter", status: "Aktif", date: "07.05.2021 00:19" },
        { id: 3, name: "WhatsApp", status: "Aktif", date: "07.05.2021 00:19" },
        { id: 2, name: "Facebook", status: "Aktif", date: "07.05.2021 00:19" },
        { id: 1, name: "Instagram", status: "Aktif", date: "07.05.2021 00:19" },
      ],
      isModalOpen: false,
      newTerminal: {
        name: "",
        status: "Aktif",
      },
    };
  },
  computed: {
    filteredTerminals() {
      return this.terminals.filter((terminal) => {
        return (
          (this.filters.terminalName === "" ||
            terminal.name.toLowerCase().includes(this.filters.terminalName.toLowerCase())) &&
          (this.filters.status === "" || terminal.status === this.filters.status) &&
          (this.filters.date === "" || terminal.date.includes(this.filters.date))
        );
      });
    },
  },
  methods: {
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
    applyFilters() {
      console.log("Filtreler uygulandı:", this.filters);
    },
    clearFilters() {
      this.filters = {
        terminalName: "",
        status: "",
        date: "",
      };
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.newTerminal = {
        name: "",
        status: "Aktif",
      };
    },
    saveTerminal() {
      console.log("Yeni Terminal Kaydedildi:", this.newTerminal);
      this.closeModal();
    },
  },
};
</script>
<style scoped>
.sales-terminals {
  padding: 20px;
  background-color: #f8fafc;
}

/* 📌 Filtreleme Seçenekleri */
.filter-container {
  background: #ffffff;
  border-radius: 10px;
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.filter-header {
  padding: 15px 20px;
  background: #3b82f6;
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.filter-header i {
  margin-right: 8px;
}

.filter-content {
  padding: 20px;
  background: #f9f9f9;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.filter-group {
  flex: 1;
  min-width: 220px;
  display: flex;
  flex-direction: column;
}

.filter-group label {
  margin-bottom: 5px;
  font-weight: 600;
  color: #333;
}

.filter-input {
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 14px;
}

.filter-actions {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.clear-btn,
.filter-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
}

.clear-btn {
  background: #e5e7eb;
  color: #374151;
}

.filter-btn {
  background: #2563eb;
  color: white;
}

/* 📌 Yeni Terminal Butonu */
.button-container {
  margin-bottom: 15px;
  text-align: right;
}

.new-terminal-btn {
  background: #10b981;
  color: white;
  padding: 10px 18px;
  font-size: 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

/* 📌 Tablo */
.terminals-table {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.terminals-table table {
  width: 100%;
  border-collapse: collapse;
}

.terminals-table th,
.terminals-table td {
  padding: 14px;
  border-bottom: 1px solid #eee;
  text-align: center;
}

.terminals-table th {
  background: #eff6ff;
  font-weight: 600;
  color: #1e3a8a;
}

.status-icon {
  color: #16a34a;
  font-size: 18px;
}

/* 📌 Dropdown */
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-btn {
  background: #6366f1;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.dropdown-content {
  display: none;
  position: absolute;
  background: white;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  min-width: 120px;
  z-index: 100;
  right: 0;
  border-radius: 6px;
  overflow: hidden;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content a {
  padding: 10px 14px;
  display: block;
  text-decoration: none;
  color: #374151;
}

.dropdown-content a:hover {
  background: #f3f4f6;
}

/* 📌 Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(30, 41, 59, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-content {
  background: white;
  padding: 25px;
  border-radius: 10px;
  width: 420px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1e3a8a;
  color: white;
  padding: 10px 15px;
  border-radius: 6px 6px 0 0;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
}

.form-group {
  margin-top: 15px;
}

.form-group label {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 6px;
  display: block;
}

.form-control {
  width: 100%;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
}

.save-btn {
  background: #2563eb;
  color: white;
  padding: 10px 20px;
  margin-top: 20px;
  width: 100%;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

/* 🌙 Dark Mode Desteği */
.dark-mode .sales-terminals {
  background-color: #0f172a;
  color: #f1f5f9;
}

.dark-mode .filter-container,
.dark-mode .terminals-table,
.dark-mode .modal-content {
  background-color: #1e293b;
  border-color: #334155;
}

.dark-mode .filter-header {
  background: #1d4ed8;
  color: white;
}

.dark-mode .filter-content {
  background-color: #1e293b;
}

.dark-mode .filter-group label,
.dark-mode .dropdown-content a {
  color: #e2e8f0;
}

.dark-mode .filter-input,
.dark-mode .form-control {
  background-color: #334155;
  color: white;
  border-color: #475569;
}

.dark-mode .terminals-table th {
  background: #1e3a8a;
  color: #f1f5f9;
}

.dark-mode .dropdown-content {
  background: #334155;
}

.dark-mode .dropdown-content a:hover {
  background: #475569;
}

.dark-mode .modal-header {
  background: #1e3a8a;
}
</style>
