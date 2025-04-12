<template>
  <div class="filter-section">
    <div class="filter-header">
      <span>🔍 {{ $t("filters.title") }}</span>
      <button @click="toggleFilter" class="toggle-btn">
        <span v-if="showFilter">▲</span>
        <span v-else>▼</span>
      </button>
    </div>
    <transition name="fade">
      <div v-show="showFilter" class="filter-content">
        <div class="filter-grid">
          <div v-for="(filter, index) in filters" :key="index" class="filter-item">
            <label>{{ $t(`filters.fields.${filter.key}`) }}</label>
            <input
              v-if="filter.type === 'text'"
              type="text"
              v-model="filter.value"
              :placeholder="$t(`filters.fields.${filter.key}`)"
            />
            <select v-if="filter.type === 'select'" v-model="filter.value">
              <option value="">{{ $t("common.all") }}</option>
              <option v-for="option in filter.options" :key="option" :value="option">
                {{ $t(`statuses.${option}`) }}
              </option>
            </select>
          </div>
        </div>

        <div class="filter-buttons">
          <button @click="resetFilters" class="btn reset">{{ $t("common.clear") }}</button>
          <button @click="applyFilters" class="btn apply">{{ $t("common.filter") }}</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showFilter: true,
      filters: [
  {
    key: "orderStatus",
    label: "Sipariş Durumu",
    type: "select",
    options: ["new", "preparing", "shipped"],
    value: ""
  },
  { key: "orderNo", label: "Sipariş No", type: "text", value: "" },
  { key: "customerName", label: "Müşteri Adı", type: "text", value: "" },
  { key: "phone", label: "Telefon", type: "text", value: "" }
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
:root {
  --primary: #6c63ff;
  --bg: #ffffff;
  --bg-dark: #1e1e2f;
  --text: #333;
  --text-dark: #f5f5f5;
  --radius: 12px;
  --transition: all 0.3s ease;
}

/* Kapsayıcı */
.filter-section {
  background: var(--bg);
  border: 1px solid #ddd;
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: var(--transition);
}

/* Karanlık mod */
.dark-mode .filter-section {
  background: var(--bg-dark);
  color: var(--text-dark);
  border: 1px solid #444;
}

/* Başlık kısmı */
.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.toggle-btn {
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: var(--primary);
}

/* Grid */
.filter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

/* Filtre öğesi */
.filter-item {
  display: flex;
  flex-direction: column;
}

.filter-item label {
  font-size: 0.85rem;
  margin-bottom: 4px;
  font-weight: 500;
}

.filter-item input,
.filter-item select {
  padding: 10px;
  border-radius: var(--radius);
  border: 1px solid #ccc;
  transition: var(--transition);
}

.filter-item input:focus,
.filter-item select:focus {
  border-color: var(--primary);
  outline: none;
  box-shadow: 0 0 0 2px rgba(108, 99, 255, 0.2);
}

.dark-mode .filter-item input,
.dark-mode .filter-item select {
  background: #2c2c3e;
  color: #f5f5f5;
  border: 1px solid #555;
}

/* Butonlar */
.filter-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 1.5rem;
}

.btn {
  padding: 10px 16px;
  border-radius: var(--radius);
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: var(--transition);
}

.btn.reset {
  background: #e0e0e0;
  color: #333;
}

.btn.reset:hover {
  background: #ccc;
}

.btn.apply {
  background: var(--primary);
  color: white;
}

.btn.apply:hover {
  background: #584cf2;
}

/* Karanlık butonlar */
.dark-mode .btn.reset {
  background: #555;
  color: white;
}

.dark-mode .btn.reset:hover {
  background: #444;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>