import { SES } from "aws-sdk";
import fs from "fs";
import handlebars from "handlebars";
import nodemailer from "nodemailer";
import { injectable } from "tsyringe";

import { ISendMail } from "../../../interfaces/request/ISendMail";
import { IMailProvider } from "./IMailProvider";

@injectable()
export class SESMailProvider implements IMailProvider {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      SES: new SES({
        apiVersion: "2010-12-01",
        region: process.env.AWS_BUCKET_REGION,
      }),
    });
  }
  async sendMail(data: ISendMail): Promise<void> {
    const templateContent = fs
      .readFileSync(data.templatePath)
      .toString("utf-8");

    const templateParse = handlebars.compile(templateContent);

    const templateHTML = templateParse(data.customVariables);

    await this.transporter.sendMail({
      to: data.to,
      from: "RentalX <rentalx.api@gmail.com>",
      subject: data.subject,
      html: templateHTML,
    });
  }
}
