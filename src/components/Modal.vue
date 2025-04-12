<template>
  <div class="modal-overlay" v-if="isOpen">
    <div class="modal-content">
      <div class="modal-header">
        <h2>{{ title }}</h2>
        <button class="close-btn" @click="closeModal">&times;</button>
      </div>
      <div class="modal-body">
        <slot />
      </div>
      <div class="modal-footer">
        <button class="close-btn primary" @click="closeModal">{{ $t('common.close') }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: Boolean,
    title: String,
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
:root {
  --primary: #6c63ff;
  --bg-light: #fff;
  --bg-dark: #2c2c3e;
  --text-light: #333;
  --text-dark: #f5f5f5;
  --radius: 12px;
  --transition: all 0.3s ease;
}

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  animation: fadeIn 0.3s ease;
}

/* Modal Box */
.modal-content {
  background: var(--bg-light);
  color: var(--text-light);
  width: 90%;
  max-width: 500px;
  border-radius: var(--radius);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  animation: scaleIn 0.3s ease;
  transition: var(--transition);
}

/* Dark Mode */
.dark-mode .modal-content {
  background: var(--bg-dark);
  color: var(--text-dark);
}

/* Header */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;
}

.modal-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

/* Body */
.modal-body {
  padding: 0.5rem 0;
}

/* Footer */
.modal-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  gap: 10px;
}

/* Buttons */
.close-btn {
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: var(--text-light);
  transition: var(--transition);
}

.close-btn:hover {
  color: var(--primary);
  transform: scale(1.05);
}

.close-btn.primary {
  background: var(--primary);
  color: white;
  padding: 8px 16px;
  border-radius: var(--radius);
  font-size: 14px;
}

.close-btn.primary:hover {
  background: #584cf2;
}

/* Dark button contrast */
.dark-mode .close-btn {
  color: var(--text-dark);
}

.dark-mode .close-btn.primary {
  background: var(--primary);
  color: #fff;
}

.dark-mode .close-btn.primary:hover {
  background: #584cf2;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>