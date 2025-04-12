<template>
  <div class="analytics container">
    <h2 class="mb-4">{{ $t('analytics.title') }}</h2>

    <!-- İstatistik Kartları -->
    <div class="row">
      <div class="col-md-4 col-sm-6 mb-3" v-for="(card, index) in analyticsStats" :key="index">
        <div class="card p-3 shadow-sm h-100">
          <h5>{{ $t(`analytics.stats.${card.key}`) }}</h5>
          <p class="fs-4 fw-bold">{{ card.value }}</p>
        </div>
      </div>
    </div>

    <!-- Analitik Grafikler -->
    <div class="card p-3 shadow-sm mt-4">
      <h5>{{ $t('analytics.chart_title') }}</h5>
      <canvas ref="analyticsChart"></canvas>
    </div>

    <!-- Trafik Kaynakları Tablosu -->
    <div class="card p-3 shadow-sm mt-4">
      <h5>{{ $t('analytics.traffic_title') }}</h5>
      <table class="table">
        <thead>
          <tr>
            <th>{{ $t('analytics.traffic.source') }}</th>
            <th>{{ $t('analytics.traffic.visitors') }}</th>
            <th>{{ $t('analytics.traffic.conversion') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(source, index) in trafficSources" :key="index">
            <td>{{ $t(`analytics.traffic_sources.${source.key}`) }}</td>
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
      { key: "total_visitors", value: "12,391" },
      { key: "bounce_rate", value: "45.2%" },
      { key: "avg_session", value: "3m 12s" }
    ]);

    const trafficSources = ref([
      { key: "organic", visitors: "5,120", conversion: "3.8%" },
      { key: "social", visitors: "3,210", conversion: "2.5%" },
      { key: "direct", visitors: "2,045", conversion: "5.1%" }
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
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                labels: {
                  color: getComputedStyle(document.body).color
                }
              }
            },
            scales: {
              x: {
                ticks: {
                  color: getComputedStyle(document.body).color
                }
              },
              y: {
                ticks: {
                  color: getComputedStyle(document.body).color
                }
              }
            }
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
  padding: 24px;
  background-color: var(--bg-light, #f9f9f9);
  color: var(--text-color, #333);
  transition: all 0.3s ease;
}

/* Başlık */
.analytics h2 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
}

/* Kartlar */
.card {
  border-radius: 12px;
  background: #ffffff;
  transition: box-shadow 0.3s ease, transform 0.2s ease;
  border: none;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.card h5 {
  font-size: 16px;
  color: #555;
  margin-bottom: 8px;
}

.card .fs-4 {
  color: #111;
}

/* Grafik Alanı */
canvas {
  max-width: 100%;
}

/* Tablo */
.table {
  margin-top: 15px;
  font-size: 14px;
}

.table th {
  background-color: #f0f0f0;
  color: #555;
  font-weight: 600;
}

.table td {
  background-color: #fff;
  color: #333;
  vertical-align: middle;
}

.table tr:hover td {
  background-color: #f9f9f9;
}

/* Responsive */
@media (max-width: 768px) {
  .analytics {
    padding: 16px;
  }

  .card .fs-4 {
    font-size: 16px;
  }

  .card h5 {
    font-size: 14px;
  }

  table {
    font-size: 13px;
  }
}

/* Dark Mode */
:deep(html.dark) .analytics {
  background-color: #1e1e2f;
  color: #f0f0f0;
}

:deep(html.dark) .card {
  background-color: #2c2c3e;
}

:deep(html.dark) .card h5,
:deep(html.dark) .table th,
:deep(html.dark) .table td {
  color: #ddd;
}

:deep(html.dark) .table th {
  background-color: #3a3a4f;
}

:deep(html.dark) .table td {
  background-color: #2c2c3e;
}

:deep(html.dark) .table tr:hover td {
  background-color: #3c3c50;
}
</style>