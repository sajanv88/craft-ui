export default defineEventHandler((event) => {
    console.log('New request: ' + getRequestURL(event) + ' and method ' + event.method)
})