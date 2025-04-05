<template>
  <MarketLayout>
    <div class="container my-5">
      <div class="bg-white shadow rounded p-4">
        <h2 class="text-primary mb-4">Pazaryeri Mağazaları</h2>
        <p class="text-secondary">
          Pazaryerindeki mağazalarınızı tanımlayabilir, kar oranlarını ve kısıtlamalarını düzenleyebilirsiniz.
        </p>

        <div class="row mt-4">
          <div v-for="store in stores" :key="store.id" class="col-md-4 mb-3">
            <div class="card p-3 text-center">
              <img :src="store.logo" :alt="store.name" class="store-logo mb-2" />
              <h5 class="text-dark">{{ store.name }}</h5>

              <ul class="list-group list-group-flush mt-2">
                <li v-for="shop in store.shops" :key="shop.id" class="list-group-item d-flex align-items-center justify-content-between">
                  <img :src="shop.logo" :alt="shop.name" class="shop-logo me-2" />
                  <span class="flex-grow-1">{{ shop.name }}</span>
                  <button class="btn btn-outline-secondary btn-sm" @click="openSettings(shop)">
                    <i class="bi bi-gear"></i>
                  </button>
                </li>
              </ul>

              <button class="btn btn-success mt-3" @click="addShop(store)">
                <i class="bi bi-plus-circle"></i> Mağaza Ekle
              </button>
            </div>
          </div>
        </div>

        <div v-if="modalOpen" class="modal-overlay">
          <div class="modal-content">
            <h5 class="mb-3">Yeni Mağaza Ekle</h5>
            <form @submit.prevent="saveShop">
              <div class="mb-2">
                <label class="form-label">Mağaza Adı</label>
                <input v-model="newShop.name" class="form-control" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Mağaza Logosu (URL)</label>
                <input v-model="newShop.logo" class="form-control" required />
              </div>

              <div class="d-flex justify-content-end">
                <button class="btn btn-secondary me-2" @click="modalOpen = false" type="button">İptal</button>
                <button class="btn btn-primary" type="submit">Kaydet</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </MarketLayout>
</template>

<script>
import MarketLayout from '@/views/integrations/MarketLayout.vue';

export default {
  components: { MarketLayout },
  data() {
    return {
      modalOpen: false,
      newShop: { name: '', logo: '' },
      selectedStore: null,
      stores: [
        {
          id: 1,
          name: 'N11 Mağazalarım',
          logo: 'n11.png',
          shops: [{ id: 101, name: 'Demo', logo: 'n11-demo.png' }],
        },
        {
          id: 2,
          name: 'Trendyol Mağazalarım',
          logo: 'trendyol.png',
          shops: [{ id: 102, name: 'Demo', logo: 'trendyol-demo.png' }],
        },
      ],
    };
  },
  methods: {
    addShop(store) {
      this.selectedStore = store;
      this.newShop = { name: '', logo: '' };
      this.modalOpen = true;
    },
    saveShop() {
      if (this.newShop.name.trim() && this.newShop.logo.trim()) {
        this.selectedStore.shops.push({
          id: Date.now(),
          name: this.newShop.name,
          logo: this.newShop.logo,
        });
        this.modalOpen = false;
      }
    },
    openSettings(shop) {
      alert(`${shop.name} ayarlarını düzenleyebilirsiniz.`);
    },
  },
};
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css');

.store-logo {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  margin: 0 auto;
}

.shop-logo {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 5px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}
</style>