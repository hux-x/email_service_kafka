import nodemailer from "nodemailer";
import fs from "fs-extra";
import handlebars from "handlebars";
import path from "path";
import 'dotenv/config';

const transporter = nodemailer.createTransport({
  host: process.env.MAILER_SEND_SERVER,
  port: Number(process.env.MAILER_SEND_PORT_1),
  secure: false,
  auth: {
    user: process.env.MAILER_SEND_USER_USERNAME,
    pass: process.env.MAILER_SEND_USER_PASSWORD,
  },
});

function renderTemplate(templateName: string, context: any) {
  const templatePath = path.join(__dirname, "../templates", `${templateName}.hbs`);
  console.log(templatePath, "template path")

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found: ${templateName}`);
  }

  const templateSource = fs.readFileSync(templatePath, "utf-8");
  const compiledTemplate = handlebars.compile(templateSource);
  return compiledTemplate(context);
}

export async function sendEmail(
  to: string,
  subject: string,
  templateName: string,
  context: any
) {
  try {
    const html = renderTemplate(templateName, context);

    await transporter.sendMail({
      from: `"HostelWalay.pk" <${process.env.EMAIL}>`,
      to,
      subject,
      html,
    });

    console.log(`Email sent to ${to}`);
  } catch (err) {
    console.error("Error sending email:", err);
  }
}
