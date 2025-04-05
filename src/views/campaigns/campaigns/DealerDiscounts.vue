<template>
  <div class="discounts-container">
    <!-- Üst Kısım: Arama ve Butonlar -->
    <div class="header-section">
      <input type="text" class="search-input" placeholder="🔍 Ara...">
      <div class="buttons">
        <button class="btn btn-primary" @click="openNewDiscountModal">
          ➕ Yeni İndirim Tanımla
        </button>
        <button class="btn btn-success" @click="openExcelModal">
          📊 Excel İşlemleri
        </button>
      </div>
    </div>

    <!-- Tablo (Boşsa "Kayıt Bulunamadı" göster) -->
    <div class="table-container">
      <table v-if="discounts.length > 0">
        <thead>
          <tr>
            <th>#</th>
            <th>İndirim No</th>
            <th>Kategori</th>
            <th>Marka</th>
            <th>Ürün</th>
            <th>Bayi Grubu</th>
            <th>Bayi</th>
            <th>İndirim Tipi</th>
            <th>İndirim Miktarı</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(discount, index) in discounts" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ discount.id }}</td>
            <td>{{ discount.category }}</td>
            <td>{{ discount.brand }}</td>
            <td>{{ discount.product }}</td>
            <td>{{ discount.dealerGroup }}</td>
            <td>{{ discount.dealer }}</td>
            <td>{{ discount.discountType }}</td>
            <td>{{ discount.discountValue }}</td>
            <td>
              <button class="btn btn-sm btn-danger" @click="deleteDiscount(index)">❌ Sil</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Eğer hiç indirim yoksa -->
      <div v-else class="empty-state">
        <img src="@/assets/empty.svg" alt="No Data" />
        <p>Kayıt bulunamadı.</p>
      </div>
    </div>

    <!-- Yeni İndirim Modalı -->
    <div v-if="showNewDiscountModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h2>Yeni Bayi İndirimi</h2>
          <button class="close-btn" @click="closeNewDiscountModal">✖</button>
        </div>

        <div class="modal-section">
          <h3>📌 İndirim Uygulanacak Ürün Grubu Bilgileri</h3>
          <p>Ürün alanını seçtiğinizde indirim sadece ilgili ürüne uygulanacaktır.</p>
          <div class="form-group">
            <label>Kategori</label>
            <select>
              <option>Tüm Kategoriler</option>
            </select>
          </div>
          <div class="form-group">
            <label>Marka</label>
            <select>
              <option>Tüm Markalar</option>
            </select>
          </div>
          <div class="form-group">
            <label>Ürün</label>
            <input type="text">
          </div>
        </div>

        <div class="modal-section">
          <h3>📌 İndirim Uygulanacak Bayi Grubu Bilgileri</h3>
          <p>Bayi alanını seçtiğinizde indirim sadece ilgili bayiye uygulanacaktır.</p>
          <div class="form-group">
            <label>Bayi Grubu</label>
            <select>
              <option>Tüm Gruplar</option>
            </select>
          </div>
          <div class="form-group">
            <label>Bayi</label>
            <input type="text">
          </div>
        </div>

        <div class="modal-section">
          <h3>📌 İndirim Bilgileri</h3>
          <div class="form-group">
            <label>İndirim Tipi</label>
            <select>
              <option>Tutar (TRY)</option>
            </select>
          </div>
          <div class="form-group">
            <label>İndirim Miktarı</label>
            <input type="number">
          </div>
        </div>

        <button class="btn btn-primary" @click="saveDiscount">✔ Kaydet</button>
      </div>
    </div>

    <!-- Excel Modalı -->
    <div v-if="showExcelModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h2>Bayi İndirimleri - Excel İşlemleri</h2>
          <button class="close-btn" @click="closeExcelModal">✖</button>
        </div>
        <div class="tab-buttons">
          <button :class="{ active: activeTab === 'export' }" @click="activeTab = 'export'">Dışa Aktar</button>
          <button :class="{ active: activeTab === 'import' }" @click="activeTab = 'import'">İçe Aktar</button>
        </div>
        <div class="tab-content">
          <p v-if="activeTab === 'export'">📂 Tüm veriler Excel olarak dışa aktarılacaktır.</p>
          <p v-if="activeTab === 'import'">📥 Excel dosyanızı yükleyerek içe aktarım yapabilirsiniz.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      discounts: [],
      showNewDiscountModal: false,
      showExcelModal: false,
      activeTab: "export",
    };
  },
  methods: {
    openNewDiscountModal() {
      console.log("✅ Yeni İndirim Modal Açılıyor...");
      this.showNewDiscountModal = true;
    },
    closeNewDiscountModal() {
      console.log("❌ Yeni İndirim Modal Kapatılıyor...");
      this.showNewDiscountModal = false;
    },
    openExcelModal() {
      console.log("✅ Excel Modal Açılıyor...");
      this.showExcelModal = true;
    },
    closeExcelModal() {
      console.log("❌ Excel Modal Kapatılıyor...");
      this.showExcelModal = false;
    },
    saveDiscount() {
      console.log("✔ İndirim Kaydedildi");
      this.closeNewDiscountModal();
    },
    deleteDiscount(index) {
      console.log("🗑️ İndirim Silindi");
      this.discounts.splice(index, 1);
    }
  },
};
</script>

<style scoped>
/* Ortak Stiller */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: white;
  border-bottom: 1px solid #ddd;
}

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

.tab-buttons {
  display: flex;
  justify-content: space-around;
}

.tab-content {
  padding: 10px;
}
</style>