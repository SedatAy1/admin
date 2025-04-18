<template>
  <div class="dashboard-container">
    <!-- ÜST ALAN: Tarih ve Butonlar -->
    <div class="dashboard-header card d-flex justify-content-between align-items-center">
      <div class="dashboard-controls d-flex align-items-center gap-3">
        <div class="date-picker">
          <i class="bi bi-calendar date-icon"></i>
          <input
            type="text"
            class="form-control date-range"
            :placeholder="$t('dashboard.dateRangePlaceholder')"
          />
        </div>
        <button class="upload-btn icon-btn"><i class="bi bi-upload"></i></button>
        <button class="filter-btn"><i class="bi bi-funnel me-2"></i>{{ $t('dashboard.filter') }}</button>
      </div>
    </div>

    <!-- KARTLAR: Gelir, Müşteri vs. -->
    <div class="row mt-4">
      <div
        v-for="(card, index) in statCards"
        :key="index"
        class="col-12 col-sm-6 col-md-3 mb-3"
      >
        <div class="card stat-card">
          <div class="card-body text-center">
            <h6 class="card-title">{{ $t('dashboard.' + card.title) }}</h6>
            <p class="card-value">{{ card.value }}</p>
            <p class="card-change" :class="card.change > 0 ? 'text-success' : 'text-danger'">
              {{ card.change > 0 ? '+' : '' }}{{ card.change }}% {{ $t('dashboard.thisWeek') }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- GRAFİKLER -->
    <div class="row mt-3">
      <div class="col-md-8 mb-3">
        <div class="card h-100">
          <div class="card-body">
            <h6 class="card-title mb-3">{{ $t('dashboard.salesChart') }}</h6>
            <canvas id="salesChart"></canvas>
          </div>
        </div>
      </div>

      <div class="col-md-4 mb-3">
        <div class="card h-100">
          <div class="card-body">
            <h6 class="card-title mb-3">{{ $t('dashboard.deviceChart') }}</h6>
            <canvas id="deviceChart"></canvas>
          </div>
        </div>
      </div>
    </div>

    <!-- SON ALAN: Sipariş ve İşlemler -->
    <div class="row mt-3">
      <div class="col-md-8 mb-3">
        <div class="card">
          <div class="card-body">
            <h6 class="card-title mb-3">{{ $t('dashboard.recentOrders') }}</h6>
            <table class="table table-borderless align-middle">
              <thead>
                <tr>
                  <th>{{ $t('dashboard.table.product') }}</th>
                  <th>{{ $t('dashboard.table.category') }}</th>
                  <th>{{ $t('dashboard.table.status') }}</th>
                  <th>{{ $t('dashboard.table.customer') }}</th>
                  <th>{{ $t('dashboard.table.qty') }}</th>
                  <th>{{ $t('dashboard.table.date') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(order, index) in recentOrders" :key="index">
                  <td>{{ order.product }}</td>
                  <td>{{ order.category }}</td>
                  <td>
                    <span :class="`badge ${order.statusClass}`">{{ order.status }}</span>
                  </td>
                  <td>{{ order.customer }}</td>
                  <td>{{ order.qty }}</td>
                  <td>{{ order.date }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="col-md-4 mb-3">
        <div class="card">
          <div class="card-body">
            <h6 class="card-title mb-3">{{ $t('dashboard.recentTransactions') }}</h6>
            <ul class="list-group list-group-flush">
              <li
                v-for="(transaction, index) in recentTransactions"
                :key="index"
                class="list-group-item d-flex justify-content-between"
              >
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
import Chart from 'chart.js/auto'

export default {
  name: 'Dashboard',
  data() {
    return {
      statCards: [
       { title: 'totalRevenue', value: '$315,244', change: 12, icon: 'bi-currency-dollar' },
      { title: 'totalCustomers', value: '153,432', change: -5, icon: 'bi-people' },
      { title: 'totalTransactions', value: '75,275', change: 11, icon: 'bi-credit-card' },
      { title: 'totalProducts', value: '626,532', change: 6.5, icon: 'bi-box-seam' },
    ],
      recentOrders: [
        {
          product: 'Elegance Wall Clock',
          category: 'Home Decor',
          status: 'Pending',
          statusClass: 'bg-warning',
          customer: 'John Smith',
          qty: 8,
          date: '01 Dec 2024',
        },
        {
          product: 'Stridex Pro',
          category: 'Footwear',
          status: 'Completed',
          statusClass: 'bg-success',
          customer: 'Alice Brown',
          qty: 15,
          date: '29 Nov 2024',
        },
        {
          product: 'EduCarry 360',
          category: 'School Supplies',
          status: 'Shipped',
          statusClass: 'bg-info',
          customer: 'Leo Phillip',
          qty: 10,
          date: '03 Dec 2024',
        },
      ],
      recentTransactions: [
        { paymentMode: 'Paypal ****2783', amount: '$1,234' },
        { paymentMode: 'Digital Wallet', amount: '$623' },
        { paymentMode: 'Master Card ****7893', amount: '$1,312' },
      ],
    }
  },
  mounted() {
    this.renderCharts()
  },
  methods: {
    isDarkMode() {
      return document.documentElement.classList.contains('dark-mode')
    },
    renderCharts() {
      const dark = this.isDarkMode()

      // SALES CHART
      new Chart(document.getElementById('salesChart'), {
        type: 'bar',
        data: {
          labels: [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
          ],
          datasets: [
            {
              label: 'Sales',
              data: [50, 90, 120, 80, 150, 200, 170, 180, 210, 190, 220, 240],
              backgroundColor: dark ? '#f97316aa' : '#6366f1aa',
              borderRadius: 6,
              barPercentage: 0.6,
            },
          ],
        },
        options: {
          responsive: true,
          animation: {
            duration: 1500,
            easing: 'easeOutBounce',
          },
          hover: {
            mode: 'nearest',
            animationDuration: 600,
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              backgroundColor: dark ? '#1f1f2f' : '#ffffff',
              titleColor: dark ? '#ffffff' : '#000000',
              bodyColor: dark ? '#e2e8f0' : '#333333',
              padding: 10,
              borderColor: dark ? '#333348' : '#ddd',
              borderWidth: 1,
            },
          },
          scales: {
            x: {
              ticks: {
                color: dark ? '#cbd5e1' : '#4b5563',
                font: { size: 12 },
              },
              grid: {
                color: dark ? '#2a2a3d' : '#e5e7eb',
              },
            },
            y: {
              ticks: {
                color: dark ? '#cbd5e1' : '#4b5563',
                font: { size: 12 },
              },
              grid: {
                color: dark ? '#2a2a3d' : '#e5e7eb',
              },
            },
          },
        },
      })

      // DEVICE CHART
      new Chart(document.getElementById('deviceChart'), {
        type: 'doughnut',
        data: {
          labels: ['Mobile', 'Desktop', 'Laptop', 'Tablet'],
          datasets: [
            {
              data: [4289, 3655, 2964, 1573],
              backgroundColor: ['#f97316', '#3b82f6', '#10b981', '#eab308'],
              borderWidth: 2,
              borderColor: dark ? '#1f1f2e' : '#ffffff',
            },
          ],
        },
        options: {
          responsive: true,
          animation: {
            duration: 1500,
            easing: 'easeOutBounce',
          },
          hover: {
            mode: 'nearest',
            animationDuration: 600,
          },
          plugins: {
            legend: {
              labels: {
                color: dark ? '#e5e7eb' : '#374151',
                font: {
                  size: 13,
                  weight: '500',
                },
                padding: 20,
              },
              position: 'bottom',
            },
          },
        },
      })
    },
  },
}
</script>


<style scoped>
:root {
  --primary: #6c5ce7;
  --accent: #00cec9;
  --gray: #dfe6e9;
  --dark-bg: #121212;
  --dark-card: #1e1e2e;
  --dark-card-alt: #2c2c3d;
  --light-bg: #f4f6fa;
  --light-card: #ffffff;
  --text-light: #f1f1f1;
  --text-dark: #2d3436;
  --card-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  --radius: 24px;
  --transition: all 0.3s ease;
}

/* === ANİMASYON === */
@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dashboard-container {
  padding: 24px;
  background-color: var(--light-bg);
  border-radius: 30px;
}
.dark-mode .dashboard-container {
  background-color: var(--dark-bg);
}

/* === GENEL KART === */
.card {
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: var(--card-shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: fadeSlideUp 0.6s ease both;
}
.card:hover {
  transform: translateY(-5px) scale(1.015);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.1);
}
.dark-mode .card {
  background: rgba(31, 31, 46, 0.85);
  color: var(--text-light);
}

/* === STAT KART === */
.stat-card {
  text-align: center;
  padding: 28px 20px;
  border-radius: 30px;
  background: linear-gradient(135deg, #1e1e2f, #292942);
  color: var(--text-light);
  position: relative;
  isolation: isolate;
  animation: fadeSlideUp 0.8s ease forwards;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
}
.stat-card:hover {
  transform: translateY(-6px) scale(1.03);
  box-shadow: 0 16px 45px rgba(0, 0, 0, 0.25);
}
.dark-mode .stat-card {
  background: linear-gradient(145deg, #2a2a3d, #1f1f2e);
}

/* === TİTLE & VALUE === */
.stat-card .card-title {
  font-size: 14px;
  color: #cbd5e1;
  margin-bottom: 8px;
}
.stat-card .card-value {
  font-size: 28px;
  font-weight: bold;
  color: #ffffff;
}
.stat-card .card-change {
  font-size: 13px;
  font-weight: 500;
}
.stat-card .text-success {
  color: #4ade80 !important;
}
.stat-card .text-danger {
  color: #f87171 !important;
}

/* === TABLOLAR === */
.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 12px;
}
.table th,
.table td {
  padding: 14px 16px;
  text-align: left;
  background: var(--light-card);
  border-radius: 0;
  transition: background 0.3s ease, transform 0.3s ease;
}
.table thead {
  background: transparent;
  color: #6b7280;
  font-size: 13px;
  text-transform: uppercase;
}
.table tbody tr {
  transition: all 0.3s ease;
}
.table tbody tr:hover td {
  transform: scale(1.01);
  background: #f1f1f1;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
}
.dark-mode .table td,
.dark-mode .table th {
  background: var(--dark-card-alt);
  color: var(--text-light);
}
.dark-mode .table tbody tr:hover td {
  background: #303042;
}

/* === BADGE === */
.badge {
  font-size: 12px;
  padding: 6px 12px;
  border-radius: 999px;
  font-weight: 600;
}
.dark-mode .badge.bg-warning {
  background-color: #ffc107;
  color: #000;
}
.dark-mode .badge.bg-success {
  background-color: #28a745;
}
.dark-mode .badge.bg-info {
  background-color: #17a2b8;
}

/* === BUTONLAR === */
.upload-btn,
.filter-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 18px;
  border-radius: 30px;
  font-weight: 600;
  border: none;
  transition: var(--transition);
}
.upload-btn {
  background: #ececec;
  color: #333;
}
.upload-btn:hover {
  background: #dcdcdc;
}
.filter-btn {
  background: #5b4ddb;
  color: white;
}
.filter-btn:hover {
  background: var(--primary);
  color: #5b4ddb;
  border: 2px solid #5b4ddb;
}

.dark-mode .upload-btn {
  background: #3a3a4f;
  color: #ddd;
}
.dark-mode .upload-btn:hover {
  background: #4a4a63;
}

/* === TARİH SEÇİCİ === */
.date-picker {
  position: relative;
  display: flex;
  align-items: center;
}
.date-picker input {
  padding: 12px 16px 12px 42px;
  border-radius: 12px;
  border: 1px solid #ddd;
  background: #fff;
  width: 240px;
  font-size: 14px;
}
.date-picker .date-icon {
  position: absolute;
  left: 14px;
  font-size: 18px;
  color: #888;
}
.dark-mode .date-picker input {
  background: #3a3a4f;
  color: #f5f5f5;
  border-color: #5b4ddb;
}

.dark-mode .date-picker input::placeholder {
  color: #cbd5e1 !important;
}
.dark-mode .date-picker .date-icon {
  color: #aaa;
}

/* === CHART === */
canvas {
  max-height: 300px;
  border-radius: 16px;
  background: transparent;
  animation: fadeSlideUp 0.8s ease;
}

/* === RESPONSIVE === */
@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    padding: 16px;
  }

  .dashboard-controls {
    flex-direction: column;
    width: 100%;
    gap: 12px;
  }

  .date-picker {
    width: 100%;
  }

  .date-picker input {
    width: 100%;
    font-size: 14px;
  }

  .upload-btn,
  .filter-btn {
    width: 100%;
    justify-content: center;
  }

  .stat-card {
    padding: 20px;
    text-align: center;
  }

  .card .card-body {
    padding: 16px;
  }

  .table th,
  .table td {
    font-size: 13px;
    padding: 10px;
  }

  .table {
    font-size: 13px;
  }
}

</style>
