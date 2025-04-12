<template>
  <div class="categories">
    <div class="filter-container">
      <div class="filter-header" @click="toggleFilter">
        <i class="fas fa-filter"></i>
        <span>{{ $t('category.filterOptions') }}</span>
        <i class="fas" :class="showFilter ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
      </div>
      <div v-show="showFilter" class="filter-content">
        <div class="filter-row">
          <div class="filter-group">
            <label>{{ $t('category.name') }}</label>
            <input type="text" v-model="filters.categoryName" :placeholder="$t('category.enterName')" />
          </div>
          <div class="filter-group">
            <label>{{ $t('category.parent') }}</label>
            <select v-model="filters.parentCategory">
              <option value="">{{ $t('common.notSelected') }}</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
            </select>
          </div>
          <div class="filter-group">
            <label>{{ $t('category.advancedFilter') }}</label>
            <select v-model="filters.advancedFilter">
              <option value="">{{ $t('common.notSelected') }}</option>
              <option value="aktif">{{ $t('category.active') }}</option>
              <option value="pasif">{{ $t('category.passive') }}</option>
            </select>
          </div>
        </div>
        <div class="filter-actions">
          <button class="clear-btn" @click="clearFilters">{{ $t('common.clear') }}</button>
          <button class="filter-btn" @click="applyFilters">{{ $t('common.filter') }}</button>
        </div>
      </div>
    </div>

    <div class="buttons">
      <button class="btn primary" @click="showNewCategoryModal = true">{{ $t('category.new') }}</button>
      <button class="btn gold" @click="showCategoryTreeModal = true">{{ $t('category.tree') }}</button>
      <button class="btn dark" @click="showQuickMatchModal = true">{{ $t('category.quickMatch') }}</button>
      <button class="btn green">{{ $t('category.excel') }}</button>
    </div>

    <Modal :isOpen="showNewCategoryModal" :title="$t('category.newTitle')" @close="showNewCategoryModal = false">
      <div class="modal-body">
        <div class="form-group">
          <label>{{ $t('category.name') }}</label>
          <input type="text" v-model="newCategory.name" />
        </div>
        <div class="form-group">
          <label>{{ $t('category.parent') }}</label>
          <select v-model="newCategory.parent">
            <option value="">{{ $t('common.none') }}</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
          </select>
        </div>
        <div class="form-group">
          <label>{{ $t('category.description') }}</label>
          <textarea v-model="newCategory.description"></textarea>
        </div>
      </div>
      <template v-slot:footer>
        <button class="submit-btn" @click="saveCategory">{{ $t('category.save') }}</button>
      </template>
    </Modal>

    <Modal :isOpen="showCategoryTreeModal" :title="$t('category.treeTitle')" @close="showCategoryTreeModal = false">
      <div class="category-tree-modal">
        <div class="modal-header">
          <h2>{{ $t('category.treeTitle') }}</h2>
          <button class="close-btn" @click="showCategoryTreeModal = false">&times;</button>
        </div>

        <div class="modal-body">
          <div class="info-box">
            <p>{{ $t('category.infoText1') }}</p>
            <p>{{ $t('category.infoText2') }}</p>
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
          <button class="add-main-category" @click="addMainCategory">{{ $t('category.addMain') }}</button>
          <button class="close-modal-btn" @click="showCategoryTreeModal = false">{{ $t('category.close') }}</button>
        </div>
      </div>
    </Modal>

        <Modal :isOpen="showQuickMatchModal" :title="$t('category.quickMatchTitle')" @close="showQuickMatchModal = false">
      <div class="modal-body">
        <div class="form-group">
          <label>{{ $t('category.parent') }}</label>
          <div class="category-header">
            <span>{{ $t('category.all') }}</span>
            <a href="#" class="change-category">{{ $t('category.change') }}</a>
          </div>
        </div>

        <div class="form-group">
          <label>{{ $t('category.platform') }}</label>
          <select v-model="quickMatch.platform">
            <option>N11</option>
            <option>Hepsiburada</option>
            <option>Amazon</option>
            <option>Trendyol</option>
          </select>
        </div>

        <div class="form-group">
          <label>{{ $t('category.status') }}</label>
          <select v-model="quickMatch.status">
            <option>{{ $t('category.unmatched') }}</option>
            <option>{{ $t('category.matched') }}</option>
          </select>
        </div>
      </div>

      <template v-slot:footer>
        <button class="submit-btn" @click="startMatching">✔ {{ $t('category.startMatching') }}</button>
      </template>
    </Modal>

    <Modal :isOpen="showExcelModal" :title="$t('category.excelTitle')" @close="showExcelModal = false">
      <div class="modal-body">
        <!-- Tabs -->
        <div class="tabs">
          <button v-for="tab in excelTabs" :key="tab" @click="activeExcelTab = tab"
            :class="{ active: activeExcelTab === tab }">
            {{ $t(`category.tabs.${tab}`) }}
          </button>
        </div>

        <!-- Content -->
        <div v-if="activeExcelTab === 'Dışa Aktar'">
          <div class="info-box">
            <i class="fas fa-info-circle"></i>
            <span>{{ $t('category.exportInfo') }}</span>
          </div>
          <button class="download-btn" @click="downloadExcel">
            <i class="fas fa-download"></i> {{ $t('category.download') }}
          </button>
        </div>

        <div v-if="activeExcelTab === 'Dışa Aktar 2'">
          <p>{{ $t('category.export2Info') }}</p>
        </div>

        <div v-if="activeExcelTab === 'İçe Aktar'">
          <p>{{ $t('category.importInfo') }}</p>
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
.categories {
  padding: 20px;
  background: #ffffff;
  min-height: 100vh;
  transition: background 0.3s ease;
}

/* 🎯 Filtreleme */
.filter-container {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 20px;
  transition: background 0.3s ease;
}

.filter-header {
  padding: 16px;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background: #14319a;
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
  min-width: 220px;
}

.filter-group label {
  font-weight: 500;
  margin-bottom: 5px;
  font-size: 14px;
  display: block;
}

.filter-group input,
.filter-group select {
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  width: 100%;
  font-size: 14px;
}

.filter-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.clear-btn, .filter-btn {
  padding: 10px 16px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  border: none;
}

.clear-btn {
  background: #f1f5f9;
  color: #1f2937;
}

.filter-btn {
  background: #2563eb;
  color: #ffffff;
}

/* 🎨 Butonlar */
.buttons {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 16px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  border: none;
}

.primary { background: #2563eb; color: white; }
.gold    { background: #d4af37; color: white; }
.dark    { background: #374151; color: white; }
.green   { background: #10b981; color: white; }

/* 📦 Formlar */
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 6px;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
}

.submit-btn {
  padding: 10px;
  width: 100%;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
}

/* 🌲 Kategori Ağacı */
.category-tree-modal {
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.modal-header {
  background: #2563eb;
  color: white;
  padding: 12px 16px;
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  font-size: 22px;
  color: white;
  cursor: pointer;
}

.category-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.action-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #2563eb;
}

.category-id {
  font-size: 12px;
  color: #6b7280;
}

.expand-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.category-item {
  padding: 10px;
  margin-bottom: 6px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
}

.sub-category-list {
  padding-left: 30px;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  padding: 16px 0 0;
}

.add-main-category,
.close-modal-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
}

.add-main-category { background: #2563eb; color: white; }
.close-modal-btn { background: #ef4444; color: white; }

/* 💾 Sekmeler */
.tabs {
  display: flex;
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

/* 🔽 Bilgilendirme & İndirme */
.info-box {
  background: #e0f2fe;
  padding: 10px;
  border-left: 5px solid #3b82f6;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  margin-bottom: 12px;
}

.info-box i {
  color: #3b82f6;
}

.download-btn {
  background: #2563eb;
  color: white;
  padding: 10px 14px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
}

/* 🌙 Dark Mode */
.dark-mode .categories,
.dark-mode .filter-container,
.dark-mode .filter-content,
.dark-mode .category-tree-modal {
  background: #1e293b;
  color: #e2e8f0;
}

.dark-mode .filter-header {
  background: #334155;
  color: #f8fafc;
}

.dark-mode .filter-group input,
.dark-mode .filter-group select,
.dark-mode .form-group input,
.dark-mode .form-group select,
.dark-mode .form-group textarea {
  background: #1e293b;
  color: #f8fafc;
  border-color: #475569;
}

.dark-mode .clear-btn {
  background: #334155;
  color: #f1f5f9;
  border: 1px solid #475569;
}

.dark-mode .filter-btn,
.dark-mode .submit-btn,
.dark-mode .add-main-category,
.dark-mode .download-btn {
  background: #3b82f6;
}

.dark-mode .tabs button {
  background: #334155;
  color: #e2e8f0;
}

.dark-mode .tabs button.active {
  background: #3b82f6;
  color: white;
}

.dark-mode .info-box {
  background: #1e3a8a;
  color: #bfdbfe;
  border-color: #60a5fa;
}

/* 📱 Responsive */
@media (max-width: 768px) {
  .filter-row {
    flex-direction: column;
  }
  .filter-group {
    width: 100%;
  }
  .buttons {
    flex-direction: column;
  }
  .tabs {
    flex-direction: column;
  }
}
</style>
