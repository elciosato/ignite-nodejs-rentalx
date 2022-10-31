import { Request, Response } from "express";
import { container } from "tsyringe";

import { ReturnRentalUseCase } from "./ReturnRentalUseCase";

class ReturnRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const returnRentalUseCase = container.resolve(ReturnRentalUseCase);
    const rental = await returnRentalUseCase.execute(id);
    return res.status(201).json(rental);
  }
}
export { ReturnRentalController };
