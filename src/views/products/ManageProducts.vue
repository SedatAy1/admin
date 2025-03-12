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
/* Genel Stil */
.manage-products {
  padding: 20px;
}

/* Filtreleme Bölümü */
.filter-container {
  background: #0d47a1;
  color: white;
  border-radius: 8px;
  margin-bottom: 15px;
  padding: 15px;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
}

.filter-content {
  background: white;
  padding: 15px;
  border-radius: 8px;
}

.filter-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  width: 30%;
}

.filter-group label {
  font-size: 14px;
  margin-bottom: 5px;
  color: black;
}

.filter-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.range-inputs {
  display: flex;
  align-items: center;
  gap: 5px;
}

.filter-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.filter-btn {
  padding: 8px 15px;
  border: none;
  background: #003c8f;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.clear-btn {
  padding: 8px 15px;
  border: none;
  background: #f8f9fa;
  color: black;
  border-radius: 5px;
  cursor: pointer;
}

/* Bilgi Kutuları */
.info-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.info-box {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  width: 30%;
}

.info-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.info-value {
  font-size: 24px;
  font-weight: bold;
  color: #003c8f;
  margin-bottom: 5px;
}

.info-text {
  font-size: 14px;
  color: #666;
}

/* Yeni Ürün Butonu */
.add-product-btn {
  display: block;
  margin: 20px 0;
  padding: 10px 15px;
  border: none;
  background: #003c8f;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

/* Modal Stilleri */
.modal-body {
  padding: 20px;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.tabs button {
  padding: 8px 12px;
  border: none;
  background: #f0f0f0;
  cursor: pointer;
  border-radius: 5px;
}

.tabs button.active {
  background: #007bff;
  color: white;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.submit-btn{
    width: 100%;
    padding: 10px;
    background: #007bff;
    color: white;
    border: none;
    cursor: pointer;
     font-size: 16px;
     border-radius: 5px;
}
.button-container {
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
}

.add-product-btn {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

.add-product-btn:hover {
  background-color: #0056b3;
}

.modal-body {
  padding: 20px;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.tabs button {
  padding: 8px 12px;
  border: none;
  background: #f0f0f0;
  cursor: pointer;
  border-radius: 5px;
}

.tabs button.active {
  background: #007bff;
  color: white;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.submit-btn {
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
}
/* Ürün Listesi Genel Stil */
.product-list {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Tablo Başlık */
.product-list thead {
  background: #f4f6f8;
  font-weight: bold;
}

.product-list th {
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #ddd;
  font-size: 14px;
  color: #333;
}

/* Tablo İçeriği */
.product-list tbody tr {
  transition: background 0.2s;
}

.product-list tbody tr:hover {
  background: #f9f9f9;
}

.product-list td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
  color: #444;
}

/* Ürün Görseli */
.product-list .product-image {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  object-fit: cover;
}

/* Yayında / Pasif Durumları */
.product-status {
  font-size: 13px;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 5px;
  display: inline-block;
}

.status-active {
  color: #2e7d32;
  background: #e8f5e9;
}

.status-passive {
  color: #d32f2f;
  background: #ffebee;
}

/* Marketplaces Logoları */
.marketplaces img {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

/* Fiyat ve Stok */
.price, .stock {
  font-weight: bold;
}

/* İşlem Butonu */
.action-btn {
  background: #007bff;
  color: white;
  padding: 6px 10px;
  border-radius: 5px;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.2s;
}

.action-btn:hover {
  background: #0056b3;
}
</style>
