import { Router } from "express";

import { SpecificationsRepository } from "../repositories/SpecificationsRepository";
import { CreateSpecificationService } from "../services/CreateSpecificationService";

const specificationsRoutes = Router();

const specificationRepository = new SpecificationsRepository();

specificationsRoutes.post("/", (req, res) => {
  const { name, description } = req.body;
  const createSpecificationsService = new CreateSpecificationService(
    specificationRepository
  );

  createSpecificationsService.execute({ name, description });
  return res.status(201).send();
});

specificationsRoutes.get("/", (req, res) => {
  const specifications = specificationRepository.list();
  return res.json(specifications);
});

export { specificationsRoutes };
