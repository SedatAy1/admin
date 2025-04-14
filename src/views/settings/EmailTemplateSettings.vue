<template>
  <div class="sms-templates-page">
    <h2 class="title">{{ $t('smsTemplates.title') }}</h2>

    <div class="template-selector">
      <label class="selector-label">
        » {{ $t('smsTemplates.selectPrompt') }}
      </label>
      <select v-model="selectedTemplate" class="template-dropdown">
        <option disabled value="">{{ $t('smsTemplates.selectOption') }}</option>

        <optgroup :label="$t('smsTemplates.groups.member')">
          <option>{{ $t('smsTemplates.templates.newMember') }}</option>
          <option>{{ $t('smsTemplates.templates.passwordReset') }}</option>
        </optgroup>

        <optgroup :label="$t('smsTemplates.groups.contact')">
          <option>{{ $t('smsTemplates.templates.newContact') }}</option>
          <option>{{ $t('smsTemplates.templates.contactReply') }}</option>
        </optgroup>

        <optgroup :label="$t('smsTemplates.groups.issue')">
          <option>{{ $t('smsTemplates.templates.newIssue') }}</option>
          <option>{{ $t('smsTemplates.templates.issueAdminReply') }}</option>
          <option>{{ $t('smsTemplates.templates.issueUserReply') }}</option>
        </optgroup>

        <optgroup :label="$t('smsTemplates.groups.order')">
          <option>{{ $t('smsTemplates.templates.newOrder') }}</option>
          <option>{{ $t('smsTemplates.templates.orderPreparing') }}</option>
          <option>{{ $t('smsTemplates.templates.orderShipped') }}</option>
          <option>{{ $t('smsTemplates.templates.orderDelivered') }}</option>
          <option>{{ $t('smsTemplates.templates.orderCancelled') }}</option>
          <option>{{ $t('smsTemplates.templates.orderCustom') }}</option>
        </optgroup>

        <optgroup :label="$t('smsTemplates.groups.payment')">
          <option>{{ $t('smsTemplates.templates.customerTransfer') }}</option>
          <option>{{ $t('smsTemplates.templates.newDealerPayment') }}</option>
          <option>{{ $t('smsTemplates.templates.dealerApproved') }}</option>
          <option>{{ $t('smsTemplates.templates.dealerRejected') }}</option>
          <option>{{ $t('smsTemplates.templates.newDealerPassword') }}</option>
          <option>{{ $t('smsTemplates.templates.quickPayment') }}</option>
        </optgroup>

        <optgroup :label="$t('smsTemplates.groups.suggestion')">
          <option>{{ $t('smsTemplates.templates.productSuggestion') }}</option>
          <option>{{ $t('smsTemplates.templates.priceAlert') }}</option>
          <option>{{ $t('smsTemplates.templates.stockAlert') }}</option>
          <option>{{ $t('smsTemplates.templates.newSuggestion') }}</option>
          <option>{{ $t('smsTemplates.templates.suggestionReply') }}</option>
        </optgroup>
      </select>
    </div>

    <div v-if="selectedTemplate" class="selected-info">
      <strong>{{ $t('smsTemplates.selected') }}</strong> {{ selectedTemplate }}
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
}
.title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
}
.template-selector {
  background-color: #3b82f6;
  padding: 24px;
  border-radius: 10px;
  color: white;
  margin-bottom: 16px;
}
.selector-label {
  display: block;
  font-weight: 500;
  margin-bottom: 8px;
}
.template-dropdown {
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  font-size: 14px;
  border: none;
  color: #1e293b;
}
.selected-info {
  margin-top: 12px;
  font-size: 14px;
  color: #334155;
}
</style>