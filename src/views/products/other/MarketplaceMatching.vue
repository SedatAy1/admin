<template>
  <div class="matching-container">
    <div class="matching-card category-matching">
      <h3>1 - Kategori Eşleştir</h3>
      <div class="info-box">
        <span class="icon">ℹ️</span>
        <p>Mevcut kategorilerinizi pazaryerindeki kategoriler ile eşleştirebilirsiniz.</p>
      </div>
      <label for="category">Eşleştirilecek Kategori</label>
      <select id="category">
        <option>Tüm Kategoriler</option>
      </select>
      <label for="platform">Platform</label>
      <select id="platform">
        <option>N11</option>
      </select>
      <label for="status">Durum</label>
      <select id="status">
        <option>Eşleştirilmemiş</option>
      </select>
      <button class="match-button">Eşleştirmeye Başla</button>
    </div>

    <div class="matching-card feature-matching">
      <h3>2 - Özellik Eşleştir</h3>
      <div class="info-box">
        <span class="icon">ℹ️</span>
        <p>Eşleşmesi tamamlanan kategorilerin pazaryeri özelliklerini de eşleştirebilirsiniz.</p>
      </div>
      <label for="feature-category">Eşleştirilecek Kategori</label>
      <select id="feature-category">
        <option>Tüm Kategoriler</option>
      </select>
      <label for="feature-platform">Platform</label>
      <select id="feature-platform">
        <option>N11</option>
      </select>
      <button class="match-button">Eşleştirmeye Başla</button>
    </div>

    <div class="matching-card variant-matching">
      <h3>3 - Varyant Eşleştir</h3>
      <div class="info-box">
        <span class="icon">ℹ️</span>
        <p>Eşleşmesi tamamlanan kategorilerinizin varyantlarını da eşleştirebilirsiniz.</p>
      </div>
      <label for="variant-category">Eşleştirilecek Kategori</label>
      <select id="variant-category">
        <option>Tüm Kategoriler</option>
      </select>
      <label for="variant-platform">Platform</label>
      <select id="variant-platform">
        <option>Trendyol</option>
      </select>
      <button class="match-button">Eşleştirmeye Başla</button>
    </div>
  </div>
</template>

<style scoped>
.matching-container {
  display: flex;
  gap: 20px;
  padding: 20px;
  justify-content: center;
}

.matching-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 30%;
  text-align: left;
}

.matching-card h3 {
  margin-bottom: 10px;
}

.info-box {
  display: flex;
  align-items: center;
  background: #f3f6fb;
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
  margin-bottom: 15px;
}

.info-box .icon {
  font-size: 18px;
  margin-right: 10px;
}

label {
  display: block;
  margin: 10px 0 5px;
}

select, .match-button {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.match-button {
  background: #2f80ed;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border: none;
}

.match-button:hover {
  background: #1c5ec2;
}
</style>
