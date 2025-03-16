import { useSession,  getRequestHeaders, sendRedirect, getQuery  } from 'h3';
import useKeycloak from "~/composables/useKeycloak";

export default defineEventHandler(async (event) => {
    if (event.method !== "GET") {
        return {
            status: 405,
            body: "Method Not Allowed"
        }
    }
    const sessionConfig = {
        name: "oidc_session",
        password: "d41d8cd98f00b204e9800998ecf8427e" // This is a secret key, you should use a secret key
    }

    const { init } = useKeycloak()
    const session = await useSession(event, sessionConfig);
    const {client, clientConfig, discoveryInfo} = await init();

    const headerList = getRequestHeaders(event);
    const host = headerList['x-forwarded-host'] || headerList['host'] || 'localhost'
    const protocol = headerList['x-forwarded-proto'] || 'https'
    const search =  getQuery(event);
    console.log("Search ==== ", search)
    const currentUrl = new URL(
        `${protocol}://${host}${event.path}`
    )

    console.log("Current URL", currentUrl.toString());


    const tokenSet = await client.authorizationCodeGrant(discoveryInfo, currentUrl, {
        pkceCodeVerifier: session.data.code_verifier,
        expectedState: session.data.state,
    });

    await session.update({
        access_token: tokenSet.access_token,
        expires_in: tokenSet.expires_in,
    });

    return sendRedirect(event, clientConfig.postLoginRedirectUri ?? "/app");

});
