import express from "express";
import { hasRole } from "../../middlewares/auth.middleware";
import { Role } from "@prisma/client";

const mentorshipRouter = express.Router();

// Public routes
mentorshipRouter.get("/available-mentors", (req, res) => {
  res.status(200).json({ message: "Available mentors endpoint" });
});

mentorshipRouter.get("/mentors/:id", (req, res) => {
  res.status(200).json({ message: `Mentor details for ID: ${req.params.id}` });
});

mentorshipRouter.get("/mentors/skills/:skillId", (req, res) => {
  res.status(200).json({ message: `Mentors with skill: ${req.params.skillId}` });
});

// Authenticated user routes
mentorshipRouter.use(hasRole(["LEARNER", "EDUCATOR", "EMPLOYER", "ADMIN"]));

// Mentee routes
mentorshipRouter.get("/my-mentors", (req, res) => {
  res.status(200).json({ message: "My mentors endpoint" });
});

mentorshipRouter.post("/request/:mentorId", (req, res) => {
  res.status(201).json({ message: `Requested mentorship from: ${req.params.mentorId}` });
});

mentorshipRouter.put("/mentorship/:id", (req, res) => {
  res.status(200).json({ message: `Updated mentorship: ${req.params.id}` });
});

mentorshipRouter.delete("/mentorship/:id", (req, res) => {
  res.status(200).json({ message: `Cancelled mentorship: ${req.params.id}` });
});

// Mentor routes
mentorshipRouter.get("/my-mentees", (req, res) => {
  res.status(200).json({ message: "My mentees endpoint" });
});

mentorshipRouter.put("/mentorship-requests/:id", (req, res) => {
  res.status(200).json({ message: `Responded to mentorship request: ${req.params.id}` });
});

mentorshipRouter.post("/become-mentor", (req, res) => {
  res.status(201).json({ message: "Set profile as available for mentoring" });
});

mentorshipRouter.delete("/mentor-status", (req, res) => {
  res.status(200).json({ message: "Removed mentor status" });
});

// Admin only routes
mentorshipRouter.use(hasRole(["ADMIN"]));

mentorshipRouter.get("/", (req, res) => {
  res.status(200).json({ message: "All mentorships endpoint" });
});

mentorshipRouter.get("/:id", (req, res) => {
  res.status(200).json({ message: `Mentorship details for ID: ${req.params.id}` });
});

mentorshipRouter.put("/:id", (req, res) => {
  res.status(200).json({ message: `Admin update for mentorship: ${req.params.id}` });
});

mentorshipRouter.delete("/:id", (req, res) => {
  res.status(200).json({ message: `Admin delete for mentorship: ${req.params.id}` });
});

export default mentorshipRouter;
