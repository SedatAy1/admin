<template>
  <div>

    <!-- Ana İçerik -->
    <div class="container">
      <div class="card">
        <h2>Toplu Ürün İşlemleri</h2>
        <div class="form-group">
          <label for="bulk-action">» Yapılacak İşlem</label>
          <select id="bulk-action" v-model="selectedAction">
            <option value="" disabled>Lütfen işlemi seçin</option>
            <option value="price-update">Fiyat Güncelleme</option>
            <option value="stock-update">Stok Güncelleme</option>
            <option value="category-change">Kategori Değiştirme</option>
            <option value="delete-products">Ürünleri Sil</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductOtherTabs from "@/components/ProductOtherTabs.vue";

export default {
  components: { ProductOtherTabs },
  data() {
    return {
      selectedAction: "",
    };
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
}
.card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
h2 {
  color: #333;
  font-size: 18px;
  margin-bottom: 15px;
}
.form-group {
  margin-top: 10px;
}
label {
  font-size: 14px;
  font-weight: bold;
  color: #666;
}
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 5px;
  font-size: 14px;
}
</style>
