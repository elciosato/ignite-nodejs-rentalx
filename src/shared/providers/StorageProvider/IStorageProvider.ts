export interface IFiles {
  folderName: string;
  fileName: string;
}
export interface IStorageProvider {
  save(data: IFiles): Promise<void>;
  delete(data: IFiles): Promise<void>;
}
