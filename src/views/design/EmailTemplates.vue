<template>
  <div class="email-template-page">
    <h2 class="title">{{ $t('emailTemplates.title') }}</h2>

    <div class="template-grid">
      <div
        v-for="template in templates"
        :key="template.id"
        :class="['template-card', { active: template.id === selectedTemplate }]"
        @click="selectTemplate(template.id)"
      >
        <div class="check-icon" v-if="template.id === selectedTemplate">
          <i class="fas fa-check-circle"></i>
        </div>

        <img :src="template.image" alt="template preview" class="preview-image" />
        <p class="template-name">{{ template.name }}</p>

        <div class="template-actions">
          <button
            class="btn primary"
            v-if="template.id !== selectedTemplate"
            @click.stop="selectTemplate(template.id)"
          >
            {{ $t('emailTemplates.activate') }}
          </button>

          <button
            class="btn dark"
            v-else
            @click.stop="editTemplate(template.id)"
          >
            {{ $t('emailTemplates.edit') }}
          </button>

          <button class="btn ghost" @click.stop="previewTemplate(template.id)">
            {{ $t('emailTemplates.preview') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const templates = [
  {
    id: 'aero',
    name: 'Aero',
    image: 'https://dummyimage.com/300x180/0ea5e9/ffffff&text=Aero'
  },
  {
    id: 'sopra',
    name: 'Sopra',
    image: 'https://dummyimage.com/300x180/e0e7ff/1e3a8a&text=Sopra'
  },
  {
    id: 'brev',
    name: 'Brev',
    image: 'https://dummyimage.com/300x180/c7d2fe/312e81&text=Brev'
  },
  {
    id: 'realo',
    name: 'Realo',
    image: 'https://dummyimage.com/300x180/e2e8f0/0f172a&text=Realo'
  }
]

const selectedTemplate = ref('aero')

const selectTemplate = (id) => {
  selectedTemplate.value = id
  console.log(t('emailTemplates.selected'), id)
}

const previewTemplate = (id) => {
  alert(`${t('emailTemplates.previewing')}: ${id}`)
}

const editTemplate = (id) => {
  alert(`${t('emailTemplates.editing')}: ${id}`)
}
</script>

<style scoped>
.email-template-page {
  padding: 32px;
  font-family: 'Inter', sans-serif;
  transition: background-color 0.3s ease;
}
html.dark .email-template-page {
  background-color: #181818;
  color: #f1f1f1;
}

/* Başlık */
.title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #0f172a;
}
html.dark .title {
  color: #f1f1f1;
}

/* Grid yapısı */
.template-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

/* Kart */
.template-card {
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  background-color: #fff;
  overflow: hidden;
  cursor: pointer;
  padding: 16px;
  position: relative;
  transition: all 0.3s ease;
}
.template-card:hover {
  transform: scale(1.01);
}
.template-card.active {
  background-color: #5eead4;
  border-color: #14b8a6;
}
html.dark .template-card {
  background-color: #2a2a2a;
  border-color: #3a3a3a;
}
html.dark .template-card.active {
  background-color: #115e59;
  border-color: #0f766e;
}

/* Seçili ikon */
.template-card .check-icon {
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 20px;
  color: #0f766e;
}
html.dark .template-card .check-icon {
  color: #5eead4;
}

/* Görsel */
.preview-image {
  width: 100%;
  border-radius: 6px;
  margin-bottom: 12px;
}

/* İsim */
.template-name {
  font-weight: 600;
  font-size: 15px;
  text-align: center;
  margin-bottom: 10px;
  color: #0f172a;
}
html.dark .template-name {
  color: #f1f1f1;
}

/* Aksiyon butonları */
.template-actions {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

/* Butonlar */
.btn {
  padding: 6px 12px;
  font-size: 13px;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.btn.primary {
  background-color: #3b82f6;
  color: white;
}
.btn.primary:hover {
  background-color: #2563eb;
}

.btn.dark {
  background-color: #334155;
  color: white;
}
.btn.dark:hover {
  background-color: #1e293b;
}

.btn.ghost {
  background-color: #f1f5f9;
  color: #334155;
  border: 1px solid #cbd5e1;
}
.btn.ghost:hover {
  background-color: #e2e8f0;
}
html.dark .btn.ghost {
  background-color: #2e2e2e;
  color: #cbd5e1;
  border-color: #475569;
}
html.dark .btn.ghost:hover {
  background-color: #3b3b3b;
}

/* Responsive */
@media (max-width: 600px) {
  .email-template-page {
    padding: 16px;
  }

  .title {
    font-size: 18px;
    text-align: center;
  }

  .template-actions {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 100%;
    text-align: center;
  }
}
</style>
