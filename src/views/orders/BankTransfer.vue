<template>
  <div>
    <OrderTopMenu />

    <div class="bank-transfers">
      <h2>Havale Bildirimleri</h2>

      <div class="search-box">
        <input v-model="searchQuery" type="text" placeholder="🔍 Ara..." />
      </div>

      <!-- Havale Bildirimleri Tablosu -->
      <div class="transfers-table">
        <table>
          <thead>
            <tr>
              <th>Havale No</th>
              <th>Sipariş No</th>
              <th>Ad Soyad</th>
              <th>Telefon</th>
              <th>Tutar</th>
              <th>Banka</th>
              <th>Banka Hesabı</th>
              <th>Durum</th>
              <th>Tarih</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredTransfers.length === 0" class="empty-row">
              <td colspan="10">
                <div class="no-data">
                  <img src="@/assets/no-data.png" alt="Kayıt Bulunamadı" class="no-data-img" />
                  <p class="no-data-text">Kayıt bulunamadı.</p>
                </div>
              </td>
            </tr>
            <tr v-for="(transfer, index) in filteredTransfers" :key="index">
              <td><strong>{{ transfer.id }}</strong></td>
              <td>{{ transfer.orderId }}</td>
              <td>{{ transfer.customerName }}</td>
              <td>{{ transfer.phone }}</td>
              <td>{{ transfer.amount }} TL</td>
              <td>{{ transfer.bank }}</td>
              <td>{{ transfer.bankAccount }}</td>
              <td>
                <span v-if="transfer.status === 'Onaylı'" class="status-approved">✔</span>
                <span v-else class="status-rejected">❌</span>
              </td>
              <td>{{ transfer.date }}</td>
              <td>
                <button class="view-btn">👁️</button>
                <button class="delete-btn">🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 📌 Alt Bilgilendirme -->
      <div class="table-footer">
        <select v-model="itemsPerPage">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
        <span>{{ filteredTransfers.length }} kayıttan 1 ile {{ filteredTransfers.length }} arası gösteriliyor</span>
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
      searchQuery: "",
      itemsPerPage: 10,
      transfers: [
        {
          id: "803978720",
          orderId: "803978720",
          customerName: "Eylül Türe",
          phone: "+905338900033",
          amount: "159.70",
          bank: "Test Bankası",
          bankAccount: "Test Teknoloji LTD. ŞTİ.",
          status: "Reddedildi",
          date: "2024-08-29",
        },
        {
          id: "307193416",
          orderId: "307193416",
          customerName: "Mahmut Ersoy",
          phone: "+905450980000",
          amount: "49.90",
          bank: "Test Bankası",
          bankAccount: "Test Teknoloji LTD. ŞTİ.",
          status: "Reddedildi",
          date: "2021-10-01",
        },
        {
          id: "494360061",
          orderId: "494360061",
          customerName: "Test Test",
          phone: "+90111111111",
          amount: "81.82",
          bank: "Test Bankası",
          bankAccount: "Test Teknoloji LTD. ŞTİ.",
          status: "Reddedildi",
          date: "2021-08-20",
        },
        {
          id: "165496181",
          orderId: "165496181",
          customerName: "asdasdasd",
          phone: "+905555555000",
          amount: "157.81",
          bank: "Test Bankası",
          bankAccount: "Test Teknoloji LTD. ŞTİ.",
          status: "Reddedildi",
          date: "2021-07-10",
        },
      ],
    };
  },
  computed: {
    filteredTransfers() {
      return this.transfers.filter((transfer) => {
        return (
          transfer.customerName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          transfer.phone.includes(this.searchQuery) ||
          transfer.bank.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    },
  },
};
</script>

<style scoped>
.bank-transfers {
  padding: 20px;
}

/* Başlık */
h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 22px;
}

/* 📌 Arama Kutusu */
.search-box {
  margin-bottom: 15px;
}

.search-box input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
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
.transfers-table {
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.transfers-table table {
  width: 100%;
  border-collapse: collapse;
}

.transfers-table th,
.transfers-table td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
  text-align: center;
}

.transfers-table th {
  background: #f5f5f5;
  font-weight: bold;
}

/* 📌 Durum Sütunu */
.status-approved {
  color: green;
  font-size: 20px;
}

.status-rejected {
  color: red;
  font-size: 20px;
}

/* 📌 İşlemler */
.view-btn {
  background: #007bff;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.delete-btn {
  background: #dc3545;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
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
