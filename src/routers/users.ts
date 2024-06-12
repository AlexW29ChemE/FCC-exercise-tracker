import express, { NextFunction } from "express";
import db from "../model.ts/db";
import { errorHandler } from "../middleware/error";
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    const users = await db.User.find();
    res.json(users);
  })
  .post(async (req, res) => {
    const { username } = req.body;
    if (!username)
      return res
        .status(400)
        .json({ error: "body with the username property is required" });
    const user = await db.User.create({ username });
    res.status(201).json(user);
  });

router
  .route("/:userId/exercises")
  .get(async (req, res) => {
    const userId = req.params.userId;
    if (!userId) return res.status(400);
    const exercises = await db.Excercise.find({ userId });
    return res.json(exercises);
  })
  .post(async (req, res) => {
    const userId = req.params.userId;
    const { description, duration, date } = req.body;
    if (!(userId || description | duration))
      return res
        .status(400)
        .json({
          error: "Bad Form data",
          message:
            "description and duration are required and the userId should be provided in the url",
        });
    const user = await db.User.findById(userId).select({
      __v: false,
      createdAt: false,
      updatedAt: false,
    });
    const exercise = await db.Excercise.create({
      username: user?.username,
      date: date || undefined,
      description,
      duration,
      userId,
    });
    const response = {
      ...user?.toObject(),
      description,
      duration: exercise.duration,
      date: exercise.date,
    };
    return res.status(201).json(response);
  });

router.get("/:userId/logs", async (req, res) => {
  const userId = req.params.userId;
  if (!userId) return res.status(400);
  const { from, to, limit } = req.query;
  const user = await db.User.findById(userId).select({
    __v: false,
    createdAt: false,
    updatedAt: false,
  });
  const exercisesQuery = db.Excercise.find({ userId })
    .select({ description: true, date: true, duration: true })
    .limit(Number(limit ?? 10000));
  // handle range filters
  if (from || to) exercisesQuery.where({ date: { $gte: from, $lte: to } });
  const exercises = await exercisesQuery.exec();
  const response = {
    ...user?.toObject(),
    count: exercises.length,
    log: exercises,
  };
  res.json(response);
});

// handle user route Errors
router.use(errorHandler);

export default router;
