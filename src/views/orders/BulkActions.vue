<template>
  <div class="bulk-actions">
    <OrderTopMenu />

    <div class="action-buttons">
      <div class="action-card" @click="showEFaturaModal = true">
        <h3>{{ $t("bulk.einvoice.title") }}</h3>
        <p>{{ $t("bulk.einvoice.desc") }}</p>
      </div>

      <div class="action-card" @click="showDurumDegistirModal = true">
        <h3>{{ $t("bulk.changeStatus.title") }}</h3>
        <p>{{ $t("bulk.changeStatus.desc") }}</p>
      </div>

      <div class="action-card" @click="showDurumAktarModal = true">
        <h3>{{ $t("bulk.transferStatus.title") }}</h3>
        <p>{{ $t("bulk.transferStatus.desc") }}</p>
      </div>
    </div>

    <!-- E-Fatura Modal -->
    <Modal :isOpen="showEFaturaModal" :title="$t('bulk.einvoice.title')" @close="showEFaturaModal = false">
      <div class="modal-body">
        <label>{{ $t("bulk.labels.orderStatus") }}</label>
        <select v-model="filters.orderStatus">
          <option>{{ $t("order.status.processing") }}</option>
          <option>{{ $t("order.status.approved") }}</option>
          <option>{{ $t("order.status.shipped") }}</option>
        </select>

        <div class="date-inputs">
          <div>
            <label>{{ $t("bulk.labels.startDate") }}</label>
            <input type="date" v-model="filters.startDate" />
          </div>
          <div>
            <label>{{ $t("bulk.labels.endDate") }}</label>
            <input type="date" v-model="filters.endDate" />
          </div>
        </div>

        <label>{{ $t("bulk.labels.platform") }}</label>
        <input type="text" v-model="filters.platform" :placeholder="$t('bulk.placeholders.platform')" />

        <label>{{ $t("bulk.labels.paymentMethod") }}</label>
        <input type="text" v-model="filters.paymentMethod" :placeholder="$t('bulk.placeholders.payment')" />

        <div class="number-inputs">
          <div>
            <label>{{ $t("bulk.labels.minAmount") }}</label>
            <input type="number" v-model="filters.minAmount" />
          </div>
          <div>
            <label>{{ $t("bulk.labels.maxAmount") }}</label>
            <input type="number" v-model="filters.maxAmount" />
          </div>
        </div>
      </div>
      <template v-slot:footer>
        <button class="submit-btn" @click="submitEFatura">{{ $t("common.start") }}</button>
      </template>
    </Modal>

    <!-- Durum Değiştir Modal -->
    <Modal :isOpen="showDurumDegistirModal" :title="$t('bulk.changeStatus.title')" @close="showDurumDegistirModal = false">
      <div class="modal-body">
        <div class="alert-box">
          <i class="fas fa-info-circle"></i>
          {{ $t("bulk.notice.marketplace") }}
        </div>

        <label>{{ $t("bulk.labels.orderStatus") }}</label>
        <select v-model="durumDegistir.orderStatus">
          <option>{{ $t("order.status.new") }}</option>
          <option>{{ $t("order.status.processing") }}</option>
          <option>{{ $t("order.status.shipped") }}</option>
          <option>{{ $t("order.status.delivered") }}</option>
        </select>

        <label>{{ $t("bulk.labels.notify") }}</label>
        <select v-model="durumDegistir.notifyCustomer">
          <option>{{ $t("common.active") }}</option>
          <option>{{ $t("common.passive") }}</option>
        </select>

        <label>{{ $t("bulk.labels.orderNumbers") }}</label>
        <textarea v-model="durumDegistir.orderNumbers"></textarea>
      </div>
      <template v-slot:footer>
        <button class="submit-btn" @click="submitDurumDegistir">{{ $t("common.start") }}</button>
      </template>
    </Modal>

    <!-- Durum Aktar Modal -->
    <Modal :isOpen="showDurumAktarModal" :title="$t('bulk.transferStatus.title')" @close="showDurumAktarModal = false">
      <div class="modal-body">
        <div class="alert-box">
          <i class="fas fa-info-circle"></i>
          {{ $t("bulk.notice.marketplace") }}
        </div>

        <fieldset class="fieldset">
          <legend>{{ $t("bulk.transferStatus.from") }}</legend>
          <label>{{ $t("bulk.labels.orderStatus") }}</label>
          <select v-model="durumAktar.currentStatus">
            <option>{{ $t("order.status.new") }}</option>
            <option>{{ $t("order.status.processing") }}</option>
            <option>{{ $t("order.status.shipped") }}</option>
          </select>

          <div class="date-inputs">
            <div>
              <label>{{ $t("bulk.labels.startDate") }}</label>
              <input type="date" v-model="durumAktar.startDate" />
            </div>
            <div>
              <label>{{ $t("bulk.labels.endDate") }}</label>
              <input type="date" v-model="durumAktar.endDate" />
            </div>
          </div>

          <label>{{ $t("bulk.labels.platform") }}</label>
          <input type="text" v-model="durumAktar.platform" :placeholder="$t('bulk.placeholders.platform')" />

          <label>{{ $t("bulk.labels.quickSale") }}</label>
          <select v-model="durumAktar.quickSale">
            <option>{{ $t("common.active") }}</option>
            <option>{{ $t("common.passive") }}</option>
          </select>
        </fieldset>

        <fieldset class="fieldset">
          <legend>{{ $t("bulk.transferStatus.to") }}</legend>
          <label>{{ $t("bulk.labels.orderStatus") }}</label>
          <select v-model="durumAktar.newStatus">
            <option>{{ $t("order.status.new") }}</option>
            <option>{{ $t("order.status.processing") }}</option>
            <option>{{ $t("order.status.shipped") }}</option>
          </select>

          <label>{{ $t("bulk.labels.notify") }}</label>
          <select v-model="durumAktar.notifyCustomer">
            <option>{{ $t("common.active") }}</option>
            <option>{{ $t("common.passive") }}</option>
          </select>
        </fieldset>
      </div>
      <template v-slot:footer>
        <button class="submit-btn" @click="submitDurumAktar">{{ $t("common.start") }}</button>
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
  background-color: #f9fafb;
  min-height: 100vh;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
  margin-top: 30px;
}

.action-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 280px;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
}

.action-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.2);
}

.action-card h3 {
  color: #1e3a8a;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
}

.action-card p {
  color: #555;
  font-size: 14px;
}

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

/* Modal İçeriği */
.modal-content {
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  width: 520px;
  max-width: 95%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  position: relative;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.modal-body label {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 4px;
  display: block;
}

.modal-body input,
.modal-body select,
.modal-body textarea {
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 14px;
  width: 100%;
}

.date-inputs,
.number-inputs {
  display: flex;
  gap: 15px;
}

.date-inputs > div,
.number-inputs > div {
  flex: 1;
}

textarea {
  min-height: 80px;
  resize: vertical;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  margin-top: 16px;
  transition: 0.3s ease;
}

.submit-btn:hover {
  background: #1e40af;
}

/* Bilgilendirme Kutusu */
.alert-box {
  background: #e0f2fe;
  border-left: 5px solid #3b82f6;
  padding: 12px;
  font-size: 14px;
  display: flex;
  align-items: center;
  border-radius: 6px;
  color: #1e3a8a;
}

.alert-box i {
  margin-right: 8px;
}

/* Alan Gruplama */
.fieldset {
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
}

.fieldset legend {
  font-weight: bold;
  padding: 0 8px;
  color: #111827;
}

/* 🌙 Dark Mode */
.dark-mode .bulk-actions {
  background-color: #0f172a;
  color: #e2e8f0;
}

.dark-mode .action-card {
  background: #1e293b;
  border: 1px solid #334155;
  box-shadow: none;
}

.dark-mode .action-card:hover {
  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
}

.dark-mode .action-card h3 {
  color: #93c5fd;
}

.dark-mode .action-card p {
  color: #cbd5e1;
}

.dark-mode .modal-content {
  background: #1e293b;
  color: #f8fafc;
}

.dark-mode .modal-body input,
.dark-mode .modal-body select,
.dark-mode .modal-body textarea {
  background-color: #1e293b;
  color: #f8fafc;
  border-color: #475569;
}

.dark-mode .modal-body label {
  color: #e2e8f0;
}

.dark-mode .submit-btn {
  background: #3b82f6;
}

.dark-mode .submit-btn:hover {
  background: #2563eb;
}

.dark-mode .alert-box {
  background: #1e3a8a;
  color: #bfdbfe;
  border-color: #60a5fa;
}

.dark-mode .fieldset {
  border-color: #334155;
}

.dark-mode .fieldset legend {
  color: #f1f5f9;
}
</style>