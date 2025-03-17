import useKeycloak from "~/composables/useKeycloak";

export default defineNuxtRouteMiddleware( (to, from) => {
    if (import.meta.server) { return }
    const { isAuthenticated } = useKeycloak()
    console.log(isAuthenticated.value, "isAuthenticated")

});


