<template>
  <div class="filter-section">
    <div class="filter-header">
      <span>🔍 Filtreleme Seçenekleri</span>
      <button @click="toggleFilter" class="toggle-btn">
        <span v-if="showFilter">▲</span>
        <span v-else>▼</span>
      </button>
    </div>
    <div v-show="showFilter" class="filter-content">
      <!-- Filtreleme formu -->
      <div class="filter-grid">
        <div v-for="(filter, index) in filters" :key="index" class="filter-item">
          <label>{{ filter.label }}</label>
          <input v-if="filter.type === 'text'" type="text" v-model="filter.value" />
          <select v-if="filter.type === 'select'" v-model="filter.value">
            <option v-for="option in filter.options" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
      </div>

      <!-- Butonlar -->
      <div class="filter-buttons">
        <button @click="resetFilters" class="reset-btn">Temizle</button>
        <button @click="applyFilters" class="apply-btn">Filtrele</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showFilter: true,
      filters: [
        { label: "Sipariş Durumu", type: "select", options: ["Yeni Sipariş", "Hazırlanıyor", "Kargolandı"], value: "" },
        { label: "Sipariş No", type: "text", value: "" },
        { label: "Müşteri Adı", type: "text", value: "" },
        { label: "Telefon", type: "text", value: "" }
      ]
    };
  },
  methods: {
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
    resetFilters() {
      this.filters.forEach(filter => (filter.value = ""));
    },
    applyFilters() {
      console.log("Filtreler uygulandı:", this.filters);
    }
  }
};
</script>

<style scoped>
.filter-section {
  background: #0d47a1;
  color: white;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
}

.filter-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.filter-item {
  display: flex;
  flex-direction: column;
}

.filter-item label {
  font-size: 12px;
  margin-bottom: 4px;
}

.filter-item input,
.filter-item select {
  padding: 6px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.filter-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}

.reset-btn {
  background: #ccc;
  padding: 8px;
  border: none;
  cursor: pointer;
}

.apply-btn {
  background: #007bff;
  color: white;
  padding: 8px;
  border: none;
  cursor: pointer;
}
</style>
