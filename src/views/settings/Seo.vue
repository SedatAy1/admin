<template>
  <div class="seo-settings-container">
    <h1 class="title">{{ $t('seo.title') }}</h1>

    <!-- Varsayılan SEO Alanları -->
    <div class="card">
      <h2 class="section-title">{{ $t('seo.default.title') }}</h2>
      <p class="description">{{ $t('seo.default.description') }}</p>

      <div class="form-grid">
        <div class="form-group">
          <label>
            {{ $t('seo.fields.title') }} <span class="count">({{ seo.title.length }})</span>
          </label>
          <input v-model="seo.title" type="text" />
        </div>
        <div class="preview-box">
          <span class="domain">demo.eticaret.tv.tr</span>
          <strong class="preview-title">{{ seo.title }}</strong>
        </div>

        <div class="form-group">
          <label>
            {{ $t('seo.fields.description') }} <span class="count">({{ seo.description.length }})</span>
          </label>
          <textarea v-model="seo.description" rows="2" />
        </div>

        <div class="form-group">
          <label>
            {{ $t('seo.fields.keywords') }} <span class="count">({{ seo.keywords.length }})</span>
          </label>
          <textarea v-model="seo.keywords" rows="2" />
        </div>
      </div>
    </div>

    <!-- Sayfa Bazlı SEO Listesi -->
    <div class="card">
      <h2 class="section-title">{{ $t('seo.pages.title') }}</h2>
      <table class="seo-table">
        <thead>
          <tr>
            <th>{{ $t('seo.pages.page') }}</th>
            <th>{{ $t('seo.pages.seoTitle') }}</th>
            <th>{{ $t('seo.pages.seoDescription') }}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in seoPages" :key="item.key">
            <td>{{ item.page }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.description }}</td>
            <td>
              <button class="edit-button">{{ $t('common.edit') }}</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <button class="save-button">✓ {{ $t('common.save') }}</button>
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
  { page: '404 Hata Sayfası', title: '{cevir(404_hata)}', description: '{varsayilan_aciklama}', key: '404' }
])
</script>

<style scoped>
.seo-settings-container {
  padding: 32px;
  background: #f9fafb;
  font-family: 'Inter', sans-serif;
  transition: background-color 0.3s ease, color 0.3s ease;
}
html.dark .seo-settings-container {
  background: #1e1e1e;
  color: #f1f1f1;
}

/* Başlık */
.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
  color: #1e293b;
}
html.dark .title {
  color: #ffffff;
}

/* Kart */
.card {
  background: white;
  padding: 24px;
  margin-bottom: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: background-color 0.3s ease;
}
html.dark .card {
  background: #2c2c2c;
}

/* Bölüm başlığı */
.section-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #1e293b;
}
html.dark .section-title {
  color: #f1f1f1;
}

/* Açıklama */
.description {
  font-size: 14px;
  color: #64748b;
  margin-bottom: 20px;
}
html.dark .description {
  color: #a1a1aa;
}

/* Grid sistem */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
  align-items: flex-start;
}
@media (max-width: 640px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}

/* Form alanları */
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
  font-size: 14px;
  background-color: white;
  color: #1f2937;
  width: 100%;
  box-sizing: border-box;
}
html.dark input,
html.dark textarea {
  background-color: #3a3a3a;
  border-color: #555;
  color: #f1f1f1;
}

/* Önizleme kutusu */
.preview-box {
  background: #f1f5f9;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  width: 100%;
}
html.dark .preview-box {
  background: #2a2a2a;
  color: #e5e5e5;
}

/* Alanlar */
.domain {
  display: block;
  color: #94a3b8;
  font-size: 13px;
}
html.dark .domain {
  color: #cbd5e1;
}

.preview-title {
  color: #1d4ed8;
  font-weight: 500;
}
html.dark .preview-title {
  color: #60a5fa;
}

/* Tablo */
.seo-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
  overflow-x: auto;
}
.seo-table th,
.seo-table td {
  border: 1px solid #e5e7eb;
  padding: 10px;
  text-align: left;
  font-size: 14px;
}
html.dark .seo-table th,
html.dark .seo-table td {
  border-color: #444;
  background-color: #2e2e2e;
  color: #f1f1f1;
}

/* Butonlar */
.edit-button {
  background: #facc15;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}
html.dark .edit-button {
  background: #fde047;
  color: #1f1f1f;
}

.save-button {
  background: #3b82f6;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  margin-top: 24px;
  transition: background-color 0.3s ease;
  width: 100%;
  max-width: 200px;
}
.save-button:hover {
  background-color: #2563eb;
}

/* Karakter sayacı */
.count {
  color: #94a3b8;
  font-size: 12px;
  margin-left: 6px;
}
html.dark .count {
  color: #cbd5e1;
}

/* Mobil görünüm için ayarlamalar */
@media (max-width: 480px) {
  .title {
    font-size: 20px;
  }

  .save-button {
    width: 100%;
  }

  .form-grid {
    gap: 16px;
  }

  input,
  textarea {
    font-size: 13px;
  }
}
</style>