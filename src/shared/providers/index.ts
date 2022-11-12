import { container } from "tsyringe";

import { EtherealMailProvider } from "./MailProvider/EtherealMailProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { SESMailProvider } from "./MailProvider/SESMailProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";
import { LocalStorageProvider } from "./StorageProvider/LocalStorageProvider";
import { S3StorageProvider } from "./StorageProvider/S3StorageProvider";

const mailProvider = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
  "MailProvider",
  mailProvider[process.env.MAIL_PROVIDER]
);

const storageProvider = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  storageProvider[process.env.STORAGE_PROVIDER]
);
