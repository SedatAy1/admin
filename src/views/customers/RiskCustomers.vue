<template>
  <CustomersLayout>
    <div class="container">
      <div class="header d-flex justify-content-between align-items-center p-3 bg-light shadow-sm rounded">
        <input v-model="search" type="text" placeholder="🔍 Ara..." class="form-control w-25" />
        <div>
          <button @click="showAddRiskModal = true" class="btn btn-primary shadow-sm">+ Riskli Müşteri Ekle</button>
          <button @click="showRiskCriteriaModal = true" class="btn btn-warning shadow-sm ms-2">⚙ Otomatik Risk Kriterleri</button>
        </div>
      </div>

      <table class="table table-hover mt-3 shadow-sm">
        <thead class="table-dark">
          <tr>
            <th>Üye No</th>
            <th>E-Posta</th>
            <th>Ad Soyad</th>
            <th>TC Kimlik No</th>
            <th>Telefon</th>
            <th>IP</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="customers.length === 0">
            <td colspan="7" class="text-center p-5 text-muted">
              <p>Kayıt bulunamadı.</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Riskli Müşteri Ekle Modal -->
    <div v-if="showAddRiskModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Yeni Riskli Müşteri</h5>
          <button @click="showAddRiskModal = false" class="close">×</button>
        </div>
        <div class="modal-body">
          <p class="info-text">Aşağıdaki alanlardan biriyle eşleşen sipariş geldiğinde "Riskli Sipariş" olarak işaretlenecektir.</p>
          <div class="form-group">
            <label>Ad Soyad</label>
            <input type="text" class="form-control" />
          </div>
          <div class="form-group">
            <label>E-posta</label>
            <input type="email" class="form-control" />
          </div>
          <div class="form-group">
            <label>TC Kimlik No</label>
            <input type="text" class="form-control" />
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary">Kaydet</button>
        </div>
      </div>
    </div>

    <!-- Otomatik Risk Kriterleri Modal -->
    <div v-if="showRiskCriteriaModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Global Risk Kriter Ayarları</h5>
          <button @click="showRiskCriteriaModal = false" class="close">×</button>
        </div>
        <div class="modal-body">
          <p class="info-text">Otomatik risk kriterleri ile siparişlerin ön tanımlı kriterlere göre kontrolünün yapılmasını sağlayabilirsiniz.</p>
          <div class="risk-criteria" v-for="(criteria, index) in riskCriteria" :key="index">
            <label class="toggle-label">{{ criteria.name }}</label>
            <label class="switch">
              <input type="checkbox" v-model="criteria.enabled" />
              <span class="slider round"></span>
            </label>
            <div v-if="criteria.enabled" class="criteria-settings">
              <label>Gün</label>
              <input type="number" v-model="criteria.days" class="form-control" />
              <label>Sipariş Limiti</label>
              <input type="number" v-model="criteria.limit" class="form-control" />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary">Kaydet</button>
        </div>
      </div>
    </div>
  </CustomersLayout>
</template>

<script>
import CustomersLayout from "./CustomersLayout.vue";

export default {
  components: {
    CustomersLayout
  },
  data() {
    return {
      search: "",
      showAddRiskModal: false,
      showRiskCriteriaModal: false,
      customers: [],
      riskCriteria: [
        { name: "Ad Soyad Kriteri", enabled: false, days: 15, limit: 1 },
        { name: "E-mail Kriteri", enabled: false, days: 15, limit: 1 },
        { name: "Telefon Kriteri", enabled: false, days: 15, limit: 1 },
        { name: "Tc Kimlik Kriteri", enabled: false, days: 15, limit: 1 },
        { name: "IP Kriteri", enabled: false, days: 15, limit: 1 }
      ]
    };
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-footer {
  text-align: right;
}
.switch {
  position: relative;
  display: inline-block;
  width: 34px;
  height: 20px;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}
.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}
input:checked + .slider {
  background-color: #2196F3;
}
input:checked + .slider:before {
  transform: translateX(14px);
}
</style>