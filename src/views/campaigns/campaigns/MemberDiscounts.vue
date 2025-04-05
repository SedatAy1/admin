<template>
  <div class="discount-container">
    <!-- Üst Kısım: Arama ve Buton -->
    <div class="header-section">
      <input type="text" class="search-input" placeholder="🔍 Ara...">
      <button class="btn btn-primary" @click="openNewDiscountModal">
        ➕ Yeni İndirim Tanımla
      </button>
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
            <th>Üye Grubu</th>
            <th>Üye</th>
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
            <td>{{ discount.group }}</td>
            <td>{{ discount.user }}</td>
            <td>{{ discount.type }}</td>
            <td>{{ discount.amount }}</td>
            <td>
              <button class="btn btn-sm btn-danger" @click="deleteDiscount(index)">❌ Sil</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-else class="empty-state">
        <img src="@/assets/empty.svg" alt="No Data" />
        <p>Kayıt bulunamadı.</p>
      </div>
    </div>

    <!-- Yeni İndirim Tanımla Modalı -->
    <div v-if="showNewDiscountModal" class="modal-overlay" @click.self="closeNewDiscountModal">
      <div class="modal">
        <div class="modal-header">
          <h2>Yeni Üye İndirimi</h2>
          <button class="close-btn" @click="closeNewDiscountModal">✖</button>
        </div>

        <!-- Ürün Bilgileri -->
        <div class="section">
          <h3>İndirim Uygulanacak Ürün Grubu Bilgileri</h3>
          <div class="form-group">
            <label>Kategori</label>
            <select v-model="newDiscount.category">
              <option>Tüm Kategoriler</option>
            </select>
          </div>
          <div class="form-group">
            <label>Marka</label>
            <select v-model="newDiscount.brand">
              <option>Tüm Markalar</option>
            </select>
          </div>
          <div class="form-group">
            <label>Ürün</label>
            <input type="text" v-model="newDiscount.product" placeholder="Ürün giriniz">
          </div>
        </div>

        <!-- Üye Bilgileri -->
        <div class="section">
          <h3>İndirim Uygulanacak Üye Grubu Bilgileri</h3>
          <div class="form-group">
            <label>Üye Grubu</label>
            <select v-model="newDiscount.group">
              <option>Üyeler</option>
            </select>
          </div>
          <div class="form-group">
            <label>Üye</label>
            <input type="text" v-model="newDiscount.user" placeholder="Üye giriniz">
          </div>
        </div>

        <!-- İndirim Bilgileri -->
        <div class="section">
          <h3>İndirim Bilgileri</h3>
          <div class="form-group">
            <label>İndirim Tipi</label>
            <select v-model="newDiscount.type">
              <option>Tutar (TRY)</option>
            </select>
          </div>
          <div class="form-group">
            <label>İndirim Miktarı</label>
            <input type="text" v-model="newDiscount.amount" placeholder="İndirim miktarı giriniz">
          </div>
        </div>

        <!-- Butonlar -->
        <div class="modal-buttons">
          <button class="btn btn-primary" @click="saveDiscount">💾 Kaydet</button>
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
      newDiscount: {
        category: "",
        brand: "",
        product: "",
        group: "",
        user: "",
        type: "",
        amount: "",
      },
    };
  },
  methods: {
    openNewDiscountModal() {
      console.log("Yeni İndirim Modal Açılıyor...");
      this.showNewDiscountModal = true;
    },
    closeNewDiscountModal() {
      console.log("Yeni İndirim Modal Kapatılıyor...");
      this.showNewDiscountModal = false;
    },
    saveDiscount() {
      this.discounts.push({
        id: this.discounts.length + 1,
        category: this.newDiscount.category,
        brand: this.newDiscount.brand,
        product: this.newDiscount.product,
        group: this.newDiscount.group,
        user: this.newDiscount.user,
        type: this.newDiscount.type,
        amount: this.newDiscount.amount,
      });
      this.closeNewDiscountModal();
    },
    deleteDiscount(index) {
      this.discounts.splice(index, 1);
    },
  },
};
</script>

<style scoped>
/* Header */
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

/* Table */
.table-container {
  background: white;
  padding: 20px;
  border-radius: 10px;
  margin-top: 10px;
}

th, td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.empty-state {
  text-align: center;
  padding: 30px;
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
}

.modal-buttons {
  display: flex;
  justify-content: center;
}
</style>