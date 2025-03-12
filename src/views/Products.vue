<template>
  <div class="products">
    <h2>🛒 Products</h2>
    <button @click="addProduct">+ Add Product</button>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>${{ product.price }}</td>
          <td>{{ product.stock }}</td>
          <td><button @click="deleteProduct(product.id)">❌</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [
        { id: 1, name: "iPhone 13", price: 999, stock: 10 },
        { id: 2, name: "MacBook Pro", price: 1999, stock: 5 },
      ],
    };
  },
  methods: {
    addProduct() {
      alert("Add Product Clicked!");
    },
    deleteProduct(id) {
      this.products = this.products.filter((p) => p.id !== id);
    },
  },
};
</script>

<style scoped>
.products {
  margin-left: 260px;
  padding: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 10px;
}
</style>
