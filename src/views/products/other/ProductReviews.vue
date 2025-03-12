<template>
  <div class="reviews-container">
    <!-- Arama Çubuğu -->
    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="Ara..." />
    </div>

    <!-- Yorum Tablosu -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Yorum No</th>
            <th>Kullanıcı</th>
            <th>Ürün Adı</th>
            <th>Puan</th>
            <th>Durum</th>
            <th>Tarih</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="review in filteredReviews" :key="review.id">
            <td><input type="checkbox" /></td>
            <td>{{ review.id }}</td>
            <td>{{ review.user }}</td>
            <td>{{ review.product }}</td>
            <td>{{ review.rating }}</td>
            <td>{{ review.status }}</td>
            <td>{{ review.date }}</td>
            <td>
              <button @click="editReview(review)">Düzenle</button>
              <button @click="deleteReview(review.id)">Sil</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      reviews: [
        { id: 1, user: "Ali", product: "Telefon", rating: 5, status: "Onaylı", date: "2025-03-08" },
        { id: 2, user: "Ayşe", product: "Laptop", rating: 4, status: "Beklemede", date: "2025-03-07" },
        { id: 3, user: "Mehmet", product: "Kamera", rating: 3, status: "Reddedildi", date: "2025-03-06" }
      ]
    };
  },
  computed: {
    filteredReviews() {
      return this.reviews.filter((review) =>
        review.user.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        review.product.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    editReview(review) {
      alert(`Yorum düzenleniyor: ${review.id}`);
    },
    deleteReview(id) {
      this.reviews = this.reviews.filter((review) => review.id !== id);
    }
  }
};
</script>

<style scoped>
.reviews-container {
  padding: 20px;
}

.search-bar {
  margin-bottom: 10px;
}

.search-bar input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #f5f5f5;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

th:first-child, td:first-child {
  text-align: center;
}

button {
  margin-right: 5px;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  opacity: 0.8;
}
</style>
