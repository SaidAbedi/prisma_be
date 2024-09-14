import { Router } from "express";
import { body, check, oneOf } from "express-validator";
import { handleInputErrors } from "../modules/middleware";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../handlers/post";

const postRouter = Router();

postRouter.get("/", getPosts);

postRouter.get("/:id", getPost);

postRouter.post(
  "/",
  body("title").isString().exists(),
  body("description").exists(),
  oneOf([
    check("status").equals("OPEN"),
    check("status").equals("CLOSED"),
    check("status").equals("PENDING"),
  ]),
  body("belongsToId").exists().isString(),
  handleInputErrors,
  createPost
);
postRouter.put(
  "/:id",
  body("title").isString(),
  body("title").optional(),
  body("description").optional(),
  handleInputErrors,
  updatePost
);
postRouter.delete("/:id", deletePost);

export default postRouter;
