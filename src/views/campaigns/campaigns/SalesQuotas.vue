<template>
  <div class="sales-quotas-container">
    <!-- Üst Kısım -->
    <div class="header-section">
      <input type="text" class="search-input" :placeholder="$t('salesQuota.search')" />
      <button class="btn btn-primary" @click="openNewQuotaModal">
        ➕ {{ $t('salesQuota.new') }}
      </button>
    </div>

    <!-- Tablo -->
    <div class="table-container">
      <table v-if="quotas.length > 0">
        <thead>
          <tr>
            <th>#</th>
            <th>{{ $t('salesQuota.id') }}</th>
            <th>{{ $t('salesQuota.name') }}</th>
            <th>{{ $t('salesQuota.amount') }}</th>
            <th>{{ $t('salesQuota.rule') }}</th>
            <th>{{ $t('salesQuota.period') }}</th>
            <th>{{ $t('salesQuota.group') }}</th>
            <th>{{ $t('salesQuota.dateRange') }}</th>
            <th>{{ $t('salesQuota.priority') }}</th>
            <th>{{ $t('salesQuota.status') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(quota, index) in quotas" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ quota.id }}</td>
            <td>{{ quota.name }}</td>
            <td>{{ quota.amount }}</td>
            <td>{{ quota.rule }}</td>
            <td>{{ quota.period }}</td>
            <td>{{ quota.group }}</td>
            <td>{{ quota.dateRange }}</td>
            <td>{{ quota.priority }}</td>
            <td>{{ quota.status }}</td>
            <td>
              <button class="btn btn-sm btn-danger" @click="deleteQuota(index)">
                ❌ {{ $t('common.delete') }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-else class="empty-state">
        <img src="@/assets/empty.svg" alt="No Data" />
        <p>{{ $t('common.noData') }}</p>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showNewQuotaModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h2>{{ $t('salesQuota.newTitle') }}</h2>
          <button class="close-btn" @click="closeNewQuotaModal">✖</button>
        </div>

        <div class="form-group">
          <label>{{ $t('salesQuota.form.name') }} <span class="required">*</span></label>
          <input type="text" v-model="newQuota.name" required />
        </div>

        <div class="form-group">
          <label>{{ $t('salesQuota.form.status') }} <span class="required">*</span></label>
          <select v-model="newQuota.status">
            <option>{{ $t('common.active') }}</option>
            <option>{{ $t('common.passive') }}</option>
          </select>
        </div>

        <div class="form-group">
          <label>{{ $t('salesQuota.form.priority') }}</label>
          <input type="number" v-model="newQuota.priority" min="0" />
        </div>

        <div class="form-group">
          <label>{{ $t('salesQuota.form.amount') }}</label>
          <input type="number" v-model="newQuota.amount" min="1" />
        </div>

        <div class="form-group">
          <label>{{ $t('salesQuota.form.rule') }}</label>
          <select v-model="newQuota.rule">
            <option>{{ $t('salesQuota.rules.customerBased') }}</option>
            <option>{{ $t('salesQuota.rules.general') }}</option>
          </select>
        </div>

        <div class="form-group">
          <label>{{ $t('salesQuota.form.period') }}</label>
          <select v-model="newQuota.period">
            <option>{{ $t('salesQuota.periods.all') }}</option>
            <option>{{ $t('salesQuota.periods.daily') }}</option>
            <option>{{ $t('salesQuota.periods.weekly') }}</option>
            <option>{{ $t('salesQuota.periods.monthly') }}</option>
          </select>
        </div>

        <div class="form-group">
          <label>{{ $t('salesQuota.form.group') }}</label>
          <select v-model="newQuota.group">
            <option>{{ $t('common.all') }}</option>
            <option>{{ $t('salesQuota.groups.individual') }}</option>
            <option>{{ $t('salesQuota.groups.corporate') }}</option>
          </select>
        </div>

        <button class="btn btn-primary" @click="saveQuota">
          ✔ {{ $t('common.save') }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      quotas: [],
      showNewQuotaModal: false,
      newQuota: {
        name: "",
        status: "Aktif",
        priority: 0,
        amount: 0,
        rule: "Müşteri Bazlı Satış Miktarı",
        period: "Tüm Zamanlar",
        group: "Tümü",
        dateRange: "Süresiz",
      },
    };
  },
  methods: {
    openNewQuotaModal() {
      this.showNewQuotaModal = true;
    },
    closeNewQuotaModal() {
      this.showNewQuotaModal = false;
    },
    saveQuota() {
      if (!this.newQuota.name || !this.newQuota.amount) {
        alert("Lütfen tüm zorunlu alanları doldurun!");
        return;
      }
      this.quotas.push({
        id: this.quotas.length + 1,
        ...this.newQuota,
      });
      this.newQuota = {
        name: "",
        status: "Aktif",
        priority: 0,
        amount: 0,
        rule: "Müşteri Bazlı Satış Miktarı",
        period: "Tüm Zamanlar",
        group: "Tümü",
        dateRange: "Süresiz",
      };
      this.closeNewQuotaModal();
    },
    deleteQuota(index) {
      this.quotas.splice(index, 1);
    }
  },
};
</script>

<style scoped>
.sales-quotas-container {
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
  background: var(--header-bg, white);
  border-bottom: 1px solid var(--border-color, #ddd);
}

.search-input {
  width: 250px;
  padding: 8px;
  border: 1px solid var(--border-color, #ccc);
  border-radius: 5px;
  background: var(--input-bg, #fff);
  color: var(--text-color, #1f2937);
}

/* Buton */
.btn {
  padding: 8px 14px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
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
  background: var(--card-bg, white);
  padding: 20px;
  border-radius: 10px;
  margin-top: 10px;
  overflow-x: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 10px;
  border-bottom: 1px solid var(--border-color, #ddd);
  text-align: left;
  color: var(--text-color, #1f2937);
}
th {
  background: var(--thead-bg, #f3f4f6);
  font-weight: bold;
  color: var(--thead-text, #1f2937);
}
.empty-state {
  text-align: center;
  padding: 30px;
  color: var(--text-color, #6b7280);
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
  background: var(--card-bg, white);
  color: var(--text-color, #1f2937);
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
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
}

/* Form */
.form-group {
  margin-bottom: 15px;
}
input, select {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  margin-top: 5px;
  border: 1px solid var(--border-color, #ccc);
  border-radius: 5px;
  background: var(--input-bg, #fff);
  color: var(--text-color, #1f2937);
}

/* Zorunlu Alan */
.required {
  color: #ef4444;
  font-size: 12px;
  margin-left: 5px;
}

/* 🌙 Koyu Mod */
:root.dark {
  --header-bg: #1f2937;
  --card-bg: #1e293b;
  --text-color: #f3f4f6;
  --input-bg: #111827;
  --border-color: #374151;
  --thead-bg: #374151;
  --thead-text: #f9fafb;
}

/* 📱 Responsive */
@media (max-width: 768px) {
  .search-input {
    width: 100%;
  }

  .header-section {
    flex-direction: column;
    align-items: stretch;
  }

  .btn {
    width: 100%;
  }
}
</style>