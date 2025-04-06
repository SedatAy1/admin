<template>
  <div class="sms-settings">
    <h2 class="title">SMS Ayarları</h2>

    <div class="setting-row">
      <i class="icon">💬</i>
      <div>
        <label>SMS Gönderimi</label>
        <p>SMS gönderimini aktif etmek için bu özelliği aktif edebilirsiniz.</p>
      </div>
      <input type="checkbox" v-model="form.enabled" class="toggle" />
    </div>

    <div class="setting-row">
      <i class="icon">📩</i>
      <div>
        <label>SMS Firması</label>
        <p>SMS gönderimleriniz için kullanılacak SMS firmasını seçebilirsiniz.</p>
      </div>
      <select v-model="form.provider">
        <option value="NormalSMS">NormalSMS</option>
        <option value="NetGSM">NetGSM</option>
        <option value="IletiMerkezi">İleti Merkezi</option>
      </select>
    </div>

    <hr />

    <div class="setting-row">
      <i class="icon">📝</i>
      <div>
        <label>SMS Başlığı</label>
        <p>SMS gönderimi yapılırken kullanılacak başlığı giriniz.</p>
      </div>
      <input v-model="form.title" placeholder="SMS Başlığı giriniz." />
    </div>

    <div class="setting-row">
      <i class="icon">📱</i>
      <div>
        <label>Yönetici Telefonu (SMS bildirimleri için)</label>
        <p>SMS bildirimi için kullanılacak yönetici telefon numarasını giriniz.</p>
      </div>
      <input v-model="form.phone" placeholder="Yönetici telefon numarası giriniz." />
    </div>

    <div class="setting-row">
      <i class="icon">🔑</i>
      <div>
        <label>SMS API Key</label>
        <p>SMS API keyinizi giriniz.</p>
      </div>
      <input v-model="form.apiKey" placeholder="API keyinizi giriniz." />
    </div>

    <button class="save-btn" @click="save">✓ Kaydet</button>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  enabled: false,
  provider: 'NormalSMS',
  title: '',
  phone: '',
  apiKey: ''
})

function save() {
  alert('SMS Ayarları kaydedildi!')
  // API entegrasyonu yapılabilir
}
</script>

<style scoped>
.sms-settings {
  font-family: 'Inter';
  background: white;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.04);
}
.title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
}
.setting-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}
.setting-row .icon {
  font-size: 24px;
}
.setting-row label {
  font-weight: 600;
}
.setting-row p {
  margin: 0;
  font-size: 13px;
  color: #6b7280;
}
.setting-row input[type="text"],
.setting-row input[type="number"],
.setting-row input[type="tel"],
.setting-row select {
  margin-left: auto;
  width: 300px;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.toggle {
  margin-left: auto;
  transform: scale(1.4);
}
.save-btn {
  margin-top: 20px;
  background: #3b82f6;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}
hr {
  border: none;
  border-top: 1px dashed #ddd;
  margin: 24px 0;
}
</style>