<template>
  <CustomersLayout>
    <div class="container">
      <div class="header d-flex flex-wrap justify-content-between align-items-center p-3 bg-body shadow-sm rounded">
        <input v-model="search" type="text" :placeholder="$t('common.search')" class="form-control w-100 w-md-25 mb-2 mb-md-0" />
        <div class="d-flex flex-wrap gap-2">
          <button @click="showAddRiskModal = true" class="btn btn-primary">
            + {{ $t("risky.addNew") }}
          </button>
          <button @click="showRiskCriteriaModal = true" class="btn btn-warning">
            ⚙ {{ $t("risky.criteriaSettings") }}
          </button>
        </div>
      </div>

      <div class="table-responsive mt-3">
        <table class="table table-hover shadow-sm">
          <thead class="table-dark">
            <tr>
              <th>{{ $t("risky.id") }}</th>
              <th>{{ $t("risky.email") }}</th>
              <th>{{ $t("risky.name") }}</th>
              <th>{{ $t("risky.tckn") }}</th>
              <th>{{ $t("risky.phone") }}</th>
              <th>{{ $t("risky.ip") }}</th>
              <th>{{ $t("common.actions") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="customers.length === 0">
              <td colspan="7" class="text-center p-5 text-muted">
                <p>{{ $t("common.noData") }}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Riskli Müşteri Ekle Modal -->
    <div v-if="showAddRiskModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ $t("risky.newRiskyCustomer") }}</h5>
          <button @click="showAddRiskModal = false" class="close">×</button>
        </div>
        <div class="modal-body">
          <p class="info-text">{{ $t("risky.infoText") }}</p>
          <div class="form-group">
            <label>{{ $t("risky.name") }}</label>
            <input type="text" class="form-control" />
          </div>
          <div class="form-group">
            <label>{{ $t("risky.email") }}</label>
            <input type="email" class="form-control" />
          </div>
          <div class="form-group">
            <label>{{ $t("risky.tckn") }}</label>
            <input type="text" class="form-control" />
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary">{{ $t("common.save") }}</button>
        </div>
      </div>
    </div>

    <!-- Otomatik Risk Kriterleri Modal -->
    <div v-if="showRiskCriteriaModal" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ $t("risky.criteriaSettingsTitle") }}</h5>
          <button @click="showRiskCriteriaModal = false" class="close">×</button>
        </div>
        <div class="modal-body">
          <p class="info-text">{{ $t("risky.criteriaInfoText") }}</p>
          <div class="risk-criteria" v-for="(criteria, index) in riskCriteria" :key="index">
            <label class="toggle-label">{{ criteria.name }}</label>
            <label class="switch">
              <input type="checkbox" v-model="criteria.enabled" />
              <span class="slider round"></span>
            </label>
            <div v-if="criteria.enabled" class="criteria-settings">
              <label>{{ $t("risky.days") }}</label>
              <input type="number" v-model="criteria.days" class="form-control" />
              <label>{{ $t("risky.limit") }}</label>
              <input type="number" v-model="criteria.limit" class="form-control" />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary">{{ $t("common.save") }}</button>
        </div>
      </div>
    </div>
  </CustomersLayout>
</template>
<script>
import CustomersLayout from "./CustomersLayout.vue";

export default {
  components: { CustomersLayout },
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
:root {
  --bg-light: #ffffff;
  --bg-dark: #1f2937;
  --card-light: #f9fafb;
  --card-dark: #2d3748;
  --text-light: #1f2937;
  --text-dark: #f9fafb;
  --border-light: #e5e7eb;
  --border-dark: #4b5563;
  --accent: #3182ce;
  --danger: #e53e3e;
}

body.dark {
  background-color: var(--bg-dark);
  color: var(--text-dark);
}

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Modal Content */
.modal-content {
  width: 95%;
  max-width: 500px;
  background: var(--card-light);
  color: var(--text-light);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
body.dark .modal-content {
  background: var(--card-dark);
  color: var(--text-dark);
}

/* Modal Header */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  margin-bottom: 16px;
}

/* Modal Footer */
.modal-footer {
  text-align: right;
  margin-top: 20px;
}

/* Close Button */
.close {
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: var(--text-light);
}
body.dark .close {
  color: var(--text-dark);
}

/* Switch Toggle */
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 22px;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #cbd5e1;
  border-radius: 30px;
  transition: 0.3s;
}
.slider::before {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  left: 3px;
  top: 3px;
  background-color: white;
  border-radius: 50%;
  transition: 0.3s;
}
input:checked + .slider {
  background-color: var(--accent);
}
input:checked + .slider::before {
  transform: translateX(18px);
}

/* Criteria settings */
.criteria-settings {
  margin-top: 10px;
  background: rgba(0, 0, 0, 0.03);
  padding: 12px;
  border-radius: 8px;
}
body.dark .criteria-settings {
  background: rgba(255, 255, 255, 0.05);
}

/* Info Text */
.info-text {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 16px;
}
body.dark .info-text {
  color: #9ca3af;
}

/* Responsive */
@media (max-width: 768px) {
  .modal-content {
    padding: 16px;
  }
}
</style>
