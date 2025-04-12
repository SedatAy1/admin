<template>
  <MarketLayout>
    <div class="xml-export-container">
      <!-- Hazır XML Çıktıları -->
      <section class="ready-xml-section">
        <h2 class="section-title">{{ $t("xmlExport.readyTitle") }}</h2>
        <div class="ready-xml-list">
          <div class="xml-card" v-for="xml in readyXmls" :key="xml.name">
            <img :src="xml.icon" :alt="xml.name" class="xml-icon" />
            <div class="xml-info">
              <h3>{{ xml.name }}</h3>
              <p>{{ xml.description }}</p>
              <a :href="xml.link" target="_blank" class="xml-link">{{ xml.link }}</a>
            </div>
          </div>
        </div>
      </section>

      <!-- XML Dışarı Aktar -->
      <section class="export-section">
        <h2 class="section-title">{{ $t("xmlExport.exportTitle") }}</h2>
        <div class="export-header">
          <input type="text" :placeholder="$t('common.search')" class="search-input" v-model="searchQuery" />
          <button class="button-primary" @click="openModal">+ {{ $t("xmlExport.addNew") }}</button>
        </div>

        <table class="export-table">
          <thead>
            <tr>
              <th>#</th>
              <th>{{ $t("xmlExport.fields.dataNo") }}</th>
              <th>{{ $t("xmlExport.fields.name") }}</th>
              <th>{{ $t("xmlExport.fields.format") }}</th>
              <th>{{ $t("xmlExport.fields.link") }}</th>
              <th>{{ $t("common.actions") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in filteredXmlData" :key="data.id">
              <td>{{ data.id }}</td>
              <td>{{ data.dataNo }}</td>
              <td>{{ data.name }}</td>
              <td>{{ data.format }}</td>
              <td><a :href="data.link" target="_blank" class="xml-link">{{ data.link }}</a></td>
              <td><button class="button-dropdown">{{ $t("common.actions") }} ▼</button></td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Modal -->
      <div v-if="modalOpen" class="modal-overlay">
        <div class="modal-content">
          <h2 class="modal-title">{{ $t("xmlExport.addNew") }}</h2>
          <form @submit.prevent="saveData">
            <div class="form-grid">
              <label>{{ $t("xmlExport.form.name") }}</label>
              <input type="text" v-model="formData.name" required class="input-field" />

              <label>{{ $t("xmlExport.form.format") }}</label>
              <select v-model="formData.format" class="select-field">
                <option>XML</option>
                <option>JSON</option>
              </select>

              <label>{{ $t("xmlExport.form.commissionRate") }}</label>
              <input type="number" v-model="formData.commissionRate" class="input-field" />

              <label>{{ $t("xmlExport.form.categories") }}</label>
              <select v-model="formData.categories" class="select-field">
                <option>{{ $t("common.noneSelected") }}</option>
              </select>

              <label>{{ $t("xmlExport.form.productSource") }}</label>
              <select v-model="formData.productSource" class="select-field">
                <option>{{ $t("common.noneSelected") }}</option>
              </select>

              <label>{{ $t("xmlExport.form.brands") }}</label>
              <select v-model="formData.brands" class="select-field">
                <option>{{ $t("common.noneSelected") }}</option>
              </select>

              <label>{{ $t("xmlExport.form.minStock") }}</label>
              <input type="number" v-model="formData.minStock" class="input-field" />
            </div>
            <div class="button-group">
              <button class="button-primary" type="submit">{{ $t("common.save") }}</button>
              <button class="button-secondary" @click="closeModal">{{ $t("common.cancel") }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </MarketLayout>
</template>

<script>
import MarketLayout from "@/views/integrations/MarketLayout.vue";

export default {
  components: { MarketLayout },
  data() {
    return {
      searchQuery: "",
      modalOpen: false,
      formData: {
        name: "",
        format: "XML",
        commissionRate: "",
        categories: "",
        productSource: "",
        brands: "",
        minStock: -9999,
      },
      xmlData: [],
      readyXmls: [
        {
          name: "Sitemap",
          description: "Bu dosya, arama motorlarına web sitesindeki sayfaları bildirir.",
          icon: "sitemap-icon.png",
          link: "sitemap.xml"
        },
        {
          name: "Google Merchant",
          description: "Google Merchant Center için gerekli XML dosyasıdır.",
          icon: "google-merchant.png",
          link: "gmerchant.xml"
        }
      ]
    };
  },
  computed: {
    filteredXmlData() {
      return this.xmlData.filter(data =>
        data.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    openModal() {
      this.modalOpen = true;
    },
    closeModal() {
      this.modalOpen = false;
    },
    saveData() {
      console.log("Veri Kaydedildi:", this.formData);
      this.closeModal();
    }
  }
};
</script>

<style scoped>
.xml-export-container {
  padding: 24px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease-in-out;
}
html.dark .xml-export-container {
  background: #181818;
  color: #f1f1f1;
}

/* Başlık */
.section-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 18px;
  color: #1f2937;
}
html.dark .section-title {
  color: #f1f1f1;
}

/* XML kart listesi */
.ready-xml-list {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

/* Kart */
.xml-card {
  display: flex;
  align-items: center;
  background: white;
  padding: 18px;
  border-radius: 14px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.12);
  transition: all 0.3s ease;
  cursor: pointer;
}
.xml-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}
html.dark .xml-card {
  background: #232323;
  color: #e4e4e4;
}

/* XML ikonu */
.xml-icon {
  width: 40px;
  height: 40px;
  margin-right: 16px;
}

/* XML link */
.xml-link {
  color: #007aff;
  font-weight: 600;
  text-decoration: none;
  display: flex;
  align-items: center;
}
.xml-link:hover {
  color: #005bb5;
  text-decoration: underline;
}
html.dark .xml-link {
  color: #60a5fa;
}
html.dark .xml-link:hover {
  color: #93c5fd;
}

/* Buton */
.button-primary {
  background: linear-gradient(135deg, #4f46e5, #3b82f6);
  color: white;
  padding: 14px 22px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
}
.button-primary:hover {
  background: linear-gradient(135deg, #4338ca, #2563eb);
  transform: scale(1.05);
}
.button-primary:active {
  transform: scale(0.97);
}

/* Üst bölüm */
.export-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
  flex-wrap: wrap;
  gap: 12px;
}

/* Arama */
.search-input {
  padding: 12px;
  border: 2px solid #d1d5db;
  border-radius: 10px;
  font-size: 15px;
  outline: none;
  transition: border 0.2s ease, box-shadow 0.2s ease;
}
.search-input:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 5px rgba(79, 70, 229, 0.4);
}
html.dark .search-input {
  background: #2e2e2e;
  color: #f1f1f1;
  border-color: #444;
}
html.dark .search-input::placeholder {
  color: #aaa;
}

/* Tablo */
.export-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.07);
}
html.dark .export-table {
  background: #232323;
}

.export-table th, .export-table td {
  padding: 14px;
  text-align: left;
  border-bottom: 1px solid #eceff1;
}
.export-table th {
  background: #f9fafb;
  font-weight: 600;
  color: #374151;
}
html.dark .export-table th {
  background: #1f1f1f;
  color: #e5e5e5;
}
html.dark .export-table td {
  border-color: #333;
  color: #dcdcdc;
}

/* Dropdown buton */
.button-dropdown {
  background: transparent;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 8px 14px;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}
.button-dropdown:hover {
  background: #f3f4f6;
}
.button-dropdown:active {
  transform: scale(0.95);
}
html.dark .button-dropdown {
  background: #2e2e2e;
  color: #f1f1f1;
  border-color: #555;
}
html.dark .button-dropdown:hover {
  background: #3a3a3a;
}

/* Responsive */
@media (max-width: 768px) {
  .export-header {
    flex-direction: column;
    align-items: stretch;
  }

  .search-input {
    width: 100%;
  }

  .xml-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>
