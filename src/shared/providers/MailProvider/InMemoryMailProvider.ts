import { ISendMail } from "../../../interfaces/request/ISendMail";
import { IMailProvider } from "./IMailProvider";

export class InMemoryMailProvider implements IMailProvider {
  private message: any[];
  constructor() {
    this.message = [];
  }
  async sendMail(data: ISendMail): Promise<void> {
    this.message.push(data);
  }
}
