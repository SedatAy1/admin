<template>
  <div class="payment-methods-page">
    <h2 class="section-title">{{ $t('paymentMethods.title') }}</h2>

    <div class="method-section active">
      <div class="section-header">
        <span class="active-indicator">✔</span> {{ $t('paymentMethods.activeMethods') }}
      </div>

      <!-- Kredi Kartı -->
      <div class="payment-box">
        <img src="https://cdn-icons-png.flaticon.com/512/633/633611.png" class="icon" />
        <div class="info">
          <strong>{{ $t('paymentMethods.creditCard') }}</strong>
          <p>{{ $t('paymentMethods.labelName') }}: {{ $t('paymentMethods.creditCard') }}</p>
          <p>{{ $t('paymentMethods.labelOrder') }}: 1</p>
        </div>
        <div class="actions">
          <button>{{ $t('paymentMethods.installments') }}</button>
          <button>{{ $t('paymentMethods.restrictions') }}</button>
          <button>{{ $t('paymentMethods.settings') }}</button>
        </div>
      </div>

      <!-- Sanal POS Listesi -->
      <div class="sub-method">
        <span class="sub-title">✔ {{ $t('paymentMethods.virtualPOS') }}</span>
        <ul>
          <li v-for="method in posMethods" :key="method.name">
            <span>{{ method.name }}</span>
            <button>{{ $t('paymentMethods.details') }}</button>
          </li>
        </ul>
      </div>

      <!-- Havale / EFT -->
      <div class="payment-box">
        <img src="https://cdn-icons-png.flaticon.com/512/2203/2203140.png" class="icon" />
        <div class="info">
          <strong>{{ $t('paymentMethods.bankTransfer') }}</strong>
          <p>{{ $t('paymentMethods.labelName') }}: {{ $t('paymentMethods.bankTransferName') }}</p>
          <p>{{ $t('paymentMethods.labelOrder') }}: 2</p>
        </div>
        <div class="actions">
          <button>{{ $t('paymentMethods.bankAccounts') }}</button>
          <button>{{ $t('paymentMethods.restrictions') }}</button>
          <button>{{ $t('paymentMethods.settings') }}</button>
        </div>
      </div>
    </div>

    <!-- Pasif Ödeme Yöntemleri -->
    <div class="method-section passive">
      <div class="section-header">
        ❌ {{ $t('paymentMethods.passiveMethods') }}
      </div>

      <div class="payment-box" v-for="method in passiveMethods" :key="method.name">
        <img :src="method.icon" class="icon" />
        <div class="info">
          <strong>{{ method.name }}</strong>
          <p>{{ $t('paymentMethods.labelName') }}: {{ method.listing }}</p>
          <p>{{ $t('paymentMethods.labelOrder') }}: {{ method.order }}</p>
        </div>
        <div class="actions">
          <button>{{ $t('paymentMethods.activate') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const posMethods = [
  { name: 'Payu' },
  { name: 'Moka' },
  { name: 'iPara' },
  { name: 'Paymes' },
  { name: 'Param' }
]

const passiveMethods = [
  {
    name: 'PayPal',
    listing: 'Paypal',
    order: 0,
    icon: 'https://cdn-icons-png.flaticon.com/512/888/888870.png'
  },
  {
    name: 'GPay',
    listing: 'Kredi Kartı',
    order: 0,
    icon: 'https://cdn-icons-png.flaticon.com/512/300/300218.png'
  },
  {
    name: 'Çek / Senet',
    listing: 'Çek/Senet',
    order: 0,
    icon: 'https://cdn-icons-png.flaticon.com/512/1086/1086741.png'
  },
  {
    name: 'Çariden Ödeme',
    listing: 'Kredi Kartı',
    order: 1,
    icon: 'https://cdn-icons-png.flaticon.com/512/197/197602.png'
  },
  {
    name: 'Yemek Çekleri',
    listing: 'Yemek Çekleri',
    order: 2,
    icon: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png'
  },
  {
    name: 'Mail Order',
    listing: 'Mail Order',
    order: 4,
    icon: 'https://cdn-icons-png.flaticon.com/512/4208/4208971.png'
  },
  {
    name: 'Pluxee',
    listing: 'Pluxee',
    order: 15,
    icon: 'https://cdn-icons-png.flaticon.com/512/4721/4721040.png'
  },
  {
    name: 'Vallet',
    listing: 'Kredi Kartı (vallet.com.tr)',
    order: 16,
    icon: 'https://cdn-icons-png.flaticon.com/512/8770/8770028.png'
  },
  {
    name: 'Netahsilat',
    listing: 'Kredi Kartı (netahsilat)',
    order: 17,
    icon: 'https://cdn-icons-png.flaticon.com/512/10238/10238754.png'
  }
]
</script>

<style scoped>
.payment-methods-page {
  font-family: 'Inter', sans-serif;
  background: white;
  padding: 30px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}
html.dark .payment-methods-page {
  background: #1e1e1e;
  border-color: #3a3a3a;
  color: #f1f1f1;
}

.section-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #1f2937;
}
html.dark .section-title {
  color: #ffffff;
}

.section-header {
  font-size: 16px;
  font-weight: 600;
  padding: 10px 16px;
  border-radius: 6px;
  margin-bottom: 16px;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}
.active .section-header {
  background-color: #e0fce8;
  color: #15803d;
  border: 1px solid #bbf7d0;
}
html.dark .active .section-header {
  background-color: #064e3b;
  color: #86efac;
  border-color: #15803d;
}
.passive .section-header {
  background-color: #fee2e2;
  color: #b91c1c;
  border: 1px solid #fecaca;
  margin-top: 40px;
}
html.dark .passive .section-header {
  background-color: #7f1d1d;
  color: #fecaca;
  border-color: #dc2626;
}

.payment-box {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 20px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  margin-bottom: 16px;
  background-color: #f9fafb;
}
html.dark .payment-box {
  background-color: #2a2a2a;
  border-color: #444;
}

.icon {
  width: 40px;
  height: 40px;
}

.info {
  flex: 1;
}

.actions button {
  background-color: #f1f5f9;
  border: none;
  padding: 6px 12px;
  margin-left: 8px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;
}
.actions button:hover {
  background-color: #e2e8f0;
}
html.dark .actions button {
  background-color: #374151;
  color: #f1f1f1;
}
html.dark .actions button:hover {
  background-color: #4b5563;
}

.sub-method {
  margin-left: 60px;
  margin-bottom: 24px;
}
.sub-method .sub-title {
  font-weight: 600;
  color: #16a34a;
  margin-bottom: 8px;
  display: inline-block;
}
html.dark .sub-method .sub-title {
  color: #86efac;
}

.sub-method ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.sub-method li {
  margin: 4px 0;
  display: flex;
  align-items: center;
  gap: 12px;
}
.sub-method button {
  margin-left: auto;
  background: none;
  border: none;
  color: #2563eb;
  cursor: pointer;
  transition: color 0.2s;
}
.sub-method button:hover {
  text-decoration: underline;
}
html.dark .sub-method button {
  color: #60a5fa;
}

/* Responsive */
@media (max-width: 640px) {
  .payment-box {
    flex-direction: column;
    align-items: flex-start;
  }

  .sub-method {
    margin-left: 0;
  }

  .section-header {
    font-size: 15px;
  }

  .actions {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 10px;
  }
}
</style>