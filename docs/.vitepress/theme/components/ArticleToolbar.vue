<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData, withBase } from 'vitepress'

const { page, frontmatter } = useData()
const copied = ref(false)

const section = computed(() => {
  const path = page.value.relativePath || ''
  if (path.startsWith('adopt/')) return { label: '領養 OpenClaw', href: '/adopt/intro/' }
  if (path.startsWith('university/')) return { label: '龍蝦大學', href: '/university/intro/' }
  if (path.startsWith('build/')) return { label: '構建 OpenClaw', href: '/build/intro/' }
  if (path.startsWith('appendix/')) return { label: '參考附錄', href: '/reference/glossary' }
  if (path.startsWith('agent-lab/')) return { label: '本機 Agent 實驗室', href: '/agent-lab/' }
  return { label: '參考資料', href: '/reference/glossary' }
})

const title = computed(() => frontmatter.value.title || page.value.title || '教學文件')

async function copyLink() {
  try {
    await navigator.clipboard.writeText(window.location.href)
    copied.value = true
    window.setTimeout(() => { copied.value = false }, 1800)
  } catch {
    copied.value = false
  }
}

function printPage() {
  window.print()
}
</script>

<template>
  <div class="article-toolbar">
    <div class="article-crumbs">
      <span class="crumb-brand">OPENCLAW FIELD GUIDE</span>
      <span class="crumb-separator">/</span>
      <a :href="withBase(section.href)">{{ section.label }}</a>
    </div>
    <div class="article-toolbar-actions">
      <span class="article-kind">閱讀教材</span>
      <button type="button" @click="copyLink">{{ copied ? '已複製' : '複製連結' }}</button>
      <button type="button" @click="printPage">列印</button>
    </div>
  </div>
</template>

<style scoped>
.article-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin: 0 0 22px;
  padding: 12px 15px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 11px;
  background: var(--vp-c-bg-alt);
}
.article-crumbs {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 9px;
  min-width: 0;
  color: var(--vp-c-text-2);
  font-size: 10px;
}
.crumb-brand {
  color: var(--vp-c-text-3);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: .12em;
}
.crumb-separator { color: var(--vp-c-text-3); }
.article-crumbs a {
  color: var(--vp-c-brand-1);
  font-weight: 700;
  text-decoration: none;
}
.article-toolbar-actions {
  display: flex;
  flex: none;
  align-items: center;
  gap: 7px;
}
.article-kind {
  margin-right: 5px;
  color: var(--vp-c-text-3);
  font-size: 10px;
}
.article-toolbar-actions button {
  padding: 6px 9px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font: inherit;
  font-size: 10px;
  transition: border-color .2s ease, color .2s ease;
}
.article-toolbar-actions button:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
@media (max-width: 640px) {
  .article-toolbar { align-items: flex-start; flex-direction: column; }
  .article-toolbar-actions { width: 100%; justify-content: flex-end; }
  .article-kind { margin-right: auto; }
}
@media print {
  .article-toolbar { display: none; }
}
</style>
