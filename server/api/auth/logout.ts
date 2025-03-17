import useKeycloak from "~/composables/useKeycloak";

export default defineEventHandler(async (event) => {


    const session = await useSession(event, event.context.sessionConfig);
    if(!session.data.id_token && !session.data.access_token) {
        return sendRedirect(event, '/');
    }
    const { init } = useKeycloak();
    const { client, discoveryInfo } = await init();
    const idToken = session.data.id_token;
    const endSessionUrl = client.buildEndSessionUrl(discoveryInfo, {
        id_token_hint: idToken,
        post_logout_redirect_uri: "http://localhost:3000"
    });
    await session.clear();
    console.log("session endSessionUrl:", endSessionUrl);
    return sendRedirect(event, endSessionUrl.href);

});