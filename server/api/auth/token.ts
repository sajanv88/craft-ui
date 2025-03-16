export default defineEventHandler(async (event) => {
    if(event.method !== "GET") {
        return {
            status: 405,
            body: "Method Not Allowed"
        }
    }
    const sessionConfig = {

        name: "oidc_session",
        password: "d41d8cd98f00b204e9800998ecf8427e" // This is a secret key, you should use a secret key
    }
    const session = await useSession(event, sessionConfig);
    return session.data;
})