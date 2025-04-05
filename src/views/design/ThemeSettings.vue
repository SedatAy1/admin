<template>
  <div class="theme-settings-container">
    <!-- Sol Menü -->
    <aside class="sidebar">
      <ul>
        <li :class="{ active: activeTab === 'theme' }" @click="activeTab = 'theme'">Tema Seçimi</li>
        <li :class="{ active: activeTab === 'logo' }" @click="activeTab = 'logo'">Logo Ayarları</li>
        <li :class="{ active: activeTab === 'watermark' }" @click="activeTab = 'watermark'">Watermark Ayarları</li>
        <li :class="{ active: activeTab === 'image' }" @click="activeTab = 'image'">Resim Ayarları</li>
        <li :class="{ active: activeTab === 'cookie' }" @click="activeTab = 'cookie'">Çerez Uyarısı</li>
        <li :class="{ active: activeTab === 'tabAlert' }" @click="activeTab = 'tabAlert'">Tarayıcı Çubuğu Uyarısı</li>
        <li :class="{ active: activeTab === 'facebook' }" @click="activeTab = 'facebook'">Facebook Login</li>
        <li :class="{ active: activeTab === 'google' }" @click="activeTab = 'google'">Google Login</li>
      </ul>
    </aside>

    <!-- Sağ İçerik -->
    <section class="content">
            <!-- Tema Seçimi -->
            <div v-if="activeTab === 'theme'" class="box">
        <h2 class="box-title">
          demo1 <span class="tag">✓ Aktif Tema</span>
        </h2>
        <p class="box-desc">
          demo1 için hazırlanan özel tema.<br />
          Son Güncelleme Tarihi: 03.05.2024<br />
          Versiyon: 1.0.0
        </p>

        <div class="button-group">
          <button class="primary" @click="showModal = true">Özelleştir</button>
          <button class="secondary">Güncelleme Notları</button>
        </div>

        <div class="sub-tabs">
          <button class="sub-tab">Tema Ayarları</button>
          <button class="sub-tab">Mobil Uygulama Ayarları</button>
          <button class="sub-tab">CSS Özelleştir</button>
          <button class="sub-tab">JS Özelleştir</button>
          <button class="sub-tab">Tema Editörü</button>
        </div>
      </div>

      <!-- Logo Ayarları -->
      <div v-if="activeTab === 'logo'" class="box">
        <div v-for="logo in logos" :key="logo.key" class="logo-item">
          <h4 class="logo-title">» {{ logo.title }}</h4>
          <p class="logo-desc">{{ logo.description }}</p>
          <img v-if="logo.preview" :src="logo.preview" class="logo-preview" alt="Önizleme" />
          <input type="file" @change="onFileChange($event, logo.key)" />
        </div>
        <button class="save-btn" @click="saveLogos">✓ Kaydet</button>
      </div>

      <!-- Watermark Ayarları -->
      <div v-if="activeTab === 'watermark'" class="box">
        <div class="setting-group">
          <h4 class="setting-title">» Watermark Durumu</h4>
          <select v-model="watermark.status">
            <option>Aktif</option>
            <option>Pasif</option>
          </select>
        </div>
        <div class="setting-group">
          <h4 class="setting-title">» Watermark Konumu</h4>
          <select v-model="watermark.position">
            <option>Üst-Sol</option>
            <option>Üst-Sağ</option>
            <option>Alt-Sol</option>
            <option>Alt-Sağ</option>
            <option>Ortala</option>
          </select>
        </div>
        <div class="setting-group">
          <h4 class="setting-title">» Watermark Resim (png)</h4>
          <input type="file" @change="handleWatermarkUpload" />
          <img v-if="watermark.preview" :src="watermark.preview" class="logo-preview" />
        </div>
        <button class="save-btn" @click="saveWatermark">✓ Kaydet</button>
      </div>

      <!-- Resim Ayarları -->
      <div v-if="activeTab === 'image'" class="box">
        <div class="setting-group">
          <h4 class="setting-title">» Varsayılan Resim</h4>
          <input type="file" @change="handleImageUpload" />
          <img v-if="defaultImage.preview" :src="defaultImage.preview" class="logo-preview" />
        </div>
        <button class="save-btn" @click="saveDefaultImage">✓ Kaydet</button>
      </div>

      <!-- Çerez Uyarısı -->
      <div v-if="activeTab === 'cookie'" class="box">
        <div class="alert-info">💡 Çerez modülü sitenizin üst(header) veya alt(footer) alanında görünmektedir.</div>
        <div class="alert-warning">❗ Bu alan, ziyaretçi tarafından kabul edildiğinde gizlenir.</div>
        <div class="setting-group">
          <select v-model="cookie.status">
            <option>Aktif</option>
            <option>Pasif</option>
          </select>
          <select v-model="cookie.position">
            <option>Üst(Header)</option>
            <option>Alt(Footer)</option>
          </select>
          <input type="text" v-model="cookie.buttonText" placeholder="Buton Yazısı" />
        </div>
        <div class="setting-group">
          <input type="text" v-model="cookie.bgColor" placeholder="Arkaplan Rengi" />
          <input type="text" v-model="cookie.textColor" placeholder="Yazı Rengi" />
          <input type="text" v-model="cookie.buttonColor" placeholder="Buton Rengi" />
          <input type="text" v-model="cookie.buttonTextColor" placeholder="Buton Yazı Rengi" />
        </div>
        <textarea v-model="cookie.content" rows="5" style="width: 100%"></textarea>
        <button class="save-btn" @click="saveCookie">✓ Kaydet</button>
      </div>

      <!-- Tarayıcı Çubuğu Uyarısı -->
      <div v-if="activeTab === 'tabAlert'" class="box">
        <p>Tarayıcı çubuğu uyarısı ile sekme değiştiğinde başlığı değiştirebilirsiniz.</p>
        <img src="https://via.placeholder.com/500x60?text=Sekme+1" class="tab-alert-img" />
        <img src="https://via.placeholder.com/500x60?text=Nereye+Gittin%3F" class="tab-alert-img" />
        <div class="setting-group">
          <select v-model="tabAlert.status">
            <option>Aktif</option>
            <option>Pasif</option>
          </select>
          <input type="text" v-model="tabAlert.title" placeholder="Sekme Başlığı" />
        </div>
        <button class="save-btn" @click="saveTabAlert">✓ Kaydet</button>
      </div>

      <!-- Facebook Login -->
      <div v-if="activeTab === 'facebook'" class="box">
        <p><strong>Facebook uygulama</strong> ayarlarını aşağıdaki adımlara göre yapın:</p>
        <ul class="info-list">
          <li>Facebook App oluştur</li>
          <li>Valid redirect URI: <code>https://demo.eticaret.tv.tr/ajax.php?page=fb-login</code></li>
        </ul>
        <div class="setting-group">
          <select v-model="facebookLogin.status">
            <option>Aktif</option>
            <option>Pasif</option>
          </select>
          <input type="text" v-model="facebookLogin.appId" placeholder="App ID" />
          <input type="text" v-model="facebookLogin.appSecret" placeholder="App Secret" />
        </div>
        <button class="save-btn" @click="saveFacebookLogin">✓ Kaydet</button>
      </div>

      <!-- Google Login -->
      <div v-if="activeTab === 'google'" class="box">
        <ol class="info-list">
          <li><a href="https://console.developers.google.com" target="_blank">Google Console</a>'dan proje oluşturun</li>
          <li>Authorized redirect URI: <code>https://demo.eticaret.tv.tr/3rdparty/google-login</code></li>
        </ol>
        <div class="setting-group">
          <select v-model="googleLogin.status">
            <option>Aktif</option>
            <option>Pasif</option>
          </select>
          <input type="text" v-model="googleLogin.clientId" placeholder="Client ID" />
          <input type="text" v-model="googleLogin.clientSecret" placeholder="Client Secret" />
        </div>
        <button class="save-btn" @click="saveGoogleLogin">✓ Kaydet</button>
      </div>
    </section>

    <!-- Modal -->
    <ThemeCustomizeModal :visible="showModal" @close="showModal = false" />
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import ThemeCustomizeModal from './ThemeCustomizeModal.vue'

const activeTab = ref('theme')
const showModal = ref(false)

// Logo Ayarları
const logos = reactive([
  {
    key: 'siteMain',
    title: 'Site Ana Logosu',
    description: 'Sitenizin standart logosu.',
    preview: 'https://via.placeholder.com/150x50?text=Logo'
  },
  {
    key: 'mobile',
    title: 'Mobil Site Logo',
    description: 'Mobil platformlar için kullanılacak logo.',
    preview: 'https://via.placeholder.com/150x50?text=Logo'
  },
  {
    key: 'footer',
    title: 'Site Alt(Footer) Logo',
    description: 'Footer alanında görünecek logo.',
    preview: 'https://via.placeholder.com/150x50?text=Logo'
  },
  {
    key: 'email',
    title: 'E-Posta Logo',
    description: 'E-posta şablonlarında kullanılacak logo.',
    preview: 'https://via.placeholder.com/150x50?text=Logo'
  },
  {
    key: 'favicon',
    title: 'Favicon.ico',
    description: 'Tarayıcı sekmesinde görünen küçük simge.',
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
  alert('Logolar başarıyla kaydedildi.')
}

// Watermark
const watermark = reactive({
  status: 'Pasif',
  position: 'Alt-Sağ',
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
  alert('Watermark ayarları kaydedildi.')
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
  alert('Resim ayarları kaydedildi.')
}

// Çerez Uyarısı
const cookie = reactive({
  status: 'Aktif',
  position: 'Üst(Header)',
  buttonText: 'Kabul Et',
  bgColor: '#2b7ef8',
  textColor: '#ffffff',
  buttonColor: '#ffffff',
  buttonTextColor: '#2b7ef8',
  content: 'Bu web sitesinde çerez kullanımına izin verilmektedir. Çerez politikamızı incelemek için tıklayınız.'
})

const saveCookie = () => {
  console.log('Çerez Uyarısı:', cookie)
  alert('Çerez uyarısı kaydedildi.')
}

// Tarayıcı Uyarısı
const tabAlert = reactive({
  status: 'Aktif',
  title: 'Nereye Gittin?'
})

const saveTabAlert = () => {
  console.log('Sekme Uyarısı:', tabAlert)
  alert('Sekme uyarısı kaydedildi.')
}

// Facebook Login
const facebookLogin = reactive({
  status: 'Aktif',
  appId: '',
  appSecret: ''
})

const saveFacebookLogin = () => {
  console.log('Facebook Login:', facebookLogin)
  alert('Facebook login bilgileri kaydedildi.')
}

// Google Login
const googleLogin = reactive({
  status: 'Aktif',
  clientId: '',
  clientSecret: ''
})

const saveGoogleLogin = () => {
  console.log('Google Login:', googleLogin)
  alert('Google login bilgileri kaydedildi.')
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
}

/* Sidebar */
.sidebar {
  width: 260px;
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
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

/* İçerik alanı */
.content {
  flex: 1;
  background-color: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  border: 1px solid #e2e8f0;
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

.tag {
  background-color: #d1fae5;
  color: #059669;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 6px;
}

.box-desc {
  margin-top: 10px;
  color: #64748b;
  font-size: 14px;
  line-height: 1.6;
}

.button-group {
  margin-top: 20px;
  display: flex;
  gap: 12px;
}

/* Butonlar */
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
  transition: border 0.2s ease;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #3b82f6;
  outline: none;
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
</style>