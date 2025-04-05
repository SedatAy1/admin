<template>
  <CustomersLayout>
    <div class="container">
      <div class="header">
        <input type="text" placeholder="Ara..." class="search-input" />
        <button class="new-group-btn" @click="openModal('newGroup')">+ Yeni Grup</button>
      </div>
      <table class="custom-table">
        <thead>
          <tr>
            <th>Grup No</th>
            <th>Grup Adı</th>
            <th>İskonto</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><a href="#">1</a></td>
            <td>Test Grubu</td>
            <td>%10</td>
            <td>
              <button class="dropdown-btn" @click="toggleDropdown">İşlemler</button>
              <div v-if="dropdownVisible" class="dropdown-menu">
                <p @click="quickView">🔍 Hızlı Görüntüle</p>
                <p @click="deleteGroup">🗑️ Sil</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Yeni Grup Modal -->
    <div v-if="modals.newGroup" class="modal-overlay" @click.self="closeModal('newGroup')">
      <div class="modal">
        <h2>Bayi Grupları</h2>
        <div class="form-group">
          <label>Grup Adı</label>
          <input type="text" v-model="newGroup.name" placeholder="Grup Adı" />
        </div>
        <div class="form-group">
          <label>İskonto (%)</label>
          <input type="number" v-model="newGroup.discount" placeholder="%" />
        </div>
        <div class="form-group">
          <label>Bayi Fiyat Tanımı</label>
          <select v-model="newGroup.priceType">
            <option>Varsayılan</option>
          </select>
        </div>
        <button class="save-btn" @click="saveGroup">✔ Kaydet</button>
        <button class="close-btn" @click="closeModal('newGroup')">Kapat</button>
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
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.search-input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.new-group-btn {
  padding: 8px 16px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.custom-table {
  width: 100%;
  border-collapse: collapse;
}
.custom-table th, .custom-table td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
.dropdown-btn {
  padding: 6px 12px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
}
.dropdown-menu {
  position: absolute;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 4px;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6); /* Daha koyu ve blur etkili arka plan */
  backdrop-filter: blur(4px); /* Arka planı blur yap */
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Modal İçeriği */
.modal {
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2); /* Daha belirgin gölgelendirme */
  z-index: 99999 !important;
  display: block !important;
  position: relative;
  flex-direction: column;
  transform: translateY(0);
  animation: fadeIn 0.3s ease-in-out;
  opacity: 1 !important;
}

.form-group {
  margin-bottom: 10px;
}
.save-btn, .close-btn {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
}
.save-btn {
  background: #3b82f6;
  color: white;
  border: none;
}
.close-btn {
  background: #d33;
  color: white;
  border: none;
}
</style>