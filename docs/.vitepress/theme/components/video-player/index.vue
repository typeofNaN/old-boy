<template>
  <figure class="video-player">
    <video
      :src="src"
      :poster="poster"
      :autoplay="autoplay"
      :loop="loop"
      :muted="muted"
      :controls="controls"
      :preload="preload"
      playsinline
    >
      <track v-if="captions" kind="captions" :src="captions" :srclang="captionLanguage" :label="captionLabel" default />
      你的浏览器不支持视频播放。
    </video>
    <figcaption v-if="title">{{ title }}</figcaption>
  </figure>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    src: string
    poster?: string
    title?: string
    autoplay?: boolean
    loop?: boolean
    muted?: boolean
    controls?: boolean
    preload?: 'none' | 'metadata' | 'auto'
    captions?: string
    captionLanguage?: string
    captionLabel?: string
  }>(),
  {
    poster: '', title: '', autoplay: false, loop: false, muted: false, controls: true,
    preload: 'metadata', captions: '', captionLanguage: 'zh', captionLabel: '中文字幕'
  }
)
</script>

<style scoped>
.video-player { margin: 16px 0; }
.video-player video { display: block; width: 100%; max-height: 70vh; border-radius: 12px; background: #000; box-shadow: 0 1px 0 var(--vp-c-divider); }
.video-player figcaption { padding-top: 8px; color: var(--vp-c-text-2); font-size: 14px; text-align: center; }
</style>
