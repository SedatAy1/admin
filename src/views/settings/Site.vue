<template>
  <div class="site-settings">
    <div class="box">
      <h3 class="title">Site Ayarları</h3>
      <p><strong>Site Adresi</strong> https://demo.eticaret.tv.tr</p>
      <p><strong>Domain</strong> demo.eticaret.tv.tr</p>
      <p>
        <strong>Lisans Kodu</strong> Eticarettvtr - 838981 -
        9dGnWm1FZK-jX5oV1tsTf-8EJ9HxdfL
      </p>
      <p><strong>Versiyon</strong> v2024.08.22</p>
      <p><strong>Sunucu IP Adresi</strong> 89.252.175.206</p>
    </div>
  </div>
</template>

<script setup>
// Statik veri, dinamik değil.
</script>

<style scoped>
.site-settings {
  font-family: "Inter";
  padding: 20px;
  background-color: #ffffff;
}
html.dark .site-settings {
  background-color: #1e293b;
}

.box {
  background: #fff;
  border-radius: 6px;
  padding: 20px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
}
html.dark .box {
  background: #334155;
  border-color: #475569;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #374151;
}
html.dark .title {
  color: #f1f5f9;
}

p {
  margin: 6px 0;
  font-size: 14px;
  color: #4b5563;
}
html.dark p {
  color: #cbd5e1;
}

strong {
  color: #111827;
  margin-right: 6px;
}
html.dark strong {
  color: #ffffff;
}

/* ✅ Responsive destek */
@media (max-width: 640px) {
  .box {
    padding: 16px;
  }

  .title {
    font-size: 15px;
  }

  p {
    font-size: 13px;
  }
}
</style>