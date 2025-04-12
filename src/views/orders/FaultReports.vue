<template>
  <div>
    <OrderTopMenu />

    <div class="fault-reports">
      <h2>{{ $t("fault.title") }}</h2>

      <div class="search-box">
        <input v-model="searchQuery" type="text" :placeholder="$t('common.searchPlaceholder')" />
      </div>

      <!-- Arıza Bildirimleri Tablosu -->
      <div class="reports-table">
        <table>
          <thead>
            <tr>
              <th>{{ $t("fault.table.id") }}</th>
              <th>{{ $t("fault.table.orderId") }}</th>
              <th>{{ $t("fault.table.name") }}</th>
              <th>{{ $t("fault.table.subject") }}</th>
              <th>{{ $t("fault.table.date") }}</th>
              <th>{{ $t("fault.table.status") }}</th>
              <th>{{ $t("fault.table.actions") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredReports.length === 0" class="empty-row">
              <td colspan="7">
                <div class="no-data">
                  <img src="@/assets/no-data.png" alt="No Data" class="no-data-img" />
                  <p class="no-data-text">{{ $t("fault.noData") }}</p>
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
                  ❌ {{ $t("fault.status.passive") }}
                </span>
              </td>
              <td>
                <div class="dropdown">
                  <button class="dropdown-btn">{{ $t("fault.actions.label") }} ⌄</button>
                  <div class="dropdown-content">
                    <a href="#">{{ $t("fault.actions.detail") }}</a>
                    <a href="#">{{ $t("fault.actions.update") }}</a>
                    <a href="#">{{ $t("fault.actions.delete") }}</a>
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
        <span>
          {{
            $t("fault.footer.showing", {
              from: 1,
              to: filteredReports.length,
              total: filteredReports.length
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
  background: #f9fafb;
  transition: background 0.3s ease;
}

.dark-mode .fault-reports {
  background: #0f172a; /* slate-900 */
}

/* Başlık */
h2 {
  color: #1e3a8a;
  margin-bottom: 20px;
  font-size: 22px;
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
.reports-table {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.dark-mode .reports-table {
  background: #1e293b;
  color: #e2e8f0;
}

.reports-table table {
  width: 100%;
  border-collapse: collapse;
}

.reports-table th,
.reports-table td {
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
  text-align: center;
  transition: background-color 0.2s ease;
}

.reports-table tr:hover {
  background: rgba(59, 130, 246, 0.05);
}

.dark-mode .reports-table tr:hover {
  background: rgba(255, 255, 255, 0.04);
}

.reports-table th {
  background: #f1f5f9;
  font-weight: bold;
  color: #1f2937;
}

.dark-mode .reports-table th {
  background: #334155;
  color: #e2e8f0;
}

/* Pasif Durum */
.status-badge {
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: 500;
  font-size: 14px;
}

.status-passive {
  background: #fde8e8;
  color: #dc2626;
}

.dark-mode .status-passive {
  background: #4b1c1c;
  color: #f87171;
}

/* Dropdown İşlemler */
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-btn {
  background: #f1f5f9;
  border: 1px solid #ccc;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dropdown-btn:hover {
  background: #e2e8f0;
}

.dark-mode .dropdown-btn {
  background: #334155;
  color: #fff;
  border-color: #475569;
}

.dark-mode .dropdown-btn:hover {
  background: #475569;
}

.dropdown-content {
  display: none;
  position: absolute;
  background: white;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  min-width: 120px;
  z-index: 10;
  overflow: hidden;
  right: 0;
}

.dark-mode .dropdown-content {
  background: #1e293b;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content a {
  padding: 10px 14px;
  display: block;
  text-decoration: none;
  font-size: 14px;
  color: #111827;
  transition: background 0.2s ease;
}

.dropdown-content a:hover {
  background: #f3f4f6;
}

.dark-mode .dropdown-content a {
  color: #e2e8f0;
}

.dark-mode .dropdown-content a:hover {
  background: #334155;
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

  .reports-table th,
  .reports-table td {
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