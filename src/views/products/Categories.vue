<template>
  <div class="categories">
    <div class="filter-container">
      <div class="filter-header" @click="toggleFilter">
        <i class="fas fa-filter"></i>
        <span>Filtreleme Seçenekleri</span>
        <i class="fas" :class="showFilter ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
      </div>
      <div v-show="showFilter" class="filter-content">
        <div class="filter-row">
          <div class="filter-group">
            <label>Kategori Adı</label>
            <input type="text" v-model="filters.categoryName" placeholder="Kategori adı giriniz" />
          </div>
          <div class="filter-group">
            <label>Üst Kategori</label>
            <select v-model="filters.parentCategory">
              <option value="">Seçilmedi</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
            </select>
          </div>
          <div class="filter-group">
            <label>Gelişmiş Filtreleme</label>
            <select v-model="filters.advancedFilter">
              <option value="">Seçilmedi</option>
              <option value="aktif">Aktif Kategoriler</option>
              <option value="pasif">Pasif Kategoriler</option>
            </select>
          </div>
        </div>
        <div class="filter-actions">
          <button class="clear-btn" @click="clearFilters">Temizle</button>
          <button class="filter-btn" @click="applyFilters">Filtrele</button>
        </div>
      </div>
    </div>

    <div class="buttons">
      <button class="btn primary" @click="showNewCategoryModal = true">+ Yeni Kategori</button>
      <button class="btn gold" @click="showCategoryTreeModal = true">📂 Kategori Ağacı</button>
      <button class="btn dark" @click="showQuickMatchModal = true">≡ Hızlı Kategori Eşleştirme</button>
      <button class="btn green">📊 Excel İşlemleri</button>
    </div>

    <Modal :isOpen="showNewCategoryModal" title="Yeni Kategori" @close="showNewCategoryModal = false">
      <div class="modal-body">
        <div class="form-group">
          <label>Kategori Adı</label>
          <input type="text" v-model="newCategory.name" />
        </div>
        <div class="form-group">
          <label>Üst Kategori</label>
          <select v-model="newCategory.parent">
            <option value="">Hiçbiri</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
          </select>
        </div>
        <div class="form-group">
          <label>Kategori Açıklaması</label>
          <textarea v-model="newCategory.description"></textarea>
        </div>
      </div>
      <template v-slot:footer>
        <button class="submit-btn" @click="saveCategory">Kaydet</button>
      </template>
    </Modal>

    <Modal :isOpen="showCategoryTreeModal" title="Kategori Ağacı" @close="showCategoryTreeModal = false">
      <div class="category-tree-modal">
        <div class="modal-header">
          <h2>Kategori Ağacı</h2>
          <button class="close-btn" @click="showCategoryTreeModal = false">&times;</button>
        </div>

        <div class="modal-body">
          <div class="info-box">
            <p>Bir kategoriyi başka bir kategorinin altına taşımak için sürükle bırak yapabilirsiniz.</p>
            <p>Yaptığınız değişiklikler otomatik olarak kaydedilmektedir.</p>
          </div>

          <ul class="category-list">
            <li v-for="category in localCategories" :key="category.id" class="category-item">
              <div class="category-row">
                <button class="expand-btn" @click="toggleCategory(category)">
                  {{ category.expanded ? '➖' : '➕' }}
                </button>
                <span>{{ category.name }}</span>

                <div class="category-actions">
                  <span class="category-id">(#{{ category.id }})</span>
                  <button class="action-btn link-btn">🔗</button>
                  <button class="action-btn add-btn" @click="addSubCategory(category)">➕</button>
                  <button class="action-btn view-btn">👁️</button>
                  <button class="action-btn save-btn" @click="saveCategoryTreeItem(category)">✔️</button>
                  <button class="action-btn delete-btn" @click="deleteCategory(category)">🗑️</button>
                </div>
              </div>

              <ul v-if="category.expanded && category.children.length" class="sub-category-list">
                <li v-for="subCategory in category.children" :key="subCategory.id" class="category-item">
                  <div class="category-row">
                    <button class="expand-btn" @click="toggleCategory(subCategory)">
                      {{ subCategory.expanded ? '➖' : '➕' }}
                    </button>
                    <span>{{ subCategory.name }}</span>
                    <div class="category-actions">
                      <span class="category-id">(#{{ subCategory.id }})</span>
                      <button class="action-btn link-btn">🔗</button>
                      <button class="action-btn add-btn" @click="addSubCategory(subCategory)">➕</button>
                      <button class="action-btn view-btn">👁️</button>
                      <button class="action-btn save-btn" @click="saveCategoryTreeItem(subCategory)">✔️</button>
                      <button class="action-btn delete-btn" @click="deleteCategory(subCategory)">🗑️</button>
                    </div>
                  </div>
                  <ul v-if="subCategory.expanded && subCategory.children.length" class="sub-category-list">
                    <li v-for="subSubCategory in subCategory.children" :key="subSubCategory.id" class="category-item">
                      <div class="category-row">
                        <button class="expand-btn" @click="toggleCategory(subSubCategory)">
                          {{ subSubCategory.expanded ? '➖' : '➕' }}
                        </button>
                        <span>{{ subSubCategory.name }}</span>
                        <div class="category-actions">
                          <span class="category-id">(#{{ subSubCategory.id }})</span>
                          <button class="action-btn link-btn">🔗</button>
                          <button class="action-btn add-btn" @click="addSubCategory(subSubCategory)">➕</button>
                          <button class="action-btn view-btn">👁️</button>
                          <button class="action-btn save-btn" @click="saveCategoryTreeItem(subSubCategory)">✔️</button>
                          <button class="action-btn delete-btn" @click="deleteCategory(subSubCategory)">🗑️</button>
                        </div>
                      </div>
                      <ul v-if="subSubCategory.expanded && subSubCategory.children.length" class="sub-category-list">
                        <li v-for="subSubSubCategory in subSubCategory.children" :key="subSubSubCategory.id"
                          class="category-item">
                          <div class="category-row">
                            <button class="expand-btn" @click="toggleCategory(subSubSubCategory)">
                              {{ subSubSubCategory.expanded ? '➖' : '➕' }}
                            </button>
                            <span>{{ subSubSubCategory.name }}</span>
                            <div class="category-actions">
                              <span class="category-id">(#{{ subSubSubCategory.id }})</span>
                              <button class="action-btn link-btn">🔗</button>
                              <button class="action-btn add-btn" @click="addSubCategory(subSubSubCategory)">➕</button>
                              <button class="action-btn view-btn">👁️</button>
                              <button class="action-btn save-btn" @click="saveCategoryTreeItem(subSubSubCategory)">✔️</button>
                              <button class="action-btn delete-btn" @click="deleteCategory(subSubSubCategory)">🗑️</button>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div class="modal-footer">
          <button class="add-main-category" @click="addMainCategory"> + Ana Kategori Ekle</button>
          <button class="close-modal-btn" @click="showCategoryTreeModal = false">Kapat</button>
        </div>
      </div>
    </Modal>

    <Modal :isOpen="showQuickMatchModal" title="Hızlı Kategori Eşleştirme" @close="showQuickMatchModal = false">
      <div class="modal-body">
        <div class="form-group">
          <label>Üst Kategori</label>
          <div class="category-header">
            <span>Tümü</span>
            <a href="#" class="change-category">Değiştir</a>
          </div>
        </div>

        <div class="form-group">
          <label>Platform</label>
          <select v-model="quickMatch.platform">
            <option>N11</option>
            <option>Hepsiburada</option>
            <option>Amazon</option>
            <option>Trendyol</option>
          </select>
        </div>

        <div class="form-group">
          <label>Durum</label>
          <select v-model="quickMatch.status">
            <option>Eşleştirilmemiş</option>
            <option>Eşleştirilmiş</option>
          </select>
        </div>
      </div>

      <template v-slot:footer>
        <button class="submit-btn" @click="startMatching">✔ Eşleştirmeye Başla</button>
      </template>
    </Modal>
    <Modal :isOpen="showExcelModal" title="Kategoriler - Excel İşlemleri" @close="showExcelModal = false">
      <div class="modal-body">
        <!-- Sekmeler -->
        <div class="tabs">
          <button v-for="tab in excelTabs" :key="tab" @click="activeExcelTab = tab"
            :class="{ active: activeExcelTab === tab }">
            {{ tab }}
          </button>
        </div>

        <!-- İçerik -->
        <div v-if="activeExcelTab === 'Dışa Aktar'">
          <div class="info-box">
            <i class="fas fa-info-circle"></i>
            <span>Tüm veriler excel olarak dışarı aktarılacaktır.</span>
          </div>
          <button class="download-btn" @click="downloadExcel">
            <i class="fas fa-download"></i> İndir
          </button>
        </div>

        <div v-if="activeExcelTab === 'Dışa Aktar 2'">
          <p>Burada farklı bir dışa aktarma yöntemi olabilir.</p>
        </div>

        <div v-if="activeExcelTab === 'İçe Aktar'">
          <p>Excel dosyanızı buraya yükleyerek içe aktarabilirsiniz.</p>
          <input type="file" />
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";

export default {
  name: "Categories",
  components: { Modal },
  data() {
    return {
      showExcelModal: false,
      showFilter: true,
      showNewCategoryModal: false,
      showCategoryTreeModal: false,
      showQuickMatchModal: false,
      showExcelModal: false, // 📌 Excel İşlemleri Modalı Eklendi
      activeExcelTab: "Dışa Aktar", // 📌 Excel İşlemleri İçin Başlangıç Sekmesi
      excelTabs: ["Dışa Aktar", "Dışa Aktar 2", "İçe Aktar"], // 📌 Sekmeler

      activeTab: "Genel Bilgiler",
      tabs: ["Genel Bilgiler", "S.E.O Bilgileri", "Pazaryeri Eşleştirmeleri", "Diğer"],
      filters: {
        categoryName: "",
        parentCategory: "",
        advancedFilter: "",
      },
      newCategory: {
        name: "",
        status: "Aktif",
        parent: "Hiçbiri",
        description: "",
      },
      categories: [
        { id: 1, name: "Elektronik", parent: null, children: [], expanded: false },
        { id: 2, name: "Giyim", parent: null, children: [], expanded: false },
        { id: 3, name: "Bilgisayar", parent: 1, children: [], expanded: false },
        { id: 4, name: "Telefon", parent: 1, children: [], expanded: false },
        { id: 5, name: "Kadın Giyim", parent: 2, children: [], expanded: false },
      ],
      localCategories: [],
      quickMatch: {
        platform: "N11",
        status: "Eşleştirilmemiş",
      },
    };
  },
  watch: {
    categories: {
      handler(newVal) {
        this.localCategories = JSON.parse(JSON.stringify(newVal));
      },
      deep: true,
    },
  },
  methods: {
    toggleFilter() {
      this.showFilter = !this.showFilter;
    },
    applyFilters() {
      console.log("Filtreler uygulandı:", this.filters);
      let filtered = [...this.categories];
      if (this.filters.categoryName) {
        const searchTerm = this.filters.categoryName.toLowerCase();
        filtered = filtered.filter((cat) => cat.name.toLowerCase().includes(searchTerm));
      }
      if (this.filters.parentCategory) {
        filtered = filtered.filter((cat) => cat.parent === parseInt(this.filters.parentCategory));
      }

      if (this.filters.advancedFilter === "aktif") {
        console.warn("'Aktif' filtrelemesi için veri yapınızda uygun bir alan (örn. isActive) bulunmalıdır.");
      } else if (this.filters.advancedFilter === "pasif") {
        console.warn("'Pasif' filtrelemesi için veri yapınızda uygun bir alan (örn. isActive) bulunmalıdır.");
      }
      this.categories = filtered;
    },
    clearFilters() {
      Object.assign(this.filters, {
        categoryName: "",
        parentCategory: "",
        advancedFilter: "",
      });
      this.categories = [
        { id: 1, name: "Elektronik", parent: null, children: [], expanded: false },
        { id: 2, name: "Giyim", parent: null, children: [], expanded: false },
        { id: 3, name: "Bilgisayar", parent: 1, children: [], expanded: false },
        { id: 4, name: "Telefon", parent: 1, children: [], expanded: false },
        { id: 5, name: "Kadın Giyim", parent: 2, children: [], expanded: false },
      ];
    },
    saveCategory() {
      if (this.newCategory.id) {
        const index = this.categories.findIndex((cat) => cat.id === this.newCategory.id);
        if (index !== -1) {
          this.categories[index].name = this.newCategory.name;
          this.categories[index].parent = this.newCategory.parent;
          this.categories[index].description = this.newCategory.description;
        }
      } else {
        this.categories.push({
          id: Date.now(),
          name: this.newCategory.name,
          parent: this.newCategory.parent,
          description: this.newCategory.description,
          children: [],
          expanded: false,
        });
      }
      Object.assign(this.newCategory, { name: "", parent: null, description: "" });
      this.showNewCategoryModal = false;
    },
    toggleCategory(category) {
      category.expanded = !category.expanded;
    },
    addMainCategory() {
      this.localCategories.push({
        id: Date.now(),
        name: "Yeni Kategori",
        children: [],
        expanded: false,
        parent: null,
      });
    },
    addSubCategory(category) {
      category.children.push({
        id: Date.now(),
        name: "Yeni Alt Kategori",
        parent: category.id,
        children: [],
        expanded: false,
      });
    },
    deleteCategory(category) {
      const deleteRecursively = (arr, id) => {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id === id) {
            arr.splice(i, 1);
            return;
          }
          if (arr[i].children && arr[i].children.length > 0) {
            deleteRecursively(arr[i].children, id);
          }
        }
      };
      deleteRecursively(this.localCategories, category.id);
      deleteRecursively(this.categories, category.id);
    },
    saveCategoryTreeItem(category) {
      this.categories = JSON.parse(JSON.stringify(this.localCategories));
      console.log("Kategori Ağacı Güncellendi", category);
    },
    startMatching() {
      console.log("Eşleştirme Başladı", this.quickMatch);
      this.showQuickMatchModal = false;
    },

    // 📌 **Excel İşlemleri Butonları**
    openExcelModal() {
      this.showExcelModal = true;
    },
    downloadExcel() {
      console.log("Excel Verileri İndirildi!");
      this.showExcelModal = false;
    },
  },
};
</script>
<style scoped>
/* Categories.vue stilleri */
.categories {
  padding: 20px;
}

/* Filtreleme */
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

.filter-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.clear-btn, .filter-btn {
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.filter-btn {
  background: #003c8f;
  color: white;
}

.clear-btn {
  background: #f8f9fa;
  color: black;
}

/* Butonlar */
.buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.primary { background: #003c8f; color: white; }
.gold { background: #daa520; color: white; }
.dark { background: #4a4a4a; color: white; }
.green { background: #228b22; color: white; }

/* Modal (Genel) */


.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input, .form-group select, .form-group textarea{
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
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

/* Kategori Ağacı Modalı */
.category-tree-modal {
  width: 500px; /* Resme göre biraz daha geniş */
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  background: #0d47a1; /* Koyu mavi başlık */
  color: white;
  padding: 10px;
  border-radius: 8px 8px 0 0; /* Üst köşeler yuvarlatılmış */
}

.modal-header h2{
    margin:0;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 24px; /* Çarpı daha büyük */
  cursor: pointer;
    padding: 0;
}

.modal-body {
  padding: 10px;
}

.info-box {
  background: #f0f8ff; /* Açık mavi arka plan */
  padding: 10px;
  border-left: 4px solid #4285f4; /* Daha belirgin mavi kenarlık */
  margin-bottom: 15px;
  border-radius: 4px; /* Hafif yuvarlatılmış köşeler */
}
.info-box p{
    margin: 5px 0;
}

.category-list {
  list-style-type: none;
  padding: 0;
}

.category-item {
  background: #f8f9fa;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
   border: 1px solid #ddd; /* Hafif bir border */
}

.category-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.expand-btn {
  margin-right: 8px;
  background: none;
  border: none;
  font-size: 18px; /* Daha büyük artı/eksi */
  cursor: pointer;
   padding: 0;
    line-height: 1;
}

.category-actions {
  display: flex;
  align-items: center; /* Dikey hizalama */
  gap: 8px;
}

.action-btn {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px; /* Simgeler daha büyük */
  padding: 0;
  color: #0d47a1; /* Mavi renk */
}
.action-btn:hover {
    color: #0056b3; /* Hover'da daha koyu mavi */
    text-decoration: underline;
}

/* Alt kategori listesi */
.sub-category-list {
  list-style-type: none;
  padding-left: 30px; /* Daha fazla girinti */
}
/* Modal Alt Bilgi */
.modal-footer{
    display: flex;
    justify-content: space-between;
    align-items: center; /* Dikey hizalama */
    padding: 15px;
    border-top: 1px solid #ddd;
}

.add-main-category,
.close-modal-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
}

.add-main-category {
  background-color: #4285f4; /* Mavi tonu */
  color: white;
}
.add-main-category:hover{
     background-color: #0d47a1;
}

.close-modal-btn {
  background-color: #db4437; /* Kırmızı tonu */
  color: white;
}
.close-modal-btn:hover{
    background-color: #c9302c;
}
.category-id{
    color:#888;
    font-size: 12px;
    margin-right: 5px;
}
.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.change-category {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
}

.submit-btn {
  background: #003c8f;
  color: white;
  padding: 10px;
  border: none;
  width: 100%;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;

}



/* Sekmeler */
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

/* Bilgilendirme Kutusu */
.info-box {
  background: #f0f8ff;
  padding: 10px;
  border-left: 5px solid #007bff;
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-bottom: 10px;
}

.info-box i {
  margin-right: 10px;
  color: #007bff;
}

/* İndir Butonu */
.download-btn {
  padding: 10px 15px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
}

.download-btn i {
  font-size: 18px;
}
</style>
