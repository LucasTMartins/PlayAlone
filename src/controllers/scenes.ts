import express, { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Scene } from "../entity/Scene";

const router = express.Router();
const repository = AppDataSource.getRepository(Scene);

router.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const scene = repository.create(req.body);
      const result = await repository.save(scene);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.get("/", async (_: Request, res: Response, next: NextFunction) => {
  try {
    const scenes = await repository.find();
    res.json(scenes);
  } catch (err) {
    next(err);
  }
});

router.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const scene = await repository.findOne({ where: { id: req.params.id } });
      if (!scene) {
        return res.status(404).json({ message: "Scene not found" });
      }
      res.json(scene);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const scene = await repository.findOne({ where: { id: req.params.id } });
      if (!scene) {
        return res.status(404).json({ message: "Scene not found" });
      }
      repository.merge(scene, req.body);
      const result = await repository.save(scene);
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
        return res.status(404).json({ message: "Scene not found" });
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

export default router;
