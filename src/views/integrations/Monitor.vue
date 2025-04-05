<template>
  <MarketLayout>
    <div class="container my-5">
      <div class="bg-white shadow rounded p-4">
        <h2 class="text-primary mb-4">Pazaryeri Monitörü</h2>
        <p class="text-secondary">Ürünlerinizin pazaryerlerindeki güncelleme durumlarını ve hata raporlarını inceleyebilirsiniz.</p>

        <div class="row mt-4">
          <div v-for="platform in platforms" :key="platform.name" class="col-md-3 mb-3">
            <div class="card p-3 text-center">
              <h5 class="text-dark">{{ platform.name }}</h5>
              <p class="text-success fw-bold">✅ Güncel: {{ platform.updated }}</p>
              <p class="text-danger fw-bold">🔄 Güncellenecek: {{ platform.pending }}</p>
            </div>
          </div>
        </div>

        <div class="mt-4 d-flex gap-3">
          <button @click="activeTab = 'errorReports'" :class="tabClass('errorReports')">Hata Raporları</button>
          <button @click="activeTab = 'updatedProducts'" :class="tabClass('updatedProducts')">Güncel Ürünler</button>
          <button @click="activeTab = 'pendingProducts'" :class="tabClass('pendingProducts')">Güncellenecek Ürünler</button>
        </div>

        <div class="mt-4 p-4 bg-light border rounded">
          <div v-if="activeTab === 'errorReports'">
            <h3 class="text-danger">Hata Raporları</h3>
            <p>Ürünleriniz eklenirken, güncellenirken veya silinirken alınan hataları burada görüntüleyebilirsiniz.</p>
          </div>
          <div v-if="activeTab === 'updatedProducts'">
            <h3 class="text-primary">Güncel Ürünler</h3>
            <p>Güncellenen ürünlerinizi ve tarihlerini görüntüleyebilirsiniz.</p>
          </div>
          <div v-if="activeTab === 'pendingProducts'">
            <h3 class="text-warning">Güncellenecek Ürünler</h3>
            <p>Güncellenmek üzere sıraya alınan ürünlerinizi ve tarihlerini görüntüleyebilirsiniz.</p>
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
/* Bootstrap Entegrasyonu için */
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');

body {
  font-family: Arial, sans-serif;
  background: #f8f9fa;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #333;
}

.navbar {
  background-color: #007bff;
  padding: 15px;
  color: white;
  font-weight: bold;
  border-radius: 8px;
}

.card {
  border: none;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.card:hover {
  transform: scale(1.03);
}

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

.table {
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
}

.table th, .table td {
  padding: 14px;
  border-top: 1px solid #dee2e6;
  text-align: left;
}

.alert-info {
  background-color: #d1ecf1;
  color: #0c5460;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.sidebar {
  width: 260px;
  background: #343a40;
  padding: 20px;
  border-radius: 12px;
  color: #f9fafb;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
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
}

.content {
  flex: 1;
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

</style>
