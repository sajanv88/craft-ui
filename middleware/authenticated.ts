import {useLoadingStore, useTokenStore} from "~/stores";

export default defineNuxtRouteMiddleware( async (to, from) => {
    if (import.meta.server) { return }
    const { setTokens, clearTokens } =  useTokenStore()
    const {  setLoading } = useLoadingStore();
    const response = await fetch("/api/auth/token");
    if(response.status === 401) {
        clearTokens();
        setLoading(false);
        return navigateTo("/");
    }
    const data = await response.json();
    setTokens({
        access_token: data.access_token,
        expires_in: data.expires_in,
        id_token: data.id_token,
        sub: data.sub,
        user: {
            name: data.user.name,
            email: data.user.email,
        }
    });
    setLoading(false);
    return;

});


