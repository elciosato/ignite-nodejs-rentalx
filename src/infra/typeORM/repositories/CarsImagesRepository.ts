import { Repository } from "typeorm";

import { IUploadCarImagesDTO } from "../../../interfaces/dtos/IUploadCarImagesDTO";
import { ICarsImagesRepository } from "../../../interfaces/ICarsImagesRepository";
import AppDataSource from "../database/DataSource";
import { CarImage } from "../entities/CarImage";

export class CarsImagesRepository implements ICarsImagesRepository {
  private carsImagesRepository: Repository<CarImage>;

  constructor() {
    this.carsImagesRepository = AppDataSource.getRepository(CarImage);
  }

  async create(data: IUploadCarImagesDTO): Promise<CarImage> {
    const carImage = new CarImage();
    Object.assign(carImage, data);
    return this.carsImagesRepository.save(carImage);
  }
}
