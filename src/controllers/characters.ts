import express, { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { EntityCharacter } from "../entity/EntityCharacter";

const router = express.Router();
const repository = AppDataSource.getRepository(EntityCharacter);

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const character = repository.create(req.body);
    const result = await repository.save(character);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (_: Request, res: Response, next: NextFunction) => {
  try {
    const characters = await repository.find();
    res.json(characters);
  } catch (err) {
    next(err);
  }
});

router.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const character = await repository.findOne({
        where: { id: req.params.id },
      });
      if (!character) {
        return res.status(404).json({ message: "Character not found" });
      }
      res.json(character);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const character = await repository.findOne({
        where: { id: req.params.id },
      });
      if (!character) {
        return res.status(404).json({ message: "Character not found" });
      }
      repository.merge(character, req.body);
      const result = await repository.save(character);
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
        return res.status(404).json({ message: "Character not found" });
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
);

export default router;
