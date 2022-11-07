import fs from "fs";
import handlebars from "handlebars";
import nodemailer from "nodemailer";

import { ISendMail } from "../../../interfaces/request/ISendMail";
import { IMailProvider } from "./IMailProvider";

export class EtherealMailProvider implements IMailProvider {
  private transporter: nodemailer.Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        this.transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });
      })
      .catch((error) => console.log(error));
  }
  async sendMail(data: ISendMail): Promise<void> {
    const templateContent = fs
      .readFileSync(data.templatePath)
      .toString("utf-8");

    const templateParse = handlebars.compile(templateContent);

    const templateHTML = templateParse(data.customVariables);

    const message = await this.transporter.sendMail({
      to: data.to,
      from: "RentalX <noreply@rentalx.com.br>",
      subject: data.subject,
      html: templateHTML,
    });
    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}
