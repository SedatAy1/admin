<template>
  <div class="phone-orders">
    <!-- Üst Menü -->
    <div class="order-tabs">
      <router-link
        v-for="(tab, index) in tabs"
        :key="index"
        :to="tab.path"
        :class="{ active: $route.path === tab.path }"
      >
        {{ $t(tab.label) }}
      </router-link>
    </div>

    <!-- Filtreleme -->
    <div class="filter-container">
      <div class="filter-header" @click="toggleFilter">
        <i class="fas fa-filter"></i>
        <span>{{ $t("filters.title") }}</span>
        <i class="fas" :class="showFilter ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
      </div>

      <div v-show="showFilter" class="filter-content">
        <div class="filter-row">
          <div
            class="filter-group"
            v-for="(field, key) in filters"
            :key="key"
            v-if="key !== 'startDate' && key !== 'endDate'"
          >
            <label>{{ $t(`filters.fields.${key}`) }}</label>
            <input
              v-if="key !== 'status'"
              type="text"
              v-model="filters[key]"
              class="filter-input"
              :placeholder="$t(`filters.fields.${key}`)"
            />
            <select v-else v-model="filters.status" class="filter-input">
              <option value="">{{ $t("common.all") }}</option>
              <option>{{ $t("statuses.new") }}</option>
              <option>{{ $t("statuses.unreachable") }}</option>
              <option>{{ $t("statuses.callLater") }}</option>
              <option>{{ $t("statuses.later") }}</option>
            </select>
          </div>
        </div>

        <div class="filter-row">
          <div class="filter-group date-group">
            <label>{{ $t("filters.dateRange") }}</label>
            <div class="date-range">
              <input type="date" v-model="filters.startDate" class="filter-input" />
              <span>{{ $t("common.to") }}</span>
              <input type="date" v-model="filters.endDate" class="filter-input" />
            </div>
          </div>
        </div>

        <div class="filter-actions">
          <button @click="clearFilters" class="clear-btn">{{ $t("common.clear") }}</button>
          <button @click="applyFilters" class="filter-btn">{{ $t("common.filter") }}</button>
        </div>
      </div>
    </div>

    <!-- Tablo -->
    <div class="orders-table">
      <table>
        <thead>
          <tr>
            <th>{{ $t("table.id") }}</th>
            <th>{{ $t("table.customerName") }}</th>
            <th>{{ $t("table.phone") }}</th>
            <th>{{ $t("table.product") }}</th>
            <th>{{ $t("table.status") }}</th>
            <th>{{ $t("table.date") }}</th>
            <th>{{ $t("common.actions") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredOrders.length === 0">
            <td colspan="7" class="no-data">{{ $t("common.noData") }}</td>
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
      fieldLabels: {
        status: "Talep Durumu",
        customerName: "Müşteri Adı",
        phone: "Telefon",
        email: "E-Posta"
      },
      orders: [],
    };
  },
  computed: {
    filteredOrders() {
      return this.orders.filter(order => {
        return (
          (this.filters.status === "" || order.status === this.filters.status) &&
          (this.filters.customerName === "" || order.customerName.toLowerCase().includes(this.filters.customerName.toLowerCase())) &&
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
.phone-orders {
  padding: 1.5rem;
}

/* Tabs */
.order-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.order-tabs a {
  padding: 8px 14px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  background: #f0f2f5;
  color: #666;
  transition: 0.3s;
}

.order-tabs a.active {
  background: #6c63ff;
  color: white;
  box-shadow: 0 2px 10px rgba(108, 99, 255, 0.2);
}

/* Filtreleme */
.filter-container {
  background: white;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.filter-header {
  padding: 1rem;
  background: #f9f9f9;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.filter-content {
  padding: 1rem;
  border-top: 1px solid #eee;
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.filter-group {
  flex: 1;
  min-width: 200px;
}

.filter-group label {
  font-size: 13px;
  margin-bottom: 5px;
  display: block;
  color: #444;
}

.filter-input {
  width: 100%;
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.date-range {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Butonlar */
.filter-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.filter-btn,
.clear-btn {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: 0.2s;
}

.filter-btn {
  background: #6c63ff;
  color: white;
}

.clear-btn {
  background: #f1f1f1;
  color: #333;
}

/* Tablo */
.orders-table {
  background: white;
  border-radius: 10px;
  overflow-x: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.orders-table table {
  width: 100%;
  border-collapse: collapse;
}

.orders-table th,
.orders-table td {
  padding: 14px;
  border-bottom: 1px solid #eee;
  text-align: center;
  font-size: 14px;
}

.orders-table th {
  background: #f5f5f5;
  font-weight: bold;
}

.no-data {
  text-align: center;
  color: #999;
  font-style: italic;
}

/* Responsive */
@media (max-width: 768px) {
  .filter-row {
    flex-direction: column;
  }

  .order-tabs {
    flex-direction: column;
  }
}
</style>