import express from "express";
import { hasRole } from "../../middlewares/auth.middleware";
import { Role } from "@prisma/client";

const jobRouter = express.Router();

// Public routes for all users
jobRouter.get("/", (req, res) => {
  res.status(200).json({ message: "Jobs list endpoint" });
});

jobRouter.get("/:id", (req, res) => {
  res.status(200).json({ message: `Job details for ID: ${req.params.id}` });
});

jobRouter.get("/company/:company", (req, res) => {
  res.status(200).json({ message: `Jobs from company: ${req.params.company}` });
});

jobRouter.get("/search", (req, res) => {
  res.status(200).json({ message: "Job search endpoint" });
});

jobRouter.get("/skills/:skillId", (req, res) => {
  res.status(200).json({ message: `Jobs requiring skill: ${req.params.skillId}` });
});

// Authenticated user routes
jobRouter.use(hasRole(["LEARNER", "EMPLOYER", "ADMIN"]));

jobRouter.post("/apply/:id", (req, res) => {
  res.status(200).json({ message: `Applied to job: ${req.params.id}` });
});

jobRouter.get("/my-applications", (req, res) => {
  res.status(200).json({ message: "My job applications" });
});

jobRouter.put("/applications/:id", (req, res) => {
  res.status(200).json({ message: `Updated application for job: ${req.params.id}` });
});

jobRouter.delete("/applications/:id", (req, res) => {
  res.status(200).json({ message: `Withdrew application for job: ${req.params.id}` });
});

// Employer/Admin only routes
jobRouter.use(hasRole(["EMPLOYER", "ADMIN"]));

jobRouter.post("/", (req, res) => {
  res.status(201).json({ message: "Posted a new job" });
});

jobRouter.put("/:id", (req, res) => {
  res.status(200).json({ message: `Updated job: ${req.params.id}` });
});

jobRouter.delete("/:id", (req, res) => {
  res.status(200).json({ message: `Deleted job: ${req.params.id}` });
});

jobRouter.get("/:id/applications", (req, res) => {
  res.status(200).json({ message: `Applications for job: ${req.params.id}` });
});

jobRouter.put("/:id/applications/:applicationId", (req, res) => {
  res.status(200).json({ message: `Updated application status for application: ${req.params.applicationId}` });
});

export default jobRouter;
