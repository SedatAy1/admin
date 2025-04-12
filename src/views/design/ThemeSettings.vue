<template>
  <div class="theme-settings-container">
    <!-- Sol Menü -->
    <aside class="sidebar">
      <ul>
        <li :class="{ active: activeTab === 'theme' }" @click="activeTab = 'theme'">{{ $t('theme.themeSelection') }}</li>
        <li :class="{ active: activeTab === 'logo' }" @click="activeTab = 'logo'">{{ $t('theme.logoSettings') }}</li>
        <li :class="{ active: activeTab === 'watermark' }" @click="activeTab = 'watermark'">{{ $t('theme.watermarkSettings') }}</li>
        <li :class="{ active: activeTab === 'image' }" @click="activeTab = 'image'">{{ $t('theme.imageSettings') }}</li>
        <li :class="{ active: activeTab === 'cookie' }" @click="activeTab = 'cookie'">{{ $t('theme.cookieWarning') }}</li>
        <li :class="{ active: activeTab === 'tabAlert' }" @click="activeTab = 'tabAlert'">{{ $t('theme.tabBarWarning') }}</li>
        <li :class="{ active: activeTab === 'facebook' }" @click="activeTab = 'facebook'">{{ $t('theme.facebookLogin') }}</li>
        <li :class="{ active: activeTab === 'google' }" @click="activeTab = 'google'">{{ $t('theme.googleLogin') }}</li>
      </ul>
    </aside>

    <!-- Sağ İçerik -->
    <section class="content">
      <!-- Tema Seçimi -->
      <div v-if="activeTab === 'theme'" class="box">
        <h2 class="box-title">
          demo1 <span class="tag">{{ $t('theme.activeTheme') }}</span>
        </h2>
        <p class="box-desc">
          {{ $t('theme.description') }}<br />
          {{ $t('theme.lastUpdate') }}: 03.05.2024<br />
          {{ $t('theme.version') }}: 1.0.0
        </p>
        <div class="button-group">
          <button class="primary" @click="showModal = true">{{ $t('theme.customize') }}</button>
          <button class="secondary">{{ $t('theme.updateNotes') }}</button>
        </div>
        <div class="sub-tabs">
          <button class="sub-tab">{{ $t('theme.themeSettings') }}</button>
          <button class="sub-tab">{{ $t('theme.mobileAppSettings') }}</button>
          <button class="sub-tab">{{ $t('theme.cssCustomize') }}</button>
          <button class="sub-tab">{{ $t('theme.jsCustomize') }}</button>
          <button class="sub-tab">{{ $t('theme.themeEditor') }}</button>
        </div>
      </div>

      <!-- Logo Ayarları -->
      <div v-if="activeTab === 'logo'" class="box">
        <div v-for="logo in logos" :key="logo.key" class="logo-item">
          <h4 class="logo-title">» {{ $t(`theme.${logo.title}`) }}</h4>
          <p class="logo-desc">{{ $t(`theme.${logo.description}`) }}</p>
          <img v-if="logo.preview" :src="logo.preview" class="logo-preview" alt="Preview" />
          <input type="file" @change="onFileChange($event, logo.key)" />
        </div>
        <button class="save-btn" @click="saveLogos">✓ {{ $t('common.save') }}</button>
      </div>

      <!-- Watermark Ayarları -->
      <div v-if="activeTab === 'watermark'" class="box">
        <div class="setting-group">
          <h4 class="setting-title">» {{ $t('theme.watermarkStatus') }}</h4>
          <select v-model="watermark.status">
            <option>{{ $t('common.active') }}</option>
            <option>{{ $t('common.passive') }}</option>
          </select>
        </div>
        <div class="setting-group">
          <h4 class="setting-title">» {{ $t('theme.watermarkPosition') }}</h4>
          <select v-model="watermark.position">
            <option>{{ $t('theme.topLeft') }}</option>
            <option>{{ $t('theme.topRight') }}</option>
            <option>{{ $t('theme.bottomLeft') }}</option>
            <option>{{ $t('theme.bottomRight') }}</option>
            <option>{{ $t('theme.center') }}</option>
          </select>
        </div>
        <div class="setting-group">
          <h4 class="setting-title">» {{ $t('theme.watermarkImage') }}</h4>
          <input type="file" @change="handleWatermarkUpload" />
          <img v-if="watermark.preview" :src="watermark.preview" class="logo-preview" />
        </div>
        <button class="save-btn" @click="saveWatermark">✓ {{ $t('common.save') }}</button>
      </div>

      <!-- Resim Ayarları -->
      <div v-if="activeTab === 'image'" class="box">
        <div class="setting-group">
          <h4 class="setting-title">» {{ $t('theme.defaultImage') }}</h4>
          <input type="file" @change="handleImageUpload" />
          <img v-if="defaultImage.preview" :src="defaultImage.preview" class="logo-preview" />
        </div>
        <button class="save-btn" @click="saveDefaultImage">✓ {{ $t('common.save') }}</button>
      </div>

      <!-- Çerez Uyarısı -->
      <div v-if="activeTab === 'cookie'" class="box">
        <div class="alert-info">💡 {{ $t('theme.cookieInfo') }}</div>
        <div class="alert-warning">❗ {{ $t('theme.cookieWarningNote') }}</div>
        <div class="setting-group">
          <select v-model="cookie.status">
            <option>{{ $t('common.active') }}</option>
            <option>{{ $t('common.passive') }}</option>
          </select>
          <select v-model="cookie.position">
            <option>{{ $t('theme.topHeader') }}</option>
            <option>{{ $t('theme.bottomFooter') }}</option>
          </select>
          <input type="text" v-model="cookie.buttonText" :placeholder="$t('theme.buttonText')" />
        </div>
        <div class="setting-group">
          <input type="text" v-model="cookie.bgColor" :placeholder="$t('theme.bgColor')" />
          <input type="text" v-model="cookie.textColor" :placeholder="$t('theme.textColor')" />
          <input type="text" v-model="cookie.buttonColor" :placeholder="$t('theme.buttonColor')" />
          <input type="text" v-model="cookie.buttonTextColor" :placeholder="$t('theme.buttonTextColor')" />
        </div>
        <textarea v-model="cookie.content" rows="5" style="width: 100%"></textarea>
        <button class="save-btn" @click="saveCookie">✓ {{ $t('common.save') }}</button>
      </div>

      <!-- Tarayıcı Çubuğu Uyarısı -->
      <div v-if="activeTab === 'tabAlert'" class="box">
        <p>{{ $t('theme.tabAlertDescription') }}</p>
        <img src="https://via.placeholder.com/500x60?text=Sekme+1" class="tab-alert-img" />
        <img src="https://via.placeholder.com/500x60?text=Nereye+Gittin%3F" class="tab-alert-img" />
        <div class="setting-group">
          <select v-model="tabAlert.status">
            <option>{{ $t('common.active') }}</option>
            <option>{{ $t('common.passive') }}</option>
          </select>
          <input type="text" v-model="tabAlert.title" :placeholder="$t('theme.tabTitle')" />
        </div>
        <button class="save-btn" @click="saveTabAlert">✓ {{ $t('common.save') }}</button>
      </div>

      <!-- Facebook Login -->
      <div v-if="activeTab === 'facebook'" class="box">
        <p><strong>{{ $t('theme.facebookInstruction') }}</strong></p>
        <ul class="info-list">
          <li>{{ $t('theme.createFacebookApp') }}</li>
          <li>Valid redirect URI: <code>https://demo.eticaret.tv.tr/ajax.php?page=fb-login</code></li>
        </ul>
        <div class="setting-group">
          <select v-model="facebookLogin.status">
            <option>{{ $t('common.active') }}</option>
            <option>{{ $t('common.passive') }}</option>
          </select>
          <input type="text" v-model="facebookLogin.appId" placeholder="App ID" />
          <input type="text" v-model="facebookLogin.appSecret" placeholder="App Secret" />
        </div>
        <button class="save-btn" @click="saveFacebookLogin">✓ {{ $t('common.save') }}</button>
      </div>

      <!-- Google Login -->
      <div v-if="activeTab === 'google'" class="box">
        <ol class="info-list">
          <li><a href="https://console.developers.google.com" target="_blank">{{ $t('theme.googleInstruction') }}</a></li>
          <li>Authorized redirect URI: <code>https://demo.eticaret.tv.tr/3rdparty/google-login</code></li>
        </ol>
        <div class="setting-group">
          <select v-model="googleLogin.status">
            <option>{{ $t('common.active') }}</option>
            <option>{{ $t('common.passive') }}</option>
          </select>
          <input type="text" v-model="googleLogin.clientId" placeholder="Client ID" />
          <input type="text" v-model="googleLogin.clientSecret" placeholder="Client Secret" />
        </div>
        <button class="save-btn" @click="saveGoogleLogin">✓ {{ $t('common.save') }}</button>
      </div>
    </section>

    <!-- Modal -->
    <ThemeCustomizeModal :visible="showModal" @close="showModal = false" />
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import ThemeCustomizeModal from './ThemeCustomizeModal.vue'

const { t } = useI18n()

const activeTab = ref('theme')
const showModal = ref(false)

// Logo Ayarları
const logos = reactive([
  {
    key: 'siteMain',
    title: 'siteMainTitle',
    description: 'siteMainDescription',
    preview: 'https://via.placeholder.com/150x50?text=Logo'
  },
  {
    key: 'mobile',
    title: 'mobileLogoTitle',
    description: 'mobileLogoDescription',
    preview: 'https://via.placeholder.com/150x50?text=Logo'
  },
  {
    key: 'footer',
    title: 'footerLogoTitle',
    description: 'footerLogoDescription',
    preview: 'https://via.placeholder.com/150x50?text=Logo'
  },
  {
    key: 'email',
    title: 'emailLogoTitle',
    description: 'emailLogoDescription',
    preview: 'https://via.placeholder.com/150x50?text=Logo'
  },
  {
    key: 'favicon',
    title: 'faviconTitle',
    description: 'faviconDescription',
    preview: 'https://via.placeholder.com/32x32?text=🦊'
  }
])

const onFileChange = (event, key) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      const logo = logos.find(l => l.key === key)
      logo.preview = reader.result
    }
    reader.readAsDataURL(file)
  }
}

const saveLogos = () => {
  console.log('Kaydedilen logolar:', logos)
  alert(t('alerts.logosSaved'))
}

// Watermark
const watermark = reactive({
  status: t('common.passive'),
  position: t('theme.bottomRight'),
  preview: null
})

const handleWatermarkUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      watermark.preview = reader.result
    }
    reader.readAsDataURL(file)
  }
}

const saveWatermark = () => {
  console.log('Watermark:', watermark)
  alert(t('alerts.watermarkSaved'))
}

// Resim Ayarları
const defaultImage = reactive({
  preview: null
})

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      defaultImage.preview = reader.result
    }
    reader.readAsDataURL(file)
  }
}

const saveDefaultImage = () => {
  console.log('Varsayılan Resim:', defaultImage)
  alert(t('alerts.defaultImageSaved'))
}

// Çerez Uyarısı
const cookie = reactive({
  status: t('common.active'),
  position: t('theme.topHeader'),
  buttonText: t('theme.buttonText'),
  bgColor: '#2b7ef8',
  textColor: '#ffffff',
  buttonColor: '#ffffff',
  buttonTextColor: '#2b7ef8',
  content: t('theme.cookieDefaultText')
})

const saveCookie = () => {
  console.log('Çerez Uyarısı:', cookie)
  alert(t('alerts.cookieSaved'))
}

// Tarayıcı Uyarısı
const tabAlert = reactive({
  status: t('common.active'),
  title: 'Nereye Gittin?'
})

const saveTabAlert = () => {
  console.log('Sekme Uyarısı:', tabAlert)
  alert(t('alerts.tabAlertSaved'))
}

// Facebook Login
const facebookLogin = reactive({
  status: t('common.active'),
  appId: '',
  appSecret: ''
})

const saveFacebookLogin = () => {
  console.log('Facebook Login:', facebookLogin)
  alert(t('alerts.facebookSaved'))
}

// Google Login
const googleLogin = reactive({
  status: t('common.active'),
  clientId: '',
  clientSecret: ''
})

const saveGoogleLogin = () => {
  console.log('Google Login:', googleLogin)
  alert(t('alerts.googleSaved'))
}
</script>
<style scoped>
/* Genel yapı */
.theme-settings-container {
  display: flex;
  gap: 24px;
  padding: 20px;
  background-color: #f1f5f9;
  font-family: 'Inter', sans-serif;
  transition: background-color 0.3s ease;
}
html.dark .theme-settings-container {
  background-color: #181818;
  color: #f1f1f1;
}

/* Sidebar */
.sidebar {
  width: 260px;
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}
html.dark .sidebar {
  background-color: #1f1f1f;
  border-color: #2c2c2c;
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
  transition: background-color 0.2s ease, color 0.2s ease;
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

/* İçerik */
.content {
  flex: 1;
  background-color: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  border: 1px solid #e2e8f0;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}
html.dark .content {
  background-color: #232323;
  border-color: #333;
}

/* Kutular */
.box-title {
  font-size: 22px;
  font-weight: 600;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 10px;
}
html.dark .box-title {
  color: #ffffff;
}

.tag {
  background-color: #d1fae5;
  color: #059669;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 6px;
}
html.dark .tag {
  background-color: #064e3b;
  color: #a7f3d0;
}

.box-desc {
  margin-top: 10px;
  color: #64748b;
  font-size: 14px;
  line-height: 1.6;
}
html.dark .box-desc {
  color: #cbd5e1;
}

/* Butonlar */
.button-group {
  margin-top: 20px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.primary,
.secondary,
.save-btn {
  border: none;
  padding: 10px 18px;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.primary {
  background-color: #3b82f6;
  color: white;
}
.primary:hover {
  background-color: #2563eb;
}

.secondary {
  background-color: #e2e8f0;
  color: #334155;
}
.secondary:hover {
  background-color: #cbd5e1;
}
html.dark .secondary {
  background-color: #2a2a2a;
  color: #cbd5e1;
}
html.dark .secondary:hover {
  background-color: #3a3a3a;
}

.save-btn {
  background-color: #0ea5e9;
  color: white;
}
.save-btn:hover {
  background-color: #0284c7;
}

/* Sekmeler */
.sub-tabs {
  margin-top: 28px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.sub-tab {
  padding: 8px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background-color: white;
  color: #334155;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s ease;
}
.sub-tab:hover {
  background-color: #f1f5f9;
}
html.dark .sub-tab {
  background-color: #2c2c2c;
  color: #f1f1f1;
  border-color: #444;
}
html.dark .sub-tab:hover {
  background-color: #3a3a3a;
}

/* Form alanları */
input[type='text'],
input[type='number'],
select,
textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background-color: #f9fafb;
  font-size: 14px;
  margin-top: 6px;
  margin-bottom: 16px;
  transition: border 0.2s ease, background-color 0.3s ease;
}
input:focus,
select:focus,
textarea:focus {
  border-color: #3b82f6;
  outline: none;
}
html.dark input,
html.dark select,
html.dark textarea {
  background-color: #2c2c2c;
  border-color: #444;
  color: #f1f1f1;
}
html.dark input::placeholder,
html.dark textarea::placeholder {
  color: #aaa;
}

/* Gruplar */
.setting-group {
  margin-bottom: 24px;
}

.logo-preview,
.tab-alert-img {
  max-height: 80px;
  margin-top: 10px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
}
html.dark .logo-preview,
html.dark .tab-alert-img {
  border-color: #444;
}

/* Alertlar */
.alert-info,
.alert-warning {
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 500;
}

.alert-info {
  background-color: #e0f2fe;
  color: #0369a1;
}
.alert-warning {
  background-color: #fee2e2;
  color: #991b1b;
}
html.dark .alert-info {
  background-color: #1e3a8a;
  color: #bfdbfe;
}
html.dark .alert-warning {
  background-color: #7f1d1d;
  color: #fecaca;
}

/* Liste */
.info-list {
  list-style: disc;
  margin-left: 20px;
  padding-left: 10px;
}
.info-list li {
  margin-bottom: 8px;
  font-size: 14px;
  color: #475569;
}
html.dark .info-list li {
  color: #cbd5e1;
}

/* Responsive */
@media (max-width: 768px) {
  .theme-settings-container {
    flex-direction: column;
    padding: 16px;
  }

  .sidebar {
    width: 100%;
    padding: 16px;
  }

  .content {
    padding: 20px;
  }

  .button-group {
    flex-direction: column;
  }
}
</style>