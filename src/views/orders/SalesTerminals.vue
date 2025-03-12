<template>
  <div>
    <OrderTopMenu />

    <div class="sales-terminals">
      <div class="filter-container">
        <div class="filter-header" @click="toggleFilter">
          <i class="fas fa-filter"></i>
          <span>Filtreleme Seçenekleri</span>
          <i class="fas" :class="showFilter ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
        </div>
        <div v-show="showFilter" class="filter-content">
          <div class="filter-row">
            <div class="filter-group">
              <label>Terminal Adı</label>
              <input type="text" v-model="filters.terminalName" class="filter-input" placeholder="Terminal Adı" />
            </div>
            <div class="filter-group">
              <label>Durum</label>
              <select v-model="filters.status" class="filter-input">
                <option value="">Tümü</option>
                <option value="Aktif">Aktif</option>
                <option value="Pasif">Pasif</option>
              </select>
            </div>
            <div class="filter-group">
              <label>Tarih</label>
              <input type="date" v-model="filters.date" class="filter-input" />
            </div>
          </div>
          <div class="filter-actions">
            <button @click="clearFilters" class="clear-btn">Temizle</button>
            <button @click="applyFilters" class="filter-btn">Filtrele</button>
          </div>
        </div>
      </div>

      <div class="button-container">
        <button class="new-terminal-btn" @click="openModal">+ Yeni Terminal</button>
      </div>

      <div class="terminals-table">
        <table>
          <thead>
            <tr>
              <th>Terminal No</th>
              <th>Terminal Adı</th>
              <th>Durum</th>
              <th>Tarih</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredTerminals.length === 0">
              <td colspan="5" class="no-data">Kayıt bulunamadı.</td>
            </tr>
            <tr v-for="(terminal, index) in filteredTerminals" :key="index">
              <td><strong>{{ terminal.id }}</strong></td>
              <td>{{ terminal.name }}</td>
              <td>
                <span class="status-icon">✔</span>
              </td>
              <td>{{ terminal.date }}</td>
              <td>
                <div class="dropdown">
                  <button class="dropdown-btn">İşlemler ⌄</button>
                  <div class="dropdown-content">
                    <a href="#">Düzenle</a>
                    <a href="#">Sil</a>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="isModalOpen" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3>Yeni Satış Terminali</h3>
            <button class="close-btn" @click="closeModal">✖</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Terminal Adı <span class="required">Zorunlu</span></label>
              <input type="text" v-model="newTerminal.name" class="form-control" placeholder="Terminal Adı" />
            </div>
            <div class="form-group">
              <label>Durum</label>
              <select v-model="newTerminal.status" class="form-control">
                <option value="Aktif">Aktif</option>
                <option value="Pasif">Pasif</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button class="save-btn" @click="saveTerminal">✔ Kaydet</button>
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
}

/* 📌 Filtreleme Seçenekleri */
.filter-container {
  background: white;
  border-radius: 8px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
}

.filter-header {
  padding: 15px;
  background: #f8f9fa;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
}

.filter-content {
  padding: 15px;
  border-top: 1px solid #ddd;
}

.filter-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  width: 30%;
}

.filter-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.filter-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

/* 📌 Yeni Terminal Butonu */
.button-container {
  margin-bottom: 15px;
}

.new-terminal-btn {
  background: #3b82f6;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* 📌 Tablo */
.terminals-table {
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.terminals-table table {
  width: 100%;
  border-collapse: collapse;
}

.terminals-table th,
.terminals-table td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
  text-align: center;
}

.terminals-table th {
  background: #f5f5f5;
  font-weight: bold;
}

.status-icon {
  color: #10b981;
  font-size: 18px;
}

/* 📌 İşlemler - Dropdown */
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-btn {
  background: #6366f1;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.dropdown-content {
  display: none;
  position: absolute;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 100px;
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content a {
  padding: 8px 12px;
  display: block;
  text-decoration: none;
  color: black;
}

.dropdown-content a:hover {
  background: #f5f5f5;
}
/* 📌 Modal Tasarımı */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1e40af;
  color: white;
  padding: 10px;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.save-btn {
  background: #3b82f6;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
