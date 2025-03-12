<template>
  <div>
    <nav class="tabs">
      <router-link to="/campaigns/campaigns/coupon-management">Kupon Yönetimi</router-link>
      <router-link to="/campaigns/campaigns/promotions">Promosyonlar</router-link>
      <router-link to="/campaigns/campaigns/member-discounts">Üye İndirimleri</router-link>
      <router-link to="/campaigns/campaigns/dealer-discounts">Bayi İndirimleri</router-link>
      <router-link to="/campaigns/campaigns/dealer-commissions">Bayi Komisyonları</router-link>
      <router-link to="/campaigns/campaigns/fixed-discount">Sabit İndirim</router-link>
      <router-link to="/campaigns/campaigns/order-limits">Sipariş Limitleri</router-link>
      <router-link to="/campaigns/campaigns/sales-quotas">Satış Kotaları</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  gap: 15px;
  padding: 10px;
  background: white;
  border-bottom: 2px solid #ddd;
}
.tabs .router-link {
  padding: 10px;
  text-decoration: none;
  color: #555;
  font-weight: bold;
}
.tabs .router-link:hover {
  color: #333;
}
.tabs .router-link-active {
  color: white;
  background: #007bff;
  border-radius: 5px;
}
</style>
