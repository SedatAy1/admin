<template>
  <div>
    <!-- Ana İçerik -->
    <div class="container">
      <!-- Başlık ve Butonlar -->
      <div class="header">
        <div class="buttons">
          <button class="primary-btn" @click="showNewDefinition = true">{{ $t('definition.new') }}</button>
          <button class="secondary-btn" @click="showExcelModal = true">{{ $t('definition.excel') }}</button>
        </div>
      </div>

      <!-- Tablo -->
      <table class="table">
        <thead>
          <tr>
            <th>{{ $t('definition.name') }}</th>
            <th>{{ $t('definition.category') }}</th>
            <th>{{ $t('definition.priority') }}</th>
            <th>{{ $t('definition.status') }}</th>
            <th>{{ $t('common.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in sortingRules" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.category }}</td>
            <td>{{ $t(`definition.priorityLevels.${item.priority}`) }}</td>
            <td>
              <span :class="{ 'active': item.status === 'Aktif', 'inactive': item.status === 'Pasif' }">
                {{ $t(`definition.statuses.${item.status}`) }}
              </span>
            </td>
            <td>
              <button class="edit-btn">✏️</button>
              <button class="delete-btn">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Yeni Tanım Modalı -->
    <div v-if="showNewDefinition" class="modal">
      <div class="modal-content">
        <h3>{{ $t('definition.newTitle') }}</h3>
        <input type="text" :placeholder="$t('definition.namePlaceholder')" v-model="newDefinition.name" />
        <input type="text" :placeholder="$t('definition.categoryPlaceholder')" v-model="newDefinition.category" />
        <select v-model="newDefinition.priority">
          <option value="Yüksek">{{ $t('definition.priorityLevels.Yüksek') }}</option>
          <option value="Orta">{{ $t('definition.priorityLevels.Orta') }}</option>
          <option value="Düşük">{{ $t('definition.priorityLevels.Düşük') }}</option>
        </select>
        <button class="save-btn" @click="saveDefinition">{{ $t('common.save') }}</button>
        <button class="close-btn" @click="showNewDefinition = false">{{ $t('common.close') }}</button>
      </div>
    </div>

    <!-- Excel Modalı -->
    <div v-if="showExcelModal" class="modal">
      <div class="modal-content">
        <h3>{{ $t('definition.excelTitle') }}</h3>
        <p>{{ $t('definition.excelInfo') }}</p>
        <button class="download-btn">📥 {{ $t('common.download') }}</button>
        <button class="close-btn" @click="showExcelModal = false">{{ $t('common.close') }}</button>
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
      sortingRules: [
        { id: 1, name: "Öne Çıkan Ürünler", category: "Elektronik", priority: "Yüksek", status: "Aktif" },
        { id: 2, name: "İndirimdekiler", category: "Giyim", priority: "Orta", status: "Pasif" },
      ],
      showNewDefinition: false,
      showExcelModal: false,
      newDefinition: { name: "", category: "", priority: "Orta" },
    };
  },
  methods: {
    saveDefinition() {
      if (this.newDefinition.name && this.newDefinition.category) {
        this.sortingRules.push({
          id: this.sortingRules.length + 1,
          ...this.newDefinition,
          status: "Aktif",
        });
        this.newDefinition = { name: "", category: "", priority: "Orta" };
        this.showNewDefinition = false;
      }
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
}

/* Başlık ve Butonlar */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.primary-btn, .secondary-btn {
  padding: 10px 14px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
}
.primary-btn {
  background-color: #2f80ed;
  color: white;
}
.primary-btn:hover {
  background-color: #1e60c7;
}
.secondary-btn {
  background-color: #e0e0e0;
  color: #333;
}
.secondary-btn:hover {
  background-color: #cfcfcf;
}

/* Tablo */
.table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
}

.table thead {
  background-color: #4b5563;
  color: white;
}

.table th, .table td {
  padding: 12px;
  border: 1px solid #e0e0e0;
  text-align: left;
  font-size: 14px;
}

.active {
  color: #10b981;
  font-weight: bold;
}

.inactive {
  color: #ef4444;
  font-weight: bold;
}

.edit-btn,
.delete-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-right: 5px;
}

/* Modal */
.modal {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-content {
  background: white;
  padding: 25px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.modal-content h3 {
  margin-bottom: 10px;
  font-size: 18px;
}

.modal-content input,
.modal-content select {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
}

.save-btn, .close-btn, .download-btn {
  padding: 10px 14px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
}

.save-btn {
  background-color: #2f80ed;
  color: white;
}
.save-btn:hover {
  background-color: #1e60c7;
}

.download-btn {
  background-color: #27ae60;
  color: white;
}
.download-btn:hover {
  background-color: #219150;
}

.close-btn {
  background-color: #ef4444;
  color: white;
}
.close-btn:hover {
  background-color: #dc2626;
}

/* Dark Mode */
:root.dark .container {
  background-color: #111827;
  color: white;
}

:root.dark .table {
  background-color: #1f2937;
  color: white;
}

:root.dark .table thead {
  background-color: #374151;
}

:root.dark .modal-content {
  background-color: #1f2937;
  color: white;
}

:root.dark .modal-content input,
:root.dark .modal-content select {
  background: #111827;
  color: white;
  border: 1px solid #374151;
}

/* ✅ Responsive */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }

  .modal-content {
    width: 95%;
    padding: 20px;
  }

  .primary-btn,
  .secondary-btn,
  .save-btn,
  .close-btn,
  .download-btn {
    width: 100%;
  }
}
</style>
