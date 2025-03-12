<template>
  <div>
    <OrderTopMenu />

    <div class="active-carts">
      <h2>Aktif Sepetler</h2>

      <!-- Sipariş Tablosu -->
      <div class="carts-table">
        <table>
          <thead>
            <tr>
              <th>Sipariş No</th>
              <th>Müşteri Bilgileri</th>
              <th>Tutar</th>
              <th>Ürün Sayısı</th>
              <th>Tarih</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="carts.length === 0" class="empty-row">
              <td colspan="6">
                <div class="no-data">
                  <img src="@/assets/no-data.png" alt="Kayıt Bulunamadı" class="no-data-img" />
                  <p class="no-data-text">Kayıt bulunamadı.</p>
                </div>
              </td>
            </tr>
            <tr v-for="(cart, index) in carts" :key="cart.id">
              <td>{{ cart.id }}</td>
              <td>{{ cart.customerName }}</td>
              <td>{{ cart.totalAmount }} TL</td>
              <td>{{ cart.productCount }}</td>
              <td>{{ cart.date }}</td>
              <td><button class="action-btn">⚙️</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 📌 Alt Bilgilendirme -->
      <div class="table-footer">
        <select v-model="itemsPerPage">
          <option value="15">15</option>
          <option value="30">30</option>
          <option value="50">50</option>
        </select>
        <span>{{ carts.length }} kayıttan 1 ile {{ carts.length }} arası gösteriliyor</span>
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
      itemsPerPage: 15,
      carts: [], // API bağlandığında buraya veriler gelecek
    };
  },
};
</script>

<style scoped>
.active-carts {
  padding: 20px;
}

/* Başlık */
h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 22px;
}

/* 📌 Boş Veri Mesajı */
.no-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
}

.no-data-img {
  width: 80px;
  opacity: 0.8;
  margin-bottom: 10px;
}

.no-data-text {
  font-size: 16px;
  color: #666;
}

/* 📌 Tablo */
.carts-table {
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.carts-table table {
  width: 100%;
  border-collapse: collapse;
}

.carts-table th,
.carts-table td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
  text-align: center;
}

.carts-table th {
  background: #f5f5f5;
  font-weight: bold;
}

.empty-row {
  height: 250px;
}

/* 📌 Alt Bilgilendirme */
.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-size: 14px;
}

.table-footer select {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ddd;
}
</style>
