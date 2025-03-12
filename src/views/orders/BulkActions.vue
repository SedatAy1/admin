<template>
  <div class="bulk-actions">
    <!-- Üst Menü -->
    <OrderTopMenu />

    <!-- Butonlar -->
    <div class="action-buttons">
      <div class="action-card" @click="showEFaturaModal = true">
        <h3>E-Fatura Kes</h3>
        <p>Seçilen filtrelemeler ile toplu e-fatura kesebilirsiniz.</p>
      </div>

      <div class="action-card" @click="showDurumDegistirModal = true">
        <h3>Sipariş Durumunu Değiştir</h3>
        <p>Sipariş numaraları ile siparişlerin durumunu değiştirebilirsiniz.</p>
      </div>

      <div class="action-card" @click="showDurumAktarModal = true">
        <h3>Sipariş Durumunu Aktar</h3>
        <p>"X" durumundaki siparişleri toplu olarak "Y" durumuna aktarabilirsiniz.</p>
      </div>
    </div>

    <!-- E-Fatura Kes Modal -->
    <Modal :isOpen="showEFaturaModal" title="E-Fatura Kes" @close="showEFaturaModal = false">
      <div class="modal-body">
        <label>Sipariş Durumu</label>
        <select v-model="filters.orderStatus">
          <option>Hazırlanan Sipariş</option>
          <option>Onaylanan Sipariş</option>
          <option>Kargolanan Sipariş</option>
        </select>

        <div class="date-inputs">
          <div>
            <label>Sipariş Başlangıç Tarihi</label>
            <input type="date" v-model="filters.startDate" required />
          </div>
          <div>
            <label>Sipariş Bitiş Tarihi</label>
            <input type="date" v-model="filters.endDate" required />
          </div>
        </div>

        <label>Platform</label>
        <input type="text" v-model="filters.platform" placeholder="Platform seçin" />

        <label>Ödeme Yöntemi</label>
        <input type="text" v-model="filters.paymentMethod" placeholder="Ödeme yöntemi seçin" />

        <div class="number-inputs">
          <div>
            <label>Minimum Sipariş Tutarı</label>
            <input type="number" v-model="filters.minAmount" />
          </div>
          <div>
            <label>Maksimum Sipariş Tutarı</label>
            <input type="number" v-model="filters.maxAmount" />
          </div>
        </div>
      </div>

      <template v-slot:footer>
        <button class="submit-btn" @click="submitEFatura">İşleme Başla</button>
      </template>
    </Modal>

    <!-- Sipariş Durumunu Değiştir Modal -->
    <Modal :isOpen="showDurumDegistirModal" title="Sipariş Durumunu Değiştir" @close="showDurumDegistirModal = false">
      <div class="modal-body">
        <div class="alert-box">
          <i class="fas fa-info-circle"></i>
          Pazaryeri siparişleri için pazaryeri hesaplarınızda bir işlem yapılmaz. Sadece siparişin paneldeki durumu güncellenir.
        </div>

        <label>Sipariş Durumu</label>
        <select v-model="durumDegistir.orderStatus">
          <option>Yeni Sipariş</option>
          <option>Hazırlanan Sipariş</option>
          <option>Kargolanan Sipariş</option>
          <option>Teslim Edilen Sipariş</option>
        </select>

        <label>Müşteriye Bildirim Gönder</label>
        <select v-model="durumDegistir.notifyCustomer">
          <option>Aktif</option>
          <option>Pasif</option>
        </select>

        <label>Sipariş Numaraları (Her satıra 1 sipariş numarası yazabilirsiniz)</label>
        <textarea v-model="durumDegistir.orderNumbers"></textarea>
      </div>

      <template v-slot:footer>
        <button class="submit-btn" @click="submitDurumDegistir">İşleme Başla</button>
      </template>
    </Modal>

    <!-- Sipariş Durumunu Aktar Modal -->
    <Modal :isOpen="showDurumAktarModal" title="Sipariş Durumunu Aktar" @close="showDurumAktarModal = false">
      <div class="modal-body">
        <div class="alert-box">
          <i class="fas fa-info-circle"></i>
          Pazaryeri siparişleri için pazaryeri hesaplarınızda bir işlem yapılmaz. Sadece siparişin paneldeki durumu güncellenir.
        </div>

        <fieldset class="fieldset">
          <legend>Mevcut Siparişler (Aktarılacak Siparişler)</legend>
          <label>Sipariş Durumu</label>
          <select v-model="durumAktar.currentStatus">
            <option>Yeni Sipariş</option>
            <option>Hazırlanan Sipariş</option>
            <option>Kargolanan Sipariş</option>
          </select>

          <div class="date-inputs">
            <div>
              <label>Sipariş Başlangıç Tarihi</label>
              <input type="date" v-model="durumAktar.startDate" required />
            </div>
            <div>
              <label>Sipariş Bitiş Tarihi</label>
              <input type="date" v-model="durumAktar.endDate" required />
            </div>
          </div>

          <label>Platform</label>
          <input type="text" v-model="durumAktar.platform" placeholder="Platform seçin" />

          <label>Hızlı Satış</label>
          <select v-model="durumAktar.quickSale">
            <option>Aktif</option>
            <option>Pasif</option>
          </select>
        </fieldset>

        <fieldset class="fieldset">
          <legend>Yeni Sipariş Durumu</legend>
          <label>Sipariş Durumu</label>
          <select v-model="durumAktar.newStatus">
            <option>Yeni Sipariş</option>
            <option>Hazırlanan Sipariş</option>
            <option>Kargolanan Sipariş</option>
          </select>

          <label>Müşteriye Bildirim Gönder</label>
          <select v-model="durumAktar.notifyCustomer">
            <option>Aktif</option>
            <option>Pasif</option>
          </select>
        </fieldset>
      </div>

      <template v-slot:footer>
        <button class="submit-btn" @click="submitDurumAktar">İşleme Başla</button>
      </template>
    </Modal>
  </div>
</template>

<script>
import OrderTopMenu from "@/components/OrderTopMenu.vue";
import Modal from "@/components/Modal.vue";

export default {
  name: "BulkActions",
  components: { OrderTopMenu, Modal },
  data() {
    return {
      showEFaturaModal: false,
      showDurumDegistirModal: false,
      showDurumAktarModal: false,
      filters: {},
      durumDegistir: {},
      durumAktar: {},
    };
  },
  methods: {
    submitEFatura() {
      this.showEFaturaModal = false;
    },
    submitDurumDegistir() {
      this.showDurumDegistirModal = false;
    },
    submitDurumAktar() {
      this.showDurumAktarModal = false;
    },
  },
};
</script>

<style scoped>
.bulk-actions {
  padding: 20px;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.action-card {
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 300px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
}

.action-card h3 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.action-card p {
  font-size: 14px;
  color: #555;
}

/* Modal */
.modal-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.date-inputs,
.number-inputs {
  display: flex;
  justify-content: space-between;
}

.submit-btn {
  width: 100%;
  padding: 10px;
  background: blue;
  color: white;
  border: none;
  cursor: pointer;
}

/* Bilgilendirme Kutusu */
.alert-box {
  background: #f0f8ff;
  padding: 10px;
  border-left: 5px solid #007bff;
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-bottom: 10px;
}

.alert-box i {
  margin-right: 10px;
  color: #007bff;
}
.fieldset {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
}

.fieldset legend {
  font-weight: bold;
}
</style>
