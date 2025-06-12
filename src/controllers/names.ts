import express, { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { EntityName } from "../entity/EntityName";

const router = express.Router();
const repository = AppDataSource.getRepository(EntityName);

router.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const name = repository.create(req.body);
      const result = await repository.save(name);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.get("/", async (_: Request, res: Response, next: NextFunction) => {
  try {
    const names = await repository.find();
    res.json(names);
  } catch (err) {
    next(err);
  }
});

router.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const name = await repository.findOne({ where: { id: req.params.id } });
      if (!name) {
        return res.status(404).json({ message: "Name not found" });
      }
      res.json(name);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const name = await repository.findOne({ where: { id: req.params.id } });
      if (!name) {
        return res.status(404).json({ message: "Name not found" });
      }
      repository.merge(name, req.body);
      const result = await repository.save(name);
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
        return res.status(404).json({ message: "Name not found" });
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

export default router;
