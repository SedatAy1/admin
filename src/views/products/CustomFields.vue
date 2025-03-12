<template>
  <div class="custom-fields">
    <!-- Arama ve Yeni Özel Alan Butonu -->
    <div class="header">
      <input type="text" placeholder="🔍 Ara..." v-model="searchTerm" class="search-bar" />
      <button class="btn primary" @click="showNewFieldModal = true">+ Yeni Özel Alan</button>
    </div>

    <!-- Özel Alanları Listeleyen Tablo -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>No</th>
            <th>Özel Alan Adı</th>
            <th>Özel Alan Tipi</th>
            <th>Durum</th>
            <th>Zorunlu</th>
            <th>Sıra</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="customFields.length === 0">
            <td colspan="8" class="no-data">
              <img src="@/assets/no-data.png" alt="Kayıt Bulunamadı" />
              <p>Kayıt bulunamadı.</p>
            </td>
          </tr>
          <tr v-for="(field, index) in filteredFields" :key="field.id">
            <td>{{ index + 1 }}</td>
            <td>{{ field.id }}</td>
            <td>{{ field.name }}</td>
            <td>{{ field.type }}</td>
            <td :class="field.status === 'Aktif' ? 'active' : 'passive'">{{ field.status }}</td>
            <td>
              <span v-if="field.required">✅</span>
              <span v-else>❌</span>
            </td>
            <td>{{ field.order }}</td>
            <td>
              <button class="action-btn">İşlemler ⏷</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Yeni Özel Alan Modalı -->
    <Modal :isOpen="showNewFieldModal" title="Yeni Özel Alan" @close="showNewFieldModal = false">
      <div class="modal-body">
        <div class="form-group">
          <label>Özel Alan Adı <span class="required">Zorunlu</span></label>
          <input type="text" v-model="newField.name" />
        </div>
        <div class="form-group">
          <label>Özel Alan Tipi</label>
          <select v-model="newField.type">
            <option>Metin Kutusu</option>
            <option>Seçim Kutusu</option>
            <option>Dosya Yükleme</option>
          </select>
        </div>
        <div class="form-group">
          <label>Kısa Açıklama</label>
          <textarea v-model="newField.description"></textarea>
        </div>
        <div class="form-group">
          <label>Durum <span class="required">Zorunlu</span></label>
          <select v-model="newField.status">
            <option>Aktif</option>
            <option>Pasif</option>
          </select>
        </div>
        <div class="form-group">
          <label>Sıra</label>
          <input type="number" v-model="newField.order" />
        </div>
        <div class="form-group switch-group">
          <label>Zorunlu</label>
          <input type="checkbox" v-model="newField.required" />
        </div>
      </div>
      <template v-slot:footer>
        <button class="submit-btn" @click="saveField">✔ Kaydet</button>
      </template>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";

export default {
  name: "CustomFields",
  components: { Modal },
  data() {
    return {
      showNewFieldModal: false, // Yeni özel alan modalını kontrol eder
      searchTerm: "",
      customFields: [], // Özel alanları tutacak liste
      newField: {
        name: "",
        type: "Metin Kutusu",
        description: "",
        status: "Aktif",
        order: 0,
        required: false,
      },
    };
  },
  computed: {
    filteredFields() {
      if (!this.searchTerm) return this.customFields;
      return this.customFields.filter((field) =>
        field.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
  methods: {
    saveField() {
      this.customFields.push({
        id: this.customFields.length + 1,
        name: this.newField.name,
        type: this.newField.type,
        description: this.newField.description,
        status: this.newField.status,
        order: this.newField.order,
        required: this.newField.required,
      });
      this.showNewFieldModal = false;
      this.newField = { name: "", type: "Metin Kutusu", description: "", status: "Aktif", order: 0, required: false };
    },
  },
};
</script>

<style scoped>
.custom-fields {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.search-bar {
  padding: 10px;
  width: 250px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.primary {
  background: #003c8f;
  color: white;
}

.table-container {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #f4f4f4;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
}

.active {
  color: green;
}

.passive {
  color: red;
}

.no-data {
  text-align: center;
  padding: 20px;
}

.no-data img {
  width: 100px;
}

.action-btn {
  background: #003c8f;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal-body {
  padding: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.form-group label {
  font-weight: bold;
}

.required {
  color: red;
  font-size: 12px;
}

.switch-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.submit-btn {
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
}
</style>
