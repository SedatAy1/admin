<template>
  <div>
    <OrderTopMenu />

    <div class="bank-transfers">
      <h2>{{ $t("transfers.title") }}</h2>

      <div class="search-box">
        <input v-model="searchQuery" type="text" :placeholder="$t('common.searchPlaceholder')" />
      </div>

      <!-- Havale Bildirimleri Tablosu -->
      <div class="transfers-table">
        <table>
          <thead>
            <tr>
              <th>{{ $t("transfers.table.id") }}</th>
              <th>{{ $t("transfers.table.orderId") }}</th>
              <th>{{ $t("transfers.table.name") }}</th>
              <th>{{ $t("transfers.table.phone") }}</th>
              <th>{{ $t("transfers.table.amount") }}</th>
              <th>{{ $t("transfers.table.bank") }}</th>
              <th>{{ $t("transfers.table.bankAccount") }}</th>
              <th>{{ $t("transfers.table.status") }}</th>
              <th>{{ $t("transfers.table.date") }}</th>
              <th>{{ $t("transfers.table.actions") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredTransfers.length === 0" class="empty-row">
              <td colspan="10">
                <div class="no-data">
                  <img src="@/assets/no-data.png" alt="No Data" class="no-data-img" />
                  <p class="no-data-text">{{ $t("transfers.noData") }}</p>
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
        <span>
          {{
            $t("transfers.footer.showing", {
              from: 1,
              to: filteredTransfers.length,
              total: filteredTransfers.length
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
  background-color: #f9fafb;
  transition: background-color 0.3s ease;
}

.dark-mode .bank-transfers {
  background-color: #0f172a; /* slate-900 */
}

/* Başlık */
h2 {
  color: #1e3a8a;
  font-size: 22px;
  margin-bottom: 20px;
}

.dark-mode h2 {
  color: #60a5fa;
}

/* Arama Kutusu */
.search-box {
  margin-bottom: 15px;
}

.search-box input {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  font-size: 15px;
}

.dark-mode .search-box input {
  background: #1e293b;
  border-color: #334155;
  color: #e2e8f0;
}

/* Boş Veri */
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
  color: #94a3b8;
}

/* Tablo */
.transfers-table {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.dark-mode .transfers-table {
  background: #1e293b;
  color: #e2e8f0;
}

.transfers-table table {
  width: 100%;
  border-collapse: collapse;
}

.transfers-table th,
.transfers-table td {
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
  text-align: center;
  transition: background-color 0.2s ease;
}

.transfers-table tr:hover {
  background: rgba(59, 130, 246, 0.05);
}

.dark-mode .transfers-table tr:hover {
  background: rgba(255, 255, 255, 0.04);
}

.transfers-table th {
  background: #f1f5f9;
  font-weight: bold;
  color: #1f2937;
}

.dark-mode .transfers-table th {
  background: #334155;
  color: #e2e8f0;
}

/* Durum */
.status-approved {
  color: #10b981;
  font-size: 18px;
}

.status-rejected {
  color: #ef4444;
  font-size: 18px;
}

/* Butonlar */
.view-btn,
.delete-btn {
  padding: 6px 10px;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  margin: 0 2px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.view-btn {
  background: #3b82f6;
  color: white;
}

.view-btn:hover {
  background: #2563eb;
}

.delete-btn {
  background: #ef4444;
  color: white;
}

.delete-btn:hover {
  background: #dc2626;
}

.dark-mode .view-btn {
  background: #60a5fa;
}

.dark-mode .delete-btn {
  background: #f87171;
}

/* Footer */
.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  font-size: 14px;
  margin-top: 10px;
}

.table-footer select {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
}

.dark-mode .table-footer select {
  background: #1e293b;
  border-color: #334155;
  color: #e2e8f0;
}

/* Responsive */
@media (max-width: 768px) {
  h2 {
    font-size: 20px;
  }

  .transfers-table th,
  .transfers-table td {
    font-size: 13px;
    padding: 10px;
  }

  .table-footer {
    flex-direction: column;
    gap: 10px;
  }

  .table-footer select {
    width: 100%;
    max-width: 150px;
  }
}
</style>
