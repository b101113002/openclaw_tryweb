<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import HomeExperience from './components/HomeExperience.vue'
import ArticleToolbar from './components/ArticleToolbar.vue'
import ArticleProgress from './components/ArticleProgress.vue'
</script>

<template>
  <DefaultTheme.Layout>
    <template #home-hero-after>
      <HomeExperience />
    </template>
    <template #doc-before>
      <ArticleToolbar />
    </template>
    <template #doc-footer-before>
      <ArticleProgress />
    </template>
  </DefaultTheme.Layout>
</template>
