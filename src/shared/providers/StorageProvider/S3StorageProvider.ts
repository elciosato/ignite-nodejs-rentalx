import { S3 } from "aws-sdk";
import fs from "fs";
import mime from "mime";
import { resolve } from "path";

import upload from "../../config/upload";
import { IFiles, IStorageProvider } from "./IStorageProvider";

export class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,
    });
  }

  async save({ fileName, folderName }: IFiles): Promise<void> {
    const source = resolve(upload.tmpFolder, fileName);

    const fileStream = fs.createReadStream(source);

    fileStream.on("error", (err) => {
      console.log("File Error:", err);
    });

    const ContentType = mime.getType(source);

    await this.client
      .upload({
        Bucket: `${process.env.AWS_BUCKET}/${folderName}`,
        Key: fileName,
        ACL: "public-read",
        Body: fileStream,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(source);
  }

  async delete({ fileName, folderName }: IFiles): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${process.env.AWS_BUCKET}/${folderName}`,
        Key: fileName,
      })
      .promise();
  }
}
