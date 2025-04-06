<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold mb-6">Pazarlama Araçları</h2>
    <div class="space-y-4">
      <div
        v-for="item in tools"
        :key="item.title"
        class="flex justify-between items-center bg-white p-5 rounded-lg shadow border"
      >
        <div class="flex items-start gap-4">
          <img :src="item.icon" alt="icon" class="w-8 h-8 mt-1" />
          <div>
            <h3 class="text-lg font-semibold">{{ item.title }}</h3>
            <p class="text-gray-500 text-sm" v-html="item.description" />
          </div>
        </div>
        <button class="btn btn-outline-primary">Ayarlar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const tools = [
  {
    title: 'Arama Motoru Doğrulama',
    description: 'E-ticaret sitenizin Google, Facebook, Yandex, Bing, Alexa ve Pinterest platformlarında doğrulanmasını ve daha hızlı indekslenebilmesini sağlar.',
    icon: 'https://img.icons8.com/ios-filled/50/000000/search--v1.png'
  },
  {
    title: 'Robots.txt',
    description: 'Robots.txt dosyası, arama motoru botlarının sitenizle ilgili davranışlarını belirten bir komut dosyasıdır.',
    icon: 'https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/000000/external-robot-robotics-flatart-icons-outline-flatarticons.png'
  },
  {
    title: 'Google Analytics',
    description: 'Google Analytics servisiyle e-ticaret sitenize gelen ziyaretçilerin istatistiklerini görüntüleyebilir, davranışlarını inceleyebilirsiniz.',
    icon: 'https://img.icons8.com/color/48/000000/google-analytics.png'
  },
  {
    title: 'Yandex Metrica',
    description: 'Yandex Metrica servisiyle e-ticaret sitenize gelen ziyaretçilerin istatistiklerini görüntüleyebilir, davranışlarını inceleyebilirsiniz.',
    icon: 'https://img.icons8.com/color/48/000000/yandex.png'
  },
  {
    title: 'Google Ads',
    description: 'Google Ads entegrasyonuyla oluşturduğunuz reklam kampanyalarını takip edebilir ve performansınızı artırabilirsiniz.',
    icon: 'https://img.icons8.com/color/48/000000/google-ads.png'
  },
  {
    title: 'Head-Body HTML Kodları',
    description: `<head></head> kodları arasına veya </body> etiketi öncesine HTML kodlarınızı ekleyebilirsiniz.`,
    icon: 'https://img.icons8.com/color/48/000000/source-code.png'
  },
  {
    title: 'Özelleştirilebilir Pazarlama Kodları',
    description: 'Raporlama, dönüşüm ve yeniden pazarlama için oluşturulan ortak alanlara kodlarınızı ekleyebilirsiniz. Bu araç uzmanlık gerektirebilir.',
    icon: 'https://img.icons8.com/ios/50/000000/code.png'
  },
  {
    title: 'tawk.to',
    description: 'E-Ticaret sitenizi ziyaret eden müşterileriniz ile anlık olarak sohbet edebilmenizi ve müşteri memnuniyetini artırmanızı sağlayabilecek Canlı Sohbet uygulaması <strong>Tawk.to</strong>\'yu sitenize ekleyebilirsiniz.',
    icon: 'https://img.icons8.com/fluency/48/000000/chat.png'
  },
  {
    title: 'SendPulse Web Push',
    description: 'Web sitenize gelen ziyaretçiler tarayıcı üzerinden bildirim almayı kabul ettiklerinde onlara <strong>Sendpulse.com.tr</strong> üzerinden tarayıcı bildirimleri (kampanyalar) gönderebilirsiniz.',
    icon: 'https://img.icons8.com/ios-filled/50/000000/push-notifications.png'
  }
]
</script>

<style scoped>
.btn {
  @apply px-4 py-2 border rounded text-sm font-medium;
}
.btn-outline-primary {
  @apply border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition;
}
</style>