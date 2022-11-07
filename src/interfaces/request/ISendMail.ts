export interface ISendMail {
  to: string;
  subject: string;
  templatePath: string;
  customVariables: any;
}
