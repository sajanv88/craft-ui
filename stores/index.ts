type TokenProps = {
    access_token: string;
    expires_in: number;
    id_token: string;
    sub: string;
    user: UserInfo | undefined
}
type UserInfo = {
    email: string;
    name: string;
}
export const useTokenStore = defineStore("token", {
    state: (): TokenProps => ({
        access_token: "",
        expires_in: 0,
        id_token: "",
        sub: "",
        user: undefined,
    }),
    actions: {
        setTokens({ access_token, expires_in, id_token, sub, user } : TokenProps) {
            this.access_token = access_token;
            this.expires_in = expires_in;
            this.id_token = id_token;
            this.sub = sub;
            this.user = user;
        },
        clearTokens() {
            this.access_token = "";
            this.expires_in = 0;
            this.id_token = "";
            this.sub = "";
            this.user = undefined;
        }
    }
});


export const useLoadingStore = defineStore("loading", {
    state: () => ({
        loading: true,
    }),
    actions: {
        setLoading(loading: boolean) {
            this.loading = loading;
        }
    }
});