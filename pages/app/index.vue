<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
});

const $oidc = useOidc();
</script>

<template>
  <div v-if="!$oidc.isLoggedIn">
    <p>Loading...</p>
  </div>
  <div v-if="$oidc.isLoggedIn">
  <h1>You have logged in</h1>
  <p>
    {{$oidc.user}}
  </p>
  <Button @click="$oidc.logout('/')">
    Logout
  </Button>
  </div>
</template>

<style scoped>

</style>