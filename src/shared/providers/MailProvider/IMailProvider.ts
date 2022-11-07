import { ISendMail } from "../../../interfaces/request/ISendMail";

export interface IMailProvider {
  sendMail(data: ISendMail): Promise<void>;
}
