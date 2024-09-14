import { Router } from "express";
import { getUsers } from "../handlers/user";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", (req, res) => {});
userRouter.post("/", (req, res) => {});
userRouter.put("/:id", (req, res) => {});
userRouter.delete("/:id", (req, res) => {});

export default userRouter;
