<template>
  <div>
    <OrderTopMenu />

    <div class="fault-reports">
      <h2>Arıza Bildirimleri</h2>

      <div class="search-box">
        <input v-model="searchQuery" type="text" placeholder="🔍 Ara..." />
      </div>

      <!-- Arıza Bildirimleri Tablosu -->
      <div class="reports-table">
        <table>
          <thead>
            <tr>
              <th>Bildirim No</th>
              <th>Sipariş No</th>
              <th>Adı Soyadı</th>
              <th>Konu</th>
              <th>Tarih</th>
              <th>Kapalı</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredReports.length === 0" class="empty-row">
              <td colspan="7">
                <div class="no-data">
                  <img src="@/assets/no-data.png" alt="Kayıt Bulunamadı" class="no-data-img" />
                  <p class="no-data-text">Kayıt bulunamadı.</p>
                </div>
              </td>
            </tr>
            <tr v-for="(report, index) in filteredReports" :key="index">
              <td><strong><a href="#">{{ report.id }}</a></strong></td>
              <td>{{ report.orderId }}</td>
              <td>{{ report.customerName }}</td>
              <td>{{ report.subject }}</td>
              <td>{{ report.date }}</td>
              <td>
                <span class="status-badge" :class="{'status-passive': report.status === 'Pasif'}">
                  ❌ {{ report.status }}
                </span>
              </td>
              <td>
                <div class="dropdown">
                  <button class="dropdown-btn">İşlemler ⌄</button>
                  <div class="dropdown-content">
                    <a href="#">Detay</a>
                    <a href="#">Güncelle</a>
                    <a href="#">Sil</a>
                  </div>
                </div>
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
        <span>{{ filteredReports.length }} kayıttan 1 ile {{ filteredReports.length }} arası gösteriliyor</span>
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
      reports: [
        {
          id: "1",
          orderId: "1254781",
          customerName: "Mehmet Melih Dereli",
          subject: "İade hk.",
          date: "2022-05-15 14:28",
          status: "Pasif",
        }
      ],
    };
  },
  computed: {
    filteredReports() {
      return this.reports.filter((report) => {
        return (
          report.customerName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          report.orderId.includes(this.searchQuery) ||
          report.subject.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    },
  },
};
</script>

<style scoped>
.fault-reports {
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
.reports-table {
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.reports-table table {
  width: 100%;
  border-collapse: collapse;
}

.reports-table th,
.reports-table td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
  text-align: center;
}

.reports-table th {
  background: #f5f5f5;
  font-weight: bold;
}

/* 📌 Pasif Durum */
.status-badge {
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
}

.status-passive {
  background: #fde8e8;
  color: #dc3545;
}

/* 📌 İşlemler - Dropdown */
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-btn {
  background: #f8f9fa;
  border: 1px solid #ccc;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.dropdown-content {
  display: none;
  position: absolute;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 100px;
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content a {
  padding: 8px 12px;
  display: block;
  text-decoration: none;
  color: black;
}

.dropdown-content a:hover {
  background: #f5f5f5;
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
