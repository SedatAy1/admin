<template>
  <aside :class="['sidebar', { 'collapsed': isCollapsed, 'mobile': isMobile }]">

    <!-- Sidebar Üst Kısım: Logo -->
    <div class="sidebar-header">
      <router-link to="/" class="logo">
        <span v-if="!isCollapsed">Admin Panel</span>
      </router-link>
    </div>

    <ul class="sidebar-menu">
      <!-- Siparişler -->
      <li>
        <button class="btn btn-toggle d-flex align-items-center" data-bs-toggle="collapse" data-bs-target="#ordersMenu">
          <Package class="icon" />
          <span v-if="!isCollapsed">Siparişler</span>
        </button>
        <div class="collapse" id="ordersMenu">
          <ul class="submenu">
            <!-- Siparişler Alt Başlığı -->
            <li>
              <button class="btn btn-toggle d-flex align-items-center" data-bs-toggle="collapse" data-bs-target="#subOrdersMenu">
                <ClipboardList class="icon" />
                <span v-if="!isCollapsed">Siparişler</span>
              </button>
              <div class="collapse" id="subOrdersMenu">
                <ul class="submenu">
                  <li><router-link to="/orders/new" class="sidebar-link">Yeni Siparişler</router-link></li>
                  <li><router-link to="/orders/preparing" class="sidebar-link">Hazırlanan Siparişler</router-link></li>
                  <li><router-link to="/orders/shipped" class="sidebar-link">Kargolanan Siparişler</router-link></li>
                  <li><router-link to="/orders/delivered" class="sidebar-link">Teslim Edilen Siparişler</router-link></li>
                  <li><router-link to="/orders/requests" class="sidebar-link">Sipariş Talepleri</router-link></li>
                  <li><router-link to="/orders/cancelled" class="sidebar-link">İptal Edilenler</router-link></li>
                  <li><router-link to="/orders/incomplete" class="sidebar-link">Tamamlanmayan Siparişler</router-link></li>
                </ul>
              </div>
            </li>

            <!-- Diğer Alt Başlığı -->
            <li>
              <button class="btn btn-toggle d-flex align-items-center" data-bs-toggle="collapse" data-bs-target="#otherOrdersMenu">
                <Pin class="icon" />
                <span v-if="!isCollapsed">Diğer</span>
              </button>
              <div class="collapse" id="otherOrdersMenu">
                <ul class="submenu">
                  <li><router-link to="/orders/quick-sales">Hızlı Satış</router-link></li>
                  <li><router-link to="/orders/phone-orders">Telefonla Sipariş Talepleri</router-link></li>
                  <li><router-link to="/orders/active-carts">Aktif Sepetler</router-link></li>
                  <li><router-link to="/orders/bank-transfer">Havale Bildirimleri</router-link></li>
                  <li><router-link to="/orders/fault-reports">Arıza Bildirimleri</router-link></li>
                  <li><router-link to="/orders/sales-terminals">Satış Terminalleri</router-link></li>
                  <li><router-link to="/orders/bulk-actions">Toplu İşlemler</router-link></li>
                  <li><router-link to="/orders/quick-payments">Hızlı Ödemeler</router-link></li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </li>

<!-- Ürünler -->
<li>
  <button class="btn btn-toggle d-flex align-items-center" data-bs-toggle="collapse" data-bs-target="#productsMenu">
    <ShoppingBag class="icon" />
    <span v-if="!isCollapsed">Ürünler</span>
  </button>
  <div class="collapse" id="productsMenu">
    <ul class="submenu">
      <!-- Ürünler Alt Başlığı -->
      <li>
        <button class="btn btn-toggle d-flex align-items-center" data-bs-toggle="collapse" data-bs-target="#subProductsMenu">
          <Package class="icon" />
          <span v-if="!isCollapsed">Ürünler</span>
        </button>
        <div class="collapse" id="subProductsMenu">
          <ul class="submenu">
            <li><router-link to="/products/manage">Ürün Yönetimi</router-link></li>
            <li><router-link to="/products/categories">Kategori Yönetimi</router-link></li>
            <li><router-link to="/products/brands">Marka Yönetimi</router-link></li>
            <li><router-link to="/products/attributes">Nitelik Yönetimi</router-link></li>
            <li><router-link to="/products/custom-fields">Özel Alan Yönetimi</router-link></li>
            <li><router-link to="/products/compatibility-groups">Uyumluluk Grupları</router-link></li>
            <li><router-link to="/products/tags">Ürün Etiketleri</router-link></li>
            <li><router-link to="/products/search-matching">Arama Eşleştirme</router-link></li>
            <li><router-link to="/products/search-console">Arama Konsolu</router-link></li>
          </ul>
        </div>
      </li>

      <!-- Diğer Alt Başlığı -->
      <li>
        <button class="btn btn-toggle d-flex align-items-center" data-bs-toggle="collapse" data-bs-target="#otherProductsMenu">
          <Settings class="icon" />
          <span v-if="!isCollapsed">Diğer</span>
        </button>
        <div class="collapse" id="otherProductsMenu">
          <ul class="submenu">
            <li><router-link to="/products/marketplace-matching">Pazaryeri Eşleştirmeleri</router-link></li>
            <li><router-link to="/products/reviews">Ürün Yorumları</router-link></li>
            <li><router-link to="/products/recommendations">Ürün Önerileri</router-link></li>
            <li><router-link to="/products/advanced-sorting">Gelişmiş Ürün Sıralama</router-link></li>
            <li><router-link to="/products/bulk-actions">Toplu Ürün İşlemleri</router-link></li>
            <li><router-link to="/products/bulk-seo">Toplu SEO Güncelleme</router-link></li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</li>

<!-- Kampanyalar -->
<li>
  <button class="btn btn-toggle d-flex align-items-center" data-bs-toggle="collapse" data-bs-target="#campaignsMenu">
    <Target class="icon" />
    <span v-if="!isCollapsed">Kampanyalar</span>
  </button>
  <div class="collapse" id="campaignsMenu">
    <ul class="submenu">

      <!-- Kampanyalar Alt Başlığı -->
      <li>
        <button class="btn btn-toggle d-flex align-items-center" data-bs-toggle="collapse" data-bs-target="#subCampaignsMenu">
          <BadgePercent class="icon" />
          <span v-if="!isCollapsed">Kampanyalar</span>
        </button>
        <div class="collapse" id="subCampaignsMenu">
          <ul class="submenu">
            <li><router-link to="/campaigns/coupons">Kupon Yönetimi</router-link></li>
            <li><router-link to="/campaigns/promotions">Promosyonlar</router-link></li>
            <li><router-link to="/campaigns/member-discounts">Üye İndirimleri</router-link></li>
            <li><router-link to="/campaigns/dealer-discounts">Bayi İndirimleri</router-link></li>
            <li><router-link to="/campaigns/dealer-commissions">Bayi Komisyonları</router-link></li>
            <li><router-link to="/campaigns/fixed-discounts">Sabit İndirim</router-link></li>
            <li><router-link to="/campaigns/order-limits">Sipariş Limitleri</router-link></li>
            <li><router-link to="/campaigns/sales-quotas">Satış Kotaları</router-link></li>
          </ul>
        </div>
      </li>

      <!-- E-Posta Araçları -->
      <li>
        <button class="btn btn-toggle d-flex align-items-center" data-bs-toggle="collapse" data-bs-target="#emailToolsMenu">
          <Mail class="icon" />
          <span v-if="!isCollapsed">E-Posta Araçları</span>
        </button>
        <div class="collapse" id="emailToolsMenu">
          <ul class="submenu">
            <li><router-link to="/campaigns/email-list">Bülten Listesi</router-link></li>
            <li><router-link to="/campaigns/email-groups">Bülten Grupları</router-link></li>
            <li><router-link to="/campaigns/email-send">E-Posta Gönderimi</router-link></li>
          </ul>
        </div>
      </li>

      <!-- SMS Araçları -->
      <li>
        <button class="btn btn-toggle d-flex align-items-center" data-bs-toggle="collapse" data-bs-target="#smsToolsMenu">
          <MessageSquare class="icon" />
          <span v-if="!isCollapsed">SMS Araçları</span>
        </button>
        <div class="collapse" id="smsToolsMenu">
          <ul class="submenu">
            <li><router-link to="/campaigns/sms-list">Bülten Listesi</router-link></li>
            <li><router-link to="/campaigns/sms-groups">Bülten Grupları</router-link></li>
            <li><router-link to="/campaigns/sms-send">SMS Gönderimi</router-link></li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</li>
<!-- İçerikler -->
<li>
  <!-- Ana İçerikler Butonu -->
  <button class="btn btn-toggle d-flex align-items-center" data-bs-toggle="collapse" data-bs-target="#contentMenu">
    <FileText class="icon" />
    <span v-if="!isCollapsed">İçerikler</span>
  </button>
  <div class="collapse" id="contentMenu">
    <ul class="submenu">

      <!-- İçerik Yönetimi -->
      <li>
        <button class="btn btn-toggle d-flex align-items-center" data-bs-toggle="collapse" data-bs-target="#subContentMenu">
          <LayoutTemplate class="icon" />
          <span v-if="!isCollapsed">İçerik Yönetimi</span>
        </button>
        <div class="collapse" id="subContentMenu">
          <ul class="submenu">
            <li><router-link to="/contents/content-management/pages">Sayfalar</router-link></li>
            <li><router-link to="/contents/content-management/help">Yardım İçerikleri</router-link></li>
            <li><router-link to="/contents/content-management/faq">Sıkça Sorulan Sorular</router-link></li>
            <li><router-link to="/contents/content-management/blog">Blog Yönetimi</router-link></li>
            <li><router-link to="/contents/content-management/slides">Slayt Yönetimi</router-link></li>
            <li><router-link to="/contents/content-management/banners">Afiş Yönetimi</router-link></li>
            <li><router-link to="/contents/content-management/popup">Popup</router-link></li>
            <li><router-link to="/contents/content-management/upload">Görsel Yükle</router-link></li>
          </ul>
        </div>
      </li>

      <!-- URL Yönetimi -->
      <li>
        <button class="btn btn-toggle d-flex align-items-center" data-bs-toggle="collapse" data-bs-target="#urlMenu">
          <Link class="icon" />
          <span v-if="!isCollapsed">URL Yönetimi</span>
        </button>
        <div class="collapse" id="urlMenu">
          <ul class="submenu">
            <li><router-link to="/contents/url-management/url-redirect">URL Yönlendirme</router-link></li>
            <li><router-link to="/contents/url-management/404-reports">404 URL Raporları</router-link></li>
          </ul>
        </div>
      </li>

    </ul>
  </div>
</li>
<!-- Müşteriler -->
<li>
  <button class="btn btn-toggle d-flex align-items-center" data-bs-toggle="collapse" data-bs-target="#customersMenu">
    <Users class="icon" />
    <span v-if="!isCollapsed">Müşteriler</span>
  </button>
  <div class="collapse" id="customersMenu">
    <ul class="submenu">
      <li><router-link to="/customers/manage">Müşteri Yönetimi</router-link></li>
      <li><router-link to="/customers/risk">Riskli Müşteri Yönetimi</router-link></li>
      <li><router-link to="/customers/balances">Müşteri Bakiyeleri</router-link></li>
      <li><router-link to="/customers/dealers">Bayi Yönetimi</router-link></li>
      <li><router-link to="/customers/groups">Bayi Grupları</router-link></li>
      <li><router-link to="/customers/transactions">Bayi İşlemleri</router-link></li>
    </ul>
  </div>
</li>

<!-- Entegrasyonlar -->
<li>
  <button class="btn btn-toggle d-flex align-items-center" data-bs-toggle="collapse" data-bs-target="#integrationsMenu">
    <Network class="icon" />
    <span v-if="!isCollapsed">Entegrasyonlar</span>
  </button>
  <div class="collapse" id="integrationsMenu">
    <ul class="submenu">
      <li><router-link to="/integrations/marketplace">Pazaryeri Entegrasyonları</router-link></li>
      <li><router-link to="/integrations/accounting">Muhasebe Entegrasyonları</router-link></li>
      <li><router-link to="/integrations/excel">Hızlı Excel İşlemleri</router-link></li>
      <li><router-link to="/integrations/xml-import">XML İçeri Aktar</router-link></li>
      <li><router-link to="/integrations/xml-export">XML Dışarı Aktar</router-link></li>
      <li><router-link to="/integrations/bulk-marketplace">Toplu Pazaryeri İşlemleri</router-link></li>
      <li><router-link to="/integrations/hepsiburada">Hepsiburada İşlemleri</router-link></li>
      <li><router-link to="/integrations/monitor">Pazaryeri Monitorü</router-link></li>
    </ul>
  </div>
</li>

<!-- Tasarım -->
<li>
  <button class="btn btn-toggle d-flex align-items-center" data-bs-toggle="collapse" data-bs-target="#designMenu">
    <Palette class="icon" />
    <span v-if="!isCollapsed">Tasarım</span>
  </button>
  <div class="collapse" id="designMenu">
    <ul class="submenu">
      <li><router-link to="/design/theme-settings">Tema Ayarları</router-link></li>
      <li><router-link to="/design/module-layout">Modül Yerleşimi</router-link></li>
      <li><router-link to="/design/print-templates">Yazdırma Şablonları</router-link></li>
      <li><router-link to="/design/email-templates">E-Posta Tasarımları</router-link></li>
    </ul>
  </div>
</li>
<!-- Raporlar -->
<li>
  <button class="btn btn-toggle d-flex align-items-center" data-bs-toggle="collapse" data-bs-target="#reportsMenu">
    <BarChart2 class="icon" />
    <span v-if="!isCollapsed">Raporlar</span>
  </button>
  <div class="collapse" id="reportsMenu">
    <ul class="submenu">

      <!-- Sipariş Raporları -->
      <li>
        <button class="btn btn-toggle d-flex align-items-center" data-bs-toggle="collapse" data-bs-target="#orderReportsMenu">
          <Package class="icon" />
          <span v-if="!isCollapsed">Sipariş Raporları</span>
        </button>
        <div class="collapse" id="orderReportsMenu">
          <ul class="submenu">
            <li><router-link to="/reports/orders/daily">Günlük Sipariş Raporu</router-link></li>
            <li><router-link to="/reports/orders/weekly">Haftalık Sipariş Raporu</router-link></li>
            <li><router-link to="/reports/orders/monthly">Aylık Sipariş Raporu</router-link></li>
            <li><router-link to="/reports/orders/yearly">Yıllık Sipariş Raporu</router-link></li>
            <li><router-link to="/reports/orders/platform">Platform Bazlı Rapor</router-link></li>
            <li><router-link to="/reports/orders/store">Mağaza Bazlı Rapor</router-link></li>
            <li><router-link to="/reports/orders/product-sales">Ürün Bazlı Satış Raporu</router-link></li>
            <li><router-link to="/reports/orders/variant-sales">Varyant Bazlı Satış Raporu</router-link></li>
            <li><router-link to="/reports/orders/category-sales">Kategori Satış Raporu</router-link></li>
            <li><router-link to="/reports/orders/brand-sales">Marka Satış Raporu</router-link></li>
            <li><router-link to="/reports/orders/payment">Ödeme Yöntemi Raporu</router-link></li>
            <li><router-link to="/reports/orders/source">Ürün Kaynağı Raporu</router-link></li>
            <li><router-link to="/reports/orders/city">Şehir Bazlı Rapor</router-link></li>
            <li><router-link to="/reports/orders/country">Ülke Bazlı Rapor</router-link></li>
            <li><router-link to="/reports/orders/accounting">Muhasebe Raporu</router-link></li>
            <li><router-link to="/reports/orders/list">Sipariş Listesi</router-link></li>
            <li><router-link to="/reports/orders/fast-delivery">Hızlı Teslimat Listesi</router-link></li>
          </ul>
        </div>
      </li>

      <!-- Ürün Raporları -->
      <li>
        <button class="btn btn-toggle d-flex align-items-center" data-bs-toggle="collapse" data-bs-target="#productReportsMenu">
          <ShoppingCart class="icon" />
          <span v-if="!isCollapsed">Ürün Raporları</span>
        </button>
        <div class="collapse" id="productReportsMenu">
          <ul class="submenu">
            <li><router-link to="/reports/products/stock">Stok Raporu</router-link></li>
            <li><router-link to="/reports/products/variant-stock">Varyant Stok Raporu</router-link></li>
            <li><router-link to="/reports/products/stock-movements">Stok Hareketleri</router-link></li>
            <li><router-link to="/reports/products/sales">Ürün Satış Raporu</router-link></li>
            <li><router-link to="/reports/products/variant-sales">Ürün Satış Raporu (Varyantlı)</router-link></li>
            <li><router-link to="/reports/products/category-sales">Kategori Satış Raporu</router-link></li>
            <li><router-link to="/reports/products/brand-sales">Marka Satış Raporu</router-link></li>
            <li><router-link to="/reports/products/tag-sales">Etiket Satış Raporu</router-link></li>
            <li><router-link to="/reports/products/source-sales">Kaynak Satış Raporu</router-link></li>
            <li><router-link to="/reports/products/top-rated">En Çok Puanlanan Ürünler</router-link></li>
            <li><router-link to="/reports/products/favorites">Favori Ürünler Raporu</router-link></li>
            <li><router-link to="/reports/products/summary">Ürün Özet Raporu</router-link></li>
            <li><router-link to="/reports/products/recommended">Tavsiye Edilen Ürünler</router-link></li>
            <li><router-link to="/reports/products/price-alerts">Fiyat Alarmı Kurulan Ürünler</router-link></li>
            <li><router-link to="/reports/products/stock-alerts">Stok Alarmı Kurulan Ürünler</router-link></li>
          </ul>
        </div>
      </li>

      <!-- Üye / Bayi Raporları -->
      <li>
        <button class="btn btn-toggle d-flex align-items-center" data-bs-toggle="collapse" data-bs-target="#memberReportsMenu">
          <UserRound class="icon" />
          <span v-if="!isCollapsed">Üye / Bayi Raporları</span>
        </button>
        <div class="collapse" id="memberReportsMenu">
          <ul class="submenu">
            <li><router-link to="/reports/members/new">Yeni Üyelik Raporu</router-link></li>
            <li><router-link to="/reports/members/login">Üye Giriş Raporu</router-link></li>
            <li><router-link to="/reports/members/orders">Üye Sipariş Raporu</router-link></li>
            <li><router-link to="/reports/members/dealer-orders">Bayi Sipariş Raporu</router-link></li>
            <li><router-link to="/reports/members/dealer-balance">Bayi Bakiye Raporu</router-link></li>
            <li><router-link to="/reports/members/dealer-deposits">Bayi Bakiye Yükleme Raporu</router-link></li>
            <li><router-link to="/reports/members/dealer-activities">Bayi Hareketleri</router-link></li>
            <li><router-link to="/reports/members/price-alerts">Fiyat Alarmları</router-link></li>
            <li><router-link to="/reports/members/stock-alerts">Stok Alarmları</router-link></li>
          </ul>
        </div>
      </li>

      <!-- Sistem Raporları -->
      <li>
        <button class="btn btn-toggle d-flex align-items-center" data-bs-toggle="collapse" data-bs-target="#systemReportsMenu">
          <Monitor class="icon" />
          <span v-if="!isCollapsed">Sistem Raporları</span>
        </button>
        <div class="collapse" id="systemReportsMenu">
          <ul class="submenu">
            <li><router-link to="/reports/system/logs">Yönetici Logları</router-link></li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</li>

<!-- Ayarlar -->
<li>
  <button class="btn btn-toggle d-flex align-items-center" data-bs-toggle="collapse" data-bs-target="#settingsMenu">
    <Settings class="icon" />
    <span v-if="!isCollapsed">Ayarlar</span>
  </button>
  <div class="collapse" id="settingsMenu">
    <ul class="submenu">
      <li><router-link to="/settings/general">Genel Ayarlar</router-link></li>
      <li><router-link to="/settings/seo">SEO Ayarları</router-link></li>
      <li><router-link to="/settings/marketing">Pazarlama Araçları</router-link></li>
      <li><router-link to="/settings/contracts">Sözleşmeler</router-link></li>
      <li><router-link to="/settings/orders">Sipariş Ayarları</router-link></li>
      <li><router-link to="/settings/products">Ürün Ayarları</router-link></li>
      <li><router-link to="/settings/payment-methods">Ödeme Yöntemleri</router-link></li>
      <li><router-link to="/settings/exchange-rates">Döviz Kurları</router-link></li>
      <li><router-link to="/settings/shipping-companies">Kargo Firmaları</router-link></li>
      <li><router-link to="/settings/shipping">Kargo Ayarları</router-link></li>
      <li><router-link to="/settings/assembly-points">Montaj Noktaları</router-link></li>
      <li><router-link to="/settings/countries">Ülkeler</router-link></li>
      <li><router-link to="/settings/languages">Diller</router-link></li>
      <li><router-link to="/settings/sms">SMS Ayarları</router-link></li>
      <li><router-link to="/settings/sms-templates">SMS Şablonları</router-link></li>
      <li><router-link to="/settings/email">E-Posta Ayarları</router-link></li>
      <li><router-link to="/settings/email-templates">E-Posta Şablonları</router-link></li>
      <li><router-link to="/settings/maintenance">Bakım Modu</router-link></li>
      <li><router-link to="/settings/balance">Bakiye Ayarları</router-link></li>
      <li><router-link to="/settings/dealer">Bayi Ayarları</router-link></li>
      <li><router-link to="/settings/dealer-xml">Bayi XML Ayarları</router-link></li>
      <li><router-link to="/settings/quick-payment">Hızlı Ödeme Ayarları</router-link></li>
      <li><router-link to="/settings/web-service">Web Servis Ayarları</router-link></li>
      <li><router-link to="/settings/admin-accounts">Yönetici Hesapları</router-link></li>
      <li><router-link to="/settings/security">Güvenlik Ayarları</router-link></li>
      <li><router-link to="/settings/site">Site Ayarları</router-link></li>
    </ul>
  </div>
</li>

  </ul>
  </aside>
  </template>

<script>
import { Package, ClipboardList, Pin } from 'lucide-vue-next'
import { ShoppingBag, Settings } from 'lucide-vue-next'
import { Target, BadgePercent, Mail, MessageSquare } from 'lucide-vue-next'
import { FileText, LayoutTemplate, Link } from 'lucide-vue-next'
import { Users, Network, Palette } from 'lucide-vue-next'
import { BarChart2, ShoppingCart, UserRound, Monitor } from 'lucide-vue-next'

export default {
  name: "SidebarComponent",
  props: {
    isCollapsed: Boolean,
  },
  components: {
    Package,
    ClipboardList,
    Pin,
    ShoppingBag,
    Settings,
    Target,
    BadgePercent,
    Mail,
    MessageSquare,
    FileText,
    LayoutTemplate,
    Link,
    Users,
    Network,
    Palette,
    BarChart2,
    ShoppingCart,
    UserRound,
    Monitor
  },
  data() {
    return {
      isMobile: window.innerWidth < 768,
    };
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    },
    handleResize() {
      this.isMobile = window.innerWidth < 768;
    }
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  }
};
</script>
<style scoped>

.icon {
  width: 18px;
  height: 18px;
  margin-right: 12px;
  stroke-width: 1.6;
  flex-shrink: 0;
  transition: transform 0.2s ease, stroke 0.2s ease;
}

/* Buton içi boşluk */
.btn-toggle {
  gap: 10px;
  display: flex;
  align-items: center;
  width: 100%;
  border: none;
  background: none;
  color: inherit;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* Hover efekti */
.btn-toggle:hover {
  background-color: #f5f5f5;
  color: #007bff;
}

.btn-toggle:hover .icon {
  stroke: #007bff;
  transform: scale(1.15);
}

/* Sidebar container */
.sidebar {
  width: 250px;
  height: 100vh;
  background: #fff;
  border-right: 1px solid #ddd;
  padding: 20px;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
  transition: all 0.3s ease-in-out;
  z-index: 1000;
}

/* Collapse durumu */
.sidebar.collapsed {
  width: 80px;
  padding: 10px;
}

.sidebar.collapsed .btn-toggle {
  justify-content: center;
}

.sidebar.collapsed .btn-toggle .icon + span {
  display: none;
}

/* Header ve logo */
.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.logo-img {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

/* Menü yapısı */
.sidebar-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-menu li {
  margin-bottom: 10px;
  position: relative;
}

/* Router link yapısı */
.sidebar-menu a {
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #333;
  padding: 10px;
  border-radius: 5px;
  transition: 0.3s;
}

.sidebar-menu a:hover {
  background: #f8f9fa;
}

/* Aktif menü */
.sidebar-menu .router-link-active {
  background: #e9f1ff;
  color: #007bff;
  font-weight: 500;
}

.sidebar-menu .router-link-active .icon {
  stroke: #007bff;
}

/* Alt menü */
.submenu {
  list-style: none;
  padding-left: 20px;
  margin-top: 5px;
}

.submenu.open {
  max-height: 500px;
}

.submenu li a {
  font-size: 14px;
  padding: 8px 10px;
  color: #555;
  display: block;
  border-radius: 4px;
  transition: 0.2s ease;
}

.submenu li a:hover {
  background: #f1f1f1;
  color: #000;
}
</style>