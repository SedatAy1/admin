<template>
  <div class="campaigns-layout">
    <div class="campaigns-nav">
      <router-link to="/campaigns/coupons" class="nav-button">{{ $t('campaigns.coupons') }}</router-link>
      <router-link to="/campaigns/promotions" class="nav-button">{{ $t('campaigns.promotions') }}</router-link>
      <router-link to="/campaigns/member-discounts" class="nav-button">{{ $t('campaigns.memberDiscounts') }}</router-link>
      <router-link to="/campaigns/dealer-discounts" class="nav-button">{{ $t('campaigns.dealerDiscounts') }}</router-link>
      <router-link to="/campaigns/dealer-commissions" class="nav-button">{{ $t('campaigns.dealerCommissions') }}</router-link>
      <router-link to="/campaigns/fixed-discounts" class="nav-button">{{ $t('campaigns.fixedDiscount') }}</router-link>
      <router-link to="/campaigns/order-limits" class="nav-button">{{ $t('campaigns.orderLimits') }}</router-link>
      <router-link to="/campaigns/sales-quotas" class="nav-button">{{ $t('campaigns.salesQuotas') }}</router-link>
      <router-link to="/campaigns/email-tools" class="nav-button">{{ $t('campaigns.emailTools') }}</router-link>
      <router-link to="/campaigns/sms-tools" class="nav-button">{{ $t('campaigns.smsTools') }}</router-link>
    </div>

    <div class="campaigns-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    console.log("✅ CampaignsLayout Yüklendi!");
  }
};
</script>

<style scoped>
/* Layout Ana Yapısı */
.campaigns-layout {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 100vh; /* Sayfanın tamamını kapsasın */
}

/* Üst Menü */
.campaigns-nav {
  display: flex;
  justify-content: center; /* Butonları ortalar */
  gap: 6px;
  background: #ffffff; /* Arka planı beyaz yap */
  padding: 10px;
  border-radius: 5px;
  flex-wrap: wrap; /* Responsive destekler */
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

/* Navigasyon Butonları */
.nav-button {
  text-decoration: none;
  padding: 6px 12px; /* Butonları küçülttük */
  background: white;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 13px; /* Font boyutu küçültüldü */
  transition: 0.3s;
  white-space: nowrap; /* Satır kaymasını engeller */
}

.nav-button:hover {
  background: #007bff;
  color: white;
}

/* İçerik Alanı */
.campaigns-content {
  flex-grow: 1; /* İçeriğin esnek olmasını sağlar */
  padding: 20px;
  min-height: calc(100vh - 60px); /* Sayfanın altına kadar uzamasını sağlar */
}

/* Modal için ekstra güvenlik önlemleri */
.modal {
  z-index: 9999 !important;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

</style>