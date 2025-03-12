<template>
  <div>
    <!-- Filtreleme Seçenekleri Butonu -->
    <div class="filter-toggle" @click="toggleFilter">
      <i class="fas fa-filter"></i>
      <span>Filtreleme Seçenekleri</span>
      <i class="fas" :class="showFilter ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
    </div>

    <!-- Filtreleme Paneli -->
    <transition name="slide">
      <div v-if="showFilter" class="filter-panel">
        <div class="filter-content">
          <div class="filter-group">
            <label>Aranan Kelime</label>
            <input type="text" v-model="filters.searchTerm" placeholder="Kelime giriniz" />
          </div>

          <div class="filter-group">
            <label>Arama Tarihi</label>
            <input type="date" v-model="filters.startDate" />
            <span>ile</span>
            <input type="date" v-model="filters.endDate" />
          </div>

          <div class="filter-group">
            <label>Aranma Sayısı</label>
            <input type="number" v-model="filters.minSearchCount" />
            <span>ile</span>
            <input type="number" v-model="filters.maxSearchCount" />
          </div>

          <div class="filter-group">
            <label>Sonuç Sayısı</label>
            <input type="number" v-model="filters.minResultCount" />
            <span>ile</span>
            <input type="number" v-model="filters.maxResultCount" />
          </div>

          <div class="filter-actions">
            <button class="clear-btn" @click="clearFilters">Temizle</button>
            <button class="filter-btn" @click="applyFilters">Filtrele</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showFilter: false,
      filters: {
        searchTerm: "",
        startDate: "",
        endDate: "",
        minSearchCount: "",
        maxSearchCount: "",
        minResultCount: "",
        maxResultCount: "",
      },
    };
  },
  methods: {
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
    applyFilters() {
      console.log("Filtreler uygulandı:", this.filters);
    },
    clearFilters() {
      this.filters = {
        searchTerm: "",
        startDate: "",
        endDate: "",
        minSearchCount: "",
        maxSearchCount: "",
        minResultCount: "",
        maxResultCount: "",
      };
    },
  },
};
</script>

<style scoped>
.filter-toggle {
  background: #0d47a1;
  color: white;
  padding: 15px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.filter-panel {
  background: #0d47a1;
  padding: 15px;
  border-radius: 8px;
  margin-top: 10px;
}

.filter-content {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-group label {
  font-size: 14px;
  color: white;
  margin-bottom: 5px;
}

.filter-group input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.filter-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.clear-btn {
  background: #f8f9fa;
  color: black;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.filter-btn {
  background: #003c8f;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.slide-enter-active, .slide-leave-active {
  transition: max-height 0.5s ease-in-out;
}

.slide-enter, .slide-leave-to {
  max-height: 0;
  overflow: hidden;
}
</style>
