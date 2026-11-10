<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()
const percent = ref(0)
const completed = ref(false)
const storageKey = 'openclaw-reading-completed-v1'

const barStyle = computed(() => ({ width: percent.value + '%' }))

function loadCompleted() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(storageKey) || '[]')
    completed.value = Array.isArray(saved) && saved.includes(route.path)
  } catch {
    completed.value = false
  }
}

function updateProgress() {
  const article = document.querySelector('.VPDoc')
  if (!article) {
    percent.value = 0
    return
  }
  const top = article.getBoundingClientRect().top + window.scrollY
  const max = article.scrollHeight - window.innerHeight
  percent.value = max <= 0
    ? 100
    : Math.max(0, Math.min(100, Math.round(((window.scrollY - top) / max) * 100)))
}

function markCompleted() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(storageKey) || '[]')
    const items = Array.isArray(saved) ? saved.filter((item) => typeof item === 'string') : []
    if (!items.includes(route.path)) items.push(route.path)
    window.localStorage.setItem(storageKey, JSON.stringify(items))
    completed.value = true
  } catch {
    completed.value = false
  }
}

watch(() => route.path, () => {
  percent.value = 0
  loadCompleted()
  requestAnimationFrame(updateProgress)
})

onMounted(() => {
  loadCompleted()
  updateProgress()
  window.addEventListener('scroll', updateProgress, { passive: true })
  window.addEventListener('resize', updateProgress)
})
onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
  window.removeEventListener('resize', updateProgress)
})
</script>

<template>
  <div class="reading-progress-bar" aria-hidden="true">
    <span :style="barStyle"></span>
  </div>
  <div class="article-completion">
    <div>
      <p class="completion-kicker">YOUR LEARNING PROGRESS</p>
      <strong>{{ completed ? '本頁已標記完成' : '這一頁讀到哪裡了？' }}</strong>
      <span>{{ percent }}% 閱讀進度 · 僅保存在目前瀏覽器</span>
    </div>
    <button type="button" :class="{ done: completed }" @click="markCompleted">
      {{ completed ? '已完成 ✓' : '標記為已讀' }}
    </button>
  </div>
</template>

<style scoped>
.reading-progress-bar {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  pointer-events: none;
  background: transparent;
}
.reading-progress-bar span {
  display: block;
  height: 100%;
  background: #83a965;
  box-shadow: 0 0 9px rgba(131, 169, 101, .35);
  transition: width .08s linear;
}
.article-completion {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin: 28px 0 14px;
  padding: 16px 18px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-alt);
}
.article-completion > div {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.completion-kicker {
  margin: 0;
  color: var(--vp-c-brand-1);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: .14em;
}
.article-completion strong {
  color: var(--vp-c-text-1);
  font-size: 13px;
}
.article-completion span {
  color: var(--vp-c-text-3);
  font-size: 10px;
}
.article-completion button {
  flex: none;
  padding: 8px 12px;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 7px;
  background: var(--vp-c-brand-1);
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-size: 10px;
  font-weight: 700;
}
.article-completion button.done {
  border-color: var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-brand-1);
}
@media (max-width: 540px) {
  .article-completion { align-items: flex-start; flex-direction: column; }
}
@media print {
  .reading-progress-bar, .article-completion { display: none; }
}
</style>
