require("dotenv/config")

module.exports = {
    PORT: Number(process.env.PORT ?? 3000),
    EMAIL_HOST: process.env.EMAIL_HOST ?? "",
    EMAIL_PORT: Number(process.env.EMAIL_PORT ?? 2525),
    EMAIL_AUTH_USER: process.env.EMAIL_AUTH_USER ?? "",
    EMAIL_AUTH_PASS: process.env.EMAIL_AUTH_PASS ?? "",
    EMAIL_SENDER: process.env.EMAIL_SENDER ?? "",
    ERROR_LOG: process.env.ERROR_LOG ?? "./error.log",
    APP_LOG: process.env.APP_LOG ?? "./app.log"
}