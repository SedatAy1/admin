<template>
  <div class="assembly-points">
    <h2 class="title">Montaj Noktaları</h2>
    <input v-model="search" type="text" placeholder="🔍 Ara..." class="search-box" />

    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Firma Adı</th>
          <th>Telefon</th>
          <th>İl</th>
          <th>İlçe</th>
          <th>İşlemler</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="filteredPoints.length === 0">
          <td colspan="6" class="empty">
            <img src="https://www.svgrepo.com/show/397426/empty-box.svg" alt="empty" width="80" />
            <p>Kayıt bulunamadı.</p>
          </td>
        </tr>
        <tr v-for="(point, index) in filteredPoints" :key="point.id">
          <td>{{ index + 1 }}</td>
          <td>{{ point.company }}</td>
          <td>{{ point.phone }}</td>
          <td>{{ point.city }}</td>
          <td>{{ point.district }}</td>
          <td>
            <button class="action-btn">Düzenle</button>
            <button class="action-btn delete">Sil</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')
const points = ref([]) // API'den gelecek veya elle eklenecek

const filteredPoints = computed(() => {
  return points.value.filter(point =>
    point.company.toLowerCase().includes(search.value.toLowerCase())
  )
})
</script>

<style scoped>
.assembly-points {
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
}

.title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #1e293b;
}

.search-box {
  padding: 10px 14px;
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  border: 2px solid #d1d5db;
  font-size: 14px;
  margin-bottom: 24px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background-color: #f9fafb;
}

.table th,
.table td {
  padding: 12px 14px;
  text-align: left;
  font-size: 14px;
  border-bottom: 1px solid #e5e7eb;
}

.table th {
  background-color: #f1f5f9;
  font-weight: 600;
  color: #1f2937;
}

.empty {
  text-align: center;
  padding: 40px 0;
  color: #6b7280;
  font-size: 15px;
}

.action-btn {
  padding: 6px 10px;
  font-size: 13px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  margin-right: 8px;
  background-color: #e5e7eb;
  color: #1f2937;
  transition: 0.2s;
}

.action-btn:hover {
  background-color: #d1d5db;
}

.action-btn.delete {
  background-color: #fee2e2;
  color: #b91c1c;
}

.action-btn.delete:hover {
  background-color: #fca5a5;
}
</style>
