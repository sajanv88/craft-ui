export default defineEventHandler((event) => {
   const path = getRequestURL(event);
   const allowedPaths = ['/api/auth/logout', '/api/auth/token', '/api/auth/login', '/api/auth/oidc'];
   if(allowedPaths.includes(path.pathname) && event.method !== 'GET') {
       return {
              status: 405,
              body: "Method Not Allowed"
       }
   }
   const config = useRuntimeConfig();
    event.context.sessionConfig = {
        name: "oidc_session",
        password: config.keycloak.sessionPassword
    }
});
