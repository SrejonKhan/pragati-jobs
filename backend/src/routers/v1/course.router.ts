import express from "express";
import { hasRole } from "../../middlewares/auth.middleware";
import { Role } from "@prisma/client";

const courseRouter = express.Router();

// Public routes for all users
courseRouter.get("/", (req, res) => {
  res.status(200).json({ message: "Courses list endpoint" });
});

courseRouter.get("/:id", (req, res) => {
  res.status(200).json({ message: `Course details for ID: ${req.params.id}` });
});

courseRouter.get("/category/:category", (req, res) => {
  res.status(200).json({ message: `Courses in category: ${req.params.category}` });
});

courseRouter.get("/search", (req, res) => {
  res.status(200).json({ message: "Course search endpoint" });
});

// Authenticated user routes
courseRouter.use(hasRole(["LEARNER", "EDUCATOR", "ADMIN"]));

courseRouter.post("/enroll/:id", (req, res) => {
  res.status(200).json({ message: `Enrolled in course: ${req.params.id}` });
});

courseRouter.get("/my-courses", (req, res) => {
  res.status(200).json({ message: "My enrolled courses" });
});

courseRouter.put("/progress/:id", (req, res) => {
  res.status(200).json({ message: `Updated progress for course: ${req.params.id}` });
});

// Educator/Admin only routes
courseRouter.use(hasRole(["EDUCATOR", "ADMIN"]));

courseRouter.post("/", (req, res) => {
  res.status(201).json({ message: "Created a new course" });
});

courseRouter.put("/:id", (req, res) => {
  res.status(200).json({ message: `Updated course: ${req.params.id}` });
});

courseRouter.delete("/:id", (req, res) => {
  res.status(200).json({ message: `Deleted course: ${req.params.id}` });
});

courseRouter.post("/:id/modules", (req, res) => {
  res.status(201).json({ message: `Added module to course: ${req.params.id}` });
});

courseRouter.put("/:id/modules/:moduleId", (req, res) => {
  res.status(200).json({ message: `Updated module ${req.params.moduleId} in course: ${req.params.id}` });
});

courseRouter.delete("/:id/modules/:moduleId", (req, res) => {
  res.status(200).json({ message: `Deleted module ${req.params.moduleId} from course: ${req.params.id}` });
});

export default courseRouter;
