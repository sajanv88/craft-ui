<script setup lang="ts">

import {createApiClient, schemas} from "~/lib/api-client";
import type {TableColumn} from "#ui/components/Table.vue";


definePageMeta({
  middleware: ['authenticated'],
  layout: 'app-layout'
});

const client = createApiClient("https://localhost:7093")
const {data, status} = await useAsyncData('localizations', async () => {
  return await client.get("/api/locales");
});

;


const columns: TableColumn<typeof schemas.LocaleDto>[] = [
  {
    accessorKey: 'key',
    header: 'Key',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'value',
    header: 'Content',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'cultureCode',
    header: 'Culture Code',
    cell: (info) => info.getValue(),
  }
]


</script>

<template>
  <div>
    <UTable :loading="status === 'pending'"
            loading-color="primary"
            :columns="columns"
            loading-animation="carousel" :data="data?.items ?? []"
            class="flex-1"/>
  </div>
</template>

<style scoped>

</style>