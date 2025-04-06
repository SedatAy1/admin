<template>
  <div class="seo-settings-container">
    <h1 class="title">SEO Ayarları</h1>

    <!-- Varsayılan SEO Alanları -->
    <div class="card">
      <h2 class="section-title">Varsayılan SEO Ayarları</h2>
      <p class="description">Sitenize ait varsayılan SEO bilgilerini aşağıdaki alanları doldurarak ayarlayabilirsiniz.</p>

      <div class="form-grid">
        <div class="form-group">
          <label>SEO Başlığı <span class="count">({{ seo.title.length }})</span></label>
          <input v-model="seo.title" type="text" />
        </div>
        <div class="preview-box">
          <span class="domain">demo.eticaret.tv.tr</span>
          <strong class="preview-title">{{ seo.title }}</strong>
        </div>

        <div class="form-group">
          <label>SEO Açıklaması <span class="count">({{ seo.description.length }})</span></label>
          <textarea v-model="seo.description" rows="2" />
        </div>

        <div class="form-group">
          <label>SEO Anahtar Kelimeleri <span class="count">({{ seo.keywords.length }})</span></label>
          <textarea v-model="seo.keywords" rows="2" />
        </div>
      </div>
    </div>

    <!-- Sayfa Bazlı SEO Listesi -->
    <div class="card">
      <h2 class="section-title">Sayfa Bazlı SEO Alanları</h2>
      <table class="seo-table">
        <thead>
          <tr>
            <th>Sayfa</th>
            <th>SEO Başlığı</th>
            <th>SEO Açıklaması</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in seoPages" :key="item.key">
            <td>{{ item.page }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.description }}</td>
            <td><button class="edit-button">✏️ Düzenle</button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <button class="save-button">✓ Kaydet</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const seo = ref({
  title: 'Eticaret.tv.tr – E-Ticaret Demosu',
  description: '',
  keywords: ''
})

const seoPages = ref([
  { page: 'Ana Sayfa', title: '{varsayilan_basilik}', description: '{varsayilan_aciklama}', key: 'home' },
  { page: 'Kategori Sayfası', title: '{kategori_seo_basilik}', description: '{kategori_seo_aciklama}', key: 'category' },
  { page: 'Ürün Arama Sonuçları', title: '{aranan_kelime}', description: '{cevir(urun_arama_sonuclari)}', key: 'search' },
  { page: 'Markalar', title: '{cevir(markalar)}', description: '{cevir(markalar)}', key: 'brands' },
  { page: 'Ürün Detay Sayfası', title: '{urun_seo_basilik}', description: '{urun_seo_aciklama}', key: 'product-detail' },
  { page: 'Blog Sayfası', title: '{cevir(blog)} | {varsayilan_basilik}', description: '{cevir(blog)} - {varsayilan_aciklama}', key: 'blog' },
  { page: 'Ödeme Sayfası', title: '{cevir(odeme_title)}', description: '{varsayilan_aciklama}', key: 'checkout' },
  { page: '404 Hata Sayfası', title: '{cevir(404_hata)}', description: '{varsayilan_aciklama}', key: '404' },
])
</script>

<style scoped>
.seo-settings-container {
  padding: 32px;
  background: #f9fafb;
  font-family: 'Inter', sans-serif;
}
.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
}
.card {
  background: white;
  padding: 24px;
  margin-bottom: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}
.section-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
}
.description {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 20px;
}
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: start;
}
.form-group {
  display: flex;
  flex-direction: column;
}
input,
textarea {
  padding: 10px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-top: 6px;
}
.preview-box {
  background: #f1f5f9;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
}
.domain {
  display: block;
  color: #94a3b8;
}
.preview-title {
  color: #1d4ed8;
  font-weight: 500;
}
.seo-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
}
.seo-table th,
.seo-table td {
  border: 1px solid #e5e7eb;
  padding: 10px;
  text-align: left;
  font-size: 14px;
}
.edit-button {
  background: #facc15;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}
.save-button {
  background: #3b82f6;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  margin-top: 24px;
}
.count {
  color: #94a3b8;
  font-size: 12px;
  margin-left: 6px;
}
</style>