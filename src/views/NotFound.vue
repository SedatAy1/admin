<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Oops! The page you are looking for does not exist.</p>
    <router-link to="/dashboard" class="btn btn-primary">Go to Dashboard</router-link>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 50px;
}
h1 {
  font-size: 72px;
  font-weight: bold;
}
p {
  font-size: 18px;
  margin-bottom: 20px;
}
</style>
