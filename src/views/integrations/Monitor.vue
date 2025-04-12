<template>
  <MarketLayout>
    <div class="container my-5">
      <div class="bg-white shadow rounded p-4">
        <h2 class="text-primary mb-4">{{ $t("monitor.title") }}</h2>
        <p class="text-secondary">{{ $t("monitor.description") }}</p>

        <div class="row mt-4">
          <div v-for="platform in platforms" :key="platform.name" class="col-md-3 mb-3">
            <div class="card p-3 text-center">
              <h5 class="text-dark">{{ platform.name }}</h5>
              <p class="text-success fw-bold">✅ {{ $t("monitor.updated") }}: {{ platform.updated }}</p>
              <p class="text-danger fw-bold">🔄 {{ $t("monitor.pending") }}: {{ platform.pending }}</p>
            </div>
          </div>
        </div>

        <div class="mt-4 d-flex gap-3">
          <button @click="activeTab = 'errorReports'" :class="tabClass('errorReports')">{{ $t("monitor.tabs.errors") }}</button>
          <button @click="activeTab = 'updatedProducts'" :class="tabClass('updatedProducts')">{{ $t("monitor.tabs.updated") }}</button>
          <button @click="activeTab = 'pendingProducts'" :class="tabClass('pendingProducts')">{{ $t("monitor.tabs.pending") }}</button>
        </div>

        <div class="mt-4 p-4 bg-light border rounded">
          <div v-if="activeTab === 'errorReports'">
            <h3 class="text-danger">{{ $t("monitor.errors.title") }}</h3>
            <p>{{ $t("monitor.errors.description") }}</p>
          </div>
          <div v-if="activeTab === 'updatedProducts'">
            <h3 class="text-primary">{{ $t("monitor.updated.title") }}</h3>
            <p>{{ $t("monitor.updated.description") }}</p>
          </div>
          <div v-if="activeTab === 'pendingProducts'">
            <h3 class="text-warning">{{ $t("monitor.pending.title") }}</h3>
            <p>{{ $t("monitor.pending.description") }}</p>
          </div>
        </div>
      </div>
    </div>
  </MarketLayout>
</template>

<script>
import MarketLayout from "@/views/integrations/MarketLayout.vue";

export default {
  components: { MarketLayout },
  data() {
    return {
      activeTab: 'errorReports',
      platforms: [
        { name: "N11", updated: 0, pending: 0 },
        { name: "Hepsiburada", updated: 3, pending: 0 },
        { name: "ePttAVM", updated: 0, pending: 0 },
        { name: "Trendyol", updated: 0, pending: 0 },
        { name: "Çiçeksepeti", updated: 0, pending: 0 },
        { name: "Modanisa", updated: 0, pending: 0 },
        { name: "Pazarama", updated: 0, pending: 0 },
        { name: "Goturc", updated: 0, pending: 0 },
      ]
    };
  },
  methods: {
    tabClass(tab) {
      return this.activeTab === tab ? 'btn btn-primary' : 'btn btn-secondary';
    }
  }
};
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');

/* Body & Container */
body {
  font-family: Arial, sans-serif;
  background: #f8f9fa;
  margin: 0;
  padding: 0;
  transition: background 0.3s ease-in-out;
}
html.dark body {
  background: #181818;
  color: #f1f1f1;
}

.container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease;
}
html.dark .container {
  background: #232323;
  color: #f1f1f1;
}

/* Heading */
h2 {
  color: #333;
}
html.dark h2 {
  color: #f1f1f1;
}

/* Navbar */
.navbar {
  background-color: #007bff;
  padding: 15px;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  transition: background-color 0.3s;
}
html.dark .navbar {
  background-color: #0a84ff;
}

/* Cards */
.card {
  border: none;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, background 0.3s;
  background: white;
}
.card:hover {
  transform: scale(1.03);
}
html.dark .card {
  background: #2a2a2a;
  color: #f1f1f1;
}

/* Buttons */
.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  padding: 12px 16px;
  font-weight: bold;
  border-radius: 6px;
}
.btn-primary:hover {
  background-color: #0056b3;
}
.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
  padding: 10px 15px;
  font-weight: bold;
  border-radius: 6px;
}
.btn-secondary:hover {
  background-color: #5a6268;
}

/* Table */
.table {
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
  background: white;
}
html.dark .table {
  background: #2c2c2c;
  color: #f1f1f1;
}
.table th, .table td {
  padding: 14px;
  border-top: 1px solid #dee2e6;
  text-align: left;
}
html.dark .table th, html.dark .table td {
  border-color: #444;
}

/* Alerts */
.alert-info {
  background-color: #d1ecf1;
  color: #0c5460;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}
html.dark .alert-info {
  background-color: #0c4a60;
  color: #d1ecf1;
}

/* Sidebar */
.sidebar {
  width: 260px;
  background: #343a40;
  padding: 20px;
  border-radius: 12px;
  color: #f9fafb;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease;
}
html.dark .sidebar {
  background: #1f1f1f;
  color: #f1f1f1;
}
.sidebar h3 {
  margin-bottom: 16px;
  font-size: 20px;
  color: #ffffff;
}
.sidebar ul {
  list-style: none;
  padding: 0;
}
.sidebar li {
  padding: 12px 0;
  cursor: pointer;
  color: #d1d5db;
  transition: color 0.3s;
}
.sidebar li:hover {
  color: #ffffff;
}
.sidebar .active {
  background: #007bff;
  border-radius: 8px;
  padding: 10px;
  font-weight: bold;
  color: white;
}
html.dark .sidebar .active {
  background: #0a84ff;
}

/* Content Animation */
.content {
  flex: 1;
  animation: fadeIn 0.5s ease-in-out;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Responsive tweaks */
@media (max-width: 768px) {
  .container {
    padding: 15px;
  }

  .sidebar {
    width: 100%;
    margin-bottom: 20px;
    flex-direction: row;
    overflow-x: auto;
  }

  .sidebar ul {
    display: flex;
    gap: 16px;
    flex-wrap: nowrap;
  }

  .navbar {
    font-size: 16px;
    text-align: center;
  }

  h2 {
    font-size: 20px;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>