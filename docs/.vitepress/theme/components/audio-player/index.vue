<template>
  <div class="vp-audio">
    <img v-if="cover" :src="cover" class="cover" />

    <div class="info">
      <div class="title">{{ currentTrack.title }}</div>

      <div class="controls">
        <button class="play-btn" @click="toggle">
          <!-- 播放图标 -->
          <svg v-if="!playing" viewBox="0 0 24 24" class="icon">
            <path d="M8 5v14l11-7z" />
          </svg>

          <!-- 暂停图标 -->
          <svg v-else viewBox="0 0 24 24" class="icon">
            <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
          </svg>
        </button>

        <div class="time">{{ format(currentTime) }} / {{ format(duration) }}</div>
      </div>

      <div class="progress" @click="seek">
        <div class="bar" :style="{ width: progress + '%' }"></div>
      </div>
    </div>

    <audio
      ref="audio"
      :src="currentTrack.src"
      @play="onPlay"
      @pause="onPause"
      @timeupdate="onTimeUpdate"
    ></audio>
  </div>

  <ul v-if="playlist" class="playlist">
    <li v-for="(item, i) in playlist" :key="i" :class="{ active: i === index }" @click="index = i">
      {{ item.title }}
    </li>
  </ul>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  src: { type: String, default: '' },
  title: { type: String, default: '' },
  cover: { type: String, default: '' },
  playlist: { type: Array, default: null }
})

const audio = ref(null)
const playing = ref(false)
const progress = ref(0)
const duration = ref(0)
const currentTime = ref(0)
const index = ref(0)

const currentTrack = computed(() => {
  if (!props.playlist) return { src: props.src, title: props.title }
  return props.playlist[index.value]
})

function toggle() {
  if (!audio.value) return
  if (playing.value) {
    audio.value.pause()
  } else {
    audio.value.play()
  }
}

function onPlay() {
  playing.value = true
}

function onPause() {
  playing.value = false
}

function onTimeUpdate() {
  currentTime.value = audio.value.currentTime
  duration.value = audio.value.duration
  progress.value = (currentTime.value / duration.value) * 100
}

function seek(e) {
  const rect = e.target.getBoundingClientRect()
  const percent = (e.clientX - rect.left) / rect.width
  audio.value.currentTime = percent * duration.value
}

function format(t) {
  if (!t) return '0:00'
  const m = Math.floor(t / 60)
  const s = Math.floor(t % 60)
    .toString()
    .padStart(2, '0')
  return `${m}:${s}`
}

function next() {
  if (!props.playlist) return
  index.value = (index.value + 1) % props.playlist.length
  playing.value = false
  setTimeout(() => audio.value.play(), 50)
}

onMounted(() => {
  if (audio.value) {
    audio.value.addEventListener('ended', next)
  }
})
</script>

<style scoped>
.vp-audio {
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.cover {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 6px;
}

.info {
  flex: 1;
}

.title {
  font-weight: 600;
  margin-bottom: 6px;
}

.controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.controls button {
  border: none;
  background: var(--vp-c-brand);
  color: white;
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
}

.progress {
  margin-top: 8px;
  height: 6px;
  background: #eee;
  border-radius: 4px;
  cursor: pointer;
}

.bar {
  height: 100%;
  background: var(--vp-c-brand);
  border-radius: 4px;
}

.time {
  font-size: 12px;
  color: gray;
}

.playlist {
  margin-top: 10px;
  padding-left: 0;
  list-style: none;
}

.playlist li {
  padding: 6px 0;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}

.playlist li.active {
  color: var(--vp-c-brand);
  font-weight: 600;
}

.play-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 6px;
  cursor: pointer;
  width: 36px;
  height: 36px;
}

.icon {
  width: 18px;
  height: 18px;
  fill: currentColor;
}
</style>
