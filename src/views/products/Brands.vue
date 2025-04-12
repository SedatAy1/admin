<template>
  <div class="brands">
    <!-- Arama ve Butonlar -->
    <div class="top-bar">
      <input type="text" :placeholder="$t('brand.search')" class="search-box" />
      <button class="btn primary" @click="showNewBrandModal = true">{{ $t('brand.new') }}</button>
      <button class="btn green" @click="showExcelModal = true">{{ $t('brand.excel') }}</button>
    </div>

    <!-- Marka Listesi -->
    <table class="brand-table">
      <thead>
        <tr>
          <th><input type="checkbox" /></th>
          <th>{{ $t('brand.id') }}</th>
          <th>{{ $t('brand.name') }}</th>
          <th>{{ $t('brand.status') }}</th>
          <th>{{ $t('brand.order') }}</th>
          <th>{{ $t('common.actions') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="brand in brands" :key="brand.id">
          <td><input type="checkbox" /></td>
          <td><strong>{{ brand.id }}</strong></td>
          <td>{{ brand.name }}</td>
          <td class="status">
            <span class="active">✔ {{ $t('brand.active') }}</span>
          </td>
          <td>{{ brand.order }}</td>
          <td>
            <button class="dropdown">{{ $t('common.actions') }} ▼</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Yeni Marka Modal -->
    <Modal :isOpen="showNewBrandModal" :title="$t('brand.newTitle')" @close="showNewBrandModal = false">
      <div class="modal-body">
        <div class="tabs">
          <button v-for="tab in brandTabs" :key="tab" @click="activeTab = tab" :class="{ active: activeTab === tab }">
            {{ $t(`brand.tabs.${tab}`) }}
          </button>
        </div>
        <div v-if="activeTab === 'Genel Bilgiler'">
          <div class="form-group">
            <label>{{ $t('brand.name') }} <span class="required">{{ $t('common.required') }}</span></label>
            <input type="text" v-model="newBrand.name" />
          </div>
          <div class="form-group">
            <label>{{ $t('brand.description') }}</label>
            <input type="text" v-model="newBrand.description" />
          </div>
          <div class="form-group">
            <label>{{ $t('brand.status') }} <span class="required">{{ $t('common.required') }}</span></label>
            <select v-model="newBrand.status">
              <option>{{ $t('brand.active') }}</option>
              <option>{{ $t('brand.passive') }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>{{ $t('brand.order') }}</label>
            <input type="number" v-model="newBrand.order" />
          </div>
          <div class="form-group">
            <label>{{ $t('brand.logo') }}</label>
            <input type="file" />
          </div>
        </div>
      </div>
      <template v-slot:footer>
        <button class="submit-btn" @click="saveBrand">✔ {{ $t('common.save') }}</button>
      </template>
    </Modal>

    <!-- Excel Modal -->
    <Modal :isOpen="showExcelModal" :title="$t('brand.excelTitle')" @close="showExcelModal = false">
      <div class="modal-body">
        <div class="tabs">
          <button v-for="tab in excelTabs" :key="tab" @click="activeExcelTab = tab" :class="{ active: activeExcelTab === tab }">
            {{ $t(`brand.tabs.${tab}`) }}
          </button>
        </div>
        <div v-if="activeExcelTab === 'Dışa Aktar'">
          <p>{{ $t('brand.exportInfo') }}</p>
          <button class="download-btn" @click="downloadExcel">📥 {{ $t('common.download') }}</button>
        </div>
        <div v-if="activeExcelTab === 'İçe Aktar'">
          <p>{{ $t('brand.importInfo') }}</p>
          <input type="file" />
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import Modal from "@/components/Modal.vue";

export default {
  name: "Brands",
  components: { Modal },
  data() {
    return {
      showNewBrandModal: false,
      showExcelModal: false,
      activeTab: "Genel Bilgiler",
      brandTabs: ["Genel Bilgiler", "S.E.O Bilgileri"],
      activeExcelTab: "Dışa Aktar",
      excelTabs: ["Dışa Aktar", "İçe Aktar"],
      brands: [
        { id: 7, name: "Test2", order: 0 },
        { id: 6, name: "VectorWear", order: 0 },
        { id: 5, name: "Adyes", order: 0 },
        { id: 4, name: "Beyaz Melek", order: 0 },
        { id: 3, name: "QIVI", order: 0 },
        { id: 2, name: "Collage", order: 0 },
        { id: 1, name: "Test", order: 0 },
      ],
      newBrand: {
        name: "",
        description: "",
        status: "Aktif",
        order: 0,
      },
    };
  },
  methods: {
    saveBrand() {
      console.log("Yeni marka kaydedildi:", this.newBrand);
      this.showNewBrandModal = false;
    },
    downloadExcel() {
      console.log("Excel Verileri İndirildi!");
      this.showExcelModal = false;
    },
  },
};
</script>

<style scoped>
.brands {
  padding: 20px;
  background: #ffffff;
  min-height: 100vh;
  transition: background 0.3s ease;
}

/* Üst Bar */
.top-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
  margin-bottom: 20px;
}

.search-box {
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  flex: 1;
  min-width: 200px;
}

/* Butonlar */
.btn {
  padding: 10px 16px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  border: none;
}

.primary { background: #2563eb; color: white; }
.green   { background: #10b981; color: white; }

/* Marka Tablosu */
.brand-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.brand-table th, .brand-table td {
  padding: 12px;
  font-size: 14px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.brand-table thead {
  background: #f1f5f9;
  font-weight: 600;
  color: #1f2937;
}

/* Aktif Durum */
.status .active {
  background: #dcfce7;
  color: #15803d;
  padding: 6px 10px;
  border-radius: 5px;
  font-size: 13px;
}

/* Dropdown Butonu */
.dropdown {
  padding: 6px 10px;
  border: none;
  background: #f3f4f6;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
}

/* Modal Kaydet Butonu */
.submit-btn {
  background: #2563eb;
  color: white;
  padding: 10px;
  border: none;
  width: 100%;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
}

/* Sekmeler */
.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.tabs button {
  padding: 8px 12px;
  background: #f3f4f6;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.tabs button.active {
  background: #2563eb;
  color: white;
}

/* Dark Mode */
.dark-mode .brands {
  background: #1e293b;
  color: #e2e8f0;
}

.dark-mode .search-box {
  background: #1e293b;
  color: #f8fafc;
  border-color: #475569;
}

.dark-mode .brand-table {
  background: #1e293b;
}

.dark-mode .brand-table th {
  background: #334155;
  color: #f1f5f9;
}

.dark-mode .brand-table td {
  color: #cbd5e1;
}

.dark-mode .dropdown {
  background: #334155;
  color: #e2e8f0;
}

.dark-mode .submit-btn,
.dark-mode .btn.primary,
.dark-mode .btn.green {
  background: #3b82f6;
}

.dark-mode .tabs button {
  background: #334155;
  color: #e2e8f0;
}

.dark-mode .tabs button.active {
  background: #3b82f6;
  color: white;
}

/* Responsive */
@media (max-width: 768px) {
  .top-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .search-box {
    width: 100%;
  }

  .btn {
    width: 100%;
  }

  .tabs {
    flex-direction: column;
  }
}
</style>