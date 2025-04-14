<template>
  <div class="sms-templates-page">
    <h2 class="title">{{ $t("smsTemplates.title") }}</h2>

    <div class="template-selector">
      <label class="selector-label">
        » {{ $t("smsTemplates.selectLabel") }}
      </label>
      <select v-model="selectedTemplate" class="template-dropdown">
        <option disabled value="">{{ $t("smsTemplates.selectPlaceholder") }}</option>

        <optgroup :label="$t('smsTemplates.groups.member')">
          <option>{{ $t('smsTemplates.templates.newMember') }}</option>
          <option>{{ $t('smsTemplates.templates.passwordReset') }}</option>
        </optgroup>

        <optgroup :label="$t('smsTemplates.groups.contact')">
          <option>{{ $t('smsTemplates.templates.newContact') }}</option>
          <option>{{ $t('smsTemplates.templates.contactReply') }}</option>
        </optgroup>

        <optgroup :label="$t('smsTemplates.groups.fault')">
          <option>{{ $t('smsTemplates.templates.newFault') }}</option>
          <option>{{ $t('smsTemplates.templates.faultAdminReply') }}</option>
          <option>{{ $t('smsTemplates.templates.faultUserReply') }}</option>
        </optgroup>

        <optgroup :label="$t('smsTemplates.groups.order')">
          <option>{{ $t('smsTemplates.templates.newOrder') }}</option>
          <option>{{ $t('smsTemplates.templates.orderPreparing') }}</option>
          <option>{{ $t('smsTemplates.templates.orderShipped') }}</option>
          <option>{{ $t('smsTemplates.templates.orderDelivered') }}</option>
          <option>{{ $t('smsTemplates.templates.orderCancelled') }}</option>
          <option>{{ $t('smsTemplates.templates.orderCustomAction') }}</option>
        </optgroup>

        <optgroup :label="$t('smsTemplates.groups.payment')">
          <option>{{ $t('smsTemplates.templates.moneyTransfer') }}</option>
          <option>{{ $t('smsTemplates.templates.newDealerPayment') }}</option>
          <option>{{ $t('smsTemplates.templates.dealerPaymentApproved') }}</option>
          <option>{{ $t('smsTemplates.templates.dealerPaymentRejected') }}</option>
          <option>{{ $t('smsTemplates.templates.newDealerPassword') }}</option>
          <option>{{ $t('smsTemplates.templates.quickPayment') }}</option>
        </optgroup>

        <optgroup :label="$t('smsTemplates.groups.product')">
          <option>{{ $t('smsTemplates.templates.productSuggest') }}</option>
          <option>{{ $t('smsTemplates.templates.priceAlert') }}</option>
          <option>{{ $t('smsTemplates.templates.stockAlert') }}</option>
          <option>{{ $t('smsTemplates.templates.newSuggestion') }}</option>
          <option>{{ $t('smsTemplates.templates.suggestionReply') }}</option>
        </optgroup>
      </select>
    </div>

    <div v-if="selectedTemplate" class="selected-info">
      <strong>{{ $t("smsTemplates.selectedTemplate") }}</strong> {{ selectedTemplate }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const selectedTemplate = ref('')
</script>
<style scoped>
.sms-templates-page {
  font-family: 'Inter', sans-serif;
  padding: 24px;
  background-color: #fff;
  transition: background 0.3s ease, color 0.3s ease;
}
html.dark .sms-templates-page {
  background-color: #1f1f1f;
  color: #f1f1f1;
}

.title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #1e293b;
}
html.dark .title {
  color: #f9fafb;
}

.template-selector {
  background-color: #3b82f6;
  padding: 24px;
  border-radius: 10px;
  color: white;
  margin-bottom: 16px;
}
html.dark .template-selector {
  background-color: #2563eb;
}

.selector-label {
  display: block;
  font-weight: 500;
  margin-bottom: 8px;
  color: white;
}

.template-dropdown {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  font-size: 14px;
  border: none;
  color: #1e293b;
}
html.dark .template-dropdown {
  background-color: #f8fafc;
  color: #1f2937;
}

.selected-info {
  margin-top: 12px;
  font-size: 14px;
  color: #334155;
}
html.dark .selected-info {
  color: #cbd5e1;
}

/* Responsive */
@media (max-width: 768px) {
  .template-selector {
    padding: 16px;
  }

  .template-dropdown {
    font-size: 13px;
  }

  .title {
    font-size: 18px;
  }

  .selected-info {
    font-size: 13px;
  }
}
</style>