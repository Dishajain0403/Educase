import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.post("/api/users/signup", async (req: Request, res: Response) => {
    try {
      const userData = {
        username: req.body.username,
        password: req.body.password,
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email || req.body.username,
        companyName: req.body.companyName || "",
        isAgency: req.body.isAgency,
        description: "",
      };

      const validatedData = insertUserSchema.parse(userData);
      const user = await storage.createUser(validatedData);
      
      // Remove password from response for security
      const { password, ...userWithoutPassword } = user;
      
      // Set the user in session
      req.session!.userId = user.id;
      
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid user data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create user" });
      }
    }
  });

  app.post("/api/users/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
      // Set the user in session
      req.session!.userId = user.id;
      
      // Remove password from response for security
      const { password: _, ...userWithoutPassword } = user;
      
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to login" });
    }
  });

  app.get("/api/users/profile", async (req: Request, res: Response) => {
    try {
      // Get user ID from session
      const userId = req.session?.userId;
      
      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Remove password from response for security
      const { password, ...userWithoutPassword } = user;
      
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to get profile" });
    }
  });

  app.post("/api/users/logout", (req: Request, res: Response) => {
    req.session = null;
    res.status(200).json({ message: "Logged out successfully" });
  });

  const httpServer = createServer(app);

  return httpServer;
}
