<template>
  <div class="phone-orders">

    <!-- ✅ Üst Menü (Sidebar gibi yönlendirme yapar) -->
    <div class="order-tabs">
      <router-link
        v-for="(tab, index) in tabs"
        :key="index"
        :to="tab.path"
        :class="{ active: $route.path === tab.path }"
      >
        {{ tab.label }}
      </router-link>
    </div>

    <!-- ✅ Filtreleme Seçenekleri -->
    <div class="filter-container">
      <div class="filter-header" @click="toggleFilter">
        <i class="fas fa-filter"></i>
        <span>Filtreleme Seçenekleri</span>
        <i class="fas" :class="showFilter ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
      </div>

      <div v-show="showFilter" class="filter-content">
        <div class="filter-row">
          <div class="filter-group">
            <label>Talep Durumu</label>
            <select v-model="filters.status" class="filter-input">
              <option value="">Tümü</option>
              <option value="Yeni">Yeni</option>
              <option value="Ulaşılamadı">Ulaşılamadı</option>
              <option value="Tekrar Aranacak">Tekrar Aranacak</option>
              <option value="Daha Sonra">Daha Sonra</option>
            </select>
          </div>

          <div class="filter-group">
            <label>Müşteri Adı</label>
            <input type="text" v-model="filters.customerName" class="filter-input" placeholder="Müşteri Adı" />
          </div>

          <div class="filter-group">
            <label>Telefon</label>
            <input type="text" v-model="filters.phone" class="filter-input" placeholder="Telefon Numarası" />
          </div>

          <div class="filter-group">
            <label>E-Posta Adresi</label>
            <input type="text" v-model="filters.email" class="filter-input" placeholder="E-Posta Adresi" />
          </div>
        </div>

        <div class="filter-row">
          <div class="filter-group">
            <label>Talep Tarihi</label>
            <div class="date-range">
              <input type="date" v-model="filters.startDate" class="filter-input" />
              <span>ile</span>
              <input type="date" v-model="filters.endDate" class="filter-input" />
            </div>
          </div>
        </div>

        <div class="filter-actions">
          <button @click="clearFilters" class="clear-btn">Temizle</button>
          <button @click="applyFilters" class="filter-btn">Filtrele</button>
        </div>
      </div>
    </div>

    <!-- ✅ Sipariş Tablosu -->
    <div class="orders-table">
      <table>
        <thead>
          <tr>
            <th>Talep No</th>
            <th>Müşteri Adı</th>
            <th>Telefon Numarası</th>
            <th>Ürün Adı</th>
            <th>Durum</th>
            <th>Tarih</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredOrders.length === 0">
            <td colspan="7" class="no-data">Kayıt bulunamadı.</td>
          </tr>
          <tr v-for="(order, index) in filteredOrders" :key="index">
            <td>{{ order.id }}</td>
            <td>{{ order.customerName }}</td>
            <td>{{ order.phone }}</td>
            <td>{{ order.productName }}</td>
            <td>{{ order.status }}</td>
            <td>{{ order.date }}</td>
            <td>
              <button class="action-btn">⚙️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
export default {
  name: "PhoneOrders",
  data() {
    return {
      tabs: [
        { label: "Hızlı Satış", path: "/orders/quick-sales" },
        { label: "Telefonla Sipariş Talepleri", path: "/orders/phone-orders" },
        { label: "Aktif Sepetler", path: "/orders/active-carts" },
        { label: "Havale Bildirimleri", path: "/orders/remittance-notifications" },
        { label: "Arıza Bildirimleri", path: "/orders/fault-reports" },
        { label: "Satış Terminalleri", path: "/orders/sales-terminals" },
        { label: "Toplu İşlemler", path: "/orders/bulk-actions" },
        { label: "Hızlı Ödemeler", path: "/orders/quick-payments" },
      ],
      showFilter: true,
      filters: {
        status: "",
        customerName: "",
        phone: "",
        email: "",
        startDate: "",
        endDate: "",
      },
      orders: [],
    };
  },
  computed: {
    filteredOrders() {
      return this.orders.filter((order) => {
        return (
          (this.filters.status === "" || order.status === this.filters.status) &&
          (this.filters.customerName === "" ||
            order.customerName.toLowerCase().includes(this.filters.customerName.toLowerCase())) &&
          (this.filters.phone === "" || order.phone.includes(this.filters.phone)) &&
          (this.filters.email === "" || order.email?.includes(this.filters.email)) &&
          (this.filters.startDate === "" || order.date >= this.filters.startDate) &&
          (this.filters.endDate === "" || order.date <= this.filters.endDate)
        );
      });
    },
  },
  methods: {
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
    applyFilters() {
      console.log("Filtreler uygulandı:", this.filters);
    },
    clearFilters() {
      this.filters = {
        status: "",
        customerName: "",
        phone: "",
        email: "",
        startDate: "",
        endDate: "",
      };
    },
  },
};
</script>

<style scoped>
/* ✅ Üst Menü (Sidebar gibi çalışır) */
.order-tabs {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
}

.order-tabs a {
  padding: 10px 15px;
  text-decoration: none;
  background: #f8f9fa;
  color: #6c757d;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  transition: 0.3s;
}

.order-tabs a.active {
  background: #0d6efd;
  color: white;
}

/* ✅ Filtreleme Bölümü */
/* Filtreleme Bölümü */
.filter-container {
  background: white;
  border-radius: 8px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
}

.filter-header {
  padding: 15px;
  background: #f8f9fa;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
}

.filter-content {
  padding: 15px;
  border-top: 1px solid #ddd;
}

.filter-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  width: 24%;
}

.filter-group label {
  font-size: 14px;
  margin-bottom: 5px;
}

.filter-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.date-range {
  display: flex;
  align-items: center;
}

.date-range span {
  margin: 0 10px;
}

.filter-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.filter-btn {
  padding: 8px 15px;
  border: none;
  background: #6c757d;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.clear-btn {
  padding: 8px 15px;
  border: none;
  background: #f8f9fa;
  color: black;
  border-radius: 5px;
  cursor: pointer;
}

/* ✅ Tablo */
.orders-table {
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.orders-table table {
  width: 100%;
  border-collapse: collapse;
}

.orders-table th,
.orders-table td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
  text-align: center;
}

.orders-table th {
  background: #f5f5f5;
  font-weight: bold;
}
</style>
