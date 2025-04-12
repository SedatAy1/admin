<template>
  <div class="matching-container">
    <!-- Kategori Eşleştir -->
    <div class="matching-card category-matching">
      <h3>1 - {{ $t('match.categoryTitle') }}</h3>
      <div class="info-box">
        <span class="icon">ℹ️</span>
        <p>{{ $t('match.categoryInfo') }}</p>
      </div>
      <label for="category">{{ $t('match.selectCategory') }}</label>
      <select id="category">
        <option>{{ $t('match.allCategories') }}</option>
      </select>
      <label for="platform">{{ $t('match.platform') }}</label>
      <select id="platform">
        <option>N11</option>
      </select>
      <label for="status">{{ $t('match.status') }}</label>
      <select id="status">
        <option>{{ $t('match.unmatched') }}</option>
      </select>
      <button class="match-button">{{ $t('match.start') }}</button>
    </div>

    <!-- Özellik Eşleştir -->
    <div class="matching-card feature-matching">
      <h3>2 - {{ $t('match.featureTitle') }}</h3>
      <div class="info-box">
        <span class="icon">ℹ️</span>
        <p>{{ $t('match.featureInfo') }}</p>
      </div>
      <label for="feature-category">{{ $t('match.selectCategory') }}</label>
      <select id="feature-category">
        <option>{{ $t('match.allCategories') }}</option>
      </select>
      <label for="feature-platform">{{ $t('match.platform') }}</label>
      <select id="feature-platform">
        <option>N11</option>
      </select>
      <button class="match-button">{{ $t('match.start') }}</button>
    </div>

    <!-- Varyant Eşleştir -->
    <div class="matching-card variant-matching">
      <h3>3 - {{ $t('match.variantTitle') }}</h3>
      <div class="info-box">
        <span class="icon">ℹ️</span>
        <p>{{ $t('match.variantInfo') }}</p>
      </div>
      <label for="variant-category">{{ $t('match.selectCategory') }}</label>
      <select id="variant-category">
        <option>{{ $t('match.allCategories') }}</option>
      </select>
      <label for="variant-platform">{{ $t('match.platform') }}</label>
      <select id="variant-platform">
        <option>Trendyol</option>
      </select>
      <button class="match-button">{{ $t('match.start') }}</button>
    </div>
  </div>
</template>

<style scoped>
.matching-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  justify-content: center;
}

.matching-card {
  flex: 1 1 calc(33.333% - 20px);
  min-width: 280px;
  max-width: 400px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 420px;
}

.matching-card h3 {
  margin-bottom: 12px;
  font-size: 18px;
}

.info-box {
  display: flex;
  align-items: flex-start;
  background: #f3f6fb;
  padding: 12px;
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 15px;
  line-height: 1.4;
}

.info-box .icon {
  font-size: 18px;
  margin-right: 10px;
  color: #2f80ed;
  flex-shrink: 0;
}

label {
  display: block;
  margin: 10px 0 5px;
  font-size: 14px;
  font-weight: 500;
}

select,
.match-button {
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

select:focus,
.match-button:focus {
  outline: none;
  border-color: #2f80ed;
}

.match-button {
  background: #2f80ed;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border: none;
  transition: background 0.3s ease;
  margin-top: auto; /* Buton her zaman en aşağıda kalsın */
}

.match-button:hover {
  background: #1c5ec2;
}

/* Responsive */

@media (max-width: 1024px) {
  .matching-card {
    flex: 1 1 calc(50% - 20px);
  }
}

@media (max-width: 768px) {
  .matching-card {
    flex: 1 1 100%;
  }
}
/* Dark Mode */
.dark-mode .matching-card {
  background: #1e293b;
  color: #f1f5f9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.dark-mode .info-box {
  background: #334155;
  color: #cbd5e1;
}

.dark-mode select,
.dark-mode input {
  background: #1e293b;
  color: #f1f5f9;
  border: 1px solid #475569;
}

.dark-mode .match-button {
  background: #0ea5e9;
}

.dark-mode .match-button:hover {
  background: #0284c7;
}
</style>