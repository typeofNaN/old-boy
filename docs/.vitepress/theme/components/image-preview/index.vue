<template>
  <figure v-if="normalizedImages.length" class="image-preview">
    <div class="stage">
      <Swiper
        class="main-swiper"
        :modules="modules"
        :initial-slide="activeIndex"
        :loop="hasMultiple"
        :navigation="hasMultiple"
        :pagination="hasMultiple ? { clickable: true } : false"
        :speed="320"
        :grab-cursor="hasMultiple"
        :threshold="8"
        @swiper="mainSwiper = $event"
        @slide-change="onMainChange"
      >
        <SwiperSlide v-for="(image, index) in normalizedImages" :key="`${image.src}-${index}`">
          <button
            class="image-button"
            type="button"
            :aria-label="`放大查看${image.alt ? `：${image.alt}` : '图片'}`"
            @click="openViewer(index)"
          >
            <img :src="image.src" :alt="image.alt" loading="lazy" draggable="false" />
            <span class="zoom-hint" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-3v6m-3-3h6" />
              </svg>
            </span>
          </button>
        </SwiperSlide>
      </Swiper>
      <span v-if="hasMultiple" class="counter"
        >{{ activeIndex + 1 }} / {{ normalizedImages.length }}</span
      >
    </div>
    <figcaption v-if="caption || currentImage.caption">
      {{ currentImage.caption || caption }}
    </figcaption>
  </figure>

  <Teleport to="body">
    <div v-if="viewerOpen" class="viewer" role="dialog" aria-modal="true" aria-label="图片预览">
      <button
        ref="closeButton"
        class="viewer-close"
        type="button"
        aria-label="关闭图片预览"
        @click="closeViewer"
      >
        ×
      </button>
      <Swiper
        class="viewer-swiper"
        :modules="modules"
        :initial-slide="activeIndex"
        :loop="hasMultiple"
        :navigation="hasMultiple"
        :keyboard="{ enabled: true }"
        :speed="320"
        :grab-cursor="hasMultiple"
        :threshold="8"
        @swiper="viewerSwiper = $event"
        @slide-change="onViewerChange"
      >
        <SwiperSlide
          v-for="(image, index) in normalizedImages"
          :key="`viewer-${image.src}-${index}`"
        >
          <img :src="image.src" :alt="image.alt" draggable="false" />
        </SwiperSlide>
      </Swiper>
      <span v-if="hasMultiple" class="viewer-counter"
        >{{ activeIndex + 1 }} / {{ normalizedImages.length }}</span
      >
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, shallowRef, watch } from 'vue'
import type { Swiper as SwiperInstance } from 'swiper'
import { Keyboard, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

type PreviewImage = string | { src: string; alt?: string; caption?: string }

const props = withDefaults(
  defineProps<{
    src?: string
    alt?: string
    caption?: string
    images?: PreviewImage[]
    initialIndex?: number
  }>(),
  { src: '', alt: '', caption: '', images: () => [], initialIndex: 0 }
)

const modules = [Keyboard, Navigation, Pagination]
const normalizedImages = computed(() => {
  const items: PreviewImage[] = props.images.length ? props.images : props.src ? [props.src] : []
  return items.map((item) =>
    typeof item === 'string'
      ? { src: item, alt: props.alt, caption: '' }
      : { alt: props.alt, caption: '', ...item }
  )
})
const activeIndex = ref(
  Math.max(0, Math.min(props.initialIndex, normalizedImages.value.length - 1))
)
const viewerOpen = ref(false)
const closeButton = ref<HTMLButtonElement | null>(null)
const mainSwiper = shallowRef<SwiperInstance | null>(null)
const viewerSwiper = shallowRef<SwiperInstance | null>(null)
const hasMultiple = computed(() => normalizedImages.value.length > 1)
const currentImage = computed(
  () => normalizedImages.value[activeIndex.value] || { src: '', alt: '', caption: '' }
)

function onMainChange(swiper: SwiperInstance) {
  activeIndex.value = swiper.realIndex
  sync(viewerSwiper.value, swiper.realIndex)
}

function onViewerChange(swiper: SwiperInstance) {
  activeIndex.value = swiper.realIndex
  sync(mainSwiper.value, swiper.realIndex)
}

function sync(swiper: SwiperInstance | null, index: number) {
  if (!swiper || swiper.destroyed || swiper.realIndex === index) return
  if (hasMultiple.value) swiper.slideToLoop(index, 0)
  else swiper.slideTo(index, 0)
}

async function openViewer(index: number) {
  activeIndex.value = index
  viewerOpen.value = true
  await nextTick()
  closeButton.value?.focus()
}

function closeViewer() {
  viewerOpen.value = false
  viewerSwiper.value = null
}

function onKeydown(event: KeyboardEvent) {
  if (viewerOpen.value && event.key === 'Escape') closeViewer()
}

watch(viewerOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})
watch(normalizedImages, (images) => {
  if (activeIndex.value >= images.length) activeIndex.value = Math.max(0, images.length - 1)
})

if (typeof window !== 'undefined') window.addEventListener('keydown', onKeydown)
onBeforeUnmount(() => {
  if (typeof window !== 'undefined') window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.image-preview {
  margin: 16px 0;
}
.stage {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}
.main-swiper {
  --swiper-navigation-color: #fff;
  --swiper-pagination-color: var(--vp-c-brand-1);
  --swiper-pagination-bullet-inactive-color: #fff;
  --swiper-pagination-bullet-inactive-opacity: 0.65;
}
.main-swiper :deep(.swiper-slide) {
  display: flex;
  align-items: center;
  justify-content: center;
}
.main-swiper :deep(.swiper-button-prev),
.main-swiper :deep(.swiper-button-next) {
  width: 40px;
  height: 48px;
  border-radius: 8px;
  background: rgb(0 0 0 / 48%);
}
.main-swiper :deep(.swiper-navigation-icon) {
  width: 14px;
  height: 14px;
}
.main-swiper :deep(.swiper-pagination) {
  pointer-events: none;
}
.main-swiper :deep(.swiper-pagination-bullet) {
  pointer-events: auto;
}
.image-button {
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: zoom-in;
}
.image-button img {
  display: block;
  width: 100%;
  max-height: 560px;
  margin: 0;
  object-fit: contain;
  user-select: none;
}
.zoom-hint {
  position: absolute;
  right: 12px;
  bottom: 12px;
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border-radius: 50%;
  color: #fff;
  background: rgb(0 0 0 / 55%);
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
}
.zoom-hint svg {
  width: 18px;
  fill: none;
  stroke: currentcolor;
  stroke-linecap: round;
  stroke-width: 2;
}
.image-button:hover .zoom-hint,
.image-button:focus-visible .zoom-hint {
  opacity: 1;
}
.counter,
.viewer-counter {
  position: absolute;
  z-index: 2;
  right: 12px;
  top: 12px;
  padding: 3px 9px;
  border-radius: 999px;
  color: #fff;
  background: rgb(0 0 0 / 55%);
  font-size: 12px;
  pointer-events: none;
}
figcaption {
  padding-top: 8px;
  color: var(--vp-c-text-2);
  font-size: 14px;
  text-align: center;
}
.viewer {
  position: fixed;
  z-index: 9999;
  inset: 0;
  background: rgb(0 0 0 / 92%);
}
.viewer-swiper {
  width: 100%;
  height: 100%;
  --swiper-navigation-color: #fff;
}
.viewer-swiper :deep(.swiper-slide) {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 56px 72px;
}
.viewer-swiper img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  user-select: none;
}
.viewer-swiper :deep(.swiper-button-prev),
.viewer-swiper :deep(.swiper-button-next) {
  width: 42px;
  height: 52px;
  border-radius: 8px;
  background: rgb(0 0 0 / 48%);
}
.viewer-swiper :deep(.swiper-navigation-icon) {
  width: 16px;
  height: 16px;
}
.viewer-close {
  position: absolute;
  z-index: 3;
  top: 14px;
  right: 18px;
  width: 42px;
  height: 42px;
  padding: 0;
  border: 0;
  color: #fff;
  background: transparent;
  font-size: 38px;
  line-height: 1;
  cursor: pointer;
}
.viewer-counter {
  z-index: 3;
  top: auto;
  right: 50%;
  bottom: 18px;
  transform: translateX(50%);
}
button:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}
@media (max-width: 640px) {
  .viewer-swiper :deep(.swiper-slide) {
    padding: 52px 12px;
  }
}
</style>
