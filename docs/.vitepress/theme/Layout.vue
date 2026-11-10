<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import HomeExperience from './components/HomeExperience.vue'
</script>

<template>
  <DefaultTheme.Layout>
    <template #home-hero-after>
      <HomeExperience />
    </template>
  </DefaultTheme.Layout>
</template>
