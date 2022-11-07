import { container } from "tsyringe";

import { EtherealMailProvider } from "./MailProvider/EtherealMailProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";

container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
);
// container.registerSingleton<IMailProvider>(
//   "EtherealMailProvider",
//   EtherealMailProvider
// );
