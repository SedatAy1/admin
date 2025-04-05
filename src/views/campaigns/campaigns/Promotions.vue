<template>
    <div class="promotions-container">
      <!-- Üst Kısım: Arama ve Buton -->
      <div class="header-section">
        <input type="text" class="search-input" placeholder="🔍 Ara...">
        <button class="btn btn-primary" @click="openNewPromotionModal">
          ➕ Yeni Promosyon
        </button>
      </div>

      <!-- Tablo (Boşsa "Kayıt Bulunamadı" göster) -->
      <div class="table-container">
        <table v-if="promotions.length > 0">
          <thead>
            <tr>
              <th>#</th>
              <th>Prom. No</th>
              <th>Tanım</th>
              <th>Min Sepet</th>
              <th>Başlangıç Tarihi</th>
              <th>Bitiş Tarihi</th>
              <th>Sıra</th>
              <th>Toplam Kullanım</th>
              <th>Durum</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(promotion, index) in promotions" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ promotion.id }}</td>
              <td>{{ promotion.name }}</td>
              <td>{{ promotion.minCart }}</td>
              <td>{{ promotion.startDate }}</td>
              <td>{{ promotion.endDate }}</td>
              <td>{{ promotion.order }}</td>
              <td>{{ promotion.totalUsage }}</td>
              <td>{{ promotion.status }}</td>
              <td>
                <button class="btn btn-sm btn-danger" @click="deletePromotion(index)">❌ Sil</button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Eğer hiç promosyon yoksa -->
        <div v-else class="empty-state">
          <img src="@/assets/empty.svg" alt="No Data" />
          <p>Kayıt bulunamadı.</p>
        </div>
      </div>
    </div>

    <!-- Yeni Promosyon Modalı -->
    <div v-if="showNewPromotionModal" class="modal-overlay" @click.self="closeNewPromotionModal">
      <div class="modal">
        <div class="modal-header">
          <h2>Yeni Promosyon</h2>
          <button class="close-btn" @click="closeNewPromotionModal">✖</button>
        </div>
        <p class="modal-info">
          Lütfen oluşturmak istediğiniz promosyon tipini seçin. Promosyon ayarları promosyonu oluşturduktan sonra yapılmaktadır.
        </p>

        <div class="promotion-types">
          <label v-for="(type, index) in promotionTypes" :key="index" class="radio-label">
            <input type="radio" v-model="selectedPromotionType" :value="type" />
            {{ type }}
          </label>
        </div>

        <div class="modal-buttons">
          <button class="btn btn-primary" @click="savePromotion">Oluştur</button>
        </div>
      </div>
    </div>

</template>

<script>
import CampaignsLayout from "@/views/campaigns/CampaignsLayout.vue";

export default {
  components: { CampaignsLayout },
  data() {
    return {
      promotions: [],
      showNewPromotionModal: false,
      selectedPromotionType: "",
      promotionTypes: [
        "Sepette X Al Y Öde Kampanyası",
        "Siparişte X Al Y Öde Kampanyası",
        "Sepette X Ürünlere Y İndirim",
        "Siparişte X Ürünlere Y İndirim",
        "X Ürünleri Alana Sepette Y Ürünü Z İndirimli",
        "Sepet Toplamına X İndirim"
      ],
    };
  },
  methods: {
    openNewPromotionModal() {
      console.log("Yeni Promosyon Modal Açılıyor...");
      this.showNewPromotionModal = true;
    },
    closeNewPromotionModal() {
      console.log("Yeni Promosyon Modal Kapatılıyor...");
      this.showNewPromotionModal = false;
    },
    savePromotion() {
      if (!this.selectedPromotionType) {
        alert("Lütfen bir promosyon tipi seçin!");
        return;
      }
      this.promotions.push({
        id: this.promotions.length + 1,
        name: this.selectedPromotionType,
        minCart: 0,
        startDate: "15.03.2025",
        endDate: "22.03.2025",
        order: this.promotions.length + 1,
        totalUsage: 0,
        status: "Aktif",
      });
      this.selectedPromotionType = "";
      this.closeNewPromotionModal();
    },
    deletePromotion(index) {
      this.promotions.splice(index, 1);
    }
  },
};
</script>

<style scoped>
/* Üst Kısım */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: white;
  border-bottom: 1px solid #ddd;
}

.search-input {
  width: 250px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn {
  padding: 8px 14px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
}

/* Tablo */
.table-container {
  background: white;
  padding: 20px;
  border-radius: 10px;
  margin-top: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

th {
  background: #f3f4f6;
  font-weight: bold;
}

.empty-state {
  text-align: center;
  padding: 30px;
}

.empty-state img {
  width: 100px;
  opacity: 0.5;
}

/* Modal */
/* Modal Overlay (Arka Plan) */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Daha koyu yap, şeffaflık artırıldı */
  z-index: 99998 !important; /* Üst katmanda olsun */
  display: flex !important; /* Emin olmak için */
  justify-content: center;
  align-items: center;
  visibility: visible !important; /* Eğer gizliyse göster */
}

/* Modal İçeriği */
.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 500px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 99999 !important; /* Modal her şeyin üstünde olsun */
  display: block !important; /* Eğer hala görünmüyorsa, ekle */
  position: relative;
  transform: translateY(0); /* Modal kaybolmasın */
  opacity: 1 !important;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.modal-info {
  background: #eef2ff;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
}

.promotion-types {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
}

.modal-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>