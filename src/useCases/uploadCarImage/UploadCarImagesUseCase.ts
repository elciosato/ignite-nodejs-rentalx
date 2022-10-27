import { inject, injectable } from "tsyringe";

import { CarImage } from "../../infra/typeORM/entities/CarImage";
import { ICarsImagesRepository } from "../../interfaces/ICarsImagesRepository";

interface IRequest {
  car_id: string;
  images: string[];
}
@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository
  ) {}

  async execute({ car_id, images }: IRequest): Promise<CarImage[]> {
    const carsImages: CarImage[] = [];
    images.forEach(async (image_name) => {
      const carImage = await this.carsImagesRepository.create({
        car_id,
        image_name,
      });
      carsImages.push(carImage);
    });
    return carsImages;
  }
}
export { UploadCarImagesUseCase };
