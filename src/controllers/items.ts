import express, { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Item } from "../entity/Item";

const router = express.Router();
const repository = AppDataSource.getRepository(Item);

router.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = repository.create(req.body);
      const result = await repository.save(item);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
);

router.get("/", async (_: Request, res: Response, next: NextFunction) => {
  try {
    const items = await repository.find();
    res.json(items);
  } catch (err) {
    next(err);
  }
});

router.get(
  "/:id", 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = await repository.findOne({ where: { id: req.params.id } });
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.json(item);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = await repository.findOne({ where: { id: req.params.id } });
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      repository.merge(item, req.body);
      const result = await repository.save(item);
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
        return res.status(404).json({ message: "Item not found" });
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

export default router;
