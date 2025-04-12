<template>
  <div>
    <!-- Filtreleme Seçenekleri Butonu -->
    <div class="filter-toggle" @click="toggleFilter">
      <i class="fas fa-filter"></i>
      <span>{{ $t('filter.title') }}</span>
      <i class="fas" :class="showFilter ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
    </div>

    <!-- Filtreleme Paneli -->
    <transition name="slide">
      <div v-if="showFilter" class="filter-panel">
        <div class="filter-content">
          <div class="filter-group">
            <label>{{ $t('filter.keyword') }}</label>
            <input type="text" v-model="filters.searchTerm" :placeholder="$t('filter.keywordPlaceholder')" />
          </div>

          <div class="filter-group">
            <label>{{ $t('filter.date') }}</label>
            <input type="date" v-model="filters.startDate" />
            <span>{{ $t('filter.and') }}</span>
            <input type="date" v-model="filters.endDate" />
          </div>

          <div class="filter-group">
            <label>{{ $t('filter.searchCount') }}</label>
            <input type="number" v-model="filters.minSearchCount" />
            <span>{{ $t('filter.and') }}</span>
            <input type="number" v-model="filters.maxSearchCount" />
          </div>

          <div class="filter-group">
            <label>{{ $t('filter.resultCount') }}</label>
            <input type="number" v-model="filters.minResultCount" />
            <span>{{ $t('filter.and') }}</span>
            <input type="number" v-model="filters.maxResultCount" />
          </div>

          <div class="filter-actions">
            <button class="clear-btn" @click="clearFilters">{{ $t('common.clear') }}</button>
            <button class="filter-btn" @click="applyFilters">{{ $t('common.filter') }}</button>
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
  transition: background 0.3s ease;
}

.filter-toggle:hover {
  background: #003c8f;
}

.filter-panel {
  background: #0d47a1;
  padding: 20px;
  border-radius: 8px;
  margin-top: 10px;
}

.filter-content {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  flex: 1 1 250px;
  min-width: 200px;
}

.filter-group label {
  font-size: 14px;
  color: white;
  margin-bottom: 5px;
  font-weight: 500;
}

.filter-group input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

.filter-actions {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
}

.clear-btn,
.filter-btn {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease;
}

.clear-btn {
  background: #f8f9fa;
  color: black;
}

.clear-btn:hover {
  background: #e2e6ea;
}

.filter-btn {
  background: #003c8f;
  color: white;
}

.filter-btn:hover {
  background: #002f6c;
}

/* Geçiş */
.slide-enter-active,
.slide-leave-active {
  transition: max-height 0.5s ease-in-out;
}

.slide-enter,
.slide-leave-to {
  max-height: 0;
  overflow: hidden;
}

/* Responsive */
@media (max-width: 768px) {
  .filter-content {
    flex-direction: column;
  }

  .filter-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .clear-btn,
  .filter-btn {
    width: 100%;
  }
}

/* Dark Mode */
.dark-mode .filter-group input {
  background: #1e293b;
  color: #f1f5f9;
  border-color: #475569;
}

.dark-mode .clear-btn {
  background: #334155;
  color: #f1f5f9;
}

.dark-mode .clear-btn:hover {
  background: #475569;
}

.dark-mode .filter-btn {
  background: #0ea5e9;
}

.dark-mode .filter-btn:hover {
  background: #0284c7;
}
</style>