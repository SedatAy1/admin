<template>
  <div class="brands">
    <!-- Arama ve Butonlar -->
    <div class="top-bar">
      <input type="text" placeholder="🔍 Ara..." class="search-box" />
      <button class="btn primary" @click="showNewBrandModal = true">+ Yeni Marka</button>
      <button class="btn green" @click="showExcelModal = true">📊 Excel İşlemleri</button>
    </div>

    <!-- Marka Listesi -->
    <table class="brand-table">
      <thead>
        <tr>
          <th><input type="checkbox" /></th>
          <th>Marka No</th>
          <th>Marka Adı</th>
          <th>Durum</th>
          <th>Sıra</th>
          <th>İşlemler</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="brand in brands" :key="brand.id">
          <td><input type="checkbox" /></td>
          <td><strong>{{ brand.id }}</strong></td>
          <td>{{ brand.name }}</td>
          <td class="status"><span class="active">✔ Aktif</span></td>
          <td>{{ brand.order }}</td>
          <td>
            <button class="dropdown">İşlemler ▼</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Yeni Marka Modal -->
    <Modal :isOpen="showNewBrandModal" title="Yeni Marka" @close="showNewBrandModal = false">
      <div class="modal-body">
        <div class="tabs">
          <button v-for="tab in brandTabs" :key="tab" @click="activeTab = tab" :class="{ active: activeTab === tab }">
            {{ tab }}
          </button>
        </div>
        <div v-if="activeTab === 'Genel Bilgiler'">
          <div class="form-group">
            <label>Marka Adı <span class="required">Zorunlu</span></label>
            <input type="text" v-model="newBrand.name" />
          </div>
          <div class="form-group">
            <label>Marka Kısa Açıklaması</label>
            <input type="text" v-model="newBrand.description" />
          </div>
          <div class="form-group">
            <label>Durum <span class="required">Zorunlu</span></label>
            <select v-model="newBrand.status">
              <option>Aktif</option>
              <option>Pasif</option>
            </select>
          </div>
          <div class="form-group">
            <label>Sıra</label>
            <input type="number" v-model="newBrand.order" />
          </div>
          <div class="form-group">
            <label>Marka Logosu</label>
            <input type="file" />
          </div>
        </div>
      </div>
      <template v-slot:footer>
        <button class="submit-btn" @click="saveBrand">✔ Kaydet</button>
      </template>
    </Modal>

    <!-- Excel Modal -->
    <Modal :isOpen="showExcelModal" title="Kategoriler - Excel İşlemleri" @close="showExcelModal = false">
      <div class="modal-body">
        <div class="tabs">
          <button v-for="tab in excelTabs" :key="tab" @click="activeExcelTab = tab" :class="{ active: activeExcelTab === tab }">
            {{ tab }}
          </button>
        </div>
        <div v-if="activeExcelTab === 'Dışa Aktar'">
          <p>Tüm veriler excel olarak dışarı aktarılacaktır.</p>
          <button class="download-btn" @click="downloadExcel">📥 İndir</button>
        </div>
        <div v-if="activeExcelTab === 'İçe Aktar'">
          <p>Excel dosyanızı buraya yükleyerek içe aktarabilirsiniz.</p>
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
}
.top-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
.search-box {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.brand-table {
  width: 100%;
  border-collapse: collapse;
}
.brand-table th, .brand-table td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
.status .active {
  background: #c8e6c9;
  color: #2e7d32;
  padding: 5px 10px;
  border-radius: 5px;
}
.dropdown {
  padding: 5px 10px;
  border: none;
  background: #eee;
  cursor: pointer;
  border-radius: 5px;
}
.submit-btn {
  background: #007bff;
  color: white;
  padding: 10px;
  border: none;
  width: 100%;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
