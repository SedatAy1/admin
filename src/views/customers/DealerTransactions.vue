<template>
  <div class="layout-container">
    <!-- Üst Menü -->
    <CustomersLayout />

    <!-- Sayfa İçeriği -->
    <div class="container">
      <div class="top-section">
        <button class="send-btn" @click="showErrorModal = true">
          <i class="icon-send"></i> Gönder
        </button>
      </div>

      <div class="info-box">
        <i class="icon-info"></i>
        <span>
          Toplu şifre gönderme işleminde tüm aktif bayilere yeni şifre oluşturulur ve mail adreslerine gönderilir.
          Bu işlemin gerçekleşmesi için "Ayarlar → E-posta ayarları" sayfasından Mailjet kurulumun tamamlanmış olması gerekmektedir.
        </span>
      </div>
    </div>

    <!-- Hata Modalı -->
    <div v-if="showErrorModal" class="modal">
      <div class="modal-content">
        <i class="icon-error"></i>
        <h3>Hata!</h3>
        <p>Demo hesapta bu işlem gerçekleştirilemez!</p>
        <button class="close-btn" @click="showErrorModal = false">Tamam</button>
      </div>
    </div>
  </div>
</template>

<script>
import CustomersLayout from '@/views/customers/CustomersLayout.vue';
export default {
  components: {
    CustomersLayout
  },
  data() {
    return {
      showErrorModal: false
    };
  }
};
</script>

<style scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.container {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}
.top-section {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 15px;
}
.send-btn {
  background: #3b82f6;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.icon-send {
  margin-right: 5px;
}
.info-box {
  display: flex;
  align-items: center;
  background: #f5faff;
  padding: 15px;
  border-radius: 6px;
  border-left: 4px solid #3b82f6;
}
.icon-info {
  margin-right: 10px;
  font-size: 20px;
  color: #3b82f6;
}

/* Hata Modalı */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
.icon-error {
  font-size: 50px;
  color: red;
  margin-bottom: 10px;
}
.close-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
}
</style>
