import express from "express";
import { hasRole } from "../../middlewares/auth.middleware";
import { Role } from "@prisma/client";

const postRouter = express.Router();

// Public routes
postRouter.get("/", (req, res) => {
  res.status(200).json({ message: "Posts list endpoint" });
});

postRouter.get("/:id", (req, res) => {
  res.status(200).json({ message: `Post details for ID: ${req.params.id}` });
});

postRouter.get("/category/:category", (req, res) => {
  res.status(200).json({ message: `Posts in category: ${req.params.category}` });
});

postRouter.get("/search", (req, res) => {
  res.status(200).json({ message: "Post search endpoint" });
});

postRouter.get("/trending", (req, res) => {
  res.status(200).json({ message: "Trending posts endpoint" });
});

postRouter.get("/:id/comments", (req, res) => {
  res.status(200).json({ message: `Comments for post: ${req.params.id}` });
});

// Authenticated user routes
postRouter.use(hasRole(["LEARNER", "EDUCATOR", "EMPLOYER", "ADMIN"]));

postRouter.post("/", (req, res) => {
  res.status(201).json({ message: "Created a new post" });
});

postRouter.put("/:id", (req, res) => {
  res.status(200).json({ message: `Updated post: ${req.params.id}` });
});

postRouter.delete("/:id", (req, res) => {
  res.status(200).json({ message: `Deleted post: ${req.params.id}` });
});

postRouter.post("/:id/comments", (req, res) => {
  res.status(201).json({ message: `Added comment to post: ${req.params.id}` });
});

postRouter.put("/comments/:commentId", (req, res) => {
  res.status(200).json({ message: `Updated comment: ${req.params.commentId}` });
});

postRouter.delete("/comments/:commentId", (req, res) => {
  res.status(200).json({ message: `Deleted comment: ${req.params.commentId}` });
});

postRouter.post("/:id/like", (req, res) => {
  res.status(200).json({ message: `Liked post: ${req.params.id}` });
});

postRouter.post("/:id/unlike", (req, res) => {
  res.status(200).json({ message: `Unliked post: ${req.params.id}` });
});

// Admin only routes
postRouter.use(hasRole(["ADMIN"]));

postRouter.put("/:id/feature", (req, res) => {
  res.status(200).json({ message: `Featured post: ${req.params.id}` });
});

postRouter.put("/:id/unfeature", (req, res) => {
  res.status(200).json({ message: `Unfeatured post: ${req.params.id}` });
});

export default postRouter;
