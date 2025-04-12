<template>
  <div>
    <!-- Web Servis Ayarları -->
    <section class="web-service-settings">
      <div class="alert">Web servisi paketinizde bulunmamaktadır. Web servisi kullanmak için sistem yöneticiniz ile iletişime geçin.</div>

      <div class="toolbar">
        <input type="text" placeholder="🔍 Ara..." class="search" />
        <button class="btn primary">+ Yeni Kullanıcı</button>
        <button class="btn">API Dökümanını İndir</button>
        <button class="btn">Örnek Kodları İndir</button>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th>Kullanıcı No</th>
            <th>Kullanıcı Adı</th>
            <th>Kullanıcı Durumu</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="4" class="no-data">Kayıt bulunamadı.</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- Yeni Kullanıcı Modalı (Açıldığında görünür olacak) -->
    <section class="web-service-modal">
      <div class="modal-header">Yeni Web Servis Kullanıcısı</div>
      <div class="modal-body">
        <label>
          Kullanıcı Adı
          <input type="text" placeholder="Zorunlu" />
        </label>

        <label>
          Kullanıcı Durumu
          <select>
            <option>Aktif</option>
            <option>Pasif</option>
          </select>
        </label>

        <label>
          Yetkiler
          <select>
            <option>Seçilmedi</option>
          </select>
        </label>

        <label>
          API Key
          <input type="text" value="78e421ea-3e00-48a8-99de-1c12e64082d4" readonly />
        </label>

        <label>
          API Secret
          <input type="text" value="397e5486bc91b5b58afebe0b7e4fb1c64QoZUZ4X2quaC/+9sQ==" readonly />
        </label>
      </div>
      <div class="modal-footer">
        <button class="btn primary">✓ Kaydet</button>
      </div>
    </section>
  </div>
</template>

<script setup>

</script>

<style scoped>
.alert {
  background: #dc2626;
  color: white;
  padding: 10px 16px;
  margin-bottom: 20px;
  border-radius: 6px;
}

.toolbar {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.search {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
  max-width: 240px;
}
html.dark .search {
  background-color: #1f2937;
  border-color: #475569;
  color: #f1f5f9;
}

.btn {
  padding: 8px 12px;
  background: #e5e7eb;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  color: #1f2937;
}
html.dark .btn {
  background: #374151;
  color: #f1f5f9;
}

.btn.primary {
  background: #3b82f6;
  color: white;
}
.btn.primary:hover {
  background-color: #2563eb;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
}
html.dark .table {
  background-color: #1e293b;
}

.table th, .table td {
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
  color: #6b7280;
  padding: 40px 0;
}
html.dark .no-data {
  color: #9ca3af;
}

.web-service-modal {
  margin-top: 40px;
  background: #f9fafb;
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 10px;
}
html.dark .web-service-modal {
  background-color: #1f2937;
  border-color: #334155;
  color: #f1f5f9;
}

.modal-header {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
}

.modal-body label {
  display: block;
  margin-bottom: 10px;
}

.modal-body input,
.modal-body select {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}
html.dark .modal-body input,
html.dark .modal-body select {
  background-color: #334155;
  border-color: #475569;
  color: #f1f5f9;
}

.modal-footer {
  margin-top: 16px;
  text-align: right;
}

/* Responsive destek */
@media (max-width: 768px) {
  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>