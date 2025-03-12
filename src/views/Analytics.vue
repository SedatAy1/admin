<template>
  <div class="analytics container">
    <h2 class="mb-4">Analytics Overview</h2>

    <!-- İstatistik Kartları -->
    <div class="row">
      <div class="col-md-4" v-for="(card, index) in analyticsStats" :key="index">
        <div class="card p-3 shadow-sm">
          <h5>{{ card.title }}</h5>
          <p class="fs-4 fw-bold">{{ card.value }}</p>
        </div>
      </div>
    </div>

    <!-- Analitik Grafikler -->
    <div class="card p-3 shadow-sm mt-4">
      <h5>Visitors & Sales</h5>
      <canvas ref="analyticsChart"></canvas>
    </div>

    <!-- Trafik Kaynakları Tablosu -->
    <div class="card p-3 shadow-sm mt-4">
      <h5>Traffic Sources</h5>
      <table class="table">
        <thead>
          <tr>
            <th>Source</th>
            <th>Visitors</th>
            <th>Conversion Rate</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(source, index) in trafficSources" :key="index">
            <td>{{ source.name }}</td>
            <td>{{ source.visitors }}</td>
            <td>{{ source.conversion }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Chart from "chart.js/auto";

export default defineComponent({
  name: "Analytics",
  setup() {
    const analyticsChart = ref<HTMLCanvasElement | null>(null);

    const analyticsStats = ref([
      { title: "Total Visitors", value: "12,391" },
      { title: "Bounce Rate", value: "45.2%" },
      { title: "Average Session", value: "3m 12s" }
    ]);

    const trafficSources = ref([
      { name: "Organic Search", visitors: "5,120", conversion: "3.8%" },
      { name: "Social Media", visitors: "3,210", conversion: "2.5%" },
      { name: "Direct", visitors: "2,045", conversion: "5.1%" }
    ]);

    const renderChart = () => {
      if (analyticsChart.value) {
        new Chart(analyticsChart.value, {
          type: "line",
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                label: "Visitors",
                data: [5000, 7000, 8500, 9000, 11000, 12391],
                borderColor: "green",
                backgroundColor: "rgba(0, 255, 0, 0.1)",
                fill: true
              }
            ]
          }
        });
      }
    };

    onMounted(renderChart);

    return { analyticsChart, analyticsStats, trafficSources };
  }
});
</script>

<style scoped>
.analytics {
  padding: 20px;
}
.card {
  border-radius: 10px;
}
.table th, .table td {
  text-align: left;
}
</style>
