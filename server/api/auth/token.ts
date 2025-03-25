import useKeycloak from "~/composables/useKeycloak";

export default defineEventHandler(async (event) => {

    const session = await useSession(event, event.context.sessionConfig);
    if (!session.data.id_token && !session.data.access_token) {
        return {
            status: 401,
            body: "Unauthorized"
        }
    }
    const {init} = useKeycloak();
    const {client, discoveryInfo} = await init();
    try {
        const userInfo = await client.fetchUserInfo(discoveryInfo, session.data.access_token, session.data.sub);
        return Response.json({
            access_token: session.data.access_token,
            expires_in: session.data.expires_in,
            id_token: session.data.id_token,
            sub: session.data.sub,
            user: userInfo
        }, {status: 200});
    } catch (error : any) {
        console.error("error", error.message);
        return Response.json({
            status: 401,
            body: "Unauthorized"
        }, {status: 401})
    }

});
