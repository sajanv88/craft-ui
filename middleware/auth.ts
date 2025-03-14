export default defineNuxtRouteMiddleware((to, from) => {
    if (import.meta.server) { return }
    const $oidc = useOidc();
    if(!$oidc.isLoggedIn) {
        $oidc.login(to.fullPath)
    }
});


