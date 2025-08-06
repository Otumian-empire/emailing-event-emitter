const EventEmitter = require("node:events");
const fs = require("node:fs/promises");
const { sendEmail } = require("./email");
const { ERROR_LOG, APP_LOG } = require("./config");

class EmailEmitter extends EventEmitter {}

const emailEmitter = new EmailEmitter();

function parseLog(data) {
  const log = {
    timeStamp: new Date().toISOString(),
    ...data,
  };

  return JSON.stringify(log) + "\n";
}

emailEmitter.on(
  "send-email",
  async function ({ subject = "", address = "", name = "", text = "" }) {
    try {
      const response = await sendEmail({
        address,
        name,
        subject,
        text,
      });

      emailEmitter.emit("email-log", {
        address,
        name,
        subject,
        text,
        isSent: response ?? false,
      });
    } catch (error) {
      emailEmitter.emit("error", error);
    }
  }
);

emailEmitter.on(
  "email-log",
  async function ({ address, name, subject, text, isSent }) {
    try {
      await fs.appendFile(
        APP_LOG,
        parseLog({ address, name, subject, text, isSent })
      );
    } catch (error) {
      emailEmitter.emit("error", error);
    }
  }
);

emailEmitter.on("error", async function (error) {
  try {
    await fs.appendFile(ERROR_LOG, parseLog(error));
  } catch (catchError) {
    await fs.appendFile(ERROR_LOG, parseLog(error));
    await fs.appendFile(ERROR_LOG, parseLog(catchError));
  }
});

module.exports = { emailEmitter };
