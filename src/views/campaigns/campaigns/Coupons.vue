<template>
    <div class="coupon-container">
      <!-- Üst Kısım: Arama ve Butonlar -->
      <div class="header-section">
        <input type="text" class="search-input" placeholder="🔍 Ara...">
        <div class="buttons">
          <button class="btn btn-primary" @click="openNewCouponModal">
            ➕ Yeni Hediye Çeki
          </button>
          <button class="btn btn-success" @click="openExcelModal">
            📊 Excel İşlemleri
          </button>
        </div>
      </div>

      <!-- Tablo (Boşsa "Kayıt Bulunamadı" göster) -->
      <div class="table-container">
        <table v-if="coupons.length > 0">
          <thead>
            <tr>
              <th>#</th>
              <th>Çek No</th>
              <th>Tanım</th>
              <th>Çek Kodu</th>
              <th>Ücretsiz Kargo</th>
              <th>Min Sepet</th>
              <th>Max Kullanım</th>
              <th>Toplam Kullanım</th>
              <th>Başlangıç Tarihi</th>
              <th>Bitiş Tarihi</th>
              <th>Durum</th>
              <th>İşlem</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(coupon, index) in coupons" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ coupon.id }}</td>
              <td>{{ coupon.name }}</td>
              <td>{{ coupon.code }}</td>
              <td>{{ coupon.freeShipping ? '✅' : '❌' }}</td>
              <td>{{ coupon.minCart }}</td>
              <td>{{ coupon.maxUsage }}</td>
              <td>{{ coupon.totalUsage }}</td>
              <td>{{ coupon.startDate }}</td>
              <td>{{ coupon.endDate }}</td>
              <td>{{ coupon.status }}</td>
              <td>
                <button class="btn btn-sm btn-danger" @click="deleteCoupon(index)">❌ Sil</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-else class="empty-state">
          <img src="@/assets/empty.svg" alt="No Data" />
          <p>Kayıt bulunamadı.</p>
        </div>
      </div>
    </div>

    <!-- Yeni Kupon Modalı -->
    <div v-if="showNewCouponModal" class="modal-overlay">
      <div class="modal">
        <h2>Yeni Kupon</h2>
        <div class="form-group">
          <label>Kupon Kodu:</label>
          <input type="text" v-model="newCoupon.code" />
        </div>
        <button class="btn btn-primary" @click="saveCoupon">Kaydet</button>
        <button class="btn btn-secondary" @click="closeNewCouponModal">İptal</button>
      </div>
    </div>

    <!-- Excel Modalı -->
    <div v-if="showExcelModal" class="modal-overlay">
      <div class="modal">
        <h2>Hediye Çekleri - Excel İşlemleri</h2>
        <div class="tab-buttons">
          <button :class="{ active: activeTab === 'export' }" @click="activeTab = 'export'">Dışa Aktar</button>
          <button :class="{ active: activeTab === 'import' }" @click="activeTab = 'import'">İçe Aktar</button>
        </div>
        <div class="tab-content">
          <p v-if="activeTab === 'export'">Tüm veriler Excel olarak dışa aktarılacaktır.</p>
          <p v-if="activeTab === 'import'">Excel dosyanızı yükleyerek içe aktarım yapabilirsiniz.</p>
        </div>
        <button class="btn btn-secondary" @click="closeExcelModal">Kapat</button>
      </div>
    </div>

</template>

<script>
import CampaignsLayout from "@/views/campaigns/CampaignsLayout.vue";

export default {
  components: { CampaignsLayout },
  data() {
    return {
      coupons: [],
      showNewCouponModal: false,
      showExcelModal: false,
      newCoupon: {
        code: "",
      },
      activeTab: "export",
    };
  },
  methods: {
    openNewCouponModal() {
      this.showNewCouponModal = true;
    },
    closeNewCouponModal() {
      this.showNewCouponModal = false;
    },
    openExcelModal() {
      this.showExcelModal = true;
    },
    closeExcelModal() {
      this.showExcelModal = false;
    },
    saveCoupon() {
      if (this.newCoupon.code.trim() === "") {
        alert("Kupon kodu boş olamaz!");
        return;
      }
      this.coupons.push({
        id: this.coupons.length + 1,
        code: this.newCoupon.code,
        name: "Yeni Kupon",
        freeShipping: false,
        minCart: 0,
        maxUsage: 10,
        totalUsage: 0,
        startDate: "15.03.2025",
        endDate: "22.03.2025",
        status: "Aktif",
      });
      this.newCoupon.code = "";
      this.closeNewCouponModal();
    },
    deleteCoupon(index) {
      this.coupons.splice(index, 1);
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

.buttons {
  display: flex;
  gap: 10px;
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

.btn-success {
  background: #22c55e;
  color: white;
}

.btn-success:hover {
  background: #16a34a;
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
/* Modal Overlay */
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

/* Kapat Butonu */
.close-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  float: right;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>