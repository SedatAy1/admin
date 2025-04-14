<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold mb-6">{{ $t('marketing.title') }}</h2>
    <div class="space-y-4">
      <div
        v-for="item in tools"
        :key="item.title"
        class="flex justify-between items-center bg-white p-5 rounded-lg shadow border"
      >
        <div class="flex items-start gap-4">
          <img :src="item.icon" alt="icon" class="w-8 h-8 mt-1" />
          <div>
            <h3 class="text-lg font-semibold">{{ $t(`marketing.tools.${item.key}.title`) }}</h3>
            <p class="text-gray-500 text-sm" v-html="$t(`marketing.tools.${item.key}.desc`)" />
          </div>
        </div>
        <button class="btn btn-outline-primary">{{ $t('common.settings') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const tools = [
  { key: 'verification', icon: 'https://img.icons8.com/ios-filled/50/000000/search--v1.png' },
  { key: 'robots', icon: 'https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/000000/external-robot-robotics-flatart-icons-outline-flatarticons.png' },
  { key: 'analytics', icon: 'https://img.icons8.com/color/48/000000/google-analytics.png' },
  { key: 'metrica', icon: 'https://img.icons8.com/color/48/000000/yandex.png' },
  { key: 'ads', icon: 'https://img.icons8.com/color/48/000000/google-ads.png' },
  { key: 'html', icon: 'https://img.icons8.com/color/48/000000/source-code.png' },
  { key: 'customCodes', icon: 'https://img.icons8.com/ios/50/000000/code.png' },
  { key: 'tawkto', icon: 'https://img.icons8.com/fluency/48/000000/chat.png' },
  { key: 'sendpulse', icon: 'https://img.icons8.com/ios-filled/50/000000/push-notifications.png' }
]
</script>
<style scoped>
.btn {
  @apply px-4 py-2 border rounded text-sm font-medium transition duration-200;
}

.btn-outline-primary {
  @apply border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white;
  @apply dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-500 dark:hover:text-white;
}
</style>