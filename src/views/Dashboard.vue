<template>
  <div class="dashboard-container">
    <div class="dashboard-header card p-3 mb-4 d-flex justify-content-between align-items-center">

  <!-- Sol Taraf: Başlık ve Açıklama -->


  <!-- Sağ Taraf: Tarih Seçici ve Butonlar -->
  <div class="dashboard-controls d-flex align-items-center gap-3">
    <div class="date-picker">
      <i class="bi bi-calendar date-icon"></i>
      <input type="text" class="form-control date-range" placeholder="02/28/2025 - 03/30/2025">
    </div>
    <button class="btn btn-light upload-btn"><i class="bi bi-upload"></i></button>
    <button class="btn btn-primary filter-btn"><i class="bi bi-funnel"></i> Filter</button>
  </div>

</div>
    <!-- Üst Kısım: Kartlar -->
    <div class="row">
      <div v-for="(card, index) in statCards" :key="index" class="col-md-3">
        <div class="card stat-card">
          <div class="card-body">
            <h4 class="card-title">{{ card.title }}</h4>
            <p class="card-value">{{ card.value }}</p>
            <p class="card-change" :class="card.change > 0 ? 'text-success' : 'text-danger'">
              {{ card.change > 0 ? '+' : '' }}{{ card.change }}% This week
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Orta Kısım: Grafikler -->
    <div class="row mt-4">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Sales Statistics</h4>
            <canvas id="salesChart"></canvas>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Visitors By Device</h4>
            <canvas id="deviceChart"></canvas>
          </div>
        </div>
      </div>
    </div>

    <!-- Alt Kısım: Recent Orders & Transactions -->
    <div class="row mt-4">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Recent Orders</h4>
            <table class="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Customer</th>
                  <th>Qty</th>
                  <th>Date Ordered</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(order, index) in recentOrders" :key="index">
                  <td>{{ order.product }}</td>
                  <td>{{ order.category }}</td>
                  <td><span :class="`badge ${order.statusClass}`">{{ order.status }}</span></td>
                  <td>{{ order.customer }}</td>
                  <td>{{ order.qty }}</td>
                  <td>{{ order.date }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Recent Transactions</h4>
            <ul class="list-group">
              <li v-for="(transaction, index) in recentTransactions" :key="index" class="list-group-item d-flex justify-content-between">
                <span>{{ transaction.paymentMode }}</span>
                <span>{{ transaction.amount }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "Dashboard",
  data() {
    return {
      statCards: [
        { title: "Total Revenue", value: "$315,244", change: 12 },
        { title: "Total Customers", value: "153,432", change: -5 },
        { title: "Total Transactions", value: "75,275", change: 11 },
        { title: "Total Products", value: "626,532", change: 6.5 },
      ],
      recentOrders: [
        { product: "Elegance Wall Clock", category: "Home Decor", status: "Pending", statusClass: "bg-warning", customer: "John Smith", qty: 8, date: "01 Dec 2024" },
        { product: "Stridex Pro", category: "Footwear", status: "Completed", statusClass: "bg-success", customer: "Alice Brown", qty: 15, date: "29 Nov 2024" },
        { product: "EduCarry 360", category: "School Supplies", status: "Shipped", statusClass: "bg-info", customer: "Leo Phillip", qty: 10, date: "03 Dec 2024" }
      ],
      recentTransactions: [
        { paymentMode: "Paypal ****2783", amount: "$1,234" },
        { paymentMode: "Digital Wallet", amount: "$623" },
        { paymentMode: "Master Card ****7893", amount: "$1,312" },
      ]
    };
  },
  mounted() {
    this.renderCharts();
  },
  methods: {
    renderCharts() {
      new Chart(document.getElementById("salesChart"), {
        type: "bar",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [{
            label: "Sales",
            data: [50, 90, 120, 80, 150, 200, 170, 180, 210, 190, 220, 240],
            backgroundColor: "rgba(103, 58, 183, 0.5)"
          }]
        }
      });

      new Chart(document.getElementById("deviceChart"), {
        type: "doughnut",
        data: {
          labels: ["Mobile", "Desktop", "Laptop", "Tablet"],
          datasets: [{
            data: [4289, 3655, 2964, 1573],
            backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0"]
          }]
        }
      });
    }
  }
};
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
  background: #f8f9fa;
}

/* Kartlar için Temel Stiller */
.card {
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  background: white;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0px 6px 14px rgba(0, 0, 0, 0.12);
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

/* İstatistik Kartları */
.stat-card {
  text-align: center;
  background: #fff;
  padding: 15px;
}

.stat-card .card-value {
  font-size: 22px;
  font-weight: bold;
}

.stat-card .card-change {
  font-size: 14px;
}

/* Badge (Durum Etiketleri) */
.badge {
  padding: 6px 12px;
  font-size: 12px;
  font-weight: bold;
  border-radius: 20px;
}

/* Dashboard Header */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.05);
}

/* Sol Kısım: Başlık */
.header-text {
  text-align: left;
  flex-grow: 1;
  max-width: 50%;
  font-size: 22px;
  font-weight: bold;
}

/* Sağ Kısım: Butonlar */
.dashboard-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
  margin-left: auto;
}

/* Tarih Seçici */
.date-picker {
  position: relative;
  display: flex;
  align-items: center;
}

.date-picker input {
  width: 230px;
  padding: 10px 15px 10px 40px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: #fff;
  font-size: 14px;
  transition: border 0.3s ease, box-shadow 0.3s ease;
}

.date-picker input:focus {
  border-color: #007bff;
  box-shadow: 0 0 6px rgba(0, 123, 255, 0.3);
  outline: none;
}

.date-picker .date-icon {
  position: absolute;
  left: 12px;
  color: #6c757d;
  font-size: 18px;
  top: 50%;
  transform: translateY(-50%);
}

/* Butonlar */
.upload-btn,
.filter-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 6px;
  transition: background 0.3s ease, transform 0.2s ease-in-out;
}

.upload-btn i,
.filter-btn i {
  font-size: 16px;
}

.filter-btn {
  background: #007bff;
  color: white;
}

.filter-btn:hover {
  background: #0056b3;
  transform: translateY(-2px);
}

/* Responsive (Mobil) İçin */
@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    text-align: center;
  }

  .header-text {
    max-width: 100%;
    margin-bottom: 10px;
  }

  .dashboard-controls {
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }

  .date-picker input {

    width: 100%;
  }
}



</style>
