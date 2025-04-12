<template>
  <div class="container-fluid p-3">
    <!-- Başlık -->
    <div class="header bg-primary text-white p-2 d-flex align-items-center">
      <h4 class="mb-0">{{ $t('quickSale.title') }}</h4>
    </div>

    <!-- Ürün Arama ve Tablo -->
    <div class="card mt-2 p-3">
      <input
        type="text"
        class="form-control mb-2"
        :placeholder="$t('quickSale.searchPlaceholder')"
      />
      <table class="table table-bordered text-center">
        <thead>
          <tr>
            <th>{{ $t('quickSale.table.product') }}</th>
            <th>{{ $t('quickSale.table.vat') }}</th>
            <th>{{ $t('quickSale.table.quantity') }}</th>
            <th>{{ $t('quickSale.table.price') }}</th>
            <th>{{ $t('quickSale.table.total') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.kdv }}%</td>
            <td><input type="number" v-model="item.quantity" class="form-control" @input="updateTotal" /></td>
            <td>{{ item.price }} TL</td>
            <td>{{ (item.quantity * item.price).toFixed(2) }} TL</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="row mt-3">
      <!-- Sipariş Özeti -->
      <div class="col-md-6">
        <div class="card p-3">
          <h5 class="text-primary">{{ $t('quickSale.summaryTitle') }}</h5>
          <div class="row mb-2">
            <div class="col-6">
              <label>{{ $t('quickSale.discountRate') }}</label>
              <input type="number" class="form-control" v-model="discountRate" @input="updateTotal" />
            </div>
            <div class="col-6">
              <label>{{ $t('quickSale.shippingFee') }}</label>
              <input type="number" class="form-control" v-model="shippingFee" @input="updateTotal" />
            </div>
          </div>
          <table class="table">
            <tbody>
              <tr><td>{{ $t('quickSale.subTotal') }}</td><td>{{ subTotal.toFixed(2) }} TL</td></tr>
              <tr><td>{{ $t('quickSale.discount') }}</td><td>-{{ discountAmount.toFixed(2) }} TL</td></tr>
              <tr><td>{{ $t('quickSale.shippingFee') }}</td><td>{{ shippingFee.toFixed(2) }} TL</td></tr>
              <tr><td><b>{{ $t('quickSale.total') }}</b></td><td><b>{{ totalPrice.toFixed(2) }} TL</b></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Müşteri Bilgileri -->
      <div class="col-md-6">
        <div class="card p-3">
          <h5 class="text-primary">{{ $t('quickSale.customerInfo') }}</h5>
          <label>{{ $t('quickSale.customerName') }}</label>
          <input type="text" class="form-control mb-2" v-model="customer.name" />
          <label>{{ $t('quickSale.customerPhone') }}</label>
          <input type="text" class="form-control mb-2" v-model="customer.phone" />
          <label>{{ $t('quickSale.customerCity') }}</label>
          <select class="form-control mb-2" v-model="customer.city">
            <option value="">{{ $t('quickSale.select') }}</option>
            <option v-for="city in cities" :key="city">{{ city }}</option>
          </select>
          <label>{{ $t('quickSale.customerAddress') }}</label>
          <textarea class="form-control mb-2" v-model="customer.address"></textarea>
        </div>
      </div>
    </div>

    <!-- Buton -->
    <button class="btn btn-primary btn-lg w-100 mt-3" @click="createOrder">
      ✅ {{ $t('quickSale.createOrder') }}
    </button>
  </div>
</template>

<script>
export default {
  name: "QuickSale",
  data() {
    return {
      products: [
        { id: 1, name: "Ürün 1", kdv: 18, price: 100, quantity: 0 },
        { id: 2, name: "Ürün 2", kdv: 8, price: 200, quantity: 0 },
      ],
      discountRate: 0,
      shippingFee: 0,
      customer: { name: "", phone: "", city: "", address: "" },
      cities: ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya"],
    };
  },
  computed: {
    subTotal() {
      return this.products.reduce((sum, item) => sum + item.quantity * item.price, 0);
    },
    discountAmount() {
      return (this.subTotal * this.discountRate) / 100;
    },
    totalPrice() {
      return this.subTotal - this.discountAmount + this.shippingFee;
    },
  },
  methods: {
    updateTotal() {
      this.$forceUpdate();
    },
    createOrder() {
      alert(this.$t('quickSale.orderCreated'));
    },
  },
};
</script>
<style scoped>
body {
  font-family: 'Segoe UI', sans-serif;
  background-color: #f8f9fb;
  transition: background-color 0.3s ease;
}

.dark-mode body {
  background-color: #111827;
}

/* 🔵 Mavi Başlık */
.header {
  background-color: #1e3a8a; /* Tailwind indigo-900 tonu */
  color: white;
  padding: 12px 16px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 6px;
}

/* 🧩 Kartlar */
.card {
  background: #ffffff;
  border-radius: 10px;
  border: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  transition: background 0.3s ease;
}

.dark-mode .card {
  background: #1e293b; /* Slate-800 */
  color: #e0e6f1;
}

/* 📊 Tablolar */
.table {
  font-size: 14px;
}

.table th {
  background-color: #e5e7eb;
  color: #111;
}

.dark-mode .table {
  background-color: #1e293b;
  color: #cbd5e1;
}

.dark-mode .table th {
  background-color: #334155; /* slate-700 */
  color: #e2e8f0;
}

/* ✏️ Input Alanları */
.form-control {
  border-radius: 6px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form-control:focus {
  border-color: #2563eb;
  box-shadow: 0 0 6px rgba(37, 99, 235, 0.4);
}

.dark-mode .form-control {
  background: #334155;
  border: 1px solid #475569;
  color: #f1f5f9;
}

.dark-mode .form-control::placeholder {
  color: #94a3b8;
}

/* ✅ Butonlar */
.btn-primary {
  background: #2563eb; /* blue-600 */
  border: none;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.3s;
}

.btn-primary:hover {
  background: #1d4ed8; /* blue-700 */
}

.dark-mode .btn-primary {
  background: #3b82f6; /* blue-500 */
  color: white;
}

/* 🔁 Responsive Düzen */
@media (max-width: 768px) {
  .header {
    font-size: 16px;
    text-align: center;
  }

  .table {
    font-size: 13px;
  }

  .btn {
    font-size: 15px;
  }
}
</style>