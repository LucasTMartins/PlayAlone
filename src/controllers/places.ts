import express, { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Place } from "../entity/Place";

const router = express.Router();
const repository = AppDataSource.getRepository(Place);

router.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const place = repository.create(req.body);
      const result = await repository.save(place);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.get("/", async (_: Request, res: Response, next: NextFunction) => {
  try {
    const places = await repository.find();
    res.json(places);
  } catch (err) {
    next(err);
  }
});

router.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const place = await repository.findOne({ where: { id: req.params.id } });
      if (!place) {
        return res.status(404).json({ message: "Place not found" });
      }
      res.json(place);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const place = await repository.findOne({ where: { id: req.params.id } });
      if (!place) {
        return res.status(404).json({ message: "Place not found" });
      }
      repository.merge(place, req.body);
      const result = await repository.save(place);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await repository.delete(req.params.id);
      if (!result.affected) {
        return res.status(404).json({ message: "Place not found" });
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

export default router;
