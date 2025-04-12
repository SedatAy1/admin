<template>
  <div class="promotions-container">
    <!-- Üst Kısım: Arama ve Buton -->
    <div class="header-section">
      <input type="text" class="search-input" :placeholder="$t('promotion.search')" />
      <button class="btn btn-primary" @click="openNewPromotionModal">
        ➕ {{ $t('promotion.new') }}
      </button>
    </div>

    <!-- Tablo -->
    <div class="table-container">
      <table v-if="promotions.length > 0">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t('promotion.id') }}</th>
            <th>{{ $t('promotion.name') }}</th>
            <th>{{ $t('promotion.minCart') }}</th>
            <th>{{ $t('promotion.startDate') }}</th>
            <th>{{ $t('promotion.endDate') }}</th>
            <th>{{ $t('promotion.order') }}</th>
            <th>{{ $t('promotion.totalUsage') }}</th>
            <th>{{ $t('promotion.status') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(promotion, index) in promotions" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ promotion.id }}</td>
            <td>{{ promotion.name }}</td>
            <td>{{ promotion.minCart }}</td>
            <td>{{ promotion.startDate }}</td>
            <td>{{ promotion.endDate }}</td>
            <td>{{ promotion.order }}</td>
            <td>{{ promotion.totalUsage }}</td>
            <td>{{ promotion.status }}</td>
            <td>
              <button class="btn btn-sm btn-danger" @click="deletePromotion(index)">❌ {{ $t('common.delete') }}</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Kayıt yoksa -->
      <div v-else class="empty-state">
        <img src="@/assets/empty.svg" alt="No Data" />
        <p>{{ $t('common.noData') }}</p>
      </div>
    </div>
  </div>

  <!-- Yeni Promosyon Modalı -->
  <div v-if="showNewPromotionModal" class="modal-overlay" @click.self="closeNewPromotionModal">
    <div class="modal">
      <div class="modal-header">
        <h2>{{ $t('promotion.newTitle') }}</h2>
        <button class="close-btn" @click="closeNewPromotionModal">✖</button>
      </div>
      <p class="modal-info">
        {{ $t('promotion.newInfo') }}
      </p>

      <div class="promotion-types">
        <label
          v-for="(type, index) in promotionTypes"
          :key="index"
          class="radio-label"
        >
          <input type="radio" v-model="selectedPromotionType" :value="type" />
          {{ type }}
        </label>
      </div>

      <div class="modal-buttons">
        <button class="btn btn-primary" @click="savePromotion">{{ $t('common.create') }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import CampaignsLayout from "@/views/campaigns/CampaignsLayout.vue";

export default {
  components: { CampaignsLayout },
  data() {
    return {
      promotions: [],
      showNewPromotionModal: false,
      selectedPromotionType: "",
      promotionTypes: [
        "Sepette X Al Y Öde Kampanyası",
        "Siparişte X Al Y Öde Kampanyası",
        "Sepette X Ürünlere Y İndirim",
        "Siparişte X Ürünlere Y İndirim",
        "X Ürünleri Alana Sepette Y Ürünü Z İndirimli",
        "Sepet Toplamına X İndirim"
      ],
    };
  },
  methods: {
    openNewPromotionModal() {
      console.log("Yeni Promosyon Modal Açılıyor...");
      this.showNewPromotionModal = true;
    },
    closeNewPromotionModal() {
      console.log("Yeni Promosyon Modal Kapatılıyor...");
      this.showNewPromotionModal = false;
    },
    savePromotion() {
      if (!this.selectedPromotionType) {
        alert("Lütfen bir promosyon tipi seçin!");
        return;
      }
      this.promotions.push({
        id: this.promotions.length + 1,
        name: this.selectedPromotionType,
        minCart: 0,
        startDate: "15.03.2025",
        endDate: "22.03.2025",
        order: this.promotions.length + 1,
        totalUsage: 0,
        status: "Aktif",
      });
      this.selectedPromotionType = "";
      this.closeNewPromotionModal();
    },
    deletePromotion(index) {
      this.promotions.splice(index, 1);
    }
  },
};
</script>

<style scoped>
.promotions-container {
  padding: 20px;
}

/* Üst Kısım */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  padding: 15px;
  background: var(--header-bg, #ffffff);
  border-bottom: 1px solid var(--border-color, #ddd);
  border-radius: 8px;
}

.search-input {
  width: 250px;
  padding: 8px;
  border: 1px solid var(--border-color, #ccc);
  border-radius: 5px;
  background: var(--input-bg, #fff);
  color: var(--text-color, #000);
}

/* Butonlar */
.btn {
  padding: 8px 14px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
  font-weight: 500;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}
.btn-primary:hover {
  background: #2563eb;
}

.btn-danger {
  background: #ef4444;
  color: white;
}
.btn-danger:hover {
  background: #dc2626;
}

/* Tablo */
.table-container {
  background: var(--card-bg, #fff);
  padding: 20px;
  border-radius: 10px;
  margin-top: 10px;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
}

th, td {
  padding: 10px;
  border-bottom: 1px solid var(--border-color, #ddd);
  text-align: left;
  font-size: 14px;
  color: var(--text-color, #000);
}

th {
  background: var(--thead-bg, #f3f4f6);
  font-weight: bold;
  color: var(--text-color, #000);
}

/* Boş Veri */
.empty-state {
  text-align: center;
  padding: 30px;
  color: var(--text-muted, #9ca3af);
}
.empty-state img {
  width: 100px;
  opacity: 0.5;
}

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99998;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Modal */
.modal {
  background: var(--card-bg, #fff);
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  color: var(--text-color, #000);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: var(--text-color, #000);
}

.modal-info {
  background: var(--info-bg, #eef2ff);
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
  font-size: 14px;
  color: var(--text-color, #000);
}

.promotion-types {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
}

.modal-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

/* 🌙 Dark Mode Teması */
:root.dark {
  --header-bg: #1f2937;
  --card-bg: #1e293b;
  --input-bg: #111827;
  --thead-bg: #374151;
  --border-color: #374151;
  --text-color: #f3f4f6;
  --text-muted: #9ca3af;
  --info-bg: #2e3448;
}

/* ✅ Responsive */
@media (max-width: 768px) {
  .header-section {
    flex-direction: column;
    align-items: stretch;
  }

  .search-input {
    width: 100%;
  }

  .btn {
    width: 100%;
  }

  .modal {
    width: 95%;
  }
}
</style>