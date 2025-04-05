<template>
  <div class="email-groups-container">
    <!-- Üst Kısım: Arama ve Buton -->
    <div class="header-section">
      <input type="text" class="search-input" placeholder="🔍 Ara...">
      <button class="btn btn-primary" @click="openNewGroupModal">
        ➕ Yeni Grup
      </button>
    </div>

    <!-- Tablo (Boşsa "Kayıt Bulunamadı" göster) -->
    <div class="table-container">
      <table v-if="emailGroups.length > 0">
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
          <tr v-for="(group, index) in emailGroups" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ group.id }}</td>
            <td>{{ group.name }}</td>
            <td>{{ group.default ? '✅' : '❌' }}</td>
            <td>
              <button class="btn btn-sm btn-danger" @click="deleteGroup(index)">❌ Sil</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Eğer hiç grup yoksa -->
      <div v-else class="empty-state">
        <img src="@/assets/empty.svg" alt="No Data" />
        <p>Kayıt bulunamadı.</p>
      </div>
    </div>
  </div>

  <!-- Yeni Grup Modalı -->
  <div v-if="showNewGroupModal" class="modal-overlay">
    <div class="modal">
      <div class="modal-header">
        <h2>Yeni Bülten Grubu</h2>
        <button class="close-btn" @click="closeNewGroupModal">✖</button>
      </div>

      <div class="form-group">
        <label>Grup Adı:</label>
        <input type="text" v-model="newGroup.name" />
      </div>

      <div class="form-group">
        <label>Varsayılan:</label>
        <select v-model="newGroup.default">
          <option :value="true">Aktif</option>
          <option :value="false">Pasif</option>
        </select>
      </div>

      <div class="modal-buttons">
        <button class="btn btn-primary" @click="saveGroup">Kaydet</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      emailGroups: [],
      showNewGroupModal: false,
      newGroup: {
        name: "",
        default: false,
      },
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
      if (!this.newGroup.name.trim()) {
        alert("Grup adı boş olamaz!");
        return;
      }
      this.emailGroups.push({
        id: this.emailGroups.length + 1,
        name: this.newGroup.name,
        default: this.newGroup.default,
      });
      this.newGroup.name = "";
      this.newGroup.default = false;
      this.closeNewGroupModal();
    },
    deleteGroup(index) {
      this.emailGroups.splice(index, 1);
    },
  },
};
</script>

<style scoped>
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

.empty-state {
  text-align: center;
  padding: 30px;
}

.empty-state img {
  width: 100px;
  opacity: 0.5;
}

/* Modal Overlay (Arka Plan) */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Daha koyu yap, şeffaflık artırıldı */
  z-index: 99998 !important; /* Üst katmanda olsun */
  display: flex !important; /* Emin olmak için */
  justify-content: center;
  align-items: center;
  visibility: visible !important; /* Eğer gizliyse göster */
}

/* Modal İçeriği */
.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 500px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 99999 !important; /* Modal her şeyin üstünde olsun */
  display: block !important; /* Eğer hala görünmüyorsa, ekle */
  position: relative;
  transform: translateY(0); /* Modal kaybolmasın */
  opacity: 1 !important;
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

.modal-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.form-group {
  margin-bottom: 15px;
}

input, select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>