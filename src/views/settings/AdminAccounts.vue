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
  color: #1f2937;
}
html.dark .title {
  color: #f1f5f9;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 10px;
}

.search-input {
  padding: 8px;
  width: 100%;
  max-width: 240px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
}
html.dark .search-input {
  background-color: #1f2937;
  border-color: #475569;
  color: #f1f5f9;
}

.add-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}
.add-btn:hover {
  background-color: #2563eb;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
}
html.dark .table {
  background-color: #1e293b;
}

.table th,
.table td {
  padding: 10px;
  border-bottom: 1px solid #eee;
  text-align: left;
  color: #1f2937;
}
html.dark .table th,
html.dark .table td {
  border-color: #334155;
  color: #f1f5f9;
}

.no-data {
  text-align: center;
  color: #888;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
}
html.dark .no-data {
  color: #9ca3af;
}

.pagination {
  margin-top: 20px;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  align-items: center;
}
.pagination button {
  padding: 6px 10px;
  border: none;
  background: #f3f4f6;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  color: #1f2937;
}
html.dark .pagination button {
  background: #334155;
  color: #f1f5f9;
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
html.dark .total {
  color: #9ca3af;
}

/* 🔄 Responsive Tablo Görünümü */
@media (max-width: 768px) {
  .table thead {
    display: none;
  }

  .table tbody tr {
    display: block;
    background: #ffffff;
    margin-bottom: 16px;
    border-radius: 8px;
    padding: 12px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  }

  html.dark .table tbody tr {
    background: #1e293b;
  }

  .table td {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border: none;
    border-bottom: 1px solid #e5e7eb;
  }

  .table td::before {
    content: attr(data-label);
    font-weight: 600;
    color: #6b7280;
  }

  .table td:last-child {
    border-bottom: none;
  }
}

/* Diğer responsive detaylar */
@media (max-width: 640px) {
  .top-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .add-btn {
    width: 100%;
  }

  .pagination {
    justify-content: center;
  }

  .total {
    text-align: center;
  }
}
</style>