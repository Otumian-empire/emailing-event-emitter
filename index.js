const express = require("express");
const { PORT } = require("./config");
const {
    validateEmailParams,
    sendEmailController,
    pingPongController,
    notFoundHandler,
    errorHandler,
} = require("./requestHandlers");
const { emailEmitter } = require("./event");

const app = express();


app.use(express.json());

app.get("/ping-pong", pingPongController);

app.post("/send-email", validateEmailParams, sendEmailController);

app.use(notFoundHandler);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
});
