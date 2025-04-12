<template>
  <div>
    <!-- Filtreleme Seçenekleri Butonu -->
    <div class="filter-header">
      <button class="filter-btn" @click="toggleFilter">
        <font-awesome-icon icon="filter" />
        {{ $t('suggestion.filterTitle') }}
      </button>
      <button class="suggestion-btn" @click="openSuggestions">
        <font-awesome-icon icon="list" />
        {{ $t('suggestion.suggestionTitle') }}
      </button>
    </div>

    <!-- Filtreleme Seçenekleri -->
    <div v-if="showFilter" class="filter-section">
      <label>{{ $t('suggestion.readStatus') }}</label>
      <select v-model="filter.readStatus">
        <option>{{ $t('common.all') }}</option>
        <option>{{ $t('common.read') }}</option>
        <option>{{ $t('common.unread') }}</option>
      </select>

      <label>{{ $t('suggestion.replyStatus') }}</label>
      <select v-model="filter.replyStatus">
        <option>{{ $t('common.all') }}</option>
        <option>{{ $t('common.replied') }}</option>
        <option>{{ $t('common.notReplied') }}</option>
      </select>

      <label>{{ $t('suggestion.name') }}</label>
      <input v-model="filter.name" :placeholder="$t('suggestion.namePlaceholder')" />

      <label>{{ $t('suggestion.email') }}</label>
      <input v-model="filter.email" :placeholder="$t('suggestion.emailPlaceholder')" />

      <label>{{ $t('suggestion.productCode') }}</label>
      <input v-model="filter.productCode" :placeholder="$t('suggestion.productCodePlaceholder')" />

      <label>{{ $t('suggestion.productName') }}</label>
      <input v-model="filter.productName" :placeholder="$t('suggestion.productNamePlaceholder')" />

      <label>{{ $t('common.date') }}</label>
      <input type="date" v-model="filter.startDate" />
      <span>{{ $t('common.and') }}</span>
      <input type="date" v-model="filter.endDate" />

      <div class="filter-actions">
        <button @click="clearFilter">{{ $t('common.clear') }}</button>
        <button class="apply" @click="applyFilter">{{ $t('common.filter') }}</button>
      </div>
    </div>

    <!-- Öneri Başlıkları Modal -->
    <div v-if="showSuggestions" class="modal">
      <div class="modal-content">
        <h3>{{ $t('suggestion.modalTitle') }}</h3>
        <p>{{ $t('suggestion.modalInfo') }}</p>

        <ul>
          <li v-for="(title, index) in suggestionTitles" :key="index">
            <input v-model="suggestionTitles[index]" />
            <button @click="removeTitle(index)">❌</button>
          </li>
        </ul>

        <button @click="addTitle">+ {{ $t('common.add') }}</button>
        <div class="modal-footer">
          <button class="save-btn" @click="closeSuggestions">{{ $t('common.save') }}</button>
        </div>
      </div>
    </div>

    <!-- Öneri Tablosu -->
    <table>
      <thead>
        <tr>
          <th>{{ $t('suggestion.id') }}</th>
          <th>{{ $t('suggestion.name') }}</th>
          <th>{{ $t('suggestion.email') }}</th>
          <th>{{ $t('suggestion.productName') }}</th>
          <th>{{ $t('common.read') }}</th>
          <th>{{ $t('common.replied') }}</th>
          <th>{{ $t('common.date') }}</th>
          <th>{{ $t('common.actions') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="recommendations.length === 0">
          <td colspan="8" class="no-data">
            <img src="@/assets/no-data.png" alt="No Data" />
            <p>{{ $t('common.noData') }}</p>
          </td>
        </tr>
        <tr v-for="(recommendation, index) in recommendations" :key="index">
          <td>{{ recommendation.id }}</td>
          <td>{{ recommendation.name }}</td>
          <td>{{ recommendation.email }}</td>
          <td>{{ recommendation.product }}</td>
          <td>{{ recommendation.readStatus ? '✅' : '❌' }}</td>
          <td>{{ recommendation.replyStatus ? '✅' : '❌' }}</td>
          <td>{{ recommendation.date }}</td>
          <td>
            <button @click="editRecommendation(index)">✏️</button>
            <button @click="deleteRecommendation(index)">🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showFilter: false,
      showSuggestions: false,
      filter: {
        readStatus: "Tümü",
        replyStatus: "Tümü",
        name: "",
        email: "",
        productCode: "",
        productName: "",
        startDate: "",
        endDate: "",
      },
      suggestionTitles: [
        "Ürün açıklaması yetersiz",
        "Ürün açıklamasında yanlış bilgiler var",
        "Ürün resimleri görüntülenmiyor veya yetersiz",
        "Ürünün fiyatı piyasaya göre daha pahalı",
        "Ürünün fiyat bilgisi hatalı",
      ],
      recommendations: [],
    };
  },
  methods: {
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
    openSuggestions() {
      this.showSuggestions = true;
    },
    closeSuggestions() {
      this.showSuggestions = false;
    },
    addTitle() {
      this.suggestionTitles.push("");
    },
    removeTitle(index) {
      this.suggestionTitles.splice(index, 1);
    },
    applyFilter() {
      console.log("Filtreleme uygulandı", this.filter);
    },
    clearFilter() {
      this.filter = {
        readStatus: "Tümü",
        replyStatus: "Tümü",
        name: "",
        email: "",
        productCode: "",
        productName: "",
        startDate: "",
        endDate: "",
      };
    },
    editRecommendation(index) {
      console.log("Öneri düzenleniyor:", this.recommendations[index]);
    },
    deleteRecommendation(index) {
      this.recommendations.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.filter-header {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 15px;
}

.filter-btn,
.suggestion-btn {
  background: #2f80ed;
  color: white;
  padding: 10px 14px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}
.filter-btn:hover,
.suggestion-btn:hover {
  background: #1e60c7;
}

.filter-section {
  background: #1e40af;
  padding: 20px;
  border-radius: 8px;
  color: white;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.filter-section label {
  flex: 1 1 200px;
  font-weight: 500;
  margin-top: 5px;
}

.filter-section input,
.filter-section select {
  flex: 2 1 250px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  font-size: 14px;
}

.filter-actions {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}

.filter-actions button {
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  font-weight: 500;
  cursor: pointer;
}

.filter-actions .apply {
  background: #34d399;
  color: white;
}
.filter-actions .apply:hover {
  background: #10b981;
}

.filter-actions button:not(.apply) {
  background: #f3f4f6;
  color: #1f2937;
}

/* Tablo */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

thead {
  background: #4b5563;
  color: white;
}

th, td {
  padding: 12px;
  border: 1px solid #e5e7eb;
  text-align: center;
  font-size: 14px;
}

.no-data {
  text-align: center;
  padding: 30px;
  color: #9ca3af;
}
.no-data img {
  width: 80px;
  opacity: 0.6;
}

/* Modal */
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: #ffffff;
  padding: 25px;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-content h3 {
  margin-bottom: 10px;
}

.modal-content ul {
  list-style: none;
  padding: 0;
}

.modal-content li {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.modal-content input {
  flex: 1;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.modal-footer {
  margin-top: 20px;
  text-align: right;
}

.save-btn {
  background: #3b82f6;
  color: white;
  padding: 10px 14px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
}
.save-btn:hover {
  background: #2563eb;
}

/* Dark Mode */
:root.dark .filter-section {
  background: #1e293b;
  color: white;
}
:root.dark .filter-section input,
:root.dark .filter-section select {
  background: #111827;
  color: white;
}
:root.dark .modal-content {
  background: #1f2937;
  color: white;
}
:root.dark table {
  background: #111827;
  color: white;
}
:root.dark thead {
  background: #374151;
}
:root.dark th, :root.dark td {
  border-color: #374151;
}

/* ✅ Responsive */
@media (max-width: 768px) {
  .filter-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .filter-section {
    flex-direction: column;
  }

  .filter-section label,
  .filter-section input,
  .filter-section select {
    flex: 1 1 100%;
  }

  .filter-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .modal-content {
    width: 95%;
    max-width: 95%;
    padding: 20px;
  }

  table {
    font-size: 13px;
  }

  th, td {
    padding: 8px;
  }
}
</style>
