"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const handlebars_1 = __importDefault(require("handlebars"));
const path_1 = __importDefault(require("path"));
require("dotenv/config");
const transporter = nodemailer_1.default.createTransport({
    host: process.env.MAILER_SEND_SERVER,
    port: Number(process.env.MAILER_SEND_PORT_1),
    secure: false,
    auth: {
        user: process.env.MAILER_SEND_USER_USERNAME,
        pass: process.env.MAILER_SEND_USER_PASSWORD,
    },
});
function renderTemplate(templateName, context) {
    const templatePath = path_1.default.join(__dirname, "../templates", `${templateName}.hbs`);
    console.log(templatePath, "template path");
    if (!fs_extra_1.default.existsSync(templatePath)) {
        throw new Error(`Template not found: ${templateName}`);
    }
    const templateSource = fs_extra_1.default.readFileSync(templatePath, "utf-8");
    const compiledTemplate = handlebars_1.default.compile(templateSource);
    return compiledTemplate(context);
}
async function sendEmail(to, subject, templateName, context) {
    try {
        const html = renderTemplate(templateName, context);
        await transporter.sendMail({
            from: `"HostelWalay.pk" <${process.env.EMAIL}>`,
            to,
            subject,
            html,
        });
        console.log(`Email sent to ${to}`);
    }
    catch (err) {
        console.error("Error sending email:", err);
    }
}
//# sourceMappingURL=nodemailer.js.map