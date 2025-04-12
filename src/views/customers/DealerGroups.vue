<template>
  <CustomersLayout>
    <div class="container">
      <div class="header">
        <input type="text" :placeholder="$t('common.search')" class="search-input" />
        <button class="new-group-btn" @click="openModal('newGroup')">+ {{ $t("group.new") }}</button>
      </div>
      <table class="custom-table">
        <thead>
          <tr>
            <th>{{ $t("group.id") }}</th>
            <th>{{ $t("group.name") }}</th>
            <th>{{ $t("group.discount") }}</th>
            <th>{{ $t("common.actions") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><a href="#">1</a></td>
            <td>{{ $t("group.sample") }}</td>
            <td>%10</td>
            <td>
              <button class="dropdown-btn" @click="toggleDropdown">{{ $t("common.actions") }}</button>
              <div v-if="dropdownVisible" class="dropdown-menu">
                <p @click="quickView">🔍 {{ $t("common.quickView") }}</p>
                <p @click="deleteGroup">🗑️ {{ $t("common.delete") }}</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Yeni Grup Modal -->
    <div v-if="modals.newGroup" class="modal-overlay" @click.self="closeModal('newGroup')">
      <div class="modal">
        <h2>{{ $t("group.title") }}</h2>
        <div class="form-group">
          <label>{{ $t("group.name") }}</label>
          <input type="text" v-model="newGroup.name" :placeholder="$t('group.name')" />
        </div>
        <div class="form-group">
          <label>{{ $t("group.discount") }} (%)</label>
          <input type="number" v-model="newGroup.discount" placeholder="%" />
        </div>
        <div class="form-group">
          <label>{{ $t("group.priceType") }}</label>
          <select v-model="newGroup.priceType">
            <option>{{ $t("group.default") }}</option>
          </select>
        </div>
        <button class="save-btn" @click="saveGroup">✔ {{ $t("common.save") }}</button>
        <button class="close-btn" @click="closeModal('newGroup')">{{ $t("common.cancel") }}</button>
      </div>
    </div>
  </CustomersLayout>
</template>
<script>
import CustomersLayout from "@/views/customers/CustomersLayout.vue";

export default {
  components: { CustomersLayout },
  data() {
    return {
      dropdownVisible: false,
      modals: {
        newGroup: false,
      },
      newGroup: {
        name: "",
        discount: "",
        priceType: "Varsayılan",
      },
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    quickView() {
      alert("Hızlı görüntüleme açıldı.");
    },
    deleteGroup() {
      if (confirm("Bu grubu silmek istediğinize emin misiniz?")) {
        alert("Grup silindi.");
      }
    },
    openModal(modalName) {
      this.modals[modalName] = true;
    },
    closeModal(modalName) {
      this.modals[modalName] = false;
    },
    saveGroup() {
      alert("Grup başarıyla kaydedildi: " + this.newGroup.name);
      this.closeModal('newGroup');
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
  background: var(--bg);
  color: var(--text);
}

/* HEADER */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  flex-wrap: wrap;
  gap: 10px;
}
.search-input {
  padding: 8px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--input-bg);
  color: var(--text);
}
.new-group-btn {
  padding: 8px 16px;
  background-color: #316cf4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.new-group-btn:hover {
  background-color: #2554c7;
}

/* TABLE */
.custom-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--bg);
}
.custom-table th,
.custom-table td {
  padding: 10px;
  border-bottom: 1px solid var(--border);
  color: var(--text);
  font-size: 14px;
}
.custom-table th {
  background: var(--thead-bg);
  font-weight: 600;
}

/* DROPDOWN */
.dropdown-btn {
  padding: 6px 12px;
  border: 1px solid var(--border);
  background: var(--input-bg);
  color: var(--text);
  cursor: pointer;
}
.dropdown-menu {
  position: absolute;
  background: var(--card);
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 4px;
  color: var(--text);
  z-index: 1000;
}

/* MODAL */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background: var(--modal-bg);
  padding: 20px;
  border-radius: 12px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
  z-index: 99999 !important;
  display: block !important;
  position: relative;
  flex-direction: column;
  transform: translateY(0);
  animation: fadeIn 0.3s ease-in-out;
  opacity: 1 !important;
  color: var(--text);
}
.form-group {
  margin-bottom: 10px;
}
.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--input-bg);
  color: var(--text);
}
.save-btn,
.close-btn {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 6px;
}
.save-btn {
  background: #316cf4;
  color: white;
}
.save-btn:hover {
  background: #2554c7;
}
.close-btn {
  background: #d33;
  color: white;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: stretch;
  }
  .search-input {
    width: 100%;
  }
  .new-group-btn {
    width: 100%;
  }
}

/* DARK MODE DEĞİŞKENLERİ */
:root {
  --bg: #ffffff;
  --text: #1f2937;
  --border: #d1d5db;
  --input-bg: #ffffff;
  --thead-bg: #f3f4f6;
  --card: #ffffff;
  --modal-bg: #ffffff;
}
body.dark {
  --bg: #1a1c2c;
  --text: #f3f4f6;
  --border: #3f3f46;
  --input-bg: #2b2e33;
  --thead-bg: #2e323a;
  --card: #2e323a;
  --modal-bg: #2b2e33;
}
</style>