<template>
  <div class="sms-container">
    <div class="header-section">
      <input type="text" class="search-input" placeholder="🔍 Ara...">
      <div class="buttons">
        <button class="btn btn-primary" @click="openNewGroupModal">
          ➕ Yeni Grup
        </button>
      </div>
    </div>

    <div class="table-container">
      <table v-if="groups.length > 0">
        <thead>
          <tr>
            <th>#</th>
            <th>Grup No</th>
            <th>Grup Adı</th>
            <th>Varsayılan</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(group, index) in groups" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ group.id }}</td>
            <td>{{ group.name }}</td>
            <td>{{ group.default ? 'Evet' : 'Hayır' }}</td>
            <td>
              <button class="btn btn-sm btn-danger" @click="deleteGroup(index)">❌ Sil</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-else class="empty-state">
        <img src="@/assets/empty.svg" alt="No Data" />
        <p>Kayıt bulunamadı.</p>
      </div>
    </div>

    <!-- Yeni Grup Modalı -->
    <div v-if="showNewGroupModal" class="modal-overlay">
      <div class="modal">
        <div class="modal-header">
          <h2>Yeni Bülten Grubu</h2>
          <button class="close-btn" @click="closeNewGroupModal">×</button>
        </div>

        <label>Grup Adı</label>
        <input type="text" v-model="newGroup.name">

        <label>Varsayılan</label>
        <select v-model="newGroup.default">
          <option value="true">Evet</option>
          <option value="false">Hayır</option>
        </select>

        <button class="btn btn-primary" @click="saveGroup">Kaydet</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      groups: [],
      showNewGroupModal: false,
      newGroup: {
        name: "",
        default: false,
      }
    };
  },
  methods: {
    openNewGroupModal() {
      this.showNewGroupModal = true;
    },
    closeNewGroupModal() {
      this.showNewGroupModal = false;
    },
    saveGroup() {
      this.groups.push({
        id: this.groups.length + 1,
        name: this.newGroup.name,
        default: this.newGroup.default,
      });
      this.closeNewGroupModal();
    },
    deleteGroup(index) {
      this.groups.splice(index, 1);
    }
  }
};
</script>

<style scoped>
/* Sayfa Genel Yapısı */
.sms-container {
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

/* Üst Kısım */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: white;
  border-bottom: 1px solid #ddd;
}

.search-input {
  width: 250px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.buttons {
  display: flex;
  gap: 10px;
}

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

/* Tablo */
.table-container {
  background: white;
  padding: 20px;
  border-radius: 10px;
  margin-top: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

th {
  background: #f3f4f6;
  font-weight: bold;
}

/* Modal Overlay (Arka Plan) */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99998 !important;
  display: flex !important;
  justify-content: center;
  align-items: center;
  visibility: visible !important;
}

/* Modal İçeriği */
.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 500px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 99999 !important;
  display: block !important;
  position: relative;
  transform: translateY(0);
  opacity: 1 !important;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

/* Giriş Alanları */
input, select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 5px;
}
</style>
