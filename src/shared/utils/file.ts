import fs from "fs";
import { resolve } from "path";

export const deleteUploadsFile = async (fileName: string) => {
  const uploadFile = resolve(__dirname, "../../uploads", fileName);
  try {
    await fs.promises.stat(uploadFile);
  } catch (e) {
    return;
  }
  await fs.promises.unlink(uploadFile);
};
