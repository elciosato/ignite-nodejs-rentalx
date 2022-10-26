import { CarImage } from "../infra/typeORM/entities/CarImage";
import { IUploadCarImagesDTO } from "./dtos/IUploadCarImagesDTO";

export interface ICarsImagesRepository {
  create(data: IUploadCarImagesDTO): Promise<CarImage>;
}
