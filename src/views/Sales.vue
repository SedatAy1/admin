<template>
  <div class="sales container">
    <h2 class="mb-4">Sales Overview</h2>

    <!-- Satış İstatistikleri -->
    <div class="row">
      <div class="col-md-4" v-for="(card, index) in salesStats" :key="index">
        <div class="card p-3 shadow-sm">
          <h5>{{ card.title }}</h5>
          <p class="fs-4 fw-bold">{{ card.value }}</p>
        </div>
      </div>
    </div>

    <!-- Satış Grafiği -->
    <div class="card p-3 shadow-sm mt-4">
      <h5>Sales Performance</h5>
      <canvas ref="salesChart"></canvas>
    </div>

    <!-- Sipariş Listesi -->
    <div class="card p-3 shadow-sm mt-4">
      <h5>Recent Orders</h5>
      <table class="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orders" :key="index">
            <td>{{ order.product }}</td>
            <td>{{ order.price }}</td>
            <td><span class="badge" :class="getBadgeClass(order.status)">{{ order.status }}</span></td>
            <td>{{ order.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "Sales",
  data() {
    return {
      salesStats: [
        { title: "Daily Sales", value: "$5,320" },
        { title: "Weekly Sales", value: "$37,100" },
        { title: "Monthly Sales", value: "$158,900" }
      ],
      orders: [
        { product: "Smart Watch", price: "$120", status: "Completed", date: "2025-02-26" },
        { product: "Gaming Mouse", price: "$75", status: "Pending", date: "2025-02-25" },
        { product: "Laptop Stand", price: "$45", status: "Shipped", date: "2025-02-24" }
      ]
    };
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.salesChart.getContext("2d");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "Sales",
              data: [5000, 8000, 12000, 15000, 10000, 18000],
              borderColor: "blue",
              backgroundColor: "rgba(0, 0, 255, 0.1)",
              fill: true
            }
          ]
        }
      });
    },
    getBadgeClass(status) {
      switch (status) {
        case "Completed":
          return "bg-success";
        case "Pending":
          return "bg-warning";
        case "Shipped":
          return "bg-info";
        default:
          return "bg-secondary";
      }
    }
  }
};
</script>

<style scoped>
.sales {
  padding: 20px;
}
.card {
  border-radius: 10px;
}
.badge {
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
}
</style>
