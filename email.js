const nodemailer = require("nodemailer");
const {
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_AUTH_USER,
    EMAIL_AUTH_PASS,
    EMAIL_SENDER,
} = require("./config");

/* 
{
  accepted: [ 'RECIPIENT EMAIL' ],
  rejected: [],
  ehlo: [
    'SIZE 5242880',
    'PIPELINING',
    'ENHANCEDSTATUSCODES',
    '8BITMIME',
    'DSN',
    'AUTH PLAIN LOGIN CRAM-MD5'
  ],
  envelopeTime: 676,
  messageTime: 460,
  messageSize: 407,
  response: '250 2.0.0 Ok: queued',
  envelope: { from: 'SENDER EMAIL', to: [ 'RECIPIENT EMAIL' ] },
  messageId: '<aec2f853-dea3-4b3e-2eaf-2be0a79aff96@gmail.com>'
}
*/
async function sendEmail({ subject = "", address = "", name = "", text = "" }) {
    const transport = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        auth: {
            user: EMAIL_AUTH_USER,
            pass: EMAIL_AUTH_PASS,
        },
    });

    transport.on("error", (error) => {
        transport.emit("error", error);
    });



    const response = await transport.sendMail({
        from: EMAIL_SENDER,
        subject,
        to: {
            address,
            name,
        },
        text,
    });


    return (
        response?.messageId && response?.response?.toLowerCase().includes("ok")
    );
}

module.exports = { sendEmail };
