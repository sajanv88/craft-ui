import * as client from 'openid-client'

export type KeyCloakConfig = {
    authority: string,
    audience: string,
    clientId: string,
    scope: string[],
    redirectUri?: string | undefined,
    postLogoutRedirectUri?: string | undefined,
    responseType?: 'code' | 'id_token',
    grantType?: 'authorization_code' | 'client_credentials',
    clientSecret?: string,
    codeChallengeMethod?: 'S256' | 'plain',
    postLoginRedirectUri?: string | undefined,
}

export type TokenSet = {
    access_token: string
    id_token: string
    refresh_token: string
    expires_in: number;
}
export const clientConfig: KeyCloakConfig = {
    authority: "https://auth.dev.sajankumarv.tech/realms/dev",
    audience: "account",
    clientId: "craft-api",
    scope: ["openid", "profile", "email", "offline_access"],
    postLoginRedirectUri: "/app",
    redirectUri: "http://localhost:3000/api/auth/oidc",
    codeChallengeMethod: "S256",
    responseType: "code",
}
export default function useKeycloak() {
    // const token = useState<TokenSet | null>("tokenSet", () => null);

    async function init() {
        if(!clientConfig.clientId) {
            throw new Error('ClientId is required')
        }
        if(!clientConfig.authority) {
            throw new Error('Authority url is required')
        }
        const discoveryInfo = await client.discovery(new URL(clientConfig.authority), clientConfig.clientId);
        return {
            discoveryInfo,
            client,
            clientConfig,
        };
    }

    function getCodeVerifier() {
        return client.randomPKCECodeVerifier();
    }

   async function calculatePKCECodeChallenge(codeVerifier: string) {
      return  await client.calculatePKCECodeChallenge(codeVerifier);
    }


    return {
        init,
        getCodeVerifier,
        calculatePKCECodeChallenge,
    }
}
