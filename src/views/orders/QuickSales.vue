<template>
  <div class="container-fluid p-3">
    <!-- Hızlı Satış Başlığı -->
    <div class="header bg-primary text-white p-2 d-flex align-items-center">
      <h4 class="mb-0">Hızlı Satış</h4>
    </div>

    <!-- Ürün Arama ve Tablo -->
    <div class="card mt-2 p-3">
      <input type="text" class="form-control mb-2" placeholder="Ürün adı, kodu veya barkod ile ara" />
      <table class="table table-bordered text-center">
        <thead>
          <tr>
            <th>Ürün</th>
            <th>KDV</th>
            <th>Miktar</th>
            <th>Fiyat</th>
            <th>Tutar</th>
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
          <h5 class="text-primary">Sipariş Özeti</h5>
          <div class="row mb-2">
            <div class="col-6">
              <label>İndirim Oranı (%)</label>
              <input type="number" class="form-control" v-model="discountRate" @input="updateTotal" />
            </div>
            <div class="col-6">
              <label>Kargo Ücreti</label>
              <input type="number" class="form-control" v-model="shippingFee" @input="updateTotal" />
            </div>
          </div>
          <table class="table">
            <tbody>
              <tr><td>Ara Toplam</td><td>{{ subTotal.toFixed(2) }} TL</td></tr>
              <tr><td>İndirim</td><td>-{{ discountAmount.toFixed(2) }} TL</td></tr>
              <tr><td>Kargo Ücreti</td><td>{{ shippingFee.toFixed(2) }} TL</td></tr>
              <tr><td><b>Genel Toplam</b></td><td><b>{{ totalPrice.toFixed(2) }} TL</b></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Müşteri Bilgileri -->
      <div class="col-md-6">
        <div class="card p-3">
          <h5 class="text-primary">Müşteri Bilgileri</h5>
          <label>Ad Soyad / Ünvan</label>
          <input type="text" class="form-control mb-2" v-model="customer.name" />
          <label>Telefon</label>
          <input type="text" class="form-control mb-2" v-model="customer.phone" />
          <label>İl</label>
          <select class="form-control mb-2" v-model="customer.city">
            <option value="">Lütfen Seçin</option>
            <option v-for="city in cities" :key="city">{{ city }}</option>
          </select>
          <label>Adres</label>
          <textarea class="form-control mb-2" v-model="customer.address"></textarea>
        </div>
      </div>
    </div>

    <!-- Sipariş Oluştur Butonu -->
    <button class="btn btn-primary btn-lg w-100 mt-3" @click="createOrder">
      ✅ SİPARİŞİ OLUŞTUR
    </button>
  </div>
</template>

<script>
export default {
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
      alert("Sipariş oluşturuldu!");
    },
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
}
.header {
  background-color: #2c3e50;
  color: white;
  padding: 10px;
  font-size: 18px;
}
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.table th, .table td {
  vertical-align: middle;
  text-align: center;
}
.btn-primary {
  background: #007bff;
  border: none;
  font-size: 18px;
}
</style>
