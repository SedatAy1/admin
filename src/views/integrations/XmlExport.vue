<template>
  <MarketLayout>
    <div class="xml-export-container">
      <section class="ready-xml-section">
        <h2 class="section-title">Hazır XML Çıktıları</h2>
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

      <section class="export-section">
        <h2 class="section-title">XML Dışarı Aktar</h2>
        <div class="export-header">
          <input type="text" placeholder="🔍 Ara..." class="search-input" v-model="searchQuery" />
          <button class="button-primary" @click="openModal">+ Yeni Veri</button>
        </div>
        <table class="export-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Veri No</th>
              <th>Adı</th>
              <th>Format</th>
              <th>Link</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="data in filteredXmlData" :key="data.id">
              <td>{{ data.id }}</td>
              <td>{{ data.dataNo }}</td>
              <td>{{ data.name }}</td>
              <td>{{ data.format }}</td>
              <td><a :href="data.link" target="_blank" class="xml-link">{{ data.link }}</a></td>
              <td>
                <button class="button-dropdown">İşlemler ▼</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <div v-if="modalOpen" class="modal-overlay">
        <div class="modal-content">
          <h2 class="modal-title">Yeni XML Kaynağı</h2>
          <form @submit.prevent="saveData">
            <div class="form-grid">
              <label>Adı</label>
              <input type="text" v-model="formData.name" required class="input-field" />

              <label>Format</label>
              <select v-model="formData.format" class="select-field">
                <option>XML</option>
                <option>JSON</option>
              </select>

              <label>Komisyon Oranı (%)</label>
              <input type="number" v-model="formData.commissionRate" class="input-field" />

              <label>Kategoriler</label>
              <select v-model="formData.categories" class="select-field">
                <option>Hiçbiri seçilmedi</option>
              </select>

              <label>Ürün Kaynağı</label>
              <select v-model="formData.productSource" class="select-field">
                <option>Hiçbiri seçilmedi</option>
              </select>

              <label>Markalar</label>
              <select v-model="formData.brands" class="select-field">
                <option>Hiçbiri seçilmedi</option>
              </select>

              <label>Minimum Stok Miktarı</label>
              <input type="number" v-model="formData.minStock" class="input-field" />
            </div>
            <div class="button-group">
              <button class="button-primary" type="submit">Kaydet</button>
              <button class="button-secondary" @click="closeModal">İptal</button>
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
  transition: box-shadow 0.3s ease-in-out;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 18px;
  color: #1f2937;
}

.ready-xml-list {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.xml-card {
  display: flex;
  align-items: center;
  background: white;
  padding: 18px;
  border-radius: 14px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.12);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  cursor: pointer;
}

.xml-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
}

.xml-icon {
  width: 40px;
  height: 40px;
  margin-right: 16px;
}

.xml-link {
  color: #007aff;
  font-weight: 600;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: color 0.2s ease-in-out;
}

.xml-link:hover {
  color: #005bb5;
  text-decoration: underline;
}

.button-primary {
  background: linear-gradient(135deg, #4f46e5, #3b82f6);
  color: white;
  padding: 14px 22px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease-in-out;
  border: none;
}

.button-primary:hover {
  background: linear-gradient(135deg, #4338ca, #2563eb);
  transform: scale(1.05);
}

.button-primary:active {
  transform: scale(0.97);
}

.export-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.search-input {
  padding: 12px;
  border: 2px solid #d1d5db;
  border-radius: 10px;
  font-size: 15px;
  outline: none;
  transition: border 0.2s ease-in-out;
}

.search-input:focus {
  border: 2px solid #4f46e5;
}

.export-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.07);
}

.export-table th, .export-table td {
  padding: 14px;
  text-align: left;
  border-bottom: 1px solid #eceff1;
}

.export-table th {
  background: #f9fafb;
  font-weight: 600;
}

.button-dropdown {
  background: transparent;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 8px 14px;
  cursor: pointer;
  transition: background 0.2s ease-in-out, transform 0.2s ease-in-out;
}

.button-dropdown:hover {
  background: #f3f4f6;
}

.button-dropdown:active {
  transform: scale(0.95);
}

</style>
