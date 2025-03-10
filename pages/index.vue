<script setup lang="ts">
import { cn } from '@/lib/utils'

</script>

<template>
  <section :class="cn('h-svh')">
  <section :class="cn('grid grid-rows-[1fr_auto_1fr] gap-2')">
    <header :class="cn('bg-gray-800 min-h-11')">

    </header>
    <section>
      <h1>I am a content</h1>
    </section>
    <footer class="border-gray-800">
      <h2>Footer</h2>
    </footer>
  </section>
  </section>
</template>

<style scoped>

</style>