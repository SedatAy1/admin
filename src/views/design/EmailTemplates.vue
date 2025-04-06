<template>
  <div class="email-template-page">
    <h2 class="title">E-Posta Tasarımları</h2>

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
            Aktif Et
          </button>

          <button
            class="btn dark"
            v-else
            @click.stop="editTemplate(template.id)"
          >
            Düzenle
          </button>

          <button class="btn ghost" @click.stop="previewTemplate(template.id)">
            Önizle
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

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
  console.log('Aktif şablon:', id)
}

const previewTemplate = (id) => {
  alert(`\u00d6nizleme: ${id}`)
}

const editTemplate = (id) => {
  alert(`Düzenleme: ${id}`)
}
</script>

<style scoped>
.email-template-page {
  padding: 32px;
  font-family: 'Inter', sans-serif;
}

.title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #0f172a;
}

.template-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.template-card {
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  background-color: #fff;
  overflow: hidden;
  cursor: pointer;
  padding: 16px;
  position: relative;
  transition: all 0.2s ease;
}

.template-card.active {
  background-color: #5eead4;
  border-color: #14b8a6;
}

.template-card .check-icon {
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 20px;
  color: #0f766e;
}

.preview-image {
  width: 100%;
  border-radius: 6px;
  margin-bottom: 12px;
}

.template-name {
  font-weight: 600;
  font-size: 15px;
  text-align: center;
  margin-bottom: 10px;
  color: #0f172a;
}

.template-actions {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.btn {
  padding: 6px 12px;
  font-size: 13px;
  border-radius: 6px;
  cursor: pointer;
  border: none;
}

.btn.primary {
  background-color: #3b82f6;
  color: white;
}

.btn.dark {
  background-color: #334155;
  color: white;
}

.btn.ghost {
  background-color: #f1f5f9;
  color: #334155;
  border: 1px solid #cbd5e1;
}
</style>
0