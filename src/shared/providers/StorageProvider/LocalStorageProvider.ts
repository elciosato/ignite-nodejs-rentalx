import fs from "fs";
import { resolve } from "path";

import upload from "../../config/upload";
import { IFiles, IStorageProvider } from "./IStorageProvider";

export class LocalStorageProvider implements IStorageProvider {
  async save(data: IFiles): Promise<void> {
    const source = resolve(upload.tmpFolder, data.fileName);
    const destFolder = resolve(upload.tmpFolder, "..", data.folderName);
    const destination = resolve(destFolder, data.fileName);
    await fs.promises.rename(source, destination);
  }

  async delete(data: IFiles): Promise<void> {
    const file = resolve(
      upload.tmpFolder,
      "..",
      data.folderName,
      data.fileName
    );
    try {
      await fs.promises.stat(file);
      await fs.promises.unlink(file);
    } catch (error) {
      console.log(error);
    }
  }
}
