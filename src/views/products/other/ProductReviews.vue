<template>
  <div class="reviews-container">
    <!-- Arama Çubuğu -->
    <div class="search-bar">
      <input type="text" v-model="searchQuery" :placeholder="$t('review.search')" />
    </div>

    <!-- Yorum Tablosu -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>{{ $t('review.id') }}</th>
            <th>{{ $t('review.user') }}</th>
            <th>{{ $t('review.product') }}</th>
            <th>{{ $t('review.rating') }}</th>
            <th>{{ $t('review.status') }}</th>
            <th>{{ $t('review.date') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="review in filteredReviews" :key="review.id">
            <td><input type="checkbox" /></td>
            <td>{{ review.id }}</td>
            <td>{{ review.user }}</td>
            <td>{{ review.product }}</td>
            <td>{{ review.rating }}</td>
            <td>{{ $t(`review.statuses.${review.status}`) }}</td>
            <td>{{ review.date }}</td>
            <td>
              <button @click="editReview(review)">{{ $t('common.edit') }}</button>
              <button @click="deleteReview(review.id)">{{ $t('common.delete') }}</button>
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
  background-color: var(--bg-color, #f9f9f9);
  color: var(--text-color, #333);
}

/* Arama Çubuğu */
.search-bar {
  margin-bottom: 15px;
}

.search-bar input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  background: var(--input-bg, #fff);
  color: var(--text-color, #333);
  border-radius: 6px;
  font-size: 14px;
}

/* Tablo */
.table-container {
  overflow-x: auto;
  background: var(--table-bg, #fff);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
}

thead {
  background: var(--thead-bg, #e0e0e0);
  color: var(--thead-text, #000);
}

th, td {
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
  text-align: left;
  font-size: 14px;
}

th:first-child, td:first-child {
  text-align: center;
}

/* Butonlar */
button {
  background-color: #003c8f;
  color: #fff;
  border: none;
  padding: 6px 12px;
  margin-right: 5px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #002f6c;
}

/* Responsive */
@media (max-width: 768px) {
  table {
    min-width: 600px;
  }

  .search-bar input {
    font-size: 13px;
    padding: 8px;
  }

  th, td {
    padding: 10px;
    font-size: 13px;
  }

  button {
    padding: 5px 10px;
    font-size: 12px;
  }
}

/* Koyu Mod Destek */
:root.dark .reviews-container {
  --bg-color: #121212;
  --text-color: #f1f1f1;
  --input-bg: #1e1e1e;
  --table-bg: #1c1c1c;
  --thead-bg: #2a2a2a;
  --thead-text: #fff;
}
</style>
