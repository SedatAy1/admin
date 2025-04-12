<template>
  <div class="manage-products">
    <div class="filter-container">
      <div class="filter-header" @click="toggleFilter">
        <i class="fas fa-filter"></i>
        <span>Filtreleme Seçenekleri</span>
        <i class="fas" :class="showFilter ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
      </div>

      <div v-show="showFilter" class="filter-content">
        <div class="filter-row">
          <div class="filter-group">
            <label>Arama Terimi</label>
            <input type="text" v-model="filters.searchTerm" class="filter-input" placeholder="Arama terimi yazınız" />
          </div>

          <div class="filter-group">
            <label>Gelişmiş Filtreleme</label>
            <select v-model="filters.advancedFilter" class="filter-input">
              <option value="">Seçilmedi</option>
              <option value="yeni">Yeni Ürünler</option>
              <option value="indirim">İndirimli Ürünler</option>
            </select>
          </div>

          <div class="filter-group">
            <label>Sıralama</label>
            <select v-model="filters.sortBy" class="filter-input">
              <option value="default">Varsayılan</option>
              <option value="price">Fiyat</option>
              <option value="name">İsim</option>
            </select>
          </div>

          <div class="filter-group">
            <label>Ürün Kaynağı</label>
            <select v-model="filters.source" class="filter-input">
              <option value="">Kaynak Seçilmedi</option>
              <option value="toptan">Toptan</option>
              <option value="perakende">Perakende</option>
            </select>
          </div>
        </div>

        <div class="filter-row">
          <div class="filter-group">
            <label>Kategori</label>
            <select v-model="filters.category" class="filter-input">
              <option value="">Kategori Seçilmedi</option>
              <option value="elektronik">Elektronik</option>
              <option value="giyim">Giyim</option>
            </select>
          </div>

          <div class="filter-group">
            <label>Marka</label>
            <select v-model="filters.brand" class="filter-input">
              <option value="">Marka Seçilmedi</option>
              <option value="samsung">Samsung</option>
              <option value="apple">Apple</option>
            </select>
          </div>

          <div class="filter-group">
           <label>Ürün Etiketleri</label>
            <select v-model="filters.tags" class="filter-input">
              <option value="">Seçilmedi</option>
              <option value="popüler">Popüler</option>
              <option value="yeni">Yeni</option>
            </select>
           </div>
        </div>

        <div class="filter-row">
          <div class="filter-group">
            <label>Desi</label>
            <div class="range-inputs">
              <input type="number" v-model="filters.desiMin" class="filter-input" placeholder="0.00" />
              <span>ile</span>
              <input type="number" v-model="filters.desiMax" class="filter-input" placeholder="0.00" />
            </div>
          </div>

          <div class="filter-group">
            <label>Alış Fiyatı</label>
            <div class="range-inputs">
              <input type="number" v-model="filters.purchasePriceMin" class="filter-input" placeholder="0.00" />
              <span>ile</span>
              <input type="number" v-model="filters.purchasePriceMax" class="filter-input" placeholder="0.00" />
            </div>
          </div>

          <div class="filter-group">
            <label>Piyasa Fiyatı</label>
            <div class="range-inputs">
              <input type="number" v-model="filters.marketPriceMin" class="filter-input" placeholder="0.00" />
              <span>ile</span>
              <input type="number" v-model="filters.marketPriceMax" class="filter-input" placeholder="0.00" />
            </div>
          </div>
        </div>

        <div class="filter-actions">
          <button @click="clearFilters" class="clear-btn">Temizle</button>
          <button @click="applyFilters" class="filter-btn">Filtrele</button>
        </div>
      </div>
    </div>

    <div class="info-container">
      <div class="info-box">
        <div class="info-title">Toplam Ürün Sayısı</div>
        <div class="info-value">6.868</div>
        <div class="info-text">+ Paketinize dahil ürün sayısını önüzleyebilirsiniz.</div>
      </div>

      <div class="info-box">
        <div class="info-title">Toplam Aktif / Pasif Ürün Sayıları</div>
        <div class="info-value">6.811 - 57</div>
        <div class="info-text">- Sistemde aktif / pasif ürünlerinizi inceleyebilirsiniz.</div>
      </div>

      <div class="info-box">
        <div class="info-title">Stoğu Tükenen Ürünler</div>
        <div class="info-value">28</div>
        <div class="info-text">- Stoğu tükenen ürünlerinize hızlıca müdahale edebilirsiniz.</div>
      </div>
    </div>

    <!-- Butonu İçeriğe Göre Hizaladım -->
    <div class="button-container">
      <button class="add-product-btn" @click="showNewProductModal = true">+ Yeni Ürün</button>
    </div>

    <!-- Yeni Ürün Modalı -->
    <Modal v-if="showNewProductModal" title="Yeni Ürün" @close="showNewProductModal = false">
      <div class="modal-body">
        <!-- Sekmeler -->
        <div class="tabs">
          <button v-for="tab in tabs" :key="tab" @click="activeTab = tab" :class="{ active: activeTab === tab }">
            {{ tab }}
          </button>
        </div>

        <!-- Genel Bilgiler -->
        <div v-if="activeTab === 'Genel Bilgiler'">
          <div class="form-grid">
            <div class="form-group">
              <label>Ürün Adı <span class="required">Zorunlu</span></label>
              <input type="text" v-model="newProduct.name" />
            </div>

            <div class="form-group">
              <label>Kısa Açıklama (Ön Detay)</label>
              <input type="text" v-model="newProduct.shortDescription" />
            </div>

            <div class="form-group">
              <label>Fatura Adı</label>
              <input type="text" v-model="newProduct.invoiceName" />
            </div>

            <div class="form-group">
              <label>Site Durumu <span class="required">Zorunlu</span></label>
              <select v-model="newProduct.status">
                <option>Aktif</option>
                <option>Pasif</option>
              </select>
            </div>

            <div class="form-group">
              <label>Ürün Kaynağı</label>
              <select v-model="newProduct.source">
                <option>Eticaretvtr</option>
                <option>Hepsiburada</option>
                <option>Amazon</option>
              </select>
            </div>

            <div class="form-group">
              <label>Sıralama Önceliği</label>
              <input type="number" v-model="newProduct.priority" />
            </div>

            <div class="form-group">
              <label>Ürün Kodu</label>
              <input type="text" v-model="newProduct.code" />
            </div>

            <div class="form-group">
              <label>Barkod</label>
              <input type="text" v-model="newProduct.barcode" />
            </div>

            <div class="form-group">
              <label>Üretici Parça Numarası (MPN)</label>
              <input type="text" v-model="newProduct.mpn" />
            </div>

            <div class="form-group">
              <label>Kategori</label>
              <select v-model="newProduct.category">
                <option value="">Kategori Seçilmedi</option>
                <option value="elektronik">Elektronik</option>
                <option value="giyim">Giyim</option>
              </select>
            </div>

            <div class="form-group">
              <label>Listeleme Kategorileri</label>
              <select v-model="newProduct.listingCategory">
                <option value="">Kategori Seçilmedi</option>
                <option value="popüler">Popüler</option>
              </select>
            </div>

            <div class="form-group">
              <label>Marka</label>
              <select v-model="newProduct.brand">
                <option value="">Marka Seçilmedi</option>
                <option value="samsung">Samsung</option>
                <option value="apple">Apple</option>
              </select>
            </div>
          </div>

          <!-- Ürün Açıklaması (Metin Editörü) -->
          <div class="form-group full-width">
            <label>Ürün Açıklaması</label>
            <textarea v-model="newProduct.description" class="editor"></textarea>
          </div>
        </div>

        <!-- SEO Bilgileri -->
        <div v-if="activeTab === 'S.E.O Bilgileri'">
          <div class="form-group">
            <label>SEO Başlık</label>
            <input type="text" v-model="newProduct.seoTitle" />
          </div>
          <div class="form-group">
            <label>SEO Açıklama</label>
            <textarea v-model="newProduct.seoDescription"></textarea>
          </div>
        </div>

        <!-- Fiyat ve Kargo -->
        <div v-if="activeTab === 'Fiyat, Kargo'">
          <div class="form-group">
            <label>Fiyat</label>
            <input type="number" v-model="newProduct.price" />
          </div>
          <div class="form-group">
            <label>Kargo Ücreti</label>
            <input type="number" v-model="newProduct.shippingFee" />
          </div>
        </div>

        <div class="modal-footer">
          <button class="submit-btn" @click="saveProduct">Kaydet</button>
        </div>
      </div>
    </Modal>

  <!-- Ürün Listesi (Yeni Ürün Butonunun Altında) -->
  <div class="product-list">
      <table>
        <thead>
          <tr>
            <th>Ürün No</th>
            <th>Resim</th>
            <th>Ürün Bilgileri</th>
            <th>Site</th>
            <th>Pazaryerleri</th>
            <th>Fiyat</th>
            <th>Stok</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td><img :src="product.image" alt="Ürün Resmi" class="product-image" /></td>
            <td>{{ product.name }}</td>
            <td>{{ product.siteStatus }}</td>
            <td>{{ product.marketplaces }}</td>
            <td>{{ product.price }} TL</td>
            <td>{{ product.stock }}</td>
            <td><button class="edit-btn">Düzenle</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</template>

<script>
export default {
  name: "ManageProducts",
  data() {
    return {
      showFilter: true,
      showNewProductModal: false,
      activeTab: "Genel Bilgiler",
      tabs: [
        "Genel Bilgiler",
        "S.E.O Bilgileri",
        "Fiyat, Kargo",
        "Stok, Varyant",
        "Resimler",
        "Özellikler",
        "Diğer",
      ],
      filters: {
        searchTerm: "",
        advancedFilter: "",
        sortBy: "default",
        source: "",
        category: "",
        brand: "",
        tags: "",
        desiMin: "",
        desiMax: "",
        purchasePriceMin: "",
        purchasePriceMax: "",
        marketPriceMin: "",
        marketPriceMax: "",
      },
      newProduct: {
        name: "",
        shortDescription: "",
        invoiceName: "",
        status: "Aktif",
        source: "",
        priority: 0,
        code: "",
        barcode: "",
        mpn: "",
        category: "",
        listingCategory: "",
        brand: "",
        description: "",
        seoTitle: "",
        seoDescription: "",
        price: null,
        shippingFee: null,
      },
      products: [
        {
          id: "6868",
          name: "Optimizasyonlu Altı Üçlü Logo Baskılı Siyah Kadın Oversize Tişört",
          image: "https://via.placeholder.com/50",
          siteStatus: "✔️ Yayında",
          marketplaces: "Amazon, Hepsiburada, Trendyol",
          price: "79.90",
          stock: 2428,
        },
        {
          id: "6857",
          name: "DANIELS Baskılı Siyah Erkek Oversize Tişört",
          image: "https://via.placeholder.com/50",
          siteStatus: "✔️ Yayında",
          marketplaces: "Amazon, Hepsiburada, Trendyol",
          price: "79.90",
          stock: 2483,
        },
        {
          id: "6855",
          name: "CHE GUEVARA METAL ROOK Baskılı Siyah Kadın Oversize Tişört",
          image: "https://via.placeholder.com/50",
          siteStatus: "❌ Pasif",
          marketplaces: "Amazon, Hepsiburada, Trendyol",
          price: "60.00",
          stock: 0,
        },
      ],
    };
  },
  methods: {
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
    applyFilters() {
      console.log("Filtreler uygulandı:", this.filters);
    },
    clearFilters() {
      Object.assign(this.filters, {
        searchTerm: "",
        advancedFilter: "",
        sortBy: "default",
        source: "",
        category: "",
        brand: "",
        tags: "",
        desiMin: "",
        desiMax: "",
        purchasePriceMin: "",
        purchasePriceMax: "",
        marketPriceMin: "",
        marketPriceMax: "",
      });
    },
    saveProduct() {
      console.log("Yeni ürün kaydedildi:", this.newProduct);
      this.showNewProductModal = false;
      Object.assign(this.newProduct, {
        name: "",
        shortDescription: "",
        invoiceName: "",
        status: "Aktif",
        source: "",
        priority: 0,
        code: "",
        barcode: "",
        mpn: "",
        category: "",
        listingCategory: "",
        brand: "",
        description: "",
        seoTitle: "",
        seoDescription: "",
        price: null,
        shippingFee: null,
      });
    },
  },
};
</script>

<style scoped>
.manage-products {
  padding: 20px;
  background: #ffffff;
  min-height: 100vh;
  transition: background 0.3s ease;
}

.filter-container {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 20px;
  transition: background 0.3s ease, border-color 0.3s ease;
}

.filter-header {
  padding: 16px;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background: #0052a4;
  border-bottom: 1px solid #e5e7eb;
}

.filter-content {
  padding: 16px;
  background: #ffffff;
}

.filter-row {
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.filter-group {
  flex: 1;
  min-width: 200px;
}

.filter-group label {
  font-weight: 500;
  margin-bottom: 6px;
  display: block;
  font-size: 14px;
}

.filter-input {
  padding: 8px 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  width: 100%;
  font-size: 14px;
}

.range-inputs {
  display: flex;
  gap: 8px;
  align-items: center;
}

.filter-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.filter-btn,
.clear-btn {
  padding: 10px 16px;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.filter-btn {
  background: #2563eb;
  color: #fff;
}

.clear-btn {
  background: #f1f5f9;
  color: #1f2937;
  border: 1px solid #d1d5db;
}

/* Bilgi Kartları */
.info-container {
  display: flex;
  gap: 20px;
  margin: 20px 0;
  flex-wrap: wrap;
}

.info-box {
  flex: 1;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  min-width: 200px;
}

.info-title {
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 4px;
  color: #111827;
}

.info-value {
  font-size: 24px;
  font-weight: bold;
  color: #1d4ed8;
}

.info-text {
  font-size: 13px;
  color: #6b7280;
}

/* Yeni Ürün Butonu */
.button-container {
  margin-bottom: 20px;
}

.add-product-btn {
  background: #2563eb;
  color: #fff;
  padding: 10px 20px;
  border: none;
  font-size: 15px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.add-product-btn:hover {
  background: #1d4ed8;
}

/* Modal & Form */
.modal-body {
  padding: 20px;
}

.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 15px;
}

.tabs button {
  padding: 8px 12px;
  background: #f3f4f6;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.tabs button.active {
  background: #2563eb;
  color: white;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 500;
  margin-bottom: 5px;
  font-size: 14px;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
}

.editor {
  min-height: 100px;
  resize: vertical;
}

.submit-btn {
  background: #2563eb;
  color: white;
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  margin-top: 20px;
}

/* Ürün Listesi */
.product-list {
  margin-top: 30px;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}

.product-list table {
  width: 100%;
  border-collapse: collapse;
}

.product-list th,
.product-list td {
  padding: 12px;
  text-align: left;
  font-size: 14px;
  border-bottom: 1px solid #e5e7eb;
}

.product-list thead {
  background: #f3f4f6;
  font-weight: 600;
  color: #1f2937;
}

.product-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}

.edit-btn {
  background: #3b82f6;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}

/* 🌙 Dark Mode */
.dark-mode .manage-products {
  background: #0f172a;
  color: #e2e8f0;
}

.dark-mode .filter-container,
.dark-mode .filter-content,
.dark-mode .product-list,
.dark-mode .info-box {
  background: #1e293b;
  border-color: #334155;
}

.dark-mode .filter-header {
  background: #334155;
  color: #fff;
}

.dark-mode .filter-input,
.dark-mode .form-group input,
.dark-mode .form-group select,
.dark-mode .form-group textarea {
  background: #1e293b;
  color: #f8fafc;
  border-color: #475569;
}

.dark-mode .filter-btn {
  background: #3b82f6;
}

.dark-mode .clear-btn {
  background: #334155;
  color: #f1f5f9;
  border-color: #475569;
}

.dark-mode .info-title {
  color: #cbd5e1;
}

.dark-mode .info-value {
  color: #60a5fa;
}

.dark-mode .tabs button {
  background: #334155;
  color: #e2e8f0;
}

.dark-mode .tabs button.active {
  background: #3b82f6;
  color: white;
}

.dark-mode .submit-btn {
  background: #3b82f6;
}

.dark-mode .product-list th {
  background: #334155;
  color: #f1f5f9;
}

.dark-mode .product-list td {
  color: #e2e8f0;
}

.dark-mode .edit-btn {
  background: #3b82f6;
}

/* 📱 Responsive */
@media (max-width: 768px) {
  .filter-row {
    flex-direction: column;
  }

  .filter-group {
    width: 100%;
  }

  .info-container {
    flex-direction: column;
  }

  .tabs {
    flex-direction: column;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
