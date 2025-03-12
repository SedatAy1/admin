<template>
  <div class="attributes">
    <!-- Arama ve Butonlar -->
    <div class="header">
      <input type="text" v-model="searchQuery" placeholder="🔍 Ara..." class="search-box" />
      <button class="btn primary" @click="showNewAttributeModal = true">+ Yeni Nitelik</button>
    </div>

    <!-- Nitelik Tablosu -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nitelik No</th>
            <th>Nitelik Adı</th>
            <th>Nitelik Kodu</th>
            <th>Sıra</th>
            <th>Durum</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="attributes.length === 0">
            <td colspan="7" class="empty-state">
              <img src="@/assets/no-data.png" alt="No Data" />
              <p>Kayıt bulunamadı.</p>
            </td>
          </tr>
          <tr v-for="attribute in filteredAttributes" :key="attribute.id">
            <td><input type="checkbox" /></td>
            <td>{{ attribute.id }}</td>
            <td>{{ attribute.name }}</td>
            <td>{{ attribute.code }}</td>
            <td>{{ attribute.order }}</td>
            <td>
              <span class="status" :class="{'active': attribute.status === 'Aktif', 'inactive': attribute.status === 'Pasif'}">
                ✔ {{ attribute.status }}
              </span>
            </td>
            <td>
              <button class="action-btn">İşlemler ▼</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Yeni Nitelik Modal -->
    <Modal :isOpen="showNewAttributeModal" title="Yeni Nitelik" @close="showNewAttributeModal = false">
      <div class="modal-body">
        <div class="tab-header">
          <button :class="{ active: activeTab === 'Genel Bilgiler' }" @click="activeTab = 'Genel Bilgiler'">
            📌 Genel Bilgiler
          </button>
          <button :class="{ active: activeTab === 'Nitelik Değerleri' }" @click="activeTab = 'Nitelik Değerleri'">
            📋 Nitelik Değerleri
          </button>
        </div>

        <div v-if="activeTab === 'Genel Bilgiler'">
          <div class="form-group">
            <label>Nitelik Adı <span class="required">Zorunlu</span></label>
            <input type="text" v-model="newAttribute.name" />
          </div>
          <div class="form-group">
            <label>Nitelik Kodu</label>
            <input type="text" v-model="newAttribute.code" />
          </div>
          <div class="form-group">
            <label>Nitelik Görseli</label>
            <input type="file" />
          </div>
          <div class="form-group">
            <label>Durum <span class="required">Zorunlu</span></label>
            <select v-model="newAttribute.status">
              <option value="Aktif">Aktif</option>
              <option value="Pasif">Pasif</option>
            </select>
          </div>
          <div class="form-group">
            <label>Sıra</label>
            <input type="number" v-model="newAttribute.order" />
          </div>
        </div>

        <div v-if="activeTab === 'Nitelik Değerleri'">
          <p>Burada nitelik değerleri yönetilecek.</p>
        </div>
      </div>

      <template v-slot:footer>
        <button class="submit-btn" @click="saveAttribute">✔ Kaydet</button>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";

export default {
  name: "Attributes",
  components: { Modal },
  data() {
    return {
      showNewAttributeModal: false,
      activeTab: "Genel Bilgiler",
      searchQuery: "",
      newAttribute: {
        name: "",
        code: "",
        image: null,
        status: "Aktif",
        order: 0,
      },
      attributes: [
        
      ],
    };
  },
  computed: {
    filteredAttributes() {
      return this.attributes.filter(attr =>
        attr.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    saveAttribute() {
      this.attributes.push({
        id: this.attributes.length + 1,
        name: this.newAttribute.name,
        code: this.newAttribute.code,
        order: this.newAttribute.order,
        status: this.newAttribute.status,
      });

      this.newAttribute = { name: "", code: "", image: null, status: "Aktif", order: 0 };
      this.showNewAttributeModal = false;
    },
  },
};
</script>

<style scoped>
/* Arama ve Buton */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.search-box {
  width: 250px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Tablo */
.table-container {
  width: 100%;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  text-align: left;
}

th {
  background: #f0f0f0;
}

.empty-state {
  text-align: center;
  padding: 20px;
}

.status {
  padding: 5px 10px;
  border-radius: 4px;
}

.status.active {
  background: #d4f5d4;
  color: #228b22;
}

.status.inactive {
  background: #f5d4d4;
  color: #b22222;
}

/* Butonlar */
.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.primary {
  background: #007bff;
  color: white;
}

.action-btn {
  background: #f8f9fa;
  border: 1px solid #ccc;
  padding: 5px 8px;
  cursor: pointer;
}

/* Modal */
.modal-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 12px;
}

.form-group label {
  font-weight: bold;
}

.form-group input, .form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.tab-header {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.tab-header button {
  padding: 8px 12px;
  border: none;
  background: #f0f0f0;
  cursor: pointer;
  border-radius: 5px;
}

.tab-header button.active {
  background: #007bff;
  color: white;
}

.submit-btn {
  padding: 10px 15px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
