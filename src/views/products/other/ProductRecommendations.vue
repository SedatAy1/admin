<template>
  <div>
    <!-- Filtreleme Seçenekleri Butonu -->
    <div class="filter-header">
      <button class="filter-btn" @click="toggleFilter">
        <font-awesome-icon icon="filter" />
        Filtreleme Seçenekleri
      </button>
      <button class="suggestion-btn" @click="openSuggestions">
        <font-awesome-icon icon="list" />
        Öneri Başlıkları
      </button>
    </div>

    <!-- Filtreleme Seçenekleri -->
    <div v-if="showFilter" class="filter-section">
      <label>Okunma Durumu</label>
      <select v-model="filter.readStatus">
        <option>Tümü</option>
        <option>Okundu</option>
        <option>Okunmadı</option>
      </select>

      <label>Yanıt Durumu</label>
      <select v-model="filter.replyStatus">
        <option>Tümü</option>
        <option>Yanıtlandı</option>
        <option>Yanıtlanmadı</option>
      </select>

      <label>Ad Soyad</label>
      <input v-model="filter.name" placeholder="Ad Soyad Girin" />

      <label>E-Posta Adresi</label>
      <input v-model="filter.email" placeholder="E-Posta Girin" />

      <label>Ürün Kodu</label>
      <input v-model="filter.productCode" placeholder="Ürün Kodu Girin" />

      <label>Ürün Adı</label>
      <input v-model="filter.productName" placeholder="Ürün Adı Girin" />

      <label>Tarih</label>
      <input type="date" v-model="filter.startDate" />
      <span>ile</span>
      <input type="date" v-model="filter.endDate" />

      <div class="filter-actions">
        <button @click="clearFilter">Temizle</button>
        <button class="apply" @click="applyFilter">Filtrele</button>
      </div>
    </div>

    <!-- Öneri Başlıkları Modal -->
    <div v-if="showSuggestions" class="modal">
      <div class="modal-content">
        <h3>Ürün Öneri Başlıkları</h3>
        <p>Ürün önerileri için hazır başlıklar ekleyebilirsiniz.</p>

        <ul>
          <li v-for="(title, index) in suggestionTitles" :key="index">
            <input v-model="suggestionTitles[index]" />
            <button @click="removeTitle(index)">❌</button>
          </li>
        </ul>

        <button @click="addTitle">+ Ekle</button>
        <div class="modal-footer">
          <button class="save-btn" @click="closeSuggestions">Kaydet</button>
        </div>
      </div>
    </div>

    <!-- Öneri Tablosu -->
    <table>
      <thead>
        <tr>
          <th>Öneri No</th>
          <th>Ad Soyad</th>
          <th>E-Posta Adresi</th>
          <th>Ürün Adı</th>
          <th>Okundu</th>
          <th>Yanıtlandı</th>
          <th>Tarih</th>
          <th>İşlemler</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="recommendations.length === 0">
          <td colspan="8" class="no-data">
            <img src="@/assets/no-data.png" alt="No Data" />
            <p>Kayıt bulunamadı.</p>
          </td>
        </tr>
        <tr v-for="(recommendation, index) in recommendations" :key="index">
          <td>{{ recommendation.id }}</td>
          <td>{{ recommendation.name }}</td>
          <td>{{ recommendation.email }}</td>
          <td>{{ recommendation.product }}</td>
          <td>{{ recommendation.readStatus ? "✅" : "❌" }}</td>
          <td>{{ recommendation.replyStatus ? "✅" : "❌" }}</td>
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
  margin-bottom: 10px;
}
.filter-btn,
.suggestion-btn {
  background: #2f80ed;
  color: white;
  padding: 8px 12px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}
.filter-section {
  background: #1e40af;
  padding: 15px;
  color: white;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.filter-section label {
  flex: 1 1 150px;
}
.filter-section input,
.filter-section select {
  flex: 2 1 200px;
  padding: 5px;
  border-radius: 5px;
  border: none;
}
.filter-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}
.filter-actions .apply {
  background: #666;
  color: white;
}
table {
  width: 100%;
  border-collapse: collapse;
}
thead {
  background: #a8acb9;
  color: white;
}
th,
td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
}
.no-data {
  text-align: center;
  padding: 20px;
}
.modal {
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.modal-content {
  background: white;
  padding: 20px;
  margin: 10% auto;
  width: 50%;
  border-radius: 5px;
}
.modal-footer {
  text-align: right;
}
</style>
