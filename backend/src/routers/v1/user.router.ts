import express from "express";
import { hasRole } from "../../middlewares/auth.middleware";
import { Role } from "@prisma/client";

const userRouter = express.Router();

// Authenticated user routes
userRouter.use(hasRole(["LEARNER", "EDUCATOR", "EMPLOYER", "ADMIN"]));

userRouter.get("/profile", (req, res) => {
  res.status(200).json({ message: "My profile endpoint" });
});

userRouter.put("/profile", (req, res) => {
  res.status(200).json({ message: "Updated my profile" });
});

userRouter.get("/dashboard", (req, res) => {
  res.status(200).json({ message: "My dashboard endpoint" });
});

// Education related routes
userRouter.get("/courses", (req, res) => {
  res.status(200).json({ message: "My courses endpoint" });
});

userRouter.get("/course-recommendations", (req, res) => {
  res.status(200).json({ message: "Course recommendations endpoint" });
});

userRouter.get("/learning-progress", (req, res) => {
  res.status(200).json({ message: "Learning progress endpoint" });
});

// Employment related routes
userRouter.get("/job-applications", (req, res) => {
  res.status(200).json({ message: "My job applications endpoint" });
});

userRouter.get("/job-recommendations", (req, res) => {
  res.status(200).json({ message: "Job recommendations endpoint" });
});

// Project routes
userRouter.get("/projects", (req, res) => {
  res.status(200).json({ message: "My projects endpoint" });
});

userRouter.post("/projects", (req, res) => {
  res.status(201).json({ message: "Added a new project" });
});

userRouter.put("/projects/:id", (req, res) => {
  res.status(200).json({ message: `Updated project: ${req.params.id}` });
});

userRouter.delete("/projects/:id", (req, res) => {
  res.status(200).json({ message: `Deleted project: ${req.params.id}` });
});

// Admin only routes
userRouter.use(hasRole(["ADMIN"]));

userRouter.get("/", (req, res) => {
  res.status(200).json({ message: "All users endpoint" });
});

userRouter.get("/:id", (req, res) => {
  res.status(200).json({ message: `User details for ID: ${req.params.id}` });
});

userRouter.put("/:id", (req, res) => {
  res.status(200).json({ message: `Updated user: ${req.params.id}` });
});

userRouter.delete("/:id", (req, res) => {
  res.status(200).json({ message: `Deleted user: ${req.params.id}` });
});

export default userRouter;
