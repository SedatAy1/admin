<template>
  <aside :class="['sidebar', {
    'collapsed': isCollapsed && !isMobile,
    'mobile-open': isSidebarOpen
  }]">
    <!-- Mobil Menü Açma Butonu -->
    <button v-if="isMobile" @click="toggleSidebar" class="mobile-toggle-btn">
      <i class="bi bi-x-lg"></i>
    </button>

    <!-- Logo -->
    <div class="sidebar-header logo-wrapper">
      <router-link to="/" class="logo-link">
        <img src="@/assets/image2.png" alt="Admin Panel Logo" class="logo-image" />
      </router-link>
    </div>

    <ul class="sidebar-menu">
      <!-- Siparişler -->
<!-- Siparişler -->
<li>
  <button
  class="btn btn-toggle d-flex align-items-center"
  data-bs-toggle="collapse"
  data-bs-target="#ordersMenu"
  :class="{ active: $route.path.startsWith('/orders') }"
>
  <Package class="icon" />
  <span v-if="!isCollapsed">{{ $t('sidebar.orders') }}</span>
</button>
  <div class="collapse" id="ordersMenu">
    <ul class="submenu">
      <!-- Siparişler Alt Başlığı -->
      <li>
        <button class="btn btn-toggle d-flex align-items-center" data-bs-toggle="collapse" data-bs-target="#subOrdersMenu">
          <ClipboardList class="icon" />
          <span v-if="!isCollapsed">{{ $t('sidebar.orders_sub.orders') }}</span>
        </button>
        <div class="collapse" id="subOrdersMenu">
          <ul class="submenu">
            <li><router-link to="/orders/new">{{ $t('sidebar.orders_sub.new') }}</router-link></li>
            <li><router-link to="/orders/preparing">{{ $t('sidebar.orders_sub.preparing') }}</router-link></li>
            <li><router-link to="/orders/shipped">{{ $t('sidebar.orders_sub.shipped') }}</router-link></li>
            <li><router-link to="/orders/delivered">{{ $t('sidebar.orders_sub.delivered') }}</router-link></li>
            <li><router-link to="/orders/requests">{{ $t('sidebar.orders_sub.requests') }}</router-link></li>
            <li><router-link to="/orders/cancelled">{{ $t('sidebar.orders_sub.cancelled') }}</router-link></li>
            <li><router-link to="/orders/incomplete">{{ $t('sidebar.orders_sub.incomplete') }}</router-link></li>
          </ul>
        </div>
      </li>

      <!-- Diğer Alt Başlığı -->
      <li>
        <button class="btn btn-toggle d-flex align-items-center" data-bs-toggle="collapse" data-bs-target="#otherOrdersMenu">
          <Pin class="icon" />
          <span v-if="!isCollapsed">{{ $t('sidebar.orders_sub.other') }}</span>
        </button>
        <div class="collapse" id="otherOrdersMenu">
          <ul class="submenu">
            <li><router-link to="/orders/quick-sales">{{ $t('sidebar.orders_sub.quick_sales') }}</router-link></li>
            <li><router-link to="/orders/phone-orders">{{ $t('sidebar.orders_sub.phone_orders') }}</router-link></li>
            <li><router-link to="/orders/active-carts">{{ $t('sidebar.orders_sub.active_carts') }}</router-link></li>
            <li><router-link to="/orders/bank-transfer">{{ $t('sidebar.orders_sub.bank_transfer') }}</router-link></li>
            <li><router-link to="/orders/fault-reports">{{ $t('sidebar.orders_sub.fault_reports') }}</router-link></li>
            <li><router-link to="/orders/sales-terminals">{{ $t('sidebar.orders_sub.sales_terminals') }}</router-link></li>
            <li><router-link to="/orders/bulk-actions">{{ $t('sidebar.orders_sub.bulk_actions') }}</router-link></li>
            <li><router-link to="/orders/quick-payments">{{ $t('sidebar.orders_sub.quick_payments') }}</router-link></li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</li>

<!-- Ürünler -->
<!-- Ürünler -->
<li>
  <button
  class="btn btn-toggle d-flex align-items-center"
  data-bs-toggle="collapse"
  data-bs-target="#productsMenu"
  :class="{ active: $route.path.startsWith('/products') }"
>
  <ShoppingBag class="icon" />
  <span v-if="!isCollapsed">{{ $t('sidebar.products') }}</span>
</button>
  <div class="collapse" id="productsMenu">
    <ul class="submenu">
      <!-- Ürünler Alt Başlığı -->
      <li>
        <button class="btn btn-toggle d-flex align-items-center" data-bs-toggle="collapse" data-bs-target="#subProductsMenu">
          <Package class="icon" />
          <span v-if="!isCollapsed">{{ $t('sidebar.products_sub.products') }}</span>
        </button>
        <div class="collapse" id="subProductsMenu">
          <ul class="submenu">
            <li><router-link to="/products/manage">{{ $t('sidebar.products_sub.manage') }}</router-link></li>
            <li><router-link to="/products/categories">{{ $t('sidebar.products_sub.categories') }}</router-link></li>
            <li><router-link to="/products/brands">{{ $t('sidebar.products_sub.brands') }}</router-link></li>
            <li><router-link to="/products/attributes">{{ $t('sidebar.products_sub.attributes') }}</router-link></li>
            <li><router-link to="/products/custom-fields">{{ $t('sidebar.products_sub.custom_fields') }}</router-link></li>
            <li><router-link to="/products/compatibility-groups">{{ $t('sidebar.products_sub.compatibility_groups') }}</router-link></li>
            <li><router-link to="/products/tags">{{ $t('sidebar.products_sub.tags') }}</router-link></li>
            <li><router-link to="/products/search-matching">{{ $t('sidebar.products_sub.search_matching') }}</router-link></li>
            <li><router-link to="/products/search-console">{{ $t('sidebar.products_sub.search_console') }}</router-link></li>
          </ul>
        </div>
      </li>

      <!-- Diğer Alt Başlığı -->
      <li>
        <button class="btn btn-toggle d-flex align-items-center" data-bs-toggle="collapse" data-bs-target="#otherProductsMenu">
          <Settings class="icon" />
          <span v-if="!isCollapsed">{{ $t('sidebar.products_sub.other') }}</span>
        </button>
        <div class="collapse" id="otherProductsMenu">
          <ul class="submenu">
            <li><router-link to="/products/marketplace-matching">{{ $t('sidebar.products_sub.marketplace_matching') }}</router-link></li>
            <li><router-link to="/products/reviews">{{ $t('sidebar.products_sub.reviews') }}</router-link></li>
            <li><router-link to="/products/recommendations">{{ $t('sidebar.products_sub.recommendations') }}</router-link></li>
            <li><router-link to="/products/advanced-sorting">{{ $t('sidebar.products_sub.advanced_sorting') }}</router-link></li>
            <li><router-link to="/products/bulk-actions">{{ $t('sidebar.products_sub.bulk_actions') }}</router-link></li>
            <li><router-link to="/products/bulk-seo">{{ $t('sidebar.products_sub.bulk_seo') }}</router-link></li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</li>
<!-- Kampanyalar -->
<!-- Kampanyalar -->
<li>
  <button
  class="btn btn-toggle d-flex align-items-center"
  data-bs-toggle="collapse"
  data-bs-target="#campaignsMenu"
  :class="{ active: $route.path.startsWith('/campaigns') }"
>
  <Target class="icon" />
  <span v-if="!isCollapsed">{{ $t('sidebar.campaigns') }}</span>
</button>
  <div class="collapse" id="campaignsMenu">
    <ul class="submenu">

      <!-- Kampanyalar Alt Başlığı -->
      <li>
        <button class="btn btn-toggle d-flex align-items-center" data-bs-toggle="collapse" data-bs-target="#subCampaignsMenu">
          <BadgePercent class="icon" />
          <span v-if="!isCollapsed">{{ $t('sidebar.campaigns_sub.campaigns') }}</span>
        </button>
        <div class="collapse" id="subCampaignsMenu">
          <ul class="submenu">
            <li><router-link to="/campaigns/coupons">{{ $t('sidebar.campaigns_sub.coupons') }}</router-link></li>
            <li><router-link to="/campaigns/promotions">{{ $t('sidebar.campaigns_sub.promotions') }}</router-link></li>
            <li><router-link to="/campaigns/member-discounts">{{ $t('sidebar.campaigns_sub.member_discounts') }}</router-link></li>
            <li><router-link to="/campaigns/dealer-discounts">{{ $t('sidebar.campaigns_sub.dealer_discounts') }}</router-link></li>
            <li><router-link to="/campaigns/dealer-commissions">{{ $t('sidebar.campaigns_sub.dealer_commissions') }}</router-link></li>
            <li><router-link to="/campaigns/fixed-discounts">{{ $t('sidebar.campaigns_sub.fixed_discounts') }}</router-link></li>
            <li><router-link to="/campaigns/order-limits">{{ $t('sidebar.campaigns_sub.order_limits') }}</router-link></li>
            <li><router-link to="/campaigns/sales-quotas">{{ $t('sidebar.campaigns_sub.sales_quotas') }}</router-link></li>
          </ul>
        </div>
      </li>

      <!-- E-Posta Araçları -->
      <li>
        <button class="btn btn-toggle d-flex align-items-center" data-bs-toggle="collapse" data-bs-target="#emailToolsMenu">
          <Mail class="icon" />
          <span v-if="!isCollapsed">{{ $t('sidebar.campaigns_sub.email_tools') }}</span>
        </button>
        <div class="collapse" id="emailToolsMenu">
          <ul class="submenu">
            <li><router-link to="/campaigns/email-list">{{ $t('sidebar.campaigns_sub.email_list') }}</router-link></li>
            <li><router-link to="/campaigns/email-groups">{{ $t('sidebar.campaigns_sub.email_groups') }}</router-link></li>
            <li><router-link to="/campaigns/email-send">{{ $t('sidebar.campaigns_sub.email_send') }}</router-link></li>
          </ul>
        </div>
      </li>

      <!-- SMS Araçları -->
      <li>
        <button class="btn btn-toggle d-flex align-items-center" data-bs-toggle="collapse" data-bs-target="#smsToolsMenu">
          <MessageSquare class="icon" />
          <span v-if="!isCollapsed">{{ $t('sidebar.campaigns_sub.sms_tools') }}</span>
        </button>
        <div class="collapse" id="smsToolsMenu">
          <ul class="submenu">
            <li><router-link to="/campaigns/sms-list">{{ $t('sidebar.campaigns_sub.sms_list') }}</router-link></li>
            <li><router-link to="/campaigns/sms-groups">{{ $t('sidebar.campaigns_sub.sms_groups') }}</router-link></li>
            <li><router-link to="/campaigns/sms-send">{{ $t('sidebar.campaigns_sub.sms_send') }}</router-link></li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</li>
<!-- İçerikler -->
<!-- İçerikler -->
<li>
  <button
  class="btn btn-toggle d-flex align-items-center"
  data-bs-toggle="collapse"
  data-bs-target="#contentMenu"
  :class="{ active: $route.path.startsWith('/contents') }"
>
  <FileText class="icon" />
  <span v-if="!isCollapsed">{{ $t('sidebar.contents') }}</span>
</button>
  <div class="collapse" id="contentMenu">
    <ul class="submenu">

      <!-- İçerik Yönetimi -->
      <li>
        <button class="btn btn-toggle d-flex align-items-center" data-bs-toggle="collapse" data-bs-target="#subContentMenu">
          <LayoutTemplate class="icon" />
          <span v-if="!isCollapsed">{{ $t('sidebar.contents_sub.content_management') }}</span>
        </button>
        <div class="collapse" id="subContentMenu">
          <ul class="submenu">
            <li><router-link to="/contents/content-management/pages">{{ $t('sidebar.contents_sub.pages') }}</router-link></li>
            <li><router-link to="/contents/content-management/help">{{ $t('sidebar.contents_sub.help') }}</router-link></li>
            <li><router-link to="/contents/content-management/faq">{{ $t('sidebar.contents_sub.faq') }}</router-link></li>
            <li><router-link to="/contents/content-management/blog">{{ $t('sidebar.contents_sub.blog') }}</router-link></li>
            <li><router-link to="/contents/content-management/slides">{{ $t('sidebar.contents_sub.slides') }}</router-link></li>
            <li><router-link to="/contents/content-management/banners">{{ $t('sidebar.contents_sub.banners') }}</router-link></li>
            <li><router-link to="/contents/content-management/popup">{{ $t('sidebar.contents_sub.popup') }}</router-link></li>
            <li><router-link to="/contents/content-management/upload">{{ $t('sidebar.contents_sub.upload') }}</router-link></li>
          </ul>
        </div>
      </li>

      <!-- URL Yönetimi -->
      <li>
        <button class="btn btn-toggle d-flex align-items-center" data-bs-toggle="collapse" data-bs-target="#urlMenu">
          <Link class="icon" />
          <span v-if="!isCollapsed">{{ $t('sidebar.contents_sub.url_management') }}</span>
        </button>
        <div class="collapse" id="urlMenu">
          <ul class="submenu">
            <li><router-link to="/contents/url-management/url-redirect">{{ $t('sidebar.contents_sub.url_redirect') }}</router-link></li>
            <li><router-link to="/contents/url-management/404-reports">{{ $t('sidebar.contents_sub.reports_404') }}</router-link></li>
          </ul>
        </div>
      </li>

    </ul>
  </div>
</li>
<!-- Müşteriler -->
<!-- Müşteriler -->
<li>
  <button
  class="btn btn-toggle d-flex align-items-center"
  data-bs-toggle="collapse"
  data-bs-target="#customersMenu"
  :class="{ active: $route.path.startsWith('/customers') }"
>
  <Users class="icon" />
  <span v-if="!isCollapsed">{{ $t('sidebar.customers') }}</span>
</button>
  <div class="collapse" id="customersMenu">
    <ul class="submenu">
      <li><router-link to="/customers/manage">{{ $t('sidebar.customers_sub.manage') }}</router-link></li>
      <li><router-link to="/customers/risk">{{ $t('sidebar.customers_sub.risk') }}</router-link></li>
      <li><router-link to="/customers/balances">{{ $t('sidebar.customers_sub.balances') }}</router-link></li>
      <li><router-link to="/customers/dealers">{{ $t('sidebar.customers_sub.dealers') }}</router-link></li>
      <li><router-link to="/customers/groups">{{ $t('sidebar.customers_sub.groups') }}</router-link></li>
      <li><router-link to="/customers/transactions">{{ $t('sidebar.customers_sub.transactions') }}</router-link></li>
    </ul>
  </div>
</li>

<!-- Entegrasyonlar -->
<!-- Entegrasyonlar -->
<li>
  <button
  class="btn btn-toggle d-flex align-items-center"
  data-bs-toggle="collapse"
  data-bs-target="#integrationsMenu"
  :class="{ active: $route.path.startsWith('/integrations') }"
>
  <Network class="icon" />
  <span v-if="!isCollapsed">{{ $t('sidebar.integrations') }}</span>
</button>
  <div class="collapse" id="integrationsMenu">
    <ul class="submenu">
      <li><router-link to="/integrations/marketplace">{{ $t('sidebar.integrations_sub.marketplace') }}</router-link></li>
      <li><router-link to="/integrations/accounting">{{ $t('sidebar.integrations_sub.accounting') }}</router-link></li>
      <li><router-link to="/integrations/excel">{{ $t('sidebar.integrations_sub.excel') }}</router-link></li>
      <li><router-link to="/integrations/xml-import">{{ $t('sidebar.integrations_sub.xml_import') }}</router-link></li>
      <li><router-link to="/integrations/xml-export">{{ $t('sidebar.integrations_sub.xml_export') }}</router-link></li>
      <li><router-link to="/integrations/bulk-marketplace">{{ $t('sidebar.integrations_sub.bulk_marketplace') }}</router-link></li>
      <li><router-link to="/integrations/hepsiburada">{{ $t('sidebar.integrations_sub.hepsiburada') }}</router-link></li>
      <li><router-link to="/integrations/monitor">{{ $t('sidebar.integrations_sub.monitor') }}</router-link></li>
    </ul>
  </div>
</li>

<!-- Tasarım -->
<li>
  <button
  class="btn btn-toggle d-flex align-items-center"
  data-bs-toggle="collapse"
  data-bs-target="#designMenu"
  :class="{ active: $route.path.startsWith('/design') }"
>
  <Palette class="icon" />
  <span v-if="!isCollapsed">{{ $t('sidebar.design') }}</span>
</button>
  <div class="collapse" id="designMenu">
    <ul class="submenu">
      <li><router-link to="/design/theme-settings">{{ $t('sidebar.design_sub.theme_settings') }}</router-link></li>
      <li><router-link to="/design/module-layout">{{ $t('sidebar.design_sub.module_layout') }}</router-link></li>
      <li><router-link to="/design/print-templates">{{ $t('sidebar.design_sub.print_templates') }}</router-link></li>
      <li><router-link to="/design/email-templates">{{ $t('sidebar.design_sub.email_templates') }}</router-link></li>
    </ul>
  </div>
</li>
<!-- Raporlar -->
<!-- Raporlar -->
<li>
  <button
  class="btn btn-toggle d-flex align-items-center"
  data-bs-toggle="collapse"
  data-bs-target="#reportsMenu"
  :class="{ active: $route.path.startsWith('/reports') }"
>
  <BarChart2 class="icon" />
  <span v-if="!isCollapsed">{{ $t('sidebar.reports') }}</span>
</button>
  <div class="collapse" id="reportsMenu">
    <ul class="submenu">

      <!-- Sipariş Raporları -->
      <li>
        <button class="btn btn-toggle d-flex align-items-center" data-bs-toggle="collapse" data-bs-target="#orderReportsMenu">
          <Package class="icon" />
          <span v-if="!isCollapsed">{{ $t('sidebar.reports_sub.orders') }}</span>
        </button>
        <div class="collapse" id="orderReportsMenu">
          <ul class="submenu">
            <li><router-link to="/reports/orders/daily">{{ $t('sidebar.reports_sub.daily') }}</router-link></li>
            <li><router-link to="/reports/orders/weekly">{{ $t('sidebar.reports_sub.weekly') }}</router-link></li>
            <li><router-link to="/reports/orders/monthly">{{ $t('sidebar.reports_sub.monthly') }}</router-link></li>
            <li><router-link to="/reports/orders/yearly">{{ $t('sidebar.reports_sub.yearly') }}</router-link></li>
            <li><router-link to="/reports/orders/platform">{{ $t('sidebar.reports_sub.platform') }}</router-link></li>
            <li><router-link to="/reports/orders/store">{{ $t('sidebar.reports_sub.store') }}</router-link></li>
            <li><router-link to="/reports/orders/product-sales">{{ $t('sidebar.reports_sub.product_sales') }}</router-link></li>
            <li><router-link to="/reports/orders/variant-sales">{{ $t('sidebar.reports_sub.variant_sales') }}</router-link></li>
            <li><router-link to="/reports/orders/category-sales">{{ $t('sidebar.reports_sub.category_sales') }}</router-link></li>
            <li><router-link to="/reports/orders/brand-sales">{{ $t('sidebar.reports_sub.brand_sales') }}</router-link></li>
            <li><router-link to="/reports/orders/payment">{{ $t('sidebar.reports_sub.payment') }}</router-link></li>
            <li><router-link to="/reports/orders/source">{{ $t('sidebar.reports_sub.source') }}</router-link></li>
            <li><router-link to="/reports/orders/city">{{ $t('sidebar.reports_sub.city') }}</router-link></li>
            <li><router-link to="/reports/orders/country">{{ $t('sidebar.reports_sub.country') }}</router-link></li>
            <li><router-link to="/reports/orders/accounting">{{ $t('sidebar.reports_sub.accounting') }}</router-link></li>
            <li><router-link to="/reports/orders/list">{{ $t('sidebar.reports_sub.list') }}</router-link></li>
            <li><router-link to="/reports/orders/fast-delivery">{{ $t('sidebar.reports_sub.fast_delivery') }}</router-link></li>
          </ul>
        </div>
      </li>

      <!-- Ürün Raporları -->
      <li>
        <button class="btn btn-toggle d-flex align-items-center" data-bs-toggle="collapse" data-bs-target="#productReportsMenu">
          <ShoppingCart class="icon" />
          <span v-if="!isCollapsed">{{ $t('sidebar.reports_sub.products') }}</span>
        </button>
        <div class="collapse" id="productReportsMenu">
          <ul class="submenu">
            <li><router-link to="/reports/products/stock">{{ $t('sidebar.reports_sub.stock') }}</router-link></li>
            <li><router-link to="/reports/products/variant-stock">{{ $t('sidebar.reports_sub.variant_stock') }}</router-link></li>
            <li><router-link to="/reports/products/stock-movements">{{ $t('sidebar.reports_sub.stock_movements') }}</router-link></li>
            <li><router-link to="/reports/products/sales">{{ $t('sidebar.reports_sub.product_sales_report') }}</router-link></li>
            <li><router-link to="/reports/products/variant-sales">{{ $t('sidebar.reports_sub.variant_sales_report') }}</router-link></li>
            <li><router-link to="/reports/products/category-sales">{{ $t('sidebar.reports_sub.product_category_sales') }}</router-link></li>
            <li><router-link to="/reports/products/brand-sales">{{ $t('sidebar.reports_sub.product_brand_sales') }}</router-link></li>
            <li><router-link to="/reports/products/tag-sales">{{ $t('sidebar.reports_sub.tag_sales') }}</router-link></li>
            <li><router-link to="/reports/products/source-sales">{{ $t('sidebar.reports_sub.source_sales') }}</router-link></li>
            <li><router-link to="/reports/products/top-rated">{{ $t('sidebar.reports_sub.top_rated') }}</router-link></li>
            <li><router-link to="/reports/products/favorites">{{ $t('sidebar.reports_sub.favorites') }}</router-link></li>
            <li><router-link to="/reports/products/summary">{{ $t('sidebar.reports_sub.summary') }}</router-link></li>
            <li><router-link to="/reports/products/recommended">{{ $t('sidebar.reports_sub.recommended') }}</router-link></li>
            <li><router-link to="/reports/products/price-alerts">{{ $t('sidebar.reports_sub.price_alerts') }}</router-link></li>
            <li><router-link to="/reports/products/stock-alerts">{{ $t('sidebar.reports_sub.stock_alerts') }}</router-link></li>
          </ul>
        </div>
      </li>

      <!-- Üye / Bayi Raporları -->
      <li>
        <button class="btn btn-toggle d-flex align-items-center" data-bs-toggle="collapse" data-bs-target="#memberReportsMenu">
          <UserRound class="icon" />
          <span v-if="!isCollapsed">{{ $t('sidebar.reports_sub.members') }}</span>
        </button>
        <div class="collapse" id="memberReportsMenu">
          <ul class="submenu">
            <li><router-link to="/reports/members/new">{{ $t('sidebar.reports_sub.member_new') }}</router-link></li>
            <li><router-link to="/reports/members/login">{{ $t('sidebar.reports_sub.member_login') }}</router-link></li>
            <li><router-link to="/reports/members/orders">{{ $t('sidebar.reports_sub.member_orders') }}</router-link></li>
            <li><router-link to="/reports/members/dealer-orders">{{ $t('sidebar.reports_sub.dealer_orders') }}</router-link></li>
            <li><router-link to="/reports/members/dealer-balance">{{ $t('sidebar.reports_sub.dealer_balance') }}</router-link></li>
            <li><router-link to="/reports/members/dealer-deposits">{{ $t('sidebar.reports_sub.dealer_deposits') }}</router-link></li>
            <li><router-link to="/reports/members/dealer-activities">{{ $t('sidebar.reports_sub.dealer_activities') }}</router-link></li>
            <li><router-link to="/reports/members/price-alerts">{{ $t('sidebar.reports_sub.price_alerts_member') }}</router-link></li>
            <li><router-link to="/reports/members/stock-alerts">{{ $t('sidebar.reports_sub.stock_alerts_member') }}</router-link></li>
          </ul>
        </div>
      </li>

      <!-- Sistem Raporları -->
      <li>
        <button class="btn btn-toggle d-flex align-items-center" data-bs-toggle="collapse" data-bs-target="#systemReportsMenu">
          <Monitor class="icon" />
          <span v-if="!isCollapsed">{{ $t('sidebar.reports_sub.system') }}</span>
        </button>
        <div class="collapse" id="systemReportsMenu">
          <ul class="submenu">
            <li><router-link to="/reports/system/logs">{{ $t('sidebar.reports_sub.logs') }}</router-link></li>
          </ul>
        </div>
      </li>

    </ul>
  </div>
</li>
<!-- Ayarlar -->
<li>
  <button
  class="btn btn-toggle d-flex align-items-center"
  data-bs-toggle="collapse"
  data-bs-target="#settingsMenu"
  :class="{ active: $route.path.startsWith('/settings') }"
>
  <Settings class="icon" />
  <span v-if="!isCollapsed">{{ $t('sidebar.settings') }}</span>
</button>
  <div class="collapse" id="settingsMenu">
    <ul class="submenu">
      <li><router-link to="/settings/general">{{ $t('sidebar.settings_sub.general') }}</router-link></li>
      <li><router-link to="/settings/seo">{{ $t('sidebar.settings_sub.seo') }}</router-link></li>
      <li><router-link to="/settings/marketing">{{ $t('sidebar.settings_sub.marketing') }}</router-link></li>
      <li><router-link to="/settings/contracts">{{ $t('sidebar.settings_sub.contracts') }}</router-link></li>
      <li><router-link to="/settings/orders">{{ $t('sidebar.settings_sub.orders') }}</router-link></li>
      <li><router-link to="/settings/products">{{ $t('sidebar.settings_sub.products') }}</router-link></li>
      <li><router-link to="/settings/payment-methods">{{ $t('sidebar.settings_sub.payment_methods') }}</router-link></li>
      <li><router-link to="/settings/exchange-rates">{{ $t('sidebar.settings_sub.exchange_rates') }}</router-link></li>
      <li><router-link to="/settings/shipping-companies">{{ $t('sidebar.settings_sub.shipping_companies') }}</router-link></li>
      <li><router-link to="/settings/shipping">{{ $t('sidebar.settings_sub.shipping') }}</router-link></li>
      <li><router-link to="/settings/assembly-points">{{ $t('sidebar.settings_sub.assembly_points') }}</router-link></li>
      <li><router-link to="/settings/countries">{{ $t('sidebar.settings_sub.countries') }}</router-link></li>
      <li><router-link to="/settings/languages">{{ $t('sidebar.settings_sub.languages') }}</router-link></li>
      <li><router-link to="/settings/sms">{{ $t('sidebar.settings_sub.sms') }}</router-link></li>
      <li><router-link to="/settings/sms-templates">{{ $t('sidebar.settings_sub.sms_templates') }}</router-link></li>
      <li><router-link to="/settings/email">{{ $t('sidebar.settings_sub.email') }}</router-link></li>
      <li><router-link to="/settings/email-templates">{{ $t('sidebar.settings_sub.email_templates') }}</router-link></li>
      <li><router-link to="/settings/maintenance">{{ $t('sidebar.settings_sub.maintenance') }}</router-link></li>
      <li><router-link to="/settings/balance">{{ $t('sidebar.settings_sub.balance') }}</router-link></li>
      <li><router-link to="/settings/dealer">{{ $t('sidebar.settings_sub.dealer') }}</router-link></li>
      <li><router-link to="/settings/dealer-xml">{{ $t('sidebar.settings_sub.dealer_xml') }}</router-link></li>
      <li><router-link to="/settings/quick-payment">{{ $t('sidebar.settings_sub.quick_payment') }}</router-link></li>
      <li><router-link to="/settings/web-service">{{ $t('sidebar.settings_sub.web_service') }}</router-link></li>
      <li><router-link to="/settings/admin-accounts">{{ $t('sidebar.settings_sub.admin_accounts') }}</router-link></li>
      <li><router-link to="/settings/security">{{ $t('sidebar.settings_sub.security') }}</router-link></li>
      <li><router-link to="/settings/site">{{ $t('sidebar.settings_sub.site') }}</router-link></li>
    </ul>
  </div>
</li>

  </ul>
  </aside>
  </template>

<script>
import {
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
} from 'lucide-vue-next'

export default {
  name: "SidebarComponent",
  props: {
    isCollapsed: Boolean
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
      isMobile: window.innerWidth < 992, // 992px altında mobil kabul ettik
      isSidebarOpen: false
    };
  },
  methods: {
    toggleSidebar() {
      if (this.isMobile) {
        this.isSidebarOpen = !this.isSidebarOpen;
      } else {
        this.$emit('toggleCollapse'); // Ana layout collapsible özelliği
      }
    },
    closeSidebar() {
      if (this.isMobile) {
        this.isSidebarOpen = false;
      }
    },
    handleResize() {
      this.isMobile = window.innerWidth < 992;
      if (!this.isMobile) {
        this.isSidebarOpen = false;
      }
    }
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }
};
</script>
<style scoped>
/* === GENEL === */
.icon {
  width: 20px;
  height: 20px;
  margin-right: 12px;
  stroke-width: 1.6;
  flex-shrink: 0;
  transition: transform 0.2s ease, stroke 0.2s ease;
}

.btn-toggle {
  gap: 10px;
  display: flex;
  align-items: center;
  width: 100%;
  border: none;
  background: none;
  color: inherit;
  padding: 10px 14px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 15px;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.btn-toggle:hover {
  background-color: #f3f4f6;
  color: #111827;
}
.btn-toggle.active {
  color: #5b4ddb !important;
  font-weight: 600;
}

.btn-toggle.active .icon {
  stroke: #5b4ddb !important;
}

.btn-toggle:hover .icon {
  stroke: #111827;
  transform: scale(1.05);
}

.logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.logo-link {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.logo-image {
  height: 100px;
  max-width: 100%;
  object-fit: contain;
}

.sidebar.collapsed .logo-image {
  height: 32px;
}

.sidebar {
  width: 260px;
  height: 100vh;
  background: #fff;
  border-right: 1px solid #e5e7eb;
  padding: 2px 18px;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: auto;
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;
  z-index: 1000;
}

.sidebar.collapsed {
  width: 80px;
  padding: 24px 10px;
}

.sidebar.collapsed .btn-toggle {
  justify-content: center;
}

.sidebar.collapsed .btn-toggle .icon + span {
  display: none;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: left;
  padding-left: 13px;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-menu li {
  margin-bottom: 6px;
}

.sidebar-menu a {
  text-decoration: none;
  display: flex;
  align-items: center;
  color: #374151;
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 14px;
  transition: 0.2s ease;
}

.sidebar-menu a:hover {
  background: #f3f4f6;
  color: #111827;
}

/* 🔥 Aktif menü yazı ve ikon rengi */
.sidebar-menu .router-link-active {
  background: none;
  color: #5b4ddb !important;
  font-weight: 600;
}

.sidebar-menu .router-link-active .icon {
  stroke: #5b4ddb !important;
}

.submenu {
  list-style: none;
  padding-left: 16px;
  margin-top: 6px;
}

.submenu li a {
  font-size: 13px;
  padding: 8px 10px;
  color: #6b7280;
  display: block;
  border-radius: 8px;
}

.submenu li a:hover {
  background: #f1f5f9;
  color: #111827;
}

/* === DARK MODE === */
:deep(html.dark) .sidebar {
  background-color: #0f172a;
  border-right: 1px solid #1e293b;
  color: #f1f5f9;
}

:deep(html.dark) .sidebar-menu a {
  color: #94a3b8;
}

:deep(html.dark) .sidebar-menu a:hover {
  background: #1e293b;
  color: #ffffff;
}

/* 🔥 Dark mode: Aktif menü rengi */
:deep(html.dark) .sidebar-menu .router-link-active {
  background: none;
  color: #5b4ddb !important;
  font-weight: 600;
}

:deep(html.dark) .sidebar-menu .router-link-active .icon {
  stroke: #5b4ddb !important;
}

:deep(html.dark) .icon {
  stroke: #f1f5f9;
}

/* === RESPONSIVE === */
@media (max-width: 992px) {
  .sidebar {
    transform: translateX(-100%);
    width: 260px;
  }

  .sidebar.mobile-open {
    transform: translateX(0);
  }

  .sidebar.collapsed {
    width: 260px;
    padding: 24px 18px;
  }

  .sidebar.collapsed .btn-toggle .icon + span {
    display: inline;
  }

  .mobile-toggle-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    background: none;
    border: none;
    font-size: 22px;
    z-index: 1100;
    color: #374151;
  }

  html.dark .mobile-toggle-btn {
    color: #f1f5f9;
  }
}
</style>