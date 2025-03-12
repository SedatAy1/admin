<template>
  <div>

    <!-- Ana İçerik -->
    <div class="container">
      <!-- Başlık ve Butonlar -->
      <div class="header">
        <div class="buttons">
          <button class="primary-btn" @click="showNewDefinition = true">+ Yeni Tanım</button>
          <button class="secondary-btn" @click="showExcelModal = true">📥 Excel İşlemleri</button>
        </div>
      </div>

      <!-- Tablo -->
      <table class="table">
        <thead>
          <tr>
            <th>Tanım Adı</th>
            <th>Kategori</th>
            <th>Öncelik</th>
            <th>Durum</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in sortingRules" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.priority }}</td>
            <td>
              <span :class="{'active': item.status === 'Aktif', 'inactive': item.status === 'Pasif'}">
                {{ item.status }}
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
        <h3>Yeni Tanım Oluştur</h3>
        <input type="text" placeholder="Tanım Adı" v-model="newDefinition.name" />
        <input type="text" placeholder="Kategori" v-model="newDefinition.category" />
        <select v-model="newDefinition.priority">
          <option value="Yüksek">Yüksek</option>
          <option value="Orta">Orta</option>
          <option value="Düşük">Düşük</option>
        </select>
        <button class="save-btn" @click="saveDefinition">Kaydet</button>
        <button class="close-btn" @click="showNewDefinition = false">Kapat</button>
      </div>
    </div>

    <!-- Excel Modalı -->
    <div v-if="showExcelModal" class="modal">
      <div class="modal-content">
        <h3>Excel İşlemleri</h3>
        <p>Tüm veriler Excel olarak dışarı aktarılacaktır.</p>
        <button class="download-btn">📥 İndir</button>
        <button class="close-btn" @click="showExcelModal = false">Kapat</button>
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
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
.primary-btn, .secondary-btn {
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  font-weight: bold;
}
.primary-btn {
  background-color: #2f80ed;
  color: white;
  border-radius: 5px;
}
.secondary-btn {
  background-color: #ccc;
  border-radius: 5px;
}
.table {
  width: 100%;
  border-collapse: collapse;
}
.table th, .table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
.modal {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  min-width: 300px;
}
.save-btn, .close-btn, .download-btn {
  margin-top: 10px;
  padding: 8px 12px;
  font-weight: bold;
}
.save-btn {
  background-color: #2f80ed;
  color: white;
}
.download-btn {
  background-color: #27ae60;
  color: white;
}
.close-btn {
  background-color: red;
  color: white;
}
</style>
