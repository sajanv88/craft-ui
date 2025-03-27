<script setup lang="ts">
import {useQuery} from "@tanstack/vue-query";
import {client} from "~/lib/api-service";

definePageMeta({
  middleware: ['authenticated'],
  layout: 'app-layout'
});

const delay = async (d:number) => {
  setTimeout(async () => {
   await Promise.resolve();
  },d)
}
const fetchLocalizations = async () => {
  return await client.GET("/api/locales").then(r => r.data);
}
const { data, isPending } = useQuery({queryKey: ["localizations"], queryFn: fetchLocalizations});


</script>

<template>
  <h1>I am localizations fetching: {{isPending}}</h1>
  <div>
    <UTable :loading="isPending" loading-color="primary" loading-animation="carousel" :data="data?.items"  class="flex-1" />
  </div>
</template>

<style scoped>

</style>