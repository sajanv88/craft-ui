<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
});
const infoRef = ref(null);
async function fetchTokenAndUserInfo() {
  infoRef.value = await (await fetch('/api/auth/token')).json();
}

</script>

<template>
  <h1>App page</h1>
  <pre>{{ infoRef }}</pre>
  <Button @click="fetchTokenAndUserInfo">Fetch User</Button>
</template>

<style scoped>

</style>