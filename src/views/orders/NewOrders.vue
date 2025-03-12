<template>
  <div class="new-orders">
    <div class="order-tabs">
      <router-link
        v-for="tab in orderTabs"
        :key="tab.route"
        :to="tab.route"
        class="order-tab"
        :class="{ active: $route.path === tab.route }"
      >
        <span>{{ tab.name }}</span>
      </router-link>
    </div>
    <!-- Filtreleme Seçenekleri -->
    <div class="filter-section">
      <div class="filter-header">
        <span>🔍 Filtreleme Seçenekleri</span>
        <button @click="toggleFilter" class="toggle-btn">
          <span v-if="showFilter">▲</span>
          <span v-else>▼</span>
        </button>
      </div>
      <div v-show="showFilter" class="filter-content">
        <div class="filter-grid">
          <div class="filter-item">
            <label for="orderStatus">Sipariş Durumu</label>
            <select id="orderStatus">
              <option>Yeni Sipariş</option>
              <option>Hazırlanan Siparişler</option>
              <option>Kargolanan Siparişler</option>
              <option>Teslim Edilen Siparişler</option>
              <option>Sipariş Talepleri</option>
              <option>İptal Edilenler</option>
              <option>Tamamlanmayan Siparişler</option>
            </select>
          </div>

          <div class="filter-item">
            <label for="platform">Platform</label>
            <select id="platform">
              <option>Hiçbiri seçilmedi</option>
            </select>
          </div>

          <div class="filter-item">
            <label for="store">Mağaza</label>
            <select id="store">
              <option>Hiçbiri seçilmedi</option>
            </select>
          </div>

          <div class="filter-item">
            <label for="terminal">Satış Terminali</label>
            <select id="terminal">
              <option>Seçilmedi</option>
            </select>
          </div>

          <div class="filter-item">
            <label for="orderNumber">Sipariş No</label>
            <input type="text" id="orderNumber" />
          </div>

          <div class="filter-item">
            <label for="orderDate">Sipariş Tarihi</label>
            <input type="date" id="orderDate" />
          </div>

          <div class="filter-item">
            <label for="invoiceDate">Fatura Tarihi</label>
            <input type="date" id="invoiceDate" />
          </div>

          <div class="filter-item">
            <label for="eInvoiceDate">E-Fatura Tarihi</label>
            <input type="date" id="eInvoiceDate" />
          </div>

          <div class="filter-item">
            <label for="customerName">Müşteri Adı</label>
            <input type="text" id="customerName" />
          </div>

          <div class="filter-item">
            <label for="customerSurname">Müşteri Soyadı</label>
            <input type="text" id="customerSurname" />
          </div>

          <div class="filter-item">
            <label for="phone">Telefon</label>
            <input type="text" id="phone" />
          </div>

          <div class="filter-item">
            <label for="taxNumber">Vergi Numarası</label>
            <input type="text" id="taxNumber" />
          </div>

          <div class="filter-item">
            <label for="taxOffice">Vergi Dairesi</label>
            <input type="text" id="taxOffice" />
          </div>

          <div class="filter-item">
            <label for="idNumber">TC Kimlik No</label>
            <input type="text" id="idNumber" />
          </div>

          <div class="filter-item">
            <label for="country">Ülke</label>
            <select id="country">
              <option>Hiçbiri seçilmedi</option>
            </select>
          </div>

          <div class="filter-item">
            <label for="city">İl</label>
            <input type="text" id="city" />
          </div>

          <div class="filter-item">
            <label for="giftCode">Hediye Çeki Kodu</label>
            <input type="text" id="giftCode" />
          </div>

          <div class="filter-item">
            <label for="promotion">Promosyon</label>
            <select id="promotion">
              <option>Seçilmedi</option>
            </select>
          </div>

          <div class="filter-item">
            <label for="cargoCompany">Kargo Firması</label>
            <select id="cargoCompany">
              <option>Seçilmedi</option>
            </select>
          </div>

          <div class="filter-item">
            <label for="advancedSearch">Gelişmiş Arama</label>
            <select id="advancedSearch">
              <option>Hiçbiri seçilmedi</option>
            </select>
          </div>
        </div>

        <div class="filter-buttons">
          <button class="reset-btn">Temizle</button>
          <button class="apply-btn">Filtrele</button>
        </div>
      </div>
    </div>

    <!-- Siparişler Tablosu -->
    <div class="orders-table">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Sipariş Bilgileri</th>
            <th>Müşteri Bilgileri</th>
            <th>Tutar</th>
            <th>Durum</th>
            <th>Kargo</th>
            <th>Tarih</th>
            <th>Yazdır</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="orders.length === 0">
            <td colspan="9" class="no-data">
              <img src="@/assets/no-data.png" alt="No Data" class="no-data-img" />
              <p>Kayıt bulunamadı.</p>
            </td>
          </tr>
          <tr v-for="(order, index) in orders" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ order.orderInfo }}</td>
            <td>{{ order.customerInfo }}</td>
            <td>{{ order.amount }}</td>
            <td>{{ order.status }}</td>
            <td>{{ order.shipping }}</td>
            <td>{{ order.date }}</td>
            <td><button class="print-btn">🖨️</button></td>
            <td><button class="action-btn">⚙️</button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Alt Bilgilendirme -->
    <div class="table-footer">
      <select v-model="itemsPerPage">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
      <span>{{ orders.length }} kayıttan 1 ile {{ orders.length }} arası gösteriliyor</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewOrders",
  data() {
    return {
      showFilter: true,
      itemsPerPage: 20,
      orders: [] // Burada siparişler listesi olacak (API bağlanınca güncellenecek)
    };
  },
  methods: {
    toggleFilter() {
      this.showFilter = !this.showFilter;
    }
  }
};
</script>


<style scoped>
.new-orders {
  padding: 20px;
}

/* Filtreleme Seçenekleri */
.filter-section {
  background: #0d47a1;
  color: white;
  padding: 15px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  margin-bottom: 15px;
}

.toggle-btn {
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
}

/* Tablo */
.orders-table {
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.orders-table table {
  width: 100%;
  border-collapse: collapse;
}

.orders-table th, .orders-table td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
  text-align: center;
}

.orders-table th {
  background: #f5f5f5;
  font-weight: bold;
}

.no-data {
  text-align: center;
  padding: 20px;
}

.no-data-img {
  width: 50px;
  margin-bottom: 5px;
}

/* Alt Kısım */
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
.filter-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
}

.filter-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

.filter-item {
  display: flex;
  flex-direction: column;
}

.filter-item label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

.filter-item input,
.filter-item select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.filter-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}

.filter-buttons .reset-btn {
  background: #ccc;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;
}

.filter-buttons .apply-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}
/* Filtreleme Seçenekleri */
.filter-section {
  background: #0d47a1;
  color: white;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
}

.toggle-btn {
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
}
</style>
