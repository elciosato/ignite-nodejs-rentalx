import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

interface IFiles {
  filename: string;
}
class UploadCarImagesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: car_id } = req.params;
    const filenames = req.files as IFiles[];
    const uploadCarImageUseCase = container.resolve(UploadCarImagesUseCase);

    const images = filenames.map((f) => f.filename);
    const carsImages = uploadCarImageUseCase.execute({ car_id, images });
    return res.json(carsImages);
  }
}
export { UploadCarImagesController };
