<template>
  <div class="fixed-discount-container">
    <!-- Sayfa Başlığı -->
    <h2 class="page-title">{{ $t('fixedDiscount.title') }}</h2>

    <!-- Sabit İndirim Formu -->
    <div class="discount-form">
      <label class="discount-label">{{ $t('fixedDiscount.label') }}</label>
      <input type="number" v-model="discountPercentage" min="0" max="100" />

      <div class="form-actions">
        <button class="btn btn-primary" @click="saveDiscount">
          ✔ {{ $t('common.save') }}
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
/* Genel Container */
.fixed-discount-container {
  padding: 20px;
}

/* Sayfa Başlığı */
.page-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
  color: var(--text-color, #1f2937);
}

/* Form Kartı */
.discount-form {
  background: var(--card-bg, white);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  transition: background 0.3s ease, color 0.3s ease;
}

/* Label */
.discount-label {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  color: var(--text-color, #1f2937);
}

/* Input */
input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid var(--border-color, #ddd);
  border-radius: 6px;
  background: var(--input-bg, #fff);
  color: var(--text-color, #1f2937);
  transition: border 0.2s ease;
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
  font-weight: 500;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
}

/* 🌙 Koyu Mod */
:root.dark {
  --card-bg: #1e293b;
  --text-color: #f3f4f6;
  --input-bg: #111827;
  --border-color: #374151;
}

/* 📱 Responsive */
@media (max-width: 768px) {
  .discount-form {
    padding: 15px;
    width: 100%;
  }

  .form-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .btn {
    width: 100%;
  }
}
</style>