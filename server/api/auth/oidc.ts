import { useSession,  getRequestHeaders, sendRedirect  } from 'h3';
import useKeycloak from "~/composables/useKeycloak";

export default defineEventHandler(async (event) => {
    const { init } = useKeycloak()
    const session = await useSession(event, event.context.sessionConfig);
    const {client, clientConfig, discoveryInfo} = await init();

    const headerList = getRequestHeaders(event);
    const host = headerList['x-forwarded-host'] || headerList['host'] || 'localhost'
    const protocol = headerList['x-forwarded-proto'] || 'https'

    const currentUrl = new URL(
        `${protocol}://${host}${event.path}`
    )

    console.log("Current URL", currentUrl.toString());


    const tokenSet = await client.authorizationCodeGrant(discoveryInfo, currentUrl, {
        pkceCodeVerifier: session.data.code_verifier,
        expectedState: session.data.state,
    });

    const claims = tokenSet.claims();

    await session.update({
        access_token: tokenSet.access_token,
        expires_in: tokenSet.expires_in,
        id_token: tokenSet.id_token,
        sub: claims?.sub
    });

    return sendRedirect(event, clientConfig.postLoginRedirectUri ?? "/app");

});
