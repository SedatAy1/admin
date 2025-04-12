<template>
  <div>
    <!-- Ana İçerik -->
    <div class="container">
      <div class="card">
        <h2>{{ $t('bulk.title') }}</h2>
        <div class="form-group">
          <label for="bulk-action">» {{ $t('bulk.selectActionLabel') }}</label>
          <select id="bulk-action" v-model="selectedAction">
            <option value="" disabled>{{ $t('bulk.selectActionPlaceholder') }}</option>
            <option value="price-update">{{ $t('bulk.actions.priceUpdate') }}</option>
            <option value="stock-update">{{ $t('bulk.actions.stockUpdate') }}</option>
            <option value="category-change">{{ $t('bulk.actions.categoryChange') }}</option>
            <option value="delete-products">{{ $t('bulk.actions.deleteProducts') }}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductOtherTabs from "@/components/ProductOtherTabs.vue";

export default {
  components: { ProductOtherTabs },
  data() {
    return {
      selectedAction: "",
    };
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  display: flex;
  justify-content: center;
}

.card {
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 480px;
  transition: background 0.3s ease;
}

h2 {
  color: #1f2937;
  font-size: 20px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

select {
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  background-color: white;
  transition: border 0.2s ease;
}
select:focus {
  outline: none;
  border-color: #3b82f6;
}

/* ✅ Dark Mode */
:root.dark .card {
  background: #1e293b;
  color: white;
}

:root.dark h2 {
  color: #f3f4f6;
}

:root.dark label {
  color: #d1d5db;
}

:root.dark select {
  background: #0f172a;
  color: white;
  border-color: #334155;
}

/* ✅ Responsive */
@media (max-width: 640px) {
  .container {
    padding: 15px;
  }

  .card {
    padding: 20px;
    max-width: 100%;
  }

  h2 {
    font-size: 18px;
  }

  select {
    font-size: 13px;
  }
}
</style>
