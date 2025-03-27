<script setup lang="ts">
import {useLoadingStore} from "~/stores";

const {loading} = useLoadingStore()
const {user} = useTokenStore();

import {ref} from 'vue';

const isSidebarOpen = ref(false);
const menuItems = [
  {name: 'Dashboard', link: '/app'},
  {name: 'Localizations', link: '/app/localizations'},

];
</script>

<template>
  <UApp>
    <section class="grid place-content-center h-svh" v-if="loading">
      <Loading/>
    </section>
    <section v-if="!loading">
      <section class="md:h-dvh md:py-1 md:px-2 flex">
        <div
            v-if="isSidebarOpen"
            @click="isSidebarOpen = false"
            class="fixed inset-0 bg-black md:hidden">
        </div>
        <UButton icon="i-lucide-menu" size="md" class="md:hidden m-2 w-10 h-10 flex items-center justify-center"
                 @click="isSidebarOpen = !isSidebarOpen"/>
        <aside
            :class="['fixed inset-y-0 left-0 transform bg-gray-800 text-white p-4 space-y-4 w-64 transition-transform', isSidebarOpen ? 'translate-x-0' : '-translate-x-full', 'md:relative md:translate-x-0']">
          <h1 class="text-xl font-semibold">{{ user?.name }}</h1>
          <ul>
            <li v-for="item in menuItems" :key="item.name" class="py-2 px-3 rounded-lg hover:bg-gray-700">
              <NuxtLink :to="item.link" class="block" @click="isSidebarOpen = false">{{ item.name }}</NuxtLink>
            </li>
          </ul>
        </aside>
        <section class="flex-1 pt-5 pl-3">
          <slot/>
        </section>
      </section>
    </section>
  </UApp>
</template>

<style scoped>

</style>