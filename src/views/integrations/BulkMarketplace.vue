<template>
<MarketLayout />
  <div class="market-layout">

    <div class="header">
      <input v-model="searchQuery" type="text" placeholder="Ara..." class="search-box" />
      <button @click="openModal" class="new-button">+ Yeni XML Kaynağı</button>
    </div>
    <table class="market-table">
      <thead>
        <tr>
          <th>İşlem No</th>
          <th>Adı</th>
          <th>İşlem</th>
          <th>Pazaryeri</th>
          <th>Zamanlama</th>
          <th>Durum</th>
          <th>İşlemler</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!records.length" class="no-data">
          <td colspan="7">
            <div class="no-data-content">
              <p>Kayıt bulunamadı.</p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="isModalOpen" class="modal">
      <div class="modal-content">
        <h2>Toplu Pazaryeri İşlemleri</h2>
        <label>Adı</label>
        <input v-model="form.name" type="text" />

        <label>Pazaryeri</label>
        <select v-model="form.marketplace">
          <option>N11</option>
        </select>

        <label>Mağaza</label>
        <select v-model="form.store">
          <option>#19 - Demo</option>
        </select>

        <label>İşlem</label>
        <select v-model="form.process">
          <option>Ürün Çekme</option>
        </select>

        <label>Zamanlama</label>
        <select v-model="form.schedule">
          <option>Hiçbir Zaman</option>
        </select>

        <div class="warning-box">
          <p>
            Ürün çekme işlemine başlamadan önce "Entegrasyonlar → Pazaryeri Entegrasyonları"
            mağaza ayarlarına girerek "Ürün Güncelleme" ve "Ürün Silme" işlemlerini kapatmanız önerilir.
          </p>
        </div>

        <label>Varsayılan KDV Oranı</label>
        <input v-model="form.vatRate" type="number" step="0.01" />

        <label>Ürün Eşleştirme Metodu</label>
        <select v-model="form.matchingMethod">
          <option>Ürün kodları ile eşleştir</option>
        </select>

        <button @click="save" class="save-button">Kaydet</button>
        <button @click="closeModal" class="close-button">Kapat</button>
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
}
.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.search-box {
  width: 300px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.new-button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.market-table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}
.no-data {
  text-align: center;
}
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
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
}
.save-button {
  background-color: #007bff;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
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
}
.warning-box {
  background: #ffebeb;
  color: #d9534f;
  padding: 10px;
  border-radius: 5px;
  margin: 10px 0;
}
</style>
