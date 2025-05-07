import express from "express";
import { hasRole } from "../../middlewares/auth.middleware";
import { Role } from "@prisma/client";

const skillRouter = express.Router();

// Public routes for all users
skillRouter.get("/", (req, res) => {
  res.status(200).json({ message: "Skills list endpoint" });
});

skillRouter.get("/:id", (req, res) => {
  res.status(200).json({ message: `Skill details for ID: ${req.params.id}` });
});

skillRouter.get("/category/:category", (req, res) => {
  res.status(200).json({ message: `Skills in category: ${req.params.category}` });
});

skillRouter.get("/trending", (req, res) => {
  res.status(200).json({ message: "Trending skills endpoint" });
});

skillRouter.get("/courses/:skillId", (req, res) => {
  res.status(200).json({ message: `Courses for skill: ${req.params.skillId}` });
});

skillRouter.get("/jobs/:skillId", (req, res) => {
  res.status(200).json({ message: `Jobs requiring skill: ${req.params.skillId}` });
});

// Authenticated user routes
skillRouter.use(hasRole(["LEARNER", "EDUCATOR", "EMPLOYER", "ADMIN"]));

skillRouter.get("/my-skills", (req, res) => {
  res.status(200).json({ message: "My skills endpoint" });
});

skillRouter.post("/my-skills", (req, res) => {
  res.status(201).json({ message: "Added skill to my profile" });
});

skillRouter.put("/my-skills/:skillId", (req, res) => {
  res.status(200).json({ message: `Updated my skill: ${req.params.skillId}` });
});

skillRouter.delete("/my-skills/:skillId", (req, res) => {
  res.status(200).json({ message: `Removed skill from my profile: ${req.params.skillId}` });
});

// Admin only routes
skillRouter.use(hasRole(["ADMIN"]));

skillRouter.post("/", (req, res) => {
  res.status(201).json({ message: "Created a new skill" });
});

skillRouter.put("/:id", (req, res) => {
  res.status(200).json({ message: `Updated skill: ${req.params.id}` });
});

skillRouter.delete("/:id", (req, res) => {
  res.status(200).json({ message: `Deleted skill: ${req.params.id}` });
});

export default skillRouter;
