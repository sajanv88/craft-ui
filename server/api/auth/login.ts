import {useSession, sendRedirect} from "h3";
import useKeycloak from "~/composables/useKeycloak";

export default defineEventHandler(async (event) => {

    const now = Date.now();
    const future = now + (1000 * 60 * 60);

    const session = await useSession(event, {
        cookie: {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            expires: new Date(future),
        },
        ...event.context.sessionConfig,
    });

    const {init, calculatePKCECodeChallenge, getCodeVerifier,} = useKeycloak();

    const codeVerifier = getCodeVerifier();
    const codeChallenge = await calculatePKCECodeChallenge(codeVerifier);
    const {discoveryInfo, client, clientConfig} = await init();

    const params: Record<string, any> = {
        redirect_uri: clientConfig.redirectUri,
        scope: clientConfig.scope.join(" "),
        code_challenge: codeChallenge,
        code_challenge_method: clientConfig.codeChallengeMethod,
    };

    let state!: string;
    if (!discoveryInfo.serverMetadata().supportsPKCE()) {
        state = client.randomState();
        params.state = state;
    }

    const redirectTo = client.buildAuthorizationUrl(discoveryInfo, params);

    await session.update({
        code_verifier: codeVerifier,
        state
    });
    return sendRedirect(event, redirectTo.href);
});
