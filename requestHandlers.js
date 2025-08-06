const { emailEmitter } = require("./event");

function validateEmailParams(req, res, next) {
    const { name, address, subject, text } = req.body;

    if (!name || name.length < 5) {
        res.status(200).json({
            success: false,
            message: "Name is required",
        });

        return;
    }

    if (!address || address.length < 5 || !address.includes("@")) {
        res.status(200).json({
            success: false,
            message: "Enter a valid email",
        });

        return;
    }

    if (!subject || subject.length < 5) {
        res.status(200).json({
            success: false,
            message: "Subject is required",
        });

        return;
    }

    if (!text || text.length < 5) {
        res.status(200).json({
            success: false,
            message: "Email body is required",
        });

        return;
    }

    next();
}

function sendEmailController(req, res, next) {
    try {
        const { name, address, subject, text } = req.body;

        emailEmitter.emit("send-email", {
            address,
            name,
            subject,
            text,
        });

        res.status(200).json({
            success: true,
            message: "Email was sent successfully",
        });
    } catch (error) {
        next(error);
    }
}

function pingPongController(_req, res) {
    res.send("Ping-pong");
}

function notFoundHandler(req, res, next) {
    res.status(404).json({
        success: false,
        message: `Requested route, ${req.path}, not found`,
    });

    emailEmitter.emit("error", new Error`${req.path} not found`);
}

function errorHandler(error, req, res, next) {
    res.status(200).json({
        success: false,
        message: error?.message ?? "An error occurred",
    });

    emailEmitter.emit("error", new Error(`${error?.message ?? "An error occurred"} on ${req.path}`));
}

module.exports = {
    validateEmailParams,
    sendEmailController,
    pingPongController,
    notFoundHandler,
    errorHandler
};
