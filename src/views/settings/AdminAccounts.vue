<template>
  <div class="admin-accounts-page">
    <h2 class="title">Yönetici Hesapları</h2>
    <div class="top-bar">
      <input v-model="search" class="search-input" placeholder="🔍 Ara..." />
      <button class="add-btn" @click="openNewAdminModal">+ Yeni Yönetici</button>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>Yönetici No</th>
          <th>Kullanıcı Adı</th>
          <th>Yetki</th>
          <th>IP Kısıtlaması</th>
          <th>Saat Kısıtlaması</th>
          <th>İşlemler</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="6" class="no-data">
            <img src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png" width="48" />
            <p>Kayıt bulunamadı.</p>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button disabled>«</button>
      <button disabled>‹</button>
      <button class="active">1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
      <button>5</button>
      <button>›</button>
      <button>»</button>
    </div>
    <div class="total">7408 kayıttan 1 ile 15 arası gösteriliyor</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const search = ref('')
const openNewAdminModal = () => {
  alert('Yeni Yönetici ekleme modalı açılacak.')
}
</script>

<style scoped>
.admin-accounts-page {
  font-family: 'Inter';
  padding: 16px;
}
.title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
}
.top-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}
.search-input {
  padding: 8px;
  width: 200px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
.add-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
}
.table {
  width: 100%;
  border-collapse: collapse;
}
.table th, .table td {
  padding: 10px;
  border-bottom: 1px solid #eee;
  text-align: left;
}
.no-data {
  text-align: center;
  color: #888;
}
.pagination {
  margin-top: 20px;
  display: flex;
  gap: 4px;
  align-items: center;
}
.pagination button {
  padding: 6px 10px;
  border: none;
  background: #f3f4f6;
  border-radius: 4px;
  cursor: pointer;
}
.pagination button.active {
  background: #2563eb;
  color: white;
}
.total {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
}
</style>
