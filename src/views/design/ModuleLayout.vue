<template>
  <div class="module-layout-container">
    <!-- Sol Menü -->
    <aside class="sidebar">
      <ul>
        <li
          v-for="page in pages"
          :key="page"
          :class="{ active: activePage === page }"
          @click="activePage = page"
        >
          {{ $t(`pages.${page}`) }}
        </li>
      </ul>
    </aside>

    <!-- Sağ Panel -->
    <section class="content">
      <div class="page-header">
        <h2>{{ $t(`pages.${activePage}`) }}</h2>
        <button class="primary" @click="showModal = true">+ {{ $t('module.newGroup') }}</button>
      </div>

      <div class="alert-info">
        {{ $t('module.dragDropInfo') }}
      </div>

      <!-- Grup Listesi -->
      <div
        v-for="(group, index) in filteredGroups"
        :key="group.id"
        class="group-card"
      >
        <div class="group-header">
          <span class="group-title">🟢 {{ group.title }} </span>
        </div>

        <!-- Sütunlar -->
        <div class="columns">
          <div class="column">
            <h4>1. {{ $t('module.column') }} <a href="#">({{ $t('module.addModule') }})</a></h4>
            <ul>
              <li v-for="(mod, i) in group.columns[0]" :key="i" class="module-box">
                <span>✅ {{ mod }}</span>
                <div class="actions">
                  <button><i class="icon-eye">👁</i></button>
                  <button @click="removeModule(group, 0, i)"><i class="icon-trash">🗑</i></button>
                </div>
              </li>
            </ul>
          </div>
          <div class="column">
            <h4>2. {{ $t('module.column') }} <a href="#">({{ $t('module.addModule') }})</a></h4>
            <ul>
              <li v-for="(mod, i) in group.columns[1]" :key="i" class="module-box">
                <span>✅ {{ mod }}</span>
                <div class="actions">
                  <button><i class="icon-eye">👁</i></button>
                  <button @click="removeModule(group, 1, i)"><i class="icon-trash">🗑</i></button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Yeni Grup Modal -->
    <NewGroupModal v-if="showModal" :visible="showModal" @close="showModal = false" />
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import NewGroupModal from './NewGroupModal.vue'

const { t } = useI18n()
const showModal = ref(false)

const pageKeys = [
  'home', 'categoryDetail', 'productDetail', 'cart', 'checkout', 'brands', 'staticPages',
  'blog', 'blogDetail', 'help', 'helpDetail', 'giftVoucher', 'account', 'register',
  'login', 'dealerApplication', 'forgotPassword', 'resetPassword', 'notFound', 'other'
]
const pages = pageKeys
const activePage = ref(pageKeys[0])

const defaultGroups = [
  { id: 1, title: 'Header', columns: [['Header (Üst Bölüm)'], []] },
  { id: 2, title: 'Manşet Grubu', columns: [['Manşet'], ['Favori Ürünler']] },
  { id: 3, title: 'Ana İçerik', columns: [['Yeni Ürünler', 'Çok Satanlar'], []] },
  { id: 4, title: 'Footer', columns: [['Footer (Alt Bölüm)'], []] }
]

const allGroups = reactive({})
pageKeys.forEach(page => {
  allGroups[page] = JSON.parse(JSON.stringify(defaultGroups))
})

const filteredGroups = computed(() => allGroups[activePage.value] || [])

const removeModule = (group, columnIndex, moduleIndex) => {
  group.columns[columnIndex].splice(moduleIndex, 1)
}
</script>
<style scoped>
.module-layout-container {
  display: flex;
  gap: 24px;
  padding: 20px;
  font-family: 'Inter', sans-serif;
  background-color: #f8fafc;
  transition: background-color 0.3s ease;
}
html.dark .module-layout-container {
  background-color: #181818;
  color: #f1f1f1;
}

/* Sidebar */
.sidebar {
  width: 260px;
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}
html.dark .sidebar {
  background-color: #1f1f1f;
  border-color: #333;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  padding: 12px 16px;
  margin-bottom: 10px;
  border-radius: 8px;
  font-weight: 500;
  color: #334155;
  cursor: pointer;
  transition: all 0.2s ease;
}
.sidebar li:hover {
  background-color: #e0f2fe;
  color: #0369a1;
}
.sidebar li.active {
  background-color: #3b82f6;
  color: white;
  font-weight: 600;
}
html.dark .sidebar li {
  color: #cbd5e1;
}
html.dark .sidebar li:hover {
  background-color: #1e40af;
  color: #ffffff;
}
html.dark .sidebar li.active {
  background-color: #3b82f6;
  color: #ffffff;
}

/* Sağ Panel */
.content {
  flex: 1;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 12px;
}

.page-header h2 {
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
}
html.dark .page-header h2 {
  color: #f1f1f1;
}

/* Buton */
.primary {
  background-color: #3b82f6;
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.primary:hover {
  background-color: #2563eb;
}

/* Uyarı kutusu */
.alert-info {
  background-color: #e0f2fe;
  color: #0369a1;
  padding: 10px 14px;
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 20px;
}
html.dark .alert-info {
  background-color: #1e3a8a;
  color: #bfdbfe;
}

/* Grup kutusu */
.group-card {
  background-color: white;
  border: 1px dashed #cbd5e1;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 20px;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}
html.dark .group-card {
  background-color: #232323;
  border-color: #444;
}

/* Grup başlığı */
.group-header {
  font-weight: 600;
  font-size: 16px;
  color: #0f172a;
  margin-bottom: 16px;
}
html.dark .group-header {
  color: #f1f1f1;
}

/* Alt başlık */
.group-title {
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

/* Kolonlar */
.columns {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.column {
  flex: 1;
}

.column h4 {
  font-size: 14px;
  margin-bottom: 10px;
  color: #334155;
}
html.dark .column h4 {
  color: #e2e8f0;
}

.column h4 a {
  color: #3b82f6;
  text-decoration: underline;
  font-weight: 500;
  margin-left: 6px;
  font-size: 13px;
  cursor: pointer;
}
html.dark .column h4 a {
  color: #93c5fd;
}

/* Modül kutusu */
.module-box {
  background-color: #f1f5f9;
  border: 1px solid #e2e8f0;
  padding: 10px 12px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  transition: all 0.2s ease;
}
.module-box:hover {
  background-color: #e2e8f0;
}
html.dark .module-box {
  background-color: #2c2c2c;
  border-color: #444;
}
html.dark .module-box:hover {
  background-color: #3a3a3a;
}

.module-box span {
  font-size: 14px;
  color: #1e293b;
}
html.dark .module-box span {
  color: #f1f1f1;
}

/* Butonlar */
.actions {
  display: flex;
  gap: 10px;
}

.actions button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 15px;
  color: #475569;
}
.actions button:hover {
  color: #0f172a;
}
html.dark .actions button {
  color: #cbd5e1;
}
html.dark .actions button:hover {
  color: #ffffff;
}

/* Responsive */
@media (max-width: 768px) {
  .module-layout-container {
    flex-direction: column;
    padding: 16px;
  }

  .sidebar {
    width: 100%;
    padding: 16px;
  }

  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .columns {
    flex-direction: column;
  }

  .primary {
    width: 100%;
  }
}
</style>