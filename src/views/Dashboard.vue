<template>
  <div class="dashboard-container">
    <!-- ÜST ALAN: Tarih ve Butonlar (sağa hizalanmış) -->
    <div class="dashboard-header card d-flex justify-content-end align-items-center">
      <div class="dashboard-controls d-flex align-items-center gap-2">
        <div class="date-picker">
          <i class="bi bi-calendar date-icon"></i>
          <input
            type="text"
            class="form-control date-range"
            :placeholder="$t('dashboard.dateRangePlaceholder')"
          />
        </div>
        <button class="upload-btn icon-btn"><i class="bi bi-upload"></i></button>
        <button class="filter-btn"><i class="bi bi-funnel me-1"></i>{{ $t('dashboard.filter') }}</button>
      </div>
    </div>

    <!-- KARTLAR: Gelir, Müşteri vs. -->
    <div class="row mt-3">
      <div
        v-for="(card, index) in statCards"
        :key="index"
        class="col-12 col-sm-6 col-md-3 mb-2"
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
    <div class="row mt-2">
      <div class="col-md-8 mb-2">
        <div class="card h-100">
          <div class="card-body">
            <h6 class="card-title mb-2">{{ $t('dashboard.salesChart') }}</h6>
            <canvas id="salesChart"></canvas>
          </div>
        </div>
      </div>

      <div class="col-md-4 mb-2">
        <div class="card h-100">
          <div class="card-body">
            <h6 class="card-title mb-2">{{ $t('dashboard.deviceChart') }}</h6>
            <canvas id="deviceChart"></canvas>
          </div>
        </div>
      </div>
    </div>

    <!-- SON ALAN: Sipariş ve İşlemler -->
    <div class="row mt-2">
      <div class="col-md-8 mb-2">
        <div class="card">
          <div class="card-body">
            <h6 class="card-title mb-2">{{ $t('dashboard.recentOrders') }}</h6>
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

      <div class="col-md-4 mb-2">
        <div class="card">
          <div class="card-body">
            <h6 class="card-title mb-2">{{ $t('dashboard.recentTransactions') }}</h6>
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
              borderRadius: 4,
              barPercentage: 0.5,
            },
          ],
        },
        options: {
          responsive: true,
          animation: {
            duration: 1200,
            easing: 'easeOutBounce',
          },
          hover: {
            mode: 'nearest',
            animationDuration: 500,
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              backgroundColor: dark ? '#1f1f2f' : '#ffffff',
              titleColor: dark ? '#ffffff' : '#000000',
              bodyColor: dark ? '#e2e8f0' : '#333333',
              padding: 8,
              borderColor: dark ? '#333348' : '#ddd',
              borderWidth: 1,
              titleFont: { size: 12 },
              bodyFont: { size: 11 },
            },
          },
          scales: {
            x: {
              ticks: {
                color: dark ? '#cbd5e1' : '#4b5563',
                font: { size: 10 },
              },
              grid: {
                color: dark ? '#2a2a3d' : '#e5e7eb',
              },
            },
            y: {
              ticks: {
                color: dark ? '#cbd5e1' : '#4b5563',
                font: { size: 10 },
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
              borderWidth: 1,
              borderColor: dark ? '#1f1f2e' : '#ffffff',
            },
          ],
        },
        options: {
          responsive: true,
          animation: {
            duration: 1200,
            easing: 'easeOutBounce',
          },
          hover: {
            mode: 'nearest',
            animationDuration: 500,
          },
          plugins: {
            legend: {
              labels: {
                color: dark ? '#e5e7eb' : '#374151',
                font: {
                  size: 11,
                  weight: '500',
                },
                padding: 15,
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
  --primary: #7c3aed;
  --primary-light: #a78bfa;
  --primary-dark: #5b21b6;
  --accent: #06b6d4;
  --accent-light: #67e8f9;
  --accent-dark: #0891b2;
  --success: #10b981;
  --warning: #fb923c;
  --danger: #f43f5e;
  --info: #0ea5e9;
  --neutral-50: #fafafa;
  --neutral-100: #f5f5f5;
  --neutral-200: #e5e5e5;
  --neutral-300: #d4d4d4;
  --neutral-400: #a3a3a3;
  --neutral-500: #737373;
  --neutral-600: #525252;
  --neutral-700: #404040;
  --neutral-800: #262626;
  --neutral-900: #171717;
  --dark-bg: #0f172a;
  --dark-card: #1e293b;
  --dark-card-alt: #334155;
  --light-bg: #f9fafb;
  --light-card: #ffffff;
  --text-light: #f8fafc;
  --text-dark: #0f172a;
  --card-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  --transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* === ANİMASYONLAR === */
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0px); }
}

@keyframes glowPulse {
  0% { box-shadow: 0 0 3px rgba(124, 58, 237, 0.2), 0 0 6px rgba(124, 58, 237, 0.1); }
  50% { box-shadow: 0 0 12px rgba(124, 58, 237, 0.4), 0 0 18px rgba(124, 58, 237, 0.2); }
  100% { box-shadow: 0 0 3px rgba(124, 58, 237, 0.2), 0 0 6px rgba(124, 58, 237, 0.1); }
}

@keyframes shine {
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
}

/* === DASHBOARD CONTAINER === */
.dashboard-container {
  padding: 24px;
  padding-bottom: 5p;
  background-color: var(--light-bg);
  position: relative;
  border-radius: 28px;
  overflow: hidden;
  font-size: 13px;
  margin-top: -20px;
}

.dashboard-container::before {
  content: '';
  position: absolute;
  width: 600px;
  height: 600px;
  top: -300px;
  right: -300px;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.05) 0%, rgba(124, 58, 237, 0) 70%);
  border-radius: 50%;
  z-index: 0;
}

.dashboard-container::after {
  content: '';
  position: absolute;
  width: 400px;
  height: 400px;
  bottom: -200px;
  left: -200px;
  background: radial-gradient(circle, rgba(6, 182, 212, 0.05) 0%, rgba(6, 182, 212, 0) 70%);
  border-radius: 50%;
  z-index: 0;
}

.dark-mode .dashboard-container {
  background-color: var(--dark-bg);
}

/* === HEADER KARTLARI === */
.dashboard-header {
  padding: 16px;
  border-radius: 24px;
  margin-bottom: 5px; /* Kartlar ile arasındaki boşluk */
  background: var(--light-card);
  position: relative;
  z-index: 1;
  box-shadow:
    0 15px 30px rgba(0, 0, 0, 0.03),
    inset 0 -1px 0 rgba(0, 0, 0, 0.05);
}

.dashboard-header::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100%;
  background: linear-gradient(135deg, transparent, rgba(124, 58, 237, 0.03));
  border-top-right-radius: 24px;
  border-bottom-right-radius: 24px;
  z-index: -1;
}

.dark-mode .dashboard-header {
  background: var(--dark-card);
  box-shadow:
    0 15px 30px rgba(0, 0, 0, 0.1),
    inset 0 -1px 0 rgba(255, 255, 255, 0.05);
}

/* === FİLTRE ALANI === */
/* Dış sarıcı: artık kullanılmıyor */
.filter-wrapper {
  display: none;
}

/* İç alan: Buton ve alanlar arası mesafe & hizalama */
.dashboard-controls {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  flex-wrap: wrap;
  width: fit-content;
  margin-left: auto;
}

/* Tarih seçici */
.date-picker {
  position: relative;
  display: flex;
  align-items: center;
  width: 220px;
}

.date-picker input {
  width: 100%;
  height: 40px;
  padding: 0 14px 0 40px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  border: none;
  background: var(--neutral-100);
  color: var(--neutral-700);
  transition: var(--transition);
  box-shadow:
    inset 0 1px 3px rgba(0, 0, 0, 0.04),
    0 2px 6px rgba(0, 0, 0, 0.03);
}

.date-picker .date-icon {
  position: absolute;
  left: 14px;
  font-size: 16px;
  color: var(--primary);
  transition: var(--transition);
  z-index: 2;
}

.date-picker::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: linear-gradient(to bottom right, var(--primary-light), var(--primary));
  opacity: 0.1;
  transition: var(--transition);
  z-index: 1;
}

.date-picker:hover .date-icon {
  transform: translateY(-2px);
  color: var(--primary-dark);
}

.date-picker:hover::after {
  opacity: 0.15;
  transform: scale(1.05);
}

.date-picker input:focus {
  outline: none;
  box-shadow:
    0 0 0 2px rgba(124, 58, 237, 0.15),
    inset 0 1px 3px rgba(0, 0, 0, 0.02);
  background: var(--neutral-50);
}

/* Upload Butonu */
.upload-btn {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: var(--neutral-100);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
  position: relative;
  overflow: hidden;
  box-shadow:
    0 3px 8px rgba(0, 0, 0, 0.05),
    inset 0 -1px 3px rgba(0, 0, 0, 0.03);
}

.upload-btn i {
  font-size: 16px;
  color: var(--primary);
  position: relative;
  z-index: 2;
  transition: var(--transition);
}

.upload-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  opacity: 0;
  transition: var(--transition);
  z-index: 1;
}

.upload-btn:hover {
  transform: translateY(-3px);
  box-shadow: none; /* Gölge kaldırıldı */
}

.upload-btn:hover i {
  color: white;
  transform: scale(1.1);
}

.upload-btn:hover::before {
  opacity: 1;
}

/* Filter butonu */
.filter-btn {
  height: 40px;
  padding: 0 20px;
  border-radius: 20px;
  background: var(--primary);
  color: #5b4ddb;
  border: none;
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 0.3px;
  transition: var(--transition);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  box-shadow:
    0 6px 12px rgba(124, 58, 237, 0.25),
    inset 0 -1px 3px rgba(0, 0, 0, 0.1);
}

.filter-btn i {
  font-size: 14px;
  transition: var(--transition);
}

/* Filtre animasyonu */
.filter-btn::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: repeating-linear-gradient(
    60deg,
    transparent,
    transparent 8px,
    rgba(255, 255, 255, 0.05) 8px,
    rgba(255, 255, 255, 0.05) 16px
  );
  animation: shine 5s infinite linear;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.filter-btn:hover {
  background: var(--primary-dark);
  transform: translateY(-3px);
  box-shadow: none; /* Gölge kaldırıldı */
}

.filter-btn:hover::before {
  opacity: 1;
}

.filter-btn:hover i {
  transform: rotate(180deg);
}

/* Dark Mode için filtre alanı düzenlemeleri */
.dark-mode .date-picker input {
  background: var(--dark-card-alt);
  color: var(--text-light);
  box-shadow:
    inset 0 1px 3px rgba(0, 0, 0, 0.1),
    0 3px 6px rgba(0, 0, 0, 0.1);
}

.dark-mode .date-picker input::placeholder {
  color: var(--neutral-400);
}

.dark-mode .date-picker input:focus {
  background: var(--dark-card);
  color: var(--text-light);
}

.dark-mode .upload-btn {
  background: var(--dark-card-alt);
  box-shadow:
    0 3px 8px rgba(0, 0, 0, 0.15),
    inset 0 -1px 3px rgba(0, 0, 0, 0.1);
}

/* === İSTATİSTİK KARTLARI === */
/* Kart üstündeki boşluğu kaldır */
.row.mt-3 {
  margin-top: 0 !important;
}

.card {
  border-radius: 24px;
  background: var(--light-card);
  border: none;
  box-shadow: var(--card-shadow);
  transition: var(--transition);
  position: relative;
  z-index: 1;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: none; /* Gölge kaldırıldı */
}

.dark-mode .card {
  background: var(--dark-card);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

/* Kart hizalama */
.row .col-md-3 {
  display: flex;
}

.stat-card {
  padding: 24px 20px;
  border-radius: 24px;
  text-align: center;
  position: relative;
  overflow: hidden;
  isolation: isolate;
  border: none;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  transition: var(--transition);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.stat-card .card-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.stat-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
  z-index: -1;
}

.stat-card::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.03), transparent);
  z-index: -2;
}

/* Her kart için özel renk */
.stat-card:nth-child(1) {
  background: linear-gradient(135deg, #000000, #5b4ddb);
  color: white;
}

.stat-card:nth-child(2) {
  background: linear-gradient(135deg, #06b6d4, #0ea5e9);
  color: white;
}

.stat-card:nth-child(3) {
  background: linear-gradient(135deg, #f59e0b, #fb923c);
  color: white;
}

.stat-card:nth-child(4) {
  background: linear-gradient(135deg, #ec4899, #d946ef);
  color: white;
}

.stat-card:hover {
  transform: translateY(-8px);
  box-shadow: none; /* Gölge kaldırıldı */
}

/* Kart içeriği */
.stat-card .card-title {
  font-size: 14px;
  font-weight: 500;
  opacity: 0.9;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
}

.stat-card .card-value {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 14px;
  position: relative;
  display: inline-block;
}

.stat-card .card-value::after {
  content: "";
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 40%;
  height: 3px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 1.5px;
}

.stat-card .card-change {
  font-size: 13px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  display: inline-block;
}

/* === TABLOLAR === */
.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
  margin-top: 8px;
}

.table thead th {
  background: transparent;
  color: var(--neutral-500);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 12px 16px;
}

.table tbody tr {
  filter: drop-shadow(0 3px 8px rgba(0, 0, 0, 0.05));
  transition: var(--transition);
}

.table th,
.table td {
  padding: 14px 16px;
  background: var(--light-card);
  border: none;
  font-size: 12px;
}

.table tbody tr td {
  transition: var(--transition);
}

.table tbody tr td:first-child {
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
}

.table tbody tr td:last-child {
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
}

.table tbody tr:hover td {
  background: var(--neutral-100);
  transform: translateY(-2px);
  /* Gölge olmadan */
}

.dark-mode .table th,
.dark-mode .table td {
  background: var(--dark-card);
  color: var(--text-light);
}

.dark-mode .table thead th {
  color: var(--neutral-400);
}

.dark-mode .table tbody tr:hover td {
  background: var(--dark-card-alt);
}

/* === BADGE === */
.badge {
  font-size: 11px;
  padding: 5px 10px;
  border-radius: 12px;
  font-weight: 600;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
  letter-spacing: 0.3px;
}

.badge.bg-warning {
  background: linear-gradient(to right, #f59e0b, #fb923c) !important;
  color: white;
}

.badge.bg-success {
  background: linear-gradient(to right, #10b981, #34d399) !important;
}

.badge.bg-info {
  background: linear-gradient(to right, #0ea5e9, #38bdf8) !important;
  color: white;
}

/* === CHART ALANI === */
canvas {
  max-height: 280px;
  border-radius: 20px;
  padding: 12px;
  background: transparent;
  transition: var(--transition);
}

/* Son İşlemler Listesi */
.list-group {
  border-radius: 20px;
  overflow: hidden;
}

.list-group-item {
  background: transparent;
  border-left: none;
  border-right: none;
  border-top: none;
  border-bottom: 1px solid var(--neutral-200);
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: var(--transition);
  font-size: 12px;
}

.list-group-item:last-child {
  border-bottom: none;
}

.list-group-item:hover {
  background: var(--neutral-100);
  transform: translateX(3px);
  box-shadow: none; /* Gölge yok */
}

.dark-mode .list-group-item {
  border-color: var(--dark-card-alt);
  color: var(--text-light);
}

.dark-mode .list-group-item:hover {
  background: var(--dark-card-alt);
}

/* === RESPONSIVE DÜZENLEMELER === */

/* Masaüstü (≥992px) için */
@media (min-width: 992px) {
  .dashboard-container {
    padding: 24px;
    border-radius: 28px;
  }

  .stat-card .card-value {
    font-size: 28px;
  }

  .dashboard-header,
  .card {
    border-radius: 24px;
  }
}

/* Tablet (768px - 991px) için */
@media (max-width: 991px) and (min-width: 768px) {
  .dashboard-container {
    padding: 24px;
    border-radius: 30px;
  }

  .dashboard-header {
    padding: 24px;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16px;
    border-radius: 30px;
    margin-bottom: 20px;
  }

  .dashboard-controls {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16px;
    width: 100%;
    justify-content: flex-end; /* Sağa hizalama için eklendi */
  }

  .date-picker,
  .upload-btn,
  .filter-btn {
    flex: 1 1 calc(50% - 8px);
    min-width: 200px;
  }

  .card,
  .stat-card {
    border-radius: 30px;
  }

  .stat-card .card-value {
    font-size: 30px;
  }

  .row.mt-3 {
    margin-top: 0 !important;
  }
}

/* Mobil (≤767px) için */
@media (max-width: 767px) {
  .dashboard-container {
    padding: 16px;
    border-radius: 20px;
  }

  .dashboard-header {
    padding: 16px;
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
    border-radius: 20px;
    margin-bottom: 16px;
  }

  .dashboard-controls {
    flex-direction: column;
    width: 100%;
    gap: 12px;
    align-items: flex-end; /* Mobil görünümde sağa hizalama için eklendi */
  }

  .date-picker {
    align-self: flex-end; /* Tarih seçici için özel hizalama */
    width: 100%; /* Genişliğin korunması için */
  }

  .date-picker input,
  .upload-btn,
  .filter-btn {
    width: 100%;
  }

  .card,
  .stat-card {
    border-radius: 20px;
  }

  .stat-card {
    padding: 20px 16px;
  }

  .stat-card .card-title {
    font-size: 10px;
    margin-bottom: 10px;
  }

  .stat-card .card-value {
    font-size: 16px;
    margin-bottom: 14px;
  }

  .stat-card .card-change,
  .badge {
    font-size: 7px;
    padding: 6px 10px;
  }

  .table-responsive {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .table th,
  .table td {
    padding: 12px 10px;
    font-size: 12px;
  }

  .list-group-item {
    padding: 12px 14px;
  }

  .row.mt-3 {
    margin-top: 0 !important;
  }
}
</style>