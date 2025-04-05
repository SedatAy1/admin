<template>
  <div class="fixed-discount-container">
    <!-- Sayfa Başlığı -->
    <h2 class="page-title">Sabit İndirim</h2>

    <!-- Sabit İndirim Formu -->
    <div class="discount-form">
      <label class="discount-label">Sepet Tutarına İndirim (%)</label>
      <input type="number" v-model="discountPercentage" min="0" max="100" />

      <div class="form-actions">
        <button class="btn btn-primary" @click="saveDiscount">
          ✔ Kaydet
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      discountPercentage: 0, // Varsayılan indirim oranı
    };
  },
  methods: {
    saveDiscount() {
      if (this.discountPercentage < 0 || this.discountPercentage > 100) {
        alert("İndirim oranı 0 ile 100 arasında olmalıdır!");
        return;
      }
      console.log("Kaydedilen İndirim Oranı: ", this.discountPercentage);
      alert("Sabit İndirim başarıyla kaydedildi!");
    },
  },
};
</script>

<style scoped>
/* Sayfa Başlığı */
.page-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
}

/* Form */
.discount-form {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

/* Label */
.discount-label {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}

/* Input */
input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

/* Kaydet Butonu */
.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}

.btn {
  padding: 10px 15px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
}
</style>