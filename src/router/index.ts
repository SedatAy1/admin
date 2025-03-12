import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Sales from '../views/Sales.vue'
import Analytics from '../views/Analytics.vue'
import Ecommerce from '../views/Ecommerce.vue'
import Customers from '../views/Customers.vue'
import Settings from '../views/Settings.vue'

// Ürünler ve Siparişler için Layout
import ProductLayout from '@/views/products/ProductLayout.vue'
import Products from '@/views/Products.vue'
import Orders from '@/views/Orders.vue'

// Ürün Sayfaları
import ManageProducts from '@/views/products/ManageProducts.vue'
import Categories from '@/views/products/Categories.vue'
import Brands from '@/views/products/Brands.vue'
import Attributes from '@/views/products/Attributes.vue'
import CustomFields from '@/views/products/CustomFields.vue'
import CompatibilityGroups from '@/views/products/CompatibilityGroups.vue'
import Tags from '@/views/products/Tags.vue'
import SearchMatching from '@/views/products/SearchMatching.vue'
import SearchConsole from '@/views/products/SearchConsole.vue'

// **Diğer Ürün Sayfaları**
import AdvancedProductSorting from '@/views/products/other/AdvancedProductSorting.vue'
import BulkProductActions from '@/views/products/other/BulkProductActions.vue'
import BulkSEOModifications from '@/views/products/other/BulkSEOModifications.vue'
import MarketplaceMatching from '@/views/products/other/MarketplaceMatching.vue'
import ProductReviews from '@/views/products/other/ProductReviews.vue'
import ProductRecommendations from '@/views/products/other/ProductRecommendations.vue'

// **ProductOtherLayout**
import ProductOtherLayout from '@/views/products/other/ProductOtherLayout.vue'

// Sipariş Sayfaları
import NewOrders from '@/views/orders/NewOrders.vue'
import PreparingOrders from '@/views/orders/PreparingOrders.vue'
import ShippedOrders from '@/views/orders/ShippedOrders.vue'
import DeliveredOrders from '@/views/orders/DeliveredOrders.vue'
import OrderRequests from '@/views/orders/OrderRequests.vue'
import CancelledOrders from '@/views/orders/CancelledOrders.vue'
import IncompleteOrders from '@/views/orders/IncompleteOrders.vue'
import QuickSales from '@/views/orders/QuickSales.vue'
import PhoneOrders from '@/views/orders/phone-orders.vue'
import ActiveCarts from '@/views/orders/ActiveCarts.vue'
import BankTransfer from '@/views/orders/BankTransfer.vue'
import FaultReports from '@/views/orders/FaultReports.vue'
import SalesTerminals from '@/views/orders/SalesTerminals.vue'
import BulkActions from '@/views/orders/BulkActions.vue'
import QuickPayments from '@/views/orders/QuickSales.vue'
// Kampanyalar Sayfaları
import Coupons from '@/views/campaigns/campaigns/Coupons.vue'
import Promotions from '@/views/campaigns/campaigns/Coupons.vue'
import MemberDiscounts from '@/views/campaigns/campaigns/MemberDiscounts.vue'
import DealerDiscounts from '@/views/campaigns/campaigns/DealerDiscounts.vue'
import DealerCommissions from '@/views/campaigns/campaigns/DealerDiscounts.vue'
import FixedDiscounts from '@/views/campaigns/campaigns/FixedDiscount.vue'
import OrderLimits from '@/views/campaigns/campaigns/OrderLimits.vue'
import SalesQuotas from '@/views/campaigns/campaigns/SalesQuotas.vue'

// E-Posta Araçları
import EmailList from '@/views/campaigns/email-tools/EmailList.vue'
import EmailGroups from '@/views/campaigns/email-tools/EmailGroups.vue'
import EmailSend from '@/views/campaigns/email-tools/EmailSend.vue'

// SMS Araçları
import SmsList from '@/views/campaigns/sms-tools/SmsList.vue'
import SmsGroups from '@/views/campaigns/sms-tools/SmsGroups.vue'
import SmsSend from '@/views/campaigns/sms-tools/SmsSend.vue'
import CampaignsLayout from '@/views/campaigns/CampaignsLayout.vue'

// **İçerik Yönetimi Sayfaları**
import Pages from "@/views/contents/content-management/Pages.vue";
import Help from "@/views/contents/content-management/Help.vue";
import FAQ from "@/views/contents/content-management/FAQ.vue";
import Blog from "@/views/contents/content-management/Blog.vue";
import Slides from "@/views/contents/content-management/Slides.vue";
import Banners from "@/views/contents/content-management/Banners.vue";
import Popup from "@/views/contents/content-management/Popup.vue";
import Upload from "@/views/contents/content-management/Upload.vue";

// **URL Yönetimi Sayfaları**
import UrlRedirect from "@/views/contents/url-management/UrlRedirect.vue";
import ErrorReports from "@/views/contents/url-management/ErrorReports.vue";
// Müşteriler Sayfaları
import ManageCustomers from "@/views/customers/ManageCustomers.vue";
import RiskCustomers from "@/views/customers/RiskCustomers.vue";
import CustomerBalances from "@/views/customers/CustomerBalances.vue";
import DealerManagement from "@/views/customers/DealerManagement.vue";
import DealerGroups from "@/views/customers/DealerGroups.vue";
import DealerTransactions from "@/views/customers/DealerTransactions.vue";

import LayoutComponent from "@/views/Customers/LayoutComponent.vue";

// Entegrasyon Sayfalarını Import Et
import Marketplace from "@/views/integrations/Marketplace.vue";
import Accounting from "@/views/integrations/Accounting.vue";
import Excel from "@/views/integrations/Excel.vue";
import XmlImport from "@/views/integrations/XmlImport.vue";
import XmlExport from "@/views/integrations/XmlExport.vue";
import BulkMarketplace from "@/views/integrations/BulkMarketplace.vue";
import Hepsiburada from "@/views/integrations/Hepsiburada.vue";
import Monitor from "@/views/integrations/Monitor.vue";

// Design Sayfalarını Import Et
import ThemeSettings from "@/views/design/ThemeSettings.vue";
import ModuleLayout from "@/views/design/ModuleLayout.vue";
import PrintTemplates from "@/views/design/PrintTemplates.vue";
import EmailTemplates from "@/views/design/EmailTemplates.vue";

// ** Rapor Sayfaları **

// **Sipariş Raporları**
import DailyOrders from "@/views/reports/order-reports/Daily.vue";
import WeeklyOrders from "@/views/reports/order-reports/Weekly.vue";
import MonthlyOrders from "@/views/reports/order-reports/Monthly.vue";
import YearlyOrders from "@/views/reports/order-reports/Yearly.vue";
import PlatformOrders from "@/views/reports/order-reports/Platform.vue";
import StoreOrders from "@/views/reports/order-reports/Store.vue";
import ProductSales from "@/views/reports/order-reports/ProductSales.vue";
import VariantSales from "@/views/reports/order-reports/VariantSales.vue";
import CategorySales from "@/views/reports/order-reports/CategorySales.vue";
import BrandSales from "@/views/reports/order-reports/BrandSales.vue";
import PaymentOrders from "@/views/reports/order-reports/Payment.vue";
import SourceOrders from "@/views/reports/order-reports/Source.vue";
import CityOrders from "@/views/reports/order-reports/City.vue";
import CountryOrders from "@/views/reports/order-reports/Country.vue";
import AccountingOrders from "@/views/reports/order-reports/Accounting.vue";
import OrdersList from "@/views/reports/order-reports/List.vue";
import FastDelivery from "@/views/reports/order-reports/FastDelivery.vue";

// **Ürün Raporları**
import Stock from "@/views/reports/product-reports/Stock.vue";
import VariantStock from "@/views/reports/product-reports/VariantStock.vue";
import StockMovements from "@/views/reports/product-reports/StockMovements.vue";
import ProductSalesReport from "@/views/reports/product-reports/Sales.vue";
import VariantSalesReport from "@/views/reports/product-reports/VariantSales.vue";
import CategorySalesReport from "@/views/reports/product-reports/CategorySales.vue";
import BrandSalesReport from "@/views/reports/product-reports/BrandSales.vue";
import TagSales from "@/views/reports/product-reports/TagSales.vue";
import SourceSales from "@/views/reports/product-reports/SourceSales.vue";
import TopRated from "@/views/reports/product-reports/TopRated.vue";
import Favorites from "@/views/reports/product-reports/Favorites.vue";
import Summary from "@/views/reports/product-reports/Summary.vue";
import Recommended from "@/views/reports/product-reports/Recommended.vue";
import PriceAlerts from "@/views/reports/product-reports/PriceAlerts.vue";
import StockAlerts from "@/views/reports/product-reports/StockAlerts.vue";

// **Üye & Bayi Raporları**
import NewMembers from "@/views/reports/member-dealer-reports/New.vue";
import MemberLogin from "@/views/reports/member-dealer-reports/Login.vue";
import MemberOrders from "@/views/reports/member-dealer-reports/Orders.vue";
import DealerOrders from "@/views/reports/member-dealer-reports/DealerOrders.vue";
import DealerBalance from "@/views/reports/member-dealer-reports/DealerBalance.vue";
import DealerDeposits from "@/views/reports/member-dealer-reports/DealerDeposits.vue";
import DealerActivities from "@/views/reports/member-dealer-reports/DealerActivities.vue";
import MemberPriceAlerts from "@/views/reports/member-dealer-reports/PriceAlerts.vue";
import MemberStockAlerts from "@/views/reports/member-dealer-reports/StockAlerts.vue";

// **Sistem Raporları**
import SystemLogs from "@/views/reports/system-reports/Logs.vue";


// Ayarlar **
import General from "@/views/settings/General.vue";
import Seo from "@/views/settings/Seo.vue";
import Marketing from "@/views/settings/Marketing.vue";
import Contracts from "@/views/settings/Contracts.vue";
import Orders from "@/views/settings/Orders.vue";
import Products from "@/views/settings/Products.vue";
import PaymentMethods from "@/views/settings/PaymentMethods.vue";
import ExchangeRates from "@/views/settings/ExchangeRates.vue";
import ShippingCompanies from "@/views/settings/ShippingCompanies.vue";
import Shipping from "@/views/settings/Shipping.vue";
import AssemblyPoints from "@/views/settings/AssemblyPoints.vue";
import Countries from "@/views/settings/Countries.vue";
import Languages from "@/views/settings/Languages.vue";
import Sms from "@/views/settings/Sms.vue";
import SmsTemplates from "@/views/settings/SmsTemplates.vue";
import Email from "@/views/settings/Email.vue";
import EmailTemplates from "@/views/settings/EmailTemplates.vue";
import Maintenance from "@/views/settings/Maintenance.vue";
import Balance from "@/views/settings/Balance.vue";
import Dealer from "@/views/settings/Dealer.vue";
import DealerXml from "@/views/settings/DealerXml.vue";
import QuickPayment from "@/views/settings/QuickPayment.vue";
import WebService from "@/views/settings/WebService.vue";
import AdminAccounts from "@/views/settings/AdminAccounts.vue";
import Security from "@/views/settings/Security.vue";
import Site from "@/views/settings/Site.vue";

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/sales', name: 'Sales', component: Sales },
  { path: '/analytics', name: 'Analytics', component: Analytics },
  { path: '/ecommerce', name: 'Ecommerce', component: Ecommerce },
  { path: '/customers', name: 'Customers', component: Customers },
  { path: '/settings', name: 'Settings', component: Settings },

  // **Ürünler Route'u**
  {
    path: '/products',
    component: ProductLayout,
    children: [
      { path: '', name: 'Products', component: Products },
      { path: 'manage', name: 'ManageProducts', component: ManageProducts },
      { path: 'categories', name: 'Categories', component: Categories },
      { path: 'brands', name: 'Brands', component: Brands },
      { path: 'attributes', name: 'Attributes', component: Attributes },
      { path: 'custom-fields', name: 'CustomFields', component: CustomFields },
      { path: 'compatibility-groups', name: 'CompatibilityGroups', component: CompatibilityGroups },
      { path: 'tags', name: 'Tags', component: Tags },
      { path: 'search-matching', name: 'SearchMatching', component: SearchMatching },
      { path: 'search-console', name: 'SearchConsole', component: SearchConsole },
    ],
  },

  // **Diğer Ürün Sayfaları (Other)**
  {
    path: '/products',
    component: ProductOtherLayout,
    children: [
      { path: 'marketplace-matching', name: 'MarketplaceMatching', component: MarketplaceMatching },
      { path: 'reviews', name: 'ProductReviews', component: ProductReviews },
      {
        path: 'recommendations',
        name: 'ProductRecommendations',
        component: ProductRecommendations,
      },
      {
        path: 'advanced-sorting',
        name: 'AdvancedProductSorting',
        component: AdvancedProductSorting,
      },
      { path: 'bulk-actions', name: 'BulkProductActions', component: BulkProductActions },
      { path: 'bulk-seo', name: 'BulkSEOModifications', component: BulkSEOModifications },
    ],
  },

  // **Siparişler Route'u**
  {
    path: '/orders',
    component: ProductLayout,
    children: [
      { path: '', name: 'Orders', component: Orders },
      { path: 'new', name: 'NewOrders', component: NewOrders },
      { path: 'preparing', name: 'PreparingOrders', component: PreparingOrders },
      { path: 'shipped', name: 'ShippedOrders', component: ShippedOrders },
      { path: 'delivered', name: 'DeliveredOrders', component: DeliveredOrders },
      { path: 'requests', name: 'OrderRequests', component: OrderRequests },
      { path: 'cancelled', name: 'CancelledOrders', component: CancelledOrders },
      { path: 'incomplete', name: 'IncompleteOrders', component: IncompleteOrders },
      { path: 'quick-sales', name: 'QuickSales', component: QuickSales },
      { path: 'phone-orders', name: 'PhoneOrders', component: PhoneOrders },
      { path: 'active-carts', name: 'ActiveCarts', component: ActiveCarts },
      { path: 'bank-transfer', name: 'BankTransfer', component: BankTransfer },
      { path: 'fault-reports', name: 'FaultReports', component: FaultReports },
      { path: 'sales-terminals', name: 'SalesTerminals', component: SalesTerminals },
      { path: 'bulk-actions', name: 'BulkActions', component: BulkActions },
      { path: 'quick-payments', name: 'QuickPayments', component: QuickPayments },
    ],
  },
  {
    path: '/campaigns',
    component: CampaignsLayout,
    children: [
      { path: 'coupons', name: 'Coupons', component: Coupons },
      { path: 'promotions', name: 'Promotions', component: Promotions },
      { path: 'member-discounts', name: 'MemberDiscounts', component: MemberDiscounts },
      { path: 'dealer-discounts', name: 'DealerDiscounts', component: DealerDiscounts },
      { path: 'dealer-commissions', name: 'DealerCommissions', component: DealerCommissions },
      { path: 'fixed-discounts', name: 'FixedDiscounts', component: FixedDiscounts },
      { path: 'order-limits', name: 'OrderLimits', component: OrderLimits },
      { path: 'sales-quotas', name: 'SalesQuotas', component: SalesQuotas },
    ],
  },
  {
    path: '/campaigns',
    component: CampaignsLayout,
    children: [
      { path: 'email-list', name: 'EmailList', component: EmailList },
      { path: 'email-groups', name: 'EmailGroups', component: EmailGroups },
      { path: 'email-send', name: 'EmailSend', component: EmailSend },
    ],
  },
  {
    path: '/campaigns',
    component: CampaignsLayout,
    children: [
      { path: 'sms-list', name: 'SmsList', component: SmsList },
      { path: 'sms-groups', name: 'SmsGroups', component: SmsGroups },
      { path: 'sms-send', name: 'SmsSend', component: SmsSend },
    ],
  },
  {
    path: "/contents",
    children: [
      {
        path: "content-management/pages",
        name: "Pages",
        component: Pages,
      },
      {
        path: "content-management/help",
        name: "Help",
        component: Help,
      },
      {
        path: "content-management/faq",
        name: "FAQ",
        component: FAQ,
      },
      {
        path: "content-management/blog",
        name: "Blog",
        component: Blog,
      },
      {
        path: "content-management/slides",
        name: "Slides",
        component: Slides,
      },
      {
        path: "content-management/banners",
        name: "Banners",
        component: Banners,
      },
      {
        path: "content-management/popup",
        name: "Popup",
        component: Popup,
      },
      {
        path: "content-management/upload",
        name: "Upload",
        component: Upload,
      },
      {
        path: "url-management/url-redirect",
        name: "UrlRedirect",
        component: UrlRedirect,
      },
      {
        path: "url-management/404-reports",
        name: "ErrorReports",
        component: ErrorReports,
      },
    ],
  },
  {
    path: "/customers",
    children: [
      { path: "manage", name: "ManageCustomers", component: ManageCustomers },
      { path: "risk", name: "RiskCustomers", component: RiskCustomers },
      { path: "balances", name: "CustomerBalances", component: CustomerBalances },
      { path: "dealers", name: "DealerManagement", component: DealerManagement },
      { path: "groups", name: "DealerGroups", component: DealerGroups },
      { path: "transactions", name: "DealerTransactions", component: DealerTransactions },
    ],
  },
  {
    path: "/integrations",
    children: [
      { path: "marketplace", name: "Marketplace", component: Marketplace },
      { path: "accounting", name: "Accounting", component: Accounting },
      { path: "excel", name: "Excel", component: Excel },
      { path: "xml-import", name: "XmlImport", component: XmlImport },
      { path: "xml-export", name: "XmlExport", component: XmlExport },
      { path: "bulk-marketplace", name: "BulkMarketplace", component: BulkMarketplace },
      { path: "hepsiburada", name: "Hepsiburada", component: Hepsiburada },
      { path: "monitor", name: "Monitor", component: Monitor },
    ],
  },
  {
    path: "/design",
    children: [
      { path: "theme-settings", name: "ThemeSettings", component: ThemeSettings },
      { path: "module-layout", name: "ModuleLayout", component: ModuleLayout },
      { path: "print-templates", name: "PrintTemplates", component: PrintTemplates },
      { path: "email-templates", name: "EmailTemplates", component: EmailTemplates },
    ],
  },
  // **Rapor Sayfaları**
  {
    path: "/reports/orders",
    children: [
      { path: "daily", name: "DailyOrders", component: DailyOrders },
      { path: "weekly", name: "WeeklyOrders", component: WeeklyOrders },
      { path: "monthly", name: "MonthlyOrders", component: MonthlyOrders },
      { path: "yearly", name: "YearlyOrders", component: YearlyOrders },
      { path: "platform", name: "PlatformOrders", component: PlatformOrders },
      { path: "store", name: "StoreOrders", component: StoreOrders },
      { path: "product-sales", name: "ProductSales", component: ProductSales },
      { path: "variant-sales", name: "VariantSales", component: VariantSales },
      { path: "category-sales", name: "CategorySales", component: CategorySales },
      { path: "brand-sales", name: "BrandSales", component: BrandSales },
      { path: "payment", name: "PaymentOrders", component: PaymentOrders },
      { path: "source", name: "SourceOrders", component: SourceOrders },
      { path: "city", name: "CityOrders", component: CityOrders },
      { path: "country", name: "CountryOrders", component: CountryOrders },
      { path: "accounting", name: "AccountingOrders", component: AccountingOrders },
      { path: "list", name: "OrdersList", component: OrdersList },
      { path: "fast-delivery", name: "FastDelivery", component: FastDelivery },
    ],
  },
  {
    path: "/reports/products",
    children: [
      { path: "stock", name: "Stock", component: Stock },
      { path: "variant-stock", name: "VariantStock", component: VariantStock },
      { path: "stock-movements", name: "StockMovements", component: StockMovements },
      { path: "sales", name: "ProductSalesReport", component: ProductSalesReport },
      { path: "variant-sales", name: "VariantSalesReport", component: VariantSalesReport },
      { path: "category-sales", name: "CategorySalesReport", component: CategorySalesReport },
      { path: "brand-sales", name: "BrandSalesReport", component: BrandSalesReport },
      { path: "tag-sales", name: "TagSales", component: TagSales },
      { path: "source-sales", name: "SourceSales", component: SourceSales },
      { path: "top-rated", name: "TopRated", component: TopRated },
      { path: "favorites", name: "Favorites", component: Favorites },
      { path: "summary", name: "Summary", component: Summary },
      { path: "recommended", name: "Recommended", component: Recommended },
      { path: "price-alerts", name: "PriceAlerts", component: PriceAlerts },
      { path: "stock-alerts", name: "StockAlerts", component: StockAlerts },
    ],
  },
  {
    path: "/reports/members",
    children: [
      { path: "new", name: "NewMembers", component: NewMembers },
      { path: "login", name: "MemberLogin", component: MemberLogin },
      { path: "orders", name: "MemberOrders", component: MemberOrders },
      { path: "dealer-orders", name: "DealerOrders", component: DealerOrders },
      { path: "dealer-balance", name: "DealerBalance", component: DealerBalance },
      { path: "dealer-deposits", name: "DealerDeposits", component: DealerDeposits },
      { path: "dealer-activities", name: "DealerActivities", component: DealerActivities },
      { path: "price-alerts", name: "MemberPriceAlerts", component: MemberPriceAlerts },
      { path: "stock-alerts", name: "MemberStockAlerts", component: MemberStockAlerts },
    ],
  },
  // Ayarlar **
  {
    path: "/settings",
    children: [
      { path: "general", name: "General", component: General },
      { path: "seo", name: "Seo", component: Seo },
      { path: "marketing", name: "Marketing", component: Marketing },
      { path: "contracts", name: "Contracts", component: Contracts },
      { path: "orders", name: "Orders", component: Orders },
      { path: "products", name: "Products", component: Products },
      { path: "payment-methods", name: "PaymentMethods", component: PaymentMethods },
      { path: "exchange-rates", name: "ExchangeRates", component: ExchangeRates },
      { path: "shipping-companies", name: "ShippingCompanies", component: ShippingCompanies },
      { path: "shipping", name: "Shipping", component: Shipping },
      { path: "assembly-points", name: "AssemblyPoints", component: AssemblyPoints },
      { path: "countries", name: "Countries", component: Countries },
      { path: "languages", name: "Languages", component: Languages },
      { path: "sms", name: "Sms", component: Sms },
      { path: "sms-templates", name: "SmsTemplates", component: SmsTemplates },
      { path: "email", name: "Email", component: Email },
      { path: "email-templates", name: "EmailTemplates", component: EmailTemplates },
      { path: "maintenance", name: "Maintenance", component: Maintenance },
      { path: "balance", name: "Balance", component: Balance },
      { path: "dealer", name: "Dealer", component: Dealer },
      { path: "dealer-xml", name: "DealerXml", component: DealerXml },
      { path: "quick-payment", name: "QuickPayment", component: QuickPayment },
      { path: "web-service", name: "WebService", component: WebService },
      { path: "admin-accounts", name: "AdminAccounts", component: AdminAccounts },
      { path: "security", name: "Security", component: Security },
      { path: "site", name: "Site", component: Site },
    ],
  },

  { path: "/reports/system/logs", name: "SystemLogs", component: SystemLogs },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
