import { CarImage } from "../infra/typeORM/entities/CarImage";
import { IUploadCarImageDTO } from "./dtos/IUploadCarImageDTO";

export interface ICarsImagesRepository {
  create(data: IUploadCarImageDTO): Promise<CarImage>;
}
