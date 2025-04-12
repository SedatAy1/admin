<template>
  <div>
    <OrderTopMenu />

    <div class="active-carts">
      <h2>{{ $t("carts.title") }}</h2>

      <!-- Sipariş Tablosu -->
      <div class="carts-table">
        <table>
          <thead>
            <tr>
              <th>{{ $t("carts.table.orderId") }}</th>
              <th>{{ $t("carts.table.customer") }}</th>
              <th>{{ $t("carts.table.amount") }}</th>
              <th>{{ $t("carts.table.productCount") }}</th>
              <th>{{ $t("carts.table.date") }}</th>
              <th>{{ $t("carts.table.actions") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="carts.length === 0" class="empty-row">
              <td colspan="6">
                <div class="no-data">
                  <img src="@/assets/no-data.png" alt="Kayıt Bulunamadı" class="no-data-img" />
                  <p class="no-data-text">{{ $t("carts.noData") }}</p>
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
        <span>
          {{
            $t("carts.footer.showing", {
              from: 1,
              to: carts.length,
              total: carts.length
            })
          }}
        </span>
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
      carts: [] // API bağlandığında buraya veriler gelecek
    };
  }
};
</script>

<style scoped>
.active-carts {
  padding: 20px;
  background-color: #f9fafb;
  transition: background-color 0.3s ease;
}

.dark-mode .active-carts {
  background-color: #111827; /* slate-900 */
}

/* Başlık */
h2 {
  color: #1e3a8a;
  font-size: 22px;
  margin-bottom: 20px;
}

.dark-mode h2 {
  color: #60a5fa; /* blue-400 */
}

/* 📌 Boş Veri */
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

.dark-mode .no-data-text {
  color: #cbd5e1;
}

/* 📌 Tablo */
.carts-table {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.dark-mode .carts-table {
  background: #1e293b;
  color: #e2e8f0;
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
  background: #f3f4f6;
  font-weight: 600;
  color: #111827;
}

.dark-mode .carts-table th {
  background: #334155;
  color: #e0f2fe;
}

.empty-row {
  height: 250px;
}

/* 📌 Buton */
.action-btn {
  background: #2563eb;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.action-btn:hover {
  background: #1d4ed8;
}

.dark-mode .action-btn {
  background: #3b82f6;
}

/* 📌 Alt Bilgi */
.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  font-size: 14px;
}

.table-footer select {
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.dark-mode .table-footer select {
  background: #1f2937;
  color: #e2e8f0;
  border-color: #374151;
}

/* 📱 Responsive */
@media (max-width: 768px) {
  .carts-table table {
    font-size: 13px;
  }

  .table-footer {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }

  .table-footer select {
    width: 100%;
    max-width: 150px;
  }
}
</style>
